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
import { Address } from "viem";
import { EMPTY_ADDRESS } from "@/lib/constants";

interface UserBalancesContextType {
  userTokens: UserTokens | undefined;
  isLoadingUserTokens: boolean;
  isErrorUserTokens: boolean;
  refetchUserTokens: () => void;
  isRefetchingUserTokens: boolean;
  sentinelContractAddress: {
    address: Address | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
    isRefetching: boolean;
  };
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

  // Gets the user sentinel contract address
  const {
    data: sentinelContractAddress,
    isLoading: isLoadingSentinelContractAddress,
    isError: isErrorSentinelContractAddress,
    refetch: refetchSentinelContractAddress,
    isRefetching: isRefetchingSentinelContractAddress,
  } = useQuery({
    queryKey: ["sentinelContractAddress"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ky
        .get<{ smartAccountAddress: Address; address: Address }>(
          "/api/remote/account",
          {
            searchParams: {
              address: address!,
            },
            timeout: false,
          }
        )
        .json();
      return response.smartAccountAddress;
    },
    enabled: !!address,
  });

  // Get the user balances
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
            smartAccountAddress: sentinelContractAddress!,
            networkId: sanitizedNetworkId,
          },
          timeout: false,
        })
        .json();
    },
    enabled:
      !!address &&
      !!sentinelContractAddress &&
      sentinelContractAddress !== EMPTY_ADDRESS,
  });

  // Deploys the sentinel contracts if the user has no sentinel contract
  useEffect(() => {
    const deploySentinelContract = async () => {
      if (
        !!address &&
        sentinelContractAddress === EMPTY_ADDRESS &&
        !isLoadingSentinelContractAddress &&
        !isErrorSentinelContractAddress
      ) {
        await ky
          .post("/api/remote/deploy", {
            json: {
              userAddress: address!,
            },
            timeout: false,
          })
          .json();
        refetchSentinelContractAddress();
      }
    };

    deploySentinelContract();
  }, [
    address,
    sentinelContractAddress,
    isLoadingSentinelContractAddress,
    isErrorSentinelContractAddress,
  ]);

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
      sentinelContractAddress: {
        address: sentinelContractAddress,
        isLoading: isLoadingSentinelContractAddress,
        isError: isErrorSentinelContractAddress,
        refetch: refetchSentinelContractAddress,
        isRefetching: isRefetchingSentinelContractAddress,
      },
    }),
    [
      userTokens,
      isLoadingUserTokens,
      isErrorUserTokens,
      refetchUserTokens,
      isRefetchingUserTokens,
      sentinelContractAddress,
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
