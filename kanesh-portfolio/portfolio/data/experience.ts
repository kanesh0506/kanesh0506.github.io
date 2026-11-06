import type { ExperienceItem } from "@/types";

/**
 * Newest first. Company logos are PLACEHOLDERS: each entry shows a monogram until you add a
 * logo file to /public/logos and set `logo: "/logos/your-file.svg"`.
 */
export const experience: ExperienceItem[] = [
  {
    id: "stem-stars",
    role: "Programme Secretary",
    org: "STEM Stars Ambassadors (SP Setia)",
    period: "Sep 2026",
    initials: "SS",
    bullets: [
      "Coordinated hands-on STEM activities for school students.",
      "The team placed 3rd at state level.",
    ],
    tags: ["Coordination", "STEM outreach"],
  },
  {
    id: "mirai",
    role: "Robotics Team Member",
    org: "Mirai Robotics UTMKL",
    period: "Jul 2026",
    initials: "MR",
    bullets: [
      "Taught Arduino, Raspberry Pi 5 and micro:bit to 45 students at SMK Sungai Kertas.",
      "Prepared hands-on demonstrations for a programme monitored by the Menteri Besar Selangor.",
    ],
    tags: ["Arduino", "Raspberry Pi 5", "micro:bit"],
  },
  {
    id: "puthiya-manitha",
    role: "Head of Robotics",
    org: "Puthiya Manitha 1.0 & 2.0, Persatuan Mahasiswa Hindu UTMKL",
    period: "2025 – 2026",
    initials: "PM",
    bullets: [
      "Led a 5-member team across two programmes, delivering Arduino, Python and C++ robotics workshops at 8 schools.",
      "Planned sessions and technical preparation, then guided students through STEM and robotics problem-solving.",
    ],
    tags: ["Arduino", "Python", "C++", "Team lead"],
  },
  {
    id: "ai-club",
    role: "Head of Logistics",
    org: "UTM Artificial Intelligence Club",
    period: "Apr 2025 – Present",
    initials: "AI",
    bullets: [
      "Ran logistics for Data Science 101, a workshop for 60 university students: venue, equipment and participant operations.",
    ],
    tags: ["Operations", "Events"],
  },
  {
    id: "utm",
    role: "Bachelor of Artificial Intelligence",
    org: "Universiti Teknologi Malaysia (UTM), Kuala Lumpur",
    period: "2024 – Present",
    initials: "UTM",
    bullets: ["CGPA 3.92 / 4.00.", "Dean’s List for 4 semesters."],
    tags: ["Education"],
  },
];
