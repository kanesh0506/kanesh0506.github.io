import type { SkillGroup } from "@/types";

/**
 * The skills come from the CV. The `level` values (1–5) are PLACEHOLDERS: the CV does not rate
 * proficiency, so adjust each one to your own honest self-assessment.
 * PyTorch is not on the CV; remove it if you have not used it.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    label: "AI / ML",
    blurb: "Models that see, retrieve and generate.",
    skills: [
      { name: "Python", level: 4 },
      { name: "Computer Vision (OpenCV)", level: 4 },
      { name: "YOLO object detection", level: 4 },
      { name: "RAG", level: 4 },
      { name: "Generative AI", level: 3 },
      { name: "Google Vertex AI", level: 3 },
      { name: "Gemini", level: 3 },
      { name: "Machine Learning", level: 3 },
      { name: "PyTorch", level: 2 },
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    blurb: "Workflows, storage and dashboards around the model.",
    skills: [
      { name: "n8n workflow automation", level: 4 },
      { name: "Supabase", level: 3 },
      { name: "Firebase", level: 3 },
      { name: "Power BI", level: 3 },
      { name: "Docker", level: 3 },
      { name: "Antigravity", level: 3 },
    ],
  },
  {
    id: "hardware",
    label: "Embedded & Hardware",
    blurb: "Where the model meets motors and sensors.",
    skills: [
      { name: "Raspberry Pi 3 / 5", level: 4 },
      { name: "ESP32-S3", level: 4 },
      { name: "Arduino", level: 4 },
      { name: "micro:bit", level: 4 },
      { name: "AI detection on Raspberry Pi", level: 4 },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    blurb: "What I write code in.",
    skills: [
      { name: "Python", level: 4 },
      { name: "C / C++", level: 3 },
      { name: "Java", level: 2 },
    ],
  },
];

export const certifications = [
  { name: "Google AI Professional Certificate", issuer: "Grow with Google" },
  { name: "Machine Learning Specialization", issuer: "Stanford / DeepLearning.AI (Coursera)" },
  { name: "Gemini Nexus: The Agentverse", issuer: "Google Developer Group" },
];

export const marqueeWords = [
  "Computer Vision",
  "RAG",
  "YOLO",
  "OpenCV",
  "Vertex AI",
  "Gemini",
  "n8n",
  "Raspberry Pi",
  "ESP32",
  "Arduino",
];
