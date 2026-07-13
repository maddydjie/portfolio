export type Achievement = {
  id: string;
  title: string;
  meta: string;
  points: string[];
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "olfactory",
    title: "Olfactory Odyssey",
    meta: "IAF 2025 · peer-reviewed",
    points: [
      "Cognitive consequences of olfactory inhibition in zero-G.",
      "Published by the International Astronautical Federation.",
      "Presented at IAC 2025, Sydney.",
    ],
  },
  {
    id: "bioprint",
    title: "Microgravity-Driven 3D Bioprinting",
    meta: "IAF 2025 · peer-reviewed",
    points: [
      "Vascular tissue engineering approaches under microgravity constraints.",
      "Published by the International Astronautical Federation.",
      "Presented alongside the olfactory work at IAC Sydney.",
    ],
  },
  {
    id: "iac",
    title: "IAC Sydney presenter",
    meta: "Jul 2025 – Sep 2025",
    points: [
      "Delivered two space-medicine papers to an international astronautical audience.",
    ],
  },
  {
    id: "hpair",
    title: "Harvard HPAIR delegate",
    meta: "2025 · 2026",
    points: [
      "Selected as Harvard HPAIR delegate (Tokyo) for 2025 and 2026.",
    ],
  },
];
