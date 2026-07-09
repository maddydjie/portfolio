"use client";

import { useEffect, useRef } from "react";
import { ArtDiptych } from "@/components/visual/art-diptych";
import { ArtMorph } from "@/components/visual/art-morph";
import { ArtPortrait } from "@/components/visual/art-portrait";
import { AFFILIATIONS } from "@/content/landing";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { playOncePerSession, wireSkip } from "@/lib/timeline";

const TAGLINE = "Exploring the future of intelligence, health, and human potential.";

function Art({ v }: { v: "a" | "b" | "c" }) {
  if (v === "b") return <ArtPortrait />;
  if (v === "c") return <ArtDiptych />;
  return <ArtMorph />;
}

export function HeroV2({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    registerGsap();
    const lines = el.querySelectorAll<HTMLElement>("[data-line]");
    const fades = el.querySelectorAll<HTMLElement>("[data-fade]");

    if (prefersReducedMotion() || !playOncePerSession("hero-v2")) {
      gsap.set([lines, fades], { opacity: 1, y: 0 });
      return;
    }

    let cleanup = () => {};
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(lines, { opacity: 0, yPercent: 60, stagger: 0.12, duration: 0.7 }).from(
        fades,
        { opacity: 0, y: 12, stagger: 0.1, duration: 0.5 },
        "-=0.2",
      );
      cleanup = wireSkip(tl);
    }, el);

    return () => {
      cleanup();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-hero-bg px-6 text-hero-fg"
    >
      {/* centerpiece artifact — right half on desktop, faded into the ground on its left edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-90 md:block"
      >
        <div className="h-full w-full [mask-image:linear-gradient(to_right,transparent,black_38%)]">
          <Art v={variant} />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-wide">
        <h1 className="max-w-[15ch] font-serif text-[clamp(2.5rem,6vw,5.25rem)] italic leading-[1.03] tracking-tight">
          <span data-line className="block overflow-hidden pb-1">
            I don&apos;t fit in boxes.
          </span>
          <span data-line className="block overflow-hidden pb-1">
            I build bridges between them.
          </span>
        </h1>
        <p data-fade className="mt-8 max-w-reading text-body text-hero-fg/85">
          {TAGLINE}
        </p>
        <p data-fade className="mt-6 font-mono text-hero-muted text-small">
          MBBS-trained clinician &amp; IIT Madras data scientist
        </p>
        <p data-fade className="mt-2 font-mono text-hero-muted text-small">
          {AFFILIATIONS.join("  ·  ")}
        </p>
        <p data-fade className="mt-14 font-mono text-hero-muted text-small tracking-widest">
          scroll ↓
        </p>
      </div>

      <span className="absolute bottom-6 left-6 font-mono text-hero-muted text-small">©2026</span>
      <span className="absolute right-6 bottom-6 font-mono text-hero-muted text-small tracking-wide">
        MBBS · IIT MADRAS
      </span>
    </section>
  );
}
