import type { ReactNode } from "react";

/** Mono tech / content-type pill (BRIEF: tech pills + bracketed taxonomy). */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-border bg-surface px-2 py-0.5 font-mono text-[13px] leading-none text-muted-foreground">
      {children}
    </span>
  );
}
