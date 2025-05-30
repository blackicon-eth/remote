import { SUPPORTED_PLATFORMS } from "@/lib/constants";
import { env } from "@/lib/zod";
import { PortalsToken, PortalsTokenResponse } from "@/lib/portals/types";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest) => {
  try {
    const searchParams = new URLSearchParams();
    SUPPORTED_PLATFORMS.forEach((platform) =>
      searchParams.append("platforms", platform)
    );
    searchParams.append("sortBy", "liquidity");
    searchParams.append("limit", "30");
    searchParams.append("sortDirection", "desc");

    const baseSearchParams = new URLSearchParams(searchParams);
    baseSearchParams.append("networks", "base");

    const arbitrumSearchParams = new URLSearchParams(searchParams);
    arbitrumSearchParams.append("networks", "arbitrum");

    const polygonSearchParams = new URLSearchParams(searchParams);
    polygonSearchParams.append("networks", "polygon");

    const baseResponse = await ky
      .get<PortalsTokenResponse>("https://api.portals.fi/v2/tokens", {
        headers: { Authorization: `Bearer ${env.PORTALS_API_KEY}` },
        searchParams: baseSearchParams,
      })
      .json();

    const arbitrumResponse = await ky
      .get<PortalsTokenResponse>("https://api.portals.fi/v2/tokens", {
        headers: { Authorization: `Bearer ${env.PORTALS_API_KEY}` },
        searchParams: arbitrumSearchParams,
      })
      .json();

    const polygonResponse = await ky
      .get<PortalsTokenResponse>("https://api.portals.fi/v2/tokens", {
        headers: { Authorization: `Bearer ${env.PORTALS_API_KEY}` },
        searchParams: polygonSearchParams,
      })
      .json();

    const tokenOpportunities: PortalsToken[] = [
      ...baseResponse.tokens,
      ...arbitrumResponse.tokens,
      ...polygonResponse.tokens,
    ].sort((a, b) => b.liquidity - a.liquidity);

    return NextResponse.json(tokenOpportunities, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
};
