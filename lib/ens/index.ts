import { createPublicClient, Address, http } from "viem";
import { mainnet } from "viem/chains";
import { AlchemyRpcBaseUrls } from "../enums";
import { addEnsContracts } from "@ensdomains/ensjs";
import { getResolver } from "@ensdomains/ensjs/public";
import { normalize } from "viem/ens";
import {
  ENS_PUBLIC_RESOLVER_ADDRESS,
  ENS_PUBLIC_RESOLVER_ADDRESS_2,
} from "../constants";
import { env } from "../zod";

// Mainnet Viem Public Client
export const viemMainnetPublicClient = createPublicClient({
  chain: addEnsContracts(mainnet),
  transport: http(
    `${
      AlchemyRpcBaseUrls[
        mainnet.name.toLowerCase() as keyof typeof AlchemyRpcBaseUrls
      ]
    }/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  ),
});

/**
 * Get the ENS name and avatar for an address
 * @param address - The address to get the ENS name and avatar for
 * @returns The ENS name and avatar for the address
 */
export const getEnsNameAndAvatar = async (
  address: Address
): Promise<{ ensName: string | null; avatar: string | null }> => {
  const resolver = await getResolver(viemMainnetPublicClient, {
    name: normalize(address as Address),
  });

  let foundEns: string | undefined;
  let foundAvatar: string | undefined;

  try {
    foundEns = (await viemMainnetPublicClient.getEnsName({
      address: address as Address,
      universalResolverAddress:
        resolver === ENS_PUBLIC_RESOLVER_ADDRESS_2 ||
        resolver === ENS_PUBLIC_RESOLVER_ADDRESS
          ? ("" as `0x${string}`)
          : (resolver as `0x${string}`),
    })) as string;

    if (foundEns) {
      foundAvatar = (await viemMainnetPublicClient.getEnsAvatar({
        name: normalize(foundEns),
      })) as string;
    }

    return { ensName: foundEns ?? null, avatar: foundAvatar ?? null };
  } catch (error) {
    console.log("Error in getting ENS from address", error);
    return { ensName: null, avatar: null };
  }
};
