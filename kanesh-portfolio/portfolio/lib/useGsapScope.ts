"use client";

import { useEffect, useRef } from "react";
import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type SetupContext = {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  scope: HTMLElement;
};

/**
 * Runs GSAP + ScrollTrigger code scoped to a ref'd element.
 * - GSAP is loaded lazily so it stays out of the initial bundle.
 * - Everything is created inside gsap.matchMedia and only when the user has NOT asked for
 *   reduced motion, so non-essential scroll animation is skipped for them.
 * - All tweens and triggers are reverted on unmount.
 */
export function useGsapScope<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: SetupContext) => void | (() => void),
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    let cancelled = false;
    let mm: { revert: () => void } | undefined;
    let onLoad: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      const scope = ref.current;
      if (cancelled || !scope) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia(scope);
      media.add("(prefers-reduced-motion: no-preference)", () => setup({ gsap, ScrollTrigger, scope }));
      mm = media;

      onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
    })();

    return () => {
      cancelled = true;
      if (onLoad) window.removeEventListener("load", onLoad);
      mm?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
