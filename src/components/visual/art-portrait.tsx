import Image from "next/image";

// V-B — the portrait AS the clinical↔technical intersection: a duotone photo
// under scanlines + a data dot-mesh. Placeholder now; swap public/hero-portrait.webp.
export function ArtPortrait() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src="/hero-portrait-placeholder.svg"
        alt=""
        aria-hidden="true"
        fill
        sizes="50vw"
        className="object-cover [filter:grayscale(1)_contrast(1.15)_brightness(0.85)]"
      />
      {/* maroon duotone wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-color opacity-70"
        style={{ background: "var(--color-hero-accent)" }}
      />
      {/* scanlines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0 3px, rgba(20,18,14,0.55) 3px 4px)",
        }}
      />
      {/* data dot-mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(241,238,230,0.55) 1px, transparent 1px)",
          backgroundSize: "11px 11px",
        }}
      />
    </div>
  );
}
