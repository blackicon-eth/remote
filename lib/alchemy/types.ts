export type AlchemyTokenPriceResponse = {
  data: {
    network: string;
    address: string;
    prices: {
      currency: string;
      value: string;
      lastUpdatedAt: string;
    }[];
    error: string | null;
  }[];
};
