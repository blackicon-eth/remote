import { AnimatePresence, motion } from "motion/react";
import { OpportunityTableRow } from "./opportunity-table-row";
import { useOpportunities } from "../context/opportunities-provider";
import { useMemo } from "react";
import {
  SortingColumns,
  SortingDirections,
  SupportedNetworks,
} from "@/lib/enums";
import { useUserBalances } from "../context/user-balances-provider";

interface AllOpportunitiesContainerProps {
  debouncedSearch: string;
  selectedChains: SupportedNetworks[];
  sortColumn: SortingColumns | null;
  sortDirection: SortingDirections | null;
}

export const AllOpportunitiesContainer = ({
  debouncedSearch,
  selectedChains,
  sortColumn,
  sortDirection,
}: AllOpportunitiesContainerProps) => {
  const { opportunities } = useOpportunities();
  const { userTokens } = useUserBalances();

  const opportunitiesWithBalanceUSD = useMemo(() => {
    return opportunities?.map((opportunity) => ({
      ...opportunity,
      balanceUSD: userTokens?.positions?.find(
        (position) => position.key === opportunity.key
      )?.balanceUSD,
    }));
  }, [opportunities, userTokens]);

  const filteredOpportunities = useMemo(() => {
    let filtered = opportunitiesWithBalanceUSD?.filter(
      (opportunity) =>
        (opportunity.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
          opportunity.platform
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())) &&
        selectedChains.includes(opportunity.network as SupportedNetworks)
    );

    // Apply sorting if a column is selected
    if (filtered && sortColumn && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: number;
        let bValue: number;

        if (sortColumn === SortingColumns.APY) {
          aValue = Number.parseFloat(a.metrics.apy ?? "0");
          bValue = Number.parseFloat(b.metrics.apy ?? "0");
        } else if (sortColumn === SortingColumns.DEPOSITED) {
          aValue = a.balanceUSD || 0;
          bValue = b.balanceUSD || 0;
        } else {
          aValue = a.liquidity;
          bValue = b.liquidity;
        }

        if (sortDirection === SortingDirections.DESC) {
          return bValue - aValue;
        } else {
          return aValue - bValue;
        }
      });
    }

    return filtered;
  }, [
    opportunitiesWithBalanceUSD,
    debouncedSearch,
    selectedChains,
    sortColumn,
    sortDirection,
  ]);

  return (
    <motion.div
      key="all-opportunities"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="size-full"
    >
      <AnimatePresence mode="wait">
        {filteredOpportunities?.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center w-full h-full"
          >
            <h2 className="text-xl md:text-3xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
              No opportunities found :(
            </h2>
          </motion.div>
        ) : (
          <motion.div
            key="opportunities"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-start items-start w-full h-full"
          >
            <AnimatePresence>
              {filteredOpportunities?.map((opportunity, index) => (
                <OpportunityTableRow
                  key={opportunity.key}
                  opportunity={opportunity}
                  index={index}
                  isLast={index === filteredOpportunities.length - 1}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
