"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Spinning bracket reticle — snaps to `.cursor-target` / scoped selectors and
// keeps the frame locked to the target's live rect while hovering.
const PAD = 4;

export function TargetCursor({ targetSelector = ".cursor-target" }: { targetSelector?: string }) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    registerGsap();

    const corners = Array.from(cursor.querySelectorAll<HTMLElement>("[data-corner]"));
    const prevBodyCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    const D = 14;
    const rest = [
      [-D, -D],
      [D - 6, -D],
      [D - 6, D - 6],
      [-D, D - 6],
    ];

    const place = (offs: number[][], duration = 0.22) => {
      corners.forEach((c, i) => {
        const pair = offs[i];
        if (!pair) return;
        gsap.to(c, { x: pair[0], y: pair[1], duration, ease: "power3" });
      });
    };
    place(rest, 0);

    const moveX = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3" });
    const spin = gsap.to(cursor, { rotation: 360, duration: 6, ease: "none", repeat: -1 });

    let active: Element | null = null;

    const frameTarget = (t: Element, cx: number, cy: number, duration: number) => {
      const r = t.getBoundingClientRect();
      place(
        [
          [r.left - PAD - cx, r.top - PAD - cy],
          [r.right + PAD - cx, r.top - PAD - cy],
          [r.right + PAD - cx, r.bottom + PAD - cy],
          [r.left - PAD - cx, r.bottom + PAD - cy],
        ],
        duration,
      );
    };

    const onMove = (e: PointerEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      moveX(cx);
      moveY(cy);

      const t = (e.target as Element | null)?.closest?.(targetSelector) ?? null;

      if (t) {
        if (t !== active) {
          active = t;
          spin.pause();
          gsap.to(cursor, { rotation: 0, duration: 0.25, ease: "power3" });
          frameTarget(t, cx, cy, 0.28);
        } else {
          // Keep brackets glued to this box's live shape while moving inside it.
          frameTarget(t, cx, cy, 0.08);
        }
      } else if (active) {
        active = null;
        place(rest, 0.22);
        gsap.to(cursor, {
          rotation: 0,
          duration: 0.2,
          onComplete: () => {
            spin.restart().play();
          },
        });
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.body.style.cursor = prevBodyCursor;
      spin.kill();
    };
  }, [targetSelector]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] h-0 w-0 will-change-transform"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-1 w-1 rounded-full bg-accent" />
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          data-corner
          className="absolute block h-2.5 w-2.5"
          style={{
            borderColor: "var(--color-accent)",
            borderStyle: "solid",
            borderWidth:
              i === 0
                ? "2px 0 0 2px"
                : i === 1
                  ? "2px 2px 0 0"
                  : i === 2
                    ? "0 2px 2px 0"
                    : "0 0 2px 2px",
          }}
        />
      ))}
    </div>
  );
}
