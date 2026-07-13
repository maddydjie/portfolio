export type ProjectCard = {
  id: string;
  title: string;
  meta: string;
  summary: string;
  result?: string;
  tags: string[];
  links: { label: string; href: string }[];
  /** For diptych pairing */
  rail: "clinical" | "technical";
};

/** Full featured set for lab / landing project layouts. */
export const PROJECTS: ProjectCard[] = [
  {
    id: "case-connect",
    title: "CaseConnect",
    meta: "Clinical AI · TypeScript / FastAPI · 2026",
    summary:
      "AI-powered clinical documentation + hospital management for the Indian healthcare ecosystem — microservices, Whisper + scispaCy voice-AI, Kong JWT/RBAC, ABDM-compliant records.",
    result: "~67% documentation-time reduction",
    tags: ["React", "FastAPI", "PostgreSQL", "ABDM"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/case-connect" }],
    rail: "clinical",
  },
  {
    id: "med-navigator",
    title: "MedNavigator",
    meta: "Clinical AI · Python · 2026",
    summary:
      "Research-focused RAG for clinicians and evidence teams: BM25 + BGE dense embeddings + HyDE re-ranking over PubMed, with GRADE evidence-quality signals in the answer layer.",
    tags: ["BM25", "BGE", "HyDE", "GRADE"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/med_navigator" }],
    rail: "technical",
  },
  {
    id: "medgemma",
    title: "MedGemma NeuroAssist",
    meta: "Medical imaging · Fine-tune · 2025",
    summary:
      "Fine-tuned MedGemma 1.5 4B on CT brain scans for intracranial hemorrhage detection — training, evaluation, and inference notebooks (Kaggle MedGemma hackathon).",
    tags: ["MedGemma", "CT", "ICH"],
    links: [],
    rail: "clinical",
  },
  {
    id: "kavach",
    title: "KAVACH",
    meta: "Agentic systems · Python · Gemini",
    summary:
      "Agentic emergency backend: on Code Red an orchestrator fans out action, comms, and verification agents in parallel — Computer Use routing, Twilio alerts, Gemini threat assessment — streamed live over SSE.",
    tags: ["Agents", "SSE", "Gemini"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/KAVACH-DEEPMIND-V2" }],
    rail: "technical",
  },
  {
    id: "analog-hr",
    title: "Analog Hour",
    meta: "Consumer · Digital wellbeing",
    summary:
      "Mobile-first app that rewards putting the phone down — offline activity tracking, screen-time verification, leaderboards, and a rewards marketplace.",
    tags: ["React", "Wellbeing"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/analog-hr" }],
    rail: "clinical",
  },
  {
    id: "watch2compete",
    title: "CompeteWatch",
    meta: "Competitive intel · TypeScript",
    summary:
      "Full-stack competitive intelligence: monitors competitor sites, changelogs, RSS, blogs, and GitHub releases — LLM summaries, strategic scoring, themes, and opportunity gaps.",
    tags: ["React", "Supabase", "Gemini"],
    links: [
      { label: "Repo", href: "https://github.com/maddydjie/watch2compete" },
      { label: "Demo", href: "https://watch2compete.lovable.app" },
    ],
    rail: "technical",
  },
];

export const PROJECTS_HEADLINE = "Systems that reach the bedside.";

/** Diptych pairs: clinical-leaning | technical-leaning */
export const PROJECT_DIPTYCHS: [ProjectCard, ProjectCard][] = [
  [PROJECTS[0], PROJECTS[1]],
  [PROJECTS[2], PROJECTS[3]],
  [PROJECTS[4], PROJECTS[5]],
];
