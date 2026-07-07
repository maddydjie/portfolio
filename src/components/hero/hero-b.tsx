import { Section } from "@/components/section";
import { WeaveDivider } from "@/components/signature/weave-divider";
import { Wordmark } from "@/components/signature/wordmark";
import { AFFILIATIONS, POSITIONING } from "@/content/landing";

export function HeroB() {
  return (
    <Section width="reading" className="pt-section pb-0">
      <Wordmark className="text-hero" />
      <p className="mt-6 max-w-reading text-body text-muted-foreground">{POSITIONING}</p>
      <WeaveDivider className="!py-8" />
      <p className="font-mono text-small text-muted-foreground">{AFFILIATIONS.join("  ·  ")}</p>
    </Section>
  );
}
