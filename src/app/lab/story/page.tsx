"use client";

import { useState } from "react";
import { StoryDualRail } from "@/components/story/story-dual-rail";
import { StoryTimeline } from "@/components/story/story-timeline";

const VARIANTS = [
  { id: "timeline", label: "1 · Timeline" },
  { id: "dual", label: "2 · Dual-rail" },
] as const;

export default function StoryLab() {
  const [active, setActive] = useState<(typeof VARIANTS)[number]["id"]>("timeline");

  return (
    <div className="min-h-screen bg-background">
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

      {active === "timeline" ? <StoryTimeline /> : <StoryDualRail />}

      <section className="border-t border-border px-6 py-24">
        <h2 className="mx-auto max-w-wide text-h2 text-foreground">Selected work</h2>
        <p className="mx-auto mt-3 max-w-wide text-small text-muted-foreground">
          Spacer — production Work section stays unchanged until a variant is promoted.
        </p>
      </section>
    </div>
  );
}
