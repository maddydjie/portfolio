"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Wordmark } from "@/components/signature/wordmark";
import { AFFILIATIONS, POSITIONING } from "@/content/landing";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { playOncePerSession, wireSkip } from "@/lib/timeline";

// WebGL knot: client + browser-only, never server-rendered.
const ChromeKnot = dynamic(
  () => import("@/components/visual/chrome-knot").then((m) => m.ChromeKnot),
  { ssr: false },
);

const WORDS = POSITIONING.split(" ");

export function HeroCinematic() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    registerGsap();

    const chars = el.querySelectorAll<HTMLElement>("[data-ch]");
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const fades = el.querySelectorAll<HTMLElement>("[data-fade]");

    if (prefersReducedMotion() || !playOncePerSession("hero-cinematic")) {
      gsap.set([chars, words, fades], { opacity: 1, y: 0 });
      return;
    }

    let cleanupSkip = () => {};
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(chars, { opacity: 0, yPercent: 40, stagger: 0.045, duration: 0.5 })
        .from(words, { opacity: 0, y: 12, stagger: 0.06, duration: 0.4 }, "-=0.1")
        .from(fades, { opacity: 0, y: 10, stagger: 0.12, duration: 0.5 }, "-=0.15");
      cleanupSkip = wireSkip(tl);
    }, el);

    return () => {
      cleanupSkip();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden bg-hero-bg px-6 text-hero-fg"
    >
      {/* 3D chrome signature, floating right (desktop) */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block"
        aria-hidden="true"
      >
        <ChromeKnot />
      </div>
      <div className="relative mx-auto w-full max-w-wide">
        <h1 className="text-hero-xl leading-[0.92]">
          <Wordmark className="text-hero-xl" />
        </h1>
        <p className="mt-8 max-w-reading text-hero-fg text-body">
          {WORDS.map((word, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed static string
              key={i}
              data-word
              className="inline-block whitespace-pre"
            >
              {word}
              {i < WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <div data-fade className="mt-8 flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-hero-muted/30">
            <Image
              src="/hero-portrait-placeholder.svg"
              alt="Portrait of BVS Madhavi"
              fill
              sizes="64px"
              className="object-cover [filter:grayscale(1)_contrast(1.1)]"
            />
          </div>
          <p className="font-mono text-hero-muted text-small">{AFFILIATIONS.join("  ·  ")}</p>
        </div>
        <p data-fade className="mt-14 font-mono text-hero-muted text-small tracking-widest">
          scroll ↓
        </p>
      </div>

      {/* editorial corner meta-labels */}
      <span className="absolute bottom-6 left-6 font-mono text-hero-muted text-small">©2026</span>
      <span className="absolute right-6 bottom-6 font-mono text-hero-muted text-small tracking-wide">
        MBBS · IIT MADRAS
      </span>
    </section>
  );
}
