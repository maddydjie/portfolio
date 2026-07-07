import { ProjectCard } from "@/components/project-card";
import { Prose } from "@/components/prose";
import { Section } from "@/components/section";
import { WeaveDivider } from "@/components/signature/weave-divider";
import { Tag } from "@/components/tag";

// Scaffold harness — primitives with PLACEHOLDER content only.
// Real landing content is a later phase (non-goal here).
export default function Home() {
  return (
    <>
      <Section width="reading" className="pb-0">
        <p className="font-mono text-small text-muted-foreground">Scaffold harness — primitives</p>
        <h1 className="mt-4 text-hero-lg">Madhavi</h1>
        <p className="mt-4 text-body text-muted-foreground">
          MBBS-trained clinician and IIT Madras data scientist building at the intersection of
          clinical AI, real-world evidence, and multimodal health.
        </p>
        <p className="mt-6">
          <a href="#work" className="text-accent underline-offset-4 hover:underline">
            View work
          </a>
        </p>
      </Section>

      <Section width="reading" className="py-0">
        <div className="space-y-4">
          <h2 className="text-h2">Type scale (h2)</h2>
          <h3 className="text-h3">Subsection heading (h3)</h3>
          <Prose>
            <p>
              Body copy at 17px / 1.65 in Inter — the neutral reading layer. The serif above is
              Fraunces, carrying the editorial identity. One accent thread of clinical maroon ties
              links and emphasis together, seasoning under five percent of the visual field.
            </p>
          </Prose>
          <div className="flex flex-wrap gap-2">
            <Tag>TypeScript</Tag>
            <Tag>Next.js</Tag>
            <Tag>FastAPI</Tag>
            <Tag>[Research]</Tag>
          </div>
        </div>
      </Section>

      <WeaveDivider />

      <Section width="wide" as="div">
        <h2 id="work" className="text-h2">
          Project rows (placeholder)
        </h2>
        <div className="mt-8">
          <ProjectCard
            title="Sample System"
            meta="Clinical AI · TypeScript · 2026"
            summary="Placeholder summary demonstrating the row-not-card anatomy: title, wide-tracked metadata caption, inline result, and mono tech pills."
            result="~67% documentation-time reduction"
            tags={["React", "Node", "PostgreSQL", "FastAPI"]}
          />
          <ProjectCard
            title="Sample RAG Pipeline"
            meta="Clinical Research · Python · 2026"
            summary="Second placeholder row to show vertical rhythm and border-top separation between entries."
            tags={["BM25", "BGE", "HyDE"]}
          />
          <ProjectCard
            title="Sample Research Paper"
            meta="Space Medicine · IAF · 2025"
            summary="Third row — a paper sits at the same list weight as systems, showing the clinical + technical mix."
            tags={["Peer-reviewed"]}
          />
        </div>
      </Section>
    </>
  );
}
