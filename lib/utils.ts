import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number to a string with the appropriate suffix
 * @param num - The number to format
 * @returns The formatted number with the appropriate suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toString();
}

/**
 * Formats a platform name to a more readable format
 * @param platform - The platform name to format
 * @returns The formatted platform name
 */
export function platformNameFormatter(platform: string) {
  const lowerCasePlatform = platform.toLowerCase();
  if (lowerCasePlatform.includes("uniswap")) return "Uniswap";
  else if (lowerCasePlatform.includes("sushiswap")) return "Sushiswap";
  else if (lowerCasePlatform.includes("curve")) return "Curve";
  else if (lowerCasePlatform.includes("balancer")) return "Balancer";
  else if (lowerCasePlatform.includes("aave")) return "Aave";
  else if (lowerCasePlatform.includes("compound")) return "Compound";
  else if (lowerCasePlatform.includes("yearn")) return "Yearn";
  else if (lowerCasePlatform.includes("dydx")) return "dYdX";
  else if (lowerCasePlatform.includes("maker")) return "Maker";
  else if (lowerCasePlatform.includes("pendle")) return "Pendle";
  else if (lowerCasePlatform.includes("pancake")) return "PancakeSwap";
  else return platform.slice(0, 1).toUpperCase() + platform.slice(1);
}

/**
 * Truncates an address to the given size keeping the 0x prefix
 * @param address - The address to truncate
 * @param size - The size of the truncated address
 * @returns The truncated address
 */
export const truncateAddress = (address: string, size: number = 4) => {
  return `${address.slice(0, size + 2)}...${address.slice(-size)}`;
};
