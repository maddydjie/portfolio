import type { ElementType, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** reading = 672px prose column; wide = 1200px index/gallery */
  width?: "reading" | "wide";
  as?: ElementType;
  className?: string;
};

const widthClass = {
  reading: "max-w-reading",
  wide: "max-w-wide",
} as const;

/** Vertical-rhythm section wrapper. 64px mobile / 96px desktop (Brand_Kit §8). */
export function Section({
  children,
  width = "wide",
  as: Tag = "section",
  className = "",
}: SectionProps) {
  return (
    <Tag className={`w-full px-6 py-section-sm md:py-section ${className}`}>
      <div className={`mx-auto ${widthClass[width]}`}>{children}</div>
    </Tag>
  );
}
