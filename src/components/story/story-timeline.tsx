"use client";

import { BlurText } from "@/components/text/blur-text";
import { STORY_BEATS, STORY_CLOSER, STORY_LABEL } from "@/content/story";

export function StoryTimeline() {
  return (
    <section className="bg-background px-6 py-24 text-foreground md:py-32">
      <div className="mx-auto w-full max-w-reading">
        <p className="mb-12 font-mono text-small tracking-[0.2em] text-muted-foreground">
          {STORY_LABEL}
        </p>
        <ol className="flex flex-col gap-10">
          {STORY_BEATS.map((b) => (
            <li key={`${b.when}-${b.text}`} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <span className="font-mono text-small text-muted-foreground">{b.when}</span>
              <BlurText text={b.text} className="font-serif text-h3 leading-snug" />
            </li>
          ))}
        </ol>
        <BlurText
          text={STORY_CLOSER}
          className="mt-16 max-w-[22ch] font-serif text-h2 italic leading-tight text-foreground"
        />
      </div>
    </section>
  );
}
