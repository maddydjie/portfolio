# Portfolio Site — Project Constitution

## Overview

This is the personal portfolio for BVS Madhavi, MBBS-trained clinician and IIT Madras data scientist working at the intersection of clinical AI, real-world evidence, and multimodal health. The site targets two audiences with equal weight: recruiters/hiring managers at health-tech and pharma, and founders/VCs. Landing page is scannable (recruiter-friendly, sub-30-second read); project deep-dives are dense (founder-friendly).

**Positioning:** Clinician + Data Scientist. Clinical AI, RWE, Multimodal Health. Editorial-minimal, not SaaS-template.

## Read before every task

1. `docs/Brand_Kit.md` — visual + verbal identity source of truth (wins on all color/type/voice/identity questions)
2. `docs/PRD.md` — the primary product spec
3. `docs/PRD_v2_addendum.md` — portfolio deep-dive + interaction polish rules + Claude Code workflow
4. `docs/PRD_v3_references.md` — reference dissection, photography integration, refined design system
5. `docs/PRD_v4_skills_projects.md` — skill stack + real GitHub projects + content map
6. This file

Do not build features not specified in the PRDs. Non-goals in PRD Section 3 are enforced.

## Authority order (when sources conflict)

1. Brand_Kit.md wins on color, type, voice, identity
2. PRDs win on structure, content, interaction rules
3. Installed skills (frontend-design, animate, theme-factory, playwright) fill craft defaults where docs are silent

When any skill suggests a color, font, or spacing value, OVERRIDE with Brand_Kit.md values. Skills decide HOW; the brand kit and PRDs decide WHAT.

## Identity (from Brand_Kit.md)

Owner: BVS Madhavi ("Madhavi" as the site wordmark). Role descriptor: **Clinical AI Engineer** — MBBS (Andhra Medical College) + Data Science (IIT Madras). The brand thesis is the *interleaving* of clinical and technical — every surface must show both. Never let the site read as "just clinical" or "just technical."

## Navigation order

Work · Photography · Writing · About · Contact

Work is first (professional priority). Photography is second (the human hook), never dominant, never above technical work on the landing page.

## Tech stack

- **Framework:** Next.js 15 (App Router, TypeScript strict mode)
- **Styling:** Tailwind CSS + shadcn/ui (only import components as needed)
- **Content:** MDX via `next-mdx-remote` for all project + blog pages
- **Icons:** lucide-react
- **Fonts:** Fraunces (serif), Inter (sans), JetBrains Mono (mono) — via `next/font/google`
- **Syntax highlighting:** shiki via rehype-pretty-code
- **Linter/formatter:** Biome (not ESLint + Prettier)
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel, auto-deploy from `main`
- **Package manager:** pnpm

**Do not install:** framer-motion, three.js, gsap, sanity, contentful, mongoose, any auth library, any CMS SDK.

## Commands

- `pnpm dev` — local dev server on :3000
- `pnpm build` — production build (must pass before every commit to main)
- `pnpm lint` — Biome check
- `pnpm format` — Biome format (auto-run via hooks)
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm preflight` — runs lint + typecheck + build in sequence

## Design tokens (source of truth)

All tokens are defined in `tailwind.config.ts` and `src/styles/globals.css`. Do NOT hardcode colors, spacing, or font sizes in components. Reference tokens only.

- Background: `bg-background` (#FAF9F6)
- Foreground: `text-foreground` (#0E1116)
- Muted foreground: `text-muted-foreground` (#5A5A5A)
- Accent: `text-accent` (#8B2E2A) — deep clinical maroon, use sparingly
- Border: `border-border` (#E5E1D8)

Typography scale: `text-hero-lg`, `text-hero`, `text-h2`, `text-h3`, `text-body`, `text-small`, `text-mono`.

## Conventions

**File naming:** kebab-case for files (`project-card.tsx`), PascalCase for React component exports.

**Component structure:** functional components only. Prefer server components; use `"use client"` only when necessary (interactivity, hooks).

**Commits:** conventional commits. `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `chore:`. Do NOT add "Co-authored-by" or "Generated with Claude Code" to commit messages.

