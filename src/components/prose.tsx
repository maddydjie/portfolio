import type { ReactNode } from "react";

/** Reading container — 672px max, body rhythm. Wraps MDX/prose content. */
export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mx-auto max-w-reading text-body [&_h2]:mt-12 [&_h2]:text-h2 [&_h3]:mt-8 [&_h3]:text-h3 [&_p]:mb-5 ${className}`}
    >
      {children}
    </div>
  );
}
