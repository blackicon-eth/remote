"use client";

import { PortalsToken } from "@/lib/portals/types";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface CartContextType {
  cart: PortalsToken[];
  addToCart: (token: PortalsToken) => void;
  removeFromCart: (token: PortalsToken) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<PortalsToken[]>([]);

  // Add an element to the cart
  const addToCart = useCallback(
    (token: PortalsToken) => {
      setCart([...cart, token]);
    },
    [cart]
  );

  // Remove an element from the cart
  const removeFromCart = useCallback(
    (token: PortalsToken) => {
      setCart(cart.filter((t) => t.key !== token.key));
    },
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
    }),
    [cart, addToCart, removeFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
