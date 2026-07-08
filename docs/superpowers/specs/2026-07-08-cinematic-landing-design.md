# Spec 2 — Cinematic Type-Reveal Landing (Bold Immersive)

**Date:** 2026-07-08
**Status:** Draft for review
**Owner:** BVS Madhavi
**Supersedes/amends:** Spec 1 (`2026-07-06-signature-system-and-landing-design.md`) — the minimal landing hero. Keeps and *amplifies* the signature components; does not delete them.

---

## 0. Decisions that supersede prior docs

Directed by the owner (2026-07-08). These amend the standing "editorial-minimal" constitution.

1. **Register: bold immersive.** The landing becomes a cinematic, motion-led experience. `CLAUDE.md`'s "sub-30-second scannable / when in doubt remove elements / no parallax hero" minimalism is relaxed **for the landing page**. Restraint still governs elsewhere (project deep-dives, about, contact) until a later spec says otherwise.
2. **Hero concept: Cinematic Type Reveal.** Type-forward. Giant kinetic dual-type wordmark, word-by-word positioning reveal, full-bleed weave "wipe" section transitions, headshot lives in About (not the hero).
3. **Dark cinematic hero.** The hero section uses a warm near-black ground (`#14120E`) with cream type + maroon accent, transitioning into the existing warm-cream content below. This is a deliberate one-direction art choice, **NOT** a dark-mode toggle (the "no dark mode toggle" non-goal still holds).
4. **Assets:** generative visuals built in-house (canvas/GSAP) + one owner-provided headshot. No stock, no external CDN (per constitution). Headshot handled via a styled placeholder now; owner drops the real WebP in `public/` later.
5. **GSAP SplitText re-adopted** (removed in Spec 1 as unused) for the word-by-word reveal.

Everything in `Brand_Kit.md` (color/type/voice) and the signature system (dual-type wordmark, interleave weave, ink annotation) still governs — this spec scales them up, it does not replace them.

### 0.b Reference realignment (2026-07-08, after the Majd-portfolio reference)

The owner shared `majd-portfolio.framer.website` (giant type, warm ground, floating chrome 3D objects, pill nav, corner meta-labels, small moody portrait) as the target feel, and made these calls:

6. **3D chrome signature object (React Three Fiber).** A floating glossy **chrome torus-knot** — the interleave-weave rendered as a 3D braided knot (torus-knot p=2,q=3) — is the hero's centerpiece "wow." Slowly rotates, subtly cursor-reactive, maroon-tinted chrome reflections. This **replaces** the 2D hero ambient field (avoids double-canvas clutter/perf). Adds `three`, `@react-three/fiber`, `@react-three/drei` — **amends** `CLAUDE.md`'s "Do not install: three.js". Dynamically imported (`ssr: false`), DPR-capped, reduced-motion → single static render.
7. **Small moody portrait in the hero** (low/corner, dark b&w editorial) IN ADDITION TO the About portrait. Both are owner-provided; both ship on placeholders.
8. **Floating pill nav** (rounded, backdrop) replacing the plain bar, still flipping cream↔ink treatment over the dark hero.
9. **Mono corner meta-labels** in the hero (e.g. `©2026`, `CLINICAL AI · SINCE 2020`) — cheap editorial "designed" texture.
10. **Giant display type stays Fraunces serif** (NOT a grotesque) — deliberately differentiates from the reference's sans.

The dark hero (decision 3) is retained; the reference's light ground is NOT adopted.

---

## 1. Goal & scope

**Goal:** Rebuild the landing as a bold, cinematic, motion-choreographed experience that makes a first-time visitor feel the clinical + technical thesis viscerally — while staying senior-credible (not WebGL-slop) and fully accessible.

**In scope:** the landing page (`src/app/page.tsx`) and its sections — dark cinematic hero, full-bleed weave-wipe transitions, scroll-choreographed work index with generative per-project visuals, an About moment with a headshot reveal, photography teaser, footer. Motion-foundation additions (master-timeline util, SplitText, scroll choreography, scroll-linked nav). A `prefers-reduced-motion` static-but-bold fallback for every effect.

**Out of scope:** project deep-dive pages, the /work /about /photography /writing routes as full pages, real photography assets, dark mode as a site-wide toggle. The About section here is a *landing moment*, not the full /about page.

