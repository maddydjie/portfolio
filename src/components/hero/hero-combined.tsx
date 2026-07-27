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

// RISE & DOCK — scroll-scored hero.
// Mobile: only "Dr Madhavi" arrives on open; scroll reveals copy + card below.
// Desktop: centred name docks left, card from the right. Reduced-motion: docked.
export function HeroCombined() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    registerGsap();

    const q = gsap.utils.selector(wrap);
    const stage = q("[data-stage]")[0] as HTMLElement | undefined;
    const word = q("[data-word]")[0] as HTMLElement | undefined;
    const card = q("[data-portrait]")[0] as HTMLElement | undefined;
    const copy = q("[data-reveal-copy]");
    const lede = q("[data-lede]")[0] as HTMLElement | undefined;
    const linePath = q("[data-line]")[0] as unknown as SVGPathElement | undefined;
    const hint = q("[data-hint]")[0] as HTMLElement | undefined;
    if (!stage || !word || !card || !copy.length) return;

    if (prefersReducedMotion()) {
      gsap.set([copy, card], { clearProps: "all", autoAlpha: 1 });
      gsap.set(word, { clearProps: "all", autoAlpha: 1 });
      if (lede) gsap.set(lede, { autoAlpha: 0 });
      if (hint) gsap.set(hint, { autoAlpha: 0 });
      wrap.setAttribute("data-hero-ready", "docked");
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        wrap.setAttribute("data-hero-ready", "live");
        gsap.set([copy, card], { clearProps: "maxHeight,overflow,margin", autoAlpha: 1 });

        gsap.set(word, { x: 0, y: 0, scale: 1, filter: "none" });
        const b = word.getBoundingClientRect();
        const dx = window.innerWidth / 2 - (b.left + b.width / 2);
        const dy = window.innerHeight / 2 - (b.top + b.height / 2);

        gsap.set(word, { x: dx, y: dy, scale: 1.14, autoAlpha: 1 });
        gsap.set(lede, { autoAlpha: 1 });
        gsap.set(card, { xPercent: 36, autoAlpha: 0, scale: 0.92, y: 0 });
        gsap.set(copy, { autoAlpha: 0, y: 28 });
        if (linePath) gsap.set(linePath, { drawSVG: "0%" });
        if (hint) gsap.set(hint, { autoAlpha: 1 });

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
          .to(lede, { autoAlpha: 0, duration: 0.5 }, 0)
          .to(hint, { autoAlpha: 0, duration: 0.35 }, 0);
        tl.to(card, { xPercent: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.55);
        tl.to(copy, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.05);
        if (linePath) tl.to(linePath, { drawSVG: "100%", duration: 0.9 }, 1.15);
      });

      mm.add("(max-width: 767px)", () => {
        wrap.setAttribute("data-hero-ready", "live");

        // Collapse out of flow so the name truly centres alone.
        gsap.set(copy, {
          autoAlpha: 0,
          y: 16,
          maxHeight: 0,
          overflow: "hidden",
        });
        gsap.set(card, {
          autoAlpha: 0,
          y: 24,
          scale: 0.94,
          xPercent: 0,
          maxHeight: 0,
          overflow: "hidden",
        });
        gsap.set(lede, { autoAlpha: 0 });
        gsap.set(hint, { autoAlpha: 0 });
        gsap.set(word, {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 0,
          filter: "blur(12px)",
        });
        if (linePath) gsap.set(linePath, { drawSVG: "0%" });

        // Arrival — name alone. Scroll hint after the name settles.
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(word, {
            autoAlpha: 1,
            filter: "blur(0px)",
            scale: 1.04,
            duration: 1,
          })
          .to(hint, { autoAlpha: 1, duration: 0.45 }, "-=0.2");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "+=170%",
            scrub: 0.65,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(word, { scale: 1, duration: 0.7, ease: "power2.inOut" }, 0).to(
          hint,
          { autoAlpha: 0, duration: 0.25 },
          0,
        );
        tl.to(
          copy,
          { autoAlpha: 1, y: 0, maxHeight: 480, duration: 0.7, ease: "power2.out" },
          0.28,
        );
        tl.to(
          card,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            maxHeight: 340,
            duration: 0.75,
            ease: "power2.out",
          },
          0.48,
        );
        if (linePath) tl.to(linePath, { drawSVG: "100%", duration: 0.65 }, 0.55);
      });
    }, wrap);

    return () => {
      ctx.revert();
      wrap.removeAttribute("data-hero-ready");
    };
  }, []);

  return (
    <div ref={wrapRef} data-hero className="bg-hero-bg text-hero-fg">
      <div
        data-stage
        className="relative flex h-[100svh] min-h-[100svh] w-full flex-col justify-center overflow-hidden px-6 py-[max(4.5rem,env(safe-area-inset-top))] md:h-screen md:min-h-0 md:py-0"
      >
        <div className="mx-auto grid w-full max-w-wide grid-cols-1 items-center gap-0 md:grid-cols-[1.12fr_0.88fr] md:gap-14">
          <div className="relative z-10 min-w-0">
            <p
              data-reveal-copy
              className="hero-reveal mb-4 hidden items-center gap-2 font-mono text-small tracking-[0.2em] md:flex"
            >
              <span className="text-hero-muted">I DO</span>
              <DecryptingRoles words={ROLES} className="text-hero-accent" />
            </p>

            <h1
              data-word
              className="text-center text-[clamp(3.1rem,15vw,4.75rem)] leading-[0.92] tracking-[-0.01em] will-change-transform md:text-left md:text-[clamp(2.5rem,7vw,6.5rem)]"
            >
              <span className="pr-[0.14em] font-serif italic font-normal">Dr</span>
              <span className="font-serif">Madh</span>
              <span className="font-mono">avi</span>
            </h1>

            <div data-reveal-copy className="hero-reveal">
              <p className="mt-5 flex items-center justify-center gap-2 font-mono text-small tracking-[0.2em] md:hidden">
                <span className="text-hero-muted">I DO</span>
                <DecryptingRoles words={ROLES} className="text-hero-accent" />
              </p>

              <p className="mt-4 max-w-[18ch] text-center font-serif text-[clamp(1.2rem,4.8vw,2.6rem)] text-hero-fg italic leading-[1.06] md:mt-7 md:text-left md:text-[clamp(1.5rem,3vw,2.6rem)] max-md:mx-auto">
                I don&apos;t fit in boxes. I build bridges between them.
              </p>
              <p className="mt-3 max-w-[40ch] text-center text-[0.9rem] leading-relaxed text-hero-fg/72 md:mt-6 md:max-w-[48ch] md:text-left md:text-body max-md:mx-auto max-md:line-clamp-3">
                I ran MBBS at Andhra Medical College and the IIT Madras BS in Data Science at the
                same time. Wards on one rail, models on the other. Now I ship clinical AI that has to
                work at the bedside.
              </p>

              <div className="mt-4 flex items-center justify-center gap-3 md:mt-7 md:justify-start">
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

              <p className="mt-5 text-center md:mt-8 md:text-left">
                <Link
                  href="#work"
                  className="font-mono text-small tracking-[0.14em] text-hero-accent underline-offset-4 transition-colors hover:underline"
                >
                  View work →
                </Link>
              </p>
            </div>
          </div>

          <div
            data-portrait
            className="hero-reveal mx-auto mt-6 w-[min(11.5rem,44vw)] will-change-transform md:mx-0 md:mt-0 md:w-full md:max-w-none md:justify-self-end"
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

        <p
          data-lede
          className="pointer-events-none absolute top-[59%] left-1/2 z-20 hidden max-w-[42ch] -translate-x-1/2 px-4 text-center font-mono text-hero-muted text-small tracking-[0.18em] md:block"
        >
          CLINICIAN + DATA SCIENTIST — CLINICAL AI · RWE · MULTIMODAL HEALTH
        </p>

        <span
          data-hint
          className="absolute bottom-[max(1.1rem,env(safe-area-inset-bottom))] left-1/2 z-30 -translate-x-1/2 font-mono text-hero-muted text-small tracking-widest"
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
