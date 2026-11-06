import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Shared easing curve (expo out) used across Framer Motion transitions. */
export const ease = [0.16, 1, 0.3, 1] as const;
