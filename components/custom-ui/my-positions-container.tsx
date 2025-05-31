import { AnimatePresence, motion } from "motion/react";
import { DNA } from "react-loader-spinner";
import { RemoteButton } from "./remote-button";
import { PositionTableRow } from "./position-table-row";
import { useUserBalances } from "../context/user-balances-provider";
import { useMemo } from "react";
import {
  SortingColumns,
  SortingDirections,
  SupportedNetworks,
} from "@/lib/enums";

interface MyPositionsContainerProps {
  debouncedSearch: string;
  selectedChains: SupportedNetworks[];
  sortColumn: SortingColumns | null;
  sortDirection: SortingDirections | null;
}
export const MyPositionsContainer = ({
  debouncedSearch,
  selectedChains,
  sortColumn,
  sortDirection,
}: MyPositionsContainerProps) => {
  const {
    userTokens,
    refetchUserTokens,
    isLoadingUserTokens,
    isRefetchingUserTokens,
    isErrorUserTokens,
  } = useUserBalances();

  const filteredUserTokens = useMemo(() => {
    let filtered = userTokens?.positions?.filter(
      (position) =>
        (position.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          position.platform
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())) &&
        selectedChains.includes(position.network as SupportedNetworks)
    );

    // Apply sorting if a column is selected
    if (filtered && sortColumn && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: number;
        let bValue: number;

        if (sortColumn === SortingColumns.APY) {
          aValue = Number.parseFloat(a.metrics?.apy ?? "0");
          bValue = Number.parseFloat(b.metrics?.apy ?? "0");
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
  }, [userTokens, debouncedSearch, selectedChains, sortColumn, sortDirection]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="size-full"
    >
      <AnimatePresence mode="wait">
        {isLoadingUserTokens || isRefetchingUserTokens ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center w-full h-full"
          >
            <DNA
              visible={true}
              height="100"
              width="100"
              ariaLabel="user-tokens-dna-loading"
            />
          </motion.div>
        ) : isErrorUserTokens ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center items-center w-full h-full gap-4"
          >
            <h2 className="text-xl md:text-3xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
              Error loading your positions...
            </h2>
            <RemoteButton onClick={refetchUserTokens}>Try Again</RemoteButton>
          </motion.div>
        ) : filteredUserTokens?.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center w-full h-full"
          >
            <h2 className="text-xl md:text-3xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
              No positions found :(
            </h2>
          </motion.div>
        ) : (
          <motion.div
            key="my-positions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-start items-start w-full h-full"
          >
            {filteredUserTokens?.map((position, index) => (
              <PositionTableRow
                key={position.key}
                position={position}
                index={index}
                isLast={index === filteredUserTokens.length - 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
