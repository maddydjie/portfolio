# Spec 1 — Signature System, GSAP Motion Foundation & Landing Page

**Date:** 2026-07-06
**Status:** Draft for review
**Owner:** Madhavi (BVS Madhavi)
**Sub-project:** 1 of N in the whole-portfolio build. Later specs: project pages, photography, writing, about/contact.

---

## 0. Decisions that supersede prior docs

These reverse standing rules in `CLAUDE.md` and `best-portfolios/BRIEF.md`. They win here because the site owner directed them explicitly (2026-07-06).

1. **GSAP is adopted as the motion layer.** `CLAUDE.md` lists `gsap` under "Do not install." That ban is lifted for this project. GSAP 3.13+ is the motion foundation. The `CLAUDE.md` "Do not install" list and the `## Tech stack` section must be amended when the build starts, and the decision logged to memory.
2. **The ECG-line signature is retired.** `CLAUDE.md` "Distinctive detail" and `BRIEF.md` treat the ECG divider as THE signature. It is replaced. `components/ecg-divider.tsx` is deleted. No two medical line-motifs coexist (research: overload).
3. **New signature = a layered system, not one graphic.** See §2.

Everything else in `Brand_Kit.md` (color, type, voice) and the PRD/BRIEF (structure, content, interaction rules) still governs.

---

## 1. Goal & scope

**Goal:** Establish the site's motion foundation and its new signature identity, and ship the landing page as the flagship surface that proves both. Land it with A/B variants so the owner picks the winning hero+nav treatment from screenshots.

**In scope (this spec):**
- GSAP 3.13+ motion foundation (registration, reduced-motion wrapper, SSR-safe integration with Next 16 / React 19).
- Signature system: dual-type wordmark, interleave-weave divider, ink-annotation emphasis. (Variable-font morph = optional stretch, not required.)
- Landing page: hero, work index (two-tier), "I also shoot" row, footer — per BRIEF §2, with the new signature replacing every ECG reference.
- A/B: 2-3 hero+nav variants, screenshot at 1920 / 768 / 390, owner picks.
- Removal of `ecg-divider.tsx` and its usages.

**Out of scope (later specs):** project deep-dive MDX pages, photography gallery/lightbox, writing index, about/contact, resume wiring, real project content beyond the featured-trio landing rows.

**Success criteria:**
- `pnpm build` passes; `pnpm typecheck` and `pnpm lint` clean.
- Landing renders correct at 1920/768/390 with brand tokens (no hardcoded color/spacing).
- Every animation has a static `prefers-reduced-motion` form that still reads as the signature.
- All interactive elements keyboard-reachable; visible focus; no `outline:none` without alternative.
- A/B variant screenshots produced and a winner selected.

---

## 2. Signature system

Four layers, each owning a different surface. They do not compete. Research file: `signature-research/report.md`.

### 2.1 Dual-type kinetic wordmark — PRIMARY (score 4.5, ADOPT)

- **Static form (the actual signature):** the wordmark "Madhavi" set with its glyphs split across two families — Fraunces (humanist serif = clinical) and JetBrains Mono (fixed-width = technical). The static split IS the identity; it lives in the nav on every page. No divider needed to carry identity.
- **Split rule:** deterministic, not random. Proposed: first half "Madh" in Fraunces, "avi" in JetBrains Mono (final split tuned during build for optical balance). Documented as a constant so it never shifts between renders.
- **Motion (garnish, one-time):** on first load, characters settle in (mask/opacity + small y). NOT a font morph — Fraunces↔JetBrains have incompatible outlines, so any "resolve" is a cross-fade/mask illusion between two stacked glyph layers. Sub-400ms, compositor-only. Gate to **once per session** (sessionStorage), never re-fire on route change.
- **A11y:** wrap the split inside the nav `<a>`; the link's accessible name stays "Madhavi" (`aria-label` on the anchor, `aria-hidden` on decorative per-char spans). Static split is the reduced-motion fallback — nothing lost.
- **Perf:** risk is font CLS/FOUT, not JS. Preload Fraunces + JetBrains Mono subsets used in the wordmark; size-adjust fallback metrics; `font-display: swap` acceptable since static split reads regardless.
- **GSAP:** SplitText (free in 3.13) for the char stagger, or hand-rolled spans + CSS if SplitText proves overkill. Decide during build.

### 2.2 Interleave weave — DIVIDER (score 4.0), replaces ECG

- **Form:** two hairlines — maroon `#8B2E2A` (clinical) and ink `#0E1116` (technical) — braid past each other and resolve into one stroke. The thesis, literal. Used as the section divider, sparingly (2-3 surfaces max across the whole site).
- **Guardrails (non-negotiable — this is one rotation from the DNA-helix cliché):**
  - Hairline weight only.
  - 2-3 **asymmetric** crossings (never a regular symmetric braid = loader slop).
  - True **over/under occlusion** at each crossing via SVG `mask`/clip or `mix-blend` — without it, two crossing lines read as a flat "X", not a weave.
  - Semantic two-color (maroon + ink), never a gradient.
  - **Play once and resolve** into the single stroke; never loop.
- **Implementation:** static SVG paths; draw via `stroke-dasharray`/`stroke-dashoffset`. GSAP DrawSVG (free 3.13) drives the draw; ScrollTrigger fires it once on enter.
- **A11y:** `role="separator"` semantics via wrapper; `aria-hidden` on the SVG. Reduced-motion: render the fully-drawn resolved state statically.

### 2.3 Editorial ink annotation — EMPHASIS (score 3.0)

