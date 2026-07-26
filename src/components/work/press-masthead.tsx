"use client";

import { PRESS_FEATURE } from "@/content/press";

/**
 * Lab A — Editorial masthead.
 * Press is the headline: big serif pull, quiet outlets + link. No card.
 */
export function PressMasthead() {
  const p = PRESS_FEATURE;

  return (
    <section aria-label="Press feature masthead" className="bg-background px-6 py-16 text-foreground md:py-24">
      <div className="mx-auto max-w-wide">
        <p className="font-mono text-accent text-small tracking-[0.24em]">{p.eyebrow}</p>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-[clamp(1.15rem,2vw,1.4rem)] font-semibold tracking-[-0.01em]">
            {p.outlets[0]}
          </span>
          <span className="text-muted-foreground" aria-hidden="true">
            ×
          </span>
          <span className="font-sans text-[clamp(1rem,1.8vw,1.25rem)] font-bold tracking-[0.14em]">
            {p.outlets[1]}
          </span>
        </div>

        <h2 className="mt-8 max-w-[18ch] font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-foreground md:mt-10">
          {p.blurb}
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-border border-t pt-6">
          <p className="font-mono text-muted-foreground text-small">
            {p.section} · {p.byline}
          </p>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-accent text-small underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Read the story <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
