"use client";

import { useEffect, useRef } from "react";
import { HONORS } from "@/content/honors";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Honors — two recognitions, each led by its highlight (a rank, a repeat
 * selection) so the credibility reads in a glance. Motion is Emil-tuned:
 * one-shot scroll reveal + a maroon underline that draws under each highlight.
 * Transform/opacity only, sub-300ms hovers, correct no-motion baseline.
 */
export function HonorsStrip() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const heads = root.querySelectorAll<HTMLElement>("[data-head]");
    const cells = root.querySelectorAll<HTMLElement>("[data-honor]");
    const rules = root.querySelectorAll<HTMLElement>("[data-underline]");

    if (prefersReducedMotion()) {
      rules.forEach((r) => {
        r.style.transform = "scaleX(1)";
      });
      return;
    }

    registerGsap();
    const ctx = gsap.context(() => {
      gsap.set(heads, { opacity: 0, y: 12 });
      gsap.set(cells, { opacity: 0, y: 22, filter: "blur(5px)" });
      gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });

      tl.to(heads, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0);
      tl.to(
        cells,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.14,
          clearProps: "filter",
        },
        0.15,
      );
      tl.to(
        rules,
        {
          scaleX: 1,
          duration: 0.55,
          stagger: 0.14,
          ease: "power2.inOut",
        },
        0.5,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="honors"
      aria-label="Honors"
      className="scroll-mt-24 bg-background px-6 py-16 text-foreground md:py-24"
    >
      <div className="mx-auto max-w-wide">
        <header className="mb-12 md:mb-16">
          <p data-head className="font-mono text-accent text-small tracking-[0.24em]">
            HONORS
          </p>
          <h2 data-head className="mt-3 max-w-[20ch] font-serif text-h2 leading-[1.1]">
            Named twice. Ranked once.
          </h2>
        </header>

        <ul className="grid gap-10 md:grid-cols-2 md:gap-12">
          {HONORS.map((h) => (
            <li key={h.id} data-honor className="group">
              <p className="relative inline-block pb-2">
                <span className="font-serif text-[clamp(2.5rem,6vw,3.75rem)] text-accent leading-[0.95] tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent-hover">
                  {h.highlight}
                </span>
                <span
                  data-underline
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent"
                />
              </p>

              <div className="mt-6 border-border border-t pt-5 transition-colors duration-200 group-hover:border-accent/40">
                <h3 className="font-serif text-h3 leading-tight">{h.org}</h3>
                <p className="mt-2 font-mono text-muted-foreground text-small">{h.role}</p>
                {h.meta ? (
                  <p className="mt-1 font-mono text-muted-foreground text-small">{h.meta}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
