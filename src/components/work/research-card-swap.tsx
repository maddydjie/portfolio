"use client";

import { useEffect, useRef, useState } from "react";
import { CardSwap, SwapCard, type CardSwapHandle } from "@/components/visual/card-swap";
import { RESEARCH_CONTEXT, RESEARCH_PAPERS, type ResearchPaper } from "@/content/research-papers";
import { prefersReducedMotion } from "@/lib/motion";

const DEPTH = RESEARCH_PAPERS.length - 1; // 1 — two-card deck
const WHEEL_COOLDOWN_MS = 640;
const WHEEL_THRESHOLD = 24;
const SWIPE_THRESHOLD = 40;

type DeckMetrics = {
  cardW: number;
  cardH: number;
  dist: number;
  vert: number;
  stageW: number;
  stageH: number;
  pad: number;
};

function deckMetricsForViewport(vw: number): DeckMetrics {
  const edge = vw < 640 ? 24 : 48;
  const available = Math.max(280, vw - edge);

  let dist: number;
  let vert: number;
  let targetW: number;

  if (vw < 400) {
    dist = 18;
    vert = 22;
    targetW = 300;
  } else if (vw < 640) {
    dist = 24;
    vert = 28;
    targetW = 340;
  } else if (vw < 1024) {
    dist = 36;
    vert = 40;
    targetW = 440;
  } else {
    dist = 48;
    vert = 52;
    targetW = 520;
  }

  const maxCardW = available - DEPTH * dist - 16;
  const cardW = Math.min(targetW, Math.max(260, Math.floor(maxCardW)));
  const cardH = Math.round(cardW * (vw < 640 ? 1.05 : 0.95));
  const pad = vw < 640 ? 10 : 14;

  return {
    cardW,
    cardH,
    dist,
    vert,
    stageW: cardW + DEPTH * dist + pad * 2,
    stageH: cardH + DEPTH * vert + pad * 2,
    pad,
  };
}

const SSR_METRICS: DeckMetrics = {
  cardW: 440,
  cardH: 418,
  dist: 36,
  vert: 40,
  stageW: 440 + DEPTH * 36 + 28,
  stageH: 418 + DEPTH * 40 + 28,
  pad: 14,
};

