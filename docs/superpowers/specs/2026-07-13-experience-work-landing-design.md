# Experience-First Work Landing — Design Spec

Date: 2026-07-13
Owner: BVS Madhavi (site owner)
Status: Approved (lab compare → pick → promote)

## Goal

Replace the boring landing `WorkRow` list with a flowy, motion-led Work area:
**Experience first → Achievements → Selected projects (full set)**. Eye-catchy but
Brand_Kit-disciplined. Resume-accurate. No AstraZeneca / sponsor naming.

## Page flow

```
Hero (COMBINED rise-and-dock — unchanged)
WeaveDivider
EXPERIENCE
ACHIEVEMENTS
SELECTED WORK (layout TBD — lab compare, see below)
Photography one-liner
```

Story PATH bridge stays out of production (lab may remain unused).

**Lab-first:** `/lab/work` hosts shared Experience + Achievements, then a toggle
across **three project layouts**. Owner picks by eye; only the winner promotes
to `/`.

## Experience

Reverse-chronological. Lead = current role (large card). Others = compact
animated rows/cards.

| Role | Org | Dates |
|---|---|---|
| Junior Clinical Data Scientist (Full-time) | nference | Apr 2026 – Present |
| Junior Clinical Data Scientist (Intern) | nference | Oct 2025 – Apr 2026 |
| Clinical Intern | Andhra Medical College | Apr 2025 – Mar 2026 |
| ML Engineer Intern | DEXTER | Feb 2025 – Mar 2025 |
| Business Operations (healthcare domain) | Animations Media (London) | Jan 2025 – Feb 2025 |

### Copy rules

- **Do not** name AstraZeneca, RWE sponsor branding, or “AstraZeneca-sponsored.”
- nference bullets may describe oncology clinical-note extraction, multi-AMC SQL
  cohorts (Mayo / Duke / VUMC / Emory / Mercy), LLM extraction + clinical
  validation, cross-functional collaboration — framed as nference clinical
  data science work only.
- nference Intern sits under FT as a short “promoted from intern” continuity
  note (same org, two date ranges) — not two disconnected mega-cards.
- **AMC** is the healthcare-base card: bedside / hospital clinical reality.
  Quiet ECG hairline motif allowed (signature system) — one use, not spam.
- DEXTER: TensorFlow CXR pneumonia CNN, ~90% test accuracy (resume).
- Animations Media: healthcare-domain business operations / lead workflow
  (resume); keep short.

### Paradox / Event Head

Out of this landing Work area (About or resume only).

## Achievements (not “Research”)

Own section between Experience and Projects.

- IAF 2025 — *Olfactory Odyssey* (deeper 2–3 point summary)
- IAF 2025 — *Microgravity-Driven 3D Bioprinting…* (deeper 2–3 point summary)
- IAC Sydney 2025 — research presenter context (one line)
- Harvard HPAIR delegate — **2025 and 2026**

Tone: understated, specific, peer-reviewed facts. No hustle-speak.

## Selected Work (projects) — lab compare (owner pick)

Same six projects and headline in every variant. Toggle on `/lab/work`:

`1 · Masthead` | `2 · Diptych` | `3 · Bento`

Headline (all): **Systems that reach the bedside.**  
Footer (all): All work ↗ → `/work`

| Project | Source | Notes |
|---|---|---|
| CaseConnect | GitHub `case-connect` | Systems |
| MedNavigator | GitHub `med_navigator` | Clinical RAG |
| MedGemma NeuroAssist | Resume / hackathon | Imaging fine-tune |
| KAVACH | GitHub `KAVACH-DEEPMIND-V2` | Verify README on build |
| Analog Hour | GitHub `analog-hr` | Digital wellbeing |
| watch2compete | GitHub `watch2compete` | CompeteWatch |

### Variant 1 — Masthead + compact list

- CaseConnect as full-width editorial masthead (title, one proof line, short
  summary, repo link); subtle tilt or BlurText only.
- Remaining five as compact mono rows: title · meta · one-line proof; hover
  expands summary / link.
