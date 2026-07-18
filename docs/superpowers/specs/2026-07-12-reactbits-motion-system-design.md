# ReactBits Motion System — Design Spec

Date: 2026-07-12
Owner: BVS Madhavi (site owner)
Status: Approved (phased build)

## Goal

Layer a curated set of ReactBits-inspired motion components across the portfolio,
hand-built (no framer-motion; brand palette enforced), so each surface has one
memorable motion moment without the site reading as an effects template.

## Constraints (from Brand_Kit / CLAUDE.md)

- No framer-motion. GSAP is the motion layer; three/R3F for 3D; ogl + rapier
  approved for WebGL/physics showpieces this cycle.
- Palette: warm paper + ink + one maroon accent (#8B2E2A / hero #d97a6c).
  No blue/purple/rainbow. All ReactBits rainbow/holo/metallic looks get
  rebranded to maroon/ink or cut.
- next/image only; images pre-optimized WebP for photography.
- All motion respects `prefers-reduced-motion`. No `outline:none` without a
  visible alternative. Cursor-followers allowed ONLY scoped to /work.
- Ask before `pnpm add`. Approved installs this cycle: `ogl`, `@dimforge/rapier3d`
  (+ `@react-three/rapier`), `@react-three/drei` if not present.

## Component → surface mapping

| Component | Surface | Dep | Brand action |
|---|---|---|---|
| decrypted-text | hero rotating title, project meta | none | mono, maroon accent |
| blur-text | section headings entrance | none | — |
| scroll-reveal | project deep-dives, writing | none | — |
| profile-card | hero (combined, production) | none | maroon sheen (done) |
| tilted-card | /work project cards | none | subtle, maroon glare |
| pixel-card | one "data" project card | none | maroon/ink pixels |
| gradual-blur | edge fades (hero, gallery, nav) | none | done |
| magic-bento | /work index and/or About skill-stack | none | maroon glow |
| target-cursor | /work project area ONLY | none | pointer:fine + reduced-motion |
| masonry | /photography primary grid | none | PRD-spec gallery |
| infinite-menu | /photography showpiece entry | ogl | maroon labels |
| lanyard | About/Contact hanging ID badge | three+rapier | brand badge art |
| antigravity | one ambient accent (About/404) | none/three | restrained |

### Cut
orbit-images (dup of infinite-menu), metallic-paint (brand clash), shape-blur
(cursor + gimmick), variable-proximity (cursor, out of /work scope).

## Phases (each = own plan when reached)

**Phase 0 — Hero finalize.** COMBINED hero: rise-and-dock scroll score —
centred **Dr Madhavi** first, then on scroll wordmark docks left + ProfileCard
slides in from the right. Fixes:
- Wordmark: **Dr** (serif italic) + **Madh** (serif) + **avi** (mono).
- Eyebrow: decrypted title cycling Medicine · Data Scientist · Space Researcher ·
  Clinical AI · Photographer.
- Tagline "I don't fit in boxes. I build bridges between them." enlarged.
- Copy rewritten away from repeated "Clinical AI Engineer" — bedside + IIT Madras
  voice. One CTA: View work → `#work`. GradualBlur bottom edge fade retained.
- Promoted to production (`src/components/hero/hero-combined.tsx`); replaces HeroV2.

**Phase 1 — Text layer.** Reusable `DecryptedText`, `BlurText`, `ScrollReveal`
primitives in `src/components/text/`. Wire into section headings, deep-dive
paragraphs, project meta. No deps.

**Phase 2 — Work.** `magic-bento` /work index grid (maroon glow); `tilted-card`
project cards; `target-cursor` reticle scoped to /work; `scroll-reveal` +
decrypted meta on project pages; `pixel-card` for one data project.

**Phase 3 — Photography.** `infinite-menu` (ogl) globe showpiece entry +
`masonry` browseable grid + keyboard/focus-trapped lightbox per PRD. Retire the
interim CSS CircularGallery or keep as reduced-motion fallback.

**Phase 4 — About / Contact.** `lanyard` (three+rapier) hanging ID badge as the
signature moment; `magic-bento` skill-stack; `antigravity` ambient accent (one
spot).

## Success criteria

- Each surface has exactly one showpiece; supporting motion stays quiet.
- Typecheck + build pass; reduced-motion renders static resting states.
- No new dependency added without it being one of the approved set.
- Nothing merged to main without owner picking from lab previews.

## Testing / verification

- Lab routes under `/lab/*` for every showpiece; Playwright frame-sampling at
  scroll/pointer states; screenshots reviewed before promotion.
- `tsc --noEmit` clean per phase; `pnpm build` before any promotion to real pages.
