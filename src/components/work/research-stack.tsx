"use client";

import { useEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import { RESEARCH_CONTEXT, RESEARCH_PAPERS } from "@/content/research-papers";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** C · Editorial vertical stack — one paper under the other with room to breathe. */
export function ResearchStack() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();
    const parts = root.querySelectorAll<HTMLElement>("[data-rp]");
    const ctx = gsap.context(() => {
      gsap.set(parts, { opacity: 0, y: 22 });
      gsap.to(parts, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-hero-bg px-6 py-20 text-hero-fg md:py-28"
      aria-label="Research — stack"
    >
      <div className="mx-auto max-w-reading">
        <p
          data-rp
          className="mb-3 font-mono text-hero-accent text-small tracking-[0.22em]"
        >
          {RESEARCH_CONTEXT.eyebrow}
        </p>
        <BlurText
          as="h2"
          text={RESEARCH_CONTEXT.headline}
          className="font-serif text-hero leading-[1.05]"
        />
        <p
          data-rp
          className="mt-5 text-hero-muted text-small leading-relaxed md:text-body"
        >
          {RESEARCH_CONTEXT.lede}
        </p>
        <p
          data-rp
          className="mt-4 font-mono text-[0.72rem] tracking-[0.16em] text-hero-accent uppercase"
        >
          Space medicine · Space research · IAC Sydney 2025
        </p>

        <div className="mt-16 space-y-0">
          {RESEARCH_PAPERS.map((p, i) => (
            <article
              key={p.id}
              data-rp
              className={`border-t border-hero-fg/15 py-12 ${
                i === RESEARCH_PAPERS.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="grid gap-6 md:grid-cols-[5rem_1fr] md:gap-10">
                <p className="font-serif text-[clamp(2.5rem,6vw,3.75rem)] leading-none text-hero-fg/25">
                  {p.index}
                </p>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-serif text-h2 leading-tight">{p.title}</h3>
                    <span className="font-mono text-[0.68rem] tracking-[0.14em] text-hero-accent uppercase">
                      IAF · peer-reviewed
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-small text-hero-accent">{p.focus}</p>
                  <p className="mt-5 max-w-[48ch] text-hero-muted text-small leading-relaxed md:text-body">
                    {p.abstract}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                    {p.keywords.map((k) => (
                      <li
                        key={k}
                        className="font-mono text-[0.72rem] tracking-wider text-hero-muted"
                      >
                        {k}
                      </li>
                    ))}
                    <li className="font-mono text-[0.72rem] tracking-[0.14em] text-hero-accent uppercase">
                      IAC Sydney
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
