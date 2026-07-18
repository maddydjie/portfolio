"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AFFILIATIONS } from "@/content/landing";
import { GradualBlur } from "@/components/visual/gradual-blur";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// SPLIT — a scroll-scored hero. One pinned stage; scroll scrubs a single
// timeline. The wordmark "Madhavi" splits into its serif + mono halves and the
// two halves slide apart; the portrait wipes open in the gap between them (the
// bridge between the boxes). Then the wordmark parks top-left, the portrait
// docks right, and the tagline + a drawing data-line rise in.
//
// No cursor input, no ambient loops — motion is bound entirely to scroll.
// Reduced-motion renders the final resting composition, unpinned.
export function HeroScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    registerGsap();

    const q = gsap.utils.selector(wrap);
    const stage = q("[data-stage]")[0];
    const serif = q("[data-serif]");
    const mono = q("[data-mono]");
    const portrait = q("[data-portrait]")[0];
    const clip = q("[data-clip]")[0];
    const copy = q("[data-copy]");
    const linePath = q("[data-line]")[0] as unknown as SVGPathElement | undefined;
    const hint = q("[data-hint]")[0];

    if (prefersReducedMotion()) {
      // final resting composition
      gsap.set(serif, { xPercent: 0, yPercent: -132, scale: 0.32 });
      gsap.set(mono, { xPercent: 0, yPercent: -132, scale: 0.32 });
      gsap.set(portrait, { scale: 0.62, xPercent: 30, yPercent: 6 });
      gsap.set(clip, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });
      gsap.set(copy, { opacity: 1, y: 0 });
      if (hint) gsap.set(hint, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(clip, { clipPath: "inset(0% 50% 0% 50%)", opacity: 0.15 });
      gsap.set(copy, { opacity: 0, y: 34 });
      if (linePath) gsap.set(linePath, { drawSVG: "0%" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=260%",
          scrub: 0.6,
          pin: stage,
          anticipatePin: 1,
        },
      });

      // ACT 1 — the split + the portrait wipes open in the gap
      tl.to(serif, { xPercent: -66, duration: 1 }, 0)
        .to(mono, { xPercent: 66, duration: 1 }, 0)
        .to(clip, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1 }, 0)
        .to(hint, { opacity: 0, duration: 0.4 }, 0);

      // ACT 2 — wordmark parks top-left, portrait docks right & shrinks
      tl.to(serif, { xPercent: 0, yPercent: -132, scale: 0.32, duration: 1 }, 1)
        .to(mono, { xPercent: 0, yPercent: -132, scale: 0.32, duration: 1 }, 1)
        .to(portrait, { scale: 0.62, xPercent: 30, yPercent: 6, duration: 1 }, 1);

      // ACT 3 — copy + data-line rise in
      tl.to(copy, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 }, 1.7);
      if (linePath) tl.to(linePath, { drawSVG: "100%", duration: 1 }, 1.7);
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="bg-hero-bg text-hero-fg">
      {/* pinned stage — one viewport tall */}
      <div
        data-stage
        className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6"
      >
        {/* giant split wordmark */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex items-center text-[clamp(4rem,16vw,14rem)] leading-none">
            <span data-serif className="font-serif tracking-tight">
              Madh
            </span>
            <span data-mono className="font-mono tracking-tight">
              avi
            </span>
          </div>
        </div>

        {/* portrait — wipes open in the gap, then docks right */}
        <div
          data-portrait
          className="relative z-10 aspect-[4/5] w-[min(52vw,30rem)] will-change-transform"
        >
          <div
            data-clip
            className="absolute inset-0 overflow-hidden rounded-sm border border-hero-muted/25"
          >
            <Image
              src="/hero-portrait.jpg"
              alt="Portrait of BVS Madhavi"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 480px"
              className="object-cover object-top [filter:grayscale(0.5)_contrast(1.06)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-color opacity-30"
              style={{ background: "var(--color-hero-accent)" }}
            />
          </div>
        </div>

        {/* copy — lower-left, rises in during Act 3 */}
        <div className="absolute bottom-[12vh] left-6 z-30 max-w-reading md:left-[6vw]">
          <p data-copy className="mb-3 font-mono text-hero-muted text-small tracking-widest">
            CLINICAL AI ENGINEER
          </p>
          <p
            data-copy
            className="max-w-[22ch] font-serif text-[clamp(1.3rem,2.4vw,2.1rem)] text-hero-fg/90 italic leading-[1.14]"
          >
            I don&apos;t fit in boxes. I build bridges between them.
          </p>
          <p data-copy className="mt-4 font-mono text-hero-muted text-small">
            {AFFILIATIONS.join("  ·  ")}
          </p>
        </div>

        {/* drawing hairline — an accent rule that draws in under the copy */}
        <svg
          aria-hidden="true"
          className="absolute bottom-[9.5vh] left-6 z-30 h-2 w-[min(34vw,22rem)] md:left-[6vw]"
          viewBox="0 0 400 4"
          fill="none"
          preserveAspectRatio="none"
        >
          <path data-line d="M0 2 H400" stroke="var(--color-hero-accent)" strokeWidth="2" />
        </svg>

        <span
          data-hint
          className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 font-mono text-hero-muted text-small tracking-widest"
        >
          scroll ↓
        </span>

        {/* progressive blur fade at the base edge */}
        <GradualBlur position="bottom" height="8rem" strength={2.4} divCount={6} />
      </div>
    </div>
  );
}
