"use client";

import { useEffect, useRef, useState } from "react";
import { BlurText } from "@/components/text/blur-text";
import { EXPERIENCE_JOURNEY, type ExperienceRole } from "@/content/experience";

function BeatBody({ role }: { role: ExperienceRole }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="font-serif text-h3">{role.title}</h3>
          <p className="mt-1 font-mono text-accent text-small">{role.org}</p>
        </div>
        <p className="font-mono text-muted-foreground text-small">{role.dates}</p>
      </div>
      {role.proof && (
        <p className="mt-3 font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-none text-foreground">
          {role.proof}
        </p>
      )}
      {role.summary && (
        <p className="mt-3 max-w-reading text-small text-muted-foreground leading-relaxed">
          {role.summary}
        </p>
      )}
      {role.bullets && (
        <ul className="mt-4 max-w-reading list-disc space-y-2 pl-5 text-small text-muted-foreground">
          {role.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </>
  );
}

/** B — Sticky left rail with live year/role index. */
export function ExperienceSticky() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(EXPERIENCE_JOURNEY[0]?.id ?? "");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = root.querySelectorAll<HTMLElement>("[data-beat]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.getAttribute("data-beat");
          if (id) setActiveId(id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0 },
    );
    for (const n of nodes) io.observe(n);
    return () => io.disconnect();
  }, []);

  const active = EXPERIENCE_JOURNEY.find((r) => r.id === activeId) ?? EXPERIENCE_JOURNEY[0];

  return (
    <section ref={rootRef} className="bg-background px-6 py-24 text-foreground md:py-28">
      <div className="mx-auto grid max-w-wide gap-10 md:grid-cols-[minmax(12rem,0.38fr)_1fr] md:gap-14">
        <aside className="md:sticky md:top-28 md:self-start">
          <p className="font-mono text-muted-foreground text-small tracking-[0.2em]">EXPERIENCE</p>
          <BlurText
            as="h2"
            text="Where the work got real."
            className="mt-3 max-w-[12ch] font-serif text-h2 leading-tight"
          />
          {active && (
            <div className="mt-8 border-t border-border pt-6">
              <p className="font-mono text-accent text-small">{active.dates}</p>
              <p className="mt-2 font-serif text-h3 leading-snug">{active.title}</p>
              <p className="mt-1 font-mono text-muted-foreground text-small">{active.org}</p>
            </div>
          )}
        </aside>

        <div className="flex flex-col gap-10 md:gap-14">
          {EXPERIENCE_JOURNEY.map((role) => (
            <article
              key={role.id}
              data-beat={role.id}
              className={`scroll-mt-32 transition-opacity duration-300 ${
                activeId === role.id ? "opacity-100" : "opacity-70"
              }`}
            >
              <BeatBody role={role} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
