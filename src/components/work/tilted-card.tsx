"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Pointer-tilt card with a tracked maroon glare. React Bits' TiltedCard ships on
// framer-motion; this is a GSAP reimplementation (quickTo), brand-skinned.
// Reduced-motion / touch: static, no tilt.
export function TiltedCard({
  children,
  className = "",
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!wrap || !card || !glare) return;
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    registerGsap();

    const rotX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
    const rotY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
    const gx = gsap.quickTo(glare, "xPercent", { duration: 0.5, ease: "power3" });
    const gy = gsap.quickTo(glare, "yPercent", { duration: 0.5, ease: "power3" });
    const go = gsap.quickTo(glare, "opacity", { duration: 0.4, ease: "power2" });

    const move = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      rotY((px - 0.5) * 2 * max);
      rotX((0.5 - py) * 2 * max);
      gx((px - 0.5) * 60);
      gy((py - 0.5) * 60);
      go(0.22);
    };
    const leave = () => {
      rotX(0);
      rotY(0);
      go(0);
    };
    wrap.addEventListener("pointermove", move);
    wrap.addEventListener("pointerleave", leave);
    return () => {
      wrap.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return (
    <div
      ref={wrapRef}
      style={{ perspective: "900px" }}
      className={`h-full ${className}`.trim()}
    >
      <div
        ref={cardRef}
        className="relative h-full overflow-hidden rounded-[inherit] [transform-style:preserve-3d] will-change-transform"
      >
        {children}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-40%] rounded-[inherit] opacity-0"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 60%, white), transparent 45%)",
          }}
        />
      </div>
    </div>
  );
}
