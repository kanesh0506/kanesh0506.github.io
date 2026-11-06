import type { Testimonial } from "@/types";

/**
 * PLACEHOLDER testimonials. Replace each entry with a real recommendation (a lecturer,
 * supervisor, workshop partner or hackathon mentor) and set `placeholder: false` to remove the badge.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Sample testimonial: describe what it was like to work with Kanesh on a project. Mention the problem, what he built, and the result you saw.",
    name: "Lecturer or supervisor name",
    title: "Universiti Teknologi Malaysia",
    placeholder: true,
  },
  {
    id: "t2",
    quote:
      "Sample testimonial: a workshop partner or school teacher can describe how the robotics sessions went and how students responded.",
    name: "School or programme partner",
    title: "Robotics workshop programme",
    placeholder: true,
  },
  {
    id: "t3",
    quote:
      "Sample testimonial: a hackathon mentor or teammate can describe how Kanesh handled the 48-hour build and the final pitch.",
    name: "Hackathon mentor or teammate",
    title: "SEDIA Hackathon",
    placeholder: true,
  },
];
