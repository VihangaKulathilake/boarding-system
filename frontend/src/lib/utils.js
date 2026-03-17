import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// Utility function to combine class names using clsx and twMerge for Tailwind CSS 
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
