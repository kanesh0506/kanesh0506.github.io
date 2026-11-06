"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReady } from "@/components/providers/ReadyProvider";
import { profile } from "@/data/profile";
import { ease } from "@/lib/utils";

/**
 * Loading screen. Shown once per browser session, skipped for reduced motion.
 * When it lifts it flips `ready`, which starts the hero entrance so the two hand off in one motion.
 */
export function Loader() {
  const { setReady } = useReady();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("loader-seen") === "1";
    } catch {
      /* ignore */
    }
    if (reduce || seen) {
      setVisible(false);
      setReady(true);
      return;
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const controls = animate(0, 100, {
      duration: 1.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        try {
          sessionStorage.setItem("loader-seen", "1");
        } catch {
          /* ignore */
        }
        root.style.overflow = previousOverflow;
        setVisible(false);
        setReady(true);
      },
    });

    return () => {
      controls.stop();
      root.style.overflow = previousOverflow;
    };
  }, [setReady]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          id="loader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg p-gutter text-ink"
          exit={{ y: "-100%", transition: { duration: 0.9, ease } }}
        >
          <div className="flex items-center justify-between font-mono text-eyebrow uppercase text-muted">
            <span>{profile.name}</span>
            <span>{profile.role}</span>
          </div>
          <p className="font-display text-[clamp(6rem,24vw,18rem)] font-semibold leading-none tracking-tighter tabular-nums">
            {String(count).padStart(3, "0")}
          </p>
          <div className="h-px w-full bg-line">
            <div className="h-full origin-left bg-ink" style={{ transform: `scaleX(${count / 100})` }} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
