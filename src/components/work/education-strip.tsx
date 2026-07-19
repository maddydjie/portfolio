"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import { DecryptedText } from "@/components/text/decrypted-text";
import { ScrollReveal } from "@/components/text/scroll-reveal";
import { TiltedCard } from "@/components/work/tilted-card";
import { EDUCATION } from "@/content/education";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Education — dual degree + institution marks.
 * React Bits layer: Decrypted eyebrow/degrees, BlurText headline, ScrollReveal
 * note, TiltedCard logos. GSAP handles logo/copy entrance after the pinned hero.
 */
export function EducationStrip() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rule = root.querySelector<HTMLElement>("[data-ed-rule]");
    const logos = root.querySelectorAll<HTMLElement>("[data-ed-logo]");
    const cards = root.querySelectorAll<HTMLElement>("[data-ed-card]");

    if (prefersReducedMotion()) {
      if (rule) gsap.set(rule, { scaleX: 1 });
      return;
    }

    registerGsap();

    const ctx = gsap.context(() => {
      gsap.set(logos, { opacity: 0, y: 40 });
      gsap.set(cards, { opacity: 0, y: 28 });
      if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      if (rule) {
        tl.to(rule, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.15);
      }
      tl.to(
        logos,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.16,
        },
        0.25,
      );
      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.14,
        },
        0.4,
      );
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    const t = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="education"
      aria-label="Education"
      className="scroll-mt-24 bg-background px-6 py-16 text-foreground md:py-24"
    >
      <div className="mx-auto max-w-wide">
        <header className="mb-10 max-w-2xl md:mb-14">
          <p className="font-mono text-accent text-small tracking-[0.24em]">
            <DecryptedText text={EDUCATION.eyebrow} startOnView />
          </p>
          <BlurText
            as="h2"
            text={EDUCATION.headline}
            className="mt-3 font-serif text-h2 leading-[1.1] md:text-hero"
          />
          <ScrollReveal
            text={EDUCATION.note}
            className="mt-4 max-w-reading text-muted-foreground text-small leading-relaxed"
          />
          <span
            data-ed-rule
            aria-hidden="true"
            className="mt-8 block h-px w-24 origin-left scale-x-0 bg-accent"
          />
        </header>

        <ul className="grid gap-10 border-border border-t pt-10 md:grid-cols-2 md:gap-14 md:pt-14">
          {EDUCATION.entries.map((e) => (
            <li key={e.id} className="min-w-0">
              <div data-ed-logo className="w-fit">
                <TiltedCard max={11} className="w-fit">
                  <div className="flex h-24 w-24 items-center justify-center rounded-sm border border-border bg-surface p-3.5 md:h-28 md:w-28">
                    <Image
                      src={e.logo.src}
                      alt={e.logo.alt}
                      width={112}
                      height={112}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </TiltedCard>
              </div>

              <div data-ed-card className="mt-6">
                <p className="font-mono text-[0.7rem] tracking-[0.18em] text-accent">
                  <DecryptedText text={e.degree} startOnView />
                </p>
                <h3 className="mt-2 font-serif text-h3 leading-tight">{e.school}</h3>
                {e.proof ? (
                  <p className="mt-3 font-serif text-[clamp(1.25rem,2.4vw,1.65rem)] leading-snug text-foreground">
                    {e.proof}
                  </p>
                ) : null}
                <p className="mt-3 max-w-reading text-muted-foreground text-small leading-relaxed">
                  {e.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
