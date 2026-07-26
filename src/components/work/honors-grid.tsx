"use client";

import Image from "next/image";
import { BentoCell } from "@/components/work/magic-bento";
import { HONORS } from "@/content/honors";

const GRID = HONORS.filter((h) => !h.featured);

/** Shared 3-cell honors grid for lab press A/B/C compare. */
export function HonorsGrid() {
  return (
    <section aria-label="Honors" className="bg-background px-6 pb-24 text-foreground">
      <div className="mx-auto max-w-wide">
        <p className="mb-6 font-mono text-muted-foreground text-small tracking-[0.2em]">
          ALSO
        </p>
        <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
          {GRID.map((h) => {
            const inner = (
              <div className="flex h-full flex-col p-6 md:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-border bg-background/80 p-2">
                  <Image
                    src={h.logo.src}
                    alt={h.logo.alt}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="mt-6 font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] text-accent leading-[0.95] tracking-[-0.02em]">
                  {h.highlight}
                </p>
                <div className="mt-auto border-border border-t pt-5">
                  <h3 className="font-serif text-h3 leading-tight">{h.org}</h3>
                  <p className="mt-2 font-mono text-muted-foreground text-small">{h.role}</p>
                  {h.meta ? (
                    <p className="mt-1 font-mono text-muted-foreground text-small">{h.meta}</p>
                  ) : null}
                </div>
              </div>
            );

            return (
              <li key={h.id} className="min-h-[260px]">
                <BentoCell className="mb-sharp h-full min-h-[260px]" particles={8}>
                  {h.href ? (
                    <a
                      href={h.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </BentoCell>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
