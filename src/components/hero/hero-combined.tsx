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
// Mobile: name alone on open → compact docked composition on scroll (fits 100svh).
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
    const reveal = q("[data-reveal]");
    const lede = q("[data-lede]")[0] as HTMLElement | undefined;
    const linePath = q("[data-line]")[0] as unknown as SVGPathElement | undefined;
    const hint = q("[data-hint]")[0] as HTMLElement | undefined;
    if (!stage || !word || !card || !reveal.length) return;

    const setPhase = (phase: "intro" | "docked" | "live") => {
      wrap.setAttribute("data-hero-phase", phase);
      wrap.setAttribute("data-hero-ready", phase === "intro" ? "live" : phase);
    };

    if (prefersReducedMotion()) {
      gsap.set([reveal, card], { clearProps: "all", autoAlpha: 1 });
      gsap.set(word, { clearProps: "all", autoAlpha: 1 });
      if (lede) gsap.set(lede, { autoAlpha: 0 });
      if (hint) gsap.set(hint, { autoAlpha: 0 });
      setPhase("docked");
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        setPhase("live");
        gsap.set([reveal, card], { clearProps: "all", autoAlpha: 1 });

        gsap.set(word, { x: 0, y: 0, scale: 1, filter: "none" });
        const b = word.getBoundingClientRect();
        const dx = window.innerWidth / 2 - (b.left + b.width / 2);
        const dy = window.innerHeight / 2 - (b.top + b.height / 2);

        gsap.set(word, { x: dx, y: dy, scale: 1.14, autoAlpha: 1 });
        if (lede) gsap.set(lede, { autoAlpha: 1 });
        gsap.set(card, { xPercent: 36, autoAlpha: 0, scale: 0.92, y: 0 });
        gsap.set(reveal, { autoAlpha: 0, y: 28 });
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
        tl.to(word, { x: 0, y: 0, scale: 1, duration: 1, ease: "power2.inOut" }, 0);
        if (lede) tl.to(lede, { autoAlpha: 0, duration: 0.5 }, 0);
        if (hint) tl.to(hint, { autoAlpha: 0, duration: 0.35 }, 0);
        tl.to(card, { xPercent: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.55);
        tl.to(reveal, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.05);
        if (linePath) tl.to(linePath, { drawSVG: "100%", duration: 0.9 }, 1.15);
      });

      mm.add("(max-width: 767px)", () => {
        setPhase("intro");

        // Intro: name only. Reveal nodes stay out of the layout via CSS phase.
        gsap.set(reveal, { autoAlpha: 0, y: 18 });
        gsap.set(card, { autoAlpha: 0, y: 28, scale: 0.96, xPercent: 0 });
        if (lede) gsap.set(lede, { autoAlpha: 0 });
        if (hint) gsap.set(hint, { autoAlpha: 0 });
        gsap.set(word, {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 0,
          filter: "blur(12px)",
        });
        if (linePath) gsap.set(linePath, { drawSVG: "0%" });

        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro.to(word, {
          autoAlpha: 1,
          filter: "blur(0px)",
          scale: 1.06,
          duration: 1,
        });
        if (hint) intro.to(hint, { autoAlpha: 1, duration: 0.4 }, "-=0.15");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "+=160%",
            scrub: 0.7,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Flip layout mode once the dock has meaningfully started.
              setPhase(self.progress < 0.12 ? "intro" : "docked");
            },
          },
        });

        // Soften the name, hide the hint, then bring in the compact stack.
        tl.to(word, { scale: 1, duration: 0.5, ease: "power2.inOut" }, 0);
        if (hint) tl.to(hint, { autoAlpha: 0, duration: 0.2 }, 0);
        tl.to(reveal, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.18);
        tl.to(
          card,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" },
          0.32,
        );
        if (linePath) tl.to(linePath, { drawSVG: "100%", duration: 0.45 }, 0.55);
      });
    }, wrap);

    return () => {
      ctx.revert();
      wrap.removeAttribute("data-hero-ready");
      wrap.removeAttribute("data-hero-phase");
    };
  }, []);

  return (
    <div ref={wrapRef} data-hero data-hero-phase="intro" className="bg-hero-bg text-hero-fg">
      <div
        data-stage
        className="hero-stage relative flex min-h-[100dvh] w-full flex-col overflow-hidden px-6 md:h-screen md:min-h-0 md:justify-center md:py-0"
      >
        <div className="hero-stack mx-auto flex w-full max-w-wide flex-col items-center md:grid md:grid-cols-[1.12fr_0.88fr] md:items-center md:gap-14">
          <h1
            data-word
            className="hero-name text-center text-[clamp(3.25rem,16vw,4.85rem)] leading-[0.92] tracking-[-0.01em] will-change-transform md:col-start-1 md:row-start-2 md:justify-self-start md:text-left md:text-[clamp(2.5rem,7vw,6.5rem)]"
          >
            <span className="pr-[0.14em] font-serif italic font-normal">Dr</span>
            <span className="font-serif">Madh</span>
            <span className="font-mono">avi</span>
          </h1>

          <p
            data-reveal
            className="hero-reveal hero-ido flex items-center justify-center gap-2 font-mono text-small tracking-[0.2em] md:col-start-1 md:row-start-1 md:mb-4 md:justify-self-start"
          >
            <span className="text-hero-muted">I DO</span>
            <DecryptingRoles words={ROLES} className="text-hero-accent" />
          </p>

          <p
            data-reveal
            className="hero-reveal hero-tagline max-w-[16ch] text-center font-serif text-[clamp(1.2rem,5vw,1.65rem)] text-hero-fg italic leading-[1.08] md:col-start-1 md:row-start-3 md:mt-7 md:max-w-[18ch] md:justify-self-start md:text-left md:text-[clamp(1.5rem,3vw,2.6rem)]"
          >
            I don&apos;t fit in boxes. I build bridges between them.
          </p>

          {/* Desktop-only long bio — never on phone. */}
          <p
            data-reveal
            className="hero-reveal hero-bio mt-6 hidden max-w-[48ch] text-body text-hero-fg/72 md:col-start-1 md:row-start-4 md:block md:justify-self-start"
          >
            I ran MBBS at Andhra Medical College and the IIT Madras BS in Data Science at the same
            time. Wards on one rail, models on the other. Now I ship clinical AI that has to work at
            the bedside.
          </p>

          <div
            data-portrait
            data-reveal
            className="hero-reveal hero-photo mx-auto w-[min(10.25rem,52vw)] will-change-transform md:col-start-2 md:row-start-1 md:row-span-6 md:mx-0 md:w-full md:max-w-[22rem] md:justify-self-end md:self-center"
          >
            <ProfileCard
              className="mx-auto"
              name="Dr Madhavi"
              title="Clinician · Data Scientist"
              handle="maddydjie"
              status="Open to build"
              onContactClick={() => router.push("/contact")}
            />
          </div>

          <div
            data-reveal
            className="hero-reveal hero-meta w-full md:col-start-1 md:row-start-5 md:mt-7 md:justify-self-start"
          >
            <div className="hidden items-center gap-3 md:flex">
              <svg
                aria-hidden="true"
                className="h-2 w-[min(24vw,10rem)] shrink-0"
                viewBox="0 0 400 4"
                fill="none"
                preserveAspectRatio="none"
              >
                <path data-line d="M0 2 H400" stroke="var(--color-hero-accent)" strokeWidth="2" />
              </svg>
              <p className="font-mono text-hero-muted text-small">{AFFILIATIONS.join(" · ")}</p>
            </div>

            <p className="text-center md:mt-8 md:text-left">
              <Link
                href="#work"
                className="font-mono text-small tracking-[0.14em] text-hero-accent underline-offset-4 transition-colors hover:underline"
              >
                View work →
              </Link>
            </p>
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
          className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-30 -translate-x-1/2 font-mono text-hero-muted text-small tracking-widest"
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
