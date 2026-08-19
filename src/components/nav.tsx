"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/signature/wordmark";

const items = [
  { label: "Education", href: "/#education", id: "education" },
  { label: "Experience", href: "/#work", id: "work" },
  { label: "Research", href: "/#research", id: "research" },
  { label: "Press", href: "/#press", id: "press" },
  { label: "Work", href: "/#selected-work", id: "selected-work" },
  { label: "Contact", href: "/#reach", id: "reach" },
] as const;

function routeActive(pathname: string): string | null {
  if (pathname.startsWith("/contact")) return "reach";
  if (pathname.startsWith("/work")) return "selected-work";
  return null;
}

export function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(routeActive(pathname));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    const fromRoute = routeActive(pathname);
    if (fromRoute) {
      setActive(fromRoute);
      return;
    }

    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) {
      setActive(null);
      return;
    }

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        let next = "";
        let best = 0;
        for (const [id, ratio] of visible) {
          if (ratio >= best) {
            next = id;
            best = ratio;
          }
        }
        if (next) setActive(next);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.2, 0.45, 0.7] },
    );

    for (const node of nodes) io.observe(node);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <nav
        className="mx-auto flex h-16 max-w-wide items-center justify-between px-5 md:h-[4.5rem] md:px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="text-h3"
          aria-label="Madhavi, home"
          onClick={() => setOpen(false)}
        >
          <Wordmark animate className="text-h3" />
        </Link>

        <ul className="hidden items-center gap-4 text-small md:flex xl:gap-6">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={active === item.id ? "location" : undefined}
                className={`whitespace-nowrap transition-colors ${
                  active === item.id
                    ? "text-accent"
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="text-small text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="site-nav-panel"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <ul
          id="site-nav-panel"
          className="border-border border-t bg-background px-5 py-3 md:hidden"
        >
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={active === item.id ? "location" : undefined}
                className={`block py-2.5 text-small ${
                  active === item.id ? "text-accent" : "text-foreground"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
