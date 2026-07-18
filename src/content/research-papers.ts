export type ResearchPaper = {
  id: string;
  title: string;
  index: string;
  focus: string;
  abstract: string;
  keywords: string[];
  /** DOI / proceedings URL — opened after the card flips. */
  href: string;
};

/**
 * Context around the two IAF papers — not paper titles.
 * Space medicine / space research / IAC Sydney frame the work.
 */
export const RESEARCH_CONTEXT = {
  eyebrow: "RESEARCH",
  headline: "Peer-reviewed papers.",
  lede: "Two International Astronautical Federation papers, presented at IAC Sydney 2025.",
  /** Framing chips — domain + venue, not titles */
  tags: ["Space medicine", "Space research", "IAC Sydney 2025", "IAF"],
} as const;

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "olfactory",
    title: "Olfactory Odyssey",
    index: "01",
    focus: "Cognition in zero-G",
    abstract:
      "Cognitive consequences of olfactory inhibition in microgravity — how smell deprivation reshapes attention, memory, and crew performance off-Earth.",
    keywords: ["olfaction", "zero-G", "cognition"],
    href: "https://doi.org/10.52202/083074-0088",
  },
  {
    id: "bioprint",
    title: "Microgravity-Driven 3D Bioprinting",
    index: "02",
    focus: "Vascular tissue engineering",
    abstract:
      "Vascular tissue engineering under microgravity constraints — bioprinting approaches built for the physics of space, not the lab bench.",
    keywords: ["bioprinting", "microgravity", "vasculature"],
    href: "https://doi.org/10.52202/083075-0051",
  },
];
