"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EXPERIENCE_JOURNEY, type ExperienceRole } from "@/content/experience";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

function StepBody({ role }: { role: ExperienceRole }) {
  return (
    <div>
      <p className="font-mono text-muted-foreground text-small">{role.dates}</p>
      <h3 className="mt-2 font-serif text-h3 leading-tight">{role.title}</h3>
      <p className="mt-2 font-mono text-accent text-small">{role.org}</p>
      {role.proof && (
        <p className="mt-4 font-serif text-[clamp(1.4rem,2.8vw,2rem)] leading-none">
          {role.proof}
        </p>
      )}
      {role.id === "amc" && (
        <svg
          aria-hidden="true"
          className="mt-3 h-3 w-28 text-accent"
          viewBox="0 0 120 12"
          fill="none"
        >
          <path
            d="M0 6 H28 L34 6 L38 2 L42 10 L46 6 H120"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      )}
      {role.summary && (
        <p className="mt-4 max-w-reading text-small text-muted-foreground leading-relaxed">
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
    </div>
  );
}

/** B — Spine dots + clickable step rail; GSAP slide (no framer-motion). */
export function ExperienceSpineStepper() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const total = EXPERIENCE_JOURNEY.length;
  const role = EXPERIENCE_JOURNEY[step];

  const goTo = (next: number) => {
    if (next < 0 || next >= total || next === step) return;
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const slide = slideRef.current;
    if (!panel || !slide) return;
    registerGsap();

    const reduce = prefersReducedMotion();
    const h = slide.offsetHeight;
    gsap.set(panel, { height: h });

    if (reduce) {
      gsap.set(slide, { x: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(
      slide,
      { x: direction >= 0 ? 36 : -36, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
    );
  }, [step, direction]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    registerGsap();
    const fill = root.querySelector<HTMLElement>("[data-spine-fill]");
    if (!fill) return;
    const progress = total <= 1 ? 1 : step / (total - 1);
    gsap.to(fill, {
      scaleY: Math.max(0.08, progress),
      duration: prefersReducedMotion() ? 0 : 0.45,
      ease: "power2.out",
      transformOrigin: "top center",
    });
  }, [step, total]);

  return (
    <section ref={rootRef} className="bg-background px-6 pb-24 pt-24 text-foreground md:pt-28">
      <div className="mx-auto max-w-wide">
        <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
          EXPERIENCE
        </p>
        <h2 className="font-serif text-hero leading-tight text-balance">
          Where the work got real.
        </h2>
        <p className="mt-4 max-w-reading text-small text-muted-foreground">
          Step through the path — spine marks where you are.
        </p>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16">
          <div className="relative w-full shrink-0 md:w-44 lg:w-48">
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[5px] hidden w-px bg-accent/20 md:block"
            />
            <div
              data-spine-fill
              aria-hidden="true"
              className="absolute top-2 left-[5px] hidden w-px origin-top bg-accent md:block"
              style={{ height: "calc(100% - 1rem)", transform: "scaleY(0.08)" }}
            />
            <ol className="relative flex flex-row gap-3 overflow-x-auto pb-2 md:flex-col md:gap-0 md:overflow-visible md:pb-0">
              {EXPERIENCE_JOURNEY.map((r, i) => {
                const active = i === step;
                const done = i < step;
                return (
                  <li key={r.id} className="md:py-2.5">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={active ? "step" : undefined}
                      className="group flex items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span
                        aria-hidden="true"
                        className={`relative z-10 h-3 w-3 shrink-0 rounded-full border-2 transition-colors ${
                          active
                            ? "border-accent bg-accent"
                            : done
                              ? "border-accent bg-accent/40"
                              : "border-accent/40 bg-background"
                        }`}
                      />
                      <span className="min-w-0">
                        <span
                          className={`block font-mono text-[0.65rem] tracking-[0.14em] ${
                            active ? "text-accent" : "text-muted-foreground"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`mt-0.5 block truncate font-serif text-small ${
                            active ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {r.org}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="min-w-0 flex-1 max-w-2xl">
            <div
              ref={panelRef}
              className="relative overflow-hidden border border-border bg-background px-6 py-7 md:px-8 md:py-9"
            >
              <div ref={slideRef}>
                <StepBody role={role} />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                disabled={step === 0}
                className="font-mono text-small text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                ← Previous
              </button>
              <p className="font-mono text-muted-foreground text-small">
                {step + 1} / {total}
              </p>
              <button
                type="button"
                onClick={() => goTo(step + 1)}
                disabled={step === total - 1}
                className="rounded-full bg-accent px-4 py-2 font-mono text-small text-background transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {step === total - 1 ? "Done" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
