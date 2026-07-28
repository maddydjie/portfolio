"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { BlurText } from "@/components/text/blur-text";
import { DecryptedText } from "@/components/text/decrypted-text";
import { PRESS_FEATURE } from "@/content/press";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Newspaper clipping on a dark band — paper left, graduation photo right.
 * Scroll blur/settle + pointer spotlight + one-shot Ken Burns on the photo.
 */
export function PressClipping() {
  const rootRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const p = PRESS_FEATURE;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const eye = root.querySelector<HTMLElement>("[data-press-eye]");
    const well = root.querySelector<HTMLElement>("[data-press-well]");
    const clip = root.querySelector<HTMLElement>("[data-press-clip]");
    const bar = root.querySelector<HTMLElement>("[data-press-bar]");
    const rules = root.querySelectorAll<HTMLElement>("[data-press-rule]");
    const photo = photoRef.current;
    const caption = root.querySelector<HTMLElement>("[data-press-caption]");
    const cta = root.querySelector<HTMLElement>("[data-press-cta]");
    const strip = root.querySelector<HTMLElement>("[data-press-strip]");
    const outlets = root.querySelectorAll<HTMLElement>("[data-press-outlet]");
    const imgWrap = imgWrapRef.current;
    const spot = spotRef.current;

    if (prefersReducedMotion()) {
      gsap.set([eye, well, clip, photo, caption, cta, strip].filter(Boolean), {
        clearProps: "all",
      });
      if (bar) gsap.set(bar, { scaleY: 1 });
      gsap.set(rules, { scaleX: 1 });
      gsap.set(outlets, { clearProps: "all" });
      return;
    }

    registerGsap();

    const ctx = gsap.context(() => {
      if (eye) gsap.set(eye, { opacity: 0, y: 16 });
      if (well) gsap.set(well, { opacity: 0, y: 28 });
      if (clip) gsap.set(clip, { opacity: 0, y: 36, filter: "blur(8px)" });
      if (bar) gsap.set(bar, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });
      if (photo) gsap.set(photo, { opacity: 0, x: 40, filter: "blur(10px)" });
      if (imgWrap) gsap.set(imgWrap, { scale: 1.06 });
      if (caption) gsap.set(caption, { opacity: 0, y: 10 });
      if (cta) gsap.set(cta, { opacity: 0, y: 8 });
      if (strip) gsap.set(strip, { opacity: 0, y: 16 });
      gsap.set(outlets, { opacity: 0, y: 10 });
      if (spot) gsap.set(spot, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      if (eye) tl.to(eye, { opacity: 1, y: 0, duration: 0.45 }, 0);
      if (well) tl.to(well, { opacity: 1, y: 0, duration: 0.55 }, 0.08);
      if (clip) {
        tl.to(
          clip,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            clearProps: "filter",
          },
          0.18,
        );
      }
      if (bar) {
        tl.to(bar, { scaleY: 1, duration: 0.55, ease: "power2.inOut" }, 0.28);
      }
      tl.to(
        rules,
        { scaleX: 1, duration: 0.5, stagger: 0.08, ease: "power2.inOut" },
        0.4,
      );
      if (photo) {
        tl.to(
          photo,
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.75,
            clearProps: "filter",
          },
          0.32,
        );
      }
      if (imgWrap) {
        tl.to(imgWrap, { scale: 1, duration: 1.25, ease: "power2.out" }, 0.4);
      }
      if (caption) tl.to(caption, { opacity: 1, y: 0, duration: 0.45 }, 0.55);
      if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.4 }, 0.62);
      if (strip) tl.to(strip, { opacity: 1, y: 0, duration: 0.45 }, 0.7);
      tl.to(
        outlets,
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
        0.78,
      );
    }, root);

    // Pointer spotlight on the photo only (desktop / fine pointer).
    let removeSpot: (() => void) | undefined;
    if (
      photo &&
      spot &&
      !window.matchMedia("(pointer: coarse)").matches
    ) {
      const gx = gsap.quickTo(spot, "x", { duration: 0.45, ease: "power3" });
      const gy = gsap.quickTo(spot, "y", { duration: 0.45, ease: "power3" });
      const go = gsap.quickTo(spot, "opacity", { duration: 0.35, ease: "power2" });

      const move = (e: PointerEvent) => {
        const r = photo.getBoundingClientRect();
        gx(e.clientX - r.left);
        gy(e.clientY - r.top);
        go(1);
      };
      const leave = () => go(0);

      photo.addEventListener("pointermove", move);
      photo.addEventListener("pointerleave", leave);
      removeSpot = () => {
        photo.removeEventListener("pointermove", move);
        photo.removeEventListener("pointerleave", leave);
      };
    }

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    const t = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      removeSpot?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="press"
      aria-label="Press feature"
      className="scroll-mt-24 border-hero-fg/10 border-t bg-hero-bg px-4 py-10 text-hero-fg md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-wide">
        <p
          data-press-eye
          className="mb-3 font-mono text-hero-accent text-small tracking-[0.2em] md:mb-6"
        >
          <DecryptedText text="PRESS" startOnView />
        </p>

        <a
          data-press-well
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.outlets[0]} × ${p.outlets[1]}: ${p.blurb}. Open article.`}
          className="group block rounded-sm border border-hero-accent/35 bg-[#1c1914] p-2.5 shadow-[inset_0_1px_0_rgba(241,238,230,0.04)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-accent md:p-8 lg:p-10"
        >
          <div className="grid items-stretch gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] md:gap-10 lg:gap-12">
            {/* Photo first on phone — fixed crop, no letterbox padding. */}
            <div className="relative order-1 w-full md:order-2 md:min-h-0">
              <div
                aria-hidden="true"
                className="absolute -inset-2 hidden rounded-sm bg-hero-accent/12 blur-2xl transition-opacity duration-300 group-hover:opacity-90 md:block md:-inset-3"
              />
              <figure
                ref={photoRef}
                data-press-photo
                className="relative mx-auto aspect-[5/4] w-full max-h-[38vh] overflow-hidden rounded-sm border border-hero-fg/15 bg-[#12100c] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.65)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 md:aspect-auto md:mx-0 md:h-full md:max-h-none md:min-h-[22rem]"
              >
                <div ref={imgWrapRef} className="absolute inset-0 will-change-transform">
                  <Image
                    src={p.photo.src}
                    alt={p.photo.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 42vw"
                    className="object-cover object-[center_20%]"
                    priority={false}
                  />
                </div>
                <div
                  ref={spotRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-soft-light"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in srgb, var(--color-hero-accent) 55%, white) 0%, transparent 68%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hero-bg/70 via-hero-bg/10 to-transparent"
                />
                <figcaption
                  data-press-caption
                  className="absolute right-3 bottom-3 left-3 z-[1] font-mono text-[0.65rem] tracking-[0.16em] text-hero-fg/85 md:text-[0.7rem]"
                >
                  Andhra Medical College · Convocation
                </figcaption>
              </figure>
            </div>

            <article
              data-press-clip
              className="relative order-2 flex h-full flex-col border border-[#d9d2c4] bg-[#F7F4EE] px-4 py-4 text-foreground shadow-[0_22px_50px_-28px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.6)] md:order-1 md:px-10 md:py-10"
            >
              <div
                data-press-bar
                aria-hidden="true"
                className="absolute top-0 left-0 h-full w-[3px] origin-top bg-accent"
              />

              <header className="border-foreground/15 border-b pb-3 md:pb-4">
                <div className="flex flex-wrap items-end justify-between gap-2 md:gap-3">
                  <p className="font-serif text-[clamp(1.25rem,4.5vw,2rem)] font-bold leading-none tracking-[-0.02em]">
                    The Times of India
                  </p>
                  <p className="font-sans text-[0.65rem] font-bold tracking-[0.16em] text-foreground/65 md:text-[0.75rem]">
                    MSN
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase md:mt-3 md:text-[0.68rem]">
                  <span>
                    <DecryptedText text={p.section} startOnView />
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    By <DecryptedText text={p.byline} startOnView />
                  </span>
                </div>
              </header>

              <div className="mt-3 border-foreground/10 border-y py-1 md:mt-5">
                <div data-press-rule className="h-px origin-left bg-foreground/20" />
                <div data-press-rule className="mt-1 h-px origin-left bg-foreground/10" />
              </div>

              <BlurText
                as="h2"
                text={p.blurb}
                className="mt-3 font-serif text-[clamp(1.1rem,4.6vw,2.05rem)] leading-[1.18] tracking-[-0.02em] md:mt-6 md:text-[clamp(1.45rem,2.8vw,2.05rem)] md:leading-[1.15]"
                stagger={0.05}
              />

              <p
                data-press-cta
                className="mt-auto pt-3.5 font-mono text-accent text-small tracking-wider transition-colors group-hover:text-accent-hover md:pt-8"
              >
                Continue reading <span aria-hidden="true">↗</span>
              </p>
            </article>
          </div>
        </a>

        <div
          data-press-strip
          className="mt-6 border-hero-fg/10 border-t pt-5 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:mt-10 md:pt-7 md:pb-0"
        >
          <p className="mb-4 font-mono text-[0.65rem] tracking-[0.2em] text-hero-muted">
            ALSO FEATURED IN
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 md:gap-x-7">
            {p.coverage.map((o) => {
              const markClass =
                "font-sans text-[0.8rem] font-semibold tracking-[0.06em] text-hero-fg/75 transition-colors md:text-[0.85rem]";
              return (
                <li key={o.id} data-press-outlet>
                  {o.href ? (
                    <a
                      href={o.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={o.name ?? o.label}
                      className={`${markClass} underline-offset-4 hover:text-hero-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-accent`}
                    >
                      {o.label}
                    </a>
                  ) : (
                    <span className={markClass}>{o.label}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
