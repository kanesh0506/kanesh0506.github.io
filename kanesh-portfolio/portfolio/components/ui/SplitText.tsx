"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType } from "react";
import { ease } from "@/lib/utils";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** Controls playback when `inView` is false (e.g. wait for the loader). */
  play?: boolean;
  /** Play when scrolled into view instead of via `play`. */
  inView?: boolean;
  delay?: number;
  stagger?: number;
};

/** Word-by-word masked rise. The real text stays in the DOM for SEO and screen readers. */
export function SplitText({ text, as = "h2", id, className, play = true, inView = false, delay = 0, stagger = 0.07 }: Props) {
  const reduce = useReducedMotion();
  const Tag = as as ElementType;
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : { hidden: { y: "115%" }, show: { y: "0%", transition: { duration: 0.95, ease } } };

  const trigger = inView
    ? ({ initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-10% 0px" } } as const)
    : ({ initial: "hidden", animate: play ? "show" : "hidden" } as const);

  return (
    <Tag id={id} className={className}>
      <motion.span data-split className="inline" variants={container} {...trigger}>
        {words.map((w, i) => (
          <span key={`${w}-${i}`}>
            <span className="inline-block overflow-hidden -mb-[0.14em] pb-[0.14em] align-bottom">
              <motion.span className="inline-block will-change-transform" variants={word}>
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
