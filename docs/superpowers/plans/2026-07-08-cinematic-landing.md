# Cinematic Type-Reveal Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the landing as a bold, cinematic, GSAP-choreographed experience — dark type-reveal hero, full-bleed weave-wipe transitions, scroll-revealed work with generative per-project canvases, and an About headshot moment — with a bold static `prefers-reduced-motion` fallback.

**Architecture:** Reuse the Spec-1 signature components (Wordmark, weave geometry, InkMark) and amplify them. A tiny 2D-canvas harness (`canvas-base.ts`) powers all generative visuals with DPR caps, offscreen pausing, and a reduced-motion single-frame. Hero + section reveals are GSAP timelines/ScrollTriggers, each guarded by `prefersReducedMotion()`. The hero is a section-scoped dark ground (not a site-wide dark mode); the nav flips cream→ink at the seam.

**Tech Stack:** Next 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 (@theme) · GSAP 3.15 (SplitText, DrawSVG, ScrollTrigger) · 2D Canvas · Biome · pnpm.

## Global Constraints

- **Tokens only** — use `@theme` vars. New hero-scoped tokens: `--color-hero-bg: #14120E`, `--color-hero-fg: #f1eee6`, `--color-hero-muted: #a39c8e`, `--color-hero-accent: #d97a6c`, and `--text-hero-xl` (clamp). No hardcoded color elsewhere.
- **GSAP client-only** — every file importing gsap starts with `"use client"`; register once via `registerGsap()`, browser-guarded.
- **Reduced motion is load-bearing & universal** — every timeline/ScrollTrigger/canvas checks `prefersReducedMotion()`; when set, render the final state / paint one static frame. The reduced-motion landing must still look bold and deliberate.
- **Canvas discipline** — the per-project accent visuals are **2D canvas** (no WebGL): cap `devicePixelRatio` at 2; pause rAF offscreen via IntersectionObserver; cap element counts (each project ≤ ~200); all canvases `aria-hidden` + `pointer-events:none`.
- **Hero 3D object** — the hero centerpiece is a **WebGL** chrome torus-knot via React Three Fiber (`three`, `@react-three/fiber`, `@react-three/drei`). Amends `CLAUDE.md`'s "Do not install: three.js". Dynamically imported (`ssr: false`), `dpr={[1,2]}`, `aria-hidden`, `pointer-events:none`; under reduced motion `frameloop="demand"` → one static render.
- **Dark hero is section-scoped**, NOT a dark-mode toggle. Content below stays cream. Nav flips cream→ink at the seam; focus ring visible on both grounds.
- **One `<h1>`** (hero wordmark inside `<h1>`, name "Madhavi" via role="img"); `<h2>` per section. Nav accessible name stays "Madhavi".
- **Images:** Next `<Image>` only. Headshot target `public/headshot.webp` (≤2000px, <400KB); ship a placeholder now.
- **No unit-test runner in this repo — do NOT add one.** Verification per task = `corepack pnpm@latest typecheck` + `build` + `lint`, plus controller-run Playwright/headless-Chrome screenshots and DOM/state checks. TDD does not apply to visual/motion components. (pnpm via corepack + public-registry flag per the `portfolio-build-workflow` memory.)
- **Commits:** conventional, NO Co-authored-by / Generated-with. Branch `feat/signature-system` (continues from Spec 1; unmerged).
- **Spec:** `docs/superpowers/specs/2026-07-08-cinematic-landing-design.md`.

---

### Task 1: Motion-foundation additions (SplitText, timeline util, dark-hero tokens)

**Files:**
- Modify: `src/lib/gsap.ts` (re-add SplitText)
- Create: `src/lib/timeline.ts`
- Modify: `src/styles/globals.css` (hero tokens + `--text-hero-xl`)

**Interfaces:**
- Produces: `registerGsap()` now also registers `SplitText`; `gsap` re-export unchanged.
- Produces: `playOncePerSession(key: string): boolean` and `wireSkip(tl: gsap.core.Timeline): () => void` from `src/lib/timeline.ts`.

- [ ] **Step 1: Re-add SplitText to registration**

In `src/lib/gsap.ts`, add the import and include it in `registerPlugin`:

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

- [ ] **Step 2: Create the timeline helper**

Create `src/lib/timeline.ts`:

