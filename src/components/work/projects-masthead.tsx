"use client";

import Link from "next/link";
import { useState } from "react";
import { BlurText } from "@/components/text/blur-text";
import { PROJECTS, PROJECTS_HEADLINE, type ProjectCard } from "@/content/projects";

function Row({ project }: { project: ProjectCard }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-border border-b py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-wrap items-baseline justify-between gap-2 text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-h3">{project.title}</span>
        <span className="font-mono text-muted-foreground text-small">{project.meta}</span>
      </button>
      {project.result && (
        <p className="mt-1 font-mono text-accent text-[0.72rem]">{project.result}</p>
      )}
      {open && (
        <div className="mt-3 max-w-reading">
          <p className="text-small text-muted-foreground leading-relaxed">{project.summary}</p>
          {project.links[0] && (
            <Link
              href={project.links[0].href}
              className="mt-2 inline-block font-mono text-accent text-small underline-offset-4 hover:underline"
            >
              {project.links[0].label} ↗
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export function ProjectsMasthead() {
  const [hero, ...rest] = PROJECTS;

  return (
    <section className="bg-background px-6 py-20 text-foreground md:py-24">
      <div className="mx-auto max-w-wide">
        <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
          SELECTED WORK
        </p>
        <BlurText
          as="h2"
          text={PROJECTS_HEADLINE}
          className="max-w-[18ch] font-serif text-hero leading-[1.05]"
        />

        <article className="mt-12 border border-border bg-surface p-6 md:p-10">
          <p className="font-mono text-accent text-small">{hero.meta}</p>
          <h3 className="mt-2 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-none">
            {hero.title}
          </h3>
          {hero.result && (
            <p className="mt-4 font-mono text-accent text-small">{hero.result}</p>
          )}
          <p className="mt-4 max-w-reading text-body text-muted-foreground">{hero.summary}</p>
          {hero.links[0] && (
            <Link
              href={hero.links[0].href}
              className="mt-6 inline-block font-mono text-accent text-small underline-offset-4 hover:underline"
            >
              {hero.links[0].label} ↗
            </Link>
          )}
        </article>

        <div className="mt-4">
          {rest.map((p) => (
            <Row key={p.id} project={p} />
          ))}
        </div>

        <p className="mt-10 font-mono text-small">
          <Link href="/work" className="text-accent underline-offset-4 hover:underline">
            All work ↗
          </Link>
        </p>
      </div>
    </section>
  );
}
