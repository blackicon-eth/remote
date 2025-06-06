import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  PortalRequest,
  PortalResult,
  PortalsToken,
  RequestBody,
} from "./portals/types";
import {
  Address,
  createPublicClient,
  erc20Abi,
  getAddress,
  Hex,
  http,
} from "viem";
import { networks } from "./appkit";
import { flare } from "viem/chains";
import { AlchemyRpcBaseUrls, ChainIds, TransactionStatus } from "./enums";
import { env } from "./zod";
import ky from "ky";
import { CartItemStates, ContractParams, TransactionStep } from "./types";
import {
  EMPTY_ADDRESS,
  getEquivalentTokenAddress,
  getStargateAddress,
} from "./constants";
import { useEffect } from "react";
import { useState } from "react";
import { STARGATE_ABI } from "./abi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number to a string with the appropriate suffix
 * @param num - The number to format
 * @returns The formatted number with the appropriate suffix
 */
export function formatNumber(num: number, decimals: number = 2): string {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toFixed(decimals);
}

/**
 * Formats a platform name to a more readable format
 * @param platform - The platform name to format
 * @returns The formatted platform name
 */
export function platformNameFormatter(platform: string) {
  const lowerCasePlatform = platform.toLowerCase();
  if (lowerCasePlatform.includes("uniswap")) return "Uniswap";
  else if (lowerCasePlatform.includes("sushiswap")) return "Sushiswap";
  else if (lowerCasePlatform.includes("curve")) return "Curve";
  else if (lowerCasePlatform.includes("balancer")) return "Balancer";
  else if (lowerCasePlatform.includes("aave")) return "Aave";
  else if (lowerCasePlatform.includes("compound")) return "Compound";
  else if (lowerCasePlatform.includes("yearn")) return "Yearn";
  else if (lowerCasePlatform.includes("dydx")) return "dYdX";
  else if (lowerCasePlatform.includes("maker")) return "Maker";
  else if (lowerCasePlatform.includes("pendle")) return "Pendle";
  else if (lowerCasePlatform.includes("pancake")) return "PancakeSwap";
  else return platform.slice(0, 1).toUpperCase() + platform.slice(1);
}

/**
 * Truncates an address to the given size keeping the 0x prefix
 * @param address - The address to truncate
 * @param size - The size of the truncated address
 * @returns The truncated address
 */
export const truncateAddress = (address: string, size: number = 4) => {
  return `${address.slice(0, size + 2)}...${address.slice(-size)}`;
};

/**
 * Sanitizes the network id
 * @param networkId - The network id
 * @returns The sanitized network id
 */
export const sanitizeNetworkId = (networkId: string | undefined) => {
  return networkId?.split(":")[1] ?? "0";
};

/**
 * Generates the approve steps for the tokens in the cart
 * @param cartItemStates - The cart item states
 * @param networkId - The network id
 * @param userAddress - The user address
 */
