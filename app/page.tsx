"use client";

import { useOpportunities } from "@/components/context/opportunities-provider";
import { ChainButton } from "@/components/custom-ui/chain-button";
import { FullPageError } from "@/components/custom-ui/fullpage-error";
import { FullPageLoading } from "@/components/custom-ui/fullpage-loading";
import { ModeButton } from "@/components/custom-ui/mode-button";
import { ListModes, SupportedNetworks } from "@/lib/enums";
import { ChainColors, ChainImages } from "@/lib/constants";
import { AnimatePresence, motion } from "motion/react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { PlaceholdersAndVanishInput } from "@/components/aceternity-ui/placeholder-vanish-input";
import { ChevronDown } from "lucide-react";
import { useCart } from "@/components/context/cart-provider";

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

  const {
    opportunities,
    isLoadingOpportunities,
    isErrorOpportunities,
    refetchOpportunities,
    isRefetchingOpportunities,
  } = useOpportunities();

  const filteredOpportunities = useMemo(() => {
    return opportunities?.filter((opportunity) =>
      opportunity.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [opportunities, searchInput]);

  useEffect(() => {
    console.log(opportunities);
  }, [opportunities]);

  return (
    <AnimatePresence mode="wait">
      {isLoadingOpportunities || isRefetchingOpportunities ? (
        <FullPageLoading key="loading" />
      ) : isErrorOpportunities ? (
        <FullPageError onTryAgain={refetchOpportunities} key="error" />
      ) : (
        <motion.div
          key="opportunities"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-start min-h-screen pt-[90px] pb-10 px-40 gap-8"
        >
          {/* Title */}
          <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mb-3 text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
            Stake in one Transaction. Remotely.
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
                  <button className="flex justify-center items-center w-[25%] h-full">
                    Deposited
                  </button>
                  <button className="flex justify-center items-center gap-1 w-[25%] h-full cursor-pointer hover:text-neutral-300 transition-colors">
                    Current APY
                  </button>
                  <button className="flex justify-center items-center gap-1 w-[25%] h-full cursor-pointer hover:text-neutral-300 transition-colors">
                    Liquidity
                  </button>
                </div>
              </div>

              {/* Table body */}
              <div className="flex flex-col rounded-b-lg bg-neutral-800/50 h-[460px] overflow-y-auto w-full [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                <AnimatePresence mode="wait">
                  {filteredOpportunities?.length === 0 ? (
                    <motion.div
                      key="no-results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-center items-center w-full h-full"
                    >
                      <div className="text-white text-sm">
                        No results found :(
                      </div>
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
                          <p key={index}>{opportunity.name}</p>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
