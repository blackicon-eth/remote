import { AnimatePresence, motion } from "motion/react";
import { HoverBorderGradient } from "../aceternity-ui/hover-border-gradient";
import { useEffect, useState } from "react";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { truncateAddress } from "@/lib/utils";
import { getEnsNameAndAvatar } from "@/lib/ens";

export const Navbar = () => {
  const [ensInfo, setEnsInfo] = useState<{ ensName: string; avatar: string }>({
    ensName: "",
    avatar: "",
  });
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  // Get the ENS name for the address
  useEffect(() => {
    if (address) {
      getEnsNameAndAvatar(address as `0x${string}`).then((ensNameAndAvatar) => {
        setEnsInfo(ensNameAndAvatar);
      });
    }
  }, [address]);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex fixed top-0 left-0 right-0 justify-between items-center w-full px-6 py-3 z-50"
    >
      <h2 className="cursor-pointer text-2xl md:text-[40px] md:leading-tight max-w-5xl tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white">
        Remote
      </h2>
      <div className="flex items-center gap-2">
        <AnimatePresence mode="wait">
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  key="connect-wallet"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="cursor-pointer rounded-full"
                >
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="div"
                    className="bg-neutral-900 text-white h-10 flex items-center gap-2"
                  >
                    <img
                      src={ensInfo.avatar}
                      alt="ENS Avatar"
                      className="size-6 object-cover rounded-full"
                    />
                    <span>
                      {ensInfo.ensName || truncateAddress(address ?? "")}
                    </span>
                  </HoverBorderGradient>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-12 w-[200px] bg-neutral-900 border border-neutral-700 text-white">
                <DropdownMenuLabel className="w-full flex justify-end">
                  Your Wallet
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neutral-700" />
                <div className="flex flex-col gap-2 p-3">
                  <button
                    className="w-full flex justify-center items-center font-semibold bg-red-500 p-2 border-none outline-none rounded-md cursor-pointer"
                    onClick={() => disconnect()}
                  >
                    Disconnect
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.button
              key="connect-wallet"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="cursor-pointer h-10"
              onClick={() => open({ view: "Connect" })}
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="bg-neutral-900 text-white flex items-center"
              >
                <span>Connect Wallet</span>
              </HoverBorderGradient>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
