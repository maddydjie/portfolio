import Link from "next/link";
import { HeroV2 } from "@/components/hero/hero-v2";
import { Section } from "@/components/section";
import { WeaveDivider } from "@/components/signature/weave-divider";
import { WorkRow } from "@/components/work-row";
import { FEATURED } from "@/content/landing";

export default function Home() {
  return (
    <>
      <HeroV2 />

      <WeaveDivider />

      <Section width="wide" as="div">
        <h2 id="work" className="text-h2">
          Selected work
        </h2>
        <div className="mt-8">
          {FEATURED.map((p) => (
            <WorkRow key={p.title} project={p} />
          ))}
        </div>
        <p className="mt-8 text-small">
          <Link href="/work" className="text-accent underline-offset-4 hover:underline">
            All work ↗
          </Link>
        </p>
      </Section>

      <Section width="reading" as="div" className="pt-0">
        <p className="text-small text-muted-foreground">
          I also{" "}
          <Link href="/photography" className="text-accent underline-offset-4 hover:underline">
            shoot photography
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
