"use client";

import { PRESS_FEATURE } from "@/content/press";

/**
 * Newspaper clipping on a dark band — paper inset against hero ink so it
 * breaks the light page rhythm. Outer well + accent edge = pinned clip.
 */
export function PressClipping() {
  const p = PRESS_FEATURE;

  return (
    <section
      id="press"
      aria-label="Press feature"
      className="scroll-mt-24 border-hero-fg/10 border-t bg-hero-bg px-6 py-16 text-hero-fg md:py-24"
    >
      <div className="mx-auto max-w-wide">
        <p className="mb-6 font-mono text-hero-accent text-small tracking-[0.2em]">PRESS</p>

        <div className="rounded-sm border border-hero-accent/35 bg-[#1c1914] p-5 shadow-[inset_0_1px_0_rgba(241,238,230,0.04)] md:p-8 lg:p-10">
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full max-w-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-accent"
          >
            <article className="relative border border-[#d9d2c4] bg-[#F7F4EE] px-6 py-8 text-foreground shadow-[0_22px_50px_-28px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.6)] md:px-10 md:py-10">
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 h-full w-[3px] bg-accent"
              />

              <header className="border-foreground/15 border-b pb-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <p className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-none tracking-[-0.02em]">
                    The Times of India
                  </p>
                  <p className="font-sans text-small font-bold tracking-[0.18em] text-foreground/70">
                    MSN
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
                  <span>{p.section}</span>
                  <span aria-hidden="true">·</span>
                  <span>By {p.byline}</span>
                </div>
              </header>

              <div className="mt-5 border-foreground/10 border-y py-1">
                <div className="h-px bg-foreground/20" />
                <div className="mt-1 h-px bg-foreground/10" />
              </div>

              <h2 className="mt-6 font-serif text-[clamp(1.55rem,3.2vw,2.15rem)] leading-[1.15] tracking-[-0.02em]">
                {p.blurb}
              </h2>

              <p className="mt-8 font-mono text-accent text-small tracking-wider transition-colors group-hover:text-accent-hover">
                Continue reading <span aria-hidden="true">↗</span>
              </p>
            </article>
          </a>
        </div>
      </div>
    </section>
  );
}
