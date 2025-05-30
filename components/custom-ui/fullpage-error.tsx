import { motion } from "motion/react";
import { RemoteButton } from "./remote-button";

interface FullPageErrorProps {
  onTryAgain: () => void;
  showButton?: boolean;
}

export const FullPageError = ({
  onTryAgain,
  showButton = true,
}: FullPageErrorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen gap-8"
    >
      <h2 className="text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        Error loading opportunities
      </h2>
      {showButton && (
        <RemoteButton onClick={onTryAgain}>Try Again</RemoteButton>
      )}
    </motion.div>
  );
};