- Best for recruiter skim after a dense Experience block.

### Variant 2 — Clinical ↔ technical diptychs

Three paired rows (md+):

| Clinical-leaning | Technical-leaning |
|---|---|
| CaseConnect | MedNavigator |
| MedGemma NeuroAssist | KAVACH |
| Analog Hour | watch2compete |

- Hairline / weave between columns; scroll stagger left then right.
- Mobile: chronological single stack (CaseConnect → … → watch2compete).
- Best brand-thesis fit (duality as structure).

### Variant 3 — Magic Bento + tilt

- Existing lab pattern: BentoGrid + TiltedCard + TargetCursor (section-scoped).
- Mixed cell sizes: CaseConnect + MedNavigator large; others smaller.
- Best “playful / eye-catchy grid” option.

### Description duty

On implement: read live READMEs for `watch2compete`, `analog-hr`, and
`KAVACH-DEEPMIND-V2` before finalizing card copy. Do not invent.

Optional later (not required): Pneumonia CXR, Cheiloscopy, Space BioMed as
mono chips under the chosen grid.

## Motion / flow

Purposeful density — orchestrated, not every ReactBits effect at once.

| Surface | Motion |
|---|---|
| Section titles | BlurText entrance |
| Experience lead + rows | Scroll stagger fade/rise |
| AMC card | Optional ECG hairline draw once |
| Achievements | ScrollReveal or BlurText on titles; card stagger |
| Projects (Masthead) | Masthead BlurText; rows fade on hover/scroll |
| Projects (Diptych) | Left/right stagger; weave hairline |
| Projects (Bento) | TiltedCard + Magic Bento maroon glow + TargetCursor |
| Seams | WeaveDivider / GradualBlur between major blocks |

Constraints:
- GSAP only; existing primitives under `src/components/text/` and
  `src/components/work/`. No framer-motion. No new deps without asking.
- `prefers-reduced-motion` → static resting layouts.
- TargetCursor **only** in Bento variant, scoped to the projects grid
  (`pointer:fine` + reduced-motion off).

## Visual system

Brand_Kit tokens only:
- Background `#FAF9F6`, foreground `#0E1116`, muted `#5A5A5A`, accent `#8B2E2A`
- Type: Fraunces (display/serif), Inter (body), JetBrains Mono (meta)
- Signature: dual-type interleave + maroon accent seasoning + optional ECG on AMC

**Aesthetic risk (one):** Experience lead card is editorial and large (role as
masthead). Project layout is chosen from lab compare — winner must still
contrast with Experience (not the same card chrome repeated).

Avoid: purple glow, cream+terracotta template drift, dense broadsheet columns,
stat-strip dashboard clutter in the first Work viewport after hero.

## Content sources

- Resume: `BVS_Madhavi_Resume_AstraZeneca.docx` (experience facts; strip sponsor)
- Brand_Kit §11 + GitHub `maddydjie` for projects
- Owner corrections in this thread (dates, AMC, Achievements rename, HPAIR,
  full project set, no AstraZeneca)

## Out of scope

- Story PATH bridge promotion
- Full `/work` bucket IA rewrite (four PRD buckets) — later
- Paradox event role on landing
- Hero wordmark polish pass
- Installing new animation libraries

## Success criteria

- Lab `/lab/work` shows Experience + Achievements + toggle across three project
  layouts (Masthead, Diptych, Bento) with identical project set
- Owner picks one layout; only that layout promotes to `/`
- Landing (after promote) reads Experience → Achievements → Projects
- No AstraZeneca / sponsor strings in UI copy
- All six projects render with real repo links where public
- Motion respects reduced-motion; TargetCursor only on Bento variant
- `tsc --noEmit` + production build pass

## Testing

- `/lab/work`: toggle all three; desktop + mobile screenshots
- Grep UI strings for `AstraZeneca` / `Astra` — must be zero
- Verify each project link 200s or intentional no-link (MedGemma)
- Reduced-motion smoke
- Diptych mobile collapse = single chronological stack
