"use client";

import { prefersReducedMotion } from "@/lib/motion";

export type CanvasDraw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

/**
 * Mount a 2D-canvas animation. Caps DPR at 2, tracks size via ResizeObserver,
 * pauses the rAF loop when the canvas is offscreen (IntersectionObserver), and
 * paints exactly one static frame under prefers-reduced-motion (or staticOnly).
 * Returns a cleanup function that stops the loop and disconnects observers.
 */
export function mountCanvas(
  canvas: HTMLCanvasElement,
  draw: CanvasDraw,
  opts: { staticOnly?: boolean } = {},
): () => void {
  const maybeCtx = canvas.getContext("2d");
  if (!maybeCtx) return () => {};
  const ctx = maybeCtx;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let raf = 0;
  let running = false;
  const start = performance.now();

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!running) draw(ctx, w, h, 0);
  }

  function frame() {
    draw(ctx, w, h, (performance.now() - start) / 1000);
    raf = requestAnimationFrame(frame);
  }
  function play() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const staticFrame = opts.staticOnly || prefersReducedMotion();
  let io: IntersectionObserver | null = null;
  if (staticFrame) {
    draw(ctx, w, h, 0);
  } else {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) play();
          else stop();
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);
  }

  return () => {
    stop();
    ro.disconnect();
    io?.disconnect();
  };
}
