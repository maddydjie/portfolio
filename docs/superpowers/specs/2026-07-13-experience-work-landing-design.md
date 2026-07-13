# Experience-First Work Landing — Design Spec

Date: 2026-07-13
Owner: BVS Madhavi (site owner)
Status: Approved (lab → promote)

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
SELECTED WORK (project bento)
Photography one-liner
```

Story PATH bridge stays out of production (lab may remain unused).

Build first on `/lab/work` (or `/lab/experience` if cleaner), then promote onto
`/` once owner signs off visually.

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

## Selected Work (projects)

Show the full featured set in a Magic Bento + TiltedCard grid. TargetCursor
scoped to this section only (`pointer:fine` + reduced-motion off).

| Project | Source | Notes |
|---|---|---|
| CaseConnect | GitHub `case-connect` | Large cell — systems |
| MedNavigator | GitHub `med_navigator` | Large cell — clinical RAG |
| MedGemma NeuroAssist | Resume / hackathon | Imaging fine-tune |
| KAVACH | GitHub `KAVACH-DEEPMIND-V2` | Verify README on build |
| Analog Hour | GitHub `analog-hr` | Digital wellbeing |
| watch2compete | GitHub `watch2compete` | CompeteWatch / competitive intel |

Headline: **Systems that reach the bedside.**  
Footer link: All work ↗ → `/work` (can remain thin until a later pass).

Optional later (not required in this pass): Pneumonia CXR, Cheiloscopy, Space
BioMed as mono chips under the grid.

### Description duty

On implement: read live READMEs for `watch2compete`, `analog-hr`, and
`KAVACH-DEEPMIND-V2` before finalizing card copy. Do not invent.

## Motion / flow

Purposeful density — orchestrated, not every ReactBits effect at once.

| Surface | Motion |
|---|---|
| Section titles | BlurText entrance |
| Experience lead + rows | Scroll stagger fade/rise |
| AMC card | Optional ECG hairline draw once |
| Achievements | ScrollReveal or BlurText on titles; card stagger |
| Projects | TiltedCard + Magic Bento maroon glow + TargetCursor |
| Seams | WeaveDivider / GradualBlur between major blocks |

Constraints:
- GSAP only; existing primitives under `src/components/text/` and
  `src/components/work/`. No framer-motion. No new deps without asking.
- `prefers-reduced-motion` → static resting layouts.
- Cursor follower only inside the projects grid (Brand_Kit / CLAUDE.md).

## Visual system

Brand_Kit tokens only:
- Background `#FAF9F6`, foreground `#0E1116`, muted `#5A5A5A`, accent `#8B2E2A`
- Type: Fraunces (display/serif), Inter (body), JetBrains Mono (meta)
- Signature: dual-type interleave + maroon accent seasoning + optional ECG on AMC

**Aesthetic risk (one):** Experience lead card is editorial and large (role as
masthead), projects are interactive bento — contrast between “employed proof”
and “shipped proof.” Do not flatten both into the same card chrome.

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

- Landing (after promote) reads Experience → Achievements → Projects
- No AstraZeneca / sponsor strings in UI copy
- All six projects render with real repo links where public
- Motion respects reduced-motion; TargetCursor only on projects
- `tsc --noEmit` + production build pass
- Owner preview in lab before `/` swap

## Testing

- `/lab/work` (or dedicated lab route): desktop + mobile screenshots
- Grep UI strings for `AstraZeneca` / `Astra` — must be zero
- Verify each project link 200s or intentional no-link (MedGemma)
- Reduced-motion smoke
