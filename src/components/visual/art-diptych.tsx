// V-C — a split diptych: clinical contour hairlines (left) meeting a technical
// dot-matrix (right) across a central weave seam. Static SVG, legible.
const COLS = 7;
const ROWS = 11;
const dots: Array<[number, number]> = [];
for (let r = 0; r < ROWS; r++) {
  for (let col = 0; col < COLS; col++) dots.push([col, r]);
}

export function ArtDiptych() {
  return (
    <svg
      viewBox="0 0 400 520"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      {/* left — clinical contour hairlines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          // biome-ignore lint/suspicious/noArrayIndexKey: static generated set
          key={i}
          d={`M0 ${50 + i * 56} C 55 ${28 + i * 56}, 120 ${88 + i * 56}, 190 ${52 + i * 56}`}
          stroke="var(--color-hero-accent)"
          strokeWidth="1"
          opacity={0.85 - i * 0.06}
        />
      ))}

      {/* center — weave seam */}
      <path
        d="M200 0 C 214 130, 186 260, 200 390 S 214 520, 200 520"
        stroke="var(--color-hero-fg)"
        strokeWidth="1"
        opacity="0.55"
      />

      {/* right — technical dot-matrix */}
      {dots.map(([col, r]) => (
        <circle
          key={`${col}-${r}`}
          cx={224 + col * 24}
          cy={40 + r * 44}
          r="1.7"
          fill="var(--color-hero-fg)"
          opacity="0.72"
        />
      ))}
    </svg>
  );
}
