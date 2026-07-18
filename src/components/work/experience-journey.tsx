"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { experienceCardTone } from "@/components/work/experience-card-tone";
import { EXPERIENCE_JOURNEY, type ExperienceRole } from "@/content/experience";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** Card entrance — opacity/y only. No filter blur (that stuck soft). */
function revealCard(el: HTMLElement, onDone?: () => void) {
  const lines = el.querySelectorAll<HTMLElement>("[data-line]");
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: onDone,
  });

  tl.fromTo(
    el,
    { opacity: 0.35, y: 36 },
    { opacity: 1, y: 0, duration: 0.55, clearProps: "filter,transform" },
  );

  if (lines.length) {
    tl.fromTo(
      lines,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.06,
        clearProps: "filter,transform",
      },
      "-=0.3",
    );
  }

  return tl;
}

function RoleCard({
  role,
  index,
  active,
  revealed,
  expanded,
  onToggle,
}: {
  role: ExperienceRole;
  index: number;
  active: boolean;
  revealed: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const tone = experienceCardTone(index);
  const hasMore = Boolean(role.bullets && role.bullets.length > 0);

  return (
    <article
      id={`exp-stack-${role.id}`}
      data-role-card
      data-index={index}
      className={`border px-6 py-6 md:px-8 md:py-8 ${tone.shell} ${
        active
          ? "z-[1] shadow-[0_22px_48px_rgba(40,20,16,0.18)] ring-1 ring-accent/30"
          : "shadow-[0_4px_14px_rgba(40,20,16,0.04)]"
      } ${revealed ? "" : "pointer-events-none"}`}
    >
      <div
        data-line
        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
      >
        <p className={`font-mono text-small tracking-[0.18em] ${tone.muted}`}>
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className={`font-mono text-small ${tone.muted}`}>{role.dates}</p>
      </div>

      <h3 data-line className="mt-3 font-serif text-h3 leading-tight">
        {role.title}
      </h3>
      <p data-line className={`mt-2 font-mono text-small ${tone.org}`}>
        {role.org}
      </p>

      {role.proof ? (
        <p data-line className="mt-4 font-serif text-h2 leading-none">
          {role.proof}
        </p>
      ) : null}

      {role.id === "amc" ? (
        <svg
          data-line
          aria-hidden="true"
          className={`mt-3 h-3 w-28 ${tone.org}`}
          viewBox="0 0 120 12"
          fill="none"
        >
          <path
            d="M0 6 H28 L34 6 L38 2 L42 10 L46 6 H120"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ) : null}

      {role.summary ? (
        <p
          data-line
          className={`mt-4 max-w-reading text-small leading-relaxed ${tone.muted}`}
        >
          {role.summary}
        </p>
      ) : null}

      {hasMore && expanded ? (
        <ul
          data-line
          className={`mt-3 max-w-reading list-disc space-y-1.5 pl-5 text-small ${tone.muted}`}
        >
          {role.bullets!.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}

      {hasMore ? (
        <button
          data-line
          type="button"
          onClick={onToggle}
          className={`mt-4 font-mono text-[0.7rem] tracking-[0.14em] underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
            tone.maroon
              ? "text-hero-fg focus-visible:outline-hero-fg"
              : "text-accent focus-visible:outline-accent"
          }`}
        >
          {expanded ? "Show less" : "Show details"}
        </button>
      ) : null}
    </article>
  );
}

/**
 * Production Experience — sticky left index + maroon spine + alternating cards.
 * Scroll reveals each role (no blur filters). Rail tracks the reading line.
 */
export function ExperienceSpineStack() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    const first = EXPERIENCE_JOURNEY[0];
    if (first) init[first.id] = true;
    return init;
  });
  const played = useRef<Set<string>>(new Set());
  const activeRef = useRef(0);

  const markRevealed = useCallback((id: string) => {
    setRevealed((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const playReveal = useCallback(
    (el: HTMLElement, id: string) => {
      if (played.current.has(id)) return;
      played.current.add(id);
      revealCard(el, () => markRevealed(id));
    },
    [markRevealed],
  );

  const scrollToCard = useCallback(
    (index: number) => {
      const role = EXPERIENCE_JOURNEY[index];
      const el = role ? document.getElementById(`exp-stack-${role.id}`) : null;
      if (!el || !role) return;

      if (!prefersReducedMotion()) {
        registerGsap();
        for (let i = 0; i <= index; i++) {
          const r = EXPERIENCE_JOURNEY[i];
          const node = r ? document.getElementById(`exp-stack-${r.id}`) : null;
          if (!node || !r) continue;
          if (!played.current.has(r.id)) {
            playReveal(node, r.id);
          } else {
            gsap.to(node, {
              opacity: 1,
              y: 0,
              duration: 0.25,
              ease: "power2.out",
              clearProps: "filter",
            });
            markRevealed(r.id);
          }
        }
      } else {
        setRevealed((prev) => {
          const next = { ...prev };
          for (let i = 0; i <= index; i++) {
            const id = EXPERIENCE_JOURNEY[i]?.id;
            if (id) next[id] = true;
          }
          return next;
        });
      }

      el.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "center",
      });
    },
    [markRevealed, playReveal],
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const fill = root.querySelector<HTMLElement>("[data-spine-fill]");
    const track = root.querySelector<HTMLElement>("[data-track]");
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-role-card]"));
    const intro = root.querySelectorAll<HTMLElement>("[data-intro-line]");
    const reduce = prefersReducedMotion();
    const cleanups: Array<() => void> = [];

    if (reduce) {
      const all: Record<string, boolean> = {};
      EXPERIENCE_JOURNEY.forEach((r) => {
        all[r.id] = true;
        played.current.add(r.id);
      });
      setRevealed(all);
      if (fill) {
        fill.style.transform = "scaleY(1)";
        fill.style.transformOrigin = "top center";
      }
    } else {
      registerGsap();

      if (intro.length) {
        gsap.fromTo(
          intro,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.07,
            ease: "power2.out",
          },
        );
      }

      if (fill && track) {
        const onScroll = () => {
          const rect = track.getBoundingClientRect();
          const total = rect.height || 1;
          const seen = Math.min(
            total,
            Math.max(0, window.innerHeight * 0.62 - rect.top),
          );
          const progress = Math.min(1, Math.max(0.04, seen / total));
          fill.style.transformOrigin = "top center";
          fill.style.transform = `scaleY(${progress})`;
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        cleanups.push(() => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        });
      }

      cards.forEach((c, i) => {
        if (i === 0) {
          gsap.set(c, { opacity: 1, y: 0, clearProps: "filter" });
          const lines = c.querySelectorAll<HTMLElement>("[data-line]");
          if (lines.length) {
            gsap.fromTo(
              lines,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.06,
                ease: "power3.out",
                delay: 0.1,
                clearProps: "filter",
              },
            );
          }
          const id = c.id.replace("exp-stack-", "");
          played.current.add(id);
          markRevealed(id);
        } else {
          // Soft wait — fully sharp type, just slightly quiet until reveal.
          gsap.set(c, { opacity: 0.72, y: 20, clearProps: "filter" });
          gsap.set(c.querySelectorAll("[data-line]"), { opacity: 1, y: 0 });
        }
      });

      const revealIo = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            const id = el.id.replace("exp-stack-", "");
            playReveal(el, id);
            revealIo.unobserve(el);
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
      );

      cards.forEach((c, i) => {
        if (i === 0) return;
        revealIo.observe(c);
      });
      cleanups.push(() => revealIo.disconnect());
    }

    // Active chapter = nearest card to reading line (never cascade to last).
    const syncActive = () => {
      if (!cards.length) return;
      const focusY = window.innerHeight * 0.4;
      let next = 0;
      let best = Number.POSITIVE_INFINITY;
      for (let i = 0; i < cards.length; i++) {
        const r = cards[i]!.getBoundingClientRect();
        const mid = r.top + r.height * 0.3;
        const dist = Math.abs(mid - focusY);
        if (dist < best) {
          best = dist;
          next = i;
        }
      }
      if (activeRef.current !== next) {
        activeRef.current = next;
        setActive(next);
      }
    };

    syncActive();
    const onActiveScroll = () => syncActive();
    window.addEventListener("scroll", onActiveScroll, { passive: true });
    window.addEventListener("resize", onActiveScroll);
    cleanups.push(() => {
      window.removeEventListener("scroll", onActiveScroll);
      window.removeEventListener("resize", onActiveScroll);
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [markRevealed, playReveal]);

  return (
    <section
      ref={rootRef}
      id="work"
      className="relative z-10 scroll-mt-24 bg-background px-6 pb-20 pt-20 text-foreground md:pb-24 md:pt-24"
    >
      <div className="mx-auto max-w-wide">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-10 lg:gap-14">
          <aside className="relative hidden w-36 shrink-0 self-stretch md:block lg:w-40">
            <div
              className="sticky"
              style={{ top: "max(6.5rem, calc(50vh - 9rem))" }}
            >
              <p className="mb-3 font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(EXPERIENCE_JOURNEY.length).padStart(2, "0")}
              </p>
              <nav aria-label="Experience roles" className="flex flex-col">
                {EXPERIENCE_JOURNEY.map((role, i) => {
                  const isActive = i === active;
                  const done = i < active;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => scrollToCard(i)}
                      aria-current={isActive ? "step" : undefined}
                      title={role.title}
                      className={`group flex w-full items-center gap-2.5 border-l py-2 pl-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        isActive
                          ? "border-accent text-foreground"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 shrink-0 rounded-full border-2 transition-colors duration-300 ${
                          isActive
                            ? "scale-110 border-accent bg-accent"
                            : done
                              ? "border-accent bg-accent/45"
                              : "border-accent/30 bg-background"
                        }`}
                      />
                      <span className="min-w-0">
                        <span
                          className={`block font-mono text-[0.65rem] tracking-[0.14em] ${
                            isActive ? "text-accent" : ""
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`mt-0.5 block truncate font-serif text-[0.8rem] transition-opacity ${
                            isActive
                              ? "opacity-100"
                              : "opacity-70 group-hover:opacity-100"
                          }`}
                        >
                          {role.org}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 max-w-2xl flex-1">
            <div className="max-w-2xl">
              <p
                data-intro-line
                className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]"
              >
                EXPERIENCE
              </p>
              <h2
                data-intro-line
                className="font-serif text-hero leading-tight text-balance"
              >
                Where the work got real.
              </h2>
              <p
                data-intro-line
                className="mt-4 max-w-reading text-small text-muted-foreground"
              >
                Scroll the path — each role steps in. Index jumps a chapter.
              </p>
            </div>

            <div data-track className="relative mt-10 pl-5 md:mt-12">
              <div
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-0 w-px bg-accent/20"
              />
              <div
                data-spine-fill
                aria-hidden="true"
                className="absolute top-2 left-0 w-px origin-top scale-y-0 bg-accent"
                style={{ height: "calc(100% - 1rem)" }}
              />

              <div className="flex flex-col gap-8 md:gap-10">
                {EXPERIENCE_JOURNEY.map((role, i) => (
                  <RoleCard
                    key={role.id}
                    role={role}
                    index={i}
                    active={i === active}
                    revealed={Boolean(revealed[role.id])}
                    expanded={expandedId === role.id}
                    onToggle={() =>
                      setExpandedId((cur) => (cur === role.id ? null : role.id))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
