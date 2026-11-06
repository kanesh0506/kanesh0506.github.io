import type { Profile } from "@/types";

/** Core identity. Edit this file to change the hero, header, footer, SEO and contact details. */
export const profile: Profile = {
  name: "Kanesh Shanker",
  firstName: "Kanesh",
  role: "AI/ML & Robotics Builder",
  affiliation: "Undergraduate at Universiti Teknologi Malaysia",
  headlineLead: "Hi, I’m Kanesh Shanker",
  headline: "I build AI that sees, reasons and moves.",
  subtitle:
    "AI/ML and robotics builder, third-year Artificial Intelligence undergraduate at UTM. I work across computer vision, RAG systems and embedded hardware.",
  siteDescription:
    "Portfolio of Kanesh Shanker, a third-year Artificial Intelligence undergraduate at UTM building computer vision, RAG and embedded robotics projects. Open to AI/ML internships.",
  email: "kaneshs046@gmail.com",
  phone: "+60 17-351 1948",
  location: "Selangor, Malaysia",
  availability: { open: true, label: "Open to AI/ML internships" },
  socials: [
    { label: "GitHub", href: "https://github.com/kanesh0506" },
    { label: "LinkedIn", href: "https://linkedin.com/in/kanesh-shanker-02645533b" },
  ],
  cvHref: "/Kanesh_Shanker_Resume.pdf",
  portrait: {
    src: "/portrait.jpg",
    alt: "Portrait of Kanesh Shanker",
    width: 1600,
    height: 1331,
  },
};
