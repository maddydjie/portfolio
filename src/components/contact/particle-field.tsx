"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Particle text (mats.zip style). Each word is sampled into a cloud of dots
 * whose "home" positions trace the letterforms. At rest the cloud spells the
 * word with a faint shimmer. The cursor shoves nearby dots outward - the word
 * shatters into a scatter field - and once the cursor leaves they spring back
 * home and reassemble. Hover (or Enter/Space) cycles to the next word.
 */

type Particle = {
  hx: number; // home position (letterform)
  hy: number;
  x: number; // rendered position
  y: number;
  vx: number;
  vy: number;
  phase: number; // idle shimmer offset
  accent: boolean;
  a: number; // current alpha
  ta: number; // target alpha
  active: boolean; // has a home in the current word
};

const FAMILY = `"Arial Black", Impact, "Helvetica Neue", Arial, sans-serif`;

/** Sample the bold, tracked word into home positions on a `step`-px lattice. */
function sampleGlyph(w: number, h: number, text: string, step: number): Array<[number, number]> {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  ctx.clearRect(0, 0, w, h);

  const chars = [...text];
  // Phone bands are wide-and-short — bias size to width so glyphs stay legible.
  const narrow = w < 520;
  let size = narrow ? Math.min(h * 0.72, w / Math.max(chars.length * 0.62, 3)) : h * 0.58;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Tighter corridors on long words so they can still fill the height.
  const gapFor = (s: number) =>
    Math.max(step * (narrow ? 1.2 : 1.8), s * (chars.length > 5 ? (narrow ? 0.08 : 0.12) : 0.2));
  const measure = (s: number) => {
    ctx.font = `900 ${s}px ${FAMILY}`;
    let total = 0;
    for (const ch of chars) total += ctx.measureText(ch).width;
    total += gapFor(s) * Math.max(0, chars.length - 1);
    return total;
  };

  let total = measure(size);
  const maxW = w * (narrow ? 0.92 : 0.96);
  if (total > maxW && total > 1) {
    size *= maxW / total;
    total = measure(size);
  }

  ctx.font = `900 ${size}px ${FAMILY}`;
  ctx.fillStyle = "#fff";

  let x = (w - total) / 2;
  const y = h / 2;
  const gap = gapFor(size);
  for (const ch of chars) {
    const cw = ctx.measureText(ch).width;
    ctx.fillText(ch, x + cw / 2, y);
    x += cw + gap;
  }

  const data = ctx.getImageData(0, 0, w, h).data;
  const homes: Array<[number, number]> = [];
  const jitter = step * 0.35;
  for (let py = 0; py < h; py += step) {
    for (let px = 0; px < w; px += step) {
      if ((data[(py * w + px) * 4 + 3] ?? 0) > 128) {
        homes.push([px + (Math.random() - 0.5) * jitter, py + (Math.random() - 0.5) * jitter]);
      }
    }
  }
  return homes;
}

