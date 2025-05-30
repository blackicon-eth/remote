import { env } from "@/lib/zod";
import { PortalsToken, UserBalances } from "@/lib/portals/types";
import { NextRequest, NextResponse } from "next/server";
import ky from "ky";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  try {
    const searchParams = new URLSearchParams();
    searchParams.append("owner", address);

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

    const userBalances: PortalsToken[] = [
      ...baseResponse.balances,
      ...arbitrumResponse.balances,
      ...polygonResponse.balances,
    ].sort((a, b) => b.liquidity - a.liquidity);

    return NextResponse.json(userBalances, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
};
