"use client";

import { useState } from "react";
import { HonorsGrid } from "@/components/work/honors-grid";
import { PressClipping } from "@/components/work/press-clipping";
import { PressMasthead } from "@/components/work/press-masthead";
import { PressTicker } from "@/components/work/press-ticker";

const VARIANTS = [
  { id: "masthead", label: "1 · Masthead" },
  { id: "clipping", label: "2 · Clipping" },
  { id: "ticker", label: "3 · Ticker" },
] as const;

export default function PressLab() {
  const [active, setActive] = useState<(typeof VARIANTS)[number]["id"]>("clipping");

  return (
    <main className="min-h-screen bg-background pb-32 text-foreground">
      <div className="border-border border-b px-6 py-8">
        <div className="mx-auto max-w-wide">
          <p className="font-mono text-accent text-small tracking-[0.24em]">LAB · PRESS</p>
          <h1 className="mt-2 font-serif text-h2 leading-tight">TOI × MSN — pick a treatment</h1>
          <p className="mt-3 max-w-reading text-muted-foreground text-small">
            Three directions for the feature. Clipping (2) is production — dark band + paper
            inset. Switch below; honors grid stays for context.
          </p>
        </div>
      </div>

      {active === "masthead" ? <PressMasthead /> : null}
      {active === "clipping" ? <PressClipping /> : null}
      {active === "ticker" ? <PressTicker /> : null}

      <HonorsGrid />

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-wide justify-center">
          <div className="flex flex-wrap justify-center gap-1 rounded-full border border-border bg-background p-1">
            {VARIANTS.map((v) => {
              const on = active === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActive(v.id)}
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
        </div>
      </div>
    </main>
  );
}
