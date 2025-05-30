import { SupportedNetworks } from "./enums";

// Supported Networks
export const SUPPORTED_NETWORKS = [
  SupportedNetworks.BASE,
  SupportedNetworks.ARBITRUM,
  SupportedNetworks.POLYGON,
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
