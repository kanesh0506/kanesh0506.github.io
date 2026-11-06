"use client";

import { marqueeWords } from "@/data/skills";
import { useGsapScope } from "@/lib/useGsapScope";

/** Two rows of outlined type that slide in opposite directions as you scroll (GSAP ScrollTrigger scrub). */
export function Marquee() {
  const scope = useGsapScope<HTMLDivElement>(({ gsap, scope }) => {
    const trigger = { trigger: scope, start: "top bottom", end: "bottom top", scrub: 0.6 } as const;
    gsap.fromTo("[data-row='a']", { xPercent: 0 }, { xPercent: -22, ease: "none", scrollTrigger: trigger });
    gsap.fromTo("[data-row='b']", { xPercent: -22 }, { xPercent: 0, ease: "none", scrollTrigger: trigger });
  });

  const line = marqueeWords.join("  /  ");

  return (
    <div ref={scope} aria-hidden className="overflow-hidden border-y border-line py-8 select-none">
      {(["a", "b"] as const).map((row) => (
        <p
          key={row}
          data-row={row}
          className="text-outline whitespace-nowrap font-display text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[1.05] tracking-tight"
        >
          {line}  /  {line}  /  {line}
        </p>
      ))}
    </div>
  );
}
