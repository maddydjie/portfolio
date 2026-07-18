/** Alternating experience card surfaces — paper ↔ maroon (brand only). */
export function experienceCardTone(index: number) {
  const maroon = index % 2 === 1;
  return {
    maroon,
    shell: maroon
      ? "border-accent bg-accent text-hero-fg"
      : "border-border bg-background text-foreground",
    face: maroon ? "bg-accent text-hero-fg" : "bg-background text-foreground",
    muted: maroon ? "text-hero-muted" : "text-muted-foreground",
    org: maroon ? "text-hero-accent" : "text-accent",
  };
}