**Git flow:** feature branches → PR → merge to main. Auto-deploy from main.

## Interaction polish rules (non-negotiable)

Enforced from `docs/PRD_v2_addendum.md` Part II. Highlights:
- All animations respect `prefers-reduced-motion`
- No `outline: none` without a visible alternative
- Every interactive element reachable via Tab
- Inputs inside forms submit on Enter
- No scroll-jacking, no cursor followers, no parallax hero

## Content sources

- Project MDX files: `src/content/projects/*.mdx`
- Blog MDX files: `src/content/writing/*.mdx` (empty on launch)
- Resume PDF: `public/resume.pdf`

Real GitHub projects (github.com/maddydjie): case-connect (CaseConnect — verified, full-stack clinical documentation platform, the strongest systems piece), med_navigator (MedNavigator — RAG), watch2compete (verify README during build), analog-hr (Analog Hour — verify README during build). Canonical project descriptions are in Brand_Kit.md Section 11. For watch2compete and analog-hr: fetch and read the actual README before writing descriptions — do NOT publish guessed descriptions.

Landing featured trio: CaseConnect (systems), MedNavigator (clinical AI depth), Olfactory Odyssey (research range).

Each project MDX file has frontmatter (title, slug, tagline, date, tags, links). See `.claude/skills/build-project-page/SKILL.md` for the schema.

## Gotchas

- Do not add a headshot unless the user explicitly asks for one. The design does not require it.
- Do not build a dark mode toggle for v1. See PRD non-goals.
- Do not use `<img>` tags. Always use Next.js `<Image>`.
- Do not import shadcn components until they're actually used in a rendered page.
- Do not add any external image CDN. Use `public/` + Next.js Image.
- Do not add any analytics beyond Vercel's built-in.
- Do not add favicon boilerplate before Day 5 — final favicon comes with brand polish, not scaffolding.
- If a package needs installing, ask before running `pnpm add`. Don't install unprompted.

## Photography section

The site includes a photography section (/photography) reflecting the owner's personal interest. It shares ONE visual identity with the rest of the site — same background, accent (#8B2E2A), fonts, spacing. It differs only in layout (image galleries vs prose).

Rules:
- Photography is a peer nav item, never dominant, never above technical work on the landing page. Landing page gets ONE small "I also shoot" row near the bottom, after technical work.
- Gallery: responsive masonry (4 col desktop / 2 tablet / 1 mobile), lazy-loaded WebP, blurhash/dominant-color placeholders, subtle hover only.
- Lightbox: full-viewport, keyboard-navigable (arrows + Esc), focus-trapped.
- Photo essays live in /writing tagged "photography" (one blog, tag-filtered) — NOT a separate blog system, for launch.
- Images must be pre-optimized to WebP (max 2000px, under ~400KB) before commit. NEVER commit raw/unoptimized images (no multi-MB files in git).
- Photography uses the same fonts and accent — do not introduce a new theme.

## Distinctive detail

Implement a subtle ECG-line section divider (`components/ecg-divider.tsx`) as the site's signature detail — a thin animated pulse line used sparingly as a divider. It ties the owner's cardiac-monitoring work into the visual identity. Subtle, respects prefers-reduced-motion, used at most 2-3 times across the whole site.

## Working style

1. Enter plan mode before edits (Shift+Tab).
2. After every completed section, commit with a conventional-commit message.
3. Show evidence of correctness (`pnpm build` output, screenshot, test result). Do not say "it works" without proof.
4. If you make 2 corrections on the same file and the user is still unhappy, stop and ask for clarification instead of trying a 3rd time.
5. When in doubt, remove elements. This site earns power from what it leaves out.
