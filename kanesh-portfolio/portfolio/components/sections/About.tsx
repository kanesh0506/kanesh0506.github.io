"use client";

import { about } from "@/data/about";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapScope } from "@/lib/useGsapScope";

export function About() {
  // Scroll-scrubbed word reveal: each word brightens as the paragraph crosses the viewport.
  const scope = useGsapScope<HTMLElement>(({ gsap, scope }) => {
    const words = scope.querySelectorAll("[data-word]");
    gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-story]", start: "top 82%", end: "bottom 50%", scrub: true },
      },
    );
  });

  return (
    <section id="about" ref={scope} aria-labelledby="about-title" className="section-y scroll-mt-16">
      <div className="container-x">
        <SectionHeading id="about-title" eyebrow="About" title="Building things that work in the real world." />

        <p data-story className="mt-14 max-w-5xl font-display text-h2 font-medium">
          {about.story.split(" ").map((w, i) => (
            <span key={i} data-word>
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-mono text-eyebrow uppercase text-muted">Mission</p>
              <p className="mt-4 max-w-md text-lead">{about.mission}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-14 font-mono text-eyebrow uppercase text-muted">Timeline</p>
              <ol className="mt-5 divide-y divide-line border-y border-line">
                {about.milestones.map((m) => (
                  <li key={m.when + m.title} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 sm:grid-cols-[9rem_1fr]">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">{m.when}</span>
                    <span>
                      <span className="block font-medium">{m.title}</span>
                      {m.detail ? <span className="block text-sm text-muted">{m.detail}</span> : null}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <ul className="grid gap-4 sm:grid-cols-2">
              {about.stats.map((s, i) => (
                <li key={s.label}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <div className="glass flex h-full flex-col justify-between gap-10 rounded-card p-6 transition-colors duration-300 hover:border-ink/40">
                      <p className="font-display text-[clamp(2.75rem,5vw,4rem)] font-semibold leading-none tracking-tight">
                        <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                      </p>
                      <p className="text-sm text-muted">{s.label}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-20 grid gap-4 md:grid-cols-3">
          {about.achievements.map((a, i) => (
            <li key={a.title}>
              <Reveal delay={i * 0.1} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-card border border-line p-8 transition-colors duration-500 hover:bg-ink hover:text-bg">
                  <p className="font-display text-[5rem] font-semibold leading-none tracking-tighter">{a.mark}</p>
                  <h3 className="mt-8 font-display text-h3 font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted transition-colors duration-500 group-hover:text-bg/70">{a.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
