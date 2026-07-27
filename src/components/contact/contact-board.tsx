"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ParticleField } from "@/components/contact/particle-field";
import { CONTACT } from "@/content/contact";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** Kinetic band words — short enough to read on a phone band. */
const PARTICLE_WORDS = ["CARE", "BUILD", "BRIDGE", "SHIP"] as const;

export function ContactBoard({
  headingLevel = "h1",
}: {
  /** Use "h2" when embedding under a page that already owns the h1. */
  headingLevel?: "h1" | "h2";
} = {}) {
  const Heading = headingLevel;
  const rootRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    registerGsap();

    const bits = root.querySelectorAll<HTMLElement>("[data-in]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bits,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      if (!prefersReducedMotion()) {
        registerGsap();
        const btn = rootRef.current?.querySelector<HTMLElement>("[data-copy]");
        if (btn) {
          gsap.fromTo(btn, { scale: 0.97 }, { scale: 1, duration: 0.28, ease: "power2.out" });
        }
      }
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  return (
    <div ref={rootRef}>
      {/* Kinetic word showpiece — animation owns the viewport */}
      <section className="bg-hero-bg text-hero-fg">
        <div className="mx-auto max-w-wide px-6 pt-12 md:pt-16">
          <div data-in className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-hero-muted text-small tracking-[0.2em]">SIGNAL</p>
              <p className="mt-3 max-w-[16ch] font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.02em]">
                {CONTACT.headline}
              </p>
            </div>
            <p className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] text-hero-muted">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-hero-accent"
                aria-hidden="true"
              />
              Open to build
            </p>
          </div>
        </div>

        <div className="mt-6 border-hero-accent/40 border-y md:mt-8">
          <ParticleField
            words={PARTICLE_WORDS}
            className="h-[clamp(9.5rem,34vw,14rem)] w-full md:h-[clamp(14rem,40vh,26rem)]"
          />
        </div>
      </section>

      {/* Proper contact — paper contrast so channels stay scannable */}
      <section id="reach" aria-label="Contact" className="bg-background text-foreground">
        <div className="mx-auto max-w-wide px-6 py-16 md:py-24">
          <div
            data-in
            className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
          >
            <div className="max-w-lg">
              <p className="font-mono text-muted-foreground text-small tracking-[0.2em]">CONTACT</p>
              <Heading className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05]">
                {CONTACT.reachHeadline}
              </Heading>
              <p className="mt-4 max-w-reading text-muted-foreground text-small leading-relaxed">
                {CONTACT.note}
              </p>
            </div>

            <div className="lg:min-w-[min(100%,28rem)]">
              <p className="font-mono text-[0.7rem] tracking-[0.18em] text-accent">Email</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-2 block break-all font-mono text-[clamp(1.35rem,3.2vw,2rem)] leading-tight text-foreground transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {CONTACT.email}
              </a>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-small">
                <button
                  type="button"
                  data-copy
                  onClick={copyEmail}
                  className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.97]"
                >
                  [ {copied ? "Copied" : "Copy"} ]
                </button>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  [ Open mail ]
                </a>
              </div>
            </div>
          </div>

          <div
            data-in
            className="mt-16 grid gap-12 border-t border-border pt-12 md:mt-20 md:grid-cols-2 md:gap-16 md:pt-16"
          >
            <div>
              <h2 className="font-serif text-h2">Elsewhere</h2>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                <li>
                  <a
                    href={CONTACT.linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 py-5 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="font-serif text-h3">LinkedIn</span>
                    <span className="font-mono text-small text-muted-foreground transition-transform group-hover:translate-x-0.5">
                      /bvs-madhavi
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 py-5 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="font-serif text-h3">GitHub</span>
                    <span className="font-mono text-small text-muted-foreground transition-transform group-hover:translate-x-0.5">
                      maddydjie
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-h2">On this page</h2>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {(
                  [
                    ["Education", "/#education"],
                    ["Experience", "/#work"],
                    ["Research", "/#research"],
                    ["Press", "/#press"],
                    ["Honors", "/#honors"],
                    ["Selected work", "/#selected-work"],
                  ] as const
                ).map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span className="font-serif text-body">{label}</span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-small text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
