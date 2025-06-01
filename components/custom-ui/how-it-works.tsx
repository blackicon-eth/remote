import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../shadcn-ui/dialog";
import { HelpCircle } from "lucide-react";

export const HowItWorks = () => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  return (
    <Dialog open={isHowItWorksOpen} onOpenChange={setIsHowItWorksOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 mr-8 rounded-lg bg-neutral-900/50 border border-neutral-800 text-white hover:bg-neutral-800/50 transition-colors duration-200 cursor-pointer">
          <HelpCircle className="size-4" />
          <span className="text-sm font-medium">How it works</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-950 border-neutral-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center text-2xl gap-2">
            <HelpCircle className="size-6" />
            How Remote Works
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="text-center mb-4">
            <p className="text-neutral-300">
              <strong>Remote</strong> makes it easy to access top DeFi
              opportunities all from one place, in one transaction.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Choose Any Chain</h3>
                <p className="text-neutral-400">
                  Start on your home chain (e.g., Flow or Flare).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Interact With Top DeFi Protocols
                </h3>
                <p className="text-neutral-400">
                  Use Remote to interact with top DeFi protocols on Base,
                  Arbitrum, and Polygon without bridging manually in just one
                  transaction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  One Wallet, Multiple Chains
                </h3>
                <p className="text-neutral-400">
                  Remote uses <strong>smart accounts</strong> tied to your
                  wallet address across all networks. You get a unified
                  experience across chains with no extra steps.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Cross-Chain Execution
                </h3>
                <p className="text-neutral-400">
                  Thanks to <strong>LayerZero</strong> messaging, Remote
                  securely sends your transaction to the destination chain and
                  executes it remotely, all from your origin chain.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                5
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Manage Positions Easily
                </h3>
                <p className="text-neutral-400">
                  Monitor or close your positions at any time with a single
                  click thank to smart accounts and cross-chain messaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
