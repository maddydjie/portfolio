export type ProjectStatus = "Shipped" | "Prototype" | "Concept";

export type ProjectCard = {
  id: string;
  title: string;
  /** Short domain label for mono metadata */
  domain: string;
  status: ProjectStatus;
  year: string;
  summary: string;
  result?: string;
  tags: string[];
  links: { label: string; href: string }[];
  rail: "clinical" | "technical";
};

/** Full featured set for lab / landing project layouts. */
export const PROJECTS: ProjectCard[] = [
  {
    id: "case-connect",
    title: "CaseConnect",
    domain: "Clinical AI",
    status: "Shipped",
    year: "2026",
    summary:
      "AI-powered clinical documentation + hospital management for the Indian healthcare ecosystem: microservices, Whisper + scispaCy voice-AI, Kong JWT/RBAC, ABDM-compliant records.",
    result: "~67% documentation-time reduction",
    tags: ["React", "FastAPI", "PostgreSQL", "ABDM"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/case-connect" }],
    rail: "clinical",
  },
  {
    id: "med-navigator",
    title: "MedNavigator",
    domain: "Clinical RAG",
    status: "Shipped",
    year: "2026",
    summary:
      "Research-focused RAG for clinicians and evidence teams: BM25 + BGE dense embeddings + HyDE re-ranking over PubMed, with GRADE evidence-quality signals in the answer layer.",
    tags: ["BM25", "BGE", "HyDE", "GRADE"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/med_navigator" }],
    rail: "clinical",
  },
  {
    id: "medgemma",
    title: "MedGemma NeuroAssist",
    domain: "Medical imaging",
    status: "Prototype",
    year: "2025",
    summary:
      "Fine-tuned MedGemma 1.5 4B on CT brain scans for intracranial hemorrhage detection: training, evaluation, and inference notebooks (Kaggle MedGemma hackathon).",
    tags: ["MedGemma", "CT", "ICH"],
    links: [],
    rail: "clinical",
  },
  {
    id: "kavach",
    title: "KAVACH",
    domain: "Agentic systems",
    status: "Prototype",
    year: "2025",
    summary:
      "Agentic emergency backend: on Code Red an orchestrator fans out action, comms, and verification agents in parallel: Computer Use routing, Twilio alerts, Gemini threat assessment, streamed live over SSE.",
    tags: ["Agents", "SSE", "Gemini"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/KAVACH-DEEPMIND-V2" }],
    rail: "technical",
  },
  {
    id: "watch2compete",
    title: "CompeteWatch",
    domain: "Competitive intel",
    status: "Shipped",
    year: "2025",
    summary:
      "Full-stack competitive intelligence: monitors competitor sites, changelogs, RSS, blogs, and GitHub releases with LLM summaries, strategic scoring, themes, and opportunity gaps.",
    tags: ["React", "Supabase", "Gemini"],
    links: [
      { label: "Repo", href: "https://github.com/maddydjie/watch2compete" },
      { label: "Demo", href: "https://watch2compete.lovable.app" },
    ],
    rail: "technical",
  },
  {
    id: "pitchframe",
    title: "Pitchframe",
    domain: "Launch video",
    status: "Shipped",
    year: "2026",
    summary:
      "Turns a codebase into a launch video inside Claude Code: positions the product, films a real UI hero moment, and renders editable Remotion source you can re-cut in seconds.",
    tags: ["Remotion", "Claude Code", "Playwright"],
    links: [
      {
        label: "Repo",
        href: "https://github.com/Sachin-pro-dev/PITCHFRAME-push-to-prod",
      },
    ],
    rail: "technical",
  },
];

export const PROJECTS_HEADLINE = "Built on both rails.";

/** Diptych pairs: clinical-leaning | technical-leaning (paired by index). */
export const PROJECT_DIPTYCHS: [ProjectCard, ProjectCard][] = (() => {
  const clinical = PROJECTS.filter((p) => p.rail === "clinical");
  const technical = PROJECTS.filter((p) => p.rail === "technical");
  const n = Math.min(clinical.length, technical.length);
  return Array.from(
    { length: n },
    (_, i) => [clinical[i]!, technical[i]!] as [ProjectCard, ProjectCard],
  );
})();

/** @deprecated use domain · status · year */
export function projectMeta(p: ProjectCard): string {
  return `${p.domain} · ${p.status} · ${p.year}`;
}
