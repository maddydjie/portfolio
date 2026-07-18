"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Cycles through a list of roles, each new word blur-rising in as it swaps.
// A cleaner, more premium swap than glyph-scramble. Reduced-motion holds the
// first role static (no cycling).
export function RotatingTitle({
  words,
  intervalMs = 2400,
  className = "",
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();
    const tween = gsap.fromTo(
      el,
      { opacity: 0, filter: "blur(9px)", yPercent: 40 },
      { opacity: 1, filter: "blur(0px)", yPercent: 0, duration: 0.5, ease: "power3.out" },
    );
    return () => {
      tween.kill();
    };
  }, [i]);

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <span ref={ref} className={`inline-block ${className}`}>
        {words[i]}
      </span>
    </span>
  );
}
