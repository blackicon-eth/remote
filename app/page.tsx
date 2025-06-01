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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import { HelpCircle } from "lucide-react";

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
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

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
          {/* How it works button - positioned fixed in top right */}
          <Dialog open={isHowItWorksOpen} onOpenChange={setIsHowItWorksOpen}>
            <DialogTrigger asChild>
              <button className="fixed top-24 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900/50 border border-neutral-800 text-white hover:bg-neutral-800/50 transition-colors duration-200">
                <HelpCircle className="size-4" />
                <span className="text-sm font-medium">How it works</span>
              </button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-950 border-neutral-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center text-2xl gap-2">
                  <HelpCircle className="size-6" />
                  How Remote Works
                </DialogTitle>
                <DialogDescription className="hidden" />
              </DialogHeader>
              <div className="flex flex-col gap-6 py-4">
                <div className="text-center mb-4">
                  <p className="text-neutral-300">
                    <strong>Remote</strong> makes it easy to access top DeFi
                    opportunities all from one place, in one transaction.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Choose Any Chain
                      </h3>
                      <p className="text-neutral-400">
                        Start on your home chain (e.g., Flow or Flare).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Interact With Top DeFi Protocols 
                      </h3>
                      <p className="text-neutral-400">
                        Use Remote to interact with top DeFi protocols on Base,
                        Arbitrum, and Polygon without bridging manually in just
                        one transaction.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        One Wallet, Multiple Chains
                      </h3>
                      <p className="text-neutral-400">
                        Remote uses <strong>smart accounts</strong> tied to your wallet address across all networks.
                        You get a unified experience across chains with no extra
                        steps.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Cross-Chain Execution
                      </h3>
                      <p className="text-neutral-400">
                        Thanks to <strong>LayerZero</strong> messaging, Remote
                        securely sends your transaction to the destination chain
                        and executes it remotely, all from your origin chain.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Manage Positions Easily
                      </h3>
                      <p className="text-neutral-400">
                        Monitor or close your positions at any time with a
                        single click thank to smart accounts and cross-chain
                        messaging.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

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
                  {Object.values(SupportedNetworks).map((chain, index) => (
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
                      index={index}
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
                    index={3}
                  />
                  <ModeButton
                    glowColor="#edd072"
                    borderColor="#edd072"
                    text="My Positions"
                    selectedMode={selectedMode}
                    setSelectedMode={setSelectedMode}
                    listMode={ListModes.MY_POSITIONS}
                    index={4}
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
