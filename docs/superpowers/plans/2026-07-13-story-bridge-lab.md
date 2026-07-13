# Story Bridge Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/lab/story` with two toggleable variants (Timeline + Dual-rail) sharing the same four path beats and closer, so the owner can pick before promoting to `/`.

**Architecture:** Shared beat data in `src/content/story.ts`. Two presentational client components under `src/components/story/`. Lab page mirrors `/lab/hero` toggle chrome. No production landing changes.

**Tech Stack:** Next.js App Router, React client components, Tailwind tokens, GSAP via existing `BlurText` / ScrollTrigger stagger, no new deps.

## Global Constraints

- Quiet dual-path tone; no “broke the rules,” no escape-from-medicine, no hustle-speak
- Closer exactly: `Normal was never the assignment.`
- Four beats: NEET 2021 → IIT Madras Sep 2021 (alongside MBBS) → IAF Sydney Sep 2025 → clinical ML 2025
- GSAP only; no framer-motion; no new `pnpm add`
- `prefers-reduced-motion` → static resting layouts
- Do not mount bridge on `/` yet
- Do not change hero rise-and-dock

---

### Task 1: Shared story content

**Files:**
- Create: `src/content/story.ts`

**Interfaces:**
- Produces: `StoryBeat`, `STORY_BEATS`, `STORY_CLOSER`, `STORY_LABEL`, `CLINICAL_BEATS`, `TECHNICAL_BEATS`

- [ ] **Step 1: Add content module**

```ts
export type StoryBeat = {
  when: string;
  text: string;
  rail: "clinical" | "technical";
};

export const STORY_LABEL = "PATH";

export const STORY_CLOSER = "Normal was never the assignment.";

export const STORY_BEATS: StoryBeat[] = [
  {
    when: "2021",
    text: "Cracked NEET.",
    rail: "clinical",
  },
  {
    when: "Sep 2021",
    text: "Started IIT Madras BS Data Science alongside MBBS.",
    rail: "technical",
  },
  {
    when: "Sep 2025",
    text: "IAF Sydney — space medicine; widened the frame.",
    rail: "clinical",
  },
  {
    when: "2025",
    text: "Landed a clinical ML role.",
    rail: "technical",
  },
];

export const CLINICAL_BEATS = STORY_BEATS.filter((b) => b.rail === "clinical");
export const TECHNICAL_BEATS = STORY_BEATS.filter((b) => b.rail === "technical");
```

- [ ] **Step 2: Commit**

```bash
git add src/content/story.ts
git commit -m "feat: add shared story bridge beat content"
```

---

### Task 2: Timeline variant

**Files:**
- Create: `src/components/story/story-timeline.tsx`

**Interfaces:**
- Consumes: `STORY_BEATS`, `STORY_CLOSER`, `STORY_LABEL` from `@/content/story`
- Consumes: `BlurText` from `@/components/text/blur-text`
- Produces: `StoryTimeline` (no props)

- [ ] **Step 1: Implement Timeline**

Single column `max-w-reading`, light paper section (`bg-background text-foreground`). Mono label `PATH`. Each beat: mono `when` + `BlurText` for fact. Closer italic serif via `BlurText`. Reduced-motion handled inside `BlurText`.

```tsx
"use client";

import { BlurText } from "@/components/text/blur-text";
import { STORY_BEATS, STORY_CLOSER, STORY_LABEL } from "@/content/story";

export function StoryTimeline() {
  return (
    <section className="bg-background px-6 py-24 text-foreground md:py-32">
      <div className="mx-auto w-full max-w-reading">
        <p className="mb-12 font-mono text-small tracking-[0.2em] text-muted-foreground">
          {STORY_LABEL}
        </p>
        <ol className="flex flex-col gap-10">
          {STORY_BEATS.map((b) => (
            <li key={b.when + b.text} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <span className="font-mono text-small text-muted-foreground">{b.when}</span>
              <BlurText text={b.text} className="font-serif text-h3 leading-snug" />
            </li>
          ))}
        </ol>
        <BlurText
          text={STORY_CLOSER}
          className="mt-16 max-w-[22ch] font-serif text-h2 italic leading-tight text-foreground"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `./node_modules/.bin/tsc --noEmit`  
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/story/story-timeline.tsx
git commit -m "feat: add story timeline bridge variant"
```

---

### Task 3: Dual-rail variant

**Files:**
- Create: `src/components/story/story-dual-rail.tsx`

**Interfaces:**
- Consumes: `STORY_BEATS`, `CLINICAL_BEATS`, `TECHNICAL_BEATS`, `STORY_CLOSER`, `STORY_LABEL`
- Produces: `StoryDualRail` (no props)

- [ ] **Step 1: Implement Dual-rail**

Desktop (`md+`): two columns Clinical | Technical with a 1px accent hairline between. Mobile: chronological `STORY_BEATS` stack (same order as Timeline). GSAP ScrollTrigger stagger on `[data-beat]` so rails interleave. Reduced-motion: skip stagger, show all.

Include rail headers `Clinical` / `Technical` in serif muted on desktop only.

- [ ] **Step 2: Verify TypeScript**

Run: `./node_modules/.bin/tsc --noEmit`  
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/story/story-dual-rail.tsx
git commit -m "feat: add story dual-rail bridge variant"
```

---

### Task 4: Lab route `/lab/story`

**Files:**
- Create: `src/app/lab/story/page.tsx`

**Interfaces:**
- Consumes: `StoryTimeline`, `StoryDualRail`
- Pattern: same fixed bottom toggle as `src/app/lab/hero/page.tsx` (light/paper chrome — use `border-border bg-background` tokens, not hero dark)

- [ ] **Step 1: Lab page with toggle + Work spacer**

Variants: `timeline` | `dual`. Default `timeline`. Include a light “Selected work” spacer below so scroll context matches landing.

- [ ] **Step 2: Build**

Run: `./node_modules/.bin/next build`  
Expected: route `○ /lab/story` listed; exit 0

- [ ] **Step 3: Manual check**

Open `http://localhost:3000/lab/story` — toggle both; at ~390px Dual-rail stacks; at ~1280 Dual-rail shows two columns. Confirm `/` still has no story bridge.

- [ ] **Step 4: Commit**

```bash
git add src/app/lab/story/page.tsx
git commit -m "feat: add /lab/story timeline vs dual-rail compare"
```

---

## Spec coverage check

| Spec requirement | Task |
|---|---|
| Shared four beats + closer | 1 |
| Timeline variant + BlurText | 2 |
| Dual-rail + mobile stack + stagger | 3 |
| `/lab/story` toggle | 4 |
| Not on `/` | 4 (explicit non-change) |
| Reduced-motion | 2 via BlurText; 3 via early return |
| No new deps / no hero change | Global |
