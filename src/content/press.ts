export type PressOutlet = {
  id: string;
  /** Short mark for the strip. */
  label: string;
  /** Optional fuller name for aria. */
  name?: string;
  href?: string;
};

/** Primary TOI × MSN feature + syndicated / alumni coverage. */
export const PRESS_FEATURE = {
  eyebrow: "FEATURED IN",
  highlight: "Press",
  section: "Health",
  byline: "Sanjay Sharma",
  blurb:
    "She pursued MBBS and IIT Madras at the same time. Today she uses AI to advance cancer research.",
  href: "https://www.msn.com/en-in/health/other/she-pursued-mbbs-and-iit-madras-at-the-same-time-today-she-s-using-ai-to-advance-cancer-research/ar-AA289JZ0",
  photo: {
    src: "/press/toi-msn-graduation.jpg",
    alt: "Dr Madhavi at Andhra Medical College convocation in academic regalia",
  },
  /** Primary clipping masthead. */
  outlets: ["The Times of India", "MSN"] as const,
  /** Full coverage strip under the feature. */
  coverage: [
    {
      id: "toi",
      label: "The Times of India",
      href: "https://timesofindia.indiatimes.com/education/news/she-pursued-mbbs-and-iit-madras-at-the-same-time-today-shes-using-ai-to-advance-cancer-research/articleshow/132473016.cms",
    },
    {
      id: "newsbytes",
      label: "NewsBytes",
      href: "https://www.newsbytesapp.com/news/science/bvs-madhavi-studies-data-science-during-mbbs-to-apply-ai/tldr",
    },
    {
      id: "iitmuk",
      label: "IIT Alumni UK",
      name: "IIT Alumni UK",
      href: "https://www.iituk.org/she-studied-mbbs-and-iit-madras-together-now-shes-using-ai-to-fight-cancer/",
    },
    {
      id: "sakshi",
      label: "Sakshi",
      href: "https://www.sakshi.com/telugu-news/family/bvs-madhavi-she-pursued-mbbs-and-iit-madras-same-time-2850936",
    },
  ] satisfies PressOutlet[],
  /** Marquee chips — short, scannable. */
  ticker: [
    "FEATURED",
    "TIMES OF INDIA",
    "NEWSBYTES",
    "IIT ALUMNI UK",
    "SAKSHI",
    "MBBS + IIT MADRAS",
    "CANCER AI",
  ] as const,
} as const;
