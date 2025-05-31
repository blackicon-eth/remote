import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/cart-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../shadcn-ui/dialog";
import { Input } from "../shadcn-ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/select";
import { Trash2 } from "lucide-react";
import {
  formatNumber,
  generateApproveSteps,
  sanitizeNetworkId,
} from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { PortalsToken } from "@/lib/portals/types";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitState,
} from "@reown/appkit/react";
import { useUserBalances } from "../context/user-balances-provider";
import { RemoteButton } from "./remote-button";
import { Address } from "viem";

enum CartStatus {
  COMPILING = "compiling",
  APPROVING = "approving",
  TRANSACTIONS = "transactions",
  FINISHED = "finished",
}

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const Cart = () => {
  const { userTokens } = useUserBalances();
  const { isConnected } = useAppKitAccount();
  const { selectedNetworkId } = useAppKitState();
  const { open } = useAppKit();
  const { address: userAddress } = useAppKitAccount();
  const { address: smartWalletAddress } = useAppKitSmartWallet();
  const { cart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemStates, setCartItemStates] = useState<{
    [key: string]: {
      amount: string;
      selectedToken: PortalsToken | null;
    };
  }>({});
  const [remainingTokenBalance, setRemainingTokenBalance] = useState<{
    [userTokenKey: PortalsToken["key"]]: number;
  }>({});
  const [cartStatus, setCartStatus] = useState<CartStatus>(
    CartStatus.COMPILING
  );

  const buttonObject = useMemo(() => {
    if (cartStatus === CartStatus.COMPILING) {
      if (!userAddress) return;
      return {
        text: "Compiling",
        onClick: () => {
          const approveSteps = generateApproveSteps(
            cartItemStates,
            sanitizeNetworkId(selectedNetworkId),
            userAddress as Address,
            smartWalletAddress as Address
          );
          setCartStatus(CartStatus.TRANSACTIONS);
        },
      };
    }
  }, [cartStatus]);

  const debouncedCartItemStates = useDebounce(cartItemStates, 300);

  // Get the user tokens he has in his wallet
  const userWalletTokens = userTokens?.tokens;

  // A useEffect to get the remaining amount of a token, given the token key
  useEffect(() => {
    const newRemainingTokenBalance: {
      [userTokenKey: PortalsToken["key"]]: number;
    } = {};
    userWalletTokens?.forEach((token) => {
      const totalAmountUsed = Object.values(debouncedCartItemStates).reduce(
        (acc, state) => {
          return token.key === state.selectedToken?.key
            ? (acc * 10 ** token.decimals +
                Number(state.amount ?? 0) * 10 ** token.decimals) /
                10 ** token.decimals
            : acc;
        },
        0
      );
      newRemainingTokenBalance[token.key] =
        (Number(token.balance) * 10 ** token.decimals -
          totalAmountUsed * 10 ** token.decimals) /
        10 ** token.decimals;
    });
    setRemainingTokenBalance(newRemainingTokenBalance);
  }, [userWalletTokens, debouncedCartItemStates]);

  // Whether the cart is filled with some items or not
  const isCartFilled = useMemo(() => cart.length > 0, [cart]);

  const handleCartOpen = () => {
    if (isConnected && isCartFilled) {
      setIsCartOpen(true);
    } else if (isCartFilled && !isConnected) {
      open({ view: "Connect" });
    }
  };

  // If the cart changes and becomes empty, close the cart
  useEffect(() => {
    if (cart.length === 0) {
      setIsCartOpen(false);
    }
  }, [cart]);

  // When the connected network changes, close the cart
  useEffect(() => {
    setIsCartOpen(false);
  }, [selectedNetworkId]);

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, width: "auto" }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex justify-center items-center cursor-pointer bg-neutral-900 rounded-full border border-neutral-700 p-3 gap-2"
        onClick={handleCartOpen}
      >
        <ShoppingCart className="size-4 text-white" />
        <AnimatePresence>
          {isCartFilled && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1.05, 1.1, 1.15, 1.2, 1.15, 1.1, 1.05, 1],
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute flex justify-center items-center -bottom-0.5 -right-0.5 rounded-full border border-neutral-700 bg-green-500 size-4 text-center text-black text-[9px] font-bold"
            >
              {cart.length}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.button>

      <Dialog
        open={isCartOpen}
        onOpenChange={(open) => {
          setIsCartOpen(open);
          if (!open) {
            setTimeout(() => {
              setCartItemStates({});
            }, 300);
          }
        }}
      >
        <DialogContent className="bg-neutral-950 border-neutral-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center text-3xl gap-2">
              <ShoppingCart className="size-7" />
              <span>Cart</span>
            </DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>
          <AnimatePresence mode="wait">
            {userWalletTokens?.length === 0 ? (
              <motion.div
                key="no-tokens-on-network"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center py-3"
              >
                <h2 className="relative flex-col md:flex-row z-10 text-xl md:leading-tight max-w-5xl mb-3 text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
                  You have no tokens to stake on this network
                </h2>
              </motion.div>
            ) : (
              <motion.div
                key="filled-cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6 mt-3"
              >
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.key}
                      exit={{ opacity: 0 }}
                      className="flex justify-center items-center w-full h-full"
                    >
                      <div className="flex flex-col justify-center items-start w-full gap-2">
                        <div className="flex justify-between items-center w-full px-1">
                          <div className="flex justify-center items-center gap-1.5 text-sm text-neutral-400">
                            <img
                              src={item.images?.[0] ?? item.image}
                              alt={item.name}
                              className="rounded-full object-cover size-[22px]"
                            />
                            {item.name}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            className="text-xs bg-red-500 rounded-md py-0.5 px-2 hover:text-white transition-all duration-300 cursor-pointer flex justify-center items-center gap-1"
                            onClick={() => {
                              removeFromCart(item);
                              setCartItemStates((prev) => {
                                const newState = { ...prev };
                                delete newState[item.key];
                                return newState;
                              });
                            }}
                          >
                            <p>Remove</p>
                            <Trash2 className="size-3.5" />
                          </motion.button>
                        </div>
                        <div className="flex flex-col justify-center items-start w-full border border-neutral-700 rounded-lg p-4 h-[100px] gap-3">
                          <div className="flex justify-between items-center w-full gap-2">
                            <Input
                              className="border-none md:text-xl font-medium"
                              type="number"
                              placeholder="0.00"
                              value={cartItemStates[item.key]?.amount ?? ""}
                              disabled={
                                !cartItemStates[item.key]?.selectedToken
                              }
                              onChange={(e) => {
                                const value = e.target.value;
                                setCartItemStates((prev) => ({
                                  ...prev,
                                  [item.key]: {
                                    ...prev[item.key],
                                    amount: value.startsWith("-")
                                      ? ""
                                      : Number(value) >
                                        (cartItemStates[item.key]?.selectedToken
                                          ?.balance ?? 0)
                                      ? cartItemStates[
                                          item.key
                                        ]?.selectedToken?.balance?.toString() ??
                                        "0"
                                      : value === "" || Number(value) >= 0
                                      ? value
                                      : prev[item.key]?.amount ?? "",
                                  },
                                }));
                              }}
                            />
                            <Select
                              value={
                                cartItemStates[item.key]?.selectedToken?.key
                              }
                              onValueChange={(value) =>
                                setCartItemStates((prev) => ({
                                  ...prev,
                                  [item.key]: {
                                    amount: "",
                                    selectedToken:
                                      userWalletTokens?.find(
                                        (token) => token.key === value
                                      ) ?? null,
                                  },
                                }))
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
                          </div>

                          <div className="flex justify-between items-center w-full pl-2 pr-1">
                            <p className="text-xs text-neutral-400">
                              $
                              {formatNumber(
                                Number(cartItemStates[item.key]?.amount ?? 0) *
                                  (cartItemStates[item.key]?.selectedToken
                                    ?.price ?? 0)
                              )}
                            </p>
                            <div className="flex justify-center items-center gap-1">
                              <p className="text-xs text-neutral-400">
                                Available:
                              </p>
                              <p className="text-xs text-neutral-400">
                                {formatNumber(
                                  Number(
                                    remainingTokenBalance[
                                      cartItemStates[item.key]?.selectedToken
                                        ?.key ?? ""
                                    ] ?? 0
                                  ),
                                  4
                                )}
                              </p>
                              <button
                                className={cn(
                                  "text-xs text-neutral-400 underline hover:text-white transition-all duration-300 cursor-pointer",
                                  !cartItemStates[item.key]?.selectedToken &&
                                    "hover:text-neutral-400 cursor-default no-underline"
                                )}
                                disabled={
                                  !cartItemStates[item.key]?.selectedToken
                                }
                                onClick={() => {
                                  const remainingBalance = Number(
                                    remainingTokenBalance[
                                      cartItemStates[item.key]?.selectedToken
                                        ?.key ?? ""
                                    ] ?? 0
                                  );
                                  if (remainingBalance > 0) {
                                    const decimals =
                                      cartItemStates[item.key]?.selectedToken
                                        ?.decimals ?? 0;
                                    setCartItemStates((prev) => ({
                                      ...prev,
                                      [item.key]: {
                                        ...prev[item.key],
                                        amount: (
                                          (Number(
                                            cartItemStates[item.key]?.amount ??
                                              0
                                          ) *
                                            10 ** decimals +
                                            remainingBalance * 10 ** decimals) /
                                          10 ** decimals
                                        ).toString(),
                                      },
                                    }));
                                  }
                                }}
                              >
                                Max
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <RemoteButton
                  className="flex justify-center items-center w-full rounded-lg h-[43px]"
                  containerClassName="w-full rounded-lg h-[43px]"
                  hoverZoom={1.005}
                  tapZoom={0.995}
                  disabled={
                    Object.keys(cartItemStates).length !== cart.length ||
                    Object.values(cartItemStates).some(
                      (state) =>
                        state.amount === "" || Number(state.amount) <= 0
                    )
                  }
                  isLoading={false}
                >
                  Deposit
                </RemoteButton>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
};
