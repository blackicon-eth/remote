// Supported Networks
export enum SupportedNetworks {
  BASE = "base",
  ARBITRUM = "arbitrum",
  POLYGON = "polygon",
}

// Transaction States
export enum TransactionStatus {
  TO_SEND = "to-send",
  AWAITING_CONFIRMATION = "awaiting-confirmation",
  SUCCESS = "success",
  ERROR = "error",
}

// Chain IDs
export enum ChainIds {
  "base" = 8453,
  "arbitrum" = 42161,
  "polygon" = 137,
}

// A list of modes for the list of positions
export enum ListModes {
  MY_POSITIONS = "my-positions",
  ALL_POSITIONS = "all-positions",
}

// Sorting directions
export enum SortingDirections {
  ASC = "asc",
  DESC = "desc",
}

// Sorting columns
export enum SortingColumns {
  APY = "apy",
  LIQUIDITY = "liquidity",
  DEPOSITED = "deposit",
}

// Alchemy RPC Base URLs
export enum AlchemyRpcBaseUrls {
  "ethereum" = "https://eth-mainnet.g.alchemy.com/v2",
  "op mainnet" = "https://opt-mainnet.g.alchemy.com/v2",
  "polygon" = "https://polygon-mainnet.g.alchemy.com/v2",
  "base" = "https://base-mainnet.g.alchemy.com/v2",
  "arbitrum one" = "https://arb-mainnet.g.alchemy.com/v2",
  "unichain" = "https://unichain-mainnet.g.alchemy.com/v2",
  "celo" = "https://celo-mainnet.g.alchemy.com/v2",
  "ink" = "https://ink-mainnet.g.alchemy.com/v2",
  "flow evm mainnet" = "https://flow-mainnet.g.alchemy.com/v2",
  "rootstock mainnet" = "https://rootstock-mainnet.g.alchemy.com/v2",
}
