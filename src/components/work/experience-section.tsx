"use client";

import { useEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import { EXPERIENCE_ROLES } from "@/content/experience";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function ExperienceSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();

    const items = root.querySelectorAll<HTMLElement>("[data-exp]");
    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 24 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const lead = EXPERIENCE_ROLES.find((r) => r.kind === "lead");
  const continuity = EXPERIENCE_ROLES.find((r) => r.kind === "continuity");
  const amc = EXPERIENCE_ROLES.find((r) => r.kind === "clinical-base");
  const rows = EXPERIENCE_ROLES.filter(
    (r) => r.kind === "row" || r.kind === "freelance",
  );

  return (
    <section ref={rootRef} className="bg-background px-6 py-24 text-foreground md:py-28">
      <div className="mx-auto max-w-wide">
        <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
          EXPERIENCE
        </p>
        <BlurText
          as="h2"
          text="Where the work got real."
          className="max-w-[16ch] font-serif text-hero leading-[1.05]"
        />

        {lead && (
          <article
            data-exp
            className="mt-12 border border-border bg-surface p-6 md:p-10"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="font-serif text-h2">{lead.title}</h3>
                <p className="mt-1 font-mono text-accent text-small">{lead.org}</p>
              </div>
              <p className="font-mono text-muted-foreground text-small">{lead.dates}</p>
            </div>
            {lead.proof && (
              <p className="mt-4 inline-block border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-accent text-[0.72rem]">
                {lead.proof}
              </p>
            )}
            {lead.bullets && (
              <ul className="mt-6 max-w-reading list-disc space-y-3 pl-5 text-body text-muted-foreground">
                {lead.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {continuity && (
              <p className="mt-8 border-t border-border pt-5 font-mono text-muted-foreground text-small leading-relaxed">
                <span className="text-foreground">{continuity.title}</span>
                {" · "}
                {continuity.org}
                {" · "}
                {continuity.dates}
                {" - "}
                {continuity.summary}
              </p>
            )}
          </article>
        )}

        {amc && (
          <article
            data-exp
            className="relative mt-6 border border-border bg-background p-6 md:p-8"
          >
            <svg
              aria-hidden="true"
              className="absolute top-4 right-6 h-3 w-24 text-accent opacity-70"
              viewBox="0 0 120 12"
              fill="none"
            >
              <path
                data-ecg
                d="M0 6 H28 L34 6 L38 2 L42 10 L46 6 H120"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <div className="flex flex-wrap items-baseline justify-between gap-3 pr-28">
              <div>
                <h3 className="font-serif text-h3">{amc.title}</h3>
                <p className="mt-1 font-mono text-accent text-small">{amc.org}</p>
              </div>
              <p className="font-mono text-muted-foreground text-small">{amc.dates}</p>
            </div>
            <p className="mt-4 max-w-reading text-body text-muted-foreground">{amc.summary}</p>
            {amc.bullets && (
              <ul className="mt-4 max-w-reading list-disc space-y-2 pl-5 text-small text-muted-foreground">
                {amc.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </article>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {rows.map((r) => (
            <article
              key={r.id}
              data-exp
              className="flex flex-col gap-2 border-border border-b py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div className="min-w-0">
                {r.engagement ? (
                  <p className="mb-1.5 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-accent">
                    {r.engagement}
                  </p>
                ) : null}
                <h3 className="font-serif text-h3">{r.title}</h3>
                <p className="mt-1 font-mono text-small text-muted-foreground">
                  {r.org}
                  <span className="mx-2 text-border">·</span>
                  {r.dates}
                </p>
                {r.summary && (
                  <p className="mt-2 max-w-reading text-small text-muted-foreground">{r.summary}</p>
                )}
              </div>
              {r.proof && (
                <span className="shrink-0 font-mono text-accent text-[0.72rem]">{r.proof}</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
