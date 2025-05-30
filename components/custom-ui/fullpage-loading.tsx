import { motion } from "motion/react";
import { DNA } from "react-loader-spinner";

interface FullPageLoadingProps {
  loaderSize?: number;
}

export const FullPageLoading = ({ loaderSize = 140 }: FullPageLoadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <DNA
        visible={true}
        height={loaderSize}
        width={loaderSize}
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </motion.div>
  );
};
