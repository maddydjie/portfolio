import Link from "next/link";
import { Tag } from "./tag";

type ProjectCardProps = {
  title: string;
  /** wide-tracked metadata caption: "domain · stack · year" (BRIEF steal) */
  meta: string;
  summary?: string;
  /** inline proof, e.g. "~67% documentation-time reduction" */
  result?: string;
  tags?: string[];
  href?: string;
};

/**
 * Project row — deliberately a LINK-LIST row, not a card (BRIEF: rows read
 * senior; cards flatten a heavyweight system and a paper to equal weight).
 */
export function ProjectCard({
  title,
  meta,
  summary,
  result,
  tags = [],
  href = "#",
}: ProjectCardProps) {
  return (
    <article className="group border-t border-border py-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <Link href={href} className="font-serif text-h3 transition-colors group-hover:text-accent">
          {title}
        </Link>
        <span className="shrink-0 font-mono text-small text-muted-foreground">{meta}</span>
      </div>
      {summary && <p className="mt-2 max-w-reading text-body text-muted-foreground">{summary}</p>}
      {result && <p className="mt-2 text-small text-accent">{result}</p>}
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
    </article>
  );
}
