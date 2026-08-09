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

function stackLabel(project: ProjectCard) {
  return project.tags.slice(0, 3).join(" · ");
}

function primaryHref(project: ProjectCard) {
  return project.links[0]?.href;
}

function outcomeLabel(project: ProjectCard) {
  return project.result ?? projectMeta(project);
}

/** Selected Work lab — typographic outcome ledger. Result-first, almost no chrome. */
export function ProjectsOutcomeLedger() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();

    const rows = root.querySelectorAll<HTMLElement>("[data-ledger-row]");
    const ctx = gsap.context(() => {
      gsap.set(rows, { opacity: 0, y: 14 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.05,
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

        {/* Desktop ledger */}
        <div className="mt-12 hidden md:block">
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1.2fr)_auto] gap-x-6 border-border border-b pb-3 font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground">
            <span>PROJECT</span>
            <span>OUTCOME</span>
            <span>STACK</span>
            <span className="text-right">LINK</span>
          </div>
          <ul>
            {PROJECTS.map((p) => {
              const href = primaryHref(p);
              const RowTag = href ? "a" : "div";
              return (
                <li key={p.id} data-ledger-row className="border-border border-b">
                  <RowTag
                    {...(href
                      ? {
                          href,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": `${p.title} - open project`,
                        }
                      : {})}
                    className="group grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1.2fr)_auto] items-baseline gap-x-6 py-5 transition-colors hover:bg-[color-mix(in_srgb,var(--color-background)_88%,var(--color-foreground)_4%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="font-serif text-h3 leading-tight transition-colors group-hover:text-accent">
                      {p.title}
                    </span>
                    <span className="text-muted-foreground text-small leading-snug">
                      {outcomeLabel(p)}
                    </span>
                    <span className="font-mono text-[0.72rem] text-muted-foreground">
                      {stackLabel(p)}
                    </span>
                    <span className="justify-self-end font-mono text-small text-accent">
                      {href ? "↗" : "—"}
                    </span>
                  </RowTag>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Phone: compact ledger rows */}
        <ul className="mt-10 border-border border-t md:hidden">
          {PROJECTS.map((p) => {
            const href = primaryHref(p);
            const RowTag = href ? "a" : "div";
            return (
              <li key={p.id} data-ledger-row className="border-border border-b">
                <RowTag
                  {...(href
                    ? {
                        href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": `${p.title} - open project`,
                      }
                    : {})}
                  className="block py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-h3 leading-tight">{p.title}</h3>
                    <span className="font-mono text-small text-accent">
                      {href ? "↗" : "—"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-muted-foreground text-small leading-snug">
                    {outcomeLabel(p)}
                  </p>
                  <p className="mt-1 font-mono text-[0.68rem] text-muted-foreground">
                    {stackLabel(p)}
                  </p>
                </RowTag>
              </li>
            );
          })}
        </ul>

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