- **Form:** a confident variable-width maroon ink stroke used like a clinician's chart mark — underlines or circles a key word (hero name, "Clinical AI Engineer", one inline stat). Draws on when the word enters view.
- **Restraint:** reject the RoughNotation/RoughJS sketch-wobble + highlighter look. One clean confident stroke. **Ration to ~1 mark per viewport** — overuse is the failure mode.
- **Implementation:** sub-1KB inline SVG per mark; `stroke-dashoffset` draw (or `clip-path` for a filled brush), fired by IntersectionObserver / ScrollTrigger. GSAP DrawSVG optional.
- **A11y:** decoration only, `aria-hidden`; emphasis meaning already carried by the text. Reduced-motion: static drawn mark.

### 2.4 Variable-font axis morph — MICRO-DETAIL (score 3.0), OPTIONAL

- A single hero/nav "M" does a small `opsz`+`wght` settle on hover/focus via CSS `font-variation-settings` (Fraunces axes). Pure CSS, no GSAP, no SVG. Cut if it reads invisible or redundant with the wordmark. Not required for spec success.

---

## 3. GSAP motion foundation

- **Version:** GSAP 3.13+ (SplitText, DrawSVG, ScrollTrigger, MorphSVG now free). Install with `pnpm add gsap` (ask before running per CLAUDE.md).
- **Next 16 / React 19 integration:** GSAP is client-only. Provide a small `use client` motion module; register plugins once (`gsap.registerPlugin(...)`) guarded so it runs in the browser only. Prefer `@gsap/react` `useGSAP()` if added, else `useLayoutEffect` with cleanup via `gsap.context()`/`ctx.revert()` to survive React StrictMode double-invoke and route changes.
- **Reduced-motion wrapper (load-bearing):** a single helper that reads `prefers-reduced-motion`. When set, animations are skipped and elements render in their final state (via `gsap.set` or CSS). Every signature layer routes through it. Also use `gsap.matchMedia()` for the reduced-motion branch.
- **Interaction-polish rules (from CLAUDE.md, enforced):** transform/opacity only; exits faster than entrances; no scroll-jacking; no cursor followers; no parallax hero; every interactive element Tab-reachable; visible focus.
- **Bundle discipline:** import only the plugins used; tree-shake; keep GSAP off the critical path where possible. Document the added weight in the build evidence.

---

## 4. Landing page structure (BRIEF §2)

Reuse existing primitives (`nav`, `section`, `project-card`→ convert toward link-rows, `tag`, `footer`, `prose`). Build order top→bottom:

1. **Hero (editorial masthead):** dual-type wordmark at hero-lg + one-line positioning ("MBBS-trained clinician and IIT Madras data scientist…") + ink-annotation on the role phrase. Below: compact reverse-chron affiliation strip (nference · IIT Madras · Andhra Medical College · IAF). No headshot. Weave divider closes the hero.
2. **Work index (two-tier):** featured trio (CaseConnect · MedNavigator · Olfactory Odyssey) as richer link-rows with a one-line result + mono tech pills + repo/demo/paper links + inline proof; remaining work as tight text-link lists per bucket. **Link-list, not card grid.**
3. **"I also shoot" row:** ONE small photography row, near the bottom, after technical work — never dominant, never above technical work.
4. **Footer:** affiliations/contact per Brand_Kit.

Nav order fixed: **Work · Photography · Writing · About · Contact**. Accent `#8B2E2A` only marks links/active/the signature — <5% of visual field.

---

## 5. A/B variant plan

Build 2-3 variants of the **hero + nav** (the highest-leverage surface), holding content constant, varying the signature treatment:

- **Variant A — Wordmark-forward:** large dual-type wordmark dominates the masthead; weave divider is quiet; ink annotation on role line only.
- **Variant B — Weave-forward:** more restrained wordmark; the interleave-weave gets a prominent hero moment (draws across under the positioning line); ink used on one stat.
- **Variant C — Ink-forward (optional):** typographic/editorial, ink annotation is the loudest gesture (name underlined, role circled); wordmark + weave quiet.

**Process:** implement variants behind a simple switch (query param or config const — NO analytics/flagging infra, static only, per constitution). Screenshot each at 1920 / 768 / 390 via Playwright MCP, in both default and `prefers-reduced-motion`. Present side-by-side. Owner picks; losing variants deleted. This is design-comparison A/B, not runtime traffic splitting.

---

## 6. Verification

- `pnpm preflight` (lint + typecheck + build) passes — paste output as evidence.
- Playwright screenshots at 1920/768/390 for each variant, plus one reduced-motion capture proving static fallbacks.
- Keyboard pass: Tab through nav + hero links, confirm visible focus, wordmark anchor announces "Madhavi".
- Confirm no hardcoded colors/spacing (tokens only); confirm `<img>` not used (Next `<Image>` only).

---

## 7. Risks & open questions

- **Weave slop risk** is the sharpest — if the over/under occlusion or asymmetry isn't nailed, it reads as a braid loader. Mitigation: build the weave first, screenshot, gut-check before wiring the rest.
- **Two web fonts in the nav wordmark** → CLS. Mitigation: preload + size-adjust; static split tolerates FOUT.
- **GSAP + Next 16 App Router SSR** hydration edge cases. Mitigation: strict client-boundary + `gsap.context` cleanup.
- **Open:** exact wordmark split point (Madh|avi vs other) — tune during build against the real Fraunces/JetBrains metrics.
- **Open:** does the variable-font morph (2.4) survive, or get cut? Decide after seeing the wordmark built.
- **Open:** featured-trio row content depth on landing — how much real project proof to inline vs defer to deep-dive pages (later spec).
