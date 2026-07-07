"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Clinician's chart-mark: a single confident maroon stroke under/around a word,
// drawn once on enter. `underline` = a slightly hand-weighted baseline stroke;
// `circle` = an open ellipse. Emphasis only → aria-hidden.
const UNDERLINE = "M2 8 C 40 12, 120 2, 198 7";
const CIRCLE =
  "M100 4 C 150 4, 196 10, 196 15 C 196 22, 120 26, 60 24 C 8 22, 4 14, 20 9 C 40 4, 90 4, 120 5";

export function InkMark({
  variant = "underline",
  children,
  className = "",
}: {
  variant?: "underline" | "circle";
  children: React.ReactNode;
  className?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();
    const path = pathRef.current;
    if (!path) return;
    if (prefersReducedMotion()) {
      gsap.set(path, { drawSVG: "100%" });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        path,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: path, start: "top 90%", once: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const isCircle = variant === "circle";
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-1 w-full"
        viewBox={isCircle ? "0 0 200 30" : "0 0 200 12"}
        height={isCircle ? 30 : 12}
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={isCircle ? CIRCLE : UNDERLINE}
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
