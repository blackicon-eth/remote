import { motion } from "motion/react";
import { PortalsToken } from "@/lib/portals/types";
import { ChainImages } from "@/lib/constants";
import { SupportedNetworks } from "@/lib/enums";
import { cn, formatNumber, platformNameFormatter } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import { useState } from "react";
import { WithdrawPosition } from "./withdraw-position";

interface PositionTableRowProps {
  position: PortalsToken;
  isLast: boolean;
  index: number;
}

export const PositionTableRow = ({
  position,
  isLast,
  index,
}: PositionTableRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If the position has images, use them, otherwise use the single image
  const positionImages = position.images ?? [position.image];

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <motion.button
          key={position.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
          className="w-full cursor-pointer"
        >
          <div
            className={cn(
              "relative flex justify-between items-center w-full py-5 px-2 border-b border-neutral-700 transition-all duration-500",
              isLast && index > 4 && "border-b-0"
            )}
          >
            {/* Chain icon */}
            <div className="absolute flex justify-center items-center top-0 left-0 bg-neutral-700 rounded-br-lg size-6">
              <img
                src={ChainImages[position.network as SupportedNetworks]}
                alt={position.network}
                className="size-[18px] -ml-[1px] -mt-[1px]"
              />
            </div>

            <div className="flex justify-start items-center shrink-0 w-[50%]">
              <div className="flex justify-center items-center w-[96px]">
                {positionImages.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={position.name}
                    className="rounded-full object-cover"
                    style={{
                      marginLeft:
                        index === 0 ? 0 : positionImages.length > 4 ? -20 : -14,
                      width: positionImages.length === 2 ? "40px" : "35px",
                      height: positionImages.length === 2 ? "40px" : "35px",
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-col justify-start items-start ml-3 gap-0.5">
                <div className="text-white text-[15px]">{position.name}</div>
                <div className="flex justify-start items-center gap-1">
                  <img
                    src={positionImages[0]}
                    alt={position.name}
                    className="rounded-full object-cover size-[16px]"
                  />
                  <p className="text-neutral-400 text-xs pt-[2px]">
                    {platformNameFormatter(position.platform)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center shrink-0 w-[500px] text-white text-sm pr-10">
              <div className="flex justify-center items-center w-[25%] text-[15px] font-medium">
                {position.balanceUSD
                  ? `$${formatNumber(position.balanceUSD)}`
                  : "$0"}
              </div>
              <div className="flex justify-center items-center w-[25%] text-[15px] font-medium">
                {position.metrics.apy}%
              </div>
              <div className="flex justify-center items-center w-[25%] text-[15px] font-medium">
                ${formatNumber(position.liquidity)}
              </div>
            </div>
          </div>
        </motion.button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-950 border-neutral-800 text-white gap-6">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center text-2xl gap-2">
            <img
              src={positionImages[0]}
              alt={position.name}
              className="rounded-full object-cover size-[26px]"
            />
            {position.name}
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <WithdrawPosition
          key="withdraw"
          setIsModalOpen={setIsModalOpen}
          position={position}
        />
      </DialogContent>
    </Dialog>
  );
};
