export type PortalsTokenResponse = {
  totalItems: number;
  pageItems: number;
  more: boolean;
  page: number;
  tokens: PortalsToken[];
};

export type PortalsToken = {
  key: string;
  name: string;
  decimals: number;
  symbol: string;
  price: number;
  address: string;
  addresses: Record<string, string>;
  platform: string;
  network: string;
  images?: string[];
  image?: string;
  updatedAt: string;
  createdAt: string;
  tokens: string[];
  liquidity: number;
  metrics: {
    apy?: string;
    baseApy?: string;
    volumeUsd1d?: string;
    volumeUsd7d?: string;
  };
  metadata: {
    tags?: string[];
    feePercentage?: string;
  };
  tokenId: string;
  balanceUSD?: number;
  balance?: number;
  rawBalance?: string;
  reserves?: string[];
  totalSupply?: string;
  circulatingSupply?: string;
};

export type UserBalances = {
  balances: PortalsToken[];
};

export interface PortalsApiResponse {
  tx: {
    data: string;
    to: string;
    from: string;
    value: string;
  };
  context: any;
}

export interface PortalRequest {
  smartAccount: string;
  inputToken: string;
  inputAmount: string;
  outputToken: string;
  sourceChainId?: string; //eg. flow
  sourceChainToken: string; //eg. USDC on flow
  destinationChainId: string; //eg. base
}

export interface PortalItem {
  calldata: string;
  to: string;
  value: string;
  context: any;
  request: PortalRequest;
  composeMsg: string;
  prepareResult?: {
    valueToSend: string;
    sendParam: any;
    messagingFee: any;
  } | null;
  stargateAddress?: string | null;
  error?: string;
}

export interface RequestBody {
  requests: PortalRequest[];
}

export interface PortalResult {
  composeMsg: string[];
  stargateAddress: string;
  prepareResult: {
    valueToSend: string;
    sendParam: any;
    messagingFee: any;
  };
  valueToSend: string;
  transactionCalldataToExecute: string; // Single field, not array
  isBatch: boolean;
  total: number;
  successful: number;
}
