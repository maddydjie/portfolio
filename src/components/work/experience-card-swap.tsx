"use client";

import { useEffect, useRef, useState } from "react";
import { CardSwap, SwapCard, type CardSwapHandle } from "@/components/visual/card-swap";
import { experienceCardTone } from "@/components/work/experience-card-tone";
import { EXPERIENCE_JOURNEY, type ExperienceRole } from "@/content/experience";
import { prefersReducedMotion } from "@/lib/motion";

const DEPTH = EXPERIENCE_JOURNEY.length - 1;
const WHEEL_COOLDOWN_MS = 680;
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
  // Fan must fit: card + depth*distance + edge pad ≤ available width.
  const edge = vw < 640 ? 24 : vw < 1024 ? 40 : 48;
  const available = Math.max(280, vw - edge);

  let dist: number;
  let vert: number;
  let targetW: number;

  if (vw < 400) {
    dist = 16;
    vert = 18;
    targetW = 280;
  } else if (vw < 640) {
    dist = 20;
    vert = 22;
    targetW = 320;
  } else if (vw < 1024) {
    dist = 30;
    vert = 34;
    targetW = 420;
  } else {
    dist = 40;
    vert = 44;
    targetW = 480;
  }

  const maxCardW = available - DEPTH * dist - 16;
  const cardW = Math.min(targetW, Math.max(240, Math.floor(maxCardW)));
  const cardH = Math.round(cardW * (vw < 640 ? 0.92 : 0.86));
  const pad = vw < 640 ? 8 : 12;

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
  cardW: 420,
  cardH: 360,
  dist: 30,
  vert: 34,
  stageW: 420 + DEPTH * 30 + 24,
  stageH: 360 + DEPTH * 34 + 24,
  pad: 12,
};

function useDeckMetrics(): DeckMetrics {
  // Same initial metrics on server + first client paint (avoid hydration mismatch).
  const [metrics, setMetrics] = useState<DeckMetrics>(SSR_METRICS);

  useEffect(() => {
    const update = () => setMetrics(deckMetricsForViewport(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return metrics;
}

function SwapFace({
  role,
  index,
  compact,
}: {
  role: ExperienceRole;
  index: number;
  compact: boolean;
}) {
  const tone = experienceCardTone(index);
  return (
    <div
      className={`flex h-full flex-col justify-between rounded-[inherit] ${
        compact ? "p-4" : "p-6 md:p-8"
      } ${tone.face}`}
    >
      <div>
        <div className="flex items-baseline justify-between gap-2 sm:gap-3">
          <p className={`font-mono text-small tracking-[0.18em] ${tone.muted}`}>
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className={`shrink-0 font-mono text-[0.7rem] sm:text-small ${tone.muted}`}>
            {role.dates}
          </p>
        </div>
        <h3
          className={`mt-3 font-serif leading-tight ${
            compact
              ? "text-[1.15rem]"
              : "text-[clamp(1.35rem,2.4vw,1.85rem)] mt-4"
          }`}
        >
          {role.title}
        </h3>
        <p className={`mt-2 font-mono text-small ${tone.org}`}>{role.org}</p>
      </div>
      <div>
        {role.proof ? (
          <p
            className={`font-serif leading-none ${
              compact
                ? "text-[1.15rem]"
                : "text-[clamp(1.3rem,2.2vw,1.75rem)]"
            }`}
          >
            {role.proof}
          </p>
        ) : null}
        {role.summary ? (
          <p
            className={`mt-2 text-small leading-relaxed ${tone.muted} ${
              compact ? "line-clamp-2" : "mt-3 line-clamp-3"
            }`}
          >
            {role.summary}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/**
 * C — Scroll/swipe peels the front card to reveal the one behind.
 * Deck scales up on desktop and stays in-bounds on phones.
 */
export function ExperienceCardSwap() {
  const [active, setActive] = useState(0);
  const metrics = useDeckMetrics();
  const deckRef = useRef<CardSwapHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const wheelLock = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const total = EXPERIENCE_JOURNEY.length;
  const compact = metrics.cardW < 340;

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

      // Prefer the dominant axis; down / left = next card.
      if (Math.abs(dy) >= Math.abs(dx)) {
        if (dy > 0) peelForward();
        else peelBack();
      } else {
        if (dx < 0) peelForward();
        else peelBack();
      }
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
      className="bg-background px-4 pb-24 pt-20 text-foreground outline-none sm:px-6 md:pt-28"
      aria-label="Experience card deck"
    >
      <div className="mx-auto max-w-wide">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
            EXPERIENCE
          </p>
          <h2 className="font-serif text-hero leading-tight text-balance">
            Where the work got real.
          </h2>
          <p className="mt-4 max-w-reading text-small text-muted-foreground">
            {compact
              ? "Swipe the deck — each card peels back to the one behind it."
              : "Scroll the deck — each card peels back to the one behind it."}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:gap-5 lg:mt-14">
          <p className="font-mono text-accent text-small tracking-[0.16em]">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>

          <div
            ref={stageRef}
            className="relative max-w-full touch-none overscroll-none"
            aria-roledescription="carousel"
            aria-label="Experience roles — scroll or swipe to reveal the next card"
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
                  delay={5600}
                  pauseOnHover={!compact}
                  skewAmount={compact ? 1.5 : 2}
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
                  {EXPERIENCE_JOURNEY.map((role, i) => {
                    const tone = experienceCardTone(i);
                    return (
                      <SwapCard
                        key={role.id}
                        className={`overflow-hidden shadow-[0_16px_36px_rgba(40,20,16,0.14)] ${
                          tone.maroon
                            ? "border-accent/80"
                            : "border-border bg-background"
                        }`}
                      >
                        <SwapFace role={role} index={i} compact={compact} />
                      </SwapCard>
                    );
                  })}
                </CardSwap>
              </div>
            </div>
          </div>

          <ol className="flex items-center gap-2" aria-label="Role index">
            {EXPERIENCE_JOURNEY.map((role, i) => {
              const on = i === active;
              return (
                <li key={role.id}>
                  <button
                    type="button"
                    onClick={() => {
                      activeRef.current = i;
                      setActive(i);
                      deckRef.current?.bringToFront(i);
                    }}
                    aria-label={`${role.title} at ${role.org}`}
                    aria-current={on ? "true" : undefined}
                    className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      on ? "w-7 bg-accent" : "w-2.5 bg-border hover:bg-accent/40"
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
