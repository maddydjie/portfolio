"use client";

import { useState } from "react";
import { ExperienceCardSwap } from "@/components/work/experience-card-swap";
import { ExperienceSpineStack } from "@/components/work/experience-journey";
import { ExperienceSpineStepper } from "@/components/work/experience-spine-stepper";
import { ProjectsBento } from "@/components/work/projects-bento";
import { ProjectsDiptych } from "@/components/work/projects-diptych";
import { ProjectsMasthead } from "@/components/work/projects-masthead";
import { ResearchDiptych } from "@/components/work/research-section";

const EXP_VARIANTS = [
  { id: "stack", label: "A · Spine Stack" },
  { id: "stepper", label: "B · Spine Steps" },
  { id: "swap", label: "C · Card Swap" },
] as const;

const PROJ_VARIANTS = [
  { id: "masthead", label: "1 · Masthead" },
  { id: "diptych", label: "2 · Diptych" },
  { id: "bento", label: "3 · Bento" },
] as const;

export default function WorkLab() {
  const [exp, setExp] = useState<(typeof EXP_VARIANTS)[number]["id"]>("stack");
  const [proj, setProj] = useState<(typeof PROJ_VARIANTS)[number]["id"]>("masthead");

  return (
    <main className="min-h-screen bg-background pb-48 text-foreground">
      {exp === "stack" ? <ExperienceSpineStack /> : null}
      {exp === "stepper" ? <ExperienceSpineStepper /> : null}
      {exp === "swap" ? <ExperienceCardSwap /> : null}

      <ResearchDiptych />

      {proj === "masthead" ? <ProjectsMasthead /> : null}
      {proj === "diptych" ? <ProjectsDiptych /> : null}
      {proj === "bento" ? <ProjectsBento /> : null}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-wide flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center gap-1 rounded-full border border-border bg-background p-1">
            {EXP_VARIANTS.map((v) => {
              const on = exp === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setExp(v.id)}
                  className={
                    on
                      ? "rounded-full bg-accent px-3 py-1.5 font-mono text-[0.7rem] tracking-wider text-background"
                      : "rounded-full px-3 py-1.5 font-mono text-[0.7rem] tracking-wider text-muted-foreground hover:text-foreground"
                  }
                >
                  {v.label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-1 rounded-full border border-border bg-background p-1">
            {PROJ_VARIANTS.map((v) => {
              const on = proj === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setProj(v.id)}
                  className={
                    on
                      ? "rounded-full bg-foreground px-3 py-1.5 font-mono text-[0.7rem] tracking-wider text-background"
                      : "rounded-full px-3 py-1.5 font-mono text-[0.7rem] tracking-wider text-muted-foreground hover:text-foreground"
                  }
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
