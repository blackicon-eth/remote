"use client";

import { useOpportunities } from "@/components/context/opportunities-provider";
import { FullPageError } from "@/components/custom-ui/fullpage-error";
import { FullPageLoading } from "@/components/custom-ui/fullpage-loading";
import { AnimatePresence, motion } from "motion/react";

export default function Home() {
  const {
    opportunities,
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

          {/* Opportunities */}
          <div className="flex flex-col items-center justify-start gap-4">
            {opportunities?.map((opportunity) => (
              <div key={opportunity.key}>{opportunity.name}</div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
