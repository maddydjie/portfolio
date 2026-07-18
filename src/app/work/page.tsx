import Link from "next/link";
import { Section } from "@/components/section";
import { ProjectsBento } from "@/components/work/projects-bento";

/** Full projects archive — landing Experience stays on `/#work`. */
export default function WorkPage() {
  return (
    <>
      <Section width="wide" as="div" className="pb-0 pt-16 md:pt-20">
        <p className="font-mono text-muted-foreground text-small tracking-[0.2em]">
          ARCHIVE
        </p>
        <p className="mt-3 max-w-reading text-small text-muted-foreground">
          Project index. For the experience path, start on the{" "}
          <Link href="/#work" className="text-accent underline-offset-4 hover:underline">
            home Work section
          </Link>
          .
        </p>
      </Section>
      <ProjectsBento />
    </>
  );
}
