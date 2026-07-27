"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DecryptedText } from "@/components/text/decrypted-text";
import { AFFILIATIONS } from "@/content/landing";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { ProfileCard } from "./profile-card";

const ROLES = [
  "Clinical Science",
  "Data Science",
  "Research",
  "Leadership",
  "Clinical AI",
];

// RISE & DOCK — scroll-scored hero. On load "Dr Madhavi" sits centred; on scroll
// the wordmark docks while ProfileCard + copy rise in. One pinned stage on
// desktop and mobile. Reduced-motion: resting docked layout, static.
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

      // MOBILE — same rise & dock: name centres first, docks up; card rises
      // from the bottom of the stage; copy staggers in under the name.
      mm.add("(max-width: 767px)", () => {
        gsap.set(word, { x: 0, y: 0, scale: 1 });
        const b = word.getBoundingClientRect();
        const dx = window.innerWidth / 2 - (b.left + b.width / 2);
        const dy = window.innerHeight / 2 - (b.top + b.height / 2) - 10;

        gsap.set(word, { x: dx, y: dy, scale: 1.12, opacity: 1 });
        gsap.set([copy, cta], { opacity: 0, y: 22 });
        gsap.set(card, { y: 64, opacity: 0, scale: 0.94 });
        if (linePath) gsap.set(linePath, { drawSVG: "0%" });
        if (lede) gsap.set(lede, { opacity: 1 });
        if (hint) gsap.set(hint, { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "+=200%",
            scrub: 0.65,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(word, { x: 0, y: 0, scale: 1, duration: 1, ease: "power2.inOut" }, 0)
          .to(lede, { opacity: 0, duration: 0.45 }, 0)
          .to(hint, { opacity: 0, duration: 0.3 }, 0);
        tl.to(card, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.4);
        tl.to([copy, cta], { opacity: 1, y: 0, stagger: 0.08, duration: 0.65 }, 0.85);
        if (linePath) tl.to(linePath, { drawSVG: "100%", duration: 0.8 }, 0.9);
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="bg-hero-bg text-hero-fg">
      <div
        data-stage
        className="relative flex h-[100svh] min-h-[100svh] w-full items-start overflow-hidden px-6 pt-[max(4.25rem,10svh)] pb-[min(42svh,20rem)] md:h-screen md:min-h-0 md:items-center md:py-0 md:pb-0"
      >
        <div className="mx-auto grid w-full max-w-wide grid-cols-1 items-start md:grid-cols-[1.12fr_0.88fr] md:items-center md:gap-14">
          <div className="relative z-10 min-w-0">
            <p
              data-copy
              className="mb-3 flex items-center gap-2 font-mono text-small tracking-[0.2em] md:mb-4"
            >
              <span className="text-hero-muted">I DO</span>
              <DecryptingRoles words={ROLES} className="text-hero-accent" />
            </p>

            <h1
              data-word
              className="text-[clamp(2.75rem,12vw,6.5rem)] leading-[0.92] tracking-[-0.01em] will-change-transform md:text-[clamp(2.5rem,7vw,6.5rem)]"
            >
              <span className="pr-[0.14em] font-serif italic font-normal">Dr</span>
              <span className="font-serif">Madh</span>
              <span className="font-mono">avi</span>
            </h1>

            <p
              data-copy
              className="mt-4 max-w-[18ch] font-serif text-[clamp(1.25rem,5vw,2.6rem)] text-hero-fg italic leading-[1.06] md:mt-7 md:text-[clamp(1.5rem,3vw,2.6rem)]"
            >
              I don&apos;t fit in boxes. I build bridges between them.
            </p>
            <p
              data-copy
              className="mt-3 line-clamp-2 max-w-[48ch] text-[0.9rem] leading-relaxed text-hero-fg/72 md:mt-6 md:line-clamp-none md:text-body"
            >
              I ran MBBS at Andhra Medical College and the IIT Madras BS in Data Science at the same
              time. Wards on one rail, models on the other. Now I ship clinical AI that has to work
              at the bedside.
            </p>

            <div data-copy className="mt-4 flex items-center gap-3 md:mt-7">
              <svg
                aria-hidden="true"
                className="h-2 w-[min(24vw,10rem)] shrink-0"
                viewBox="0 0 400 4"
                fill="none"
                preserveAspectRatio="none"
              >
                <path data-line d="M0 2 H400" stroke="var(--color-hero-accent)" strokeWidth="2" />
              </svg>
              <p className="truncate font-mono text-hero-muted text-small md:whitespace-normal">
                {AFFILIATIONS.join("  ·  ")}
              </p>
            </div>

            <p data-cta className="mt-4 md:mt-8">
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
            className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-10 w-[min(13.5rem,46vw)] -translate-x-1/2 will-change-transform md:static md:left-auto md:w-full md:max-w-none md:translate-x-0 md:justify-self-end"
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
          className="pointer-events-none absolute top-[58%] left-1/2 z-20 max-w-[36ch] -translate-x-1/2 px-5 text-center font-mono text-[0.65rem] text-hero-muted tracking-[0.16em] md:top-[59%] md:max-w-[42ch] md:px-4 md:text-small md:tracking-[0.18em]"
        >
          CLINICIAN + DATA SCIENTIST — CLINICAL AI · RWE · MULTIMODAL HEALTH
        </p>

        <span
          data-hint
          className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-30 -translate-x-1/2 font-mono text-hero-muted text-small tracking-widest"
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
