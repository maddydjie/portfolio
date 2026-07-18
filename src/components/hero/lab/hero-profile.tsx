"use client";

import { AFFILIATIONS } from "@/content/landing";
import { Wordmark } from "@/components/signature/wordmark";
import { ProfileCard } from "./profile-card";

// ProfileCard hero variant — the portrait becomes an interactive, tilt-reactive
// card (React Bits ProfileCard, brand-adapted). Note: cursor-driven, not
// scroll-driven — offered for comparison against the SPLIT scroll hero.
export function HeroProfile() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-hero-bg px-6 text-hero-fg">
      <div className="mx-auto grid w-full max-w-wide grid-cols-1 items-center gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <p className="mb-5 font-mono text-hero-muted text-small tracking-widest">
            CLINICAL AI ENGINEER
          </p>
          <h1 className="text-[clamp(3.5rem,8vw,8rem)] leading-[0.9]">
            <Wordmark className="text-[clamp(3.5rem,8vw,8rem)]" />
          </h1>
          <p className="mt-6 max-w-[20ch] font-serif text-[clamp(1.4rem,2.6vw,2.4rem)] text-hero-fg/90 italic leading-[1.12]">
            I don&apos;t fit in boxes. I build bridges between them.
          </p>
          <p className="mt-8 max-w-reading text-body text-hero-fg/75">
            MBBS-trained clinician and IIT Madras data scientist — working where
            clinical judgment meets machine learning.
          </p>
          <p className="mt-5 font-mono text-hero-muted text-small">
            {AFFILIATIONS.join("  ·  ")}
          </p>
        </div>

        <ProfileCard />
      </div>

      <span className="absolute bottom-6 left-6 font-mono text-hero-muted text-small">©2026</span>
    </section>
  );
}
