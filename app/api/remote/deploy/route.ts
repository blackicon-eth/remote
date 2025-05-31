import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, http, getAddress, encodeFunctionData } from "viem";
import { arbitrum, base, flare, rootstock, flowMainnet } from "viem/chains";
import { env } from "@/lib/zod";
import { privateKeyToAccount } from "viem/accounts";
import { REMOTE_ACCOUNT_FACTORY_ABI } from "@/lib/abi";
import { FACTORY_CONTRACT_ADDRESS } from "@/lib/constants";

interface DeployRequest {
  userAddress: string;
}

export const POST = async (request: NextRequest) => {
  try {
    // Parse request body
    const body = (await request.json()) as DeployRequest;

    // Validate user address parameter
    if (!body.userAddress) {
      return NextResponse.json(
        { error: "Missing required parameter: userAddress" },
        { status: 400 }
      );
    }

    // Validate address format
    let validatedAddress: `0x${string}`;
    try {
      validatedAddress = getAddress(body.userAddress) as `0x${string}`;
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid user address format" },
        { status: 400 }
      );
    }

    const account = privateKeyToAccount(env.BACKEND_PVT_KEY as `0x${string}`);

    // Create wallet clients for all chains
    const walletClientBase = createWalletClient({
      account: account,
      chain: base,
      transport: http(),
    });

    const walletClientArbitrum = createWalletClient({
      account: account,
      chain: arbitrum,
      transport: http(),
    });

    const walletClientFlare = createWalletClient({
      account: account,
      chain: flare,
      transport: http(),
    });

    const walletClientRootstock = createWalletClient({
      account: account,
      chain: rootstock,
      transport: http(),
    });

    const walletClientFlow = createWalletClient({
      account: account,
      chain: flowMainnet,
      transport: http(),
    });

    // Encode function data for the transaction
    const data = encodeFunctionData({
      abi: REMOTE_ACCOUNT_FACTORY_ABI,
      functionName: "deploy",
      args: [validatedAddress],
    });

    // Execute transactions on all chains in parallel
    /*
    const transactionPromises = [
      walletClientBase
        .sendTransaction({
          to: FACTORY_CONTRACT_ADDRESS,
          data: data,
        })
        .then((hash) => ({
          chain: "base",
          chainId: base.id,
          hash,
          success: true,
        }))
        .catch((error) => ({
          chain: "base",
          chainId: base.id,
          hash: null,
          success: false,
          error: error.message,
        })),

      walletClientArbitrum
        .sendTransaction({
          to: FACTORY_CONTRACT_ADDRESS,
          data: data,
        })
        .then((hash) => ({
          chain: "arbitrum",
          chainId: arbitrum.id,
          hash,
          success: true,
        }))
        .catch((error) => ({
          chain: "arbitrum",
          chainId: arbitrum.id,
          hash: null,
          success: false,
          error: error.message,
        })),

      walletClientFlare
        .sendTransaction({
          to: FACTORY_CONTRACT_ADDRESS,
          data: data,
        })
        .then((hash) => ({
          chain: "flare",
          chainId: flare.id,
          hash,
          success: true,
        }))
        .catch((error) => ({
          chain: "flare",
          chainId: flare.id,
          hash: null,
          success: false,
          error: error.message,
        })),

      walletClientRootstock
        .sendTransaction({
          to: FACTORY_CONTRACT_ADDRESS,
          data: data,
        })
        .then((hash) => ({
          chain: "rootstock",
          chainId: rootstock.id,
          hash,
          success: true,
        }))
        .catch((error) => ({
          chain: "rootstock",
          chainId: rootstock.id,
          hash: null,
          success: false,
          error: error.message,
        })),

      walletClientFlow
        .sendTransaction({
          to: FACTORY_CONTRACT_ADDRESS,
          data: data,
        })
        .then((hash) => ({
          chain: "flow",
          chainId: flowMainnet.id,
          hash,
          success: true,
        }))
        .catch((error) => ({
          chain: "flow",
          chainId: flowMainnet.id,
          hash: null,
          success: false,
          error: error.message,
        })),
    ];
    */

    // Wait for all transactions to complete
    //const results = await Promise.all(transactionPromises);

    return NextResponse.json({
      success: true,
      userAddress: validatedAddress,
      contractAddress: FACTORY_CONTRACT_ADDRESS,
      encodedData: data,
      //transactions: results,
      //totalChains: results.length,
      //successfulChains: results.filter((r) => r.success).length,
    });
  } catch (error) {
    console.error("Error executing deploy transactions:", error);
    return NextResponse.json(
      {
        error: "Failed to execute deploy transactions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
