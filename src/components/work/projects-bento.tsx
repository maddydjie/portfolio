"use client";

import Link from "next/link";
import { BlurText } from "@/components/text/blur-text";
import { BentoCell, BentoGrid } from "@/components/work/magic-bento";
import { PROJECTS, PROJECTS_HEADLINE } from "@/content/projects";

function githubLink(links: { label: string; href: string }[]) {
  return links.find((l) => /github\.com/i.test(l.href));
}

function demoLink(links: { label: string; href: string }[]) {
  return links.find((l) => !/github\.com/i.test(l.href));
}

export function ProjectsBento() {
  return (
    <section
      id="selected-work"
      className="relative scroll-mt-24 bg-background px-6 py-20 text-foreground md:py-24"
      aria-label="Selected work"
    >
      <div className="mx-auto max-w-wide">
        <p className="mb-3 font-mono text-muted-foreground text-small tracking-[0.2em]">
          SELECTED WORK
        </p>
        <BlurText
          as="h2"
          text={PROJECTS_HEADLINE}
          className="max-w-[18ch] font-serif text-hero leading-[1.05]"
        />

        {/* Clean magic-bento: equal tiles, 2-up on lg — spotlight + particles on hover. */}
        <BentoGrid className="mt-12">
          {PROJECTS.map((p) => {
            const github = githubLink(p.links);
            const demo = demoLink(p.links);
            const href = github?.href ?? demo?.href;

            const inner = (
              <div className="flex h-full flex-col justify-between p-5 md:p-6">
                <div>
                  <p className="font-mono text-accent text-small">{p.meta}</p>
                  <h3 className="mt-2 font-serif text-h3">{p.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-muted-foreground text-small leading-relaxed">
                    {p.summary}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {p.result ? (
                    <span className="bg-accent/10 px-2.5 py-1 font-mono text-accent text-[0.72rem]">
                      {p.result}
                    </span>
                  ) : null}
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="border border-border px-2.5 py-1 font-mono text-[0.72rem] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-3 font-mono text-small">
                    {demo ? <span className="text-muted-foreground">Demo</span> : null}
                    {github ? (
                      <span className="text-accent">GitHub ↗</span>
                    ) : (
                      <span className="text-[0.72rem] text-muted-foreground">Private</span>
                    )}
                  </span>
                </div>
              </div>
            );

            return (
              <BentoCell
                key={p.id}
                className="min-h-[220px] sm:col-span-1 md:min-h-[240px] lg:col-span-2"
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      github ? `${p.title} — open GitHub repository` : `${p.title} — open demo`
                    }
                    className="block h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </BentoCell>
            );
          })}
        </BentoGrid>

        <p className="mt-10 font-mono text-small">
          <Link
            href="/work"
            className="text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            All work ↗
          </Link>
        </p>
      </div>
    </section>
  );
}
