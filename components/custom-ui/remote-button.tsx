"use client";
import React, { useState, useEffect } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

interface RemoteButtonProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
  onClick?: () => void;
  hoverZoom?: number;
  tapZoom?: number;
  disabled?: boolean;
  isLoading?: boolean;
}

export function RemoteButton({
  children,
  containerClassName,
  className,
  duration = 1,
  clockwise = true,
  onClick,
  hoverZoom = 1.02,
  tapZoom = 0.98,
  disabled = false,
  isLoading = false,
}: RemoteButtonProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);

  return (
    <motion.button
      disabled={disabled}
      whileHover={{ scale: disabled || isLoading ? 1 : hoverZoom }}
      whileTap={{ scale: disabled || isLoading ? 1 : tapZoom }}
      animate={{
        opacity: disabled || isLoading ? 0.5 : 1,
      }}
      onClick={onClick}
      className="cursor-pointer z-10"
    >
      <div
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex rounded-full border content-center bg-neutral-900/20 hover:bg-neutral-900/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit cursor-pointer",
          (disabled || isLoading) && "cursor-default",
          containerClassName
        )}
      >
        <div
          className={cn(
            "w-auto text-white z-10 bg-neutral-900 px-5 py-2 font-semibold rounded-[inherit]",
            className
          )}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
        </div>
        <motion.div
          className={cn(
            "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
          )}
          style={{
            filter: "blur(2px)",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          initial={{ background: movingMap[direction] }}
          animate={{
            background:
              hovered && !disabled
                ? [movingMap[direction], highlight]
                : movingMap[direction],
          }}
          transition={{ ease: "linear", duration: duration ?? 1 }}
        />
        <div className="bg-neutral-900 absolute z-1 flex-none inset-[2px] rounded-[100px]" />
      </div>
    </motion.button>
  );
}
