"use client";

import { useEffect, useRef } from "react";

/**
 * ECG signature divider — the brand's ownable mark (Brand_Kit §6, BRIEF §3).
 * A single QRS-complex path that draws once via stroke-dashoffset when scrolled
 * into view. Draws once, never loops. Respects prefers-reduced-motion by
 * rendering the fully-drawn static line. Decorative → aria-hidden.
 */
export function EcgDivider() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      path.style.strokeDashoffset = "0";
      return;
    }

    // hidden until it enters the viewport, then draws once
    path.style.strokeDashoffset = `${len}`;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          requestAnimationFrame(() => {
            path.style.transition = "stroke-dashoffset 600ms cubic-bezier(0.65, 0, 0.35, 1)";
            path.style.strokeDashoffset = "0";
          });
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(path);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex justify-center py-section-sm md:py-section" aria-hidden="true">
      <svg viewBox="0 0 240 40" width="240" height="40" fill="none" role="presentation">
        <path
          ref={pathRef}
          d="M0 20 H84 L96 20 L104 7 L116 33 L126 20 L138 20 L144 13 L150 20 H240"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
