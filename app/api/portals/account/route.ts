import { env } from "@/lib/zod";
import { PortalsToken, UserBalances } from "@/lib/portals/types";
import { NextRequest, NextResponse } from "next/server";
import ky from "ky";
import {
  FLARE_USDC_ADDRESS,
  FLARE_WETH_ADDRESS,
  FLOW_USDC_ADDRESS,
  FLOW_WETH_ADDRESS,
  ROOTSTOCK_USDC_ADDRESS,
  ROOTSTOCK_WETH_ADDRESS,
} from "@/lib/constants";
import { flare } from "viem/chains";
import { Address, createPublicClient, http, getAddress } from "viem";
import { AlchemyRpcBaseUrls } from "@/lib/enums";
import { erc20Abi } from "viem";
import { AlchemyTokenPriceResponse } from "@/lib/alchemy/types";
import { networks } from "@/lib/appkit";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const smartAccountAddress = searchParams.get("smartAccountAddress");
  const networkId = searchParams.get("networkId");

  if (!address || !networkId || !smartAccountAddress) {
    return NextResponse.json(
      { error: "Address, networkId and smartAccountAddress are required" },
      { status: 400 }
    );
  }

  if (networkId === "0") {
    return NextResponse.json(
      { error: "NetworkId is not supported" },
      { status: 400 }
    );
  }

  const connectedNetworkTokenAddresses =
    networkId === "747"
      ? {
          usdc: FLOW_USDC_ADDRESS,
          weth: FLOW_WETH_ADDRESS,
        }
      : networkId === "30"
      ? {
          usdc: ROOTSTOCK_USDC_ADDRESS,
          weth: ROOTSTOCK_WETH_ADDRESS,
        }
      : networkId === "14"
      ? {
          usdc: FLARE_USDC_ADDRESS,
          weth: FLARE_WETH_ADDRESS,
        }
      : null;

  const connectedChain = networks.find(
    (network) => network.id === Number(networkId)
  );

  if (!connectedChain) {
    return NextResponse.json(
      { error: "NetworkId is not supported" },
      { status: 400 }
    );
  }

  const rpcUrl =
    connectedChain === flare
      ? "https://flare.rpc.thirdweb.com"
      : `${
          AlchemyRpcBaseUrls[
            connectedChain.name.toLowerCase() as keyof typeof AlchemyRpcBaseUrls
          ]
        }/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

  if (!connectedNetworkTokenAddresses) {
    return NextResponse.json(
      { error: "NetworkId is not supported" },
      { status: 400 }
    );
  }

  // Create the userBalances array
  let userBalances: PortalsToken[] = [];

  // Read on the contract the user balances
  try {
    // Create the public client
    const publicClient = createPublicClient({
      chain: connectedChain,
      transport: http(rpcUrl),
    });

    const usdcBalance = Number(
      await publicClient.readContract({
        address: getAddress(
          connectedNetworkTokenAddresses.usdc.toLowerCase() as Address
        ),
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address as Address],
      })
    );

    const wethBalance = Number(
      await publicClient.readContract({
        address: getAddress(
          connectedNetworkTokenAddresses.weth.toLowerCase() as Address
        ),
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address as Address],
      })
    );

    const usdcPrice = Number(
      (
        await ky
          .post<AlchemyTokenPriceResponse>(
            `https://api.g.alchemy.com/prices/v1/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}/tokens/by-address`,
            {
              json: {
                addresses: [
                  {
                    network: "eth-mainnet",
                    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                  },
                ],
              },
            }
          )
          .json()
      ).data[0].prices[0].value
    );

    const wethPrice = Number(
      (
        await ky
          .post<AlchemyTokenPriceResponse>(
            `https://api.g.alchemy.com/prices/v1/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}/tokens/by-address`,
            {
              json: {
                addresses: [
                  {
                    network: "eth-mainnet",
                    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                  },
                ],
              },
            }
          )
          .json()
      ).data[0].prices[0].value
    );

    const userUsdcBalance: PortalsToken = {
      key: `${connectedChain.name}:${connectedNetworkTokenAddresses.usdc}`,
      name: "USDC",
      decimals: 6,
      symbol: "USDC",
      price: usdcPrice,
      address: connectedNetworkTokenAddresses.usdc as Address,
      addresses: {
        [connectedChain.name]: connectedNetworkTokenAddresses.usdc as Address,
      },
      platform: "basic",
      network: connectedChain.name,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      tokens: [],
      liquidity: 0,
      image:
        "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
      metrics: {},
      metadata: {},
      balanceUSD: (usdcBalance / 10 ** 6) * usdcPrice,
      balance: usdcBalance / 10 ** 6,
      rawBalance: usdcBalance.toString(),
      tokenId: "",
      totalSupply: "",
      circulatingSupply: "",
    };

    const userWethBalance: PortalsToken = {
      key: `${connectedChain.name}:${connectedNetworkTokenAddresses.weth}`,
      name: "WETH",
      decimals: 18,
      symbol: "WETH",
      price: wethPrice,
      address: connectedNetworkTokenAddresses.weth as Address,
      addresses: {
        [connectedChain.name]: connectedNetworkTokenAddresses.weth as Address,
      },
      platform: "basic",
      network: connectedChain.name,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      tokens: [],
      liquidity: 0,
      image:
        "https://coin-images.coingecko.com/coins/images/39810/large/weth.png?1724139790",
      metrics: {},
      metadata: {},
      tokenId: "",
      totalSupply: "",
      circulatingSupply: "",
      balanceUSD: (wethBalance / 10 ** 18) * wethPrice,
      balance: wethBalance / 10 ** 18,
      rawBalance: wethBalance.toString(),
    };

    userBalances.push(userUsdcBalance, userWethBalance);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tokens of connected network" },
      { status: 500 }
    );
  }

  try {
    const searchParams = new URLSearchParams();
    searchParams.append("owner", smartAccountAddress);

    const baseSearchParams = new URLSearchParams(searchParams);
    baseSearchParams.append("networks", "base");

    const arbitrumSearchParams = new URLSearchParams(searchParams);
    arbitrumSearchParams.append("networks", "arbitrum");

    const polygonSearchParams = new URLSearchParams(searchParams);
    polygonSearchParams.append("networks", "polygon");

    const baseResponse = await ky
      .get<UserBalances>("https://api.portals.fi/v2/account", {
        headers: { Authorization: `Bearer ${env.PORTALS_API_KEY}` },
        searchParams: baseSearchParams,
      })
      .json();

    const arbitrumResponse = await ky
      .get<UserBalances>("https://api.portals.fi/v2/account", {
        headers: { Authorization: `Bearer ${env.PORTALS_API_KEY}` },
        searchParams: arbitrumSearchParams,
      })
      .json();

    const polygonResponse = await ky
      .get<UserBalances>("https://api.portals.fi/v2/account", {
        headers: { Authorization: `Bearer ${env.PORTALS_API_KEY}` },
        searchParams: polygonSearchParams,
      })
      .json();

    const portalsUserBalances: PortalsToken[] = [
      ...baseResponse.balances,
      ...arbitrumResponse.balances,
      ...polygonResponse.balances,
    ].sort((a, b) => b.liquidity - a.liquidity);

    userBalances.push(...portalsUserBalances);

    return NextResponse.json(userBalances, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
};
