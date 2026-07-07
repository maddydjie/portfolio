import { Tag } from "@/components/tag";
import type { ProjectRow } from "@/content/landing";

export function WorkRow({ project }: { project: ProjectRow }) {
  return (
    <article className="border-border border-t py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-h3">{project.title}</h3>
        <p className="font-mono text-small text-muted-foreground tracking-wide">{project.meta}</p>
      </div>
      <p className="mt-3 max-w-reading text-body text-muted-foreground">{project.summary}</p>
      {project.result ? <p className="mt-2 text-body text-accent">{project.result}</p> : null}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
        {project.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="ml-1 text-small text-accent underline-offset-4 hover:underline"
          >
            {l.label} ↗
          </a>
        ))}
      </div>
    </article>
  );
}
