import Link from "next/link";
import { Wordmark } from "@/components/signature/wordmark";

const items = [
  ["Work", "/work"],
  ["Photography", "/photography"],
  ["Writing", "/writing"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function Nav() {
  return (
    <header className="w-full border-b border-border">
      <nav className="mx-auto flex max-w-wide items-center justify-between px-6 py-5">
        <Link href="/" className="text-h3" aria-label="Madhavi — home">
          <Wordmark animate className="text-h3" />
        </Link>
        <ul className="hidden items-center gap-6 text-small sm:flex">
          {items.map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                className="text-muted-foreground transition-colors hover:text-accent"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
