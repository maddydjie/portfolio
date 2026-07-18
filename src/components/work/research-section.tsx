"use client";

import { useEffect, useRef, useState } from "react";
import { BlurText } from "@/components/text/blur-text";
import { RESEARCH_CONTEXT, RESEARCH_PAPERS, type ResearchPaper } from "@/content/research-papers";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const STYLE_ID = "research-section-styles";
const CSS = `
.rs-stage{ display:grid; gap:.75rem; }
@media (min-width:768px){ .rs-stage{ grid-template-columns:1fr 1fr; gap:1.25rem; } }
.rs-pin{
  /* Fixed footprint so ScrollTrigger pin never measures a collapsed deck */
  min-height:22rem;
  background:#14120e;
}
.rs-card{
  position:relative; height:20rem; width:100%;
  perspective:1400px; border:0; padding:0; margin:0;
  background:transparent; cursor:pointer; text-align:left;
}
.rs-face{
  position:absolute; inset:0; border-radius:.25rem;
  display:flex; flex-direction:column; justify-content:space-between;
  padding:1.5rem; overflow:hidden;
}
@media (min-width:768px){ .rs-face{ padding:2rem; } }
.rs-front{
  background:#161310; color:#f1eee6;
  border:1px solid rgba(241,238,230,.18);
  box-shadow:0 18px 40px -24px rgba(0,0,0,.55);
}
.rs-back{
  background:#faf9f6; color:#0e1116;
  border:1px solid #e5e1d8;
  box-shadow:0 18px 40px -20px rgba(40,20,16,.28);
}
.rs-card:focus-visible{ outline:2px solid #d97a6c; outline-offset:4px; }
.rs-card[data-flipped="true"]{ cursor:alias; }
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = CSS;
}

function openPaper(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

function PaperCard({
  paper,
  flipped,
  onActivate,
  staticMode,
}: {
  paper: ResearchPaper;
  flipped: boolean;
  onActivate: () => void;
  staticMode: boolean;
}) {
  if (staticMode) {
    return (
      <a
        href={paper.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-border bg-background p-6 text-foreground transition-colors hover:border-accent md:p-8"
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-[0.72rem] tracking-[0.2em] text-muted-foreground">
            {paper.index}
          </p>
          <p className="font-mono text-[0.72rem] tracking-[0.14em] text-accent uppercase">
            IAF · peer-reviewed
          </p>
        </div>
        <h3 className="mt-5 font-serif text-h2 leading-tight">{paper.title}</h3>
        <p className="mt-2 font-mono text-small text-accent">{paper.focus}</p>
        <p className="mt-6 max-w-[42ch] text-muted-foreground text-small leading-relaxed md:text-body">
          {paper.abstract}
        </p>
        <p className="mt-6 font-mono text-accent text-small">Paper ↗</p>
      </a>
    );
  }

  return (
    <button
      type="button"
      className="rs-card"
      data-rs-card
      data-flipped={flipped ? "true" : "false"}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? `Open ${paper.title} paper`
          : `${paper.title} — scroll to flip`
      }
      onClick={onActivate}
    >
      <div className="rs-face rs-front" data-rs-front>
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-[0.72rem] tracking-[0.2em] text-hero-muted">
              {paper.index}
            </p>
            <p className="font-mono text-[0.72rem] tracking-[0.14em] text-hero-accent uppercase">
              IAF · peer-reviewed
            </p>
          </div>
          <h3 className="mt-6 font-serif text-h2 leading-tight text-hero-fg">{paper.title}</h3>
          <p className="mt-3 font-mono text-small text-hero-accent">{paper.focus}</p>
        </div>
        <p className="font-mono text-[0.68rem] tracking-[0.16em] text-hero-muted uppercase">
          Scroll to flip
        </p>
      </div>
      <div className="rs-face rs-back" data-rs-back aria-hidden={!flipped}>
        <div>
          <p className="font-mono text-[0.72rem] tracking-[0.14em] text-accent uppercase">
            Abstract · IAC Sydney 2025
          </p>
          <h3 className="mt-4 font-serif text-h3 leading-tight">{paper.title}</h3>
          <p className="mt-5 text-muted-foreground text-small leading-relaxed md:text-body">
            {paper.abstract}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {paper.keywords.map((k) => (
            <span
              key={k}
              className="border border-border px-2.5 py-1 font-mono text-[0.68rem] tracking-wider text-muted-foreground"
            >
              {k}
            </span>
          ))}
          <span className="ml-auto font-mono text-accent text-small">Open paper ↗</span>
        </div>
      </div>
    </button>
  );
}

/**
 * Research band — pins the deck in-frame:
 * hold front → flip → hold paper backs (clickable DOIs) → release scroll.
 */
export function ResearchSection() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const flippedRef = useRef(false);
  const [staticMode] = useState(() =>
    typeof window !== "undefined" ? prefersReducedMotion() : false,
  );
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    if (!root || !pin || !stage || staticMode) return;
    injectStyles();
    registerGsap();

    const intro = root.querySelectorAll<HTMLElement>("[data-rs-intro]");
    const cards = Array.from(stage.querySelectorAll<HTMLElement>("[data-rs-card]"));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        intro,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        },
      );

      // Only animate faces — never the pin wrapper / card shells (keeps pin height stable).
      cards.forEach((card) => {
        const front = card.querySelector<HTMLElement>("[data-rs-front]");
        const back = card.querySelector<HTMLElement>("[data-rs-back]");
        if (!front || !back) return;
        gsap.set(front, {
          rotationY: 0,
          opacity: 1,
          transformPerspective: 1400,
          transformOrigin: "center center",
        });
        gsap.set(back, {
          rotationY: 90,
          opacity: 0,
          transformPerspective: 1400,
          transformOrigin: "center center",
        });
      });

      // Pin the deck in place. Scroll distance = hold front + flip + hold back.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pin,
          start: "top 18%",
          end: "+=220%",
          pin: true,
          pinSpacing: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Flipped once we're past the flip beat (~40% of the pin timeline).
            const on = self.progress >= 0.42;
            if (on !== flippedRef.current) {
              flippedRef.current = on;
              setFlipped(on);
            }
          },
        },
      });

      // 0–0.35: hold ink front (look)
      // 0.35–0.55: flip
      // 0.55–1.0: hold paper back (look + click Open paper)
      tl.to({}, { duration: 0.7 }); // hold front

      cards.forEach((card) => {
        const front = card.querySelector<HTMLElement>("[data-rs-front]");
        const back = card.querySelector<HTMLElement>("[data-rs-back]");
        if (!front || !back) return;
        tl.to(front, { rotationY: -90, opacity: 0, duration: 0.45 }, 0.7);
        tl.to(back, { rotationY: 0, opacity: 1, duration: 0.45 }, 0.95);
      });

      tl.to({}, { duration: 1.1 }); // hold back

      // Refresh after layout so pin-spacer matches the real 20rem cards.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => ctx.revert();
  }, [staticMode]);

  const onActivate = (paper: ResearchPaper) => {
    if (staticMode || flippedRef.current || flipped) {
      openPaper(paper.href);
    }
  };

  return (
    <section
      ref={rootRef}
      id="research"
      data-research-section="live"
      className="scroll-mt-24 bg-hero-bg text-hero-fg"
      aria-label="Research papers"
    >
      <div className="mx-auto max-w-wide px-6 pt-20 md:pt-28">
        <p
          data-rs-intro
          className="mb-3 font-mono text-hero-accent text-small tracking-[0.22em]"
        >
          {RESEARCH_CONTEXT.eyebrow}
        </p>
        <BlurText
          as="h2"
          text={RESEARCH_CONTEXT.headline}
          className="max-w-[12ch] font-serif text-hero leading-[1.05]"
        />
        <p
          data-rs-intro
          className="mt-5 max-w-[46ch] text-hero-muted text-small leading-relaxed md:text-body"
        >
          {RESEARCH_CONTEXT.lede}
        </p>
        <ul data-rs-intro className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          {RESEARCH_CONTEXT.tags.map((t) => (
            <li
              key={t}
              className="font-mono text-[0.72rem] tracking-[0.14em] text-hero-accent uppercase"
            >
              {t}
            </li>
          ))}
        </ul>
        {!staticMode ? (
          <p
            data-rs-intro
            className="mt-4 font-mono text-[0.72rem] tracking-wider text-hero-muted"
          >
            Scroll locks the deck — flip, look, then click Open paper.
          </p>
        ) : null}
      </div>

      <div ref={pinRef} className="rs-pin px-6 pb-16 pt-6 md:pb-20">
        <div
          ref={stageRef}
          className="mx-auto max-w-wide border-t border-hero-fg/15 pt-6"
        >
          <div className={staticMode ? "grid gap-4 md:grid-cols-2" : "rs-stage"}>
            {RESEARCH_PAPERS.map((p) => (
              <PaperCard
                key={p.id}
                paper={p}
                flipped={flipped}
                onActivate={() => onActivate(p)}
                staticMode={staticMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** @deprecated alias — lab pages still import the old name */
export const ResearchDiptych = ResearchSection;
