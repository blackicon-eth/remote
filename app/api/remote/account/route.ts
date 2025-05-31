import { REMOTE_ACCOUNT_FACTORY_ABI } from "@/lib/abi";
import { FACTORY_CONTRACT_ADDRESS } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, getAddress } from "viem";
import { base } from "viem/chains";

// Create a public client for Base chain
const client = createPublicClient({
  chain: base,
  transport: http(),
});

export const GET = async (request: NextRequest) => {
  try {
    // Get the address from query parameters
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    // Validate address parameter
    if (!address) {
      return NextResponse.json(
        { error: "Missing required parameter: address" },
        { status: 400 }
      );
    }

    // Validate address format
    let validatedAddress: `0x${string}`;
    try {
      validatedAddress = getAddress(address) as `0x${string}`;
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid address format" },
        { status: 400 }
      );
    }

    // Make the contract call
    const result = await client.readContract({
      address: FACTORY_CONTRACT_ADDRESS,
      abi: REMOTE_ACCOUNT_FACTORY_ABI,
      functionName: "getAccount",
      args: [validatedAddress],
    });

    return NextResponse.json({
      address: validatedAddress,
      smartAccountAddress: result,
    });
  } catch (error) {
    console.error("Error calling getAccount function:", error);
    return NextResponse.json(
      {
        error: "Failed to call getAccount function",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
