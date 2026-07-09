import Image from "next/image";

// The portrait as the hero's signature moment. On load it "scans open" — cover
// strips retract top-down in a stagger while a maroon scan-line sweeps through
// (a clinical-monitor read). Duotone + faint scanlines tie clinical + technical.
// Animation is driven by the hero timeline (targets [data-strip] / [data-scan]);
// this component is presentational. Placeholder image; swap public/hero-portrait.webp.
const STRIPS = 6;

export function PortraitReveal() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-hero-muted/25">
      <Image
        src="/hero-portrait-placeholder.svg"
        alt="Portrait of BVS Madhavi"
        fill
        sizes="(max-width: 768px) 90vw, 420px"
        className="object-cover [filter:grayscale(1)_contrast(1.1)_brightness(0.92)]"
      />

      {/* maroon duotone wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-color opacity-55"
        style={{ background: "var(--color-hero-accent)" }}
      />
      {/* persistent faint scanlines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0 3px, rgba(20,18,14,0.5) 3px 4px)",
        }}
      />

      {/* reveal cover strips — retract on load (gsap.from scaleY 1 → 0) */}
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
        className="absolute inset-x-0 top-0 h-px bg-hero-accent opacity-0 shadow-[0_0_12px_2px_var(--color-hero-accent)]"
      />

      {/* monitor caption */}
      <div
        className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2 font-mono text-[0.7rem] text-hero-fg/85"
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
