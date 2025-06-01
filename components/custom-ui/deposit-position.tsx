import { motion } from "motion/react";
import { Input } from "../shadcn-ui/input";
import { Select } from "../shadcn-ui/select";
import { SelectTrigger } from "../shadcn-ui/select";
import { SelectValue } from "../shadcn-ui/select";
import { SelectContent } from "../shadcn-ui/select";
import { SelectItem } from "../shadcn-ui/select";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";
import { PortalsToken } from "@/lib/portals/types";
import { useEffect, useState } from "react";
import { useAppKitState } from "@reown/appkit/react";
import { useUserBalances } from "../context/user-balances-provider";
import { RemoteButton } from "./remote-button";

interface DepositPositionProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
  position: PortalsToken;
}

export const DepositPosition = ({
  setIsModalOpen,
  position,
}: DepositPositionProps) => {
  const { selectedNetworkId } = useAppKitState();
  const { userTokens } = useUserBalances();
  const [selectedDepositToken, setSelectedDepositToken] =
    useState<PortalsToken | null>(null);
  const [amount, setAmount] = useState<string>("");

  // Get the user tokens he has in his wallet
  const userWalletTokens = userTokens?.tokens;

  // When the connected network changes, close the modal
  useEffect(() => {
    const prevNetworkId = selectedNetworkId;
    if (prevNetworkId !== selectedNetworkId) {
      setSelectedDepositToken(null);
      setIsModalOpen(false);
    }
  }, [selectedNetworkId]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col justify-center items-center w-full h-full gap-3"
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
                    if (Number(value) > (selectedDepositToken?.balance ?? 0)) {
                      setAmount(
                        selectedDepositToken?.balance?.toString() ?? "0"
                      );
                    } else {
                      setAmount(value);
                    }
                  }
                }}
              />
              {userWalletTokens && userWalletTokens?.length > 0 ? (
                <Select
                  value={selectedDepositToken?.key}
                  onValueChange={(value) =>
                    setSelectedDepositToken(
                      userWalletTokens?.find((token) => token.key === value) ??
                        null
                    )
                  }
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Token" />
                  </SelectTrigger>
                  <SelectContent>
                    {userWalletTokens?.map((token) => (
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
                  {formatNumber(selectedDepositToken?.balance ?? 0, 4)}
                </p>
                <button
                  className={cn(
                    "text-xs text-neutral-400 underline hover:text-white transition-all duration-300 cursor-pointer",
                    !selectedDepositToken &&
                      "hover:text-neutral-400 cursor-default no-underline"
                  )}
                  disabled={!selectedDepositToken}
                  onClick={() =>
                    setAmount(selectedDepositToken?.balance?.toString() ?? "0")
                  }
                >
                  Max
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <RemoteButton
        className="w-full rounded-lg"
        containerClassName="w-full rounded-lg"
        hoverZoom={1.005}
        tapZoom={0.995}
        disabled={
          !selectedDepositToken ||
          Number(amount) <= 0 ||
          Number(amount) > (selectedDepositToken?.balance ?? 0) ||
          Number(amount) > (position.balance ?? 0)
        }
      >
        Deposit
      </RemoteButton>
    </>
  );
};
