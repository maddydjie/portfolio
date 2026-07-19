import { ContactBoard } from "@/components/contact/contact-board";
import { HeroCombined } from "@/components/hero/hero-combined";
import { WeaveDivider } from "@/components/signature/weave-divider";
import { EducationStrip } from "@/components/work/education-strip";
import { ExperienceSpineStack } from "@/components/work/experience-journey";
import { HonorsStrip } from "@/components/work/honors-strip";
import { ProjectsBento } from "@/components/work/projects-bento";
import { ResearchSection } from "@/components/work/research-section";

export default function Home() {
  return (
    <>
      <HeroCombined />

      <WeaveDivider />

      <EducationStrip />

      <WeaveDivider />

      <ExperienceSpineStack />

      <WeaveDivider />

      <ResearchSection />

      <WeaveDivider />

      <HonorsStrip />

      <WeaveDivider />

      <ProjectsBento />

      <WeaveDivider />

      <ContactBoard headingLevel="h2" />
    </>
  );
}
