"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn, ease } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  wide,
  onOpen,
}: {
  project: Project;
  wide: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.li
      layout
      data-reveal
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.8, ease }}
      className={cn("group", wide && "md:col-span-2")}
    >
      <button
        type="button"
        onClick={onOpen}
        data-cursor="view"
        aria-label={`Open case study preview for ${project.title}`}
        className="block w-full text-left"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-card border border-line bg-surface",
            wide ? "aspect-[4/3] md:aspect-[8/3]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes={wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition duration-700 ease-out-expo group-hover:scale-[1.06]"
          />
          {project.badge ? (
            <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider">
              {project.badge}
            </span>
          ) : null}
          <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/75 via-black/10 to-transparent p-5 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="text-sm font-medium">Case study preview</span>
            <ArrowUpRight className="size-5" />
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-eyebrow uppercase text-muted">{project.category}</p>
            <h3 className="mt-2 font-display text-h3 font-semibold">{project.title}</h3>
          </div>
        </div>
        <p className="mt-3 max-w-xl text-muted line-clamp-3">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
      </button>
    </motion.li>
  );
}
