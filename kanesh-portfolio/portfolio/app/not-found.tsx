import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-gutter text-center">
      <div>
        <p className="font-mono text-eyebrow uppercase text-muted">404</p>
        <h1 className="mt-4 font-display text-h1 font-semibold">This page doesn’t exist.</h1>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-6 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
