"use client";

import Link from "next/link";
import { BlurText } from "@/components/text/blur-text";
import { BentoCell, BentoGrid } from "@/components/work/magic-bento";
import { TargetCursor } from "@/components/work/target-cursor";
import { TiltedCard } from "@/components/work/tilted-card";
import { PROJECTS, PROJECTS_HEADLINE } from "@/content/projects";

export function ProjectsBento() {
  return (
    <section className="relative bg-background px-6 py-20 text-foreground md:py-24">
      <TargetCursor />
      <div className="mx-auto max-w-wide">
        <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
          SELECTED WORK
        </p>
        <BlurText
          as="h2"
          text={PROJECTS_HEADLINE}
          className="max-w-[18ch] font-serif text-hero leading-[1.05]"
        />

        <BentoGrid className="mt-12">
          {PROJECTS.map((p, i) => (
            <TiltedCard
              key={p.id}
              className={`cursor-target rounded-2xl ${i < 2 ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-2"}`}
            >
              <BentoCell className="min-h-[200px]">
                <div className="flex h-full flex-col justify-between p-5 md:p-6">
                  <div>
                    <p className="font-mono text-accent text-small">{p.meta}</p>
                    <h3 className="mt-2 font-serif text-h3">{p.title}</h3>
                    <p className="mt-3 max-w-[52ch] text-muted-foreground text-small leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {p.result && (
                      <span className="bg-accent/10 px-2.5 py-1 font-mono text-accent text-[0.72rem]">
                        {p.result}
                      </span>
                    )}
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="border border-border px-2.5 py-1 font-mono text-[0.72rem] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                    {p.links[0] && (
                      <Link
                        href={p.links[0].href}
                        className="ml-auto font-mono text-accent text-small underline-offset-4 hover:underline"
                      >
                        {p.links[0].label} ↗
                      </Link>
                    )}
                  </div>
                </div>
              </BentoCell>
            </TiltedCard>
          ))}
        </BentoGrid>

        <p className="mt-10 font-mono text-small">
          <Link href="/work" className="text-accent underline-offset-4 hover:underline">
            All work ↗
          </Link>
        </p>
      </div>
    </section>
  );
}
