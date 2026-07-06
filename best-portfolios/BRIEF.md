# Portfolio Research → Build Brief

**Source:** deep research on 21 reference portfolios (`results/*.json`, full dump in `report.md`).
**Status:** 7th input doc — **subordinate** to Brand_Kit.md + PRDs. This is craft evidence, not authority. Where it conflicts with Brand_Kit, Brand_Kit wins.
**Purpose:** turn what the best sites actually do into concrete decisions for the Madhavi build (editorial-minimal, maroon `#8B2E2A`, Fraunces/Inter, ECG signature, clinical+technical interleaving).

---

## 1. The convergent verdict (what nearly every strong site agrees on)

1. **Near-monochrome + ONE functional accent.** Brittany (teal only means "active"), Rauno, Emil, Paco, Karpathy, Willison, Grellier all run a grey/mono ladder with a single accent that carries *meaning*, not decoration. → Directly validates maroon-as-sole-accent, <5% of field. The accent should only ever mark links / active / the ECG.
2. **Projects as a LINK-LIST, not a card grid.** Brittany, Paco, Emil, Karpathy all list work as vertical rows (title + mono tech pills + repo/demo links + inline proof like "100k+ installs"). Cards are the templated default; lists read senior.
3. **The signature is FUNCTIONAL/behavioral, not a decorative graphic.** Paco = a working ⌘K palette; Lee = View Transitions page morphs; Emil = sub-300ms motion discipline; Rauno = hand-tuned micro-interactions. Karpathy/Willison use a *recurring motif* (unicorn / pelican) used sparingly as identity. → The **ECG is Madhavi's motif AND functional signature** — it must feel earned (ties to the cardiac work), not pasted on.
4. **Credibility lives in the work, not chrome.** Karpathy's reverse-chron affiliation timeline (OpenAI/Tesla/Stanford) and citation-style paper list do all the persuading. Affiliations go in About/timeline/footer — never a badge wall in the hero.
5. **Motion = pacing, never spectacle.** transform/opacity only, exits faster than entrances, no-motion baseline is *correct* and motion is pure enhancement (Emil). "Wow lives in the transitions; every static screen stays calm" (Grellier).

---

## 2. Per-surface decisions (mapped to Madhavi's pages)

### Hero (landing)
- **Do:** editorial masthead. "Madhavi" in Fraunces at hero-lg scale + the one-line positioning ("MBBS-trained clinician and IIT Madras data scientist…") + the ECG glyph drawing on once. Below it, a compact **reverse-chron affiliation strip** (nference · IIT Madras · Andhra Medical College · IAF) — Karpathy's move, clinical-credible in 5s.
- **Steal from:** Karpathy (timeline-as-credibility), Rauno (name woven into a confident sentence, no giant vanity title), Vertical/BERGEN (oversized-type masthead confidence).
- **Avoid:** headshot (Brand_Kit rule; Karpathy uses one but our brand says no unless asked), any chrome-less mono bareness (Willison/Emil) — we need the maroon + ECG to establish identity *before* the feed.

### Work index (4 buckets)
- **Two-tier index** (Grellier): the featured trio (CaseConnect, MedNavigator, Olfactory Odyssey) as richer rows with a one-line result; the rest as a tight text-link list per bucket.
- **Row anatomy** (Brittany + Vertical): title · wide-tracked metadata caption (`domain · stack · year`) · mono tech pills · repo/demo/paper links · inline proof ("~67% documentation-time reduction", "90% accuracy"). Every row shows the clinical+technical mix at a glance.
- **Avoid:** uniform card grid; it flattens the heavyweight (CaseConnect) and the paper (Olfactory) into the same visual weight.

### Project deep-dives (MDX)
- **Magazine-spread** (BERGEN/Mokat/Vertical): oversized title breaking the grid, full-bleed artifact, prose in a narrow measure (672px per Brand_Kit), figures breaking out to a wider container (Clarity). Dense = founder-friendly, exactly the PRD's "deep-dives are dense."
- **Caption-as-metadata** everywhere: `title · category · venue/stack · year`.

### Research / publications
- **Filterable publications index** (kozodoi — the single best steal): type + year filter, type badges (`Journal` / `Conference` / `Preprint`), per-entry Abstract/PDF/URL link rows, an aggregate stats strip. Perfect for the IAF papers + projects.
- **Citation-style list** (Karpathy): linked title + italic *venue year* + author list with `*` for equal contribution. Reads clinical and verifiable — use for the two peer-reviewed IAF papers.

### Writing
- **One system, work + writing as peers** (Lee, Willison, Sharp template): MDX under the same design system, not a separate blog engine (matches CLAUDE.md).
- **Bracketed content-type taxonomy** (Willison): tag entries `[Research]` `[Build]` `[Note]` in one dense feed. Photo essays tagged `photography` (per CLAUDE.md).

### Photography
- **Caption every image with wide-tracked metadata** (Vertical) so it reads curated, not decorative. Masonry + lightbox already specced. Keep ONE identity — same bg/accent/type (Brand_Kit).

