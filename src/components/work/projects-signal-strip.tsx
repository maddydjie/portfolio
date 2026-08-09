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

function Channel({
  project,
  className = "",
}: {
  project: ProjectCard;
  className?: string;
}) {
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
      data-channel
      className={`group flex flex-col justify-between px-5 py-6 transition-colors hover:bg-[color-mix(in_srgb,var(--color-background)_90%,var(--color-foreground)_4%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent md:px-7 md:py-8 ${className}`}
    >
      <div>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground">
          {projectMeta(project)}
        </p>
        <h3 className="mt-3 font-serif text-[1.65rem] leading-[1.1] transition-colors group-hover:text-accent md:text-[1.85rem]">
          {project.title}
        </h3>
        {project.result ? (
          <p className="mt-4 font-mono text-[0.72rem] text-accent">{project.result}</p>
        ) : (
          <p className="mt-4 line-clamp-3 text-muted-foreground text-small leading-relaxed">
            {project.summary}
          </p>
        )}
      </div>
      <p className="mt-8 font-mono text-small text-accent">
        {link ? `${link.label} ↗` : "Private"}
      </p>
    </Tag>
  );
}

/** Selected Work lab — horizontal signal strip (channels) on laptop, stack on phone. */
export function ProjectsSignalStrip() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();

    const channels = root.querySelectorAll<HTMLElement>("[data-channel]");
    const ctx = gsap.context(() => {
      gsap.set(channels, { opacity: 0, x: 28 });
      gsap.to(channels, {
        opacity: 1,
        x: 0,
        duration: 0.55,
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
      className="scroll-mt-24 bg-background py-20 text-foreground md:py-24"
      aria-label="Selected work"
    >
      <div className="mx-auto max-w-wide px-6">
        <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
          SELECTED WORK
        </p>
        <BlurText
          as="h2"
          text={PROJECTS_HEADLINE}
          className="max-w-[18ch] font-serif text-hero leading-[1.05]"
        />
        <p className="mt-3 max-w-reading font-mono text-muted-foreground text-small">
          Scroll the channels →
        </p>
      </div>

      {/* Laptop: horizontal strip */}
      <div
        className="mt-10 hidden border-border border-y md:block"
        role="list"
        aria-label="Project channels"
      >
        <div className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="w-[max(1.5rem,calc((100vw-1200px)/2))] shrink-0" aria-hidden="true" />
          {PROJECTS.map((p) => (
            <div key={p.id} role="listitem" className="snap-start">
              <Channel
                project={p}
                className="w-[min(78vw,20rem)] shrink-0 border-border border-r md:w-[22rem]"
              />
            </div>
          ))}
          <div className="w-10 shrink-0" aria-hidden="true" />
        </div>
      </div>

      {/* Phone: vertical stack */}
      <ul className="mt-10 border-border border-t px-6 md:hidden">
        {PROJECTS.map((p) => (
          <li key={p.id} className="border-border border-b">
            <Channel project={p} className="w-full px-0" />
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-10 max-w-wide px-6">
        <p className="font-mono text-small">
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
