import { env } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData } from "viem";
import ky from "ky";
import { chainIdToNetworkName, getTokenDecimals } from "@/lib/constants";

const PORTALS_API_BASE_URL = "https://api.portals.fi/v2";

interface PortalsApiResponse {
  tx: {
    data: string;
    to: string;
    from: string;
    value: string;
  };
  context: any;
}

interface PortalRequest {
  smartAccount: string;
  inputToken: string;
  inputAmount: string;
  outputToken: string;
  sourceChainId?: string; //eg. flow
  destinationChainId: string; //eg. base
}

interface PortalResult {
  calldata: string;
  to: string;
  value: string;
  context: any;
  request: PortalRequest;
  error?: string;
}

interface RequestBody {
  requests: PortalRequest[];
}

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
      requests.map(async (req): Promise<PortalResult> => {
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

          // Convert input amount to the proper decimal format
          // Assuming the input amount is in human-readable format (e.g., "1.5" for 1.5 tokens)
          const inputAmountBigInt = BigInt(
            Math.floor(
              parseFloat(req.inputAmount) * Math.pow(10, inputTokenDecimals)
            )
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
            return {
              calldata: data.tx.data,
              to: data.tx.to,
              value: data.tx.value,
              context: data.context,
              request: req,
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
            request: req,
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      })
    );

    // Process results
    const processedResults: PortalResult[] = results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return {
          calldata: "",
          to: "",
          value: "",
          context: null,
          request: {} as PortalRequest,
          error: result.reason?.message || "Request failed",
        };
      }
    });

    // Return single result or array based on input
    if (requests.length === 1) {
      const result = processedResults[0];
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
      return NextResponse.json({
        calldata: result.calldata,
        to: result.to,
        value: result.value,
        context: result.context,
      });
    } else {
      return NextResponse.json({
        results: processedResults,
        total: processedResults.length,
        successful: processedResults.filter((r) => !r.error).length,
        failed: processedResults.filter((r) => r.error).length,
      });
    }
  } catch (error) {
    console.error("Error calling Portals API:", error);
    return NextResponse.json(
      { error: "Failed to parse request body or fetch data from Portals API" },
      { status: 500 }
    );
  }
};
