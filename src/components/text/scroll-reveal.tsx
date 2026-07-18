"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Long-form reveal: words brighten + unblur as the block scrolls through the
// viewport, scrubbed to scroll. Adapted from React Bits' ScrollReveal; for the
// dense project deep-dives and writing. Reduced-motion renders plain text.
export function ScrollReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    registerGsap();

    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.16, filter: "blur(3px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 58%",
            scrub: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static word list
          key={i}
          data-w
          className="inline-block whitespace-pre"
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
