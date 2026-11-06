"use client";

import { useState, type FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight, Check, Download } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";
type Fields = { name: string; email: string; message: string };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [draft, setDraft] = useState<Fields | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values: Fields = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };
    const company = String(fd.get("company") ?? ""); // honeypot: real people leave it empty

    const next: typeof errors = {};
    if (!values.name) next.name = "Enter your name.";
    if (!emailRe.test(values.email)) next.email = "Enter a valid email, like you@company.com.";
    if (values.message.length < 10) next.message = "Write at least a short sentence so I know how to help.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setDraft(values);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else if (res.status === 503) {
        setStatus("fallback"); // email delivery is not configured on this deployment
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the address is visible and selectable */
    }
  }

  const mailto = draft
    ? `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${draft.name}`)}&body=${encodeURIComponent(
        `${draft.message}\n\n${draft.name} (${draft.email})`,
      )}`
    : `mailto:${profile.email}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y scroll-mt-16">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="contact-title" eyebrow="Contact" title="Let’s build something together." />

            <Reveal delay={0.1}>
              <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 text-sm">
                <span className="relative flex size-2.5">
                  {profile.availability.open ? <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500" /> : null}
                  <span className={cn("relative size-2.5 rounded-full", profile.availability.open ? "bg-emerald-500" : "bg-muted")} />
                </span>
                {profile.availability.label}
              </p>

              <p className="mt-8 max-w-md text-lead text-muted">
                I’m looking for an AI/ML internship and happy to talk about computer vision, RAG or robotics projects.
              </p>

              <dl className="mt-10 divide-y divide-line border-y border-line">
                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <dt className="font-mono text-eyebrow uppercase text-muted">Email</dt>
                    <dd className="mt-1 break-all select-all font-medium">{profile.email}</dd>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:bg-ink hover:text-bg"
                  >
                    {copied ? <Check className="size-4" /> : null}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="py-4">
                  <dt className="font-mono text-eyebrow uppercase text-muted">Phone</dt>
                  <dd className="mt-1 select-all font-medium">{profile.phone}</dd>
                </div>
                {profile.socials.map((s) => (
                  <div key={s.href} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <dt className="font-mono text-eyebrow uppercase text-muted">{s.label}</dt>
                      <dd className="mt-1 font-medium">{s.href.replace(/^https?:\/\//, "")}</dd>
                    </div>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${s.label} (new tab)`}
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-bg"
                    >
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <ButtonLink href={profile.cvHref} variant="outline" download>
                  <Download className="size-[18px]" />
                  Download CV
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <form onSubmit={onSubmit} noValidate className="glass rounded-card p-6 sm:p-10" aria-describedby="form-status">
                <div className="space-y-6">
                  <Field id="name" label="Name" error={errors.name}>
                    <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={inputCls(errors.name)} />
                  </Field>
                  <Field id="email" label="Email" error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={inputCls(errors.email)} />
                  </Field>
                  <Field id="message" label="Message" error={errors.message}>
                    <textarea id="message" name="message" rows={6} placeholder="Tell me about the role or project" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className={cn(inputCls(errors.message), "resize-y")} />
                  </Field>
                  {/* Honeypot field: hidden from people, visible to bots. */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="company">Company</label>
                    <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <Button type="submit" disabled={status === "sending"}>
                      {status === "sending" ? "Sending…" : "Send message"}
                      <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Magnetic>
                </div>

                <div id="form-status" role="status" aria-live="polite" className="mt-6 text-sm">
                  {status === "sent" ? (
                    <p className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0" />
                      Message sent. Thank you, I’ll reply to the email you gave.
                    </p>
                  ) : null}
                  {status === "fallback" ? (
                    <p className="text-muted">
                      Direct sending isn’t set up on this site yet, so your message was not sent.{" "}
                      <a href={mailto} className="text-ink underline underline-offset-4">
                        Open it as an email draft
                      </a>{" "}
                      or write to {profile.email}.
                    </p>
                  ) : null}
                  {status === "error" ? (
                    <p className="text-muted">
                      Something went wrong and your message was not sent. Please try again, or write to{" "}
                      <a href={mailto} className="text-ink underline underline-offset-4">
                        {profile.email}
                      </a>
                      .
                    </p>
                  ) : null}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function inputCls(error?: string) {
  return cn(
    "w-full rounded-2xl border bg-bg/60 px-5 py-4 text-base text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10",
    error ? "border-red-500/70" : "border-line",
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-eyebrow uppercase text-muted">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}
