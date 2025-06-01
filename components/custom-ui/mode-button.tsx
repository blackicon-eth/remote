import { ListModes } from "@/lib/enums";
import { BackgroundGradient } from "../aceternity-ui/background-gradient";
import { motion } from "motion/react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useMemo } from "react";

interface ModeButtonProps {
  text: string;
  listMode: ListModes;
  selectedMode: ListModes;
  setSelectedMode: (mode: ListModes) => void;
  glowColor?: string;
  borderColor?: string;
}

export const ModeButton = ({
  text,
  listMode,
  selectedMode,
  setSelectedMode,
  glowColor = "#42b5d4",
  borderColor = "#42b5d4",
}: ModeButtonProps) => {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  const isSelected = selectedMode === listMode;
  const isMyPositionsAndDisconnected = useMemo(
    () => !isConnected && listMode === ListModes.MY_POSITIONS,
    [isConnected, listMode]
  );

  // If the wallet is disconnected while the MY_POSITIONS
  // button is selected, we need to deselect it
  useEffect(() => {
    if (isSelected && isMyPositionsAndDisconnected) {
      setSelectedMode(ListModes.ALL_POSITIONS);
    }
  }, [isConnected]);

  const handleClick = () => {
    if (isMyPositionsAndDisconnected) {
      open({ view: "Connect" });
    } else if (isSelected) {
      return;
    } else {
      setSelectedMode(listMode);
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
        glowColor={glowColor}
        borderColor={borderColor}
        className="relative flex items-center justify-center rounded-[22px] w-[150px] h-[50px] bg-neutral-900 cursor-pointer gap-3"
      >
        <p className="text-md text-white font-bold dark:text-neutral-200">
          {text}
        </p>
      </BackgroundGradient>
    </motion.button>
  );
};
