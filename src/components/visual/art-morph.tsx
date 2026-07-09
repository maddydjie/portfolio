"use client";

import { useEffect, useRef } from "react";
import { type CanvasDraw, mountCanvas } from "./canvas-base";

// V-A — a clinical ECG trace (left) flowing rightward and dissolving into a
// technical data scatter (right). Clinical → computational, made literal.
const N = 150;

/** One ECG beat, t in 0..1 → amplitude roughly -0.4..1. */
function ecg(t: number): number {
  if (t < 0.12) return Math.sin((t / 0.12) * Math.PI) * 0.12; // P wave
  if (t < 0.3) return 0;
  if (t < 0.34) return -0.12; // Q
  if (t < 0.38) return 1.0; // R spike
  if (t < 0.42) return -0.4; // S
  if (t < 0.56) return 0;
  if (t < 0.7) return Math.sin(((t - 0.56) / 0.14) * Math.PI) * 0.22; // T wave
  return 0;
}

export function ArtMorph() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const pts = Array.from({ length: N }, () => ({
      base: 0.12 + Math.random() * 0.76,
      jitter: (Math.random() - 0.5) * 0.16,
      ph: Math.random() * Math.PI * 2,
    }));

    const draw: CanvasDraw = (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      const mid = h / 2;
      const split = w * 0.5;
      const beats = 4;

      // ECG trace (clinical, maroon), scrolling
      ctx.strokeStyle = "rgba(217,122,108,0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let px = 0; px <= split; px += 2) {
        const u = (px / split) * beats + t * 0.35;
        const y = mid - ecg(u % 1) * h * 0.3;
        if (px === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();

      // trend line through the scatter
      ctx.strokeStyle = "rgba(241,238,230,0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(split, mid + h * 0.14);
      ctx.lineTo(w, mid - h * 0.14);
      ctx.stroke();

      // data scatter (technical, cream), drifting
      ctx.fillStyle = "rgba(241,238,230,0.82)";
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const x = split + (i / N) * (w - split);
        const drift = Math.sin(t * 0.6 + p.ph) * 5;
        const y = mid - (p.base - 0.5) * h * 0.72 + p.jitter * h + drift;
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // seam
      ctx.strokeStyle = "rgba(217,122,108,0.28)";
      ctx.setLineDash([4, 7]);
      ctx.beginPath();
      ctx.moveTo(split, h * 0.14);
      ctx.lineTo(split, h * 0.86);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    return mountCanvas(c, draw);
  }, []);

  return <canvas ref={ref} className="pointer-events-none h-full w-full" />;
}