**Success criteria:**
- `pnpm preflight` (lint + typecheck + build) passes; build evidence shown.
- Landing renders correct + no horizontal overflow at 1920 / 1024 / 768 / 390.
- Every animation has a `prefers-reduced-motion` static final state that still reads as bold/intentional.
- All interactive elements keyboard-reachable; visible focus on both dark and cream grounds; nav accessible name stays "Madhavi".
- Canvas visuals stay performant: capped DPR, rAF paused when offscreen, single static frame under reduced motion; no long-task jank on mid-tier laptop.
- No `<img>` (Next `<Image>` for the headshot); tokens only (extended with a dark-hero token set).

---

## 2. Ground, theme & tokens

- **Content ground:** unchanged warm cream `#FAF9F6` / ink `#0E1116` (existing `@theme` tokens).
- **Hero ground (new, section-scoped):** add tokens for a dark surface — `--color-hero-bg: #14120E`, `--color-hero-fg: #f1eee6`, `--color-hero-muted: #a39c8e`, `--color-hero-accent: #d97a6c` (maroon lifted for contrast on dark; ≥ 4.5:1 on the dark ground). These are hero-scoped, applied via a wrapper class — they do NOT flip the site theme.
- **Nav over hero:** the fixed nav starts in "on-dark" colors (cream wordmark/links) while over the hero, and transitions to "on-cream" (ink) once scrolled past the hero, via a ScrollTrigger toggling a class on the nav. Focus rings must be visible on both grounds.
- Type scale extends upward: add `--text-hero-xl` (a clamp, ~clamp(4rem, 14vw, 12rem)) for the giant wordmark. All other type stays on the existing scale.

---

## 3. Motion foundation additions

- **Re-add SplitText** to `src/lib/gsap.ts` registration (words, for the positioning reveal).
- **`src/lib/timeline.ts`** — a small helper: `buildHeroTimeline(scope)` returns a paused GSAP timeline; a `playOncePerSession(key, tl)` gate (sessionStorage) so the on-load cinematic plays once per session, not on every route return.
- **Reduced-motion is load-bearing and universal:** a single guard (`prefersReducedMotion()`) short-circuits every timeline/ScrollTrigger; when set, components render their final state via `gsap.set(...)` (wordmark fully shown, positioning shown, weave drawn, headshot shown, each canvas paints ONE static frame). No motion, still bold.
- **ScrollTrigger discipline:** pinning only where the weave-wipe needs it; `once: true` for reveals; `ctx.revert()` cleanup in every effect. No scroll-hijacking of native scroll speed. Respect the interaction rules that remain (keyboard, focus, no cursor-follower gimmicks).
- **Perf:** canvas components cap `devicePixelRatio` at 2, use IntersectionObserver to pause rAF when offscreen, and cap element counts (hero ambient ≤ ~400 points; each project visual ≤ ~200). WebGL is NOT used — 2D canvas only, to stay light and on-brand.

---

## 4. Components & sections

### 4.1 Hero — `src/components/hero/hero-cinematic.tsx` (client)
- Dark full-bleed section, min-height ~92vh. Contains: the giant dual-type wordmark (reuses `Wordmark`, new `--text-hero-xl` size + a `cinematic` prop that drives a richer per-letter assemble), the positioning line marked up for **word-by-word** reveal (SplitText, words), the affiliation strip, and a subtle scroll cue.
- **Ambient backdrop** — `src/components/visual/hero-field.tsx` (client, 2D canvas): a restrained generative field of hairline strokes/points in hero-accent + hero-fg that drift and gently react to the cursor (lerp toward pointer, capped). Reads as "signal + data," echoes the weave. Static single frame under reduced motion.
- **On-load timeline:** backdrop fades in → wordmark letters assemble → positioning reveals word-by-word → affiliations + scroll cue fade. ≤ ~2.2s total, skippable (any scroll/keypress jumps to end). Once per session.

### 4.2 Weave wipe — `src/components/visual/weave-wipe.tsx` (client)
- Full-bleed section-transition device: the interleave-weave scaled to full width, its draw progress **scrubbed by scroll** via a pinned ScrollTrigger, resolving into the single stroke as the next section enters. Reuses the weave geometry/guardrails from Spec 1 (asymmetric crossings, over/under mask, hairline) at large scale. Reduced motion: rendered fully-drawn, static, no pin.
- Used at most 2 transitions on the landing (hero→work, work→about). Not more (restraint even in bold mode).

