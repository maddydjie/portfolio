export type ProjectRow = {
  title: string;
  meta: string; // "domain · stack · year"
  summary: string;
  result?: string; // inline proof
  tags: string[];
  links: { label: string; href: string }[];
};

export const POSITIONING =
  "MBBS-trained clinician and IIT Madras data scientist building at the intersection of clinical AI, real-world evidence, and multimodal health.";

export const AFFILIATIONS = ["nference", "IIT Madras", "Andhra Medical College", "IAF"];

export const FEATURED: ProjectRow[] = [
  {
    title: "CaseConnect",
    meta: "Clinical AI · TypeScript / FastAPI · 2026",
    summary:
      "Full-stack clinical documentation + hospital management platform for the Indian healthcare ecosystem — microservices, a Whisper + scispaCy voice-AI pipeline, Kong gateway with JWT/RBAC, ABDM-compliant records.",
    result: "~67% documentation-time reduction",
    tags: ["React", "Node", "FastAPI", "PostgreSQL", "Redis"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/case-connect" }],
  },
  {
    title: "MedNavigator",
    meta: "Clinical AI · Python · 2026",
    summary:
      "Retrieval-augmented generation for evidence-based clinical research: BM25 + BGE dense embeddings + HyDE re-ranking over PubMed, with GRADE evidence-quality assessment in the answer layer.",
    tags: ["BM25", "BGE", "HyDE", "GRADE"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/med_navigator" }],
  },
  {
    title: "Olfactory Odyssey",
    meta: "Space Medicine · IAF · 2025",
    summary:
      "Cognitive consequences of olfactory inhibition in zero-G. Peer-reviewed research presented at IAF 2025.",
    tags: ["Peer-reviewed", "Research"],
    links: [],
  },
];
