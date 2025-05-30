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
  images: string[];
  updatedAt: string;
  createdAt: string;
  tokens: string[];
  liquidity: number;
  metrics: {
    apy: string;
    baseApy: string;
    volumeUsd1d: string;
    volumeUsd7d: string;
  };
  metadata: {
    tags: string[];
    feePercentage: string;
  };
  tokenId: string;
  reserves: string[];
};
