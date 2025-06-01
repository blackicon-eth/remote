"use client";

import { useOpportunities } from "@/components/context/opportunities-provider";
import { ChainButton } from "@/components/custom-ui/chain-button";
import { FullPageError } from "@/components/custom-ui/fullpage-error";
import { FullPageLoading } from "@/components/custom-ui/fullpage-loading";
import { ModeButton } from "@/components/custom-ui/mode-button";
import {
  ListModes,
  SortingDirections,
  SortingColumns,
  SupportedNetworks,
} from "@/lib/enums";
import { ChainColors, ChainImages } from "@/lib/constants";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { PlaceholdersAndVanishInput } from "@/components/aceternity-ui/placeholder-vanish-input";
import { TableHeaderButton } from "@/components/custom-ui/table-header-button";
import { MyPositionsContainer } from "@/components/custom-ui/my-positions-container";
import { AllOpportunitiesContainer } from "@/components/custom-ui/all-opportunities-container";

export default function Home() {
  const [selectedChains, setSelectedChains] = useState<SupportedNetworks[]>([
    SupportedNetworks.ARBITRUM,
    SupportedNetworks.BASE,
    SupportedNetworks.POLYGON,
  ]);
  const [selectedMode, setSelectedMode] = useState<ListModes>(
    ListModes.ALL_POSITIONS
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<SortingColumns | null>(null);
  const [sortDirection, setSortDirection] = useState<SortingDirections | null>(
    null
  );

  const {
    isLoadingOpportunities,
    isErrorOpportunities,
    refetchOpportunities,
    isRefetchingOpportunities,
  } = useOpportunities();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Changes the sort direction of the table
  const handleSort = useCallback(
    (column: SortingColumns) => {
      if (sortColumn === column) {
        if (sortDirection === SortingDirections.DESC) {
          setSortDirection(SortingDirections.ASC);
        } else if (sortDirection === SortingDirections.ASC) {
          setSortColumn(null);
          setSortDirection(null);
        }
      } else {
        setSortColumn(column);
        setSortDirection(SortingDirections.DESC);
      }
    },
    [sortColumn, sortDirection]
  );

  return (
    <AnimatePresence mode="wait">
      {isLoadingOpportunities || isRefetchingOpportunities ? (
        <FullPageLoading key="loading" />
      ) : isErrorOpportunities ? (
        <FullPageError onTryAgain={refetchOpportunities} key="error" />
      ) : (
        <>
          <motion.div
            key="opportunities"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-start min-h-screen pt-[90px] pb-10 px-40 gap-8"
          >
            {/* Title */}
            <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mb-3 text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
              Access DeFi in one transaction. Remotely.
            </h2>

            <div className="flex flex-col justify-start items-start w-full h-full gap-4">
              {/* Filters */}
              <div className="flex justify-between items-center w-full gap-4 px-0.5">
                <div className="flex justify-start items-center gap-4">
                  {Object.values(SupportedNetworks).map((chain) => (
                    <ChainButton
                      key={chain}
                      glowColor={ChainColors[chain]}
                      borderColor={ChainColors[chain]}
                      chain={chain}
                      text={chain.slice(0, 1).toUpperCase() + chain.slice(1)}
                      imageUrl={ChainImages[chain]}
                      alt={chain}
                      selectedChains={selectedChains}
                      setSelectedChains={setSelectedChains}
                    />
                  ))}
                </div>
                <div className="flex justify-start items-center gap-4">
                  <ModeButton
                    glowColor="#f5c753"
                    borderColor="#f5c753"
                    text="All"
                    selectedMode={selectedMode}
                    setSelectedMode={setSelectedMode}
                    listMode={ListModes.ALL_POSITIONS}
                  />
                  <ModeButton
                    glowColor="#edd072"
                    borderColor="#edd072"
                    text="My Positions"
                    selectedMode={selectedMode}
                    setSelectedMode={setSelectedMode}
                    listMode={ListModes.MY_POSITIONS}
                  />
                </div>
              </div>

              {/* Table */}
              <div className="flex flex-col justify-start items-start size-full rounded-lg bg-neutral-900/50 border border-neutral-800 pt-2 gap-2 z-[1]">
                {/* Table header */}
                <div className="flex justify-between items-center w-full h-full px-2">
                  <div className="flex justify-start items-center shrink-0 w-[50%]">
                    <PlaceholdersAndVanishInput
                      placeholders={[
                        "USDT...",
                        "Curve...",
                        "Aave...",
                        "Uniswap...",
                      ]}
                      onChange={(e) => setSearchInput(e.target.value)}
                      setSearchInput={setSearchInput}
                    />
                  </div>
                  <div className="flex justify-between items-center shrink-0 w-[500px] h-[40px] text-white text-sm pr-[44px]">
                    <TableHeaderButton
                      text="Deposited"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      column={SortingColumns.DEPOSITED}
                      onSort={handleSort}
                    />
                    <TableHeaderButton
                      text="Current APY"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      column={SortingColumns.APY}
                      onSort={handleSort}
                    />
                    <TableHeaderButton
                      text="Liquidity"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      column={SortingColumns.LIQUIDITY}
                      onSort={handleSort}
                    />
                  </div>
                </div>

                {/* Table body */}
                <div className="flex flex-col rounded-b-lg bg-neutral-800/50 h-[460px] overflow-y-auto w-full [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <AnimatePresence mode="wait">
                    {/* My Positions */}
                    {selectedMode === ListModes.MY_POSITIONS && (
                      <MyPositionsContainer
                        key="my-positions"
                        debouncedSearch={debouncedSearch}
                        selectedChains={selectedChains}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                      />
                    )}

                    {/* All Opportunities */}
                    {selectedMode === ListModes.ALL_POSITIONS && (
                      <AllOpportunitiesContainer
                        key="all-opportunities"
                        debouncedSearch={debouncedSearch}
                        selectedChains={selectedChains}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
