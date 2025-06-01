import { SupportedNetworks } from "./enums";
import { createPublicClient, http, erc20Abi, Chain, getAddress } from "viem";
import { base, arbitrum, polygon, flowMainnet } from "viem/chains";

// Supported Networks
export const SUPPORTED_NETWORKS = [
  SupportedNetworks.BASE,
  SupportedNetworks.ARBITRUM,
  SupportedNetworks.POLYGON,
];

// Empty Address
export const EMPTY_ADDRESS =
  "0x0000000000000000000000000000000000000000" as const;

// Supported Platforms
export const SUPPORTED_PLATFORMS = [
  "aavev3",
  "aerodrome",
  "aerodrome-slipstream",
  "agave",
  "alienbase",
  "apeswap",
  "apeswap-lending",
  "arcadia-v2",
  "angle",
  "arbitrumexchange",
  "aura",
  "babydogeswap",
  "balancerv2",
  "balancer-v3",
  "balancerv2boosted",
  "bankerjoe",
  "baseswap",
  "beets",
  "beetsboosted",
  "beets-v3",
  "beefy",
  "biswap",
  "benqi",
  "camelotv2",
  "cian",
  "compound",
  "compound-v3",
  "convex",
  "curve",
  "curve-gauges",
  "dfynv1",
  "ethena",
  "etherfi",
  "equalizer",
  "euler",
  "falcon-finance",
  "fluid",
  "fraxswap",
  "fluxfinance",
  "flaunch",
  "goat",
  "harvest-finance",
  "gamma-thena",
  "gamma-quickswap",
  "gamma-camelot",
  "gearbox",
  "geist",
  "glyph",
  "gyroscope",
  "honeyswap",
  "hop-protocol",
  "hop-protocol-tokens",
  "ironbank",
  "ironclad-finance",
  "ionic-protocol",
  "ipor-fusion",
  "landx-finance",
  "locus-finance",
  "machfi",
  "mdex",
  "midas",
  "mmfinance",
  "morpho",
  "moonwell",
  "nomiswap",
  "overnight-finance",
  "pancakeswap",
  "pancakeswap-v3",
  "pangolin",
  "pendle",
  "pendle-pt",
  "pendle-sy",
  "pendle-yt",
  "pooltogether",
  "pooltogether-v5",
  "quickswap",
  "radiantv2",
  "ra-exchange",
  "radpie",
  "resolv",
  "revert-finance",
  "rocketswap",
  "scream",
  "seamless-protocol",
  "shadow-v3",
  "shibaswap",
  "silo-finance",
  "silo-finance-v2",
  "silo-finance-llama",
  "soswap",
  "spark",
  "spiritswap",
  "spookyswap",
  "stablecomp",
  "stakedao",
  "stader",
  "stakedao-vaults",
  "stakedao-gauges",
  "stargate",
  "sturdy",
  "sushiswap",
  "sushiswap-v3",
  "swapbased",
  "synthswap",
  "syrup-finance",
  "term-finance",
  "thegranary",
  "traderjoe",
  "uniswapv2",
  "uniswap-v3",
  "uniswap-v4",
  "uwulend",
  "velodrome-v2",
  "velodrome-slipstream",
  "venus",
  "verse",
  "vesper",
  "yearn",
  "yearn-v3",
  "yearncrv",
  "yieldyak",
  "custom",
];

// Chain Colors
export const ChainColors = {
  [SupportedNetworks.BASE]: "#2482da",
  [SupportedNetworks.ARBITRUM]: "#aab0b5",
  [SupportedNetworks.POLYGON]: "#a060ff",
};

// Chain Images
export const ChainImages = {
  [SupportedNetworks.BASE]: "/chains/base-logo.png",
  [SupportedNetworks.ARBITRUM]: "/chains/arbitrum-logo.png",
  [SupportedNetworks.POLYGON]: "/chains/polygon-logo.webp",
};

// ENS Resolvers
export const ENS_PUBLIC_RESOLVER_ADDRESS =
  "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63";
export const ENS_PUBLIC_RESOLVER_ADDRESS_2 =
  "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41";

// chainId to network name
export const CHAIN_ID_TO_NETWORK: Record<number, string> = {
  8453: "base",
  42161: "arbitrum",
  137: "polygon",
  747: "flow",
  14: "flare",
  30: "rootstock",
};