```ts
"use client";

import type { gsap } from "@/lib/gsap";

/** True the first time it's called with `key` this session; false afterward. */
export function playOncePerSession(key: string): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(key)) return false;
  sessionStorage.setItem(key, "1");
  return true;
}

/**
 * Let the user skip an intro timeline: the first scroll/keydown/pointerdown
 * seeks it to the end. Returns a cleanup that removes the listeners.
 */
export function wireSkip(tl: gsap.core.Timeline): () => void {
  const skip = () => {
    tl.progress(1);
  };
  const opts = { once: true, passive: true } as const;
  window.addEventListener("wheel", skip, opts);
  window.addEventListener("keydown", skip, opts);
  window.addEventListener("pointerdown", skip, opts);
  return () => {
    window.removeEventListener("wheel", skip);
    window.removeEventListener("keydown", skip);
    window.removeEventListener("pointerdown", skip);
  };
}
```

- [ ] **Step 3: Add hero tokens + xl type to globals**

In `src/styles/globals.css`, inside the `@theme { ... }` block, add after the existing color tokens:

```css
  /* --- dark cinematic hero (section-scoped, NOT a dark-mode toggle) --- */
  --color-hero-bg: #14120e;
  --color-hero-fg: #f1eee6;
  --color-hero-muted: #a39c8e;
  --color-hero-accent: #d97a6c;
```

and after `--text-hero-lg--line-height`:

```css
  --text-hero-xl: clamp(4rem, 14vw, 12rem);
  --text-hero-xl--line-height: 0.92;
```

- [ ] **Step 4: Verify + commit**

Run: `corepack pnpm@latest typecheck && corepack pnpm@latest build && corepack pnpm@latest lint`
Expected: all pass. (SplitText resolves from node_modules; tokens generate `bg-hero-bg`, `text-hero-fg`, `text-hero-xl` utilities.)

```bash
git add src/lib/gsap.ts src/lib/timeline.ts src/styles/globals.css
git commit -m "feat: motion-foundation additions for cinematic landing (SplitText, timeline util, hero tokens)"
```

---

### Task 2: Canvas harness (`canvas-base.ts`)

**Files:**
- Create: `src/components/visual/canvas-base.ts`

**Interfaces:**
- Produces: `type CanvasDraw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;`
- Produces: `mountCanvas(canvas: HTMLCanvasElement, draw: CanvasDraw, opts?: { staticOnly?: boolean }): () => void` — returns a cleanup fn. Handles DPR cap (2), ResizeObserver, IntersectionObserver pause, and a single static frame under reduced motion.

- [ ] **Step 1: Write the harness**

Create `src/components/visual/canvas-base.ts`:

```ts
"use client";

import { prefersReducedMotion } from "@/lib/motion";

export type CanvasDraw = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) => void;

/**
 * Mount a 2D-canvas animation. Caps DPR at 2, tracks size via ResizeObserver,
 * pauses the rAF loop when the canvas is offscreen (IntersectionObserver), and
 * paints exactly one static frame under prefers-reduced-motion (or staticOnly).
 * Returns a cleanup function that stops the loop and disconnects observers.
 */
export function mountCanvas(
  canvas: HTMLCanvasElement,
  draw: CanvasDraw,
  opts: { staticOnly?: boolean } = {},
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let raf = 0;
  let running = false;
  const start = performance.now();

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!running) draw(ctx, w, h, 0);
  }

  function frame() {
    draw(ctx, w, h, (performance.now() - start) / 1000);
    raf = requestAnimationFrame(frame);
  }
  function play() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const staticFrame = opts.staticOnly || prefersReducedMotion();
  let io: IntersectionObserver | null = null;
  if (staticFrame) {
    draw(ctx, w, h, 0);
  } else {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) play();
          else stop();
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);
  }

  return () => {
    stop();
    ro.disconnect();
    io?.disconnect();
  };
}
```

- [ ] **Step 2: Verify + commit**

Run: `corepack pnpm@latest typecheck && corepack pnpm@latest lint`
Expected: pass (no consumer yet; build not required until a component uses it, but typecheck must pass).

```bash
git add src/components/visual/canvas-base.ts
git commit -m "feat: 2D canvas harness (DPR cap, offscreen pause, reduced-motion static frame)"
```

---

### Task 3: 3D chrome-knot signature (React Three Fiber)

**Files:**
- Modify: `package.json` (add `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`)
- Modify: `.claude/CLAUDE.md` (remove `three.js` from the do-not-install list)
- Create: `src/components/visual/chrome-knot.tsx`

**Interfaces:**
- Consumes: `prefersReducedMotion` (`src/lib/motion.ts`).
- Produces: `<ChromeKnot className?: string />` — an aria-hidden R3F `<Canvas>` rendering a slowly-rotating chrome torus-knot (the interleave-weave as a 3D braided knot) with maroon-tinted reflections. Reduced motion → single static render.

