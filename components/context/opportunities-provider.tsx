"use client";

import { PortalsToken } from "@/lib/portals/types";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { createContext, useContext, useMemo, type ReactNode } from "react";

interface OpportunitiesContextType {
  opportunities: PortalsToken[] | undefined;
  isLoadingOpportunities: boolean;
  isErrorOpportunities: boolean;
  refetchOpportunities: () => void;
  isRefetchingOpportunities: boolean;
}

const OpportunitiesContext = createContext<
  OpportunitiesContextType | undefined
>(undefined);

export function OpportunitiesProvider({ children }: { children: ReactNode }) {
  const {
    data: opportunities,
    isLoading: isLoadingOpportunities,
    isError: isErrorOpportunities,
    refetch: refetchOpportunities,
    isRefetching: isRefetchingOpportunities,
  } = useQuery({
    queryKey: ["opportunities"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return await ky.get<PortalsToken[]>("/api/portals/tokens").json();
    },
  });

  const value = useMemo(
    () => ({
      opportunities,
      isLoadingOpportunities,
      isErrorOpportunities,
      refetchOpportunities,
      isRefetchingOpportunities,
    }),
    [
      opportunities,
      isLoadingOpportunities,
      isErrorOpportunities,
      refetchOpportunities,
      isRefetchingOpportunities,
    ]
  );

  return (
    <OpportunitiesContext.Provider value={value}>
      {children}
    </OpportunitiesContext.Provider>
  );
}

export function useOpportunities() {
  const context = useContext(OpportunitiesContext);
  if (context === undefined) {
    throw new Error(
      "useOpportunities must be used within a OpportunitiesProvider"
    );
  }
  return context;
}