export const chainIdToNetworkName = (
  chainId: number | string
): string | null => {
  const id = typeof chainId === "string" ? parseInt(chainId, 10) : chainId;
  return CHAIN_ID_TO_NETWORK[id] || null;
};

// check token decimals

// Chain configurations for viem
const CHAIN_CONFIGS: Record<number, Chain> = {
  8453: base,
  42161: arbitrum,
  137: polygon,
  747: flowMainnet,
  // Add more chains as needed
};

// RPC URLs - you might want to use your Alchemy keys here
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

export const getTokenDecimals = async (
  tokenAddress: string,
  chainId: number | string
): Promise<number> => {
  try {
    // Check if token is zero address (native token), return 18 decimals
    if (
      tokenAddress === EMPTY_ADDRESS ||
      tokenAddress.toLowerCase() === EMPTY_ADDRESS
    ) {
      return 18;
    }

    const id = typeof chainId === "string" ? parseInt(chainId, 10) : chainId;

    // Get chain config
    const chain = CHAIN_CONFIGS[id];
    if (!chain) {
      throw new Error(`Unsupported chain ID: ${id}`);
    }

    // Create public client
    const client = createPublicClient({
      chain,
      transport: http(getRpcUrl(id)),
    });

    // Read decimals from the token contract
    const decimals = await client.readContract({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: "decimals",
    });
    console.log("decimals", decimals);

    return decimals;
  } catch (error) {
    console.error(
      `Error getting token decimals for ${tokenAddress} on chain ${chainId}:`,
      error
    );
    // Return default decimals (18) if we can't read from contract
    return 18;
  }
};

//STARGATE CONSTANTS

// Endpoints
export const BASE_ENDPOINT =
  "0x1a44076050125825900e736c501f859c50fE728c" as const;
export const ARB_ENDPOINT =
  "0x1a44076050125825900e736c501f859c50fE728c" as const;
export const FLOW_ENDPOINT =
  "0xcb566e3B6934Fa77258d68ea18E931fa75e1aaAa" as const;
export const FLARE_ENDPOINT =
  "0x1a44076050125825900e736c501f859c50fE728c" as const;
export const ROOTSTOCK_ENDPOINT =
  "0xcb566e3B6934Fa77258d68ea18E931fa75e1aaAa" as const;

// Chain EIDs
export const BASE_CHAIN_EID = 30184 as const;
export const ARB_CHAIN_EID = 30110 as const;
export const FLOW_CHAIN_EID = 30336 as const;
export const FLARE_CHAIN_EID = 30295 as const;
export const ROOTSTOCK_CHAIN_EID = 30333 as const;

// Chain ID to EID mapping
export const CHAIN_ID_TO_EID: Record<number, number> = {
  8453: BASE_CHAIN_EID, // Base
  42161: ARB_CHAIN_EID, // Arbitrum
  747: FLOW_CHAIN_EID, // Flow
  14: FLARE_CHAIN_EID, // Flare
  30: ROOTSTOCK_CHAIN_EID, // Rootstock
  137: 30109, // Polygon (add if needed)
};

export const chainIdToEid = (chainId: number | string): number | null => {
  const id = typeof chainId === "string" ? parseInt(chainId, 10) : chainId;
  return CHAIN_ID_TO_EID[id] || null;
};

// Chain IDs
export const BASE_CHAIN_ID = 8453 as const;
export const ARB_CHAIN_ID = 42161 as const;
export const FLOW_CHAIN_ID = 747 as const;
export const FLARE_CHAIN_ID = 14 as const;
export const ROOTSTOCK_CHAIN_ID = 30 as const;

// Base Stargate Pools
export const BASE_STARGATE_POOL_NATIVE =
  "0xdc181Bd607330aeeBEF6ea62e03e5e1Fb4B6F7C7" as const;
export const BASE_STARGATE_POOL_USDC =
  "0x27a16dc786820B16E5c9028b75B99F6f604b5d26" as const;

// Arbitrum Stargate Pools
export const ARB_STARGATE_POOL_NATIVE =
  "0xA45B5130f36CDcA45667738e2a258AB09f4A5f7F" as const;
