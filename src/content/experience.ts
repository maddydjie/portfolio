export type ExperienceRole = {
  id: string;
  title: string;
  org: string;
  dates: string;
  kind: "lead" | "continuity" | "clinical-base" | "row";
  summary?: string;
  bullets?: string[];
  proof?: string;
};

export const EXPERIENCE_ROLES: ExperienceRole[] = [
  {
    id: "nference-ft",
    title: "Junior Clinical Data Scientist",
    org: "nference",
    dates: "Apr 2026 – Present",
    kind: "lead",
    summary:
      "Full-time clinical data science on oncology note extraction and multi-site cohort analysis.",
    bullets: [
      "Extract and classify clinical attributes from oncology notes to support patient cohort studies.",
      "Build SQL cohort pipelines across five Academic Medical Center environments — Mayo Clinic, Duke, VUMC, Emory, and Mercy — on de-identified longitudinal EHR data.",
      "Design LLM prompt-engineering pipelines in Python for structured extraction; validate against clinician-annotated gold sets and track precision/recall by site.",
      "Own clinical validation workflows: error analysis, edge-case characterization, and feedback loops with clinical reviewers.",
    ],
    proof: "5 AMCs · clinical validation",
  },
  {
    id: "nference-intern",
    title: "Junior Clinical Data Scientist (Intern)",
    org: "nference",
    dates: "Oct 2025 – Apr 2026",
    kind: "continuity",
    summary: "Promoted from intern to full-time on the same clinical data science track.",
  },
  {
    id: "amc",
    title: "Clinical Intern",
    org: "Andhra Medical College",
    dates: "Apr 2025 – Mar 2026",
    kind: "clinical-base",
    summary:
      "Bedside clinical training — the healthcare base under every model and pipeline since.",
    bullets: [
      "Rotating clinical exposure across real hospital workflows, notes, and decision-making under supervision.",
      "Ground truth for why clinical AI must survive messy data, not demo datasets.",
    ],
  },
  {
    id: "dexter",
    title: "ML Engineer Intern",
    org: "DEXTER",
    dates: "Feb 2025 – Mar 2025",
    kind: "row",
    summary:
      "TensorFlow CNN for pneumonia detection from chest X-rays — full pipeline from augmentation through evaluation; ~90% test accuracy.",
    proof: "~90% CXR accuracy",
  },
  {
    id: "animations",
    title: "Business Operations Intern",
    org: "Animations Media (London)",
    dates: "Jan 2025 – Feb 2025",
    kind: "row",
    summary:
      "Healthcare-domain operations: sourced 100+ qualified leads and tightened lead-management workflow across US/UK healthcare commercial channels.",
  },
];

/** Reverse-chron journey beats for sticky / spine / hybrid layouts. */
export const EXPERIENCE_JOURNEY: ExperienceRole[] = [
  EXPERIENCE_ROLES[0], // nference FT
  EXPERIENCE_ROLES[1], // nference intern
  EXPERIENCE_ROLES[2], // AMC
  EXPERIENCE_ROLES[3], // DEXTER
  EXPERIENCE_ROLES[4], // Animations
];
