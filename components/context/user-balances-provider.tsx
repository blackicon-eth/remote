"use client";

import { PortalsToken } from "@/lib/portals/types";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import ky from "ky";
import { useAppKitAccount, useAppKitState } from "@reown/appkit/react";
import { UserTokens } from "@/lib/types";
import { networks } from "@/lib/appkit";
import { sanitizeNetworkId } from "@/lib/utils";

interface UserBalancesContextType {
  userTokens: UserTokens | undefined;
  isLoadingUserTokens: boolean;
  isErrorUserTokens: boolean;
  refetchUserTokens: () => void;
  isRefetchingUserTokens: boolean;
}

const UserBalancesContext = createContext<UserBalancesContextType | undefined>(
  undefined
);

export function UserBalancesProvider({ children }: { children: ReactNode }) {
  const { address } = useAppKitAccount();
  const { selectedNetworkId } = useAppKitState();

  const sanitizedNetworkId = sanitizeNetworkId(selectedNetworkId);

  const selectedNetworkName = networks.find(
    (network) => network.id === Number(sanitizedNetworkId)
  )?.name;

  const {
    data: userBalances,
    isLoading: isLoadingUserTokens,
    isError: isErrorUserTokens,
    refetch: refetchUserTokens,
    isRefetching: isRefetchingUserTokens,
  } = useQuery({
    queryKey: ["userBalances"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return await ky
        .get<PortalsToken[]>("/api/portals/account", {
          searchParams: {
            address: address!,
            networkId: sanitizedNetworkId,
          },
        })
        .json();
    },
    enabled: !!address,
  });

  // Refetch the user balances when the network changes
  useEffect(() => {
    if (address) {
      refetchUserTokens();
    }
  }, [selectedNetworkId]);

  const userTokens = useMemo(() => {
    if (!userBalances) return undefined;

    return {
      tokens: userBalances?.filter(
        (token) =>
          selectedNetworkName === token.network &&
          (token.platform === "native" || token.platform === "basic")
      ),
      positions: userBalances?.filter(
        (token) =>
          selectedNetworkName !== token.network &&
          token.platform !== "native" &&
          token.platform !== "basic"
      ),
    };
  }, [userBalances]);

  const value = useMemo(
    () => ({
      userTokens,
      isLoadingUserTokens,
      isErrorUserTokens,
      refetchUserTokens,
      isRefetchingUserTokens,
    }),
    [
      userTokens,
      isLoadingUserTokens,
      isErrorUserTokens,
      refetchUserTokens,
      isRefetchingUserTokens,
    ]
  );

  return (
    <UserBalancesContext.Provider value={value}>
      {children}
    </UserBalancesContext.Provider>
  );
}

export function useUserBalances() {
  const context = useContext(UserBalancesContext);
  if (context === undefined) {
    throw new Error(
      "useUserBalances must be used within a UserBalancesProvider"
    );
  }
  return context;
}
