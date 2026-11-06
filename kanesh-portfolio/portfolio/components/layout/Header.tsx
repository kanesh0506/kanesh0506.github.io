"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReady } from "@/components/providers/ReadyProvider";
import { Close, Menu } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { profile } from "@/data/profile";
import { cn, ease } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#testimonials", label: "Reviews" },
];

export function Header() {
  const { ready } = useReady();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

  // Highlight the section currently crossing the middle of the viewport.
  useEffect(() => {
    const ids = ["top", ...links.map((l) => l.href.slice(1)), "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobile menu: lock scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        data-reveal
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -90, opacity: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.3 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div className="glass flex w-full max-w-4xl items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2 shadow-[0_10px_40px_-14px_rgb(0_0_0/0.4)]">
          <a href="#top" className="font-display text-base font-semibold tracking-tight">
            {profile.name}
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm transition-colors duration-300",
                        isActive ? "bg-ink text-bg" : "text-muted hover:text-ink",
                      )}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-bg transition-opacity hover:opacity-85 sm:inline-flex"
            >
              Let’s talk
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile" className="flex h-full flex-col justify-center gap-1 px-gutter">
              {[...links, { href: "#contact", label: "Contact" }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-h1 font-semibold"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.6, ease }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
