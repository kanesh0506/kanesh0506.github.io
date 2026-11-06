import type { AboutContent } from "@/types";

/** About section: story, mission, stats, milestones and achievements. All facts come from the CV. */
export const about: AboutContent = {
  story:
    "I’m a third-year Artificial Intelligence undergraduate at UTM who likes turning ideas into working systems. I’ve built a RAG assistant for Malaysian paddy farmers, a companion robot that helps elderly users take their pills, and a health-claim verifier that won a 48-hour hackathon. Outside the lab, I teach robotics to school students at 8 schools.",
  // PLACEHOLDER: rewrite the mission in your own words.
  mission:
    "Build practical AI that works outside the notebook: on devices, inside workflows, and in the hands of people who need it.",
  stats: [
    { value: 3.92, decimals: 2, label: "CGPA out of 4.00" },
    { value: 4, label: "Dean’s List semesters" },
    { value: 8, label: "Schools taught robotics" },
    { value: 30, label: "Teams at SEDIA Hackathon, placed 1st" },
  ],
  milestones: [
    { when: "2024", title: "Started Bachelor of Artificial Intelligence", detail: "Universiti Teknologi Malaysia" },
    { when: "Apr 2025", title: "Head of Logistics, UTM AI Club", detail: "Data Science 101 for 60 students" },
    { when: "2025 – 2026", title: "Head of Robotics, Puthiya Manitha", detail: "Workshops at 8 schools" },
    { when: "Jul 2026", title: "Taught 45 students with Mirai Robotics", detail: "SMK Sungai Kertas" },
    { when: "Sep 2026", title: "3rd place at state level", detail: "STEM Stars Ambassadors" },
  ],
  achievements: [
    { mark: "1st", title: "SEDIA Hackathon", detail: "MMU × Google Developer Group. 30 teams, 48 hours, for MediProof." },
    { mark: "3rd", title: "STEM Stars Ambassadors", detail: "State level, SP Setia, September 2026." },
    { mark: "4×", title: "Dean’s List", detail: "Four semesters at UTM with a 3.92 CGPA." },
  ],
};
