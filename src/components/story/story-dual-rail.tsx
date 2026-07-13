"use client";

import { useEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import {
  CLINICAL_BEATS,
  STORY_BEATS,
  STORY_CLOSER,
  STORY_LABEL,
  TECHNICAL_BEATS,
  type StoryBeat,
} from "@/content/story";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

function BeatRow({ beat, index }: { beat: StoryBeat; index: number }) {
  return (
    <div data-beat data-i={index} className="grid gap-2">
      <span className="font-mono text-small text-muted-foreground">{beat.when}</span>
      <p className="font-serif text-h3 leading-snug text-foreground">{beat.text}</p>
    </div>
  );
}

function beatIndex(beat: StoryBeat) {
  return STORY_BEATS.findIndex((b) => b.when === beat.when && b.text === beat.text);
}

export function StoryDualRail() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const rails = root.querySelector<HTMLElement>("[data-rails]");
        if (!rails) return;
        const beats = Array.from(rails.querySelectorAll<HTMLElement>("[data-beat]")).sort(
          (a, b) => Number(a.dataset.i) - Number(b.dataset.i),
        );
        gsap.set(beats, { opacity: 0, y: 22 });
        gsap.to(beats, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        });
      });

      mm.add("(max-width: 767px)", () => {
        const stack = root.querySelector<HTMLElement>("[data-stack]");
        if (!stack) return;
        const beats = stack.querySelectorAll<HTMLElement>("[data-beat]");
        gsap.set(beats, { opacity: 0, y: 22 });
        gsap.to(beats, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-background px-6 py-24 text-foreground md:py-32">
      <div className="mx-auto w-full max-w-wide">
        <p className="mb-12 font-mono text-small tracking-[0.2em] text-muted-foreground">
          {STORY_LABEL}
        </p>

        {/* Mobile — chronological stack */}
        <ol data-stack className="flex flex-col gap-10 md:hidden">
          {STORY_BEATS.map((b, i) => (
            <li key={`${b.when}-${b.text}`}>
              <BeatRow beat={b} index={i} />
            </li>
          ))}
        </ol>

        {/* Desktop — dual rails */}
        <div data-rails className="relative hidden md:grid md:grid-cols-2 md:gap-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-accent/50"
          />

          <div>
            <p className="mb-8 font-serif text-small italic text-muted-foreground">Clinical</p>
            <div className="flex flex-col gap-12">
              {CLINICAL_BEATS.map((b) => (
                <BeatRow key={`${b.when}-${b.text}`} beat={b} index={beatIndex(b)} />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-8 font-serif text-small italic text-muted-foreground">Technical</p>
            <div className="flex flex-col gap-12">
              {TECHNICAL_BEATS.map((b) => (
                <BeatRow key={`${b.when}-${b.text}`} beat={b} index={beatIndex(b)} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <BlurText
            text={STORY_CLOSER}
            className="mx-auto max-w-[22ch] text-center font-serif text-h2 italic leading-tight text-foreground"
          />
        </div>
      </div>
    </section>
  );
}
