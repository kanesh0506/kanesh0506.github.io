import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

export const buttonStyles = (variant: Variant = "primary", className?: string) =>
  cn(
    "group relative inline-flex h-14 items-center justify-center gap-3 rounded-full px-8 text-sm font-medium tracking-wide transition-colors duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-60",
    variant === "primary" && "bg-ink text-bg hover:bg-ink/85",
    variant === "outline" && "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bg",
    variant === "ghost" && "text-ink hover:bg-ink/10",
    className,
  );

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode };

export function ButtonLink({ variant = "primary", className, children, ...rest }: LinkProps) {
  return (
    <a className={buttonStyles(variant, className)} {...rest}>
      {children}
    </a>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode };

export function Button({ variant = "primary", className, children, type = "button", ...rest }: BtnProps) {
  return (
    <button type={type} className={buttonStyles(variant, className)} {...rest}>
      {children}
    </button>
  );
}
