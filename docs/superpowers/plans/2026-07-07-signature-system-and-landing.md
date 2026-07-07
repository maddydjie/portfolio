# Signature System & Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the portfolio's new signature identity (dual-type wordmark + interleave-weave divider + ink annotation), a GSAP motion foundation, and the landing page — with 3 A/B hero variants screenshotted at 1920/768/390.

**Architecture:** GSAP 3.13+ is the client-only motion layer, wrapped in a reduced-motion-aware helper so every animation has a static fallback that still reads as the signature. Signature components live in `src/components/signature/`. The landing page is a server component that reads `?v=a|b|c` from searchParams to render one of three hero variants (static design-comparison A/B — no runtime traffic split, no analytics). The ECG divider is deleted.

**Tech Stack:** Next 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 (@theme tokens) · GSAP 3.13+ (SplitText, DrawSVG, ScrollTrigger — all free) · Biome · pnpm.

## Global Constraints

- **Tokens only** — never hardcode color/spacing/type. Use `@theme` vars from `src/styles/globals.css` (e.g. `text-accent`, `border-border`, `text-hero-lg`, `max-w-wide`, `py-section`). Accent `#8B2E2A` marks only links/active/the signature — under 5% of the visual field.
- **GSAP is client-only** — every file importing gsap starts with `"use client"`; register plugins once, browser-guarded.
- **Reduced motion is load-bearing** — every animation routes through the reduced-motion helper; when set, render the final/static state. The static form must still read as the signature.
- **A11y** — every interactive element Tab-reachable; visible focus (`:focus-visible` already styled); no `outline:none` without alternative; decorative SVG `aria-hidden`; the nav wordmark's accessible name stays exactly `Madhavi`.
- **Images** — Next `<Image>` only, never `<img>`.
- **Nav order fixed** — Work · Photography · Writing · About · Contact.
- **Fonts already loaded** — `src/lib/fonts.ts` exposes `--font-fraunces`, `--font-inter`, `--font-mono`; use CSS vars `--font-serif` / `--font-mono`.
- **Commits** — conventional commits; NO "Co-authored-by" / "Generated with" lines. Work on branch `feat/signature-system`.
- **Build/verify** — this repo has NO unit-test runner; do not add one. Verification per task = `pnpm typecheck` + `pnpm build` + Playwright MCP screenshots + manual keyboard checks. Run pnpm via the project workflow (corepack + public-registry flag) per the `portfolio-build-workflow` memory.
- **Supersedes** — GSAP ban lifted; ECG signature retired. Spec: `docs/superpowers/specs/2026-07-06-signature-system-and-landing-design.md`.

---

### Task 1: GSAP install, motion foundation & constitution amendment

**Files:**
- Modify: `package.json` (add gsap)
- Create: `src/lib/gsap.ts`
- Create: `src/lib/motion.ts`
- Modify: `.claude/CLAUDE.md` (tech stack + do-not-install + distinctive-detail)

**Interfaces:**
- Produces: `registerGsap(): void` (idempotent plugin registration) from `src/lib/gsap.ts`
- Produces: `prefersReducedMotion(): boolean` and `SIGNATURE_EASE: string` from `src/lib/motion.ts`

- [ ] **Step 1: Install GSAP** (ASK before running, per CLAUDE.md)

Run (via project workflow): `pnpm add gsap`
Expected: `gsap` appears in `package.json` dependencies at `^3.13.x`.

- [ ] **Step 2: Create the plugin-registration module**

Create `src/lib/gsap.ts`:

```ts
"use client";

import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/** Register GSAP plugins exactly once, browser-only. Safe to call repeatedly. */
export function registerGsap(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);
  registered = true;
}

export { gsap };
```

- [ ] **Step 3: Create the reduced-motion helper**

Create `src/lib/motion.ts`:

```ts
"use client";

/** Emil Kowalski "out-expo" curve — the site's one motion signature. */
export const SIGNATURE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** True when the user has asked for reduced motion. SSR-safe (false on server). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

- [ ] **Step 4: Amend the constitution**

In `.claude/CLAUDE.md`:
- In `## Tech stack`, change the animation line: GSAP 3.13+ is the motion layer (SplitText/DrawSVG/ScrollTrigger).
- In the `**Do not install:**` line, REMOVE `gsap` from the list (keep framer-motion, three.js, etc.).
- Replace the `## Distinctive detail` (ECG) paragraph with: the signature is now a layered system — dual-type wordmark (primary), interleave-weave divider (replaces ECG), ink annotation (emphasis). Reference `docs/superpowers/specs/2026-07-06-signature-system-and-landing-design.md`.

