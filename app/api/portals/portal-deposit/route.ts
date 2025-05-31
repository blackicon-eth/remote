import { env } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import { encodeAbiParameters, createPublicClient, http, Chain } from "viem";
import { base, arbitrum, polygon, flowMainnet } from "viem/chains";
import ky from "ky";
import {
  chainIdToNetworkName,
  getTokenDecimals,
  chainIdToEid,
  getStargateAddress,
  EMPTY_ADDRESS,
} from "@/lib/constants";
import { REMOTE_ACCOUNT_ABI } from "@/lib/abi";
import { encodeStargateTransactionCalldata } from "@/lib/stargate/utils";
import {
  PortalsApiResponse,
  PortalItem,
  PortalRequest,
  RequestBody,
  PortalResult,
} from "@/lib/portals/types";

const PORTALS_API_BASE_URL = "https://api.portals.fi/v2";

// Chain configurations for viem
const CHAIN_CONFIGS: Record<number, Chain> = {
  8453: base,
  42161: arbitrum,
  137: polygon,
  747: flowMainnet,
};

// RPC URLs
const getRpcUrl = (chainId: number): string => {
  switch (chainId) {
    case 8453: // Base
      return base.rpcUrls.default.http[0];
    case 42161: // Arbitrum
      return arbitrum.rpcUrls.default.http[0];
    case 137: // Polygon
      return polygon.rpcUrls.default.http[0];
    case 747: // Flow
      return flowMainnet.rpcUrls.default.http[0];
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    // Parse request body
    const body = (await request.json()) as RequestBody | PortalRequest;

    let requests: PortalRequest[] = [];

    // Check if body contains a single request or multiple requests
    if ("requests" in body && Array.isArray(body.requests)) {
      // Handle array of requests
      requests = body.requests;
    } else {
      // Handle single request
      const singleRequest = body as PortalRequest;

      // Validate required parameters for single request
      if (
        !singleRequest.smartAccount ||
        !singleRequest.inputToken ||
        !singleRequest.inputAmount ||
        !singleRequest.outputToken ||
        !singleRequest.destinationChainId
      ) {
        return NextResponse.json(
          {
            error:
              "Missing required parameters. Required: smartAccount, inputToken, inputAmount, outputToken, destinationChainId",
          },
          { status: 400 }
        );
      }

      requests = [singleRequest];
    }

    // Validate that we have at least one request
    if (requests.length === 0) {
      return NextResponse.json(
        {
          error:
            "No requests provided. Please provide either a single request object or an array of requests.",
        },
        { status: 400 }
      );
    }

    // Validate each request in the array
    for (let i = 0; i < requests.length; i++) {
      const req = requests[i];
      if (
        !req.smartAccount ||
        !req.inputToken ||
        !req.inputAmount ||
        !req.outputToken ||
        !req.destinationChainId
      ) {
        return NextResponse.json(
          {
            error: `Invalid request at index ${i}. Missing required parameters: smartAccount, inputToken, inputAmount, outputToken, destinationChainId`,
          },
          { status: 400 }
        );
      }
    }

    // Make parallel calls to Portals API
    const results = await Promise.allSettled(
      requests.map(async (req): Promise<PortalItem> => {
        try {
          const destinationNetwork = chainIdToNetworkName(
            req.destinationChainId
          );

          if (!destinationNetwork) {
            throw new Error(
              `Unsupported destination chain ID: ${req.destinationChainId}`
            );
          }

          // Read token decimals and convert input amount
          const inputTokenDecimals = await getTokenDecimals(
            req.inputToken,
            req.destinationChainId
          );

          const sourceInputAmountBigInt = BigInt(
            Math.floor(
              parseFloat(req.inputAmount) * Math.pow(10, inputTokenDecimals)
            )
          );
          const sourceInputAmount = sourceInputAmountBigInt.toString();
          console.log("sourceInputAmount", sourceInputAmount);

          //calculate adjInputAmount as input amount * 70%
          const adjInputAmount = Number(req.inputAmount) * 0.7;
          console.log("adjInputAmount", adjInputAmount);

          // Convert input amount to the proper decimal format
          // Assuming the input amount is in human-readable format (e.g., "1.5" for 1.5 tokens)
          const inputAmountBigInt = BigInt(
            Math.floor(adjInputAmount * Math.pow(10, inputTokenDecimals))
          );
          const formattedInputAmount = inputAmountBigInt.toString();
          console.log("formattedInputAmount", formattedInputAmount);

          const inputTokenWithNetwork =
            destinationNetwork + ":" + req.inputToken;
          const outputTokenWithNetwork =
            destinationNetwork + ":" + req.outputToken;

          // Build the search parameters for the Portals API
          const searchParamsForPortals = new URLSearchParams({
            sender: req.smartAccount,
            inputToken: inputTokenWithNetwork,
            inputAmount: formattedInputAmount,
            outputToken: outputTokenWithNetwork,
            slippageTolerancePercentage: "3",
            validate: "false",
          });

          // Call the Portals API using ky
          const data = await ky
            .get(`${PORTALS_API_BASE_URL}/portal`, {
              headers: { Authorization: `Bearer ${env.PORTALS_API_KEY}` },
              searchParams: searchParamsForPortals,
            })
            .json<PortalsApiResponse>();

          // Extract and return the calldata
          if (data.tx && data.tx.data) {
            // Construct _composeMsg using encodeAbiParameters
            // bytes memory _composeMsg = abi.encode(address _token, address _stargate, uint32 _dstEid, bool isDeposit, uint256 _amount, bytes memory _data);
            const composeMsg = encodeAbiParameters(
              [
                { type: "address" },
                { type: "address" },
                { type: "uint32" },
                { type: "bool" },
                { type: "uint256" },
                { type: "bytes" },
              ],
              [
                EMPTY_ADDRESS, // operation token
                EMPTY_ADDRESS, // stargate address
                chainIdToEid(req.destinationChainId)!, // dest ID
                true, //  isDeposit
                BigInt(0), // amount approve
                data.tx.data as `0x${string}`, // calldata
              ]
            );

            // Call prepare function on smart account
            let prepareResult;
            try {
              const chainId = parseInt(req.sourceChainId!);
              const chain = CHAIN_CONFIGS[chainId];

              if (chain) {
                const client = createPublicClient({
                  chain,
                  transport: http(getRpcUrl(chainId)),
                });

                console.log("chain", chain.name);

                console.log("chainId", req.sourceChainId);
                console.log("sourceChainToken", req.sourceChainToken);

                const stargateAddress = getStargateAddress(
                  req.sourceChainId!,
                  req.sourceChainToken
                );
                console.log("stargateAddress", stargateAddress);

                const result = await client.readContract({
                  address: req.smartAccount as `0x${string}`, //req.smartAccount as `0x${string}`
                  abi: REMOTE_ACCOUNT_ABI,
                  functionName: "prepare",
                  args: [
                    stargateAddress as `0x${string}`, // _stargate address
                    chainIdToEid(req.destinationChainId)!, // _dstEid from constants
                    sourceInputAmountBigInt, // _amount is 70% of original input amount
                    req.smartAccount as `0x${string}`, // _composer as smart account
                    composeMsg as `0x${string}`, // _composeMsg
                    BigInt(2000000), // 2m gas limit
                  ],
                });
                console.log("result", result);

                prepareResult = {
                  valueToSend: result[0].toString(),
                  sendParam: {
                    ...result[1],
                    // Convert any BigInt values to strings
                    amountLD: result[1].amountLD?.toString() || "0",
                    minAmountLD: result[1].minAmountLD?.toString() || "0",
                  },
                  messagingFee: {
                    nativeFee: result[2].nativeFee.toString(),
                    lzTokenFee: result[2].lzTokenFee.toString(),
                  },
                };
              }
            } catch (error) {
              console.error("Error calling prepare function:", error);
              // Continue without prepare result if it fails
            }

            return {
              calldata: data.tx.data,
              to: data.tx.to,
              value: data.tx.value,
              context: data.context,
              request: req,
              composeMsg: composeMsg,
              prepareResult: prepareResult,
            };
          } else {
            throw new Error(
              "Invalid response from Portals API - missing transaction data"
            );
          }
        } catch (error) {
          return {
            calldata: "",
            to: "",
            value: "",
            context: null,
            request: {} as PortalRequest,
            composeMsg: "",
            prepareResult: null,
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      })
    );

    // Process results
    const processedResults: PortalItem[] = results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return {
          calldata: "",
          to: "",
          value: "",
          context: null,
          request: {} as PortalRequest,
          composeMsg: "",
          prepareResult: null,
          error: result.reason?.message || "Request failed",
        };
      }
    });

    // Create transaction calldata to execute based on batch or single operation
    let transactionCalldataToExecute = "0x";

    const successfulResults = processedResults.filter(
      (r) => !r.error && r.prepareResult
    );

    if (successfulResults.length > 0) {
      if (requests.length === 1) {
        // Single operation - use executeStargate
        const result = successfulResults[0];
        if (result.prepareResult) {
          const stargateAddress = getStargateAddress(
            result.request.sourceChainId!,
            result.request.sourceChainToken
          );
          console.log("stargateAddress", stargateAddress);

          transactionCalldataToExecute = encodeStargateTransactionCalldata(
            "executeStargate",
            [
              stargateAddress, // address _stargate
              result.prepareResult.sendParam, // SendParam memory _sendParam
              result.prepareResult.messagingFee, // MessagingFee memory _messagingFee
              result.prepareResult.valueToSend, // uint256 _nativeAmount
            ]
          );
          console.log(
            "transactionCalldataToExecute",
            transactionCalldataToExecute
          );
        }
      } else {
        // Batch operation - use executeBatchStargate
        const stargateAddresses: string[] = [];
        const sendParams: any[] = [];
        const messagingFees: any[] = [];
        const nativeAmounts: string[] = [];

        for (const result of successfulResults) {
          if (result.prepareResult) {
            const stargateAddress = getStargateAddress(
              result.request.sourceChainId!,
              result.request.sourceChainToken
            );

            stargateAddresses.push(stargateAddress || EMPTY_ADDRESS);
            sendParams.push(result.prepareResult.sendParam);
            messagingFees.push(result.prepareResult.messagingFee);
            nativeAmounts.push(result.prepareResult.valueToSend);
          }
        }
        console.log("stargateAddresses", stargateAddresses);

        transactionCalldataToExecute = encodeStargateTransactionCalldata(
          "executeBatchStargate",
          [
            stargateAddresses, // address[] memory _stargateAddresses
            sendParams, // SendParam[] memory _sendParams
            messagingFees, // MessagingFee[] memory _messagingFees
            nativeAmounts, // uint256[] memory _nativeAmounts
          ]
        );
        console.log(
          "transactionCalldataToExecute",
          transactionCalldataToExecute
        );
      }
    }

    // Transform to single result with arrays
    const successfulPrepareResults = processedResults
      .map((r) => r.prepareResult)
      .filter((pr) => pr !== null);

    // Aggregate messaging fees from all successful results
    const aggregatedMessagingFee = successfulPrepareResults.reduce(
      (acc, prepareResult) => {
        if (prepareResult && prepareResult.messagingFee) {
          acc.nativeFee = (
            BigInt(acc.nativeFee) + BigInt(prepareResult.messagingFee.nativeFee)
          ).toString();
          acc.lzTokenFee = (
            BigInt(acc.lzTokenFee) +
            BigInt(prepareResult.messagingFee.lzTokenFee)
          ).toString();
        }
        return acc;
      },
      { nativeFee: "0", lzTokenFee: "0" }
    );

    const finalResult: PortalResult = {
      composeMsg: processedResults.map((r) => r.composeMsg),
      prepareResult: processedResults.map((r) => r.prepareResult || null),
      aggregatedMessagingFee,
      transactionCalldataToExecute,
      isBatch: requests.length > 1,
      total: processedResults.length,
      successful: processedResults.filter((r) => !r.error).length,
    };

    return NextResponse.json(finalResult);
  } catch (error) {
    console.error("Error calling Portals API:", error);
    return NextResponse.json(
      { error: "Failed to parse request body or fetch data from Portals API" },
      { status: 500 }
    );
  }
};
