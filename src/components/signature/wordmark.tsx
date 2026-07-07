"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const NAME = "Madhavi";
const SPLIT_INDEX = 4; // "Madh" (serif) | "avi" (mono)
const SESSION_KEY = "wordmark-played";

export function Wordmark({
  animate = false,
  className = "",
}: {
  animate?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    registerGsap();
    const chars = el.querySelectorAll<HTMLElement>("[data-ch]");
    const ctx = gsap.context(() => {
      gsap.from(chars, {
        opacity: 0,
        y: "0.25em",
        duration: 0.32,
        ease: "power3.out",
        stagger: 0.03,
      });
    }, el);
    sessionStorage.setItem(SESSION_KEY, "1");
    return () => ctx.revert();
  }, [animate]);

  const chars = NAME.split("");
  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: composed accessible name for decorative character spans
    <span ref={ref} aria-label={NAME} className={`inline-flex ${className}`}>
      {chars.map((ch, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed static string
          key={i}
          data-ch
          aria-hidden="true"
          className={i < SPLIT_INDEX ? "font-serif tracking-tight" : "font-mono tracking-tight"}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
