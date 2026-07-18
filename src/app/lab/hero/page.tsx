"use client";

import { useState } from "react";
import { HeroCombined } from "@/components/hero/hero-combined";
import { HeroProfile } from "@/components/hero/lab/hero-profile";
import { HeroScroll } from "@/components/hero/lab/hero-scroll";
import { WeaveDivider } from "@/components/signature/weave-divider";
import { GradualBlur } from "@/components/visual/gradual-blur";
import { ExperienceSpineStack } from "@/components/work/experience-journey";

const VARIANTS = [
  { id: "combined", label: "1 · COMBINED (prod)" },
  { id: "split", label: "2 · SPLIT only" },
  { id: "profile", label: "3 · ProfileCard only" },
] as const;

/** Real Experience block after hero — not a “Selected work” placeholder. */
const WorkAfterHero = () => (
  <div className="relative bg-background">
    <GradualBlur position="top" height="5rem" strength={1.5} divCount={4} />
    <ExperienceSpineStack />
  </div>
);

export default function HeroLab() {
  const [active, setActive] = useState<(typeof VARIANTS)[number]["id"]>("combined");

  return (
    <div className="bg-hero-bg">
      <div className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 gap-1 rounded-full border border-hero-muted/30 bg-hero-bg/80 p-1 backdrop-blur">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(v.id)}
            className={`rounded-full px-3 py-1.5 font-mono text-[0.75rem] tracking-wider transition-colors ${
              active === v.id ? "bg-hero-accent text-hero-bg" : "text-hero-muted hover:text-hero-fg"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {active === "combined" && (
        <>
          <HeroCombined />
          <WeaveDivider />
          <WorkAfterHero />
        </>
      )}
      {active === "split" && (
        <>
          <HeroScroll />
          <WeaveDivider />
          <WorkAfterHero />
        </>
      )}
      {active === "profile" && <HeroProfile />}
    </div>
  );
}
