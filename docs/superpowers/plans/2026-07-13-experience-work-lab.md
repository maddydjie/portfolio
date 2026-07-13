# Experience-First Work Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/lab/work` with Experience → Achievements → three toggleable project layouts (Masthead, Diptych, Bento) using resume-accurate copy and six projects.

**Architecture:** Shared content modules + presentational section components. Lab page composes Experience + Achievements + project-variant toggle. No `/` promotion yet.

**Tech Stack:** Next.js App Router, GSAP, existing BlurText / ScrollReveal / Magic Bento / TiltedCard / TargetCursor.

## Global Constraints

- No AstraZeneca / sponsor naming in UI
- No framer-motion; no new deps
- `prefers-reduced-motion` respected
- TargetCursor only in Bento variant
- Six projects identical across layouts
- Do not change hero

---

### Task 1: Content modules

**Files:**
- Create: `src/content/experience.ts`
- Create: `src/content/achievements.ts`
- Modify: `src/content/landing.ts` — expand `FEATURED` to six projects (or add `src/content/projects.ts` and re-export)

**Produces:** typed arrays for experience roles, achievements, projects with meta/summary/result/links.

- [ ] Add experience + achievements + six projects (README-backed copy for analog-hr, watch2compete; cautious KAVACH line)
- [ ] Grep: zero `AstraZeneca` in new content
- [ ] Commit

### Task 2: Experience + Achievements UI

**Files:**
- Create: `src/components/work/experience-section.tsx`
- Create: `src/components/work/achievements-section.tsx`

- [ ] Lead nference FT card + intern continuity + AMC (ECG hairline) + DEXTER + Animations rows; scroll stagger
- [ ] Achievements cards with BlurText/ScrollReveal
- [ ] Commit

### Task 3: Project layout variants

**Files:**
- Create: `src/components/work/projects-masthead.tsx`
- Create: `src/components/work/projects-diptych.tsx`
- Create: `src/components/work/projects-bento.tsx`

- [ ] Masthead: CaseConnect hero + expandable rows for other five
- [ ] Diptych: three pairs; mobile stack
- [ ] Bento: tilt + TargetCursor scoped
- [ ] Commit

### Task 4: Wire `/lab/work`

**Files:**
- Modify: `src/app/lab/work/page.tsx`

- [ ] Experience + Achievements + toggle Masthead | Diptych | Bento
- [ ] `tsc` + `next build`
- [ ] Commit
