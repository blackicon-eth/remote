"use client";

import { useOpportunities } from "@/components/context/opportunities-provider";
import { ChainButton } from "@/components/custom-ui/chain-button";
import { FullPageError } from "@/components/custom-ui/fullpage-error";
import { FullPageLoading } from "@/components/custom-ui/fullpage-loading";
import { ModeButton } from "@/components/custom-ui/mode-button";
import { ListModes, SupportedNetworks } from "@/lib/enums";
import { ChainColors, ChainImages } from "@/lib/constants";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Home() {
  const [selectedChains, setSelectedChains] = useState<SupportedNetworks[]>([
    SupportedNetworks.ARBITRUM,
    SupportedNetworks.BASE,
    SupportedNetworks.POLYGON,
  ]);
  const [selectedMode, setSelectedMode] = useState<ListModes>(
    ListModes.ALL_POSITIONS
  );

  const {
    //opportunities,
    isLoadingOpportunities,
    isErrorOpportunities,
    refetchOpportunities,
    isRefetchingOpportunities,
  } = useOpportunities();

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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
