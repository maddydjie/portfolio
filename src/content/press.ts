/** TOI × MSN health feature — shared by lab press variants + honors. */
export const PRESS_FEATURE = {
  outlets: ["The Times of India", "MSN"] as const,
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
  /** Marquee chips — short, scannable. */
  ticker: [
    "FEATURED",
    "TIMES OF INDIA × MSN",
    "MBBS + IIT MADRAS",
    "CANCER AI",
    "READ THE STORY",
  ] as const,
} as const;