export const generateApproveSteps = async (
  cartItemStates: CartItemStates,
  networkId: string,
  userAddress: Address
) => {
  const connectedChain = networks.find(
    (network) => network.id === Number(networkId)
  );

  if (!connectedChain) {
    throw new Error("Connected chain not found");
  }

  const rpcUrl =
    connectedChain === flare
      ? "https://flare.rpc.thirdweb.com"
      : `${
          AlchemyRpcBaseUrls[
            connectedChain.name.toLowerCase() as keyof typeof AlchemyRpcBaseUrls
          ]
        }/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

  // Create the public client
  const publicClient = createPublicClient({
    chain: connectedChain,
    transport: http(rpcUrl),
  });

  let approveSteps: TransactionStep[] = [];

  // Create a list of source tokens
  let sourceTokens: string[] = [];
  for (const item of Object.values(cartItemStates)) {
    if (
      item.selectedToken &&
      !sourceTokens.includes(item.selectedToken.address)
    ) {
      sourceTokens.push(item.selectedToken.address);
    }
  }

  // Check for each token if the user has enough allowance
  for (const token of sourceTokens) {
    const tokenState = Object.values(cartItemStates).find(
      (item) =>
        item.selectedToken?.address.toLowerCase() === token.toLowerCase()
    );

    const stargateAddress = getStargateAddress(
      networkId,
      tokenState?.selectedToken?.address ?? ""
    );

    const allowance = Number(
      await publicClient.readContract({
        address: getAddress(token.toLowerCase() as Address),
        abi: erc20Abi,
        functionName: "allowance",
        args: [userAddress, stargateAddress as Address],
      })
    );

    if (allowance === 0) {
      approveSteps.push({
        type: "approve",
        status: TransactionStatus.TO_SEND,
        originTransaction: null,
        allowanceAmount: BigInt(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        ),
        asset: tokenState?.selectedToken!,
        spender: stargateAddress as Address,
      });
    }
  }

  return approveSteps;
};

/**
 * Generates the transaction steps for the cart
 * @param smartAccountAddress - The smart wallet address
 * @param cartItemStates - The cart item states
 * @param networkId - The network id
 * @returns The transaction steps
 */
export const generateTransactionStep = async (
  userAddress: Address,
  smartAccountAddress: Address,
  cartItemStates: CartItemStates,
  networkId: string
): Promise<TransactionStep> => {
  const requests: PortalRequest[] = [];

  for (const item of Object.values(cartItemStates)) {
    requests.push({
      smartAccount: smartAccountAddress,
      inputToken: getEquivalentTokenAddress(
        item.selectedToken?.address ?? "",
        ChainIds[item.opportunity?.network as keyof typeof ChainIds]
      )!,
      inputAmount: item.amount,
      outputToken: item.opportunity?.address ?? "",
      sourceChainId: networkId,
      sourceChainToken: item.selectedToken?.address ?? "",
      destinationChainId:
        ChainIds[item.opportunity?.network as keyof typeof ChainIds].toString(),
    });
  }

  console.log("requests", requests);

  const json: RequestBody = {
    requests,
  };

  const response = await ky
    .post<PortalResult>("api/portals/portal-simple-deposit", {
      json,
    })
    .json();

  const prepareResult = response.prepareResult;
  const valueToSend = response.prepareResult.valueToSend;
  const stargateAddress = response.stargateAddress;

  console.log("prepareResult", prepareResult);
  console.log("valueToSend", valueToSend);
  console.log("stargateAddress", stargateAddress);

  return {
    type: "transaction",
    status: TransactionStatus.TO_SEND,
    originTransaction: null,
    targetAddress: stargateAddress as Address,
    valueToSend: valueToSend as string,
    callData: response.composeMsg[0] as Hex,
    args: {
      sendParam: prepareResult.sendParam,
      messagingFee: prepareResult.messagingFee,
      refundAddress: userAddress,
    },
  };
};

/**
 * Extracts the parameters for a transaction step
 * @param step - The transaction step
 * @param chainId - The chain id
 * @returns The parameters for the transaction step
 */
export const extractStepParams = (
  step: TransactionStep,
  networkId: string
): ContractParams => {
  if (step.type === "approve") {
    const stargateAddress = getStargateAddress(
      networkId,
      step.asset?.address ?? ""
    );

    return {
      abi: erc20Abi,
      functionName: "approve",
      address: step.asset!.address as Address,
      args: [stargateAddress as Address, step.allowanceAmount],
      chainId: Number(networkId),
    };
  } else {
    return {
      abi: STARGATE_ABI,
      functionName: "sendToken",
      address: step.targetAddress as Address,
      args: [
        step.args?.sendParam,
        step.args?.messagingFee,
        step.args?.refundAddress,
      ],
      chainId: Number(networkId),
      value: step.valueToSend as string,
    };
  }
};

/**
 * Debounces a value
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const generateWithdrawTransactionStep = async (
  userAddress: Address,
  smartAccountAddress: Address,
  position: PortalsToken,
  networkId: string,
  amount: string
): Promise<TransactionStep> => {
  const requests: PortalRequest[] = [];

  requests.push({
    smartAccount: smartAccountAddress,
    inputToken: position.address,
    inputAmount: amount,
    outputToken: EMPTY_ADDRESS,
    sourceChainId: networkId,
    sourceChainToken: getEquivalentTokenAddress(
      "0x4200000000000000000000000000000000000006",
      networkId
    )!,
    destinationChainId:
      ChainIds[position.network as keyof typeof ChainIds].toString(),
  });

  console.log("requests", requests);

  const json: RequestBody = {
    requests,
  };

  const response = await ky
    .post<PortalResult>("api/portals/portal-simple-withdraw", {
      json,
    })
    .json();

  const prepareResult = response.prepareResult;
  const valueToSend = response.prepareResult.valueToSend;
  const stargateAddress = response.stargateAddress;

  console.log("prepareResult", prepareResult);
  console.log("valueToSend", valueToSend);
  console.log("stargateAddress", stargateAddress);

  return {
    type: "transaction",
    status: TransactionStatus.TO_SEND,
    originTransaction: null,
    targetAddress: stargateAddress as Address,
    valueToSend: valueToSend as string,
    callData: response.composeMsg[0] as Hex,
    args: {
      sendParam: prepareResult.sendParam,
      messagingFee: prepareResult.messagingFee,
      refundAddress: userAddress,
    },
  };
};
