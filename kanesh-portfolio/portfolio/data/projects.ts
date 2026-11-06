import type { Project, ProjectCategory } from "@/types";

export const projectFilters: ("All" | ProjectCategory)[] = ["All", "AI", "Robotics", "Web", "Data"];

/**
 * Project thumbnails in /public/projects are PLACEHOLDERS (generated grayscale art).
 * Replace each file with a real screenshot, keeping the same file name or updating `image.src`.
 * Order matters: the grid is laid out so that featured projects #1 and #4 span two columns.
 * Tech tags for the three web labs (HTML, CSS, JavaScript) are assumptions: edit them to match.
 */
export const projects: Project[] = [
  {
    slug: "mediproof",
    title: "MediProof",
    category: "AI",
    badge: "1st Place · SEDIA Hackathon",
    featured: true,
    tags: ["n8n", "Browser extension", "Telegram bot"],
    summary:
      "A health-claim verifier with three touchpoints: a website, a browser extension and a Telegram bot, so people can check claims where they already read them.",
    image: { src: "/projects/mediproof.jpg", alt: "Placeholder thumbnail for MediProof" },
    links: [],
    caseStudy: {
      role: "Frontend and n8n backend workflows. Presented the technical architecture in the final pitch.",
      problem: "Health claims spread across video, social media and chat apps, far from wherever people could check them.",
      approach:
        "One verification system with three touchpoints. The website takes pasted text, files, images, audio or a product check. The extension verifies a highlighted claim on YouTube, Reddit or social media without leaving the page. The Telegram bot handles forwarded messages, voice notes, product-label photos and YouTube links.",
      outcome: "1st place among 30 teams in a 48-hour hackathon (MMU × Google Developer Group).",
      stack: ["n8n", "Web frontend", "Browser extension", "Telegram bot"],
    },
  },
  {
    slug: "padi-guardian",
    title: "Sovereign Padi Guardian",
    category: "AI",
    badge: "Hackathon prototype",
    tags: ["Python", "Gemini", "Vertex AI", "RAG"],
    summary:
      "A RAG assistant that gives Malaysian smallholder farmers fertiliser and pest-control recommendations using local data.",
    image: { src: "/projects/padi-guardian.jpg", alt: "Placeholder thumbnail for Sovereign Padi Guardian" },
    links: [{ label: "View on GitHub", href: "https://github.com/kanesh0506/padi-pro-web" }],
    caseStudy: {
      role: "Developer",
      problem: "Smallholder farmers need fertiliser and pest-control guidance grounded in their own farm and region.",
      approach:
        "A retrieval-augmented assistant that pulls past farm data, user behaviour and local authority plantation data, then combines it with Open-Meteo weather and SoilGrids soil data.",
      outcome: "Working hackathon prototype with source code on GitHub.",
      stack: ["Python", "Gemini", "Google Vertex AI", "RAG", "Open-Meteo", "SoilGrids"],
    },
  },
  {
    slug: "selangor-tourism-explorer",
    title: "Selangor Tourism Spot Explorer",
    category: "Web",
    badge: "Course lab",
    tags: ["HTML", "CSS", "JavaScript"],
    summary:
      "An interactive showcase of popular attractions across Selangor, including Batu Caves, Sunway Lagoon, Sky Mirror and Sekinchan.",
    image: { src: "/projects/selangor-tourism.jpg", alt: "Placeholder thumbnail for Selangor Tourism Spot Explorer" },
    links: [{ label: "Launch app", href: "https://kanesh0506.github.io/LAB_1/" }],
    caseStudy: {
      role: "Developer",
      problem: "Bring Selangor’s best-known attractions together in one easy-to-browse page.",
      approach: "An interactive web page highlighting Batu Caves, Sunway Lagoon, Sky Mirror and Sekinchan.",
      outcome: "Live on GitHub Pages.",
      stack: ["HTML", "CSS", "JavaScript"],
    },
  },
  {
    slug: "spenzer",
    title: "Spenzer, Eldercare Companion Robot",
    category: "Robotics",
    badge: "UTM ASCEND 2030",
    featured: true,
    tags: ["YOLO-Tiny", "Raspberry Pi 3", "ESP32-S3"],
    summary:
      "A prototype companion robot for elderly care whose main job is making sure users take the pills they are supposed to take.",
    image: { src: "/projects/spenzer.jpg", alt: "Placeholder thumbnail for the Spenzer companion robot" },
    links: [],
    caseStudy: {
      role: "Prototype builder",
      problem: "Elderly users can miss, or mix up, the pills they are supposed to take.",
      approach:
        "A YOLO-Tiny object-detection model for the pill dispenser. A Raspberry Pi 3 handles vision while an ESP32-S3 handles motor and hardware control.",
      outcome: "Working prototype built for UTM ASCEND 2030.",
      stack: ["YOLO-Tiny", "Raspberry Pi 3", "ESP32-S3"],
    },
  },
  {
    slug: "malaysia-population-dashboard",
    title: "Malaysia Population Data Dashboard",
    category: "Data",
    badge: "Course lab",
    tags: ["Data viz", "DOSM census", "JavaScript"],
    summary:
      "A dashboard exploring national demographic trends, state distribution, ethnicity breakdowns and census insights across Malaysia.",
    image: { src: "/projects/population-dashboard.jpg", alt: "Placeholder thumbnail for the Malaysia Population Data Dashboard" },
    links: [{ label: "View live", href: "https://kanesh0506.github.io/malaysia_population_dashboard/index.html" }],
    caseStudy: {
      role: "Developer",
      problem: "National census figures are easier to understand when trends and breakdowns sit side by side.",
      approach: "A dashboard covering demographic trends, state distribution, ethnicity breakdowns and census insights.",
      outcome: "Live on GitHub Pages.",
      stack: ["Data visualisation", "JavaScript"],
    },
  },
  {
    slug: "gold-coast-morib",
    title: "Gold Coast Pantai Morib",
    category: "Web",
    badge: "Course lab",
    tags: ["HTML", "CSS", "Responsive"],
    summary: "A website for the Gold Coast, Pantai Morib, built as a course lab and deployed on GitHub Pages.",
    image: { src: "/projects/gold-coast-morib.jpg", alt: "Placeholder thumbnail for the Gold Coast Pantai Morib website" },
    links: [{ label: "Launch app", href: "https://kanesh0506.github.io/LAB_3/" }],
    caseStudy: {
      role: "Developer",
      problem: "Give a well-known Selangor beach destination a clear web presence.",
      approach: "A multi-section website for the Gold Coast, Pantai Morib.",
      outcome: "Live on GitHub Pages.",
      stack: ["HTML", "CSS"],
    },
  },
  {
    slug: "hydroguard",
    title: "HydroGuard",
    category: "AI",
    tags: ["Prediction", "Dashboard"],
    summary:
      "An app that predicts water leakage and forecasts how long a drought will last, with a real-time dashboard for pressure and flow data.",
    image: { src: "/projects/hydroguard.jpg", alt: "Placeholder thumbnail for HydroGuard" },
    links: [],
    caseStudy: {
      role: "Developer",
      problem: "Leaks and droughts are hard to anticipate from raw pressure and flow readings.",
      approach:
        "Predicts water leakage and forecasts drought duration for a given area, with a real-time dashboard that helps identify pipeline anomalies.",
      outcome: "An app that forecasts drought length and flags pipeline anomalies.",
      stack: ["Prediction models", "Real-time dashboard"],
    },
  },
];
