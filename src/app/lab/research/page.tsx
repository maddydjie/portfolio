"use client";

import { useState } from "react";
import { ResearchCardSwap } from "@/components/work/research-card-swap";
import { ResearchDiptych } from "@/components/work/research-section";
import { ResearchFilmstrip } from "@/components/work/research-filmstrip";
import { ResearchStack } from "@/components/work/research-stack";

const VARIANTS = [
  { id: "swap", label: "D · Card Swap" },
  { id: "diptych", label: "A · Diptych" },
  { id: "filmstrip", label: "B · Filmstrip" },
  { id: "stack", label: "C · Stack" },
] as const;

export default function ResearchLab() {
  const [v, setV] = useState<(typeof VARIANTS)[number]["id"]>("swap");

  return (
    <main className="min-h-screen bg-background pb-32 text-foreground">
      <div className="border-b border-border bg-background px-6 py-10">
        <p className="font-mono text-muted-foreground text-small tracking-[0.2em]">
          LAB · RESEARCH
        </p>
        <h1 className="mt-2 max-w-[22ch] font-serif text-h2 leading-tight">
          Pick a research papers treatment.
        </h1>
        <p className="mt-3 max-w-reading text-muted-foreground text-small">
          Two IAF papers only — “space medicine” is context, not a title. Landing
          stays unchanged until you choose.
        </p>
      </div>

      {v === "swap" ? <ResearchCardSwap /> : null}
      {v === "diptych" ? <ResearchDiptych /> : null}
      {v === "filmstrip" ? <ResearchFilmstrip /> : null}
      {v === "stack" ? <ResearchStack /> : null}

      {/* spacer so the sticky bar doesn’t cover the last paper */}
      <div className="h-24 bg-hero-bg" aria-hidden="true" />

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-wide flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center gap-1 rounded-full border border-border bg-background p-1">
            {VARIANTS.map((item) => {
              const on = v === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setV(item.id)}
                  className={
                    on
                      ? "rounded-full bg-accent px-3 py-1.5 font-mono text-[0.7rem] tracking-wider text-background"
                      : "rounded-full px-3 py-1.5 font-mono text-[0.7rem] tracking-wider text-muted-foreground hover:text-foreground"
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
