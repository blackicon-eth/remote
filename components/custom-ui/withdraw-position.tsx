import { AnimatePresence, motion } from "motion/react";
import { Input } from "../shadcn-ui/input";
import {
  extractStepParams,
  formatNumber,
  generateWithdrawTransactionStep,
  sanitizeNetworkId,
} from "@/lib/utils";
import { PortalsToken } from "@/lib/portals/types";
import { useEffect, useMemo, useState } from "react";
import { useAppKitAccount, useAppKitState } from "@reown/appkit/react";
import { RemoteButton } from "./remote-button";
import { Address, Hex } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { TransactionStep } from "@/lib/types";
import { useUserBalances } from "../context/user-balances-provider";
import { TransactionStatus } from "@/lib/enums";
import StatusIndicator from "./status-indicator";
import { CheckCircle, SquareArrowOutUpRight } from "lucide-react";

enum WithdrawStatus {
  COMPILING = "compiling",
  TRANSACTIONS = "transactions",
  FINISHED = "finished",
}

interface WithdrawPositionProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
  position: PortalsToken;
}

export const WithdrawPosition = ({
  position,
  setIsModalOpen,
}: WithdrawPositionProps) => {
  const { address: userAddress } = useAppKitAccount();
  const { sentinelContractAddress, refetchUserTokens } = useUserBalances();
  const { selectedNetworkId } = useAppKitState();
  const [amount, setAmount] = useState<string>("");
  const [withdrawStatus, setWithdrawStatus] = useState<WithdrawStatus>(
    WithdrawStatus.COMPILING
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionSteps, setTransactionSteps] = useState<TransactionStep[]>(
    []
  );

  useEffect(() => {
    console.log("withdrawStatus", withdrawStatus);
  }, [withdrawStatus]);

  // Sanitized network id
  const sanitizedNetworkId = useMemo(
    () => sanitizeNetworkId(selectedNetworkId),
    [selectedNetworkId]
  );

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

  // Update the status of the current step to error
  useEffect(() => {
    if (isGenericError) {
      setIsLoading(false);
      handleChangeStatus(currentStepIndex, TransactionStatus.ERROR, null);
    }
  }, [isGenericError]);

  const buttonObject = useMemo(() => {
    if (isGenericError) {
      return {
        text:
          withdrawStatus === WithdrawStatus.COMPILING ? "Withdraw" : "Retry",
        onClick: async () => {
          setIsLoading(true);
          const transactionStep = await generateWithdrawTransactionStep(
            userAddress as Address,
            sentinelContractAddress?.address as Address,
            position,
            sanitizedNetworkId,
            amount
          );
          setTransactionSteps([transactionStep]);
          setWithdrawStatus(WithdrawStatus.TRANSACTIONS);
        },
      };
    } else if (withdrawStatus === WithdrawStatus.COMPILING) {
      if (!userAddress) return;
      return {
        text: "Deposit",
        onClick: async () => {
          setIsLoading(true);
          const transactionStep = await generateWithdrawTransactionStep(
            userAddress as Address,
            sentinelContractAddress?.address as Address,
            position,
            sanitizedNetworkId,
            amount
          );
          setTransactionSteps([transactionStep]);
          setWithdrawStatus(WithdrawStatus.TRANSACTIONS);
        },
      };
    } else {
      return {
        text: "Close",
        onClick: () => {
          setIsModalOpen(false);
          setWithdrawStatus(WithdrawStatus.COMPILING);
          setIsLoading(false);
          setTransactionSteps([]);
          refetchUserTokens();
        },
      };
    }
  }, [
    withdrawStatus,
    userAddress,
    transactionSteps,
    selectedNetworkId,
    isGenericError,
    amount,
  ]);

  // If the position has images, use them, otherwise use the single image
  const positionImages = position.images ?? [position.image];

  // Update the status of the current step to success
  useEffect(() => {
    const handleTxSuccess = async () => {
      if (isTxSuccess) {
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
          withdrawStatus === WithdrawStatus.TRANSACTIONS
        ) {
          setWithdrawStatus(WithdrawStatus.FINISHED);
          setIsLoading(false);
        }
      }
    };

    handleTxSuccess();
  }, [isTxSuccess]);

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

  // Automatically start the transaction if the current step is to send
  useEffect(() => {
    // If the current step is to send, trigger the next step
    if (currentStep && currentStep.status === TransactionStatus.TO_SEND) {
      triggerWriteContract(currentStep);
    }
  }, [currentStep]);

  // When the connected network changes, close the modal
  useEffect(() => {
    const prevNetworkId = selectedNetworkId;
    if (prevNetworkId !== selectedNetworkId) {
      setIsModalOpen(false);
    }
  }, [selectedNetworkId]);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden size-full"
      >
        <AnimatePresence mode="wait">
          {withdrawStatus === WithdrawStatus.COMPILING ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center w-full h-full"
            >
              <div className="flex flex-col justify-center items-start w-full border border-neutral-700 rounded-lg p-4 h-[100px] gap-3">
                <div className="flex justify-between items-center w-full gap-2">
                  <Input
                    className="border-none md:text-xl font-medium"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (Number(value) > (position.balance ?? 0)) {
                        return;
                      }
                      setAmount(
                        value.startsWith("-")
                          ? ""
                          : value === "" || Number(value) >= 0
                          ? value
                          : ""
                      );
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
            </motion.div>
          ) : withdrawStatus === WithdrawStatus.TRANSACTIONS ? (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex flex-col gap-6 mt-5 mb-6"
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
                          scale: [1, 1.025, 1.075, 1.15, 1.075, 1.025, 1],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        layout
                        className="flex justify-center items-center gap-1 text-xs underline shrink-0 cursor-pointer"
                        onClick={() =>
                          window.open(step.originTransaction!.link, "_blank")
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
      </motion.div>

      <RemoteButton
        className="flex justify-center items-center w-full rounded-lg h-[43px]"
        containerClassName="w-full rounded-lg h-[43px] -mt-3"
        hoverZoom={1.005}
        tapZoom={0.995}
        disabled={
          Number(amount) <= 0 || Number(amount) > (position.balance ?? 0)
        }
        onClick={buttonObject?.onClick}
        isLoading={isLoading}
      >
        {buttonObject?.text}
      </RemoteButton>
    </>
  );
};