### Navigation
- Wordmark "Madhavi" top-left, low item count (Work · Photography · Writing · About · Contact), footer sitemap. All strong sites keep nav short and put affiliations low.

### Contact
- **One primary action** (Brand_Kit): copy-to-clipboard email + an "available"-style status line (YUYA), not five competing links.

---

## 3. The ECG signature — implementation-locked spec

From the `stroke-dasharray` deep dive (`Animated_SVG_signature_stroke_dasharray.json`):

- **Markup:** one `<path>` in `<svg viewBox="0 0 240 40">`, `stroke-width:1.5`, `stroke:var(--accent)`, `fill:none`, a stylized QRS-complex `d`.
- **Draw:** measure once with `getTotalLength()` → set `stroke-dasharray:L; stroke-dashoffset:L` → animate offset → 0. **Draw once, never loop** (looping reads as a spinner).
- **Triggers:** on-load via `requestAnimationFrame` (commit initial offset before animating to avoid a full-line flash); on-scroll via `IntersectionObserver` (threshold ~0.35, `unobserve` after firing so it never re-triggers).
- **Timing:** ~600ms, `cubic-bezier(.65,0,.35,1)`, animate `stroke-dashoffset` only, `fill-mode:forwards`.
- **Reduced-motion:** CSS `@media (prefers-reduced-motion: reduce)` → `stroke-dashoffset:0 !important; animation:none` (renders the fully-drawn static line). Never leave a blank line for reduced-motion / no-JS users.
- **A11y/perf:** `aria-hidden="true"` (decorative), ≥3:1 non-text contrast, sub-1KB inline SVG, zero deps, CLS=0 via reserved width/height. Batch `getTotalLength()` reads if multiple instances.
- **Double duty:** the same `<svg>` can host the spike-as-underline under the "Madhavi" wordmark, reused via `<use>` across nav/hero/footer. Used ≤2–3× per page (Brand_Kit rule).

---

## 4. Anti-patterns (the calibration set — what to NOT do)

- **Bruno Simon / Stas Bondar / Jordan Delcros:** full-3D / WebGL-as-identity, gesture-only navigation, sound-gated loaders, always-on canvas with no reduced-motion fallback. Delcros scored highest on creativity but **lowest on accessibility** — the cautionary data point. For a clinical brand this is disqualifying. Cap the "wow" to the single ECG moment; keep navigation conventional and keyboard-reachable.
- **Sharp template's pastel colour-blocking / Comeau's multi-hue palette:** colour competing with the work. Take Comeau's *semantic-token system* (re-author the accent per theme) but not his colour *quantity*.
- **Karpathy / Willison / Emil bareness:** chrome-less, near-imageless mono. Powerful when your name alone sells — Madhavi still needs the editorial hero + maroon + ECG to establish identity first, *then* let the dense feed take over.

---

## 5. Steal-from-whom cheat sheet

| Pattern | Steal from | Applies to |
|---|---|---|
| Affiliation timeline = credibility | Karpathy | Hero / About |
| Citation-style paper list (title · *venue year* · authors*) | Karpathy | Research |
| Filterable publications index + stats strip | kozodoi | Research |
| Project rows as link-list, not cards | Brittany, Paco, Emil | Work |
| Two-tier index (featured + text list) | Grellier | Work |
| Caption-as-metadata (`title·domain·year`) | Vertical, BERGEN | Work, Projects, Photography |
| Magazine-spread deep dive + figure breakout | BERGEN/Mokat, Clarity | Project pages |
| Functional/behavioral signature, sub-300ms | Emil, Paco, Rauno | ECG + all motion |
| Recurring motif as identity | Karpathy (unicorn), Willison (pelican) | ECG |
| Semantic color tokens per theme | Comeau | tokens (maroon across themes, post-v1 dark) |
| Bracketed content-type taxonomy | Willison | Writing feed |
| "wow in transitions, screens stay calm" | Grellier | whole site |
| Copy-email + available status, one CTA | YUYA (Framer) | Contact |
| Tiny payload / engineering-as-statement | Karpathy | perf budget |

---

## 6. Notes / gaps

- **Dark mode:** Willison's `prefers-color-scheme` + `data-theme` toggle is the clean reference IF wanted later — but CLAUDE.md non-goal for v1. Defer. Comeau's per-theme token system is how maroon would survive the switch when we do add it.
- **Fraunces/Inter FOUT:** no reference site pairs exactly Fraunces+Inter (2026 trend supports high-contrast serif + neutral sans). Handle variable-font FOUT manually via `next/font` — templates don't model it.
- **Validator caveat:** `results/*.json` passed the research validator trivially (it expects a flat `fields:` schema; ours nests under `categories:`), so coverage was self-reported by each agent, not machine-enforced. Fields are present; treat `[uncertain]`-marked values (exact fonts, CSS internals, CWV numbers) as unverified.
