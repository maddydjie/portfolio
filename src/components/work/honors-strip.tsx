"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import { DecryptedText } from "@/components/text/decrypted-text";
import { BentoCell } from "@/components/work/magic-bento";
import { HONORS } from "@/content/honors";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Honors — Magic Bento cells (maroon spotlight + particles) with BlurText /
 * DecryptedText entrance. Underlines draw after cells settle.
 */
export function HonorsStrip() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rail = root.querySelector<HTMLElement>("[data-honor-rail]");
    const cells = root.querySelectorAll<HTMLElement>("[data-honor-cell]");
    const rules = root.querySelectorAll<HTMLElement>("[data-underline]");

    if (prefersReducedMotion()) {
      gsap.set(rules, { scaleX: 1 });
      if (rail) gsap.set(rail, { scaleX: 1 });
      return;
    }

    registerGsap();

    const ctx = gsap.context(() => {
      gsap.set(cells, { opacity: 0, y: 36 });
      gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });
      if (rail) gsap.set(rail, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      if (rail) {
        tl.to(rail, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.1);
      }
      tl.to(
        cells,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.14,
        },
        0.22,
      );
      tl.to(
        rules,
        {
          scaleX: 1,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.inOut",
        },
        0.55,
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
      id="honors"
      aria-label="Honors"
      className="scroll-mt-24 bg-background px-6 py-16 text-foreground md:py-24"
    >
      <div className="mx-auto max-w-wide">
        <header className="mb-10 md:mb-14">
          <p className="font-mono text-accent text-small tracking-[0.24em]">
            <DecryptedText text="HONORS" startOnView />
          </p>
          <BlurText
            as="h2"
            text="Invited. Ranked. Featured."
            className="mt-3 max-w-[22ch] font-serif text-h2 leading-[1.1]"
          />
          <span
            data-honor-rail
            aria-hidden="true"
            className="mt-8 block h-px w-24 origin-left scale-x-0 bg-accent"
          />
        </header>

        <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
          {HONORS.map((h) => {
            const inner = (
              <div className="flex h-full flex-col p-6 md:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-border bg-background/80 p-2">
                  <Image
                    src={h.logo.src}
                    alt={h.logo.alt}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>

                <p className="relative mt-6 inline-block w-fit pb-2">
                  <span className="font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] text-accent leading-[0.95] tracking-[-0.02em]">
                    {h.highlight}
                  </span>
                  <span
                    data-underline
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent"
                  />
                </p>

                <div className="mt-auto border-border border-t pt-5">
                  <h3 className="font-serif text-h3 leading-tight">{h.org}</h3>
                  <p className="mt-2 font-mono text-muted-foreground text-small">
                    <DecryptedText text={h.role} startOnView />
                  </p>
                  {h.meta ? (
                    <p className="mt-1 font-mono text-muted-foreground text-small">{h.meta}</p>
                  ) : null}
                </div>
              </div>
            );

            return (
              <li key={h.id} data-honor-cell className="min-h-[280px]">
                <BentoCell className="mb-sharp h-full min-h-[280px]" particles={10}>
                  {h.href ? (
                    <a
                      href={h.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </BentoCell>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
