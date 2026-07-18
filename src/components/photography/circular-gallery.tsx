"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// A curved 3D image carousel — CSS-3D adaptation of React Bits' CircularGallery
// (theirs is WebGL/OGL; this needs no extra dependency). Drag or scroll to spin
// the ring; releases carry inertia and settle on the nearest frame. Reduced
// motion falls back to a plain horizontal scroller.
export type GalleryItem = { src: string; caption: string; filter?: string };

export function CircularGallery({
  items,
  radius = 460,
}: {
  items: GalleryItem[];
  radius?: number;
}) {
  const ringRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef(0);
  const dragRef = useRef<{ active: boolean; lastX: number }>({ active: false, lastX: 0 });
  const [reduce, setReduce] = useState(false);
  const [rad, setRad] = useState(radius);

  const step = 360 / items.length;

  // keep the ring depth within the viewport on small screens
  useEffect(() => {
    const fit = () => setRad(Math.min(radius, window.innerWidth * 0.6));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [radius]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduce(true);
      return;
    }
    const ring = ringRef.current;
    if (!ring) return;

    const render = () => {
      ring.style.transform = `translateZ(-${rad}px) rotateY(${angleRef.current}deg)`;
    };
    render();

    const spin = () => {
      if (!dragRef.current.active) {
        angleRef.current += velRef.current;
        velRef.current *= 0.94; // inertia decay
        // settle toward nearest frame when nearly stopped
        if (Math.abs(velRef.current) < 0.02) {
          const nearest = Math.round(angleRef.current / step) * step;
          angleRef.current += (nearest - angleRef.current) * 0.12;
          if (Math.abs(nearest - angleRef.current) < 0.01) velRef.current = 0;
        }
      }
      render();
      rafRef.current = requestAnimationFrame(spin);
    };
    rafRef.current = requestAnimationFrame(spin);

    const onDown = (e: PointerEvent) => {
      dragRef.current = { active: true, lastX: e.clientX };
      velRef.current = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.lastX;
      dragRef.current.lastX = e.clientX;
      const d = dx * 0.25;
      angleRef.current += d;
      velRef.current = d;
    };
    const onUp = () => {
      dragRef.current.active = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      velRef.current += (e.deltaY || e.deltaX) * 0.01;
    };

    const host = ring.parentElement!;
    host.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    host.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(rafRef.current);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      host.removeEventListener("wheel", onWheel);
    };
  }, [items.length, rad, step]);

  if (reduce) {
    return (
      <div className="flex snap-x gap-4 overflow-x-auto px-6 py-8">
        {items.map((it) => (
          <figure key={it.caption} className="relative aspect-[3/4] w-64 shrink-0 snap-center">
            <Image src={it.src} alt={it.caption} fill sizes="256px" className="rounded-sm object-cover" />
            <figcaption className="mt-2 font-mono text-hero-muted text-small">{it.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative h-[62vh] w-full cursor-grab touch-none select-none active:cursor-grabbing"
      style={{ perspective: "1100px" }}
    >
      <div
        ref={ringRef}
        className="absolute inset-0 m-auto h-[46vh] w-[clamp(16rem,26vw,22rem)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {items.map((it, i) => (
          <figure
            key={it.caption}
            className="absolute inset-0 overflow-hidden rounded-sm border border-hero-muted/20 bg-hero-bg"
            style={{ transform: `rotateY(${i * step}deg) translateZ(${rad}px)` }}
          >
            <Image
              src={it.src}
              alt={it.caption}
              fill
              sizes="360px"
              className="object-cover object-top"
              style={{ filter: it.filter }}
              draggable={false}
            />
            <figcaption
              className="absolute inset-x-0 bottom-0 px-3 py-2 font-mono text-[0.72rem] text-hero-fg/90 tracking-wider"
              style={{ background: "linear-gradient(to top, rgba(20,18,14,.9), transparent)" }}
            >
              {it.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
