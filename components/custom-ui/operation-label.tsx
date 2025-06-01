import { TokenSymbols } from "@/lib/enums";
import { TransactionStep } from "@/lib/types";
import { useMemo } from "react";

interface OperationLabelProps {
  step: TransactionStep;
}

export const OperationLabel = ({ step }: OperationLabelProps) => {
  // Get the description of the operation
  const description = useMemo(() => {
    const firstToken =
      TokenSymbols[
        step.assets[0].asset as keyof typeof TokenSymbols
      ].toUpperCase();
    if (step.type === "approve") {
      return `Approve ${firstToken}`;
    } else if (step.assets.length === 1) {
      return `Send ${firstToken}`;
    } else {
      return "Send Tokens";
    }
  }, [step]);

  return (
    <p className="text-[15px] sm:text-[16px] font-semibold">{description}</p>
  );
};
