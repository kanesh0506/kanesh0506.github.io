export type Social = { label: string; href: string };

export type Profile = {
  name: string;
  firstName: string;
  role: string;
  affiliation: string;
  headlineLead: string;
  headline: string;
  subtitle: string;
  siteDescription: string;
  email: string;
  phone: string;
  location: string;
  availability: { open: boolean; label: string };
  socials: Social[];
  cvHref: string;
  portrait: { src: string; alt: string; width: number; height: number };
};

export type Stat = { value: number; decimals?: number; suffix?: string; label: string };
export type Milestone = { when: string; title: string; detail?: string };
export type Achievement = { mark: string; title: string; detail: string };

export type AboutContent = {
  story: string;
  mission: string;
  stats: Stat[];
  milestones: Milestone[];
  achievements: Achievement[];
};

export type ExperienceItem = {
  id: string;
  role: string;
  org: string;
  period: string;
  /** Two or three letters shown when no logo file is provided. */
  initials: string;
  /** Optional path under /public, e.g. "/logos/utm.svg". */
  logo?: string;
  bullets: string[];
  tags: string[];
};

export type ProjectCategory = "AI" | "Robotics" | "Web" | "Data";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  badge?: string;
  featured?: boolean;
  tags: string[];
  summary: string;
  image: { src: string; alt: string };
  links: { label: string; href: string }[];
  caseStudy: {
    role: string;
    problem: string;
    approach: string;
    outcome: string;
    stack: string[];
  };
};

export type SkillLevel = 1 | 2 | 3 | 4 | 5;
export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  skills: { name: string; level: SkillLevel }[];
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  /** Shows a "Sample" badge. Set to false once the text is a real recommendation. */
  placeholder?: boolean;
};
