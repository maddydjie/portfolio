"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BlurText } from "@/components/text/blur-text";
import { PROJECTS, PROJECTS_HEADLINE, type ProjectCard } from "@/content/projects";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

function Row({ project }: { project: ProjectCard }) {
  const [open, setOpen] = useState(false);
  return (
    <div data-proj-row className="border-border border-b py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-wrap items-baseline justify-between gap-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-expanded={open}
      >
        <span className="font-serif text-h3">{project.title}</span>
        <span className="font-mono text-muted-foreground text-small">{project.meta}</span>
      </button>
      {project.result ? (
        <p className="mt-1 font-mono text-accent text-[0.72rem]">{project.result}</p>
      ) : null}
      {open ? (
        <div className="mt-3 max-w-reading">
          <p className="text-small text-muted-foreground leading-relaxed">{project.summary}</p>
          {project.links[0] ? (
            <Link
              href={project.links[0].href}
              className="mt-2 inline-block font-mono text-accent text-small underline-offset-4 hover:underline"
            >
              {project.links[0].label} ↗
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** Selected Work — CaseConnect masthead + compact expandable rows. */
export function ProjectsMasthead() {
  const rootRef = useRef<HTMLElement>(null);
  const [hero, ...rest] = PROJECTS;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();

    const mast = root.querySelector<HTMLElement>("[data-proj-mast]");
    const rows = root.querySelectorAll<HTMLElement>("[data-proj-row]");
    const ctx = gsap.context(() => {
      if (mast) {
        gsap.fromTo(
          mast,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: mast, start: "top 82%", once: true },
          },
        );
      }
      if (rows.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: { trigger: rows[0], start: "top 88%", once: true },
          },
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="selected-work"
      className="scroll-mt-24 bg-background px-6 py-20 text-foreground md:py-24"
      aria-label="Selected work"
    >
      <div className="mx-auto max-w-wide">
        <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
          SELECTED WORK
        </p>
        <BlurText
          as="h2"
          text={PROJECTS_HEADLINE}
          className="max-w-[18ch] font-serif text-hero leading-[1.05]"
        />

        {hero ? (
          <article
            data-proj-mast
            className="mt-12 border border-border bg-surface px-6 py-8 md:px-10 md:py-10"
          >
            <p className="font-mono text-accent text-small">{hero.meta}</p>
            <h3 className="mt-2 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-none">
              {hero.title}
            </h3>
            {hero.result ? (
              <p className="mt-4 font-serif text-h3 leading-tight text-foreground">
                {hero.result}
              </p>
            ) : null}
            <p className="mt-4 max-w-reading text-body text-muted-foreground leading-relaxed">
              {hero.summary}
            </p>
            {hero.links[0] ? (
              <Link
                href={hero.links[0].href}
                className="mt-6 inline-block font-mono text-accent text-small underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {hero.links[0].label} ↗
              </Link>
            ) : null}
          </article>
        ) : null}

        <div className="mt-2">
          {rest.map((p) => (
            <Row key={p.id} project={p} />
          ))}
        </div>

        <p className="mt-10 font-mono text-small">
          <Link
            href="/work"
            className="text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            All work ↗
          </Link>
        </p>
      </div>
    </section>
  );
}
