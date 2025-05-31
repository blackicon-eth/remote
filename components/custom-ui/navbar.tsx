import { AnimatePresence, motion } from "motion/react";
import { HoverBorderGradient } from "../aceternity-ui/hover-border-gradient";
import { useCart } from "../context/cart-provider";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitState,
  useDisconnect,
} from "@reown/appkit/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { cn, truncateAddress } from "@/lib/utils";
import { getEnsNameAndAvatar } from "@/lib/ens";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import { formatNumber } from "@/lib/utils";
import { Input } from "../shadcn-ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/select";
import { PortalsToken } from "@/lib/portals/types";
import { useUserBalances } from "../context/user-balances-provider";
import { networks } from "@/lib/appkit";

export const Navbar = () => {
  const [ensInfo, setEnsInfo] = useState<{
    ensName: string | null;
    avatar: string | null;
  }>({
    ensName: null,
    avatar: null,
  });
  const { cart, removeFromCart } = useCart();
  const { userTokens } = useUserBalances();
  const { selectedNetworkId } = useAppKitState();
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemStates, setCartItemStates] = useState<{
    [key: string]: {
      amount: string;
      selectedToken: PortalsToken | null;
    };
  }>({});

  // Get the ENS name for the address
  useEffect(() => {
    if (address) {
      getEnsNameAndAvatar(address as `0x${string}`).then((ensNameAndAvatar) => {
        setEnsInfo(ensNameAndAvatar);
      });
    }
  }, [address]);

  const sanitizedNetworkId = selectedNetworkId?.split(":")[1] ?? "0";

  // Filter user tokens based on the chain of the position
  const filteredUserTokens = userTokens?.tokens?.filter(
    (token) =>
      token.network ===
      networks.find((network) => network.id === Number(sanitizedNetworkId))
        ?.name
  );

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
            {filteredUserTokens?.length === 0 ? (
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
                        <div className="flex justify-between items-center w-full">
                          <div className="flex justify-center items-center gap-1.5 text-sm text-neutral-400 px-1">
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
                            onClick={() => removeFromCart(item)}
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
                                    ...prev[item.key],
                                    selectedToken:
                                      filteredUserTokens?.find(
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
                                Balance:
                              </p>
                              <p className="text-xs text-neutral-400">
                                $
                                {formatNumber(
                                  cartItemStates[item.key]?.selectedToken
                                    ?.balanceUSD ?? 0
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
                                onClick={() =>
                                  setCartItemStates((prev) => ({
                                    ...prev,
                                    [item.key]: {
                                      ...prev[item.key],
                                      amount:
                                        cartItemStates[
                                          item.key
                                        ]?.selectedToken?.balance?.toString() ??
                                        "0",
                                    },
                                  }))
                                }
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
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </motion.nav>
  );
};
