import { PRESS_FEATURE } from "@/content/press";

export type Honor = {
  id: string;
  /** The pulled-out signal: the thing worth leading with. */
  highlight: string;
  org: string;
  role: string;
  /** Optional second context line (kept separate so no line carries two dots). */
  meta?: string;
  /** Longer pull for featured press / story cards. */
  blurb?: string;
  href?: string;
  /** Lead card spanning the grid. */
  featured?: boolean;
  logo: {
    src: string;
    alt: string;
  };
};

/** Quiet credibility. Lead with the fact that travels. */
export const HONORS: Honor[] = [
  {
    id: "toi-msn",
    featured: true,
    highlight: PRESS_FEATURE.highlight,
    org: `${PRESS_FEATURE.outlets[0]} × ${PRESS_FEATURE.outlets[1]}`,
    role: `${PRESS_FEATURE.section} feature`,
    meta: `By ${PRESS_FEATURE.byline}`,
    blurb: PRESS_FEATURE.blurb,
    href: PRESS_FEATURE.href,
    logo: {
      src: "/logos/iitm.png",
      alt: "Times of India × MSN feature",
    },
  },
  {
    id: "hpair",
    highlight: "Invited twice",
    org: "Harvard HPAIR",
    role: "Delegate · Tokyo",
    meta: "2025 and 2026, back to back",
    logo: {
      src: "/logos/harvard.svg",
      alt: "Harvard University crest",
    },
  },
  {
    id: "deepmind-cv",
    highlight: "Top 20",
    org: "Google DeepMind × Cerebral Valley",
    role: "Hackathon · India",
    logo: {
      src: "/logos/deepmind.svg",
      alt: "DeepMind logo",
    },
  },
  {
    id: "iitm-feature",
    highlight: "Featured",
    org: "IIT Madras BS Data Science",
    role: "Programme spotlight",
    meta: "From MBBS to Clinical AI",
    href: "https://www.linkedin.com/posts/iit-madras-bs-datascience-programme_iit-iitmadras-doctor-activity-7483740475087085568--6pk",
    logo: {
      src: "/logos/iitm.png",
      alt: "IIT Madras logo",
    },
  },
];
