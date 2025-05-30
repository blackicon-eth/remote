import { SupportedNetworks } from "@/lib/enums";
import { BackgroundGradient } from "../aceternity-ui/background-gradient";
import { motion } from "motion/react";

interface ChainButtonProps {
  chain?: SupportedNetworks;
  text?: string;
  imageUrl: string;
  alt: string;
  selectedChains: SupportedNetworks[];
  setSelectedChains: (chains: SupportedNetworks[]) => void;
  imageSize?: number;
  glowColor?: string;
  borderColor?: string;
  index?: number;
}

export const ChainButton = ({
  chain,
  text,
  imageUrl,
  alt,
  selectedChains,
  setSelectedChains,
  imageSize = 28,
  glowColor = "#42b5d4",
  borderColor = "#42b5d4",
  index = 0,
}: ChainButtonProps) => {
  const isSelected = selectedChains.includes(chain as SupportedNetworks);

  const handleClick = () => {
    if (isSelected) {
      setSelectedChains(selectedChains.filter((c) => c !== (chain as SupportedNetworks)));
    } else {
      setSelectedChains(selectedChains.concat(chain as SupportedNetworks));
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className="cursor-pointer z-[2]"
      onClick={handleClick}
    >
      <BackgroundGradient
        selected={isSelected}
        index={index}
        glowColor={glowColor}
        borderColor={borderColor}
        className="relative flex items-center justify-center rounded-[22px] w-[150px] h-[50px] bg-neutral-900 cursor-pointer gap-3"
      >
        <img
          src={imageUrl}
          alt={alt}
          height={imageSize}
          width={imageSize}
          className="object-contain"
        />
        {text && (
          <p className="text-base sm:text-lg text-white font-bold dark:text-neutral-200">{text}</p>
        )}
      </BackgroundGradient>
    </motion.button>
  );
};
