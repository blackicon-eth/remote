"use client";

import { ShootingStars } from "@/components/aceternity-ui/shooting-stars";
import { StarsBackground } from "@/components/aceternity-ui/stars-background";
import AppKitProvider from "@/components/context/appkit-provider";
import { CartProvider } from "@/components/context/cart-provider";
import { OpportunitiesProvider } from "@/components/context/opportunities-provider";
import { UserBalancesProvider } from "@/components/context/user-balances-provider";
import { Navbar } from "@/components/custom-ui/navbar";

interface ProvidersProps {
  children: React.ReactNode;
  cookies: string | null;
}

// NOTE: The AppKit Provider also provides the Tanstack Query Client
export default function Providers({ children, cookies }: ProvidersProps) {
  return (
    <AppKitProvider cookies={cookies}>
      <OpportunitiesProvider>
        <UserBalancesProvider>
          <CartProvider>
            <Navbar />
            {children}
            <ShootingStars
              minDelay={2000}
              maxDelay={4000}
              maxSpeed={15}
              minSpeed={7}
              starHeight={2}
            />
            <StarsBackground />
          </CartProvider>
        </UserBalancesProvider>
      </OpportunitiesProvider>
    </AppKitProvider>
  );
}
