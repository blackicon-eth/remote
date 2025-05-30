"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";

interface BackgroundGradientProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  glowColor?: string;
  borderColor?: string;
  index?: number;
  selected?: boolean;
}

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
  glowColor = "#13d113",
  borderColor = "#13d113",
  index = 0,
  selected = false,
}: BackgroundGradientProps) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  const getGradient = (color: string) =>
    `radial-gradient(circle at 0% 100%, ${color}, transparent), radial-gradient(circle at 100% 0%, ${color}, transparent), radial-gradient(circle at 100% 100%, ${color}, transparent), radial-gradient(circle at 0% 0%, ${color}, #141316)`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className={cn("relative p-[2px] group", containerClassName)}
    >
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          background: getGradient(glowColor),
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-10 blur-xs transition duration-200 will-change-transform",
          selected && "opacity-60"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          background: getGradient(borderColor),
        }}
        className="absolute inset-0 rounded-3xl z-[1] opacity-25 will-change-transform"
      />

      <div className={cn("relative z-10 w-[150px] h-[56px]", className)}>{children}</div>
    </motion.div>
  );
};