Design: the object IS the signature in 3D — a torus-knot (`p=2, q=3`, a trefoil braid) in a chrome material (metalness 1, low roughness) lit by drei `<Lightformer>`s inside `<Environment>` (NO external HDR/CDN — reflections come from in-scene lightformers, keeping it self-contained). Slow auto-rotation + subtle cursor parallax. Transparent background so it floats over the dark hero.

- [ ] **Step 1: Install the 3D deps** (ASK before running, per CLAUDE.md — the owner approved React Three Fiber)

Run (project workflow):
`NPM_CONFIG_REGISTRY=https://registry.npmjs.org/ COREPACK_NPM_REGISTRY=https://registry.npmjs.org/ corepack pnpm@latest add three @react-three/fiber @react-three/drei --registry=https://registry.npmjs.org/`
then dev-dep types:
`corepack pnpm@latest add -D @types/three --registry=https://registry.npmjs.org/`
Expected: the four packages land in `package.json`. (If `three`'s peer wants a specific React version, `@react-three/fiber` v9 supports React 19 — confirm fiber ≥ 9 resolves; if it pins React 18, report back before forcing.)

- [ ] **Step 2: Amend the constitution**

In `.claude/CLAUDE.md`, remove `three.js` from the `**Do not install:**` line (keep framer-motion and the rest). Add a short note under the tech-stack that React Three Fiber powers the hero 3D signature object.

- [ ] **Step 3: Write the component**

Create `src/components/visual/chrome-knot.tsx`:

```tsx
"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { prefersReducedMotion } from "@/lib/motion";

function Knot({ reduce }: { reduce: boolean }) {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    const m = ref.current;
    if (!m || reduce) return;
    m.rotation.x += delta * 0.14;
    m.rotation.y += delta * 0.2;
    // subtle cursor parallax (pointer is -1..1)
    m.rotation.z += (state.pointer.x * 0.25 - m.rotation.z) * 0.05;
  });
  return (
    <mesh ref={ref} rotation={[0.3, 0.2, 0]}>
      {/* torus-knot p=2,q=3 = a trefoil braid — the weave in 3D */}
      <torusKnotGeometry args={[1, 0.34, 240, 32, 2, 3]} />
      <meshStandardMaterial color="#d97a6c" metalness={1} roughness={0.08} envMapIntensity={1.5} />
    </mesh>
  );
}

export function ChromeKnot({ className = "" }: { className?: string }) {
  const reduce = prefersReducedMotion();
  return (
    <Canvas
      aria-hidden
      dpr={[1, 2]}
      frameloop={reduce ? "demand" : "always"}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className={`pointer-events-none !absolute inset-0 ${className}`}
    >
      <ambientLight intensity={0.35} />
      <Knot reduce={reduce} />
      {/* self-contained reflections — no external HDR/CDN */}
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[3, 3, 2]} scale={[5, 5, 1]} />
        <Lightformer intensity={1.3} color="#8b2e2a" position={[-4, 1, 1]} scale={[4, 4, 1]} />
        <Lightformer intensity={1.6} position={[0, -3, 2]} scale={[6, 3, 1]} />
      </Environment>
    </Canvas>
  );
}
```

> Perf/SSR: this is client + WebGL — it is consumed via a `dynamic(..., { ssr: false })` import in the hero (Task 4), so it never enters the server render. Reduced motion sets `frameloop="demand"` → R3F renders once and idles. If the gut-check shows the knot too large/small, tune `torusKnotGeometry` radius or camera `position[2]`.

- [ ] **Step 4: Verify + commit**

Run: `corepack pnpm@latest typecheck && corepack pnpm@latest build && corepack pnpm@latest lint`
Expected: all pass. (Build must succeed with the WebGL component tree-shaken behind the dynamic import; if `three` triggers a server-side `window` error, confirm the dynamic `ssr:false` import in Task 4 — this component is never imported statically by a server file.)

```bash
git add package.json pnpm-lock.yaml .claude/CLAUDE.md src/components/visual/chrome-knot.tsx
git commit -m "feat: 3D chrome torus-knot hero signature (React Three Fiber); un-ban three.js"
```

---

### Task 4: Cinematic hero (`hero-cinematic.tsx`) + temporary mount for gut-check

**Files:**
- Create: `public/hero-portrait-placeholder.svg`
- Create: `src/components/hero/hero-cinematic.tsx`
- Modify: `src/app/page.tsx` (temporarily render `<HeroCinematic />` at top for the gut-check)

**Interfaces:**
- Consumes: `Wordmark` (Spec 1; renders `[data-ch]` spans, no `animate` prop), `ChromeKnot` (Task 3, via `dynamic ssr:false`), `registerGsap`/`gsap`, `prefersReducedMotion`, `playOncePerSession`, `wireSkip`, `POSITIONING`, `AFFILIATIONS`, Next `Image`.
- Produces: `<HeroCinematic />` — a dark full-bleed hero with the 3D chrome knot, a small moody portrait, mono corner labels, and an on-load GSAP timeline.

Design: dark section (`bg-hero-bg`), min-h ~92vh. `ChromeKnot` floats in the right half (dynamic, ssr:false, desktop only). Left: `<h1>` wrapping the giant `Wordmark` (`text-hero-xl`), the positioning line as word-spans, a small moody b&w portrait beside the affiliation strip, a scroll cue. Mono corner labels absolute-positioned. On mount: reduced-motion / already-played → `gsap.set` final; else once-per-session timeline (letters assemble → words reveal → fades), skippable.

- [ ] **Step 1: Hero portrait placeholder**

Create `public/hero-portrait-placeholder.svg` (a small dark moody square; real target `public/hero-portrait.webp`):

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#1d1a15"/>
  <circle cx="200" cy="170" r="66" fill="#2e2a22"/>
  <path d="M96 400 C 96 300, 304 300, 304 400 Z" fill="#2e2a22"/>
  <text x="200" y="380" text-anchor="middle" font-family="monospace" font-size="16" fill="#5a5348">hero-portrait.webp</text>
</svg>
```

- [ ] **Step 2: Write the component**

Create `src/components/hero/hero-cinematic.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Wordmark } from "@/components/signature/wordmark";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { playOncePerSession, wireSkip } from "@/lib/timeline";
import { AFFILIATIONS, POSITIONING } from "@/content/landing";

