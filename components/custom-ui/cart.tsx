import { CheckCircle, ShoppingCart, SquareArrowOutUpRight } from "lucide-react";
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
  extractStepParams,
  formatNumber,
  generateApproveSteps,
  generateTransactionStep,
  sanitizeNetworkId,
  useDebounce,
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
import { Address, Hex } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { TransactionStep } from "@/lib/types";
import { TransactionStatus } from "@/lib/enums";
import StatusIndicator from "./status-indicator";

enum CartStatus {
  COMPILING = "compiling",
  APPROVING = "approving",
  TRANSACTIONS = "transactions",
  FINISHED = "finished",
}

export const Cart = () => {
  const { userTokens, sentinelContractAddress, refetchUserTokens } =
    useUserBalances();
  const { isConnected, address: userAddress } = useAppKitAccount();
  const { selectedNetworkId } = useAppKitState();
  const { cart, removeFromCart, clearCart } = useCart();
  const { open } = useAppKit();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemStates, setCartItemStates] = useState<{
    [key: string]: {
      amount: string;
      selectedToken: PortalsToken | null;
      opportunity: PortalsToken | null;
    };
  }>({});
  const [remainingTokenBalance, setRemainingTokenBalance] = useState<{
    [userTokenKey: PortalsToken["key"]]: number;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [cartStatus, setCartStatus] = useState<CartStatus>(
    CartStatus.COMPILING
  );
  const [transactionSteps, setTransactionSteps] = useState<TransactionStep[]>(
    []
  );

  // Sanitized network id
  const sanitizedNetworkId = useMemo(
    () => sanitizeNetworkId(selectedNetworkId),
    [selectedNetworkId]
  );

  // Function to change the status of a transaction step
  const handleChangeStatus = (
    index: number,
    status: TransactionStatus,
    originTransaction: { hash: Hex; link: string } | null
  ) => {
    setTransactionSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index] = {
        ...newSteps[index],
        status,
        originTransaction,
      };
      return newSteps;
    });
  };

  // The current step
  // (the step that is not yet successful)
  const { currentStep, currentStepIndex } = useMemo(() => {
    const currentStepIndex = transactionSteps.findIndex(
      (step) => step.status !== TransactionStatus.SUCCESS
    );
    return {
      currentStep: transactionSteps[currentStepIndex],
      currentStepIndex,
    };
  }, [transactionSteps]);

  // wagmi hooks
  const {
    data: txHash,
    isError: isTxWalletError,
    writeContract,
  } = useWriteContract();
  const { isError: isTxError, isSuccess: isTxSuccess } =
    useWaitForTransactionReceipt({
      hash: txHash,
    });

  // Whether there is an error
  const isGenericError = useMemo(
    () => isTxWalletError || isTxError,
    [isTxWalletError, isTxError]
  );

  const buttonObject = useMemo(() => {
    if (isGenericError) {
      return {
        text: cartStatus === CartStatus.COMPILING ? "Deposit" : "Retry",
        onClick: async () => {
          setIsLoading(true);
          const approveSteps = await generateApproveSteps(
            cartItemStates,
            sanitizedNetworkId,
            userAddress as Address
          );
          if (approveSteps.length > 0) {
            setTransactionSteps(approveSteps);
            setCartStatus(CartStatus.APPROVING);
          } else {
            const transactionStep = await generateTransactionStep(
              userAddress as Address,
              sentinelContractAddress?.address as Address,
              cartItemStates,
              sanitizedNetworkId
            );
            setTransactionSteps([transactionStep]);
            setCartStatus(CartStatus.TRANSACTIONS);
          }
        },
      };
    } else if (cartStatus === CartStatus.COMPILING) {
      if (!userAddress) return;
      return {
        text: "Deposit",
        onClick: async () => {
          setIsLoading(true);
          const approveSteps = await generateApproveSteps(
            cartItemStates,
            sanitizedNetworkId,
            userAddress as Address
          );
          if (approveSteps.length > 0) {
            setTransactionSteps(approveSteps);
            setCartStatus(CartStatus.APPROVING);
          } else {
            const transactionStep = await generateTransactionStep(
              userAddress as Address,
              sentinelContractAddress?.address as Address,
              cartItemStates,
              sanitizedNetworkId
            );
            setTransactionSteps([transactionStep]);
            setCartStatus(CartStatus.TRANSACTIONS);
          }
        },
      };
    } else {
      return {
        text: "Close",
        onClick: () => {
          setIsCartOpen(false);
          setCartItemStates({});
          setCartStatus(CartStatus.COMPILING);
          setIsLoading(false);
          setTransactionSteps([]);
          clearCart();
          refetchUserTokens();
        },
      };
    }
  }, [
    cartStatus,
    userAddress,
    cartItemStates,
    selectedNetworkId,
    isGenericError,
  ]);

  // Function to trigger the write contract
  const triggerWriteContract = async (step: TransactionStep) => {
    setIsLoading(true);
    // Update the status of the current step to awaiting confirmation
    handleChangeStatus(
      currentStepIndex,
      TransactionStatus.AWAITING_CONFIRMATION,
      null
    );
    // Extract the write contract params
    const writeContractParams = extractStepParams(step, sanitizedNetworkId);
    writeContract(writeContractParams as any);
  };

  // Update the status of the current step to error
  useEffect(() => {
    if (isGenericError) {
      setIsLoading(false);
      handleChangeStatus(currentStepIndex, TransactionStatus.ERROR, null);
    }
  }, [isGenericError]);

  // Update the status of the current step to success
  useEffect(() => {
    const handleTxSuccess = async () => {
      if (isTxSuccess) {
        console.log("isTxSuccess", isTxSuccess);
        const originTransaction = {
          hash: txHash!,
          link: `${
            sanitizedNetworkId === "747"
              ? "https://evm.flowscan.io/"
              : sanitizedNetworkId === "30"
              ? "https://explorer.rootstock.io/"
              : "https://flarescan.com/"
          }/tx/${txHash}`,
        };

        // Update the status of the current step to success
        handleChangeStatus(
          currentStepIndex,
          TransactionStatus.SUCCESS,
          originTransaction
        );

        // If we finished all approvals, generate the transaction steps and start the transactions
        if (
          currentStepIndex === transactionSteps.length - 1 &&
          cartStatus === CartStatus.APPROVING
        ) {
          const transactionStep = await generateTransactionStep(
            userAddress as Address,
            sentinelContractAddress?.address as Address,
            cartItemStates,
            sanitizedNetworkId
          );
          setCartStatus(CartStatus.TRANSACTIONS);
          setTransactionSteps((prev) => [...prev, transactionStep]);
        } else if (
          currentStepIndex === transactionSteps.length - 1 &&
          cartStatus === CartStatus.TRANSACTIONS
        ) {
          setCartStatus(CartStatus.FINISHED);
          setIsLoading(false);
        }
      }
    };

    handleTxSuccess();
  }, [isTxSuccess]);

  // Automatically start the transaction if the current step is to send
  useEffect(() => {
    // If the current step is to send, trigger the next step
    if (currentStep && currentStep.status === TransactionStatus.TO_SEND) {
      triggerWriteContract(currentStep);
    }
  }, [currentStep]);

  // Debounce the cart item states
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
              setCartStatus(CartStatus.COMPILING);
              setIsLoading(false);
              setTransactionSteps([]);
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
                key="cart-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6 mt-3 p-1 overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {cartStatus === CartStatus.COMPILING ? (
                    <motion.div
                      key="cart-items"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex flex-col gap-6"
                    >
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
                                            (cartItemStates[item.key]
                                              ?.selectedToken?.balance ?? 0)
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
                                        opportunity: item,
                                      },
                                    }))
                                  }
                                >
                                  <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select Token" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {userWalletTokens?.map((token) => (
                                      <SelectItem
                                        key={token.key}
                                        value={token.key}
                                      >
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
                                    Number(
                                      cartItemStates[item.key]?.amount ?? 0
                                    ) *
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
                                          cartItemStates[item.key]
                                            ?.selectedToken?.key ?? ""
                                        ] ?? 0
                                      ),
                                      4
                                    )}
                                  </p>
                                  <button
                                    className={cn(
                                      "text-xs text-neutral-400 underline hover:text-white transition-all duration-300 cursor-pointer",
                                      !cartItemStates[item.key]
                                        ?.selectedToken &&
                                        "hover:text-neutral-400 cursor-default no-underline"
                                    )}
                                    disabled={
                                      !cartItemStates[item.key]?.selectedToken
                                    }
                                    onClick={() => {
                                      const remainingBalance = Number(
                                        remainingTokenBalance[
                                          cartItemStates[item.key]
                                            ?.selectedToken?.key ?? ""
                                        ] ?? 0
                                      );
                                      if (remainingBalance > 0) {
                                        const decimals =
                                          cartItemStates[item.key]
                                            ?.selectedToken?.decimals ?? 0;
                                        setCartItemStates((prev) => ({
                                          ...prev,
                                          [item.key]: {
                                            ...prev[item.key],
                                            amount: (
                                              (Number(
                                                cartItemStates[item.key]
                                                  ?.amount ?? 0
                                              ) *
                                                10 ** decimals +
                                                remainingBalance *
                                                  10 ** decimals) /
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
                    </motion.div>
                  ) : cartStatus === CartStatus.APPROVING ||
                    cartStatus === CartStatus.TRANSACTIONS ? (
                    <motion.div
                      key={cartStatus}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex flex-col gap-4"
                    >
                      {transactionSteps.map((step, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center w-full min-h-[44px] sm:min-h-0"
                        >
                          <div className="flex justify-start items-center w-full gap-4 px-4">
                            {/* Status */}
                            <StatusIndicator status={step.status} />

                            <div className="flex justify-center items-center gap-2">
                              {/* Asset image */}
                              <img
                                src={step.asset?.image}
                                alt={step.asset?.symbol}
                                className="rounded-full object-cover size-[30px]"
                              />

                              {/* Tokens */}
                              <p className="text-lg font-medium">
                                {step.type === "approve"
                                  ? `Approve ${step.asset?.symbol}`
                                  : "Send Tokens"}
                              </p>
                            </div>
                          </div>

                          {/* Tx hashes */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              width: "fit-content",
                              transition: {
                                duration: 0.5,
                                ease: "easeInOut",
                              },
                            }}
                            exit={{ opacity: 0 }}
                            layout
                            className="flex sm:flex-row flex-col justify-center items-end sm:items-center sm:gap-1.5 text-xs underline shrink-0 cursor-pointer"
                          >
                            {step.originTransaction && (
                              <motion.div
                                key={`link-${step.originTransaction.hash}`}
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: 1,
                                  scale: [
                                    1, 1.025, 1.075, 1.15, 1.075, 1.025, 1,
                                  ],
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                layout
                                className="flex justify-center items-center gap-1 text-xs underline shrink-0 cursor-pointer"
                                onClick={() =>
                                  window.open(
                                    step.originTransaction!.link,
                                    "_blank"
                                  )
                                }
                              >
                                See Transaction
                                <SquareArrowOutUpRight className="size-3" />
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="finished"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col justify-center items-center gap-2"
                    >
                      <CheckCircle className="size-10 text-green-400" />
                      <h2 className="text-xl font-medium">
                        Your transaction has been sent!
                      </h2>
                      <p className="text-sm text-neutral-400">
                        You can close this modal now
                      </p>
                    </motion.div>
                  )}
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
                  isLoading={isLoading}
                  onClick={buttonObject?.onClick}
                >
                  {buttonObject?.text}
                </RemoteButton>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
};
