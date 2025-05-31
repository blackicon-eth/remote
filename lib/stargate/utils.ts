import { encodeFunctionData, Abi } from "viem";
import { REMOTE_ACCOUNT_ABI } from "../abi";


export const encodeStargateTransactionCalldata = (
  functionName: string,
  args?: readonly unknown[]
): `0x${string}` => {
  return encodeFunctionData({
    abi: REMOTE_ACCOUNT_ABI as Abi,
    functionName,
    args,
  });
};