### 4.3 Work index — `src/components/work-section.tsx` + generative project visuals
- Reuses `WorkRow` content/data (`FEATURED`), but each featured row gains a small **generative accent canvas** keyed to the project:
  - `src/components/visual/proj-lattice.tsx` (CaseConnect — a connected systems lattice)
  - `src/components/visual/proj-field.tsx` (MedNavigator — a retrieval/embedding field of points converging)
  - `src/components/visual/proj-drift.tsx` (Olfactory Odyssey — molecular/scent drift)
  - All share a tiny common canvas harness (`src/components/visual/canvas-base.ts`): DPR cap, IntersectionObserver pause, reduced-motion single-frame, resize handling.
- Rows **clip-reveal** with a stagger on scroll (ScrollTrigger, once). Result numbers (e.g. "~67%") get an emphasized treatment (count-up under motion; final value under reduced motion).

### 4.4 About moment — `src/components/about-moment.tsx`
- Headshot revealed via a masked/clip scroll reveal, editorial duotone (ink↔maroon via CSS blend/filter over a Next `<Image>`), + a 2–3 line bio and a link to the (future) /about page.
- **Placeholder:** ship a styled silhouette (SVG/gradient) at `public/headshot-placeholder.*` wired through the same `<Image>`/treatment, so swapping in the real WebP later is a one-file change. Document the target: `public/headshot.webp`, ≤ 2000px, < 400KB.

### 4.5 Photography teaser + footer
- The "I also shoot" row, given a slightly bolder editorial treatment (still small, still after the work — the photography-not-dominant rule holds). Footer unchanged from Spec 1.

---

## 5. Accessibility & fallbacks (load-bearing)

- Every canvas is decorative → `aria-hidden`, wrapped so it never traps focus or blocks pointer events on content.
- Reduced motion: all timelines skipped; final states set; each canvas paints exactly one frame (or renders a static SVG equivalent). The reduced-motion landing must still look deliberate and bold, not broken.
- Nav: accessible name "Madhavi"; links keyboard-reachable; focus ring visible on BOTH dark hero and cream content (use an outline color that passes on both, or swap with the nav color class).
- Heading order: exactly one `<h1>` (the hero wordmark, via `role="img"` name "Madhavi" inside an `<h1>`, per the Spec 1 fix), then `<h2>`s per section.
- Color contrast: hero-fg/hero-accent on hero-bg ≥ 4.5:1; verify.

---

## 6. A/B & verification

- **A/B:** lighter this time — the concept is chosen. Build the hero first, screenshot at 1920 (motion end-state) + capture a short interaction check, get an owner thumbs-up on the hero feel before choreographing the rest. (Screenshots via production `next start` + headless Chrome, per the Spec-1 infra note; force reduced-motion for deterministic frames, and separately verify motion via DOM/state checks.)
- **Verify:** `pnpm preflight`; screenshots at 1920/1024/768/390; reduced-motion capture; keyboard pass on dark + cream; confirm no horizontal overflow (DOM `scrollWidth==clientWidth`); confirm canvases pause offscreen (perf spot-check).

---

## 7. Risks & open questions

- **Slop risk** is higher in bold mode. Mitigation: type-led (not effect-led), 2D canvas only, restraint on counts + transition frequency, reduced-motion parity. Gut-check the hero before building the rest.
- **Dark-hero ↔ cream seam** must feel intentional, not like two sites. Mitigation: a designed transition (the first weave-wipe bridges the grounds; gradient hand-off).
- **Canvas perf on mobile** — cap counts/DPR, pause offscreen, and consider disabling the hero field entirely below a width/perf threshold (static gradient instead).
- **Nav contrast switch** timing must not flicker at the seam — tune the ScrollTrigger boundary.
- **Open:** exact giant-wordmark max size + whether it wraps on mobile (tune during build).
- **Open:** real headshot pending from owner; About ships on placeholder.
- **Open:** does the hero ambient field survive on mobile, or fall back to static? Decide during the hero gut-check.
