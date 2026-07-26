"use client";

import { useEffect, useState } from "react";
import { PRESS_FEATURE } from "@/content/press";
import { prefersReducedMotion } from "@/lib/motion";

const STYLE_ID = "press-ticker-styles";
const CSS = `
@keyframes press-ticker-scroll {
  from { transform: translate3d(0,0,0); }
  to { transform: translate3d(-50%,0,0); }
}
.press-ticker-track {
  display: flex;
  width: max-content;
  animation: press-ticker-scroll 28s linear infinite;
}
.press-ticker-track:hover { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .press-ticker-track { animation: none; }
}
`;

function inject() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Lab C — Marquee / ticker.
 * Full-bleed looping strip; whole band is the link.
 */
export function PressTicker() {
  const p = PRESS_FEATURE;
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    inject();
    setReduce(prefersReducedMotion());
  }, []);

  const chips = p.ticker;
  const row = (
    <>
      {chips.map((chip) => (
        <span key={chip} className="flex items-center gap-6 px-3 md:gap-8 md:px-4">
          <span className="whitespace-nowrap font-mono text-[clamp(0.85rem,1.6vw,1.05rem)] tracking-[0.22em]">
            {chip}
          </span>
          <span className="text-accent" aria-hidden="true">
            ◆
          </span>
        </span>
      ))}
    </>
  );

  return (
    <section aria-label="Press feature ticker" className="bg-background py-16 text-foreground md:py-20">
      <div className="mx-auto mb-6 max-w-wide px-6">
        <p className="font-mono text-muted-foreground text-small tracking-[0.2em]">PRESS</p>
      </div>

      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${p.outlets[0]} × ${p.outlets[1]}: ${p.blurb}. Open article.`}
        className="group block border-border border-y bg-foreground text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
      >
        <div className="overflow-hidden py-5 md:py-6">
          {reduce ? (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-small tracking-[0.18em] text-background/90"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : (
            <div className="press-ticker-track">
              <div className="flex items-center">{row}</div>
              <div className="flex items-center" aria-hidden="true">
                {row}
              </div>
            </div>
          )}
        </div>
      </a>

      <div className="mx-auto mt-8 max-w-wide px-6">
        <p className="max-w-[40ch] font-serif text-[clamp(1.2rem,2.4vw,1.55rem)] leading-snug text-muted-foreground">
          {p.blurb}
        </p>
        <p className="mt-3 font-mono text-accent text-small group-hover:underline">
          Tap the strip to read <span aria-hidden="true">↗</span>
        </p>
      </div>
    </section>
  );
}