export const ARB_STARGATE_POOL_USDC =
  "0xe8CDF27AcD73a434D661C84887215F7598e7d0d3" as const;

// Flow Stargate Pools
export const FLOW_STARGATE_OFT_ETH =
  "0x45f1A95A4D3f3836523F5c83673c797f4d4d263B" as const;
export const FLOW_STARGATE_POOL_USDC =
  "0xAF54BE5B6eEc24d6BFACf1cce4eaF680A8239398" as const;

// Flare Stargate Pools
export const FLARE_STARGATE_OFT_ETH =
  "0x8e8539e4CcD69123c623a106773F2b0cbbc58746" as const;
export const FLARE_STARGATE_OFT_USDC =
  "0x77C71633C34C3784ede189d74223122422492a0f" as const;

// Rootstock Stargate Pools
export const ROOTSTOCK_STARGATE_OFT_ETH =
  "0x45f1A95A4D3f3836523F5c83673c797f4d4d263B" as const;
export const ROOTSTOCK_STARGATE_OFT_USDC =
  "0xAF54BE5B6eEc24d6BFACf1cce4eaF680A8239398" as const;

// Stargate Pool/OFT Mapping
// Key format: "chainId:tokenAddress" -> Stargate pool/OFT address
export const STARGATE_POOL_MAPPING: Record<string, string> = {
  // Base Chain (8453)
  "8453:0x0000000000000000000000000000000000000000": BASE_STARGATE_POOL_NATIVE, // ETH
  "8453:native": BASE_STARGATE_POOL_NATIVE, // ETH (alternative key)
  "8453:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913": BASE_STARGATE_POOL_USDC, // USDC

  // Arbitrum Chain (42161)
  "42161:0x0000000000000000000000000000000000000000": ARB_STARGATE_POOL_NATIVE, // ETH
  "42161:native": ARB_STARGATE_POOL_NATIVE, // ETH (alternative key)
  "42161:0xaf88d065e77c8cc2239327c5edb3a432268e5831": ARB_STARGATE_POOL_USDC, // USDC

  // Flow Chain (747)
  "747:0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590": FLOW_STARGATE_OFT_ETH, // ETH
  "747:native": FLOW_STARGATE_OFT_ETH, // ETH (alternative key)
  "747:0xF1815bd50389c46847f0Bda824eC8da914045D14": FLOW_STARGATE_POOL_USDC, // USDC

  // Flare Chain (14)
  "14:0x1502FA4be69d526124D453619276FacCab275d3D": FLARE_STARGATE_OFT_ETH, // ETH
  "14:native": FLARE_STARGATE_OFT_ETH, // ETH (alternative key)
  "14:0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6": FLARE_STARGATE_OFT_USDC, // USDC

  // Rootstock Chain (30)
  "30:0x45f1A95A4D3f3836523F5c83673c797f4d4d263B": ROOTSTOCK_STARGATE_OFT_ETH, // ETH
  "30:native": ROOTSTOCK_STARGATE_OFT_ETH, // ETH (alternative key)
  "30:0x74c9f2b00581f1b11aa7ff05aa9f608b7389de67": ROOTSTOCK_STARGATE_OFT_USDC, // USDC
};

export const getStargateAddress = (
  chainId: number | string,
  tokenAddress: string
): string | null => {
  const id = typeof chainId === "string" ? parseInt(chainId, 10) : chainId;

  // Handle native token (zero address or "native")
  if (
    tokenAddress === EMPTY_ADDRESS ||
    tokenAddress.toLowerCase() === "native"
  ) {
    const nativeKey = `${id}:native`;
    const zeroAddressKey = `${id}:${EMPTY_ADDRESS}`;
    return (
      STARGATE_POOL_MAPPING[nativeKey] ||
      STARGATE_POOL_MAPPING[zeroAddressKey] ||
      null
    );
  }

  try {
    // Normalize the input address using viem's getAddress
    const normalizedInputAddress = getAddress(tokenAddress);

    // Check all entries in the mapping for this chain
    for (const [key, stargateAddress] of Object.entries(
      STARGATE_POOL_MAPPING
    )) {
      const [mapChainId, mapTokenAddress] = key.split(":");

      if (parseInt(mapChainId) === id && mapTokenAddress !== "native") {
        try {
          // Normalize the address from the mapping
          const normalizedMapAddress = getAddress(mapTokenAddress);

          // Compare normalized addresses
          if (normalizedInputAddress === normalizedMapAddress) {
            console.log("Found match:", key, "->", stargateAddress);
            return stargateAddress;
          }
        } catch (error) {
          // Skip invalid addresses in the mapping
          continue;
        }
      }
    }

    console.log("No match found for", id, normalizedInputAddress);
    return null;
  } catch (error) {
    console.error("Invalid address format:", tokenAddress, error);
    return null;
  }
};
// Flow Token Addresses
export const FLOW_USDC_ADDRESS = "0xF1815bd50389c46847f0Bda824eC8da914045D14";
export const FLOW_WETH_ADDRESS = "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590";

