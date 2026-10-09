import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Base UI Select can emit `null` when value is cleared.
 * This wraps a string-only handler.
 */
export function stringHandler(
  fn: (v: string) => void
): (v: string | null) => void {
  return v => fn(v ?? "");
}