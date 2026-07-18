export type Honor = {
  id: string;
  /** The pulled-out signal: the thing worth leading with. */
  highlight: string;
  org: string;
  role: string;
  /** Optional second context line (kept separate so no line carries two dots). */
  meta?: string;
};

/** Quiet credibility. Lead with the fact that travels. */
export const HONORS: Honor[] = [
  {
    id: "hpair",
    highlight: "Twice",
    org: "Harvard HPAIR",
    role: "Delegate · Tokyo",
    meta: "2025 and 2026, back to back",
  },
  {
    id: "deepmind-cv",
    highlight: "Top 20",
    org: "Google DeepMind × Cerebral Valley",
    role: "Hackathon · San Francisco",
  },
];
