# Kanesh Shanker, Portfolio

Single-page portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** and **GSAP ScrollTrigger**. Monochrome palette with dark mode, glassmorphism accents, and a content layer you can edit without touching components.

## Run it

```bash
npm install
cp .env.example .env.local     # optional, see "Contact form" below
npm run dev                    # http://localhost:3000
```

Production:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
npm start
```

`NEXT_PUBLIC_SITE_URL` is read at **build time** (canonical URL, Open Graph, sitemap, robots), so set it before building. Requires Node 18.18+ (tested on Node 22).

## Where to edit content

Everything you will want to change lives in `data/`. Components never contain copy.

| File | Controls |
| --- | --- |
| `data/profile.ts` | Name, headline, subtitle, contact details, socials, CV path, portrait, availability badge |
| `data/about.ts` | Story, mission, stat cards, timeline, achievements |
| `data/experience.ts` | Experience timeline (logos, bullets, tags) |
| `data/projects.ts` | Project cards, categories (drive the filter), case study previews |
| `data/skills.ts` | Skill groups and levels, certifications, marquee words |
| `data/testimonials.ts` | Testimonial carousel |

Types for all of the above are in `types/index.ts`, so TypeScript will tell you if a field is missing.

## Placeholders to replace

- **Project thumbnails** `public/projects/*.jpg` are generated grayscale placeholders. Drop in real screenshots (about 1600×1200) with the same file names, or change `image.src`.
- **Company logos** in Experience show monograms. Add a file to `public/logos/` and set `logo: "/logos/name.svg"`.
- **Testimonials** are marked "Sample". Replace the text and set `placeholder: false`.
- **Skill levels** (1–5) are placeholders. The CV does not rate proficiency, so set your own. **PyTorch** is not on your CV; remove it if you haven't used it.
- **Web lab tags** (HTML, CSS, JavaScript) are assumptions. Edit them to match.
- **Mission** statement in `about.ts` is a draft. Rewrite it in your voice.
- **Portrait** (`public/portrait.jpg`) is shown in grayscale and turns to colour on hover. Remove `grayscale` and `group-hover:grayscale-0` in `components/sections/Hero.tsx` to show colour always.

## Design tokens

- Colours are HSL channels in CSS variables in `app/globals.css` (`:root` for light, `.dark` for dark) and mapped to Tailwind names in `tailwind.config.ts`: `bg`, `surface`, `ink`, `muted`, `line`.
- Type scale (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-eyebrow`), spacing (`gutter`, `section`), radius (`rounded-card`) and easing (`ease-out-expo`) are theme tokens in `tailwind.config.ts`.
- Fonts are self-hosted through Fontsource (Bricolage Grotesque, Instrument Sans, JetBrains Mono). No third-party font requests at runtime.
- Theme toggle stores the choice in `localStorage`; with no saved choice it follows the system. An inline script applies it before first paint.

## Motion

| Effect | Where |
| --- | --- |
| Loading screen hand-off to hero | `components/ui/Loader.tsx` (once per session) |
| Text stagger, scroll reveals, page transition | `SplitText`, `Reveal`, `app/template.tsx` (Framer Motion) |
| Magnetic buttons, custom cursor | `Magnetic`, `CustomCursor` |
| Parallax, scroll-scrubbed text, marquee, timeline progress | `Hero`, `About`, `Marquee`, `Experience` via `lib/useGsapScope.ts` (GSAP ScrollTrigger, loaded lazily) |

With `prefers-reduced-motion: reduce`: the loader is skipped, GSAP effects are not created, the cursor is off, carousel autoplay is off, and Framer Motion animations fall back to fades. Without JavaScript, all content is visible.

## Contact form

`POST /api/contact` validates input and ignores honeypot submissions. To deliver mail:

1. Create a [Resend](https://resend.com) account and API key.
2. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and a verified `CONTACT_FROM_EMAIL` in your host's environment variables.

Without those variables the endpoint returns 503, and the form tells the visitor their message was **not** sent and offers a prefilled email draft instead. It never claims success it can't confirm. Add rate limiting (for example your host's WAF or Upstash) before heavy public use.

## SEO and performance

- Metadata API in `app/layout.tsx` (title template, description, canonical, Open Graph, Twitter), JSON-LD `Person` in `app/page.tsx`, generated Open Graph image (`app/opengraph-image.tsx`), `app/sitemap.ts`, `app/robots.ts`, semantic landmarks and a skip link.
- `next/image` with responsive `sizes`, AVIF/WebP, and `priority` only on the hero portrait.
- First-load JS is about 175 kB; GSAP loads after hydration.
- Lighthouse is not measured in this repo. The 1.2 s loading screen counts toward Largest Contentful Paint on a cold visit; set `duration` lower in `Loader.tsx` or remove `<Loader />` from `app/layout.tsx` if your score matters more than the intro.

## Structure

```
app/            layout, page, template, sitemap, robots, OG image, /api/contact
components/
  layout/       Header, Footer
  providers/    ReadyProvider (loader → hero hand-off)
  sections/     Hero, Marquee, About, Experience, Projects(+Card, Modal), Skills, Testimonials, Contact
  ui/           Button, Magnetic, Reveal, SplitText, Counter, Loader, CustomCursor, ThemeToggle, Icons
data/           all editable content
lib/            utils, site URL, useGsapScope
public/         portrait, project thumbnails, CV
types/          shared TypeScript types
```

## Deploy

Works on Vercel out of the box (import the repo, set the environment variables). Any Node host works with `npm run build && npm start`.
