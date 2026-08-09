"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import {
  PROJECT_DIPTYCHS,
  PROJECTS,
  PROJECTS_HEADLINE,
  projectMeta,
  type ProjectCard,
} from "@/content/projects";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

function Cell({ project }: { project: ProjectCard }) {
  return (
    <article data-dip className="border border-border bg-surface p-5 md:p-6">
      <p className="font-mono text-accent text-small">{projectMeta(project)}</p>
      <h3 className="mt-2 font-serif text-h3">{project.title}</h3>
      {project.result && (
        <p className="mt-2 font-mono text-accent text-[0.72rem]">{project.result}</p>
      )}
      <p className="mt-3 text-small text-muted-foreground leading-relaxed">{project.summary}</p>
      {project.links[0] && (
        <Link
          href={project.links[0].href}
          className="mt-4 inline-block font-mono text-accent text-small underline-offset-4 hover:underline"
        >
          {project.links[0].label} ↗
        </Link>
      )}
    </article>
  );
}

export function ProjectsDiptych() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();

    const cells = root.querySelectorAll<HTMLElement>("[data-dip]");
    const ctx = gsap.context(() => {
      gsap.set(cells, { opacity: 0, y: 18 });
      gsap.to(cells, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-background px-6 py-20 text-foreground md:py-24">
      <div className="mx-auto max-w-wide">
        <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
          SELECTED WORK
        </p>
        <BlurText
          as="h2"
          text={PROJECTS_HEADLINE}
          className="max-w-[18ch] font-serif text-hero leading-[1.05]"
        />

        {/* Mobile stack */}
        <div className="mt-12 flex flex-col gap-3 md:hidden">
          {PROJECTS.map((p) => (
            <Cell key={p.id} project={p} />
          ))}
        </div>

        {/* Desktop diptychs */}
        <div className="mt-12 hidden flex-col gap-6 md:flex">
          <div className="grid grid-cols-2 gap-3 px-1 font-mono text-muted-foreground text-[0.72rem] tracking-wider">
            <span>Clinical-leaning</span>
            <span className="text-right">Technical-leaning</span>
          </div>
          {PROJECT_DIPTYCHS.map(([left, right]) => (
            <div key={left.id} className="relative grid grid-cols-2 gap-4">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-accent/40"
              />
              <Cell project={left} />
              <Cell project={right} />
            </div>
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
