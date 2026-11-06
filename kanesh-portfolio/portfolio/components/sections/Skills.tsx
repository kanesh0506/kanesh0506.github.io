"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, skillGroups } from "@/data/skills";
import { cn, ease } from "@/lib/utils";

export function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const reduce = useReducedMotion();
  const group = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y scroll-mt-16">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          eyebrow="Technical expertise"
          title="From model to motor."
          description="The model, the workflow around it, and the hardware it runs on."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label="Skill categories" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
            {skillGroups.map((g) => {
              const active = g.id === activeId;
              return (
                <button
                  key={g.id}
                  role="tab"
                  id={`tab-${g.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${g.id}`}
                  type="button"
                  onClick={() => setActiveId(g.id)}
                  className={cn(
                    "shrink-0 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 lg:w-full",
                    active ? "border-ink bg-ink text-bg" : "border-line hover:border-ink/40",
                  )}
                >
                  <span className="flex items-baseline justify-between gap-6">
                    <span className="font-display text-lg font-semibold">{g.label}</span>
                    <span className={cn("font-mono text-xs", active ? "text-bg/70" : "text-muted")}>{g.skills.length}</span>
                  </span>
                  <span className={cn("mt-1 hidden text-sm lg:block", active ? "text-bg/70" : "text-muted")}>{g.blurb}</span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <div className="glass min-h-[22rem] rounded-card p-6 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={group.id}
                  role="tabpanel"
                  id={`panel-${group.id}`}
                  aria-labelledby={`tab-${group.id}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                    {group.skills.map((s, i) => (
                      <li key={s.name}>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-medium">{s.name}</span>
                          <span className="sr-only">Proficiency {s.level} of 5</span>
                        </div>
                        <div aria-hidden className="mt-3 flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <span key={n} className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                              <motion.span
                                className="block h-full origin-left rounded-full bg-ink"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: n <= s.level ? 1 : 0 }}
                                transition={{ duration: 0.6, delay: reduce ? 0 : 0.1 + i * 0.04 + n * 0.05, ease }}
                              />
                            </span>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <Reveal>
              <p className="mt-10 font-mono text-eyebrow uppercase text-muted">Certifications</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {certifications.map((c) => (
                  <li key={c.name} className="rounded-2xl border border-line p-5 transition-colors duration-300 hover:border-ink/40">
                    <p className="font-medium">{c.name}</p>
                    <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
