"use client";

import { useEffect, useRef } from "react";
import { Wordmark } from "@/components/signature/wordmark";
import { PortraitReveal } from "@/components/visual/portrait-reveal";
import { AFFILIATIONS } from "@/content/landing";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { playOncePerSession, wireSkip } from "@/lib/timeline";

const TAGLINE = "Exploring the future of intelligence, health, and human potential.";

export function HeroV2() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    registerGsap();

    const chars = el.querySelectorAll<HTMLElement>("[data-ch]");
    const lines = el.querySelectorAll<HTMLElement>("[data-line]");
    const fades = el.querySelectorAll<HTMLElement>("[data-fade]");
    const left = el.querySelector<HTMLElement>("[data-hero-left]");
    const strips = el.querySelectorAll<HTMLElement>("[data-strip]");
    const scan = el.querySelector<HTMLElement>("[data-scan]");
    const photo = el.querySelector<HTMLElement>("[data-photo]");

    const reduce = prefersReducedMotion();

    // portrait resting state
    if (reduce) {
      gsap.set(strips, { scaleY: 0 });
      gsap.set(photo, { opacity: 1 });
      if (scan) gsap.set(scan, { opacity: 0 });
    }

    // intro reveal (text) — once per session, skippable
    let cleanupSkip = () => {};
    let ictx: gsap.Context | null = null;
    if (!reduce && playOncePerSession("hero-intro")) {
      ictx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(chars, { opacity: 0, yPercent: 55, stagger: 0.04, duration: 0.5 })
          .from(lines, { yPercent: 105, stagger: 0.1, duration: 0.6 }, "-=0.1")
          .from(fades, { opacity: 0, y: 14, stagger: 0.08, duration: 0.5 }, "-=0.15");
        cleanupSkip = wireSkip(tl);
      }, el);
    } else if (!reduce) {
      gsap.set([chars, lines, fades], { opacity: 1, y: 0, yPercent: 0 });
    }

    // scroll-driven scan reveal + parallax (pinned)
    let sctx: gsap.Context | null = null;
    if (!reduce) {
      gsap.set(strips, { scaleY: 1 }); // cover the portrait until scrolled
      gsap.set(photo, { opacity: 0.18 });
      sctx = gsap.context(() => {
        const stl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "+=90%", scrub: 0.6, pin: true },
        });
        stl
          .to(strips, { scaleY: 0, transformOrigin: "top", stagger: 0.05, ease: "none" }, 0)
          .fromTo(scan, { top: "0%", opacity: 1 }, { top: "100%", opacity: 0, ease: "none" }, 0)
          .to(photo, { opacity: 1, ease: "none" }, 0)
          .to(left, { yPercent: -14, opacity: 0.25, ease: "none" }, 0);
      }, el);
    }

    return () => {
      cleanupSkip();
      ictx?.revert();
      sctx?.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden bg-hero-bg px-6 text-hero-fg"
    >
      <div className="mx-auto grid w-full max-w-wide grid-cols-1 items-center gap-10 py-16 md:grid-cols-[1.25fr_1fr] md:gap-16">
        {/* left — name, subhead, tagline, credentials */}
        <div data-hero-left>
          <h1 className="text-[clamp(3.5rem,8vw,8rem)] leading-[0.9]">
            <Wordmark className="text-[clamp(3.5rem,8vw,8rem)]" />
          </h1>
          <p className="mt-6 max-w-[18ch] font-serif text-[clamp(1.5rem,2.7vw,2.5rem)] text-hero-fg/90 italic leading-[1.1]">
            <span data-line className="block overflow-hidden pb-1">
              I don&apos;t fit in boxes.
            </span>
            <span data-line className="block overflow-hidden pb-1">
              I build bridges between them.
            </span>
          </p>
          <p data-fade className="mt-8 max-w-reading text-body text-hero-fg/75">
            {TAGLINE}
          </p>
          <p data-fade className="mt-5 font-mono text-hero-muted text-small">
            MBBS-trained clinician &amp; IIT Madras data scientist
          </p>
          <p data-fade className="mt-2 font-mono text-hero-muted text-small">
            {AFFILIATIONS.join("  ·  ")}
          </p>
        </div>

        {/* right — scroll-revealed portrait (the signature moment) */}
        <div className="mx-auto w-full max-w-sm md:mx-0">
          <PortraitReveal />
        </div>
      </div>

      <span className="absolute bottom-6 left-6 font-mono text-hero-muted text-small">©2026</span>
      <span className="absolute right-6 bottom-6 font-mono text-hero-muted text-small tracking-widest">
        scroll ↓
      </span>
    </section>
  );
}
