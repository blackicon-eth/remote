import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { CustomRpcUrlMap } from "@reown/appkit-common";
import { flowMainnet, flare, rootstock } from "@reown/appkit/networks";
import { env } from "@/lib/zod";
import { AlchemyRpcBaseUrls } from "../enums";

export const networks = [flowMainnet, flare, rootstock];

export const projectId = env.NEXT_PUBLIC_REOWN_APP_ID;

const alchemyApiKey = env.NEXT_PUBLIC_ALCHEMY_API_KEY;

// A function to generate custom RPC URLs
const getCustomRpcUrls = () => {
  const urls: CustomRpcUrlMap = {};
  for (const chain of networks) {
    urls[`eip155:${chain.id}`] = [
      {
        url:
          chain.name === "Flare Mainnet"
            ? "https://flare.rpc.thirdweb.com"
            : `${
                AlchemyRpcBaseUrls[
                  chain.name.toLowerCase() as keyof typeof AlchemyRpcBaseUrls
                ]
              }/${alchemyApiKey}`,
      },
    ];
  }
  return urls;
};

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  customRpcUrls: alchemyApiKey ? getCustomRpcUrls() : undefined,
});

export const config = wagmiAdapter.wagmiConfig;
