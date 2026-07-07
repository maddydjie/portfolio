"use client";

import { useEffect, useId, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Two asymmetric hairlines that braid over/under a center seam, then merge into
// one stroke on the right. Clinical (maroon) + technical (ink) → unified.
// viewBox 0..240 x, seam at y=20. Crossings at x=60, 108, 150 (asymmetric).
const CLINICAL = "M0 20 C 30 20, 40 8, 60 20 S 90 32, 108 20 S 138 8, 150 20 L 240 20";
const TECHNICAL = "M0 20 C 30 20, 40 32, 60 20 S 90 8, 108 20 S 138 32, 150 20 L 240 20";

export function WeaveDivider({ className = "" }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const maskId = useId().replace(/:/g, "");

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    const strands = root.querySelectorAll<SVGPathElement>("[data-strand]");

    if (prefersReducedMotion()) {
      gsap.set(strands, { drawSVG: "100%" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        strands,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 1.1,
          ease: "power2.inOut",
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`flex justify-center py-section-sm md:py-section ${className}`}>
      <svg
        ref={rootRef}
        viewBox="0 0 240 40"
        width="240"
        height="40"
        fill="none"
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          {/* mask punches small gaps in the under-strand at each crossing so it
              reads as passing BEHIND — without this it's a flat X, not a weave. */}
          <mask id={maskId}>
            <rect x="0" y="0" width="240" height="40" fill="white" />
            <circle cx="60" cy="20" r="4" fill="black" />
            <circle cx="108" cy="20" r="4" fill="black" />
            <circle cx="150" cy="20" r="4" fill="black" />
          </mask>
        </defs>
        <path
          data-strand
          d={TECHNICAL}
          stroke="var(--color-foreground)"
          strokeWidth="1.25"
          strokeLinecap="round"
          mask={`url(#${maskId})`}
        />
        <path
          data-strand
          d={CLINICAL}
          stroke="var(--color-accent)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
