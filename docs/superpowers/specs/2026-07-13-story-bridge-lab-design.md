# Story Bridge Lab — Design Spec

Date: 2026-07-13
Owner: BVS Madhavi (site owner)
Status: Approved (lab compare pass)

## Goal

Build a thin narrative bridge between the hero and Selected Work that makes the
dual path legible: MBBS + IIT Madras Data Science *simultaneously*, then space
medicine (IAF Sydney), then clinical ML. Ship **two lab variants** with identical
copy so the owner can pick which composition fits before promoting one to `/`.

## Placement

```
Hero (rise-and-dock COMBINED — unchanged)
  → Story bridge (NEW — lab first)
  → Selected Work (existing)
```

Production landing does **not** get the bridge until a variant is chosen.
Lab route: `/lab/story` with toggle `1 · Timeline` | `2 · Dual-rail`.

## Tone

Quiet dual-path (Brand_Kit: precise, grounded, understated).
- Lead with facts and dates; no swagger, no “broke the rules,” no hustle-speak.
- Never imply escape-from-medicine; the point is *both*.
- Rejected closer: “abnormal is the newer cool.”

## Shared copy (both variants)

| When | Beat |
|---|---|
| 2021 | Cracked NEET |
| Sep 2021 | Started IIT Madras BS Data Science alongside MBBS |
| Sep 2025 | IAF Sydney — space medicine; widened the frame |
| 2025 | Landed a clinical ML role |

**Closer (centered, after last beat):**
> Normal was never the assignment.

Eyebrow / section label (optional, mono, muted): `PATH` or `HOW I GOT HERE` —
one label only; do not stack eyebrows.

Exact microcopy may be tightened in implementation as long as the four beats and
closer meaning stay intact. Body must not say “bedside, then IIT” — that implies
sequence; this section exists to correct that.

## Variant 1 — Timeline

**Layout:** Single column, max reading width, vertical stack.
Each beat: mono year/date left or above → serif fact line.
Closer below the stack, italic serif, one line.

**Motion:**
- Per-beat ScrollReveal or BlurText entrance on scroll into view.
- Closer fades/rises last.
- Reduced-motion: all beats + closer visible immediately, no entrance.

**Why it exists:** Fast skim for recruiters; clearest chronology.

## Variant 2 — Dual-rail

**Layout:** Two rails — **Clinical** | **Technical** — on `md+`.
- Clinical (left): NEET 2021; IAF Sydney Sep 2025
- Technical (right): IIT Madras Sep 2021; Clinical ML 2025
- A thin maroon hairline / weave between rails (reuse interleave language from
  signature system if a small strand fits; otherwise a single accent rule).
- Mobile: collapse to a single chronological stack (same order as Timeline) so
  the dual metaphor does not break small screens.
- Closer centered under both rails.

**Motion:**
- Scroll-linked stagger so left/right beats interleave (clinical, technical,
  clinical, technical) rather than both columns filling at once.
- Reduced-motion: static dual layout (or stacked on mobile), no stagger.

**Why it exists:** Visualizes the brand thesis (clinical ↔ technical) as structure.

## Motion constraints

- GSAP is the motion layer. Prefer existing primitives:
  `BlurText`, `ScrollReveal` under `src/components/text/`.
- No framer-motion. No new dependencies for this pass.
- Respect `prefers-reduced-motion` everywhere.
- One showpiece motion idea per variant — do not stack decrypt + blur + pin
  on the same beats.

## Out of scope

- Polishing the “Dr Madhavi” hero wordmark appearance (separate micro-pass).
- Promoting either variant to `/` (owner picks after lab review).
- Full About-page biography.
- Photography / Work ReactBits (infinite-menu, magic-bento, etc.).
- Changing hero rise-and-dock behavior.

## Success criteria

- Both variants render at `/lab/story` with a persistent toggle.
- Same four beats + closer in both; tone stays quiet dual-path.
- Desktop Dual-rail reads as two rails; mobile Dual-rail stacks chronologically.
- `tsc --noEmit` and production build pass.
- Owner can decide Timeline vs Dual-rail from lab alone without production risk.

## Testing / verification

- Lab toggle both variants; screenshot scroll-0 and mid-scroll states.
- Check `prefers-reduced-motion` (static resting).
- Desktop (~1280) and mobile (~390) for Dual-rail collapse.
- Confirm landing `/` still Hero → Work with no bridge until promotion.
