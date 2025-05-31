import { motion } from "motion/react";
import { useCart } from "../context/cart-provider";
import { PortalsToken } from "@/lib/portals/types";
import { ChainImages } from "@/lib/constants";
import { SupportedNetworks } from "@/lib/enums";
import { cn, formatNumber, platformNameFormatter } from "@/lib/utils";

interface OpportunityTableRowProps {
  opportunity: PortalsToken;
  isLast: boolean;
  index: number;
}

export const OpportunityTableRow = ({
  opportunity,
  isLast,
  index,
}: OpportunityTableRowProps) => {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <motion.button
      key={opportunity.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      className="w-full cursor-pointer"
      onClick={() => {
        // if the opportunity is already in the cart, remove it
        if (cart.some((t) => t.key === opportunity.key)) {
          removeFromCart(opportunity);
        } else {
          addToCart(opportunity);
        }
      }}
    >
      <div
        className={cn(
          "relative flex justify-between items-center w-full py-5 px-2 border-b border-neutral-700 transition-all duration-500",
          isLast && index > 4 && "border-b-0",
          cart.some((t) => t.key === opportunity.key) && "bg-neutral-600/30"
        )}
      >
        {/* Chain icon */}
        <div className="absolute flex justify-center items-center top-0 left-0 bg-neutral-700 rounded-br-lg size-6">
          <img
            src={ChainImages[opportunity.network as SupportedNetworks]}
            alt={opportunity.network}
            className="size-[18px] -ml-[1px] -mt-[1px]"
          />
        </div>

        <div className="flex justify-start items-center shrink-0 w-[50%]">
          <div className="flex justify-center items-center w-[96px]">
            {opportunity.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={opportunity.name}
                className="rounded-full object-cover"
                style={{
                  marginLeft:
                    index === 0 ? 0 : opportunity.images.length > 4 ? -20 : -14,
                  width: opportunity.images.length === 2 ? "40px" : "35px",
                  height: opportunity.images.length === 2 ? "40px" : "35px",
                }}
              />
            ))}
          </div>
          <div className="flex flex-col justify-start items-start ml-3 gap-0.5">
            <div className="text-white text-[15px]">{opportunity.name}</div>
            <div className="flex justify-start items-center gap-1">
              <img
                src={opportunity.images[0]}
                alt={opportunity.name}
                className="rounded-full object-cover size-[16px]"
              />
              <p className="text-neutral-400 text-xs pt-[2px]">
                {platformNameFormatter(opportunity.platform)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center shrink-0 w-[500px] text-white text-sm pr-10">
          <div className="flex justify-center items-center w-[25%] text-[15px] font-medium">
            $0
          </div>
          <div className="flex justify-center items-center w-[25%] text-[15px] font-medium">
            {opportunity.metrics.apy}%
          </div>
          <div className="flex justify-center items-center w-[25%] text-[15px] font-medium">
            ${formatNumber(opportunity.liquidity)}
          </div>
        </div>
      </div>
    </motion.button>
  );
};