- [ ] **Step 5: Verify + commit**

Run: `pnpm typecheck && pnpm build`
Expected: PASS (gsap resolves; no type errors).

```bash
git add package.json pnpm-lock.yaml src/lib/gsap.ts src/lib/motion.ts .claude/CLAUDE.md
git commit -m "feat: add GSAP motion foundation; retire ECG in constitution"
```

---

### Task 2: Interleave-weave divider (BUILD FIRST — slop-risk gut-check)

**Files:**
- Create: `src/components/signature/weave-divider.tsx`
- Modify: `src/app/page.tsx` (drop one `<WeaveDivider />` in temporarily to screenshot)

**Interfaces:**
- Produces: `<WeaveDivider className?: string />` (default export not used — named export)

Geometry rules (spec §2.2): two hairlines, maroon (`--color-accent`) + ink (`--color-foreground`), **asymmetric** crossings (3 crossings at non-uniform x), true **over/under occlusion** via a mask gap on the under-passing strand at each crossing, resolve into ONE stroke on the right, draw once via DrawSVG + ScrollTrigger, never loop. Reduced motion → render fully drawn.

- [ ] **Step 1: Write the component**

Create `src/components/signature/weave-divider.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Two asymmetric hairlines that braid over/under a center seam, then merge into
// one stroke on the right. Clinical (maroon) + technical (ink) → unified.
// viewBox 0..240 x, seam at y=20. Crossings at x=60, 108, 150 (asymmetric).
const CLINICAL = "M0 20 C 30 20, 40 8, 60 20 S 90 32, 108 20 S 138 8, 150 20 L 240 20";
const TECHNICAL = "M0 20 C 30 20, 40 32, 60 20 S 90 8, 108 20 S 138 32, 150 20 L 240 20";

export function WeaveDivider({ className = "" }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    const strands = root.querySelectorAll<SVGPathElement>("[data-strand]");

    if (prefersReducedMotion()) {
      gsap.set(strands, { drawSVG: "100%" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        strands,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 1.1,
          ease: "power2.inOut",
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`flex justify-center py-section-sm md:py-section ${className}`}>
      <svg
        ref={rootRef}
        viewBox="0 0 240 40"
        width="240"
        height="40"
        fill="none"
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          {/* mask punches small gaps in the under-strand at each crossing so it
              reads as passing BEHIND — without this it's a flat X, not a weave. */}
          <mask id="weave-over-under">
            <rect x="0" y="0" width="240" height="40" fill="white" />
            <circle cx="60" cy="20" r="4" fill="black" />
            <circle cx="108" cy="20" r="4" fill="black" />
            <circle cx="150" cy="20" r="4" fill="black" />
          </mask>
        </defs>
        <path
          data-strand
          d={TECHNICAL}
          stroke="var(--color-foreground)"
          strokeWidth="1.25"
          strokeLinecap="round"
          mask="url(#weave-over-under)"
        />
        <path
          data-strand
          d={CLINICAL}
          stroke="var(--color-accent)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Temporarily mount for screenshot**

In `src/app/page.tsx`, replace the `<EcgDivider />` line with `<WeaveDivider />` and its import (ECG is deleted in Task 5; this is the interim swap).

- [ ] **Step 3: Screenshot gut-check**

Run dev server; via Playwright MCP navigate to `http://localhost:3000`, scroll the divider into view, `browser_take_screenshot`. Confirm: hairline weight, over/under reads as a weave (not an X), asymmetric, resolves to one line. If it reads as braid-loader slop, adjust crossing x-values / mask radii before proceeding.

- [ ] **Step 4: Reduced-motion check**

Playwright: `browser_run_code_unsafe` to emulate `prefers-reduced-motion: reduce` (or resize/emulate), reload, confirm the weave renders fully-drawn and static.

- [ ] **Step 5: Commit**

```bash
git add src/components/signature/weave-divider.tsx src/app/page.tsx
git commit -m "feat: add interleave-weave signature divider"
```

---

### Task 3: Dual-type kinetic wordmark

