"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";

// Progressive edge blur — a stack of backdrop-filter layers, each masked to a
// moving band so the blur ramps smoothly from sharp to soft toward one edge
// (not a single hard blur line). Adapted from React Bits' GradualBlur; no deps.
// Content behind stays legible; the edge dissolves into the background.
type Position = "top" | "bottom" | "left" | "right";

const DIRECTION: Record<Position, string> = {
  top: "to top",
  bottom: "to bottom",
  left: "to left",
  right: "to right",
};

export function GradualBlur({
  position = "bottom",
  height = "7rem",
  strength = 2,
  divCount = 6,
  exponential = true,
  className = "",
  style,
}: {
  position?: Position;
  height?: string;
  strength?: number;
  divCount?: number;
  exponential?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const layers = useMemo(() => {
    const increment = 100 / divCount;
    const out: CSSProperties[] = [];
    for (let i = 1; i <= divCount; i++) {
      const progress = i / divCount;
      const blur = exponential
        ? 2 ** (progress * 4) * 0.0625 * strength
        : 0.0625 * (progress * divCount + 1) * strength;

      const p1 = (increment * i - increment).toFixed(1);
      const p2 = (increment * i).toFixed(1);
      const p3 = increment * i + increment;
      const p4 = increment * i + increment * 2;
      let grad = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) grad += `, black ${p3.toFixed(1)}%`;
      if (p4 <= 100) grad += `, transparent ${p4.toFixed(1)}%`;
      const mask = `linear-gradient(${DIRECTION[position]}, ${grad})`;

      out.push({
        position: "absolute",
        inset: 0,
        maskImage: mask,
        WebkitMaskImage: mask,
        backdropFilter: `blur(${blur.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blur.toFixed(3)}rem)`,
      });
    }
    return out;
  }, [position, strength, divCount, exponential]);

  const vertical = position === "top" || position === "bottom";
  const containerStyle: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    zIndex: 40,
    [position]: 0,
    ...(vertical
      ? { left: 0, right: 0, height }
      : { top: 0, bottom: 0, width: height }),
    ...style,
  };

  return (
    <div aria-hidden="true" className={className} style={containerStyle}>
      {layers.map((s, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed layer count
        <div key={i} style={s} />
      ))}
    </div>
  );
}
