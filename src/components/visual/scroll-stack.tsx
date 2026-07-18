"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function ScrollStackItem({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      data-scroll-stack-card
      className={`relative w-full origin-top ${className}`.trim()}
    >
      {children}
    </div>
  );
}

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  /** Viewport position where cards pin, e.g. "18%". */
  stackPosition?: string;
  baseScale?: number;
  endPadding?: string;
  remeasureKey?: string | number;
  onActiveChange?: (index: number) => void;
};

/**
 * Window-scroll card stack via GSAP ScrollTrigger pin (stable, Lenis-free).
 */
export function ScrollStack({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.04,
  stackPosition = "18%",
  baseScale = 0.9,
  endPadding = "45vh",
  remeasureKey,
  onActiveChange,
}: ScrollStackProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const onActiveChangeRef = useRef(onActiveChange);
  onActiveChangeRef.current = onActiveChange;
  const activeRef = useRef(-1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-scroll-stack-card]"),
    );
    if (!cards.length) return;

    cards.forEach((card, i) => {
      card.style.marginBottom = i < cards.length - 1 ? `${itemDistance}px` : "0px";
      card.style.zIndex = String(i + 1);
      card.style.transformOrigin = "top center";
    });

    if (prefersReducedMotion()) {
      onActiveChangeRef.current?.(0);
      return;
    }

    registerGsap();
    const endEl = root.querySelector<HTMLElement>("[data-scroll-stack-end]");
    const setActive = (index: number) => {
      if (index === activeRef.current) return;
      activeRef.current = index;
      onActiveChangeRef.current?.(index);
    };

    const stackPct = Number.parseFloat(stackPosition) || 18;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const targetScale = Math.min(0.98, baseScale + i * itemScale);
        // Stagger pin points so each card peeks below the one above.
        const start = `top ${stackPct + i * 1.8}%`;

        ScrollTrigger.create({
          trigger: card,
          start,
          endTrigger: endEl ?? undefined,
          end: "top 40%",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.isActive) setActive(i);
            const scale = gsap.utils.interpolate(1, targetScale, self.progress);
            gsap.set(card, { scale, force3D: true });
          },
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });

      setActive(0);
      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
      activeRef.current = -1;
      cards.forEach((card) => {
        gsap.set(card, { clearProps: "transform" });
      });
    };
  }, [baseScale, itemDistance, itemScale, remeasureKey, stackPosition]);

  return (
    <div ref={rootRef} className={`relative w-full ${className}`.trim()}>
      <div
        data-scroll-stack-inner
        className="pt-2"
        style={{ paddingBottom: endPadding }}
      >
        {children}
        <div data-scroll-stack-end className="h-px w-full" aria-hidden="true" />
      </div>
    </div>
  );
}
