"use client";

import { useEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import { RESEARCH_CONTEXT, RESEARCH_PAPERS } from "@/content/research-papers";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** B · Horizontal filmstrip — wide program-strip cards, snap on small screens. */
export function ResearchFilmstrip() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();
    const parts = root.querySelectorAll<HTMLElement>("[data-rp]");
    const ctx = gsap.context(() => {
      gsap.set(parts, { opacity: 0, x: 24 });
      gsap.to(parts, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="overflow-hidden bg-hero-bg py-20 text-hero-fg md:py-28"
      aria-label="Research — filmstrip"
    >
      <div className="mx-auto max-w-wide px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              data-rp
              className="mb-3 font-mono text-hero-accent text-small tracking-[0.22em]"
            >
              {RESEARCH_CONTEXT.eyebrow}
            </p>
            <BlurText
              as="h2"
              text={RESEARCH_CONTEXT.headline}
              className="max-w-[12ch] font-serif text-hero leading-[1.05]"
            />
          </div>
          <div data-rp className="max-w-[36ch] lg:text-right">
            <p className="text-hero-muted text-small leading-relaxed">
              {RESEARCH_CONTEXT.lede}
            </p>
            <p className="mt-3 font-mono text-[0.72rem] tracking-[0.16em] text-hero-accent uppercase">
              IAC Sydney 2025 · Space medicine · Space research
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mt-16 md:gap-5 lg:mx-auto lg:max-w-wide lg:snap-none lg:overflow-visible lg:px-6"
        style={{ scrollbarWidth: "thin" }}
      >
        {RESEARCH_PAPERS.map((p) => (
          <article
            key={p.id}
            data-rp
            className="relative w-[min(85vw,28rem)] shrink-0 snap-center border border-hero-fg/15 bg-[#1a1713] p-7 md:w-[min(42vw,32rem)] md:p-9 lg:w-auto lg:flex-1"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hero-accent/70 to-transparent"
            />
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[0.72rem] tracking-[0.2em] text-hero-muted">
                PAPER {p.index}
              </span>
              <span className="font-mono text-[0.68rem] tracking-[0.12em] text-hero-accent uppercase">
                IAF · peer-reviewed
              </span>
            </div>
            <h3 className="mt-8 font-serif text-h2 leading-[1.1]">{p.title}</h3>
            <p className="mt-3 font-mono text-small text-hero-accent">{p.focus}</p>
            <p className="mt-6 text-hero-muted text-small leading-relaxed md:text-body">
              {p.abstract}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-hero-fg/10 pt-5">
              {p.keywords.map((k) => (
                <span
                  key={k}
                  className="font-mono text-[0.68rem] tracking-wider text-hero-muted"
                >
                  {k}
                </span>
              ))}
              <span className="ml-auto font-mono text-[0.68rem] tracking-[0.14em] text-hero-accent uppercase">
                IAC · Sydney
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
