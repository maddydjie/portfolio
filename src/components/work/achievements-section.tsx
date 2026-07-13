"use client";

import { useEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import { ACHIEVEMENTS } from "@/content/achievements";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function AchievementsSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();

    const cards = root.querySelectorAll<HTMLElement>("[data-ach]");
    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 20 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-background px-6 py-20 text-foreground md:py-24">
      <div className="mx-auto max-w-wide">
        <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
          ACHIEVEMENTS
        </p>
        <BlurText
          as="h2"
          text="Peer-reviewed range."
          className="max-w-[14ch] font-serif text-h2 leading-tight"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {ACHIEVEMENTS.map((a) => (
            <article
              key={a.id}
              data-ach
              className="border border-border bg-surface p-6"
            >
              <p className="font-mono text-accent text-small">{a.meta}</p>
              <h3 className="mt-2 font-serif text-h3">{a.title}</h3>
              <ul className="mt-4 space-y-2 text-small text-muted-foreground leading-relaxed">
                {a.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
