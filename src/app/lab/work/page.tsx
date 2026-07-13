"use client";

import { useState } from "react";
import { AchievementsSection } from "@/components/work/achievements-section";
import { ExperienceSection } from "@/components/work/experience-section";
import { ProjectsBento } from "@/components/work/projects-bento";
import { ProjectsDiptych } from "@/components/work/projects-diptych";
import { ProjectsMasthead } from "@/components/work/projects-masthead";

const VARIANTS = [
  { id: "masthead", label: "1 · Masthead" },
  { id: "diptych", label: "2 · Diptych" },
  { id: "bento", label: "3 · Bento" },
] as const;

export default function WorkLab() {
  const [active, setActive] = useState<(typeof VARIANTS)[number]["id"]>("masthead");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 gap-1 rounded-full border border-border bg-background/85 p-1 backdrop-blur">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(v.id)}
            className={`rounded-full px-3 py-1.5 font-mono text-[0.75rem] tracking-wider transition-colors ${
              active === v.id
                ? "bg-accent text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <ExperienceSection />
      <AchievementsSection />

      {active === "masthead" && <ProjectsMasthead />}
      {active === "diptych" && <ProjectsDiptych />}
      {active === "bento" && <ProjectsBento />}
    </main>
  );
}
