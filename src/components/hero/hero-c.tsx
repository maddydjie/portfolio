import { Section } from "@/components/section";
import { InkMark } from "@/components/signature/ink-mark";
import { Wordmark } from "@/components/signature/wordmark";
import { AFFILIATIONS, POSITIONING } from "@/content/landing";

export function HeroC() {
  return (
    <Section width="reading" className="pt-section pb-0">
      <h1 className="text-hero-lg">
        <InkMark variant="circle">
          <Wordmark className="text-hero-lg" />
        </InkMark>
      </h1>
      <p className="mt-8 max-w-reading text-body text-muted-foreground">{POSITIONING}</p>
      <p className="mt-6 font-mono text-small text-muted-foreground">
        {AFFILIATIONS.join("  ·  ")}
      </p>
    </Section>
  );
}
