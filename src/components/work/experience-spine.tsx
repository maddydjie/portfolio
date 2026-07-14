"use client";

import { useEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import { EXPERIENCE_JOURNEY, type ExperienceRole } from "@/content/experience";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

function Beat({ role, showEcg }: { role: ExperienceRole; showEcg?: boolean }) {
  return (
    <article data-beat className="relative pl-10 md:pl-14">
      <span
        aria-hidden="true"
        className="absolute top-2 left-0 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="font-serif text-h3">{role.title}</h3>
          <p className="mt-1 font-mono text-accent text-small">{role.org}</p>
        </div>
        <p className="font-mono text-muted-foreground text-small">{role.dates}</p>
      </div>
      {role.proof && (
        <p className="mt-3 font-serif text-[clamp(1.4rem,2.8vw,2rem)] leading-none">{role.proof}</p>
      )}
      {showEcg && (
        <svg
          aria-hidden="true"
          className="mt-3 h-3 w-28 text-accent"
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

/** C — Vertical maroon spine as scroll progress + once-reveal beats. */
export function ExperienceSpine() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    registerGsap();

    const fill = root.querySelector<HTMLElement>("[data-spine-fill]");
    const beats = root.querySelectorAll<HTMLElement>("[data-beat]");
    const ecg = root.querySelector<SVGPathElement>("[data-ecg]");
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (fill) {
        if (reduce) {
          gsap.set(fill, { scaleY: 1, transformOrigin: "top center" });
        } else {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: root.querySelector("[data-track]"),
                start: "top 70%",
                end: "bottom 40%",
                scrub: 0.6,
              },
            },
          );
        }
      }

      if (!reduce) {
        gsap.set(beats, { opacity: 0, y: 20 });
        gsap.to(beats, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        });
        if (ecg) {
          const L = ecg.getTotalLength();
          gsap.fromTo(
            ecg,
            { strokeDasharray: L, strokeDashoffset: L },
            {
              strokeDashoffset: 0,
              duration: 0.7,
              ease: "power2.inOut",
              scrollTrigger: { trigger: ecg, start: "top 80%", once: true },
            },
          );
        }
      }
    }, root);

    return () => ctx.revert();
  }, []);

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

        <div data-track className="relative mt-14 ml-2 md:ml-4">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-px -translate-x-1/2 bg-accent/20"
          />
          <div
            data-spine-fill
            aria-hidden="true"
            className="absolute top-0 left-0 w-px -translate-x-1/2 origin-top bg-accent"
            style={{ height: "100%", transform: "scaleY(0)" }}
          />

          <div className="relative flex flex-col gap-12 md:gap-16">
            {EXPERIENCE_JOURNEY.map((role) => (
              <Beat key={role.id} role={role} showEcg={role.id === "amc"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
