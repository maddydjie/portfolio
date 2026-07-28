"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { ParticleField } from "@/components/contact/particle-field";
import { BlurText } from "@/components/text/blur-text";
import { DecryptedText } from "@/components/text/decrypted-text";
import { CONTACT } from "@/content/contact";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** Kinetic band words — short enough to read on a phone band. */
const PARTICLE_WORDS = ["CARE", "BUILD", "BRIDGE", "SHIP"] as const;

const PAGE_LINKS = [
  ["Education", "/#education"],
  ["Experience", "/#work"],
  ["Research", "/#research"],
  ["Press", "/#press"],
  ["Honors", "/#honors"],
  ["Selected work", "/#selected-work"],
] as const;

const ELSEWHERE = [
  {
    label: CONTACT.linkedin.label,
    href: CONTACT.linkedin.href,
    handle: "/bvs-madhavi",
  },
  {
    label: CONTACT.github.label,
    href: CONTACT.github.href,
    handle: "maddydjie",
  },
] as const;

export function ContactBoard({
  headingLevel = "h1",
}: {
  /** Use "h2" when embedding under a page that already owns the h1. */
  headingLevel?: "h1" | "h2";
} = {}) {
  const Heading = headingLevel;
  const rootRef = useRef<HTMLDivElement>(null);
  const reachRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    const reach = reachRef.current;
    if (!reach) return;

    const eye = reach.querySelector<HTMLElement>("[data-reach-eye]");
    const note = reach.querySelector<HTMLElement>("[data-reach-note]");
    const rule = reach.querySelector<HTMLElement>("[data-reach-rule]");
    const mail = reach.querySelector<HTMLElement>("[data-reach-mail]");
    const actions = reach.querySelectorAll<HTMLElement>("[data-reach-action]");
    const panels = reach.querySelectorAll<HTMLElement>("[data-reach-panel]");
    const rows = reach.querySelectorAll<HTMLElement>("[data-reach-row]");

    if (prefersReducedMotion()) {
      gsap.set([eye, note, mail, ...actions, ...panels, ...rows].filter(Boolean), {
        clearProps: "all",
      });
      if (rule) gsap.set(rule, { scaleX: 1 });
      return;
    }

    registerGsap();

    const ctx = gsap.context(() => {
      if (eye) gsap.set(eye, { opacity: 0, y: 14 });
      if (note) gsap.set(note, { opacity: 0, y: 16 });
      if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      if (mail) gsap.set(mail, { opacity: 0, y: 22 });
      gsap.set(actions, { opacity: 0, y: 10 });
      gsap.set(panels, { opacity: 0, y: 28 });
      gsap.set(rows, { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: reach,
          start: "top 78%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      if (eye) tl.to(eye, { opacity: 1, y: 0, duration: 0.45 }, 0);
      if (note) tl.to(note, { opacity: 1, y: 0, duration: 0.5 }, 0.12);
      if (rule) {
        tl.to(rule, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, 0.2);
      }
      if (mail) tl.to(mail, { opacity: 1, y: 0, duration: 0.55 }, 0.28);
      tl.to(
        actions,
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
        0.42,
      );
      tl.to(
        panels,
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
        0.5,
      );
      tl.to(
        rows,
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.045 },
        0.62,
      );
    }, reach);

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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      if (!prefersReducedMotion()) {
        registerGsap();
        const btn = rootRef.current?.querySelector<HTMLElement>("[data-copy]");
        if (btn) {
          gsap.fromTo(
            btn,
            { scale: 0.97 },
            { scale: 1, duration: 0.28, ease: "power2.out" },
          );
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
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-hero-muted text-small tracking-[0.2em]">
                <DecryptedText text="SIGNAL" startOnView />
              </p>
              <BlurText
                as="p"
                text={CONTACT.headline}
                className="mt-3 max-w-[16ch] font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.02em]"
              />
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

      {/* Reach — paper band with scroll choreography */}
      <section
        ref={reachRef}
        id="reach"
        aria-label="Contact"
        className="bg-background text-foreground"
      >
        <div className="mx-auto max-w-wide px-5 py-14 md:px-6 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16">
            <div className="max-w-lg">
              <p
                data-reach-eye
                className="font-mono text-accent text-small tracking-[0.2em]"
              >
                <DecryptedText text="CONTACT" startOnView />
              </p>
              <BlurText
                as={Heading}
                text={CONTACT.reachHeadline}
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05]"
              />
              <p
                data-reach-note
                className="mt-4 max-w-reading text-muted-foreground text-small leading-relaxed"
              >
                {CONTACT.note}
              </p>
              <span
                data-reach-rule
                aria-hidden="true"
                className="mt-6 block h-px w-20 origin-left bg-accent md:mt-8"
              />
            </div>

            <div
              data-reach-mail
              className="relative border border-foreground/18 bg-[color-mix(in_srgb,var(--color-background)_86%,var(--color-accent)_8%)] px-5 py-5 md:px-6 md:py-6"
            >
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 h-full w-[3px] bg-accent"
              />
              <p className="font-mono text-[0.7rem] tracking-[0.18em] text-accent">
                Email
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-2 block break-all font-mono text-[clamp(1.2rem,3.2vw,1.85rem)] leading-tight text-foreground transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {CONTACT.email}
              </a>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-small">
                <button
                  type="button"
                  data-copy
                  data-reach-action
                  onClick={copyEmail}
                  className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.97]"
                >
                  [ {copied ? "Copied" : "Copy"} ]
                </button>
                <a
                  data-reach-action
                  href={`mailto:${CONTACT.email}`}
                  className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  [ Open mail ]
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-10 border-border border-t pt-10 md:mt-16 md:grid-cols-2 md:gap-14 md:pt-14">
            <div data-reach-panel>
              <h2 className="font-serif text-[clamp(1.55rem,3vw,2rem)] leading-none tracking-[-0.02em]">
                Elsewhere
              </h2>
              <ul className="mt-5 space-y-2">
                {ELSEWHERE.map((item) => (
                  <li key={item.href} data-reach-row>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 border border-foreground/18 bg-background px-4 py-3.5 text-foreground transition-[background-color,border-color,color,transform] duration-220 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-hero-bg hover:bg-hero-bg hover:text-hero-fg focus-visible:border-hero-bg focus-visible:bg-hero-bg focus-visible:text-hero-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99] active:border-hero-bg active:bg-hero-bg active:text-hero-fg md:px-5 md:py-4"
                    >
                      <span className="min-w-0">
                        <span className="block font-serif text-[1.15rem] leading-none md:text-[1.35rem]">
                          {item.label}
                        </span>
                        <span className="mt-1.5 block font-mono text-[0.72rem] tracking-[0.06em] text-muted-foreground transition-colors duration-220 group-hover:text-hero-accent group-focus-visible:text-hero-accent group-active:text-hero-accent">
                          {item.handle}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-mono text-accent text-small transition-[color,transform] duration-220 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-hero-accent group-focus-visible:text-hero-accent group-active:text-hero-accent"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reach-panel>
              <h2 className="font-serif text-[clamp(1.55rem,3vw,2rem)] leading-none tracking-[-0.02em]">
                On this page
              </h2>
              <ul className="mt-5 grid grid-cols-2 gap-2">
                {PAGE_LINKS.map(([label, href]) => (
                  <li key={href} data-reach-row>
                    <Link
                      href={href}
                      className="group flex h-full items-center justify-between gap-2 border border-foreground/18 bg-background px-3 py-3 text-foreground transition-[background-color,border-color,color,transform] duration-220 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-hero-bg hover:bg-hero-bg hover:text-hero-fg focus-visible:border-hero-bg focus-visible:bg-hero-bg focus-visible:text-hero-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99] active:border-hero-bg active:bg-hero-bg active:text-hero-fg md:px-4 md:py-3.5"
                    >
                      <span className="font-serif text-[0.95rem] leading-tight md:text-body">
                        {label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-mono text-muted-foreground text-small transition-[color,transform] duration-220 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-hero-accent group-focus-visible:text-hero-accent group-active:text-hero-accent"
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
