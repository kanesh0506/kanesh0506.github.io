import type { Config } from "tailwindcss";

/**
 * Design tokens live here and in app/globals.css (CSS variables).
 * Colors are HSL channels in CSS variables so light/dark switch in one place
 * and Tailwind opacity modifiers (e.g. text-ink/60) keep working.
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        ink: "hsl(var(--ink) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        line: "hsl(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Instrument Sans Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        eyebrow: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.18em" }],
        lead: ["clamp(1.05rem, 1.4vw, 1.25rem)", { lineHeight: "1.65" }],
        h3: ["clamp(1.35rem, 2.2vw, 1.85rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.9rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        h1: ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        display: ["clamp(2.9rem, 7.2vw, 6.75rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 3rem)",
        section: "clamp(5.5rem, 12vw, 10rem)",
      },
      maxWidth: { content: "80rem" },
      borderRadius: { card: "1.5rem" },
      transitionTimingFunction: { "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)" },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(2rem, -2rem, 0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        scrollCue: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        float: "float 14s ease-in-out infinite",
        "float-slow": "float 22s ease-in-out infinite reverse",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        "scroll-cue": "scrollCue 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
