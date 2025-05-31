import { AnimatePresence, motion } from "motion/react";
import { HoverBorderGradient } from "../aceternity-ui/hover-border-gradient";
import { useCart } from "../context/cart-provider";
import { ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import { formatNumber } from "@/lib/utils";

export const Navbar = () => {
  const [ensInfo, setEnsInfo] = useState<{
    ensName: string | null;
    avatar: string | null;
  }>({
    ensName: null,
    avatar: null,
  });
  const { cart, removeFromCart } = useCart();
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Get the ENS name for the address
  useEffect(() => {
    if (address) {
      getEnsNameAndAvatar(address as `0x${string}`).then((ensNameAndAvatar) => {
        setEnsInfo(ensNameAndAvatar);
      });
    }
  }, [address]);

  // Whether the cart is filled with some items or not
  const isCartFilled = useMemo(() => cart.length > 0, [cart]);

  const handleCartOpen = () => {
    if (isConnected && isCartFilled) {
      setIsCartOpen(true);
    } else if (isCartFilled && !isConnected) {
      open({ view: "Connect" });
    }
  };

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
              <DropdownMenuTrigger>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`connect-wallet-${ensInfo.ensName}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="cursor-pointer rounded-full"
                  >
                    <HoverBorderGradient
                      containerClassName="rounded-full h-[40px]"
                      className="bg-neutral-900 text-white flex items-center h-[40px] gap-2 py-0"
                      as="div"
                    >
                      {ensInfo.avatar && (
                        <img
                          src={ensInfo.avatar}
                          alt="ENS Avatar"
                          className="size-6 object-cover rounded-full"
                        />
                      )}
                      <span>
                        {ensInfo.ensName || truncateAddress(address ?? "")}
                      </span>
                    </HoverBorderGradient>
                  </motion.div>
                </AnimatePresence>
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
                containerClassName="rounded-full h-[40px]"
                as="div"
                className="bg-neutral-900 text-white flex items-center h-[40px] gap-2 py-0"
              >
                <span>Connect Wallet</span>
              </HoverBorderGradient>
            </motion.button>
          )}
        </AnimatePresence>

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
      </div>

      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="bg-neutral-950 border-neutral-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center text-2xl gap-2">
              <ShoppingCart className="size-5" />
              <span>Cart</span>
            </DialogTitle>
          </DialogHeader>
          <AnimatePresence mode="wait">
            {cart.length === 0 ? (
              <motion.div
                key="empty-cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center"
              >
                <p>No items in cart</p>
              </motion.div>
            ) : (
              <motion.div
                key="filled-cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div
                      key={item.key}
                      className="flex justify-between items-center p-4 border border-neutral-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-neutral-400 text-sm">
                            ${formatNumber(item.price)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </motion.nav>
  );
};
