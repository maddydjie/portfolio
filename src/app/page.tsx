import Link from "next/link";
import { ContactBoard } from "@/components/contact/contact-board";
import { HeroCombined } from "@/components/hero/hero-combined";
import { Section } from "@/components/section";
import { WeaveDivider } from "@/components/signature/weave-divider";
import { ExperienceSpineStack } from "@/components/work/experience-journey";
import { HonorsStrip } from "@/components/work/honors-strip";
import { ProjectsBento } from "@/components/work/projects-bento";
import { ResearchSection } from "@/components/work/research-section";

export default function Home() {
  return (
    <>
      <HeroCombined />

      <WeaveDivider />

      <ExperienceSpineStack />

      <WeaveDivider />

      <ResearchSection />

      <WeaveDivider />

      <HonorsStrip />

      <WeaveDivider />

      <ProjectsBento />

      <Section width="reading" as="div" className="pt-0 pb-20 md:pb-24">
        <p className="text-small text-muted-foreground">
          I also{" "}
          <Link
            href="/photography"
            className="text-accent underline-offset-4 hover:underline"
          >
            shoot photography
          </Link>
          .
        </p>
      </Section>

      <WeaveDivider />

      <ContactBoard headingLevel="h2" />
    </>
  );
}
