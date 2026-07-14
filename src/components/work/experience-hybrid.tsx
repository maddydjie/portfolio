"use client";

import { useEffect, useRef, useState } from "react";
import { BlurText } from "@/components/text/blur-text";
import { EXPERIENCE_JOURNEY, type ExperienceRole } from "@/content/experience";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

function Beat({
  role,
  active,
  showEcg,
}: {
  role: ExperienceRole;
  active: boolean;
  showEcg?: boolean;
}) {
  return (
    <article
      data-beat={role.id}
      className={`relative scroll-mt-32 pl-10 transition-opacity duration-300 md:pl-12 ${
        active ? "opacity-100" : "opacity-65"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-2 left-0 h-3 w-3 -translate-x-1/2 rounded-full border-2 bg-background transition-colors ${
          active ? "border-accent bg-accent/20" : "border-accent/50"
        }`}
      />
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="font-serif text-h3">{role.title}</h3>
          <p className="mt-1 font-mono text-accent text-small">{role.org}</p>
        </div>
        <p className="font-mono text-muted-foreground text-small">{role.dates}</p>
      </div>
      {role.proof && (
        <p className="mt-3 font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] leading-none tracking-[-0.02em]">
          {role.proof}
        </p>
      )}
      {showEcg && (
        <svg
          aria-hidden="true"
          className="mt-3 h-3 w-32 text-accent"
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
      )}
      {role.summary && (
        <p className="mt-3 max-w-reading text-small text-muted-foreground leading-relaxed">
          {role.summary}
        </p>
      )}
      {role.bullets && (
        <ul className="mt-3 max-w-reading list-disc space-y-2 pl-5 text-small text-muted-foreground">
          {role.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

/** A — Hybrid: sticky live index + maroon spine progress + ECG on AMC + proof chips. */
export function ExperienceHybrid() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(EXPERIENCE_JOURNEY[0]?.id ?? "");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    registerGsap();

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

    const spine = root.querySelector<HTMLElement>("[data-spine-fill]");
    const ecg = root.querySelector<SVGPathElement>("[data-ecg]");
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (spine && !reduce) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: root.querySelector("[data-track]"),
              start: "top 65%",
              end: "bottom 35%",
              scrub: 0.5,
            },
          },
        );
      } else if (spine) {
        gsap.set(spine, { scaleY: 1, transformOrigin: "top center" });
      }

      if (ecg && !reduce) {
        const L = ecg.getTotalLength();
        gsap.fromTo(
          ecg,
          { strokeDasharray: L, strokeDashoffset: L },
          {
            strokeDashoffset: 0,
            duration: 0.7,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ecg, start: "top 82%", once: true },
          },
        );
      }
    }, root);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  const active = EXPERIENCE_JOURNEY.find((r) => r.id === activeId) ?? EXPERIENCE_JOURNEY[0];
  const idx = Math.max(0, EXPERIENCE_JOURNEY.findIndex((r) => r.id === activeId));

  return (
    <section ref={rootRef} className="bg-background px-6 py-24 text-foreground md:py-28">
      <div className="mx-auto grid max-w-wide gap-10 md:grid-cols-[minmax(11rem,0.34fr)_1fr] md:gap-16">
        <aside className="md:sticky md:top-28 md:self-start">
          <p className="font-mono text-muted-foreground text-small tracking-[0.2em]">EXPERIENCE</p>
          <BlurText
            as="h2"
            text="Where the work got real."
            className="mt-3 max-w-[12ch] font-serif text-h2 leading-tight"
          />
          <p className="mt-6 font-mono text-muted-foreground text-[0.72rem] tracking-wider">
            {String(idx + 1).padStart(2, "0")} / {String(EXPERIENCE_JOURNEY.length).padStart(2, "0")}
          </p>
          {active && (
            <div className="mt-4 border-t border-border pt-5">
              <p className="font-mono text-accent text-small">{active.dates}</p>
              <p className="mt-2 font-serif text-h3 leading-snug">{active.title}</p>
              <p className="mt-1 font-mono text-muted-foreground text-small">{active.org}</p>
            </div>
          )}
        </aside>

        <div data-track className="relative">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-px -translate-x-1/2 bg-accent/20"
          />
          <div
            data-spine-fill
            aria-hidden="true"
            className="absolute top-0 left-0 w-px -translate-x-1/2 bg-accent origin-top"
            style={{ height: "100%", transform: "scaleY(0)" }}
          />

          <div className="relative flex flex-col gap-12 md:gap-16">
            {EXPERIENCE_JOURNEY.map((role) => (
              <Beat
                key={role.id}
                role={role}
                active={activeId === role.id}
                showEcg={role.id === "amc"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
