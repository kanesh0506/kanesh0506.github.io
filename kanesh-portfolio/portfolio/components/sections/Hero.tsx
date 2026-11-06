"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useReady } from "@/components/providers/ReadyProvider";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowDown, ArrowRight } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitText } from "@/components/ui/SplitText";
import { profile } from "@/data/profile";
import { ease } from "@/lib/utils";
import { useGsapScope } from "@/lib/useGsapScope";

export function Hero() {
  const { ready } = useReady();
  const reduce = useReducedMotion();

  // Scroll-driven parallax: portrait drifts inside its frame, background orbs move at different speeds.
  const scope = useGsapScope<HTMLElement>(({ gsap, scope }) => {
    const trigger = { trigger: scope, start: "top top", end: "bottom top", scrub: true } as const;
    gsap.fromTo("[data-hero-portrait]", { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: trigger });
    gsap.utils.toArray<HTMLElement>("[data-orb]").forEach((el, i) => {
      gsap.to(el, { yPercent: (i % 2 ? 1 : -1) * 35, ease: "none", scrollTrigger: trigger });
    });
  });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 24 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      id="top"
      ref={scope}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pb-20 pt-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />
        <div data-orb className="absolute -left-40 top-10 h-[34rem] w-[34rem] animate-float rounded-full bg-ink/[0.07] blur-3xl" />
        <div data-orb className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] animate-float-slow rounded-full bg-ink/[0.06] blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p
            data-reveal
            {...fade(0.2)}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-eyebrow uppercase text-muted"
          >
            <span>{profile.headlineLead}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 normal-case tracking-normal">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability.label}
            </span>
          </motion.p>

          <SplitText
            as="h1"
            id="hero-title"
            text={profile.headline}
            play={ready}
            delay={0.15}
            className="mt-7 font-display text-display font-semibold text-balance"
          />

          <motion.p data-reveal {...fade(0.7)} className="mt-8 max-w-xl text-lead text-muted">
            {profile.subtitle}
          </motion.p>

          <motion.div data-reveal {...fade(0.85)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <ButtonLink href="#projects">
                View Work
                <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="#contact" variant="outline">
                Contact
              </ButtonLink>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          data-reveal
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.05 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: reduce ? 1 : 1.05 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        >
          <div className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-card border border-line bg-surface lg:max-w-none">
            <div data-hero-portrait className="absolute inset-x-0 -bottom-[8%] -top-[8%]">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                fill
                priority
                quality={80}
                sizes="(min-width: 1024px) 40vw, (min-width: 448px) 448px, 90vw"
                className="object-cover object-[50%_30%] grayscale contrast-[1.08] transition duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <div className="glass absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{profile.role}</p>
                <p className="truncate font-mono text-xs text-muted">UTM · {profile.location}</p>
              </div>
              <p className="shrink-0 font-mono text-xs text-muted">
                CGPA <span className="text-base font-semibold text-ink">3.92</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted lg:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-0 animate-scroll-cue bg-ink" />
        </span>
        <ArrowDown className="sr-only" />
      </a>
    </section>
  );
}
