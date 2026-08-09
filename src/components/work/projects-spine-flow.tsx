"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
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

function ProjectPanel({
  project,
  index,
  active,
}: {
  project: ProjectCard;
  index: number;
  active: boolean;
}) {
  const link = primaryLink(project);
  return (
    <article
      data-panel
      className={`relative flex h-full min-h-[min(70svh,34rem)] flex-col justify-between border-l-2 px-6 py-8 transition-[border-color,opacity] duration-300 md:min-h-[min(72svh,36rem)] md:px-10 md:py-12 ${
        active ? "border-accent opacity-100" : "border-border opacity-45"
      }`}
    >
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <p className="font-mono text-[0.68rem] tracking-[0.16em] text-muted-foreground">
            {projectMeta(project)}
          </p>
          <p
            aria-hidden="true"
            className={`font-serif text-[clamp(3.5rem,10vw,6.5rem)] leading-none tracking-tight ${
              active ? "text-accent/20" : "text-foreground/8"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>

        <h3 className="mt-2 max-w-[12ch] font-serif text-[clamp(2.35rem,5.5vw,4rem)] leading-[0.98]">
          {project.title}
        </h3>

        {project.result ? (
          <p className="mt-5 max-w-[28ch] font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] leading-tight text-accent">
            {project.result}
          </p>
        ) : null}

        <p className="mt-5 max-w-[42ch] text-muted-foreground text-small leading-relaxed md:text-body">
          {project.summary}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-border border-t pt-5">
        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.72rem] text-muted-foreground">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {link ? (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-small text-accent underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            tabIndex={active ? 0 : -1}
          >
            {link.label} ↗
          </a>
        ) : (
          <span className="font-mono text-small text-muted-foreground">Private</span>
        )}
      </div>
    </article>
  );
}

/**
 * Selected Work lab — horizontal spine pathway.
 * Full stage pins; scrub flows projects with snap holds.
 * Signature: clinical left-rail + filling horizontal spine (experience kin).
 */
export function ProjectsSpineFlow() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  const total = PROJECTS.length;
  const activeProject = PROJECTS[active];

  useLayoutEffect(() => {
    setStaticMode(prefersReducedMotion());
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!root || !pin || !viewport || !track) return;
    registerGsap();

    const panels = Array.from(track.children) as HTMLElement[];

    const layoutPanels = () => {
      const vw = viewport.clientWidth;
      // Peek next project (~12%) so the path feels continuous.
      const panelW = Math.round(vw * (vw >= 768 ? 0.88 : 1));
      const gap = vw >= 768 ? 28 : 0;
      panels.forEach((el) => {
        el.style.width = `${panelW}px`;
        el.style.minWidth = `${panelW}px`;
        el.style.marginRight = `${gap}px`;
      });
      return { panelW, gap, vw };
    };

    layoutPanels();

    if (staticMode) {
      if (fill) gsap.set(fill, { scaleX: 0.06, transformOrigin: "left center" });
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        layoutPanels();
        gsap.set(track, { x: 0 });
        if (fill) gsap.set(fill, { scaleX: 0.06, transformOrigin: "left center" });
      });

      mm.add("(min-width: 768px)", () => {
        const getTravel = () => {
          const { panelW, gap } = layoutPanels();
          return Math.max(0, (panelW + gap) * (total - 1));
        };

        gsap.set(track, { x: 0 });
        if (fill) gsap.set(fill, { scaleX: 0.06, transformOrigin: "left center" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${Math.round(getTravel() + window.innerHeight * 0.85)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: total <= 1 ? 0 : 1 / (total - 1),
              duration: { min: 0.12, max: 0.35 },
              ease: "power2.inOut",
            },
            onRefreshInit: () => layoutPanels(),
            onUpdate: (self) => {
              const idx = Math.min(
                total - 1,
                Math.max(0, Math.round(self.progress * (total - 1))),
              );
              setActive((prev) => (prev === idx ? prev : idx));
            },
          },
        });

        tl.to(track, { x: () => -getTravel(), duration: 1 }, 0);
        if (fill) {
          tl.to(fill, { scaleX: 1, duration: 1, transformOrigin: "left center" }, 0);
        }
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => ctx.revert();
  }, [staticMode, total]);

  // Phone / reduced-motion: step slides.
  useLayoutEffect(() => {
    const desktop =
      !staticMode &&
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches;
    if (desktop) return;

    const track = trackRef.current;
    const fill = fillRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    registerGsap();

    const vw = viewport.clientWidth;
    Array.from(track.children).forEach((el) => {
      const node = el as HTMLElement;
      node.style.width = `${vw}px`;
      node.style.minWidth = `${vw}px`;
      node.style.marginRight = "0px";
    });

    const reduce = prefersReducedMotion();
    gsap.to(track, {
      x: -active * vw,
      duration: reduce ? 0 : 0.48,
      ease: "power3.out",
    });
    if (fill) {
      const progress = total <= 1 ? 1 : active / (total - 1);
      gsap.to(fill, {
        scaleX: Math.max(0.06, progress),
        duration: reduce ? 0 : 0.4,
        ease: "power2.out",
        transformOrigin: "left center",
      });
    }
  }, [active, staticMode, total]);

  const goTo = (i: number) => {
    if (i < 0 || i >= total) return;
    const pin = pinRef.current;
    if (!pin) {
      setActive(i);
      return;
    }
    const st = ScrollTrigger.getAll().find((t) => t.trigger === pin);
    if (st && !staticMode && window.matchMedia("(min-width: 768px)").matches) {
      const p = total <= 1 ? 0 : i / (total - 1);
      window.scrollTo({
        top: st.start + (st.end - st.start) * p,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      return;
    }
    setActive(i);
  };

  return (
    <section
      ref={rootRef}
      id="selected-work"
      className="scroll-mt-24 bg-background text-foreground"
      aria-label="Selected work"
    >
      <div
        ref={pinRef}
        className="flex min-h-[100svh] flex-col justify-center px-6 py-16 md:py-20"
      >
        <div className="mx-auto w-full max-w-wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
                SELECTED WORK
              </p>
              <BlurText
                as="h2"
                text={PROJECTS_HEADLINE}
                className="max-w-[16ch] font-serif text-hero leading-[1.05]"
              />
            </div>
            <p className="font-mono text-muted-foreground text-small tabular-nums">
              <span className="text-accent">{String(active + 1).padStart(2, "0")}</span>
              <span className="mx-1.5 text-border">/</span>
              {String(total).padStart(2, "0")}
            </p>
          </div>

          {/* Horizontal clinical spine */}
          <div className="relative mt-8 md:mt-10">
            <div
              aria-hidden="true"
              className="absolute top-[7px] right-0 left-0 h-px bg-accent/20"
            />
            <div
              ref={fillRef}
              aria-hidden="true"
              className="absolute top-[7px] left-0 h-px origin-left bg-accent"
              style={{ width: "100%", transform: "scaleX(0.06)" }}
            />
            {/* Quiet ECG notch near the active head of the fill */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 h-4 w-full text-accent opacity-70"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <path
                d="M0 6 H42 L45 6 L48 1 L52 11 L55 6 H100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
                opacity="0.35"
              />
            </svg>
            <ol className="relative flex justify-between gap-1 pt-1">
              {PROJECTS.map((p, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={p.id} className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={on ? "step" : undefined}
                      aria-label={`${p.title}, system ${i + 1} of ${total}`}
                      className="group flex w-full flex-col items-start gap-2.5 pt-0.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span
                        aria-hidden="true"
                        className={`relative z-10 h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ${
                          on
                            ? "scale-110 border-accent bg-accent"
                            : done
                              ? "border-accent bg-accent/50"
                              : "border-accent/30 bg-background group-hover:border-accent/60"
                        }`}
                      />
                      <span
                        className={`hidden max-w-full truncate font-serif text-[0.8rem] transition-colors md:block ${
                          on ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {p.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div
            ref={viewportRef}
            className="relative mt-8 overflow-hidden md:mt-10"
          >
            <div ref={trackRef} className="flex will-change-transform">
              {PROJECTS.map((p, i) => (
                <div
                  key={p.id}
                  className="shrink-0 bg-surface/60"
                  aria-hidden={activeProject?.id !== p.id}
                >
                  <ProjectPanel project={p} index={i} active={i === active} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 md:hidden">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              className="font-mono text-small text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              ← Prev
            </button>
            <p className="truncate font-serif text-small text-foreground">
              {activeProject?.title}
            </p>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === total - 1}
              className="bg-accent px-4 py-2 font-mono text-small text-background transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {active === total - 1 ? "Done" : "Next →"}
            </button>
          </div>

          <p className="mt-8 font-mono text-small md:mt-10">
            <Link
              href="/work"
              className="text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              All work ↗
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