**Files:**
- Create: `src/components/signature/wordmark.tsx`
- Modify: `src/components/nav.tsx` (swap the plain "Madhavi" link for `<Wordmark>`)

**Interfaces:**
- Consumes: `registerGsap`, `gsap` (`src/lib/gsap.ts`), `prefersReducedMotion` (`src/lib/motion.ts`)
- Produces: `<Wordmark animate?: boolean; className?: string />`. Constant `SPLIT_INDEX = 4` ("Madh" serif | "avi" mono).

Rules (spec §2.1): static split IS the signature. Serif half = Fraunces (`--font-serif`), mono half = JetBrains (`--font-mono`). Motion = one-time char settle, gated once/session via `sessionStorage`, sub-400ms, never re-fires on route change. Accessible name stays `Madhavi` via `aria-label` on the anchor + `aria-hidden` decorative spans.

- [ ] **Step 1: Write the component**

Create `src/components/signature/wordmark.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const NAME = "Madhavi";
const SPLIT_INDEX = 4; // "Madh" (serif) | "avi" (mono)
const SESSION_KEY = "wordmark-played";

export function Wordmark({
  animate = false,
  className = "",
}: {
  animate?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    registerGsap();
    const chars = el.querySelectorAll<HTMLElement>("[data-ch]");
    const ctx = gsap.context(() => {
      gsap.from(chars, {
        opacity: 0,
        y: "0.25em",
        duration: 0.32,
        ease: "power3.out",
        stagger: 0.03,
      });
    }, el);
    sessionStorage.setItem(SESSION_KEY, "1");
    return () => ctx.revert();
  }, [animate]);

  const chars = NAME.split("");
  return (
    <span ref={ref} aria-label={NAME} className={`inline-flex ${className}`}>
      {chars.map((ch, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed static string
          key={i}
          data-ch
          aria-hidden="true"
          className={
            i < SPLIT_INDEX
              ? "font-serif tracking-tight"
              : "font-mono tracking-tight"
          }
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
```

- [ ] **Step 2: Wire into the nav**

In `src/components/nav.tsx`, replace the wordmark `<Link>` content:

```tsx
<Link href="/" className="text-h3" aria-label="Madhavi — home">
  <Wordmark animate className="text-h3" />
</Link>
```

Add `import { Wordmark } from "@/components/signature/wordmark";`. The `<Link>` gets `aria-label`; the inner `<Wordmark>` spans stay `aria-hidden`.

- [ ] **Step 3: Verify build + accessible name**

Run: `pnpm typecheck && pnpm build` → PASS.
Playwright: `browser_snapshot`, confirm the nav link exposes accessible name containing "Madhavi" (not a per-character split).

- [ ] **Step 4: Screenshot static split at 3 widths**

Playwright screenshots at 1920/768/390 — confirm "Madh" renders serif, "avi" renders mono, one legible word, no CLS jump on load.

- [ ] **Step 5: Commit**

```bash
git add src/components/signature/wordmark.tsx src/components/nav.tsx
git commit -m "feat: add dual-type kinetic wordmark in nav"
```

---

### Task 4: Ink-annotation emphasis mark

**Files:**
- Create: `src/components/signature/ink-mark.tsx`

**Interfaces:**
- Produces: `<InkMark variant?: "underline" | "circle"; children: React.ReactNode; className?: string />`

Rules (spec §2.3): one confident maroon variable-width stroke (NOT RoughNotation wobble). Draws on when scrolled into view. Decorative `aria-hidden`; the wrapped text carries meaning. Reduced motion → static drawn. Ration to ~1 per viewport (enforced by usage, not code).

- [ ] **Step 1: Write the component**

