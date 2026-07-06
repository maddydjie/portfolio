# Portfolio PRD v4 — Skill Stack + Real Projects

**Supplements:** PRD v1, v2 addendum, v3 references, and Brand_Kit.md
**Adds:** the exact Claude Code / design skill stack to install, real GitHub project integration, updated content map
**Read last, right before building.**

---

## Part I — The skill stack (install these, not all 42)

The 42-skill directory's own advice is correct: **stack four or five that fight slop at the source, then add eyes.** Installing all 42 would create conflicting instructions and bloat. Here's the precise stack for THIS build, chosen to match the brand kit (editorial, restrained, one accent, motion-with-discipline).

### The core five (install before Day 1)

**1. frontend-design (Anthropic)** — the base taste layer
```
npx skills add anthropics/skills --skill frontend-design
```
Why: forces a committed aesthetic direction and bans default fonts. This is the floor. Our brand kit already answers the purpose/tone/constraints it will ask for — feed it Brand_Kit.md.

**2. animate (Emil Kowalski)** — motion that isn't cheap
```
npx skills add delphi-ai/animate-skill --skill animate
```
Why: exits faster than entrances, transform/opacity only for 60fps, honors reduced-motion. Exactly matches our interaction-polish rules in v2 addendum Part II. This governs the ECG draw-on, hover states, and lightbox transitions.

**3. theme-factory (Composio)** — real token system
```
/plugin marketplace add ComposioHQ/awesome-codex-skills
```
Why: generates colors/spacing/type as CSS variables so the agent never invents a one-off hex. Feed it the exact tokens from Brand_Kit.md Section 3-4 so it codifies OUR system rather than generating a new one. **Important:** override its generated palette with the brand kit values — don't let it pick colors.

**4. playwright-mcp (Microsoft)** — give the agent eyes (highest leverage)
```
claude mcp add playwright -s user -- npx @playwright/mcp@latest
```
Why: the single highest-leverage tool here. It screenshots every page across viewports (1920, 768, 390), compares to reference, and iterates the CSS until it matches. Without this you're trusting a blind model. This is how the site actually reaches "senior-looking" instead of "plausible."