export function ParticleField({
  words = ["BRIDGE", "PULSE", "SHIP"],
  className = "",
}: {
  words?: readonly string[];
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !words.length) return;

    const reduce = prefersReducedMotion();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let boot = 0;
    let w = 0;
    let h = 0;
    let step = 8;
    let particles: Particle[] = [];
    let wordIndex = 0;
    let mx = -9999;
    let my = -9999;
    let running = true;
    let lastCycle = 0;
    let hoverTimer = 0;
    const CYCLE_COOLDOWN = 1600;
    const HOVER_INTERVAL = 2400;

    const ink = "#14120e";
    const paper = "#f4f1e9";
    const accent = "#c45c4e";

    // Cursor repulsion.
    const repelR = 140;
    const repelForce = 6.2;
    // Spring back to home.
    const spring = 0.045;
    const damping = 0.86;

    const setLabel = (text: string) => {
      if (labelRef.current) labelRef.current.textContent = text;
    };

    const applyWord = (text: string, instant: boolean) => {
      const homes = sampleGlyph(w, h, text, step);
      const count = Math.max(homes.length, particles.length);
      let accentN = 0;
      for (let i = 0; i < count; i++) {
        let p = particles[i];
        if (!p) {
          // Spawn scattered so it flies in to assemble.
          p = {
            hx: 0,
            hy: 0,
            x: Math.random() * w,
            y: Math.random() * h,
            vx: 0,
            vy: 0,
            phase: Math.random() * Math.PI * 2,
            accent: false,
            a: 0,
            ta: 0,
            active: false,
          };
          particles[i] = p;
        }
        const home = homes[i];
        if (home) {
          p.hx = home[0];
          p.hy = home[1];
          p.active = true;
          p.ta = 1;
          p.accent = accentN++ % 11 === 0;
          if (instant) {
            p.x = p.hx;
            p.y = p.hy;
            p.a = 1;
          }
        } else {
          // No home in this word — drift out and fade.
          p.active = false;
          p.ta = 0;
          p.hx = p.x + (Math.random() - 0.5) * 60;
          p.hy = p.y + (Math.random() - 0.5) * 60;
        }
      }
      setLabel(text);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Denser lattice on large canvases; slightly coarser on phones so letters read.
      step = w < 520 ? Math.max(6, Math.round(Math.min(w, h) / 36)) : Math.max(5, Math.round(Math.min(w, h) / 48));
      const first = words[wordIndex] ?? words[0];
      if (first) applyWord(first, true);
    };

    const advanceWord = () => {
      if (words.length < 2) return;
      const now = performance.now();
      if (now - lastCycle < CYCLE_COOLDOWN) return;
      lastCycle = now;
      wordIndex = (wordIndex + 1) % words.length;
      const next = words[wordIndex];
      if (next) applyWord(next, false);
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };

    const onEnter = () => {
      advanceWord();
      window.clearInterval(hoverTimer);
      hoverTimer = window.setInterval(advanceWord, HOVER_INTERVAL);
    };

    const onLeave = () => {
      mx = -9999;
      my = -9999;
      window.clearInterval(hoverTimer);
      hoverTimer = 0;
    };

    const onPointerUp = (e: PointerEvent) => {
      // Touch has no hover — tap cycles the word.
      if (e.pointerType === "touch" || e.pointerType === "pen") {
        advanceWord();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        advanceWord();
      }
    };

    const dotR = () => Math.max(1.25, step * 0.18);

    const render = (t: number) => {
      ctx.fillStyle = ink;
      ctx.fillRect(0, 0, w, h);

      const hasCursor = mx > -1000;
      const r = dotR();

      for (const p of particles) {
        p.a += (p.ta - p.a) * 0.08;
        if (p.a < 0.01 && !p.active) continue;

        // Idle shimmer around the home target.
        const shimmer = p.active ? 0.9 : 0;
        const tx = p.hx + Math.sin(t * 1.3 + p.phase) * shimmer;
        const ty = p.hy + Math.cos(t * 1.1 + p.phase) * shimmer;

        // Spring toward home.
        p.vx += (tx - p.x) * spring;
        p.vy += (ty - p.y) * spring;

        // Cursor repulsion.
        if (hasCursor) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < repelR && dist > 0.01) {
            const f = (1 - dist / repelR) * repelForce;
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
          }
        }

        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.accent ? accent : paper;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const startT = performance.now();
    const tick = () => {
      if (!running) return;
      render((performance.now() - startT) / 1000);
      raf = requestAnimationFrame(tick);
    };

    boot = requestAnimationFrame(() => {
      resize();
      if (reduce) {
        for (const p of particles) {
          p.x = p.hx;
          p.y = p.hy;
          p.a = p.ta;
        }
        render(0);
      } else {
        // Start scattered, then let the spring assemble the word.
        for (const p of particles) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.a = 0;
        }
        raf = requestAnimationFrame(tick);
        wrap.addEventListener("pointerenter", onEnter);
        wrap.addEventListener("pointermove", onMove);
        wrap.addEventListener("pointerleave", onLeave);
        wrap.addEventListener("pointerup", onPointerUp);
        wrap.addEventListener("keydown", onKey);
        window.addEventListener("resize", resize);
      }
    });

    return () => {
      running = false;
      cancelAnimationFrame(boot);
      cancelAnimationFrame(raf);
      window.clearInterval(hoverTimer);
      particles = [];
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointerup", onPointerUp);
      wrap.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
    };
  }, [words]);

  return (
    // biome-ignore lint/a11y/useSemanticElements: interactive canvas surface has non-phrasing children, so a real <button> is invalid here.
    <div
      ref={wrapRef}
      role="button"
      tabIndex={0}
      aria-label="Word animation. Tap or hover to change word."
      className={`relative w-full cursor-crosshair overflow-hidden bg-hero-bg outline-none focus-visible:ring-2 focus-visible:ring-hero-accent focus-visible:ring-offset-2 focus-visible:ring-offset-hero-bg ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <span ref={labelRef} className="sr-only">
        {words[0]}
      </span>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] tracking-[0.14em] text-hero-muted md:bottom-4 md:text-[0.65rem] md:tracking-[0.16em]">
        <span className="md:hidden">Tap to change word</span>
        <span className="hidden md:inline">Hover to change word</span>
      </p>
    </div>
  );
}