// WebGL knot: client + browser-only, never server-rendered.
const ChromeKnot = dynamic(
  () => import("@/components/visual/chrome-knot").then((m) => m.ChromeKnot),
  { ssr: false },
);

const WORDS = POSITIONING.split(" ");

export function HeroCinematic() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    registerGsap();

    const chars = el.querySelectorAll<HTMLElement>("[data-ch]");
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const fades = el.querySelectorAll<HTMLElement>("[data-fade]");

    if (prefersReducedMotion() || !playOncePerSession("hero-cinematic")) {
      gsap.set([chars, words, fades], { opacity: 1, y: 0 });
      return;
    }

    let cleanupSkip = () => {};
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(chars, { opacity: 0, yPercent: 40, stagger: 0.045, duration: 0.5 })
        .from(words, { opacity: 0, y: 12, stagger: 0.06, duration: 0.4 }, "-=0.1")
        .from(fades, { opacity: 0, y: 10, stagger: 0.12, duration: 0.5 }, "-=0.15");
      cleanupSkip = wireSkip(tl);
    }, el);

    return () => {
      cleanupSkip();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden bg-hero-bg px-6 text-hero-fg"
    >
      {/* 3D chrome signature, floating right (desktop) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block" aria-hidden="true">
        <ChromeKnot />
      </div>
      <div className="relative mx-auto w-full max-w-wide">
        <h1 className="text-hero-xl leading-[0.92]">
          <Wordmark className="text-hero-xl" />
        </h1>
        <p className="mt-8 max-w-reading text-hero-fg text-body">
          {WORDS.map((word, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed static string
              key={i}
              data-word
              className="inline-block whitespace-pre"
            >
              {word}
              {i < WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <div data-fade className="mt-8 flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-hero-muted/30">
            <Image
              src="/hero-portrait-placeholder.svg"
              alt="Portrait of BVS Madhavi"
              fill
              sizes="64px"
              className="object-cover [filter:grayscale(1)_contrast(1.1)]"
            />
          </div>
          <p className="font-mono text-hero-muted text-small">{AFFILIATIONS.join("  ·  ")}</p>
        </div>
        <p data-fade className="mt-14 font-mono text-hero-muted text-small tracking-widest">
          scroll ↓
        </p>
      </div>

      {/* editorial corner meta-labels */}
      <span className="absolute bottom-6 left-6 font-mono text-hero-muted text-small">©2026</span>
      <span className="absolute right-6 bottom-6 font-mono text-hero-muted text-small tracking-wide">
        MBBS · IIT MADRAS
      </span>
    </section>
  );
}
```

> Notes: `Wordmark` with no `animate` prop renders static `[data-ch]` spans that the hero timeline drives. The `ChromeKnot` is hidden below `md` (mobile gets the type-led hero without WebGL cost); if the gut-check wants it on mobile, drop `hidden md:block`. The portrait + corner labels are part of the `data-fade` reveal / static ground.

- [ ] **Step 3: Temporarily mount for the gut-check**

In `src/app/page.tsx`, import `HeroCinematic` and render it as the FIRST child (above the existing `<HeroA />`), leaving the rest for now. This is interim — full assembly is Task 10.

- [ ] **Step 4: Verify build**

Run: `corepack pnpm@latest typecheck && corepack pnpm@latest build && corepack pnpm@latest lint`
Expected: all pass (the `dynamic ssr:false` import keeps the WebGL knot out of the server render).

- [ ] **Step 5: Commit**

```bash
git add public/hero-portrait-placeholder.svg src/components/hero/hero-cinematic.tsx src/app/page.tsx
git commit -m "feat: cinematic dark type-reveal hero (chrome knot, portrait, corner labels)"
```

> **CONTROLLER GUT-CHECK AFTER THIS TASK:** production build + `next start`, headless-Chrome screenshot at 1920 (reduced-motion for a deterministic end-frame) + a normal-motion DOM/state check that the timeline runs and settles and the WebGL knot renders; confirm the dark hero + giant wordmark + word reveal + chrome knot + portrait read as "awe," no overflow. Get owner thumbs-up before Tasks 5-10.

---

### Task 5: Weave-wipe transition (`weave-wipe.tsx`)

**Files:**
- Create: `src/components/visual/weave-wipe.tsx`

**Interfaces:**
- Consumes: `registerGsap`/`gsap`, `prefersReducedMotion`.
- Produces: `<WeaveWipe className?: string />` — a full-bleed weave whose draw is scrubbed by scroll (pinned), resolving to a single stroke. Reduced motion → fully drawn static, no pin.

- [ ] **Step 1: Write the component**

Create `src/components/visual/weave-wipe.tsx`:

```tsx
"use client";

