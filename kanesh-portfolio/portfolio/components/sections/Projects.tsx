"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectFilters, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = (typeof projectFilters)[number];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", projects.length]]);
    projects.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return map;
  }, []);

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const open = projects.find((p) => p.slug === openSlug) ?? null;
  const close = useCallback(() => setOpenSlug(null), []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y scroll-mt-16">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-title"
            eyebrow="Selected work"
            title="Projects built to be used."
            description="Hackathon wins, a robot prototype and live web labs. Open any card for a case study preview."
          />

          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {projectFilters.map((f) => {
              const count = counts.get(f) ?? 0;
              if (f !== "All" && count === 0) return null;
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm transition-colors duration-300",
                    active ? "border-ink bg-ink text-bg" : "border-line text-muted hover:border-ink/50 hover:text-ink",
                  )}
                >
                  {f}
                  <span className={cn("font-mono text-xs", active ? "text-bg/70" : "text-muted")}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.ul layout className="mt-16 grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {visible.map((p) => (
              <ProjectCard key={p.slug} project={p} wide={Boolean(p.featured) && filter === "All"} onOpen={() => setOpenSlug(p.slug)} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>{open ? <ProjectModal key={open.slug} project={open} onClose={close} /> : null}</AnimatePresence>
    </section>
  );
}
