"use client";

import { wagmiAdapter, projectId } from "@/lib/appkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { env } from "@/lib/zod";
import { base, flowMainnet } from "@reown/appkit/networks";

// Set up queryClient
const queryClient = new QueryClient();

// Set up metadata
const metadata = {
  name: "Eco Checkout",
  description: "Eco Checkout Single Page Application",
  url: env.NEXT_PUBLIC_APP_BASE_URL,
  icons: [],
};

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [flowMainnet],
  defaultNetwork: base,
  metadata: metadata,
  features: {
    analytics: true,
    connectMethodsOrder: ["wallet"],
  },
});

function AppKitProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default AppKitProvider;
