import { AnimatePresence, motion } from "motion/react";
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
import { useEffect, useState } from "react";
import { Input } from "@/components/shadcn-ui/input";
import { useUserBalances } from "../context/user-balances-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/select";
import { RemoteButton } from "./remote-button";
import { useAppKitState } from "@reown/appkit/react";

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
  const { userTokens } = useUserBalances();
  const { selectedNetworkId } = useAppKitState();
  const [amount, setAmount] = useState<string>("");
  const [selectedDepositToken, setSelectedDepositToken] =
    useState<PortalsToken | null>(null);
  const [selectedMode, setSelectedMode] = useState<"deposit" | "withdraw">(
    "deposit"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  // If the position has images, use them, otherwise use the single image
  const positionImages = position.images ?? [position.image];

  // Filter user tokens based on the chain of the position
  const filteredUserTokens = userTokens?.tokens?.filter(
    (token) => token.network === position.network
  );

  // If the mode changes, reset the amount
  useEffect(() => {
    setAmount("");
  }, [selectedMode]);

  // When the connected network changes, close the modal
  useEffect(() => {
    setSelectedDepositToken(null);
    setIsModalOpen(false);
  }, [selectedNetworkId]);

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
      <DialogContent className="bg-neutral-950 border-neutral-800 text-white">
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
        <div className="flex justify-between items-center px-2 py-1.5 gap-3">
          <button
            className={cn(
              "w-full text-center bg-neutral-900 hover:bg-neutral-800 rounded-lg px-2 py-1.5 cursor-pointer transition-all duration-300",
              selectedMode === "deposit" && "bg-neutral-800"
            )}
            onClick={() => setSelectedMode("deposit")}
          >
            Deposit
          </button>
          <button
            className={cn(
              "w-full text-center bg-neutral-900 hover:bg-neutral-800 rounded-lg px-2 py-1.5 cursor-pointer transition-all duration-300",
              selectedMode === "withdraw" && "bg-neutral-800"
            )}
            onClick={() => setSelectedMode("withdraw")}
          >
            Withdraw
          </button>
        </div>
        <AnimatePresence mode="wait">
          {selectedMode === "deposit" ? (
            <motion.div
              key="deposit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center w-full h-full"
            >
              <div className="flex flex-col justify-center items-start w-full gap-1">
                <label className="text-sm text-neutral-400 px-1">Amount</label>
                <div className="flex flex-col justify-center items-start w-full border border-neutral-700 rounded-lg p-4 h-[100px] gap-3">
                  <div className="flex justify-between items-center w-full gap-2">
                    <Input
                      className="border-none md:text-xl font-medium"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      disabled={!selectedDepositToken}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value.startsWith("-")) {
                          setAmount("");
                        } else if (value === "" || Number(value) >= 0) {
                          if (
                            Number(value) > (selectedDepositToken?.balance ?? 0)
                          ) {
                            setAmount(
                              selectedDepositToken?.balance?.toString() ?? "0"
                            );
                          } else {
                            setAmount(value);
                          }
                        }
                      }}
                    />
                    {filteredUserTokens && filteredUserTokens?.length > 0 ? (
                      <Select
                        value={selectedDepositToken?.key}
                        onValueChange={(value) =>
                          setSelectedDepositToken(
                            filteredUserTokens?.find(
                              (token) => token.key === value
                            ) ?? null
                          )
                        }
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select Token" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredUserTokens?.map((token) => (
                            <SelectItem key={token.key} value={token.key}>
                              <img
                                src={token.image}
                                alt={token.symbol}
                                className="rounded-full object-cover size-[20px]"
                              />
                              {token.symbol}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="w-[200px] text-end text-neutral-400 text-sm leading-none">
                        You have no tokens on this network
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center w-full pl-2 pr-1">
                    <p className="text-xs text-neutral-400">
                      $
                      {formatNumber(
                        Number(amount) * (selectedDepositToken?.price ?? 0)
                      )}
                    </p>
                    <div className="flex justify-center items-center gap-1">
                      <p className="text-xs text-neutral-400">Balance:</p>
                      <p className="text-xs text-neutral-400">
                        ${formatNumber(selectedDepositToken?.balanceUSD ?? 0)}
                      </p>
                      <button
                        className={cn(
                          "text-xs text-neutral-400 underline hover:text-white transition-all duration-300 cursor-pointer",
                          !selectedDepositToken &&
                            "hover:text-neutral-400 cursor-default no-underline"
                        )}
                        disabled={!selectedDepositToken}
                        onClick={() =>
                          setAmount(
                            selectedDepositToken?.balance?.toString() ?? "0"
                          )
                        }
                      >
                        Max
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="withdraw"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center w-full h-full"
            >
              <div className="flex flex-col justify-center items-start w-full gap-1">
                <label className="text-sm text-neutral-400 px-1">Amount</label>
                <div className="flex flex-col justify-center items-start w-full border border-neutral-700 rounded-lg p-4 h-[100px] gap-3">
                  <div className="flex justify-between items-center w-full gap-2">
                    <Input
                      className="border-none md:text-xl font-medium"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value.startsWith("-")) {
                          setAmount("");
                        } else if (value === "" || Number(value) >= 0) {
                          if (Number(value) > (position.balance ?? 0)) {
                            setAmount(position.balance?.toString() ?? "0");
                          } else {
                            setAmount(value);
                          }
                        }
                      }}
                    />
                    {positionImages.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={position.name}
                        className="rounded-full object-cover"
                        style={{
                          marginLeft:
                            index === 0
                              ? 0
                              : positionImages.length > 4
                              ? -20
                              : -14,
                          width: positionImages.length === 2 ? "38px" : "33px",
                          height: positionImages.length === 2 ? "38px" : "33px",
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center w-full pl-2 pr-1">
                    <p className="text-xs text-neutral-400">
                      ${formatNumber(Number(amount) * position.price)}
                    </p>
                    <div className="flex justify-center items-center gap-1">
                      <p className="text-xs text-neutral-400">Balance:</p>
                      <p className="text-xs text-neutral-400">
                        ${formatNumber(position.balanceUSD ?? 0)}
                      </p>
                      <button
                        className="text-xs text-neutral-400 underline hover:text-white transition-all duration-300 cursor-pointer"
                        onClick={() =>
                          setAmount(position.balance?.toString() ?? "0")
                        }
                      >
                        Max
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <RemoteButton
          className="w-full rounded-lg"
          containerClassName="w-full rounded-lg"
          hoverZoom={1.005}
          tapZoom={0.995}
          disabled={
            selectedMode === "deposit"
              ? !selectedDepositToken ||
                Number(amount) <= 0 ||
                Number(amount) > (selectedDepositToken?.balance ?? 0) ||
                Number(amount) > (position.balance ?? 0)
              : Number(amount) <= 0 || Number(amount) > (position.balance ?? 0)
          }
        >
          {selectedMode === "deposit" ? "Deposit" : "Withdraw"}
        </RemoteButton>
      </DialogContent>
    </Dialog>
  );
};