Create `src/components/signature/ink-mark.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Clinician's chart-mark: a single confident maroon stroke under/around a word,
// drawn once on enter. `underline` = a slightly hand-weighted baseline stroke;
// `circle` = an open ellipse. Emphasis only → aria-hidden.
const UNDERLINE = "M2 8 C 40 12, 120 2, 198 7";
const CIRCLE = "M100 4 C 150 4, 196 10, 196 15 C 196 22, 120 26, 60 24 C 8 22, 4 14, 20 9 C 40 4, 90 4, 120 5";

export function InkMark({
  variant = "underline",
  children,
  className = "",
}: {
  variant?: "underline" | "circle";
  children: React.ReactNode;
  className?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();
    const path = pathRef.current;
    if (!path) return;
    if (prefersReducedMotion()) {
      gsap.set(path, { drawSVG: "100%" });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        path,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: path, start: "top 90%", once: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const isCircle = variant === "circle";
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-1 w-full"
        viewBox={isCircle ? "0 0 200 30" : "0 0 200 12"}
        height={isCircle ? 30 : 12}
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={isCircle ? CIRCLE : UNDERLINE}
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm build` → PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/signature/ink-mark.tsx
git commit -m "feat: add ink-annotation emphasis mark"
```

---

### Task 5: Remove the ECG divider

**Files:**
- Delete: `src/components/ecg-divider.tsx`
- Modify: `src/app/page.tsx` (remove any lingering ECG import — already swapped in Task 2)

- [ ] **Step 1: Delete + grep for stragglers**

```bash
git rm src/components/ecg-divider.tsx
grep -rn "ecg-divider\|EcgDivider" src/
```
Expected: no remaining references (Task 2 replaced the page usage).

- [ ] **Step 2: Verify + commit**

Run: `pnpm typecheck && pnpm build` → PASS.

```bash
git add -A
git commit -m "refactor: remove retired ECG divider"
```

---

### Task 6: Landing content model + work index rows

**Files:**
- Create: `src/content/landing.ts`
- Create: `src/components/work-row.tsx`

**Interfaces:**
- Produces: `FEATURED: ProjectRow[]`, `AFFILIATIONS: string[]`, `POSITIONING: string` from `src/content/landing.ts`
- Produces: `<WorkRow project: ProjectRow />` — a link-row (title · meta caption · summary · inline result · mono tech pills · links). NOT a card.

Content is real (Brand_Kit §11). Featured trio = CaseConnect · MedNavigator · Olfactory Odyssey.

- [ ] **Step 1: Create the content model**

Create `src/content/landing.ts`:

```ts
export type ProjectRow = {
  title: string;
  meta: string; // "domain · stack · year"
  summary: string;
  result?: string; // inline proof
  tags: string[];
  links: { label: string; href: string }[];
};

export const POSITIONING =
  "MBBS-trained clinician and IIT Madras data scientist building at the intersection of clinical AI, real-world evidence, and multimodal health.";

export const AFFILIATIONS = ["nference", "IIT Madras", "Andhra Medical College", "IAF"];

