import { PortalsToken } from "./portals/types";

export type UserTokens = {
  tokens: PortalsToken[];
  positions: PortalsToken[];
};

export type CartItemState = {
  amount: string;
  selectedToken: PortalsToken | null;
  opportunity: PortalsToken | null;
};

export type CartItemStates = {
  [key: string]: CartItemState;
};
