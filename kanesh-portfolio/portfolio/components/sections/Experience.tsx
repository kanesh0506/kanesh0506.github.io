"use client";

import Image from "next/image";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapScope } from "@/lib/useGsapScope";

export function Experience() {
  // The vertical line fills as you scroll, and each node lights up when its entry reaches the middle of the screen.
  const scope = useGsapScope<HTMLElement>(({ gsap, ScrollTrigger, scope }) => {
    const list = scope.querySelector("[data-timeline]");
    if (!list) return;

    gsap.fromTo(
      "[data-progress]",
      { scaleY: 0 },
      { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 65%", end: "bottom 65%", scrub: true } },
    );

    gsap.utils.toArray<HTMLElement>("[data-item]").forEach((item) => {
      const dot = item.querySelector("[data-dot]");
      if (!dot) return;
      ScrollTrigger.create({
        trigger: item,
        start: "top 65%",
        end: "bottom 65%",
        toggleClass: { targets: dot, className: "is-active" },
      });
    });
  });

  return (
    <section id="experience" ref={scope} aria-labelledby="experience-title" className="section-y scroll-mt-16">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Leading, teaching and organising."
          description="Robotics outreach, club operations and the degree behind it."
        />

        <ol data-timeline className="relative mt-20 space-y-6">
          <span aria-hidden className="absolute left-[1.35rem] top-0 h-full w-px bg-line md:left-[11.5rem]" />
          <span
            aria-hidden
            data-progress
            className="absolute left-[1.35rem] top-0 h-full w-px origin-top bg-ink md:left-[11.5rem]"
          />

          {experience.map((item) => (
            <li key={item.id} data-item className="group relative pl-12 md:pl-52">
              <span
                aria-hidden
                data-dot
                className="absolute left-[0.98rem] top-9 size-3 rounded-full border border-ink/40 bg-bg md:left-[11.125rem]"
              />
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted md:absolute md:left-0 md:top-8 md:mb-0 md:w-40 md:text-right">
                {item.period}
              </p>

              <Reveal>
                <article className="rounded-card border border-line bg-surface/40 p-6 transition duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:border-ink/40 group-hover:bg-surface md:p-8">
                  <div className="flex items-start gap-5">
                    <div
                      aria-hidden
                      className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-line bg-bg font-mono text-sm font-semibold transition-colors duration-500 group-hover:bg-ink group-hover:text-bg"
                    >
                      {item.logo ? (
                        <Image src={item.logo} alt="" width={56} height={56} className="size-full object-contain p-2" />
                      ) : (
                        item.initials
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-h3 font-semibold">{item.role}</h3>
                      <p className="mt-1 text-sm text-muted">{item.org}</p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3 text-muted">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-ink/40 transition-all duration-500 group-hover:w-8 group-hover:bg-ink" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
