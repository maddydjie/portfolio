"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DecryptedText } from "@/components/text/decrypted-text";
import { AFFILIATIONS } from "@/content/landing";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { ProfileCard } from "./profile-card";

const ROLES = ["Medicine", "Data Scientist", "Space Researcher", "Clinical AI", "Photographer"];

// RISE & DOCK — scroll-scored hero. On load "Dr Madhavi" sits centred; on scroll
// the wordmark docks left while ProfileCard slides in from the right and copy
// staggers up. One pinned stage. Reduced-motion: resting docked layout, static.
export function HeroCombined() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    registerGsap();

    const q = gsap.utils.selector(wrap);
    const stage = q("[data-stage]")[0];
    const word = q("[data-word]")[0];
    const card = q("[data-portrait]")[0];
    const copy = q("[data-copy]");
    const cta = q("[data-cta]")[0];
    const lede = q("[data-lede]")[0];
    const linePath = q("[data-line]")[0] as unknown as SVGPathElement | undefined;
    const hint = q("[data-hint]")[0];

    if (prefersReducedMotion()) {
      if (lede) gsap.set(lede, { opacity: 0 });
      if (hint) gsap.set(hint, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP / TABLET — pinned scroll score: centred name glides to the
      // left column, card docks right, copy + CTA rise.
      mm.add("(min-width: 768px)", () => {
        gsap.set(word, { x: 0, y: 0, scale: 1 });
        const b = word.getBoundingClientRect();
        const dx = window.innerWidth / 2 - (b.left + b.width / 2);
        const dy = window.innerHeight / 2 - (b.top + b.height / 2);

        gsap.set(word, { x: dx, y: dy, scale: 1.14, opacity: 1 });
        gsap.set(lede, { opacity: 1 });
        gsap.set(card, { xPercent: 36, opacity: 0, scale: 0.92 });
        gsap.set([copy, cta], { opacity: 0, y: 28 });
        if (linePath) gsap.set(linePath, { drawSVG: "0%" });
        if (hint) gsap.set(hint, { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "+=220%",
            scrub: 0.6,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(word, { x: 0, y: 0, scale: 1, duration: 1, ease: "power2.inOut" }, 0)
          .to(lede, { opacity: 0, duration: 0.5 }, 0)
          .to(hint, { opacity: 0, duration: 0.35 }, 0);
        tl.to(card, { xPercent: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.55);
        tl.to([copy, cta], { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 }, 1.15);
        if (linePath) tl.to(linePath, { drawSVG: "100%", duration: 0.9 }, 1.2);
      });

      // MOBILE — no pin. Name first, then card + copy on a short load-in.
      mm.add("(max-width: 767px)", () => {
        gsap.set(word, { x: 0, y: 0, scale: 1, opacity: 0, yPercent: 8, filter: "blur(8px)" });
        gsap.set([copy, card, cta], { opacity: 0, y: 20 });
        if (linePath) gsap.set(linePath, { drawSVG: "0%" });
        if (lede) gsap.set(lede, { opacity: 0 });
        if (hint) gsap.set(hint, { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(word, { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.7 })
          .to(copy, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, "-=0.3")
          .to(card, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .to(cta, { opacity: 1, y: 0, duration: 0.45 }, "-=0.35");
        if (linePath) tl.to(linePath, { drawSVG: "100%", duration: 0.7 }, "<");
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="bg-hero-bg text-hero-fg">
      <div
        data-stage
        className="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-20 md:h-screen md:py-0"
      >
        <div className="mx-auto grid w-full max-w-wide grid-cols-1 items-center gap-10 md:grid-cols-[1.12fr_0.88fr] md:gap-14">
          <div className="relative z-10">
            <p
              data-copy
              className="mb-4 flex items-center gap-2 font-mono text-small tracking-[0.2em]"
            >
              <span className="text-hero-muted">I DO</span>
              <DecryptingRoles words={ROLES} className="text-hero-accent" />
            </p>

            <h1
              data-word
              className="text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.01em] will-change-transform"
            >
              <span className="pr-[0.14em] font-serif italic font-normal">Dr</span>
              <span className="font-serif">Madh</span>
              <span className="font-mono">avi</span>
            </h1>

            <p
              data-copy
              className="mt-7 max-w-[18ch] font-serif text-[clamp(1.5rem,3vw,2.6rem)] text-hero-fg italic leading-[1.06]"
            >
              I don&apos;t fit in boxes. I build bridges between them.
            </p>
            <p data-copy className="mt-6 max-w-[48ch] text-body text-hero-fg/72">
              I ran MBBS at Andhra Medical College and the IIT Madras BS in Data Science at the same
              time. Wards on one rail, models on the other. Now I ship clinical AI that has to work
              at the bedside.
            </p>

            <div data-copy className="mt-7 flex items-center gap-3">
              <svg
                aria-hidden="true"
                className="h-2 w-[min(24vw,10rem)] shrink-0"
                viewBox="0 0 400 4"
                fill="none"
                preserveAspectRatio="none"
              >
                <path data-line d="M0 2 H400" stroke="var(--color-hero-accent)" strokeWidth="2" />
              </svg>
              <p className="font-mono text-hero-muted text-small">{AFFILIATIONS.join("  ·  ")}</p>
            </div>

            <p data-cta className="mt-8">
              <Link
                href="#work"
                className="font-mono text-small tracking-[0.14em] text-hero-accent underline-offset-4 transition-colors hover:underline"
              >
                View work →
              </Link>
            </p>
          </div>

          <div
            data-portrait
            className="justify-self-center will-change-transform md:justify-self-end"
          >
            <ProfileCard
              name="Dr Madhavi"
              title="Clinician · Data Scientist"
              handle="maddydjie"
              status="Open to build"
              onContactClick={() => router.push("/contact")}
            />
          </div>
        </div>

        {/* scannable one-liner — visible with the centred name before scroll */}
        <p
          data-lede
          className="pointer-events-none absolute top-[59%] left-1/2 z-20 hidden max-w-[42ch] -translate-x-1/2 px-4 text-center font-mono text-hero-muted text-small tracking-[0.18em] md:block"
        >
          CLINICIAN + DATA SCIENTIST — CLINICAL AI · RWE · MULTIMODAL HEALTH
        </p>

        <span
          data-hint
          className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 font-mono text-hero-muted text-small tracking-widest"
        >
          scroll ↓
        </span>
      </div>
    </div>
  );
}

function DecryptingRoles({
  words,
  className = "",
  intervalMs = 2400,
}: {
  words: string[];
  className?: string;
  intervalMs?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), intervalMs);
    return () => clearInterval(id);
  }, [words, intervalMs]);

  return <DecryptedText text={words[i] ?? words[0]} className={className} replayKey={i} />;
}
