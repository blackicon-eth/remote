import { Abi, Address, Hex } from "viem";
import { TransactionStatus } from "./enums";
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

export type TransactionStep = {
  type: "approve" | "transaction";
  status: TransactionStatus;
  originTransaction: { hash: Hex; link: string } | null;
  asset?: PortalsToken;
  callData?: Hex;
  valueToSend?: string;
  allowanceAmount?: bigint;
  spender?: Address;
  targetAddress?: Address;
  args?: {
    sendParam: any;
    messagingFee: any;
    refundAddress: Address;
  };
};

export type ContractParams = {
  abi?: Abi;
  functionName?: string;
  address: `0x${string}`;
  args?: readonly unknown[];
  chainId: number;
  callData?: Hex;
  value?: string;
};
