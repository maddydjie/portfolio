import { Section } from "@/components/section";
import { InkMark } from "@/components/signature/ink-mark";
import { Wordmark } from "@/components/signature/wordmark";
import { AFFILIATIONS } from "@/content/landing";

export function HeroA() {
  return (
    <Section width="reading" className="pt-section pb-0">
      <h1>
        <Wordmark className="text-hero-lg" />
      </h1>
      <p className="mt-6 max-w-reading text-body">
        MBBS-trained clinician and IIT Madras data scientist building at the intersection of{" "}
        <InkMark>clinical AI</InkMark>, real-world evidence, and multimodal health.
      </p>
      <p className="mt-6 font-mono text-small text-muted-foreground">
        {AFFILIATIONS.join("  ·  ")}
      </p>
    </Section>
  );
}
