"use client";

import { useState } from "react";
import { AchievementsSection } from "@/components/work/achievements-section";
import { ExperienceHybrid } from "@/components/work/experience-hybrid";
import { ExperienceSpine } from "@/components/work/experience-spine";
import { ExperienceSticky } from "@/components/work/experience-sticky";
import { ProjectsBento } from "@/components/work/projects-bento";
import { ProjectsDiptych } from "@/components/work/projects-diptych";
import { ProjectsMasthead } from "@/components/work/projects-masthead";

const EXP_VARIANTS = [
  { id: "hybrid", label: "A · Hybrid" },
  { id: "sticky", label: "B · Sticky" },
  { id: "spine", label: "C · Spine" },
] as const;

const PROJ_VARIANTS = [
  { id: "masthead", label: "1 · Masthead" },
  { id: "diptych", label: "2 · Diptych" },
  { id: "bento", label: "3 · Bento" },
] as const;

export default function WorkLab() {
  const [exp, setExp] = useState<(typeof EXP_VARIANTS)[number]["id"]>("hybrid");
  const [proj, setProj] = useState<(typeof PROJ_VARIANTS)[number]["id"]>("masthead");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="fixed bottom-4 left-1/2 z-[60] flex max-w-[96vw] -translate-x-1/2 flex-col items-center gap-2">
        <div className="flex gap-1 rounded-full border border-border bg-background/90 p-1 backdrop-blur">
          {EXP_VARIANTS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setExp(v.id)}
              className={`rounded-full px-3 py-1.5 font-mono text-[0.7rem] tracking-wider transition-colors ${
                exp === v.id
                  ? "bg-accent text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-full border border-border bg-background/90 p-1 backdrop-blur">
          {PROJ_VARIANTS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setProj(v.id)}
              className={`rounded-full px-3 py-1.5 font-mono text-[0.7rem] tracking-wider transition-colors ${
                proj === v.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {exp === "hybrid" && <ExperienceHybrid />}
      {exp === "sticky" && <ExperienceSticky />}
      {exp === "spine" && <ExperienceSpine />}

      <AchievementsSection />

      {proj === "masthead" && <ProjectsMasthead />}
      {proj === "diptych" && <ProjectsDiptych />}
      {proj === "bento" && <ProjectsBento />}
    </main>
  );
}
