"use client";

import { Moon, Sun } from "@/components/ui/Icons";

/** Icons switch purely with CSS (`dark:`), so there is no hydration mismatch. */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors duration-300 hover:bg-ink hover:text-bg"
    >
      <Sun className="hidden size-[18px] dark:block" />
      <Moon className="size-[18px] dark:hidden" />
    </button>
  );
}
