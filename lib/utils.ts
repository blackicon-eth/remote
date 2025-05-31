import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PortalsToken } from "./portals/types";
import { Address, createPublicClient, erc20Abi, getAddress, http } from "viem";
import { networks } from "./appkit";
import { flare } from "viem/chains";
import { AlchemyRpcBaseUrls } from "./enums";
import { env } from "./zod";

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
 * @param smartWalletAddress - The smart wallet address
 */
export const generateApproveSteps = async (
  cartItemStates: {
    [key: string]: {
      amount: string;
      selectedToken: PortalsToken | null;
    };
  },
  networkId: string,
  userAddress: Address,
  smartWalletAddress: Address
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

  let approveSteps: {
    title: string;
    description: string;
    status: "pending" | "success" | "error";
    token: PortalsToken | null;
  }[] = [];

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
    const allowance = Number(
      await publicClient.readContract({
        address: getAddress(token.toLowerCase() as Address),
        abi: erc20Abi,
        functionName: "allowance",
        args: [userAddress, smartWalletAddress],
      })
    );

    if (allowance === 0) {
      approveSteps.push({
        title: "Approve",
        description: "Approve the smart wallet to spend the tokens",
        status: "pending",
        token: cartItemStates[token].selectedToken,
      });
    }
  }

  // Check if the user has enough balance for the tokens
};
