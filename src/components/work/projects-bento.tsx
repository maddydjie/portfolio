"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import {
  PROJECTS,
  PROJECTS_HEADLINE,
  projectMeta,
  type ProjectCard,
} from "@/content/projects";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

function primaryLink(project: ProjectCard) {
  return project.links[0];
}

/**
 * Peer-impress dual-rail index.
 * Clinical | Technical — equal weight, list rows (not cards),
 * sibling-dim + maroon highlight on hover.
 */
function RailRow({ project }: { project: ProjectCard }) {
  const link = primaryLink(project);
  const Tag = link ? "a" : "div";

  return (
    <Tag
      {...(link
        ? {
            href: link.href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": `${project.title} - open ${link.label}`,
          }
        : {})}
      data-proj-row
      className="group block border-border border-b border-l-2 border-l-transparent py-5 pl-3 transition-[opacity,border-color,background-color,color] duration-200 last:border-b-0 active:border-l-accent active:bg-[color-mix(in_srgb,var(--color-accent)_10%,var(--color-background))] hover:border-l-accent hover:bg-[color-mix(in_srgb,var(--color-accent)_9%,var(--color-background))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:py-7 md:pl-4"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="min-w-0 flex-1 font-serif text-[1.15rem] leading-tight text-foreground transition-colors group-active:text-accent group-hover:text-accent md:text-[1.2rem]">
          {project.title}
        </h3>
        {link ? (
          <span className="shrink-0 font-mono text-[0.72rem] text-accent opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
            {link.label} ↗
          </span>
        ) : (
          <span className="shrink-0 font-mono text-[0.72rem] text-muted-foreground">
            Private
          </span>
        )}
      </div>

      <p className="mt-1.5 font-mono text-[0.7rem] tracking-[0.04em] text-muted-foreground transition-colors [font-variant-numeric:oldstyle-nums] group-hover:text-foreground/70 md:text-[0.72rem]">
        {projectMeta(project)}
      </p>

      {project.result ? (
        <p className="mt-2.5 font-mono text-[0.75rem] text-accent md:mt-3">
          {project.result}
        </p>
      ) : null}

      <p className="mt-2 max-w-[40ch] text-muted-foreground text-small leading-relaxed transition-colors group-hover:text-foreground/80">
        {project.summary}
      </p>
    </Tag>
  );
}

function RailColumn({
  label,
  projects,
  labelAlign = "left",
}: {
  label: string;
  projects: ProjectCard[];
  labelAlign?: "left" | "right";
}) {
  return (
    <div>
      <p
        className={`font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground ${
          labelAlign === "right" ? "md:text-right" : ""
        }`}
      >
        {label}
      </p>
      <div className="mt-3 border-border border-t">
        {projects.map((p) => (
          <RailRow key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}

/** Sibling dim only on fine pointers — sticky :hover on phones is noisy. */
const RAIL_HOVER =
  "[@media(hover:hover)_and_(pointer:fine)]:[&:hover_[data-proj-row]]:opacity-[0.28] [@media(hover:hover)_and_(pointer:fine)]:[&:hover_[data-proj-row]:hover]:opacity-100";

export function ProjectsBento() {
  const rootRef = useRef<HTMLElement>(null);
  const clinical = PROJECTS.filter((p) => p.rail === "clinical");
  const technical = PROJECTS.filter((p) => p.rail === "technical");

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();

    const rows = root.querySelectorAll<HTMLElement>("[data-proj-row]");
    const ctx = gsap.context(() => {
      gsap.set(rows, { opacity: 0, y: 16 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="selected-work"
      className="relative scroll-mt-24 bg-background px-5 py-16 text-foreground sm:px-6 md:py-24"
      aria-label="Selected work"
    >
      <div className="mx-auto max-w-wide">
        <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
          SELECTED WORK
        </p>
        <BlurText
          as="h2"
          text={PROJECTS_HEADLINE}
          className="max-w-[14ch] font-serif text-hero leading-[1.05]"
        />
        <p className="mt-3 max-w-reading text-muted-foreground text-small md:mt-4">
          <span className="md:hidden">Clinical rail, then technical.</span>
          <span className="hidden md:inline">
            Clinical on the left. Technical on the right.
          </span>
        </p>

        {/* Desktop dual rail */}
        <div
          data-rails
          className={`relative mt-10 hidden md:mt-12 md:block ${RAIL_HOVER}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-8 bottom-0 left-1/2 w-px -translate-x-1/2 bg-accent/30"
          />
          <div className="grid grid-cols-2 gap-x-14 lg:gap-x-20">
            <RailColumn label="CLINICAL RAIL" projects={clinical} />
            <RailColumn
              label="TECHNICAL RAIL"
              projects={technical}
              labelAlign="right"
            />
          </div>
        </div>

        {/* Phone: stacked rails — clinical first, then technical */}
        <div className="mt-8 flex flex-col gap-9 md:hidden">
          <RailColumn label="CLINICAL RAIL" projects={clinical} />
          <RailColumn label="TECHNICAL RAIL" projects={technical} />
        </div>

        <p className="mt-10 font-mono text-small md:mt-12">
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
