import { SupportedNetworks } from "./enums";

// Supported Networks
export const SUPPORTED_NETWORKS = [
  SupportedNetworks.BASE,
  SupportedNetworks.ARBITRUM,
  SupportedNetworks.POLYGON,
];

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