export const FEATURED: ProjectRow[] = [
  {
    title: "CaseConnect",
    meta: "Clinical AI · TypeScript / FastAPI · 2026",
    summary:
      "Full-stack clinical documentation + hospital management platform for the Indian healthcare ecosystem — microservices, a Whisper + scispaCy voice-AI pipeline, Kong gateway with JWT/RBAC, ABDM-compliant records.",
    result: "~67% documentation-time reduction",
    tags: ["React", "Node", "FastAPI", "PostgreSQL", "Redis"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/case-connect" }],
  },
  {
    title: "MedNavigator",
    meta: "Clinical AI · Python · 2026",
    summary:
      "Retrieval-augmented generation for evidence-based clinical research: BM25 + BGE dense embeddings + HyDE re-ranking over PubMed, with GRADE evidence-quality assessment in the answer layer.",
    tags: ["BM25", "BGE", "HyDE", "GRADE"],
    links: [{ label: "Repo", href: "https://github.com/maddydjie/med_navigator" }],
  },
  {
    title: "Olfactory Odyssey",
    meta: "Space Medicine · IAF · 2025",
    summary:
      "Cognitive consequences of olfactory inhibition in zero-G. Peer-reviewed research presented at IAF 2025.",
    tags: ["Peer-reviewed", "Research"],
    links: [],
  },
];
```

- [ ] **Step 2: Create the work row (link-list anatomy)**

Create `src/components/work-row.tsx`:

```tsx
import type { ProjectRow } from "@/content/landing";
import { Tag } from "@/components/tag";

export function WorkRow({ project }: { project: ProjectRow }) {
  return (
    <article className="border-border border-t py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-h3">{project.title}</h3>
        <p className="font-mono text-small text-muted-foreground tracking-wide">{project.meta}</p>
      </div>
      <p className="mt-3 max-w-reading text-body text-muted-foreground">{project.summary}</p>
      {project.result ? (
        <p className="mt-2 text-body text-accent">{project.result}</p>
      ) : null}
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
```

- [ ] **Step 3: Verify + commit**

Run: `pnpm typecheck` → PASS.

```bash
git add src/content/landing.ts src/components/work-row.tsx
git commit -m "feat: add landing content model and work-row link component"
```

---

### Task 7: Three hero variants + variant switch

**Files:**
- Create: `src/components/hero/hero-a.tsx` (wordmark-forward)
- Create: `src/components/hero/hero-b.tsx` (weave-forward)
- Create: `src/components/hero/hero-c.tsx` (ink-forward)
- Create: `src/components/hero/index.tsx` (selector)

**Interfaces:**
- Consumes: `Wordmark`, `WeaveDivider`, `InkMark`, `POSITIONING`, `AFFILIATIONS`
- Produces: `<Hero variant: "a" | "b" | "c" />` from `src/components/hero/index.tsx`

All three share the same content (positioning line + affiliation strip), varying only the signature emphasis (spec §5). Each is a server component except where it renders a client signature child (those are already `"use client"`).

- [ ] **Step 1: Hero A — wordmark-forward**

Create `src/components/hero/hero-a.tsx`:

```tsx
import { Section } from "@/components/section";
import { InkMark } from "@/components/signature/ink-mark";
import { Wordmark } from "@/components/signature/wordmark";
import { AFFILIATIONS, POSITIONING } from "@/content/landing";

export function HeroA() {
  return (
    <Section width="reading" className="pt-section pb-0">
      <Wordmark className="text-hero-lg" />
      <p className="mt-6 max-w-reading text-body">
        {POSITIONING.replace("clinical AI", "")}
        <InkMark>clinical AI</InkMark>, real-world evidence, and multimodal health.
      </p>
      <p className="mt-6 font-mono text-small text-muted-foreground">
        {AFFILIATIONS.join("  ·  ")}
      </p>
    </Section>
  );
}
```

(If the `POSITIONING.replace` split reads awkwardly, hardcode the two halves of the sentence around the `<InkMark>` — keep the full sentence intact and grammatical.)

- [ ] **Step 2: Hero B — weave-forward**

Create `src/components/hero/hero-b.tsx`:

```tsx
import { Section } from "@/components/section";
import { WeaveDivider } from "@/components/signature/weave-divider";
import { Wordmark } from "@/components/signature/wordmark";
import { AFFILIATIONS, POSITIONING } from "@/content/landing";

export function HeroB() {
  return (
    <Section width="reading" className="pt-section pb-0">
      <Wordmark className="text-hero" />
      <p className="mt-6 max-w-reading text-body text-muted-foreground">{POSITIONING}</p>
      <WeaveDivider className="!py-8" />
      <p className="font-mono text-small text-muted-foreground">{AFFILIATIONS.join("  ·  ")}</p>
    </Section>
  );
}
```

- [ ] **Step 3: Hero C — ink-forward**

Create `src/components/hero/hero-c.tsx`:

```tsx
import { Section } from "@/components/section";
import { InkMark } from "@/components/signature/ink-mark";
import { Wordmark } from "@/components/signature/wordmark";
import { AFFILIATIONS, POSITIONING } from "@/content/landing";

export function HeroC() {
  return (
    <Section width="reading" className="pt-section pb-0">
      <h1 className="text-hero-lg">
        <InkMark variant="circle">
          <Wordmark className="text-hero-lg" />
        </InkMark>
      </h1>
      <p className="mt-8 max-w-reading text-body text-muted-foreground">{POSITIONING}</p>
      <p className="mt-6 font-mono text-small text-muted-foreground">
        {AFFILIATIONS.join("  ·  ")}
      </p>
    </Section>
  );
}
```

- [ ] **Step 4: Selector**

Create `src/components/hero/index.tsx`:

```tsx
import { HeroA } from "./hero-a";
import { HeroB } from "./hero-b";
import { HeroC } from "./hero-c";

export function Hero({ variant }: { variant: "a" | "b" | "c" }) {
  if (variant === "b") return <HeroB />;
  if (variant === "c") return <HeroC />;
  return <HeroA />;
}
```

- [ ] **Step 5: Verify + commit**

Run: `pnpm typecheck && pnpm build` → PASS.

```bash
git add src/components/hero/
git commit -m "feat: add three A/B hero variants and selector"
```

---

### Task 8: Assemble the landing page

**Files:**
- Modify: `src/app/page.tsx` (full rebuild — remove scaffold harness)

**Interfaces:**
- Consumes: `Hero`, `WorkRow`, `WeaveDivider`, `FEATURED`. Reads `searchParams.v` for the variant.

- [ ] **Step 1: Rebuild the page**

Replace `src/app/page.tsx` entirely:

```tsx
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { WeaveDivider } from "@/components/signature/weave-divider";
import { WorkRow } from "@/components/work-row";
import { FEATURED } from "@/content/landing";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  const variant = v === "b" || v === "c" ? v : "a";

  return (
    <>
      <Hero variant={variant} />

      <WeaveDivider />

      <Section width="wide" as="div">
        <h2 id="work" className="text-h2">
          Selected work
        </h2>
        <div className="mt-8">
          {FEATURED.map((p) => (
            <WorkRow key={p.title} project={p} />
          ))}
        </div>
        <p className="mt-8 text-small">
          <Link href="/work" className="text-accent underline-offset-4 hover:underline">
            All work ↗
          </Link>
        </p>
      </Section>

      <Section width="reading" as="div" className="pt-0">
        <p className="text-small text-muted-foreground">
          I also{" "}
          <Link href="/photography" className="text-accent underline-offset-4 hover:underline">
            shoot photography
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm typecheck && pnpm build` → PASS. Confirm no `EcgDivider`, `ProjectCard`, `Prose`, `Tag` placeholder-harness imports remain in `page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble landing page with signature system"
```

---

### Task 9: A/B screenshots + reduced-motion evidence

**Files:** none (evidence-gathering)

- [ ] **Step 1: Start dev server**

Run (background, project workflow): `pnpm dev`. Wait for `:3000`.

- [ ] **Step 2: Capture each variant at 3 widths**

For `v` in `a`, `b`, `c` and width in 1920, 768, 390:
- Playwright `browser_resize` to the width (height 1080/1024/844).
- `browser_navigate` to `http://localhost:3000/?v=<v>`.
- `browser_take_screenshot` → save named `variant-<v>-<width>.png`.

(9 screenshots.)

- [ ] **Step 3: Reduced-motion capture**

Emulate `prefers-reduced-motion: reduce`, reload `/?v=a` at 1920, screenshot. Confirm wordmark static-split, weave fully-drawn, ink fully-drawn — all correct with zero motion.

- [ ] **Step 4: Present for A/B decision**

Show the 3 variants side-by-side (at 1920) to the owner and ask which wins. Do NOT delete losers yet — wait for the pick.

---

### Task 10: Finalize — prune losers, full verification

**Files:**
- Delete: the two losing `hero-<x>.tsx` (after owner picks)
- Modify: `src/components/hero/index.tsx` + `src/app/page.tsx` (drop the switch if only one hero remains)

- [ ] **Step 1: Apply the A/B decision**

Remove the two losing hero variants and simplify the selector/page to render the winner directly (drop `?v=` handling unless the owner wants to keep comparing).

- [ ] **Step 2: Keyboard + a11y pass**

Playwright: Tab through nav → hero links → work links. Confirm visible `:focus-visible` ring on each; confirm nav wordmark announces "Madhavi"; confirm no keyboard trap.

- [ ] **Step 3: Full preflight**

Run: `pnpm preflight` (lint + typecheck + build) → PASS. Paste output as evidence.

- [ ] **Step 4: Final screenshot of the shipped landing**

Screenshot the winning landing at 1920/768/390 as the completion record.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: finalize landing with chosen hero variant"
```

---

## Notes on verification approach

**Deferred:** spec §2.4 (variable-font axis-morph micro-detail) is an explicit optional stretch and is NOT part of this plan's success criteria. Revisit only after the wordmark ships and the owner decides it's wanted; if kept, it's a pure-CSS `font-variation-settings` hover on the hero "M" — no new task infra.

This repo has no unit-test runner (Biome only), and the deliverables are visual/motion Next components. Per the Global Constraints, each task's gate is `pnpm typecheck` + `pnpm build` + Playwright MCP screenshots + manual keyboard checks, not xUnit-style tests. The logic that IS pure (`prefersReducedMotion`, `SPLIT_INDEX`, the session gate) is trivial and verified by the build + the on-screen behavior in screenshots. Do not add a test framework to satisfy TDD form — the honest verification for this work is visual + typecheck + build.
