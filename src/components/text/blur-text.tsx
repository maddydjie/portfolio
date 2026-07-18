"use client";

import { createElement, useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Word-by-word blur-in on scroll into view. Adapted from React Bits' BlurText;
// GSAP + IntersectionObserver, no deps. Reduced-motion leaves text plain.
export function BlurText({
  text,
  as = "p",
  className = "",
  stagger = 0.06,
  once = true,
}: {
  text: string;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    try {
      registerGsap();
    } catch {
      return;
    }

    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    if (!words.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          gsap.fromTo(
            words,
            { opacity: 0, yPercent: 40, filter: "blur(8px)" },
            {
              opacity: 1,
              yPercent: 0,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power3.out",
              stagger,
            },
          );
          if (once) io.unobserve(e.target);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stagger, once]);

  const words = text.split(" ");
  return createElement(
    as,
    { ref, className, suppressHydrationWarning: true },
    words.map((w, i) => (
      <span
        // biome-ignore lint/suspicious/noArrayIndexKey: static word list
        key={i}
        data-w
        className="inline-block whitespace-pre"
      >
        {w}
        {i < words.length - 1 ? " " : ""}
      </span>
    )),
  );
}