function useDeckMetrics(): DeckMetrics {
  const [metrics, setMetrics] = useState<DeckMetrics>(SSR_METRICS);
  useEffect(() => {
    const update = () => setMetrics(deckMetricsForViewport(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return metrics;
}

function PaperFace({
  paper,
  compact,
}: {
  paper: ResearchPaper;
  compact: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col justify-between rounded-[inherit] bg-[#1a1713] ${
        compact ? "p-5" : "p-7 md:p-9"
      }`}
    >
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-[0.72rem] tracking-[0.2em] text-hero-muted">
            {paper.index}
          </p>
          <p className="font-mono text-[0.68rem] tracking-[0.12em] text-hero-accent uppercase">
            IAF · peer-reviewed
          </p>
        </div>
        <h3
          className={`mt-5 font-serif leading-[1.1] text-hero-fg ${
            compact ? "text-[1.35rem]" : "mt-6 text-[clamp(1.5rem,2.6vw,2rem)]"
          }`}
        >
          {paper.title}
        </h3>
        <p className="mt-2 font-mono text-small text-hero-accent">{paper.focus}</p>
        <p
          className={`mt-5 text-hero-muted leading-relaxed ${
            compact ? "line-clamp-4 text-small" : "mt-6 text-small md:text-body"
          }`}
        >
          {paper.abstract}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-hero-fg/10 pt-4">
        {paper.keywords.map((k) => (
          <span key={k} className="font-mono text-[0.68rem] tracking-wider text-hero-muted">
            {k}
          </span>
        ))}
        <span className="ml-auto font-mono text-[0.68rem] tracking-[0.14em] text-hero-accent uppercase">
          IAC · Sydney
        </span>
      </div>
    </div>
  );
}

/** D · Card swap — two-paper deck on a dark research band. */
export function ResearchCardSwap() {
  const [active, setActive] = useState(0);
  const metrics = useDeckMetrics();
  const deckRef = useRef<CardSwapHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const wheelLock = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const total = RESEARCH_PAPERS.length;
  const compact = metrics.cardW < 360;

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!stage || !section) return;

    const peelForward = () => deckRef.current?.advance();
    const peelBack = () => {
      const prev = (activeRef.current - 1 + total) % total;
      deckRef.current?.bringToFront(prev);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const now = Date.now();
      if (now < wheelLock.current) return;
      const primary =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(primary) < WHEEL_THRESHOLD) return;
      wheelLock.current = now + WHEEL_COOLDOWN_MS;
      if (primary > 0) peelForward();
      else peelBack();
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      touchStart.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      const t = e.changedTouches[0];
      if (!start || !t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return;
      if (Math.abs(dy) >= Math.abs(dx)) {
        if (dy > 0) peelForward();
        else peelBack();
      } else if (dx < 0) peelForward();
      else peelBack();
    };

    const onKey = (e: KeyboardEvent) => {
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        peelForward();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        peelBack();
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [total]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
          deckRef.current?.resume();
        } else {
          deckRef.current?.pause();
        }
      },
      { threshold: [0, 0.35, 0.6] },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  const { cardW, cardH, dist, vert, stageW, stageH, pad } = metrics;

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      className="bg-hero-bg px-4 pb-24 pt-20 text-hero-fg outline-none sm:px-6 md:pt-28"
      aria-label="Research papers — card deck"
    >
      <div className="mx-auto max-w-wide">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-hero-accent text-small tracking-[0.22em]">
            {RESEARCH_CONTEXT.eyebrow}
          </p>
          <h2 className="font-serif text-hero leading-tight text-balance">
            {RESEARCH_CONTEXT.headline}
          </h2>
          <p className="mt-4 max-w-reading text-hero-muted text-small leading-relaxed">
            {RESEARCH_CONTEXT.lede}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {RESEARCH_CONTEXT.tags.map((t) => (
              <li
                key={t}
                className="font-mono text-[0.72rem] tracking-[0.14em] text-hero-accent uppercase"
              >
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[0.72rem] tracking-wider text-hero-muted">
            {compact
              ? "Swipe the deck — peel to the other paper."
              : "Scroll the deck — peel to the other paper."}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5 sm:mt-12 lg:mt-14">
          <p className="font-mono text-hero-accent text-small tracking-[0.16em]">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>

          <div
            ref={stageRef}
            className="relative max-w-full touch-none overscroll-none"
            aria-roledescription="carousel"
            aria-label="Research papers — scroll or swipe to reveal the other paper"
          >
            <div
              className="relative mx-auto"
              style={{ width: stageW, height: stageH, maxWidth: "100%" }}
            >
              <div
                className="absolute"
                style={{
                  bottom: pad,
                  left: pad,
                  width: cardW,
                  height: cardH,
                }}
              >
                <CardSwap
                  key={`${cardW}x${cardH}`}
                  ref={deckRef}
                  width={cardW}
                  height={cardH}
                  cardDistance={dist}
                  verticalDistance={vert}
                  delay={5200}
                  pauseOnHover={!compact}
                  skewAmount={compact ? 1.5 : 2.5}
                  easing="linear"
                  onCardClick={(i) => {
                    activeRef.current = i;
                    setActive(i);
                    deckRef.current?.bringToFront(i);
                  }}
                  onFrontChange={(i) => {
                    activeRef.current = i;
                    setActive(i);
                  }}
                >
                  {RESEARCH_PAPERS.map((paper) => (
                    <SwapCard
                      key={paper.id}
                      className="overflow-hidden border-hero-fg/20 shadow-[0_20px_48px_rgba(0,0,0,0.45)]"
                    >
                      <PaperFace paper={paper} compact={compact} />
                    </SwapCard>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>

          <ol className="flex items-center gap-2" aria-label="Paper index">
            {RESEARCH_PAPERS.map((paper, i) => {
              const on = i === active;
              return (
                <li key={paper.id}>
                  <button
                    type="button"
                    onClick={() => {
                      activeRef.current = i;
                      setActive(i);
                      deckRef.current?.bringToFront(i);
                    }}
                    aria-label={paper.title}
                    aria-current={on ? "true" : undefined}
                    className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-accent ${
                      on
                        ? "w-7 bg-hero-accent"
                        : "w-2.5 bg-hero-fg/25 hover:bg-hero-accent/50"
                    }`}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
