"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { cn, ease } from "@/lib/utils";

export function Testimonials() {
  const reduce = useReducedMotion();
  const [[index, dir], setPage] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const current = testimonials[index];

  const go = useCallback(
    (step: number) => setPage(([i]) => [(i + step + count) % count, step]),
    [count],
  );

  // Autoplay, paused on hover/focus and disabled for reduced motion.
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [reduce, paused, go]);

  const shift = reduce ? 0 : 64;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section-y relative scroll-mt-16 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-1/4 h-80 w-80 rounded-full bg-ink/[0.08] blur-3xl" />
        <div className="absolute bottom-0 right-[6%] h-96 w-96 rounded-full bg-ink/[0.07] blur-3xl" />
      </div>

      <div className="container-x">
        <SectionHeading id="testimonials-title" eyebrow="Recommendations" title="What people say." />

        <div
          className="mt-14"
          role="group"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="glass relative min-h-[22rem] overflow-hidden rounded-card p-8 sm:p-14">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={current.id}
                aria-live={paused ? "polite" : "off"}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * shift }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: -d * shift }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="flex h-full flex-col justify-between gap-10"
              >
                <blockquote className="font-display text-h3 font-medium text-balance sm:text-h2">
                  “{current.quote}”
                </blockquote>
                <figcaption className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span aria-hidden className="grid size-12 place-items-center rounded-full border border-line font-mono text-sm">
                      {current.name
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                    <div>
                      <p className="font-medium">{current.name}</p>
                      <p className="text-sm text-muted">{current.title}</p>
                    </div>
                  </div>
                  {current.placeholder ? (
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                      Sample
                    </span>
                  ) : null}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div role="tablist" aria-label="Choose testimonial" className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial ${i + 1} of ${count}`}
                  onClick={() => setPage(([prev]) => [i, i > prev ? 1 : -1])}
                  className="grid h-6 place-items-center px-1"
                >
                  <span className={cn("h-1.5 rounded-full bg-ink transition-all duration-500", i === index ? "w-10" : "w-4 opacity-25")} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-bg"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-bg"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
