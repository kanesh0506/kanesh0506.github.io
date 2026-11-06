"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Close } from "@/components/ui/Icons";
import { ease } from "@/lib/utils";
import type { Project } from "@/types";

/** Case study preview dialog: Escape closes, focus is trapped and restored, page scroll is locked. */
export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const cs = project.caseStudy;

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div aria-hidden className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-card border border-line bg-bg shadow-2xl"
        initial={{ y: 48, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="relative aspect-[16/8] w-full overflow-hidden">
          <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="glass absolute right-4 top-4 grid size-11 place-items-center rounded-full transition-colors hover:bg-ink hover:text-bg"
          >
            <Close className="size-5" />
          </button>
        </div>

        <div className="p-6 sm:p-10">
          <p className="font-mono text-eyebrow uppercase text-muted">
            {project.category}
            {project.badge ? ` · ${project.badge}` : ""}
          </p>
          <h3 id="case-title" className="mt-3 font-display text-h2 font-semibold text-balance">
            {project.title}
          </h3>

          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              ["Role", cs.role],
              ["Problem", cs.problem],
              ["Approach", cs.approach],
              ["Outcome", cs.outcome],
            ].map(([term, text]) => (
              <div key={term} className={term === "Approach" ? "sm:col-span-2" : undefined}>
                <dt className="font-mono text-eyebrow uppercase text-muted">{term}</dt>
                <dd className="mt-2">{text}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-2">
            {cs.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                {s}
              </li>
            ))}
          </ul>

          {project.links.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                >
                  {l.label}
                  <ArrowUpRight className="size-4" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
