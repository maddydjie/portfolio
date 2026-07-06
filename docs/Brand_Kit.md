# BVS Madhavi — Brand Kit

**Version:** 1.0
**Date:** July 4, 2026
**Purpose:** The single source of truth for visual + verbal identity across the portfolio site, resume, LinkedIn, GitHub, and any future surface. Everything downstream (the site, social headers, slide decks) should trace back to this document.

---

## 1. Brand essence

### The one-liner

**Clinical AI Engineer — MBBS + IIT Madras Data Science.**

(This is already your GitHub bio. It's good. We keep it consistent everywhere.)

### The positioning statement (longer)

> A clinician who builds. MBBS-trained doctor and IIT Madras data scientist working where medicine meets machine learning — clinical AI, real-world evidence, and multimodal health. I don't just analyze clinical data; I ship systems that use it.

### The essence in three words

**Clinical. Technical. Builder.**

Every design and copy decision should reinforce at least one of these. If something reinforces none, cut it.

### Why this identity is rare (and the brand should protect it)

Most people in health-AI are one of two things: a clinician who can talk about AI, or an engineer who's learned some medical vocabulary. You are genuinely both — you can read an ECG *and* fine-tune a model on it. The brand's entire job is to make that duality legible and credible in the first five seconds. Never let the brand collapse into "just another data scientist" or "just another doctor who likes tech."

---

## 2. Brand personality

### Voice attributes

| Attribute | Means | Does NOT mean |
|---|---|---|
| **Precise** | Clinical accuracy, specific numbers, real artifacts | Jargon for its own sake |
| **Grounded** | Confident about real experience, honest about gaps | Overclaiming, buzzword soup |
| **Curious** | Space medicine, photography, agentic AI — range | Scattered, unfocused |
| **Warm** | A human behind the credentials | Cutesy, over-familiar |
| **Understated** | Lets the work speak | Falsely modest, or boastful |

### The voice test

Before publishing any copy, read it and ask: *"Does this sound like a competent clinician-engineer wrote it, or like a marketing template?"* If it sounds like a template, rewrite it plainer and more specific.

### Tonal north stars (people whose written voice to emulate)

- **Karpathy** — technical but accessible, human, occasionally playful
- **Simon Willison** — direct, specific, no fluff, shows the work
- Avoid: LinkedIn-influencer voice, "I'm thrilled to announce," excessive emoji, hustle-speak

---

## 3. Color system

The palette is warm, editorial, clinical-without-being-cold. One accent thread ties everything together.

### Core palette

| Token | Hex | Use |
|---|---|---|
| `--background` | `#FAF9F6` | Primary background (warm off-white, never pure white) |
| `--foreground` | `#0E1116` | Primary text (near-black, never pure black) |
| `--muted-foreground` | `#5A5A5A` | Meta text, dates, captions |
| `--accent` | `#8B2E2A` | THE brand color — deep clinical maroon. Links, CTAs, emphasis |
| `--accent-hover` | `#6F2320` | Darker maroon for hover states |
| `--surface` | `#F3F1EA` | Subtle raised surface for cards |
| `--border` | `#E5E1D8` | Soft warm gray dividers and outlines |
| `--overlay` | `rgba(14,17,22,0.90)` | Lightbox / modal background |

### The accent color story (this matters for brand memorability)

`#8B2E2A` is a deep maroon — the color of **oxygenated arterial blood** and, not coincidentally, close to the traditional maroon of medical academic regalia. It signals "medicine" without resorting to the clichéd red-cross-blue-scrubs palette every health startup uses. It's warm, serious, and distinctive. This is your ownable color. Use it as the single consistent thread across the site, resume accents, and social graphics.

**Discipline rule:** the accent is a seasoning, not a base. It appears on links, one CTA per page, active states, and the ECG detail. If a page looks "maroon," you've overused it. Aim for accent on <5% of the visual field.

### Semantic colors (used sparingly, only where function requires)

| Token | Hex | Use |
|---|---|---|
| `--success` | `#2D6A4F` | Rare — form success states only |
| `--warning` | `#9A6A00` | Rare — form validation only |

Do not introduce blues, purples, or gradients. The vibe is warm paper + ink + one blood-maroon accent. That restraint IS the brand.

### Accessibility

- `foreground` on `background`: contrast ratio ~15:1 (AAA) ✓
- `accent` on `background`: ~6.2:1 (AA for normal text) ✓
- `muted-foreground` on `background`: ~5.4:1 (AA) ✓
- Never put `accent` text on `surface` without checking contrast (borderline).

---

## 4. Typography

### The type system

| Role | Typeface | Weight | Notes |
|---|---|---|---|
| Display / hero | **Fraunces** | 500 | Optical sizing high, tracking -0.02em, a touch of WONK on hero only |
| Headings (h2–h4) | **Fraunces** | 500 | The editorial serif that signals "thinks + writes" |
| Body | **Inter** | 400 | Clean, neutral, highly legible sans |
| Meta / captions | **Inter** | 400 | 14px, muted-foreground |
| Code / mono | **JetBrains Mono** | 400 | For code blocks and technical labels |

### Why this pairing

**Fraunces** (serif) does the heavy lifting for identity — it's warm, literary, and slightly unusual, which reads as "a person with taste and ideas," not "a bootstrapped SaaS." **Inter** (sans) keeps the body neutral and modern so the content is effortless to read. **JetBrains Mono** grounds the technical side. The serif/sans contrast literally embodies the clinical (human, editorial) + technical (clean, precise) duality — the type system IS the brand thesis.

### Type scale

| Name | Size (desktop) | Line-height | Use |
|---|---|---|---|
| hero-lg | 56px | 1.05 | Landing hero name |
| hero | 40px | 1.1 | Page heroes |
| h2 | 32px | 1.2 | Section headings |
| h3 | 22px | 1.3 | Subsections |
| body | 17px | 1.65 | Paragraph text |
| small | 14px | 1.5 | Meta, captions |
| mono | 15px | 1.6 | Code |

Mobile: scale hero-lg → 40px, hero → 32px, h2 → 26px. Body stays 17px (never shrink reading text below 16px).

### Typography rules

- Body line-height never below 1.55.
- No `text-transform: uppercase` on more than 4 words.
- Enable Fraunces OpenType features: `font-feature-settings: "ss01"; font-optical-sizing: auto;`
- Headings can use tabular figures for dates/numbers where alignment matters.

---

## 5. Logo / wordmark

You don't need a graphic logo. For a personal brand at your stage, a **wordmark** is stronger, faster, and more flexible.

### Primary wordmark

**Madhavi** — set in Fraunces 500, foreground color.

or, when more formality is needed:

**BVS Madhavi** — same treatment.

### Monogram (for favicon, social avatar, tight spaces)

**M** or **BM** in Fraunces, foreground on background, or reversed (background on accent) for the favicon.

### The signature mark (optional, distinctive)

A tiny **ECG pulse glyph** — a single-line heartbeat trace — can accompany the wordmark or stand alone as a favicon/mark. This is your visual signature: it ties the cardiac-monitoring work (Silent Guardian, the stealth platform) into the identity and is genuinely unique to you. One clean SVG path. Use it:
- As the favicon (pulse line in maroon on off-white)
- As a subtle section divider on the site (see design system)
- Optionally trailing the wordmark in the nav

**Rule:** the ECG mark is used at most 2-3 times per page and never animated more than once per viewport. Subtlety is the whole point.

### Clear space + minimum size

- Wordmark clear space: at least the cap-height of "M" on all sides.
- Wordmark minimum size: 16px on screen.
- Never stretch, skew, recolor (outside the palette), add shadows, or outline the wordmark.

---

## 6. The ECG signature detail (spec)

This is the single most brand-distinctive element. Specify it once, use it consistently.

- **Form:** a thin (1.5px) horizontal line with a single QRS-complex pulse spike in the middle — the classic heartbeat trace. Not a literal medical ECG, a stylized one-beat glyph.
- **Color:** `--accent` (maroon), or `--foreground` at low opacity for dividers.
- **Use cases:**
  1. Favicon (pulse in maroon)
  2. Section divider between major landing sections (used 2-3×)
  3. A subtle draw-on animation when it first scrolls into view (once, 600ms, respects reduced-motion)
- **Restraint:** never looping, never more than one animated instance visible at a time, static fallback for reduced-motion.

This detail does what Karpathy's unicorn and Rauno's craft do — it makes the site unmistakably *yours* and quietly reinforces the clinical thesis without a word of copy.

---

## 7. Imagery + iconography

### Photography (the personal interest, on-brand)

Your own photography is the primary imagery on the site's `/photography` section and can subtly appear elsewhere (an about-page portrait, a texture). Because it's yours, it's automatically authentic — a huge advantage over stock. Keep the treatment consistent:
- Warm, natural tones that harmonize with the off-white background
- No heavy filters that fight the palette
- Consistent aspect ratios within a gallery row

### Iconography

- **lucide-react** only. Thin, consistent line icons.
- Never mix icon sets. Never use filled + line icons together.
- Icons are `foreground` or `muted-foreground`, never accent (except a single active state).

### What NOT to use

- No stock photography of people, handshakes, or "doctor with tablet" clichés
- No gradient blobs, no 3D abstract shapes, no AI-generated hero art
- No medical clip-art (stethoscopes, crosses, DNA helixes as decoration)
- No emoji in headings or nav

---

## 8. Layout + spacing principles

- **Generous whitespace.** The single biggest lever for "designed not templated." When in doubt, add space.
- **Section vertical rhythm:** 96px desktop / 64px mobile between major sections.
- **Reading width:** prose maxes at 672px. Galleries/index max at 1200px.
- **Grid:** 4px base unit. All spacing is a multiple of 4.
- **Alignment:** left-aligned text for readability. Center only the hero and short CTAs.
- **One primary action per page.** Never five competing links.

---

## 9. Verbal identity — how you describe yourself

### Name usage
- **BVS Madhavi** — formal contexts (resume, publications, applications)
- **Madhavi** — the site wordmark, casual contexts, bylines

### The role descriptor (use consistently)
Primary: **Clinical AI Engineer** (matches your GitHub, it's clean and accurate)
Alt for research-heavy contexts: **Clinician-Researcher** or **Clinical Data Scientist**

Do not oscillate between five different titles across surfaces. Pick "Clinical AI Engineer" as the default and only deviate when a specific context (a biostatistics application, say) demands it.

### The elevator descriptions (three lengths)

**5 words:** Clinical AI Engineer. MBBS + IIT.

**One sentence:** MBBS-trained clinician and IIT Madras data scientist building at the intersection of clinical AI, real-world evidence, and multimodal health.

**One paragraph:** I'm a Clinical AI Engineer with an MBBS from Andhra Medical College and a Data Science degree from IIT Madras. I currently work on oncology real-world evidence at nference (with AstraZeneca and Mayo Clinic teams), build clinical AI systems from RAG pipelines to fine-tuned medical models, and architect the clinical data layer for a multimodal health platform. Two peer-reviewed publications, Harvard HPAIR delegate, and — away from the screen — a photographer.

### Words to use
clinical, real-world evidence, multimodal, pipeline, validation, ship, build, architecture, oncology, agentic, fine-tune, cohort, signal

### Words to avoid
"passionate about," "thrilled to announce," "leverage synergies," "10x," "ninja/rockstar/guru," "cutting-edge" (show it, don't say it), "revolutionize," "disrupt"

---

## 10. Surface-by-surface application

### Portfolio site
Full brand system. Wordmark "Madhavi" in nav. ECG favicon. Fraunces/Inter/JetBrains Mono. Maroon accent thread. Photography section in-brand.

### Resume (PDF)
Maroon (`#8B2E2A`) as the single accent for section rules and name. Keep otherwise black-on-white for print/ATS safety. (Your current resume uses a navy `#1F3864` — **consider switching that to the maroon** for brand consistency, but only if you're not worried about it reading too warm on formal applications. Navy is the "safe" choice; maroon is the "on-brand" choice. Your call per application.)

### LinkedIn
- Headline: `Clinical AI Engineer · MBBS + IIT Madras DS | Clinical AI, RWE, Multimodal Health`
- Banner: a wide crop of your own photography OR a simple maroon-accented wordmark banner with the ECG line
- About: the one-paragraph description above, expanded

### GitHub
- Already on-brand ("Clinical AI Engineer with an MBBS background and an IIT Madras Data Science degree"). Keep it.
- Add a profile README (`maddydjie/maddydjie` repo) with the same identity, pinned projects, and a link to the portfolio site.

### Social graphics / slide decks
Off-white background, Fraunces titles, maroon accent, ECG mark. Consistent with everything else.

---

## 11. The projects (canonical descriptions)

These are the real, verified project descriptions to use consistently across the site, resume, and GitHub. Grouped by the clinical + technical mix that should always be visible.

### Clinical AI & Systems

**CaseConnect** — AI-powered clinical documentation + hospital management platform for the Indian healthcare ecosystem. Full-stack monorepo: React/React Native front ends, Node/TypeScript microservices, a Python FastAPI voice-AI pipeline (Whisper + scispaCy) that cuts documentation time by ~67%, Kong API gateway with JWT/RBAC, PostgreSQL/Redis/MongoDB/Elasticsearch, ABDM-compliant patient records, DPDP-Act security posture. *Shows: end-to-end systems engineering + deep Indian-healthcare domain knowledge.*
Repo: github.com/maddydjie/case-connect

**MedNavigator** — Retrieval-augmented generation system for evidence-based clinical research: BM25 + BGE dense embeddings + HyDE re-ranking over PubMed abstracts, with GRADE evidence-quality assessment in the answer layer. *Shows: clinical-research-grade RAG + information-retrieval depth.*
Repo: github.com/maddydjie/med_navigator

**MedGemma NeuroAssist** — Fine-tuned MedGemma 1.5 4B on CT brain scans for intracranial hemorrhage detection; full training/eval/inference pipeline. *Shows: medical model fine-tuning + imaging.*

### Multimodal Health & Signals

**Multimodal Health Platform (Stealth)** — Clinical data + agentic AI layer for a platform pairing a consumer smart ring with a clinical-grade ECG patch. Signal processing (Pan-Tompkins QRS, HRV, SQI), per-patient Kalman baselines with Mahalanobis drift detection, a two-tier agentic layer (local SLM + frontier LLM) for clinician-facing reporting, AWS HIPAA-aware stack. NDA-aware: do not name the company. *Shows: production clinical-signal engineering + agentic architecture.*

**watch2compete** — [Wearable-driven fitness/competition app — verify exact description against the repo during build.] TypeScript. *Shows: consumer health + wearables product sense.*
Repo: github.com/maddydjie/watch2compete

### Applied ML & Consumer

**Analog Hour (analog-hr)** — [Anti-doomscrolling / digital-wellbeing behavioral app — verify exact description against the repo during build.] JavaScript. *Shows: consumer product + behavioral design range.*
Repo: github.com/maddydjie/analog-hr

**Pneumonia Detection (CXR)** — TensorFlow CNN classifying chest X-rays at 90% accuracy; recognized at AIWOS ideathon.

**AI-Based Cheiloscopy** — Lip-print biometrics for forensic identification; 60% gender-classification accuracy.

### Research (Space Medicine)

**Olfactory Odyssey** — Cognitive consequences of olfactory inhibition in zero-G. Peer-reviewed, IAF 2025.

**Microgravity-Driven 3D Bioprinting** — Vascular tissue engineering in space. Peer-reviewed, IAF 2025.

**Space BioMed** — Web calculator for tissue-specific bioprinting requirements under microgravity.

### The mix principle

On every surface, ensure BOTH sides are visible: the **clinical** (MBBS, oncology, ABDM, GRADE, ECG, forensic medicine) and the **technical** (RAG, fine-tuning, microservices, Kalman filtering, agentic AI). A visitor should never be able to file you as "just clinical" or "just technical." The interleaving of the two IS the brand.

---

## 12. Brand do / don't summary

**DO**
- Keep one accent color (maroon) as the consistent thread
- Show real artifacts (repos, papers, demos) everywhere
- Interleave clinical + technical signals constantly
- Use generous whitespace and editorial type
- Let your own photography carry the imagery
- Stay understated — the credentials don't need hype

**DON'T**
- Introduce blues/purples/gradients or a second accent
- Use stock photos, medical clip-art, or AI hero art
- Oscillate between five different job titles
- Overclaim experience or fake polish
- Let the photography section outshine or precede the clinical work
- Write in LinkedIn-influencer voice

---

*This brand kit is the source of truth. When the site, resume, or any surface diverges from it, fix the surface — not the kit — unless the kit is deliberately revised and version-bumped.*
