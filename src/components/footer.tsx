"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();

    const panel = root.querySelector<HTMLElement>("[data-footer-panel]");
    if (!panel) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={rootRef} className="mt-auto w-full border-t border-border bg-background">
      <div className="mx-auto max-w-wide px-5 py-10 md:px-6 md:py-section-sm">
        <div
          data-footer-panel
          className="border border-foreground/28 bg-[color-mix(in_srgb,var(--color-background)_92%,var(--color-foreground)_5%)] px-5 py-5 shadow-[0_14px_36px_-26px_rgba(40,20,16,0.4)] md:flex md:items-end md:justify-between md:gap-10 md:px-7 md:py-6"
        >
          <div>
            <p className="font-serif text-h3">Madhavi</p>
            <p className="mt-2 text-small text-muted-foreground">
              Clinical AI Engineer · MBBS + IIT Madras Data Science
            </p>
          </div>
          <p className="mt-4 text-small text-muted-foreground md:mt-0 md:text-right">
            Currently building clinical AI systems.
          </p>
        </div>
      </div>
    </footer>
  );
}