import { useEffect, useId, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Full-width weave: two asymmetric hairlines braid over/under a seam and merge.
// Draw progress is scrubbed by scroll while the section is pinned.
const CLINICAL =
  "M0 20 C 120 20, 160 6, 240 20 S 360 34, 480 20 S 600 6, 720 20 L 1000 20";
const TECHNICAL =
  "M0 20 C 120 20, 160 34, 240 20 S 360 6, 480 20 S 600 34, 720 20 L 1000 20";

export function WeaveWipe({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const maskId = rawId.replace(/:/g, "");

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const strands = el.querySelectorAll<SVGPathElement>("[data-strand]");

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
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={`w-full px-6 py-section ${className}`}>
      <svg
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
        className="h-10 w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="1000" height="40" fill="white" />
            <circle cx="240" cy="20" r="5" fill="black" />
            <circle cx="480" cy="20" r="5" fill="black" />
            <circle cx="720" cy="20" r="5" fill="black" />
          </mask>
        </defs>
        <path
          data-strand
          d={TECHNICAL}
          stroke="var(--color-foreground)"
          strokeWidth="1.25"
          strokeLinecap="round"
          mask={`url(#${maskId})`}
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

- [ ] **Step 2: Verify + commit**

Run: `corepack pnpm@latest typecheck && corepack pnpm@latest build && corepack pnpm@latest lint`
Expected: pass.

```bash
git add src/components/visual/weave-wipe.tsx
git commit -m "feat: full-bleed scroll-scrubbed weave-wipe transition"
```

---

### Task 6: Content additions — bio + project visual keys

**Files:**
- Modify: `src/content/landing.ts` (add `BIO`, extend `ProjectRow` with `visual` key)

**Interfaces:**
- Produces: `BIO: string`; `ProjectRow` gains `visual?: "lattice" | "field" | "drift"`; `FEATURED` entries set `visual`.

- [ ] **Step 1: Extend content**

In `src/content/landing.ts`: add `visual?: "lattice" | "field" | "drift";` to the `ProjectRow` type; set `visual: "lattice"` on CaseConnect, `visual: "field"` on MedNavigator, `visual: "drift"` on Olfactory Odyssey; and append:

```ts
export const BIO =
  "Clinician by training, engineer by practice. I build clinical AI that stands up to real-world evidence — from hospital-floor documentation systems to retrieval pipelines over the medical literature.";
```

- [ ] **Step 2: Verify + commit**

Run: `corepack pnpm@latest typecheck && corepack pnpm@latest lint`
Expected: pass.

```bash
git add src/content/landing.ts
git commit -m "feat: add landing bio and per-project visual keys"
```

---

### Task 7: Generative project visuals (lattice / field / drift)

**Files:**
- Create: `src/components/visual/proj-lattice.tsx`
- Create: `src/components/visual/proj-field.tsx`
- Create: `src/components/visual/proj-drift.tsx`
- Create: `src/components/visual/project-visual.tsx` (a switch by key)

**Interfaces:**
- Consumes: `mountCanvas`, `CanvasDraw` (Task 2).
- Produces: `<ProjectVisual kind: "lattice" | "field" | "drift" />` rendering the right canvas. Each canvas is aria-hidden, ≤ ~200 elements, `pointer-events:none`, reduced-motion static.

- [ ] **Step 1: Lattice (CaseConnect — connected systems nodes)**

Create `src/components/visual/proj-lattice.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { type CanvasDraw, mountCanvas } from "./canvas-base";

const N = 26;

export function ProjLattice() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      ph: Math.random() * Math.PI * 2,
    }));
    const draw: CanvasDraw = (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(139,46,42,0.35)";
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          if (dx * dx + dy * dy < 70 * 70) {
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(14,17,22,0.75)";
      for (const n of nodes) {
        const r = 1.6 + Math.sin(t * 1.5 + n.ph) * 0.6;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    return mountCanvas(c, draw);
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none h-full w-full" />;
}
```

- [ ] **Step 2: Field (MedNavigator — points converging to a retrieval line)**

Create `src/components/visual/proj-field.tsx` — same structure as lattice, but the draw scatters ~120 faint accent points that drift horizontally toward a vertical "query" line at x≈0.5, wrapping when they cross:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { type CanvasDraw, mountCanvas } from "./canvas-base";

const N = 120;

export function ProjField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: 0.0008 + Math.random() * 0.0016,
    }));
    const draw: CanvasDraw = (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(139,46,42,0.4)";
      ctx.beginPath();
      ctx.moveTo(w * 0.5, 0);
      ctx.lineTo(w * 0.5, h);
      ctx.stroke();
      ctx.fillStyle = "rgba(14,17,22,0.55)";
      for (const p of pts) {
        p.x += p.x < 0.5 ? p.s : -p.s;
        if (Math.abs(p.x - 0.5) < 0.004) p.x = Math.random() < 0.5 ? 0 : 1;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    return mountCanvas(c, draw);
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none h-full w-full" />;
}
```

- [ ] **Step 3: Drift (Olfactory Odyssey — molecular scent drift)**

Create `src/components/visual/proj-drift.tsx` — ~40 slow-rising particles with faint bonds to nearest neighbour, drifting upward and wrapping:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { type CanvasDraw, mountCanvas } from "./canvas-base";

const N = 40;

export function ProjDrift() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ps = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      d: 0.0004 + Math.random() * 0.0008,
      w: 0.2 + Math.random() * 0.6,
    }));
    const draw: CanvasDraw = (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(139,46,42,0.5)";
      for (const p of ps) {
        p.y -= p.d;
        p.x += Math.sin(t * 0.5 + p.w * 6) * 0.0003;
        if (p.y < 0) p.y = 1;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    return mountCanvas(c, draw);
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none h-full w-full" />;
}
```

- [ ] **Step 4: Switch component**

Create `src/components/visual/project-visual.tsx`:

```tsx
import { ProjDrift } from "./proj-drift";
import { ProjField } from "./proj-field";
import { ProjLattice } from "./proj-lattice";

export function ProjectVisual({ kind }: { kind: "lattice" | "field" | "drift" }) {
  if (kind === "field") return <ProjField />;
  if (kind === "drift") return <ProjDrift />;
  return <ProjLattice />;
}
```

- [ ] **Step 5: Verify + commit**

Run: `corepack pnpm@latest typecheck && corepack pnpm@latest lint`
Expected: pass.

```bash
git add src/components/visual/proj-lattice.tsx src/components/visual/proj-field.tsx src/components/visual/proj-drift.tsx src/components/visual/project-visual.tsx
git commit -m "feat: generative per-project canvas visuals (lattice/field/drift)"
```

---

### Task 8: Work section with scroll-reveal + visuals (`work-section.tsx`)

**Files:**
- Create: `src/components/work-section.tsx`

**Interfaces:**
- Consumes: `FEATURED` (with `visual` keys), `ProjectVisual`, `registerGsap`/`gsap`, `prefersReducedMotion`, `Tag`.
- Produces: `<WorkSection />` — the "Selected work" heading + featured rows, each with its `ProjectVisual` and a clip-reveal-on-scroll. Reduced motion → rows visible, no animation.

- [ ] **Step 1: Write the component**

Create `src/components/work-section.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Section } from "@/components/section";
import { Tag } from "@/components/tag";
import { ProjectVisual } from "@/components/visual/project-visual";
import { FEATURED } from "@/content/landing";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function WorkSection() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const rows = el.querySelectorAll<HTMLElement>("[data-row]");
    if (prefersReducedMotion()) {
      gsap.set(rows, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      for (const row of rows) {
        gsap.from(row, {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Section width="wide" as="div">
      <h2 id="work" className="text-h2">
        Selected work
      </h2>
      <div ref={root} className="mt-10">
        {FEATURED.map((p) => (
          <article
            key={p.title}
            data-row
            className="grid grid-cols-1 gap-4 border-border border-t py-10 md:grid-cols-[1fr_180px] md:items-center"
          >
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-h3">{p.title}</h3>
                <p className="font-mono text-muted-foreground text-small tracking-wide">{p.meta}</p>
              </div>
              <p className="mt-3 max-w-reading text-body text-muted-foreground">{p.summary}</p>
              {p.result ? <p className="mt-2 text-accent text-body">{p.result}</p> : null}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="ml-1 text-accent text-small underline-offset-4 hover:underline"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
            {p.visual ? (
              <div className="h-24 w-full overflow-hidden rounded-sm border border-border md:h-28" aria-hidden="true">
                <ProjectVisual kind={p.visual} />
              </div>
            ) : null}
          </article>
        ))}
      </div>
      <p className="mt-10 text-small">
        <Link href="/work" className="text-accent underline-offset-4 hover:underline">
          All work ↗
        </Link>
      </p>
    </Section>
  );
}
```

> Note: this replaces the Spec-1 `WorkRow` usage on the landing; `work-row.tsx` stays in the repo for reuse on the future /work page. Results are strings ("~67% …") shown as-is.

- [ ] **Step 2: Verify + commit**

Run: `corepack pnpm@latest typecheck && corepack pnpm@latest build && corepack pnpm@latest lint`
Expected: pass.

```bash
git add src/components/work-section.tsx
git commit -m "feat: scroll-revealed work section with generative project visuals"
```

---

### Task 9: About moment with headshot reveal (`about-moment.tsx` + placeholder)

**Files:**
- Create: `public/headshot-placeholder.svg`
- Create: `src/components/about-moment.tsx`

**Interfaces:**
- Consumes: `registerGsap`/`gsap`, `prefersReducedMotion`, `BIO`, Next `Image`.
- Produces: `<AboutMoment />` — a headshot (placeholder `Image`) with a masked clip-reveal on scroll + duotone treatment, `BIO`, and a link to `/about`.

- [ ] **Step 1: Placeholder silhouette**

Create `public/headshot-placeholder.svg` (a neutral portrait silhouette on the surface tone):

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="#f3f1ea"/>
  <circle cx="400" cy="380" r="150" fill="#d8d2c4"/>
  <path d="M180 1000 C 180 720, 620 720, 620 1000 Z" fill="#d8d2c4"/>
  <text x="400" y="960" text-anchor="middle" font-family="monospace" font-size="26" fill="#8a8474">headshot.webp</text>
</svg>
```

- [ ] **Step 2: About component**

Create `src/components/about-moment.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/section";
import { BIO } from "@/content/landing";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function AboutMoment() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const img = el.querySelector<HTMLElement>("[data-portrait]");
    const copy = el.querySelectorAll<HTMLElement>("[data-copy]");
    if (!img) return;
    if (prefersReducedMotion()) {
      gsap.set([img, copy], { clipPath: "inset(0% 0 0 0)", opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 75%", once: true } })
        .from(img, { clipPath: "inset(100% 0 0 0)", duration: 0.8, ease: "power3.out" })
        .from(copy, { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 }, "-=0.4");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Section width="wide" as="div">
      <div ref={root} className="grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr] md:items-center">
        <div
          data-portrait
          className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border"
        >
          <Image
            src="/headshot-placeholder.svg"
            alt="Portrait of BVS Madhavi"
            fill
            sizes="300px"
            className="object-cover [filter:grayscale(1)_contrast(1.05)]"
          />
        </div>
        <div>
          <h2 data-copy className="text-h2">
            About
          </h2>
          <p data-copy className="mt-4 max-w-reading text-body text-muted-foreground">
            {BIO}
          </p>
          <p data-copy className="mt-6 text-small">
            <Link href="/about" className="text-accent underline-offset-4 hover:underline">
              More about me ↗
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Verify + commit**

Run: `corepack pnpm@latest typecheck && corepack pnpm@latest build && corepack pnpm@latest lint`
Expected: pass. (Next `<Image>` with an SVG in `public/` renders; `fill` needs the positioned parent — provided.)

```bash
git add public/headshot-placeholder.svg src/components/about-moment.tsx
git commit -m "feat: about moment with headshot reveal + placeholder"
```

---

### Task 10: Scroll-linked nav + full page assembly

**Files:**
- Modify: `src/components/nav.tsx` (client; transparent over hero, flip cream→ink on scroll)
- Modify: `src/app/page.tsx` (final assembly)

**Interfaces:**
- Consumes: everything above.
- Produces: the assembled cinematic landing; a nav that is fixed, transparent over the dark hero (cream text), and flips to the cream/ink treatment once scrolled past ~80vh.

- [ ] **Step 1: Scroll-linked nav**

Replace `src/components/nav.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`flex w-full max-w-wide items-center justify-between rounded-full border px-5 py-3 transition-colors duration-300 ${
          scrolled
            ? "border-border bg-background/85 text-foreground backdrop-blur"
            : "border-hero-fg/15 bg-hero-bg/40 text-hero-fg backdrop-blur-sm"
        }`}
      >
        <Link href="/" className="text-h3" aria-label="Madhavi — home">
          <Wordmark animate className="text-h3" />
        </Link>
        <ul className="hidden items-center gap-6 text-small sm:flex">
          {items.map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                className="opacity-80 transition-opacity hover:text-accent hover:opacity-100"
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
```

> The nav is a **floating pill** (rounded, backdrop-blur), fixed near the top. Over the dark hero it is a faint dark pill with cream text; past ~80vh it becomes a cream pill with ink text. Focus ring must stay visible on both — the global `:focus-visible` maroon outline works on both grounds.

> The nav is now `fixed`. `layout.tsx` renders `<Nav />` then `<main>`; since the hero is full-bleed and starts at the top, the fixed nav overlays it correctly. Do NOT add top padding to `<main>` — the hero intentionally sits under the transparent nav. (Other pages that are NOT the cinematic hero will need their own top spacing in a later spec; out of scope here.)

- [ ] **Step 2: Assemble the page**

Replace `src/app/page.tsx`:

```tsx
import { HeroCinematic } from "@/components/hero/hero-cinematic";
import { Section } from "@/components/section";
import { AboutMoment } from "@/components/about-moment";
import { WeaveWipe } from "@/components/visual/weave-wipe";
import { WorkSection } from "@/components/work-section";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroCinematic />
      <WeaveWipe />
      <WorkSection />
      <WeaveWipe />
      <AboutMoment />
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

- [ ] **Step 3: Verify build**

Run: `corepack pnpm@latest typecheck && corepack pnpm@latest build && corepack pnpm@latest lint`
Expected: all pass. Confirm no leftover imports of `HeroA`/`WorkRow` in `page.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx src/app/page.tsx
git commit -m "feat: scroll-linked nav + assembled cinematic landing"
```

---

### Task 11 (controller): full verification

**Files:** none (evidence-gathering; controller-run).

- [ ] **Step 1:** production build + `next start`.
- [ ] **Step 2:** headless-Chrome screenshots at 1920 / 1024 / 768 / 390 (force reduced-motion for deterministic frames), plus a normal-motion DOM/state check that hero timeline, weave scrub, work reveals, and about reveal run and settle; confirm canvases paint and pause offscreen.
- [ ] **Step 3:** DOM overflow check at 390 (`scrollWidth === clientWidth`).
- [ ] **Step 4:** keyboard pass — Tab through nav (on dark hero AND after scroll to cream), hero, work links, about link; confirm visible focus on both grounds; nav announces "Madhavi".
- [ ] **Step 5:** present the shipped landing to the owner; prune/tune per feedback; then final whole-branch review.

---

## Self-review notes

Spec coverage: dark hero §4.1 → T1(tokens)+T4; 3D chrome knot §0.b.6 → T3 (+ three/R3F deps + un-ban); hero portrait §0.b.7 + corner labels §0.b.9 → T4; weave-wipe §4.2 → T5; work + project visuals §4.3 → T6/T7/T8; about §4.4 → T9; pill nav §0.b.8 + flip seam §2 → T10; motion foundation §3 → T1/T2; reduced-motion parity → every component task; verification §6 → T11. SplitText re-add §0.5 → T1. Portrait placeholders → T4 (hero) + T9 (about).

Verification approach: this repo has NO unit-test runner (Biome only) and the deliverables are visual/motion/canvas components. Per Global Constraints, each task's gate is `typecheck` + `build` + `lint` + controller screenshots/DOM checks — not xUnit tests. Do not add a test framework to satisfy TDD form; the honest verification here is compile + visual + state inspection.

Deferred/known: real hero portrait + About headshot pending (placeholders ship); chrome knot is desktop-only (hidden `md`), enable on mobile only if the gut-check wants it; count-up dropped (YAGNI — landing results are strings, not numeric). `@react-three/fiber` must resolve for React 19 (v9+) — confirm at install (T3 step 1).
