import { BlurText } from "@/components/text/blur-text";
import { DecryptedText } from "@/components/text/decrypted-text";
import { RotatingTitle as Rotating } from "@/components/text/rotating-title";
import { ScrollReveal } from "@/components/text/scroll-reveal";

const ROLES = ["MEDICINE", "DATA SCIENCE", "SPACE RESEARCH", "PHOTOGRAPHY"];

export default function TextLab() {
  return (
    <main className="mx-auto max-w-reading px-6 py-[30vh] text-foreground">
      <p className="mb-4 flex items-center gap-2 font-mono text-small tracking-widest">
        <span className="text-muted-foreground">I DO</span>
        <Rotating words={ROLES} className="text-accent" />
      </p>

      <BlurText
        as="h1"
        text="Bridges between the boxes."
        className="font-serif text-hero-lg leading-tight"
      />

      <p className="mt-4 font-mono text-accent text-small">
        <DecryptedText text="CASECONNECT · CLINICAL AI · 2026" />
      </p>

      <div className="h-[40vh]" />

      <ScrollReveal
        text="Trained at the bedside and at IIT Madras, I turn the mess of real clinical care into models people can actually trust. Retrieval that cites its sources. Pipelines that respect how clinicians actually work. Evidence graded, not guessed."
        className="font-serif text-h3 leading-relaxed"
      />

      <div className="h-[60vh]" />
    </main>
  );
}