**5. design-motion-principles (kylezantos)** — motion auditor (optional 5th)
```
npx skills add kylezantos/design-motion-principles
```
Why: flags scale(0) starts, bare easing, missing reduced-motion. A second pair of eyes on motion specifically. Optional — animate (#2) covers most of this. Add only if you want the extra audit pass.

### Deliberately NOT installing (and why)

- **impeccable / design-taste-frontend** — good, but they're *alternative* base taste layers. Running them alongside frontend-design creates competing taste instructions. Pick ONE base layer (we picked frontend-design). Don't stack base layers.
- **theme-factory + brandkit together** — brandkit generates brand boards from scratch; we already HAVE a brand kit. Skip brandkit, use theme-factory only to codify our existing tokens.
- **nano-banana / banana-claude / algorithmic-art / canvas-design** — image/art generators. We're using your real photography, not generated art. The one exception: `algorithmic-art` *could* generate a subtle hero texture, but the brand kit says no AI hero art — so skip.
- **remotion / blender / aftereffects** — video/3D. Not needed for a portfolio site.
- **The entire AI Product Interaction + Prompt Architecture + Trust & Safety layers (skills 24-42)** — these design the *behavior of AI products*, not websites. Irrelevant to a portfolio build. (They'd be relevant to your NexaCura agentic-nurse work, not this.)

### The stack, summarized

```
Base taste:  frontend-design      (aesthetic floor, bans slop fonts)
Motion:      animate              (60fps, reduced-motion, tasteful)
Tokens:      theme-factory        (codify brand kit as CSS vars)
Eyes:        playwright-mcp       (screenshot → compare → fix loop)
(optional)   design-motion-principles  (motion audit)
```

Four core + one optional. Exactly the "stack four, not forty-two" the directory itself recommends.

---

## Part II — How the skills interact with our docs

The skills set the *aesthetic floor*. The brand kit and PRDs set the *specific direction*. Order of authority when they conflict:

1. **Brand_Kit.md** — wins on all color, type, voice, and identity questions
2. **PRD v1/v2/v3** — win on structure, content, and interaction rules
3. **Skills** — fill in craft defaults where the docs are silent

**Concretely, tell Claude Code:**
> "The skills provide craft defaults. When frontend-design or theme-factory suggests a color, font, or spacing value, override with the exact values in Brand_Kit.md. The skills improve HOW we build; the brand kit decides WHAT we build."

This prevents the classic failure where a taste skill picks a beautiful palette that isn't yours.

---

## Part III — Real GitHub projects (verified) + integration

Your GitHub (github.com/maddydjie) has these public repos. Descriptions below are verified from the repos where fetched, flagged where they need checking during build.

### Verified

**CaseConnect** (`case-connect`, TypeScript)
- Verified: AI-powered clinical documentation + hospital management platform for the Indian healthcare ecosystem. Monorepo (Turborepo + pnpm workspaces). React 18/Vite web, React Native/Expo mobile, Node/Express/TypeScript microservices, Python FastAPI voice-AI (Whisper + scispaCy, ~67% documentation-time reduction), Kong gateway (JWT/RBAC), PostgreSQL 16/Prisma, Redis, MongoDB, Elasticsearch, MinIO, Auth0 MFA/SSO, Socket.io. Features: LiveBedMap, DocuStream OCR pipeline, AI Case Tutor (10K+ simulations), ABDM-compliant health vault, DPDP-Act compliance.
- **This is your strongest full-stack systems piece.** Feature it prominently. It proves you ship real, complex, production-grade architecture — not notebooks.
- Live: case-connect-api.vercel.app
- Category: Clinical AI & Systems (feature on landing)

**MedNavigator** (`med_navigator`, Python)
- RAG for clinical research: BM25 + BGE dense embeddings + HyDE + GRADE. (Matches your existing description.)
- Category: Clinical AI & Systems (feature on landing)

### To verify during build (fetch the repo READMEs on Day 3)

**watch2compete** (`watch2compete`, TypeScript)
- Likely: a wearable-data fitness/competition app (steps/activity leaderboards, watch integration). **Read the README during build and write the accurate description.** Do not publish a guessed description.
- Category: Multimodal Health & Consumer

**analog-hr** (`analog-hr`, JavaScript)
- Likely: Analog Hour — the anti-doomscrolling / digital-wellbeing behavioral app. **Read the README during build and confirm.**
- Category: Applied ML & Consumer

### Not on GitHub (describe from your own materials)

- **MedGemma NeuroAssist** — fine-tuned MedGemma for ICH detection (if there's a repo or notebook, link it; if not, present as a project with results)
- **Multimodal Health Platform (Stealth)** — NDA-aware, no company name, no repo link
- **Pneumonia Detection, AI Cheiloscopy, Space BioMed** — from your resume/materials
- **IAF papers** (Olfactory Odyssey, 3D Bioprinting) — link to the IAF/publication PDFs

### GitHub profile README (do this too — 20 min, high impact)

Create a `maddydjie/maddydjie` repo with a `README.md` that auto-displays on your profile. Content:
- The identity line (already your bio)
- Pinned project one-liners with links
- Link to the portfolio site (once live)
- Optional: a subtle "currently building / currently reading" line matching the site's footer

This is documented as one of the highest-signal, lowest-effort moves for technical credibility. Recruiters check GitHub profiles first.

---

## Part IV — Updated content map (the clinical + technical mix, made explicit)

The brand thesis is the *interleaving* of clinical and technical. The `/work` page buckets must make both visible at a glance. Updated bucket structure:

### `/work` — four buckets, each showing the mix

**1. Clinical AI & Systems**
- CaseConnect (systems + clinical documentation + Indian healthcare)
- MedNavigator (RAG + clinical research)
- MedGemma NeuroAssist (fine-tuning + imaging)
- *(context card)* nference oncology RWE (with AstraZeneca + Mayo teams)

**2. Multimodal Health & Signals**
- Multimodal Health Platform / Stealth (signal processing + agentic AI)
- watch2compete (wearables + consumer)
- *(post-hackathon)* Silent Guardian (federated learning + cardiac)

**3. Applied ML & Consumer**
- Analog Hour (behavioral design + consumer product)
- Pneumonia Detection (CNN + medical imaging)
- AI Cheiloscopy (forensic + biometrics)

**4. Research — Space Medicine**
- Olfactory Odyssey (IAF paper)
- Microgravity 3D Bioprinting (IAF paper)
- Space BioMed (calculator)

Each bucket intentionally spans clinical AND technical. A reader scanning any single bucket sees a clinician who codes and an engineer who understands medicine.

### Landing page featured (3, chosen to showcase the mix)

1. **CaseConnect** — the systems/builder proof (technical heavyweight, clinical domain)
2. **MedNavigator** — the clinical-AI/research depth (RAG + GRADE)
3. **Olfactory Odyssey** — the range/research/publication signal (unique, memorable)

This trio says: I build complex systems, I do rigorous clinical AI, and I have real research range. Exactly the brand.

---

## Part V — Updated first message to Claude Code

```
Read in this order:
1. docs/Brand_Kit.md
2. docs/PRD.md
3. docs/PRD_v2_addendum.md
4. docs/PRD_v3_references.md
5. docs/PRD_v4_skills_projects.md
6. .claude/CLAUDE.md

Installed skills (frontend-design, animate, theme-factory, playwright-mcp)
provide craft defaults. When any skill suggests a color, font, or spacing
value, OVERRIDE with the exact values in Brand_Kit.md. Skills decide HOW
we build; the brand kit and PRDs decide WHAT.

We're on Day 1. Enter plan mode (don't edit). Propose the Day 1 setup:
Next.js 15 + TS + Tailwind + App Router, Biome, fonts (Fraunces/Inter/
JetBrains Mono), and use theme-factory to codify the Brand_Kit.md tokens
into tailwind.config.ts + globals.css (do not let it generate its own
palette — use ours). Then build the base primitives (Section, Nav with
"Madhavi" wordmark, Footer, Prose, Tag, ProjectCard, EcgDivider).

Do not build page content or the photography section yet. After you show
the plan and I approve, execute step by step, committing after each
component. Use playwright to screenshot each primitive at 1920/768/390
and show me before claiming done.
```

---

## Part VI — Updated Day-0 checklist

Before Claude Code starts:

- [ ] Register domain (bvsmadhavi.com / .dev / .in)
- [ ] Create repo `bvsmadhavi-site`, private
- [ ] Add to `docs/`: Brand_Kit.md + all four PRDs
- [ ] Add to `.claude/`: CLAUDE.md + skill/command/hook files (from v2 addendum)
- [ ] Install the 4 core skills (Part I above)
- [ ] Create the `maddydjie/maddydjie` GitHub profile README
- [ ] Draft CaseConnect + MedNavigator write-ups (your two featured technical pieces)
- [ ] Read the watch2compete + analog-hr READMEs, note accurate descriptions
- [ ] Pick + optimize 12-24 photos to WebP for the photography section
- [ ] Export canonical resume to PDF → `public/resume.pdf`

---

## Part VII — One honest note on the skills

The skills get you to "senior-looking" defaults fast. But the directory's own closing line is the truth: *"taste still comes from understanding the constraints, not from a blocklist of banned fonts. The judgment about which direction to commit to is still yours."*

The brand kit IS that judgment, written down. It commits to a direction (warm editorial, one blood-maroon accent, serif+sans duality, ECG signature, real photography, clinical+technical interleaving). The skills execute that direction with craft. Don't let the skills talk you out of the committed direction toward their generic-but-safe defaults. When frontend-design suggests something beautiful but off-brand, the brand kit wins.

---

*End of PRD v4. The doc set is complete. Build.*
