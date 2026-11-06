"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Mode = "idle" | "link" | "view";

/**
 * Follower cursor for fine pointers only. The native cursor stays visible (accessibility),
 * the follower grows over links/buttons and shows "View" over elements marked data-cursor="view".
 * Disabled entirely for touch devices and prefers-reduced-motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      if (target?.closest('[data-cursor="view"]')) setMode("view");
      else if (target?.closest("a, button, input, textarea, [role='button']")) setMode("link");
      else setMode("idle");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 88 : mode === "link" ? 44 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className={
          mode === "view"
            ? "grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink font-mono text-[11px] uppercase tracking-widest text-bg"
            : mode === "link"
              ? "-translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/60 bg-ink/5"
              : "-translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        }
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {mode === "view" ? "View" : null}
      </motion.div>
    </motion.div>
  );
}
