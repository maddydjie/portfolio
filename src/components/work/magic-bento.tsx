"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Bento cell with a pointer-tracked maroon spotlight, a border-glow, and
// particles that drift up on hover. Adapted from React Bits' MagicBento
// (GSAP-based); reskinned from neon-purple to the warm-paper + maroon brand.
// Reduced-motion / touch: static card, no particles.
const STYLE_ID = "mb-styles";
const CSS = `
.mb-cell{ position:relative; overflow:hidden; border-radius:1rem; border:1px solid var(--color-border);
  background:var(--color-surface); transition:transform .3s ease, box-shadow .3s ease, border-color .3s ease;
  --gx:50%; --gy:50%; --gi:0; }
.mb-cell:hover{ transform:translateY(-3px); box-shadow:0 14px 34px -18px rgba(139,46,42,.4);
  border-color:color-mix(in srgb, var(--color-accent) 45%, var(--color-border)); }
.mb-glow{ position:absolute; inset:0; pointer-events:none; border-radius:inherit;
  opacity:var(--gi); transition:opacity .3s ease;
  background:radial-gradient(240px circle at var(--gx) var(--gy),
    color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 60%); }
.mb-particle{ position:absolute; width:4px; height:4px; border-radius:999px;
  background:var(--color-accent); box-shadow:0 0 8px 1px color-mix(in srgb,var(--color-accent) 70%,transparent);
  pointer-events:none; }
`;

function inject() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function BentoGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>{children}</div>
  );
}

export function BentoCell({
  children,
  className = "",
  particles = 8,
}: {
  children: ReactNode;
  className?: string;
  particles?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    inject();
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    registerGsap();

    let nodes: HTMLElement[] = [];
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    const enter = () => {
      el.style.setProperty("--gi", "1");
      const r = el.getBoundingClientRect();
      for (let i = 0; i < particles; i++) {
        const p = document.createElement("div");
        p.className = "mb-particle";
        p.style.left = `${Math.random() * r.width}px`;
        p.style.top = `${Math.random() * r.height}px`;
        el.appendChild(p);
        nodes.push(p);
        gsap.fromTo(
          p,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: Math.random() * 0.3,
            onComplete: () => {
              gsap.to(p, {
                y: -18 - Math.random() * 20,
                x: (Math.random() - 0.5) * 20,
                opacity: 0,
                duration: 1.4 + Math.random(),
                ease: "power1.out",
                repeat: -1,
              });
            },
          },
        );
      }
    };
    const leave = () => {
      el.style.setProperty("--gi", "0");
      for (const p of nodes) gsap.to(p, { opacity: 0, duration: 0.3, onComplete: () => p.remove() });
      nodes = [];
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      for (const p of nodes) p.remove();
    };
  }, [particles]);

  return (
    <div ref={ref} className={`mb-cell h-full ${className}`}>
      <div className="mb-glow" aria-hidden="true" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
