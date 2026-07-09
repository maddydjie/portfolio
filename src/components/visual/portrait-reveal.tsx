import Image from "next/image";

// The portrait as the hero's signature moment. Cover strips + a scan-line are
// driven by the hero's scroll timeline — as you scroll, the scanner "receives
// the feed" and the duotone portrait resolves. Presentational only (the hero
// animates [data-strip] / [data-scan] / [data-photo]).
const STRIPS = 6;

export function PortraitReveal() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-hero-muted/25">
      <div data-photo className="absolute inset-0">
        <Image
          src="/hero-portrait.jpg"
          alt="Portrait of BVS Madhavi"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 420px"
          className="object-cover object-top [filter:grayscale(1)_contrast(1.08)_brightness(1.02)]"
        />
        {/* maroon duotone wash — keeps the face readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-color opacity-45"
          style={{ background: "var(--color-hero-accent)" }}
        />
        {/* faint scanlines */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0 3px, rgba(20,18,14,0.5) 3px 4px)",
          }}
        />
      </div>

      {/* reveal cover strips — retract as you scroll (gsap scaleY 1 → 0) */}
      <div aria-hidden="true" className="absolute inset-0 flex">
        {Array.from({ length: STRIPS }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed count
            key={i}
            data-strip
            className="h-full flex-1 bg-hero-bg"
            style={{ transform: "scaleY(0)", transformOrigin: "top" }}
          />
        ))}
      </div>

      {/* scan-line sweep */}
      <div
        aria-hidden="true"
        data-scan
        className="absolute inset-x-0 top-0 h-px bg-hero-accent opacity-0 shadow-[0_0_14px_2px_var(--color-hero-accent)]"
      />

      {/* monitor caption */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-3 py-2 font-mono text-[0.7rem] text-hero-fg/85"
        style={{ background: "linear-gradient(to top, rgba(20,18,14,0.9), transparent)" }}
      >
        <span className="tracking-wider">BVS MADHAVI</span>
        <span className="flex items-center gap-1.5 text-hero-accent">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-hero-accent" />
          SCAN
        </span>
      </div>
    </div>
  );
}