// Flare Token Addresses
export const FLARE_USDC_ADDRESS = "0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6";
export const FLARE_WETH_ADDRESS = "0x1502FA4be69d526124D453619276FacCab275d3D";

// Rootstock Token Addresses
export const ROOTSTOCK_USDC_ADDRESS =
  "0x74c9f2b00581F1B11AA7ff05aa9F608B7389De67";
export const ROOTSTOCK_WETH_ADDRESS =
  "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590";

export const FACTORY_CONTRACT_ADDRESS =
  "0x327Fcd2B394A862978853fF3F53645946C648E53";

// Function to check if a token address is USDC or WETH
export const isTokenUsdc = (tokenAddress: string): boolean => {
  try {
    // Normalize the input address
    const normalizedAddress = getAddress(tokenAddress);

    // Define all known USDC addresses across chains
    const USDC_ADDRESSES = [
      // Base USDC
      "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      // Arbitrum USDC
      "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      // Flow USDC
      FLOW_USDC_ADDRESS,
      // Flare USDC
      FLARE_USDC_ADDRESS,
      // Rootstock USDC
      ROOTSTOCK_USDC_ADDRESS,
    ];

    // Check if the normalized address matches any USDC address
    return USDC_ADDRESSES.some((usdcAddress) => {
      try {
        return normalizedAddress === getAddress(usdcAddress);
      } catch {
        return false;
      }
    });
  } catch (error) {
    console.error("Invalid address format:", tokenAddress, error);
    return false;
  }
};

// Function to get equivalent token address on a target chain
export const getEquivalentTokenAddress = (
  tokenAddress: string,
  targetChainId: number | string
): string | null => {
  try {
    const chainId =
      typeof targetChainId === "string"
        ? parseInt(targetChainId, 10)
        : targetChainId;

    // Check if the input token is USDC
    const isUsdc = isTokenUsdc(tokenAddress);

    // Define token addresses by chain
    const TOKEN_ADDRESSES_BY_CHAIN: Record<
      number,
      { usdc: string; weth: string }
    > = {
      // Base (8453)
      8453: {
        usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        weth: "0x4200000000000000000000000000000000000006", // Native ETH
      },
      // Arbitrum (42161)
      42161: {
        usdc: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        weth: "0x0000000000000000000000000000000000000000", // Native ETH
      },
      // Flow (747)
      747: {
        usdc: FLOW_USDC_ADDRESS,
        weth: FLOW_WETH_ADDRESS,
      },
      // Flare (14)
      14: {
        usdc: FLARE_USDC_ADDRESS,
        weth: FLARE_WETH_ADDRESS,
      },
      // Rootstock (30)
      30: {
        usdc: ROOTSTOCK_USDC_ADDRESS,
        weth: ROOTSTOCK_WETH_ADDRESS,
      },
    };

    // Check if target chain is supported
    if (!TOKEN_ADDRESSES_BY_CHAIN[chainId]) {
      console.error(`Unsupported target chain ID: ${chainId}`);
      return null;
    }

    // Return the equivalent token address on the target chain
    if (isUsdc) {
      return TOKEN_ADDRESSES_BY_CHAIN[chainId].usdc;
    } else {
      // Assume it's WETH if not USDC
      return TOKEN_ADDRESSES_BY_CHAIN[chainId].weth;
    }
  } catch (error) {
    console.error("Error getting equivalent token address:", error);
    return null;
  }
};
