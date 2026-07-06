# Best Portfolios — Deep Research Reference

_Auto-generated from 21 researched items. Uncertain/unverified fields are omitted. For the synthesized build guidance see **BRIEF.md**._

## Contents

1. [Andrej Karpathy](#andrej-karpathy)
2. [Animated SVG signature stroke dasharray](#animated-svg-signature-stroke-dasharray)
3. [Brittany Chiang](#brittany-chiang)
4. [Bruno Simon](#bruno-simon)
5. [Clarity AI research template](#clarity-ai-research-template)
6. [Clement Grellier](#clement-grellier)
7. [Darpan Jain](#darpan-jain)
8. [Emil Kowalski](#emil-kowalski)
9. [Framer Vertical Sharp templates](#framer-vertical-sharp-templates)
10. [Jordan Delcros](#jordan-delcros)
11. [Josh Comeau](#josh-comeau)
12. [Lee Robinson](#lee-robinson)
13. [Obys Agency](#obys-agency)
14. [Paco Coursey](#paco-coursey)
15. [Pentagram](#pentagram)
16. [Rauno Freiberg](#rauno-freiberg)
17. [Simon Willison](#simon-willison)
18. [Stas Bondar](#stas-bondar)
19. [Studio Herrstrom](#studio-herrstrom)
20. [Webflow BERGEN Mokat Lucide Teo templates](#webflow-bergen-mokat-lucide-teo-templates)
21. [kozodoi website](#kozodoi-website)

---

## Andrej Karpathy

### Identity & Hero
- **Hero:** Single-column, centered hero: a circular/square professional headshot (assets/me_new.jpg) sits at the very top, directly above an h1 'Andrej Karpathy', followed by a one-line self-deprecating tagline 'I like to train deep neural nets on large datasets 🧠🤖💥', then a centered row of ~5 SVG social icons (Twitter/X, GitHub, RSS, Medium, email). No nav bar, no CTA, no chrome. First-5-second credibility comes from the recognizable face plus the immediately-following reverse-chronological timeline whose first entries read OpenAI / Tesla / Stanford — the work itself is the hero, not the site design.
- **Wordmark / Identity:** Name is set as a plain semantic h1 in the default/system serif at a modest large size — no logotype, no monogram, no kinetic or variable type. Identity is carried entirely by the headshot + the timeline of institutions, never by a graphic mark. No graphic doubles as a logo.
- **Signature Detail:** The single ownable element is a jarring absurdist 'Order of the Unicorn' paragraph ('Andrej Karpathy commands not only the elemental forces that bind the universe...') dropped into an otherwise serious minimal page. It is used exactly once, with restraint, as tonal subversion — a personality glyph rendered in prose rather than pixels. Emoji (🧠🤖💥, 🤦‍♂️) act as a secondary recurring tonal signature.

### Typography & Layout
- **Color / Accent Discipline:** Effectively monochrome: dark text on white, default-blue links. The only chromatic accent is emoji in the tagline. 0% dedicated brand color, no gradients, no section-tinting. Accent discipline is total abstinence — color never carries meaning across sections.

### Motion
- **Motion:** No motion at all: no entrance/exit animation, no scroll effects, no hover embellishment beyond default link underline. Static SVG social icons. Transform/opacity discipline is effectively 100% static — a deliberate rejection of animation in service of instant load.

### Content Presentation
- **Project Presentation:** 'Pet projects' shown as a dense vertical list (not cards): each entry is a title + one playful first-person sentence ('micrograd is a tiny scalar-valued autograd engine (with a bite! :))') + a small thumbnail image. Real artifacts are linked directly (GitHub repos). No filtering, no tags — just scannable one-liners with visual mnemonics.
- **Research-Artifact Presentation:** Distinct citation-style reverse-chronological publication list: linked paper title, italic venue + year + presentation type ('CVPR 2016 (Oral)'), then full author list with '*' denoting equal/first-author contribution (e.g. 'Justin Johnson*, Andrej Karpathy*, Li Fei-Fei'). Titles link to PDFs/project pages. No DOI, no BibTeX, no abstracts — minimalist academic metadata only.
- **Writing / Blog Integration:** Writing lives on three external blogs (GitHub Pages, Medium, Bear Blog), NOT fused into the site as a CMS feed. The portfolio instead curates a hand-picked 'featured writing' section — ~10 landmark posts as a dated linked list spanning 2012-2021 — with a self-aware note 'I have three blogs 🤦‍♂️'. Writing coexists with work as a curated index rather than a live stream.
- **Photography / Imagery:** Only one personal image: the top headshot. Everything else is institutional logos (Tesla, OpenAI, Stanford, Google, UBC, Toronto) used as visual timeline anchors, plus small project thumbnails. Zero lifestyle/candid photography — imagery is purely functional and never dominates the text.

### Navigation & Conversion
- **Navigation:** No navigation whatsoever — single-page linear scroll. Wordmark/name sits at the top of the scroll, not in a persistent bar; no sticky header, no hamburger, no anchor menu. Section order is reverse-chronological (2024 down to 2005): hero, timeline, bio, talks, teaching, writing, pet projects, publications, misc.
- **Trust / Credibility:** Credentials are woven throughout the reverse-chron timeline rather than boxed in an About block: OpenAI, Tesla (Director of AI), Stanford PhD, CS231n instructor, plus name-dropped advisors (Fei-Fei Li, Andrew Ng). Publication list and media mentions reinforce authority. Density is high but hero stays uncluttered because trust unfolds below the fold.
- **Contact / Conversion:** Low-friction, passive: a row of social icons in the hero is the only surface. Email is hidden behind a 'click to reveal' tooltip icon (spam prevention). No contact form, no Cal.com, no 'work with me' CTA — engagement is expected to happen on Twitter/GitHub.

### Engineering
- **Performance / Weight:** Extreme performance-as-design: explicitly '0 frameworks... pure HTML and CSS in two static files' because the author is 'seriously allergic to 500-pound websites'. No JS framework, no webfont download, SVG icons, no analytics/trackers. Result is a tiny payload (likely <50KB), near-instant load, and ~0 CLS.

### Synthesis
- **Takeaway:** STEAL: embed credibility in a reverse-chronological timeline of affiliations plus a strict citation-style research list (linked title, italic venue+year, '*' authorship) — it reads as clinical, verifiable, and self-updating, perfect for a clinical+technical brand. AVOID: the total absence of motion, dark mode, and any accent color — this works for a famous name whose reputation IS the design, but a Madhavi build needs its maroon accent, an editorial hero, and the ECG signature motion to feel designed rather than merely bare.

---

## Animated SVG signature stroke dasharray

### Identity & Hero
- **Hero:** The ECG draw-on is the hero's single kinetic event, not a decoration. Layout: name + role set left/centered in the editorial column; directly beneath the wordmark sits one thin maroon ECG QRS-complex path (a flat baseline that spikes into the R-wave then returns to baseline). On first paint the line is invisible; within ~150ms it draws left-to-right over ~600ms, then holds static forever. Credibility in the first 5s comes from the restraint: one accent color, one motion, resolution-independent vector, zero layout shift (the SVG reserves its box via width/height + viewBox so CLS=0). The heartbeat metaphor reads instantly as clinical + technical, doing identity work without a logo file.
- **Wordmark / Identity:** Yes — the ECG glyph is intended to double as the wordmark ligature. Two viable integrations: (1) the QRS spike replaces or underlines a letter in 'Madhavi' (e.g., the ascender/tittle or an underline that spikes once under the name), so the name and the heartbeat share one SVG; (2) a standalone monogram-scale ECG mark sits to the left of the logotype in the nav, drawn once on load. Recommended: name set in the site's serif (Fraunces-adjacent) with the ECG as an animated underline path grouped in the same <svg> as the text baseline, so the mark is inseparable from the name. Keep it monochrome maroon so it survives favicon/OG/dark-mode reduction. The path is authored once and reused (nav + hero + footer) via <use xlink:href>.
- **Signature Detail:** THE ownable element. A single 1.5px maroon ECG QRS-complex <path> that draws itself via stroke-dasharray/stroke-dashoffset. Implementation: author one <path> in an <svg viewBox="0 0 240 40"> (flat baseline -> small P bump -> sharp R spike up -> S dip -> baseline). Set stroke-width:1.5, stroke:var(--maroon) (#7B1E2B / oklch ~0.42 0.12 20), fill:none, stroke-linecap:round, stroke-linejoin:round. Get length once: `const L = path.getTotalLength()`. Set `stroke-dasharray:L; stroke-dashoffset:L` so the whole stroke is pushed 'off' and the path is invisible. Animate stroke-dashoffset from L to 0 to reveal it left-to-right. Restraint rules: draw ONCE per page view (not on every scroll), never loop, no color cycling, no glow — it fires, completes in ~600ms, and becomes a static line. That single, non-repeating gesture is what makes it memorable rather than gimmicky. Minimal sketch:
<svg class="ecg" viewBox="0 0 240 40" width="240" height="40" fill="none" stroke="var(--maroon)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path class="ecg__path" d="M0 20 H80 l6 -3 6 6 4 -20 5 34 5 -17 H240"/>
</svg>
CSS:
.ecg__path{stroke-dasharray:var(--len);stroke-dashoffset:var(--len);}
.ecg.is-drawn .ecg__path{animation:ecg-draw 600ms cubic-bezier(.65,0,.35,1) forwards;}
@keyframes ecg-draw{to{stroke-dashoffset:0;}}
JS (measure real length, then trigger):
const p=document.querySelector('.ecg__path');
const L=p.getTotalLength();
p.parentElement.style.setProperty('--len',L);
// add .is-drawn on load or via IntersectionObserver (see motion field).

### Typography & Layout
- **Whitespace & Layout:** The ECG wants generous horizontal room to read as a heartbeat — give it the full reading-column width (~640–720px) with clear vertical padding above/below so the spike has air. Author the SVG at intrinsic aspect ratio and let it scale to 100% width of its column; keep it on its own baseline row rather than crowding it against text. The reserved SVG box (width+height attrs matching viewBox ratio) is what preserves vertical rhythm and prevents reflow when the path animates.
- **Color / Accent Discipline:** Perfect fit for single-accent discipline: the ECG is the ONLY place maroon moves. Stroke uses var(--maroon); it occupies <1% of the visual field (a 1.5px line). Because it is the sole animated maroon element, it anchors the whole accent system — everything else stays neutral (ink/paper), and the heartbeat is the recurring maroon signature across nav, hero, and footer via one reused path.
- **Light / Dark & Tone:** Single maroon holds across themes if you drive stroke via a CSS custom property: --maroon: #7B1E2B in light, lightened to ~#C05A66 (raise oklch lightness ~0.62) in dark so the 1.5px line keeps contrast on a dark ground. The stroke is currentColor-friendly: set stroke="currentColor" and control color via the theme token, so the same <path> recolors automatically. Dark mode makes the thin maroon line 'pop' more, reinforcing the signature. Verify >=3:1 non-text contrast for the stroke in both themes.

### Motion
- **Motion:** This is the motion centerpiece. Two triggers to implement: (1) ON LOAD for the hero mark — add class after first paint (requestAnimationFrame or a tiny setTimeout) so the browser has the initial dashoffset:L committed before animating, avoiding a flash of the full line. (2) ON SCROLL-INTO-VIEW for any repeat ECG lower on the page — use IntersectionObserver with threshold ~0.35 and `once` semantics (unobserve after firing) so it draws exactly once when it enters, never re-triggers. Timing: ~600ms duration, easing cubic-bezier(.65,0,.35,1) (ease-in-out) so the spike doesn't feel linear/robotic; linear is acceptable if you want a steady 'tracing' feel like an actual monitor. Discipline: animate ONLY stroke-dashoffset (a paint-cheap property on a single thin path), no transform/opacity churn, no loop, animation-fill-mode:forwards so it stays drawn. IntersectionObserver runs off the main thread (smoother than scroll listeners). JS sketch:
const io=new IntersectionObserver((entries,obs)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('is-drawn');obs.unobserve(e.target);}
  });
},{threshold:.35});
document.querySelectorAll('.ecg').forEach(el=>{
  const p=el.querySelector('.ecg__path');
  el.style.setProperty('--len',p.getTotalLength());
  io.observe(el);
});
- **Reduced-Motion & A11y:** Load-bearing for clinical credibility. Provide a STATIC DRAWN fallback (never a blank line). Preferred approach — CSS-only guard so no JS is required for the fallback:
@media (prefers-reduced-motion: reduce){
  .ecg__path{animation:none !important;stroke-dashoffset:0 !important;}
}
This renders the full ECG line immediately, fully visible, with zero motion. Also gate the JS: `const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;` — if reduce, add .is-drawn/set dashoffset:0 without observing, so IO never animates. Accessibility: mark the decorative SVG aria-hidden="true" (it conveys no textual info beyond the name it underlines); if the ECG is part of the wordmark, wrap it with the name in an element carrying an accessible name (e.g., <a aria-label="Madhavi — home">). No focus trap, no keyboard interaction needed (it is non-interactive). Ensure the drawn stroke meets >=3:1 non-text contrast in both themes.

### Navigation & Conversion
- **Navigation:** The ECG monogram (or name-underline) sits in the nav as the wordmark/home link. Draw it once on load, then keep static across route changes (persist a 'drawn' flag in sessionStorage or a top-level layout so it doesn't re-animate on every client navigation — re-drawing on each page view would become annoying). Place it top-left as the standard home affordance.
- **Trust / Credibility:** The clinical heartbeat motif quietly signals a medical/health-adjacent domain, supporting credibility without cluttering the hero. The static, precise 1.5px line reads as intentional and controlled — an implicit trust signal. No explicit credential surfacing comes from this technique.

### Engineering
- **Performance / Weight:** A major strength. The entire signature is one inline <svg> path: sub-1KB of markup, zero image requests, zero external font/library dependency, resolution-independent (crisp on any DPR, scales freely). Animation touches only stroke-dashoffset on a single thin path — cheap paint, no layout, no compositor-heavy transforms. Prefer inline SVG in the HTML (not an <img> src) so getTotalLength() works and the stroke inherits theme tokens. Reserve the box via width/height attributes matching the viewBox ratio to guarantee CLS=0. IntersectionObserver + a ~15-line script is the only JS; it can be deferred/inlined. No impact on LCP if the SVG is small and above-the-fold markup is minimal. One caveat: calling getTotalLength() forces a layout read — batch all reads before writes to avoid layout thrash when multiple ECG instances exist.

### Synthesis
- **Takeaway:** STEAL: the single-fire, draw-once ECG via stroke-dasharray/stroke-dashoffset — ~600ms, one 1.5px maroon path, prefers-reduced-motion static-drawn fallback, IntersectionObserver with unobserve-after-fire, and reuse of one authored path across nav/hero/footer. It delivers a resolution-independent, sub-1KB, CLS-safe signature that fuses the clinical (heartbeat) and technical (crafted SVG) brand in one gesture. AVOID: looping or re-triggering the animation (on scroll re-entry or every route change) and any glow/color-cycle embellishment — a heartbeat that keeps redrawing reads as a loading spinner and destroys the restraint that makes it ownable. Also avoid animating anything but stroke-dashoffset, and never leave a blank line for reduced-motion/no-JS users (always render the drawn state).

---

## Brittany Chiang

### Identity & Hero
- **Hero:** Split-screen: the left half is a sticky/fixed panel (~50vw) that stays put while the right half scrolls. Left panel stacks large name 'Brittany Chiang' (~clamp 40-48px, bold), role 'Front End Engineer' beneath, and a one-line value tagline ('I build accessible, pixel-perfect experiences for the web'). Below that sits an in-page nav (About / Experience / Projects) and a bottom-anchored row of social icon links. Credibility in first 5s = crisp benefit-copy ('accessible, pixel-perfect'), tight vertical hierarchy, and a spotlight radial-gradient that follows the cursor on the dark navy background signaling engineering polish.
- **Wordmark / Identity:** No logotype or monogram; the name is set as plain large bold sans (Inter/Calibre) with tight leading. Identity is carried by the layout system (split-scroll + cursor spotlight + teal accent) rather than a drawn mark. The name doubles as the top of the sticky left rail.
- **Signature Detail:** Two ownable elements: (1) a cursor-following radial 'spotlight' gradient over the dark background — a soft light circle tracking the mouse; (2) the teal-green accent (#64ffda in v4 lineage) used only on active nav dots, link hovers, and the animated left-border/arrow markers. Restraint = the glow is very low-opacity and the accent appears on <5% of pixels. In the earlier v4 the signature was the monospace numbered section headers and the underline-slide link animation.

### Typography & Layout
- **Typography:** Sans-only system. Live site uses Inter; the influential v4 used Calibre (fallback Inter/SF Pro). Monospace 'SF Mono' used for small labels, dates, and technology tags. Type scale (v4 tokens): 12/13/14/16/18/20/22px steps with a 32px heading. No serif pairing — this is a pure-sans, mono-accented developer voice, the opposite of a Fraunces/Inter editorial pairing.
- **Whitespace & Layout:** Two-column 50/50 split at desktop; each half has its own generous internal padding. Reading width on the scrolling right column is constrained (~single narrow measure). Sections (About, Experience, Projects) are separated by large vertical gaps. On mobile the split collapses to a single stacked column. Alignment is strictly left-aligned with a consistent baseline rhythm, which is what makes it read as designed not templated.
- **Color / Accent Discipline:** Single teal-green accent (#64ffda / teal-300-like) on a desaturated navy-slate neutral base. Accent occupies a very small share of the visual field — reserved for link hover, active-section indicator, arrows, and a 10%-opacity tint behind hovered project cards. Everything else is a cool grey/navy scale (slate #8892b0 body, lightest-slate #ccd6f6 headings). Accent behavior is consistent across all sections: it only ever means 'interactive / active'.
- **Light / Dark & Tone:** Primarily a dark theme (deep navy #0a192f base, near-white #e6f1ff text); a light mode exists on the live site. The cool navy/teal tone makes project thumbnails and code-adjacent content pop. A single accent (teal) holds regardless of theme — classic dark-mode-makes-work-pop pattern.

### Motion
- **Motion:** Restrained transform/opacity only. Default transition is 'all 0.25s cubic-bezier(0.645,0.045,0.355,1)' (ease-in-out-back-ish). Entrance: sections fade+translate up slightly on scroll (IntersectionObserver-driven staggered reveal, ~short delays). Hover: links get an underline-slide/color shift to teal; project rows lift with a subtle translateY and a faint teal tint. The cursor spotlight moves in real time via mousemove. No parallax, no big scroll-jacking — motion is quiet and functional.

### Content Presentation
- **Project Presentation:** Projects as a vertical LIST of link-rows (not a card grid). Each row: small thumbnail/screenshot, project title (links to live demo/repo), a short description, a horizontal list of tech tags in monospace pills, and inline external-link/GitHub icons. Featured items add social proof inline (e.g. 'Halcyon Theme — 100k+ Installs'). Hovering a row highlights the whole block. An 'Archive / View Full Project Archive' link leads to a denser table of secondary projects.
- **Writing / Blog Integration:** A 'Writing' section coexists inline with the portfolio, presented in the same text-first + thumbnail list style as projects, ordered reverse-chronologically (2026 back to 2019) with title + date. It reads as a lightweight essay/article index fused into the single-page scroll rather than a separate blog with heavy CMS chrome.
- **Photography / Imagery:** Imagery is limited to small project/writing thumbnails; no personal photography stream. Media never dominates — text is primary, images are secondary supporting crops. A playful GIF Easter egg (spinning Doctor Who Tardis, 'Click to time travel!') lives in the footer as the only decorative personal media.

### Navigation & Conversion
- **Navigation:** Single-page anchor nav (About / Experience / Projects, plus Writing) lives in the sticky left rail; the active section is indicated by a lengthening line + teal label as you scroll. Wordmark/name sits above the nav; social icons pinned at the bottom of the rail. No top sticky bar — the whole left column is the persistent nav.
- **Trust / Credibility:** Affiliations surfaced via the Experience list (employer names, roles, dates) and via product traction numbers ('100k+ installs') rather than logos in the hero. Social/professional links (GitHub, LinkedIn, CodePen, Instagram, Goodreads) sit quietly at the bottom of the left rail, keeping the hero uncluttered.
- **Contact / Conversion:** Low-pressure conversion: primary path is the email/social links in the sticky rail and a closing 'Get In Touch' style section at the end of the scroll with a single email CTA button. No Cal.com/booking widget; conversion relies on a clear final email CTA plus ever-present social links.

### Synthesis
- **Takeaway:** STEAL: the sticky-left / scrolling-right split with a single restrained accent that only ever means 'active/interactive' — perfect vessel for a maroon accent + a low-opacity signature glow (swap the cursor spotlight for a subtle ECG pulse that respects reduced-motion). AVOID: the pure all-sans, mono-labeled developer voice — it reads generic-dev and undercuts the editorial-minimal + clinical brand; pair a serif (Fraunces) for headings instead of leaning on Inter/mono alone.

---

## Bruno Simon

### Identity & Hero
- **Hero:** There is no conventional hero — the entire viewport boots into a full-screen WebGL/Three.js 3D world you literally drive a car through (WASD/arrows, SHIFT to boost). A small home-preview panel states 'My name is Bruno Simon, and I'm a creative developer (mostly for the web)' with the prompt 'Please drive around to learn more about me and discover the secrets of this world.' Credibility in the first 5 seconds is pure technical spectacle: physics-driven car, terrain, ambient audio, and playful objects. The site IS the demo — it proves WebGL mastery instantly, but there is no scannable name/role/value hierarchy the way a clinical brand needs; you must play to learn anything.
- **Signature Detail:** The single ownable element is the driveable physics car — the whole navigation metaphor. It is unforgettable and 100% his, but it is the opposite of restraint: it is maximal, all-consuming, and non-transferable. Secondary signatures are the hidden 'secrets/achievements' and the 'I'm stuck! / respawn' rescue affordances. Lesson for the ECG signature: this is what NOT to do — the signature here is not a quiet accent applied with restraint, it is the entire product, so it can never sit calmly beside editorial content.

### Typography & Layout
- **Whitespace & Layout:** There is no page grid, reading width, or vertical rhythm — layout is a 3D physical space, not a document. UI chrome (menu icons for map, settings, achievements, sound) floats over the canvas. 'Designed not templated' is achieved by building a bespoke world rather than by editorial spacing, so none of the whitespace/measure/alignment discipline a text portfolio relies on is present or borrowable here.

### Motion
- **Motion:** Motion is the entire experience and the antithesis of restraint: real-time physics (car via Rapier/Cannon.js), camera drag, hydraulics, ambient animation, audio — all running continuously at frame rate rather than as discrete entrance/exit transitions. There is no transform/opacity-and-easing discipline to study because nothing is a scroll reveal; it is a live simulation. Craft is extremely high, but as a restraint reference it is a pure ceiling-of-too-much cautionary case.

### Content Presentation
- **Project Presentation:** Projects are not cards or a list — they are objects placed inside the world that you drive up to and interact with (ENTER to interact), plus a 'Circuit' racing section and a 'Behind the Scene' technical section. There is no scannable index, no case-study density, no repos/screenshots grid; discovery is exploratory and non-linear. Great for delight, useless as a fast, comparable project index — the opposite of what a clinical portfolio needs.
- **Photography / Imagery:** No personal photography — all imagery is generated 3D geometry, textures, and Blender assets composing the scene. Media doesn't coexist with technical work; media IS the technical work. No model here for letting personal photos sit quietly beside projects.

### Navigation & Conversion
- **Navigation:** Navigation is spatial: drive the car to move through the world, with a floating icon menu (map, settings, achievements, sound) and interaction prompts. No wordmark-anchored top bar, no sticky text nav, no linear item order — the map/teleport features exist precisely because free spatial nav is disorienting. Not a transferable nav structure.
- **Trust / Credibility:** Credibility is demonstrated, not stated — the sheer technical feat is the proof (the site went viral, 400k+ visitors, Awwwards Site of the Month + high jury scores ~8.0). Affiliations/credentials are largely absent from the experience itself; there is no clean 'affiliations/collaborators/credentials' strip. Trust comes entirely from spectacle rather than from surfaced, scannable evidence.
- **Contact / Conversion:** Conversion is weak and community-flavored: contact routes through Discord (a public community server plus direct DM with a slow-response caveat) rather than email, a booking link, or a CTA. There is no Cal.com/mailto conversion funnel — appropriate for a creator with inbound demand, wrong for a brand that needs to reliably turn a visitor into an email/booking.

### Synthesis
- **Takeaway:** AVOID nearly everything structurally: WebGL-world-as-navigation, motion that cannot be reduced, no scannable name/role/value hero, no project index, spectacle-instead-of-stated-credibility, and Discord-only contact — every one of these is disqualifying for an editorial-minimal, clinical+technical brand that must load fast, read in 5 seconds, and honor prefers-reduced-motion. The ONE thing still worth stealing (in spirit only, dialed down ~95%): the idea of a single ownable signature moment that people remember — but where Bruno makes it the entire site, Madhavi should make the ECG a small, restrained, static-by-default accent (a maroon ECG-as-ligature in the wordmark) that animates once, quietly, and never becomes the product.

---

## Clarity AI research template

### Identity & Hero
- **Hero:** No traditional splash hero. The template opens editorial-style: large project title 'Clarity: A Minimalist Website Template for AI Research' with author attribution 'by Shikun Liu' set directly beneath, then a short intro paragraph. Credibility signals come from the artifact itself (Distill-like article layout, clean serif body, embedded interactive figures) rather than a photo or role tagline. STEAL: leading with a titled artifact + one-line attribution instead of a marketing hero suits a paper-first / research-index page.
- **Wordmark / Identity:** Identity is purely typographic: the word 'Clarity' set in Poppins as a plain logotype, no monogram or graphic mark. The name doubles as the page title; no separate persistent wordmark in a fixed nav. Identity is carried by the consistent Poppins (UI/headings) + Charter (body) pairing rather than a logo.
- **Signature Detail:** The single ownable element is the interactive figure vocabulary borrowed from Distill: a horizontal image-comparison slider, a dot-menu 'slide display' that steps through sequential visuals, and gray-tinted figure containers ('gray' and 'gray-linear' gradient-edge variants) that set diagrams apart from the reading column. Used with restraint — figures sit in wider containers while text stays in a narrow measure, so the interactive element is the memorable, ownable moment on the page.

### Typography & Layout
- **Typography:** Deliberate serif/sans split: Poppins (geometric sans, Google Fonts) for headings/UI, Charter (transitional serif) for body copy, Fira Code for code, and Gyre-Pagella for LaTeX/math via MathJax. This is an academic analog to a Fraunces/Inter pairing — warm serif reading text against a clean sans for structure. Weights and sizes described as 'carefully tuned to be visually balanced and responsive.' Tabular/math figures handled by the dedicated math font.
- **Whitespace & Layout:** Distill-style single narrow reading column (Charter body) with figures allowed to break out into wider containers. Container system offers five widths: main, large, extra-large, extra-extra-large, max — so body text stays at a comfortable measure while diagrams span wider. A simple CSS grid via columns-x classes (e.g. columns-6) handles multi-column figure rows. 'Designed not templated' comes from the disciplined narrow-text / wide-figure rhythm and generous vertical spacing.
- **Color / Accent Discipline:** Low-contrast, pastel-leaning palette: grays and dark blue carry common/structural elements, while warmer orange/red are reserved to highlight important design elements. Accent occupies a small share of the field — it appears only on emphasis, links, and callouts, never as background washes. Restraint is the whole point of the 'Clarity' brand.

### Motion
- **Motion:** Motion is confined to purposeful, user-driven interactions rather than scroll/entrance animation: a draggable comparison slider, a dot-menu slide stepper, a selection menu for conditional prompts, and video controls with playback-speed adjustment. No decorative scroll or hover choreography. Transform is limited to the interactive widgets. STEAL: motion earns its place only when it helps the reader compare or step through artifacts.

### Content Presentation
- **Project Presentation:** Projects are individual article-style pages (not a card grid), each embedding visual examples — neural-architecture diagrams, comparison sliders, videos — inside gray figure containers. Recommendation in docs: put complex diagrams in a separate distinct-background container. Density is high per-page and long-form, closer to a paper/blog than a portfolio card.
- **Writing / Blog Integration:** Writing is the primary surface — the template explicitly supports interactive blog posts alongside research publications, so essays and papers share the same article layout and component set. There is no separate CMS; content is authored directly in HTML/CSS/JS pages. Blog and research coexist as the same artifact type.
- **Photography / Imagery:** Imagery is technical, not personal: diagrams, model outputs, comparison images, and video sit in dedicated gray figure containers that visually separate media from the reading column. No personal photography pattern in the template. STEAL: the wide gray figure container is a clean way to let media breathe without dominating the text measure.

### Navigation & Conversion
- **Navigation:** No prominent persistent top nav documented; the template is oriented around single long-form article pages. Author mentions a planned content menu (table-of-contents) similar to Distill. Navigation today is in-page/scroll rather than a sticky wordmark bar.
- **Trust / Credibility:** Credibility is conveyed through the artifact quality — citations/bibliography blocks, rendered math, and polished figures — plus author attribution in the title. No affiliations/logos strip; the Distill-adjacent presentation itself signals rigor.

### Synthesis
- **Takeaway:** STEAL: the narrow Charter reading column with figures breaking out into wider gray containers, and reserving motion strictly for compare/step interactions — an ideal frame for showing an ECG artifact or clinical figure without clutter, with maroon standing in for Clarity's orange/red emphasis accent. AVOID: shipping it as-is for a research index — Clarity has no dark mode, no reduced-motion handling, no filterable venue-metadata publications list, and no contact/nav, all of which the Madhavi build needs; use its article/figure vocabulary but pair it with a proper filtered publications index (see kozodoi).

---

## Clement Grellier

### Identity & Hero
- **Hero:** Minimal centered/left-aligned opening built almost entirely from type: the name 'CLEMENT GRELLIER' set large in all-caps as the primary visual, immediately followed by a plain-language value tagline ('Bringing designs to life with pixel-perfect precision and smooth animations'). No hero image or WebGL — credibility in the first 5s comes from confident typographic scale, a 'Front-end developer' role label, and two clear CTAs ('See my projects' / 'Quick overview'). A 'Skip to main content' link precedes everything, signaling engineering polish. Pure black-on-white gives the hero a stark, editorial calm.
- **Wordmark / Identity:** Name is the identity — no monogram or graphic mark. Set as a flat all-caps logotype 'CLEMENTGRELLIER' in a geometric/near-monospaced sans, tight tracking, technical feel. The wordmark is not kinetic or variable; it doubles as the top-left nav brand. Restraint is the point: identity = the name in one weight, one case.

### Typography & Layout
- **Whitespace & Layout:** Generous breathing room; content-over-decoration. Featured work sits in a card grid up top, with a long text-link list below — vertical rhythm is roomy and sections are clearly separated. Alignment is disciplined (left-aligned type blocks, grid-based cards). 'Designed not templated' comes from big type + lots of negative space + high black/white contrast rather than ornament.
- **Color / Accent Discipline:** Radically restrained: essentially a two-color scheme, pure black (#000000) on pure white (#FFFFFF). No standing brand accent color across sections — contrast itself does the work, so 100% monochrome visual field. Any color that appears comes from project thumbnails, not the chrome.

### Motion
- **Motion:** Motion is the craft signature but applied with restraint: GSAP-based smooth scroll (ScrollSmoother), staggered entrance reveals, hover states on cards/links, and full-screen work-to-work transition animations that carry you between case studies. Discipline is in easing quality and transform/opacity-based reveals — smoothness over spectacle. Loading sequence sets pace before content. Jury dev scores were high (WPO ~8.0), so animation is performant, not heavy.

### Content Presentation
- **Project Presentation:** Two-tier system: ~6 featured projects (GENIE, ONTO, ThirtySix, Lens, DesDoigts, TURBO) shown as thumbnail cards linking to dedicated case-study pages, then a 'More projects' section listing 20+ client names (Catalyst Behavioral, OpenClaims, Dublin Zoo, GRANITE, LUMA, eDesk, Eska...) as plain text links with arrow icons. Overview stays minimal — little descriptive copy — with depth pushed into the individual case pages and the work-transition animation stitching them.
- **Photography / Imagery:** Imagery is confined to project thumbnails plus a portrait on the About page and award logos. No ambient/personal photography competing with the work — media supports the grid rather than dominating; the chrome stays text-and-whitespace.

### Navigation & Conversion
- **Navigation:** Simple 3-item nav — Home, Work, About — with the 'CLEMENTGRELLIER' wordmark top-left as the brand/home link. Minimal, conventional placement; order front-loads Work.
- **Trust / Credibility:** Credibility surfaced away from the hero, mostly on About: dense award tally (Awwwards 5 SOTD / 10 HM, FWA 3 FOTD, CSSDA 9 SOTD / 8 S.Kudos, plus CSSWinner, Muzli, GSAP Showcase, Webby) shown as logos, Gobelins Paris pedigree, and Awwwards/CSSDA jury-member status. Client names live in the 'More projects' list, not the hero.
- **Contact / Conversion:** Low-friction: primary 'Say Hello' mailto (clementgrellier@gmail.com) plus a Google Calendar booking link as secondary CTA. Home also drives two CTAs ('See my projects' / 'Quick overview'). Conversion is email/booking, no form.

### Synthesis
- **Takeaway:** STEAL: the two-tier work index (few animated hero case-study cards + a long arrow-linked client text-list) and the restraint model where all the 'wow' lives in transitions between states, leaving each static screen quiet — perfect for pairing an editorial-minimal maroon layout with a single ECG signature moment. AVOID: the pure black/white, zero-accent, no-dark-mode scheme and the GSAP-everywhere approach without a confirmed prefers-reduced-motion fallback — for a clinical+technical brand you need the maroon accent doing light work and an explicit static/reduced-motion path for credibility.

---

## Darpan Jain

### Identity & Hero
- **Hero:** Single-column, content-first opening. Large plain-text name 'Darpan Jain' set as a heading, immediately backed by a full role/credibility line rather than a tagline — 'Lead Machine Learning Engineer with 9+ years of experience' in NLP/LLMs, plus current employer (Crunchyroll / Sony Pictures Entertainment) stated in the very first block. Credibility in the first 5 seconds is carried by the sentence itself (years + named employer + specialty) not by a hero image or animation. A single downward CTA button ('Explore My Work') anchors the fold. Header carries social proof icons (GitHub, LinkedIn, Google Scholar) so the researcher signal is immediate. Aesthetic is calm and skimmable, not showy.
- **Signature Detail:** The single ownable, memorable element is the ✨ easter-egg dropdown in the header: a sparkle icon that reveals hidden features (an Anti-Anxiety breathing tool, a 'Focus Mode' productivity site, playful interactive projects like a Marvel Universe visualizer and a distributed-training visualization, plus alternate resume formats). This is a personality-as-signature move — restraint is applied by hiding the playful stuff behind one glyph so the main page stays professional and content-first, while the sparkle rewards the curious. Secondary signature: a live Spotify 'now playing' widget (via a Spotify GitHub-profile-style integration) that humanizes an otherwise ML-heavy page. The technique to steal: quarantine delight behind one opt-in glyph so the serious surface never gets diluted.

### Typography & Layout
- **Whitespace & Layout:** Vertical, single-column reading flow with sections separated by divider graphics (image assets used as rules between blocks). Reading width is constrained for skimmability ('fast, skimmable' one-page live resume). 'Designed not templated' is achieved through consistent section dividers, generous vertical spacing, and an information order tuned for recruiters rather than through a unique grid. Responsive single-column; no multi-column card grid. [uncertain: exact reading-width px and grid tokens]

### Content Presentation
- **Project Presentation:** Projects shown as an annotated LIST, not cards — each entry is a title + a brief description + 1-2 tags (e.g. 'CNN Transfer learning'). Text-forward and scannable rather than screenshot-rich. Playful interactive projects (Marvel Universe, distributed-training visualization) are surfaced separately through the ✨ menu as live demos. Real artifacts are linked (GitHub in header, live resume, live mini-projects) rather than embedded as heavy media. Lesson: keep the main project list dense and text-first, route the show-off interactive stuff behind an opt-in menu.
- **Research-Artifact Presentation:** Publications get a compact, academic treatment distinct from the projects list: a Publications section shows author list, paper title, and venue (e.g. NAACL 2024), with Darpan's own name bolded among co-authors — the standard citation convention. A Google Scholar icon in the header links out to the full record. Space allotted is deliberately small (one or two entries) so research signals credibility without overwhelming an industry-facing page. Lesson to steal: bold-your-name + venue + year is enough to read as 'real researcher' without a heavy publications apparatus.
- **Photography / Imagery:** Personal media is light and functional. Endorsement testimonials carry small headshots of the endorsers; education entries carry institution logos (USC, University of Pune). There is no lifestyle/photography gallery competing with the technical content — imagery is used as trust chrome (logos, faces) rather than as personal expression. The Spotify widget provides the main 'human' texture instead of photos.

### Navigation & Conversion
- **Navigation:** Sticky top header with clear all-caps section links: PROJECTS, RESEARCH, WORK, BLOG, ENDORSEMENTS, REACH OUT, plus social icons (GitHub, LinkedIn, Google Scholar) and the ✨ easter-egg menu. Wordmark/name sits at left of the header. Order front-loads Projects and Research; contact is last. Sticky behavior keeps sections one click away while scrolling.
- **Trust / Credibility:** Multi-layered without cluttering the hero: named current employer in the intro line; a WORK/experience section; a Publications section (NAACL 2024, name bolded); Education with institution logos and a 3.92 GPA / ML-specialization callout (USC Master's, Pune Bachelor's); and a dedicated ENDORSEMENTS section with three named-role/company testimonials plus headshots. Social-proof icons (Scholar/GitHub/LinkedIn) sit in the header. Credibility is distributed across sections so the hero stays a clean one-liner.

### Synthesis
- **Takeaway:** STEAL: the 'personality quarantined behind one glyph' pattern — Darpan keeps a serious, content-first ML surface but hides all the playful/delightful stuff (breathing tool, live demos, Spotify) behind a single ✨ menu. For the Madhavi build this maps perfectly to the ECG signature: keep the clinical+technical surface calm and route any playful ECG motion/easter-egg behind one opt-in element. Also steal the bold-your-name + venue + year compact publications block and the 'load-bearing one-liner role sentence' hero (years + named employer + specialty). AVOID: relying on emoji (✨🙂) and off-site subdomains as the brand's texture and writing surface — it reads friendly but undercuts an ownable, editorial identity; for a maroon/ECG editorial-minimal brand, spend that personality budget on the designed signature and keep writing fused in-site, not on a bare external blog.

---

## Emil Kowalski

### Identity & Hero
- **Hero:** Single-column, left-aligned opening screen with almost no ornament. Name 'Emil Kowalski' set as a plain heading immediately followed by the role 'Design Engineer', then one or two sentences of prose ('I like to build things for designers and developers... how it looks, feels, and behaves'). Credibility in the first 5 seconds comes not from a big visual but from name-dropping affiliations in copy (Linear, ex-Vercel) and from the restraint itself — the page performs taste by refusing a hero image, gradient, or animation. A single announcement/CTA line (e.g. 'Enrollment for my animation course is open') sits near the top as the only bit of color/urgency.
- **Signature Detail:** The signature is invisible/behavioral: sub-perceptual motion craft applied only where it earns its place. Concretely — micro-interactions built on transform + opacity, durations kept under ~300ms, spring/ease tuned so transitions feel physical not decorative, and a documented rule that high-frequency (keyboard-repeated) actions get NO animation at all. His component work (Sonner toasts, Vaul drawer) is the physical embodiment of the signature: a toast stack that settles, a drawer that drags with velocity. Used with restraint because the whole thesis is 'sometimes the best animation is no animation.' The ownable element is a felt sense of quality, not a visible glyph.

### Typography & Layout
- **Whitespace & Layout:** Vertical rhythm is the main design tool: one narrow centered/left-aligned reading column, sections separated by large consistent vertical gaps, no cards, no grid columns. Reading width is constrained (~600-700px feel) even on wide screens so the eye never has to hunt. 'Designed not templated' is achieved through disciplined spacing, precise line-height, and refusal of decoration rather than through unique layout shapes — it looks bespoke because everything is calm and consistent.

### Motion
- **Motion:** Entrance motion is subtle and opacity/transform-only; nothing slides in with long durations. Timings held under ~300ms (he cites 180ms as snappy vs 400ms as sluggish). Easing is hand-tuned spring/custom-cubic for a physical feel. Scroll behavior is quiet — no parallax spectacle. Hover states are small and immediate. The governing discipline: animate only to explain functionality, add responsiveness, maintain spatial continuity, or delight in RARE interactions; never animate high-frequency/keyboard actions. Motion is a scalpel, applied to few elements, tuned obsessively.

### Content Presentation
- **Project Presentation:** Projects shown as a dense, scannable LIST — each row is a title + one-line description + link (e.g. 'Sonner — An opinionated toast component for React', 'Vaul — a drawer component for React', 'animations.dev', 'index.how'). No screenshots, cards, or case-study pages on the index; the artifact IS the shipped component, so the 'demo' is that you can go use the real library. Deep-dive density is deferred to separate long-form 'How I built...' articles rather than crammed into the index. High signal-to-noise: he trusts the reader to know Sonner/Vaul.
- **Photography / Imagery:** Essentially no personal photography or lifestyle imagery — the site is text and shipped UI. Any imagery is functional (interactive animation demos embedded inside articles, product screenshots inside case studies) rather than personal media. Lesson: media earns its place only when it demonstrates the craft; there is no 'me at the beach' section competing with the technical work.

### Navigation & Conversion
- **Navigation:** No persistent top nav bar in the traditional sense — navigation is the vertical section flow of the single page (intro -> Projects -> Writing -> Newsletter -> More). The name/wordmark sits at the top of the page, not stickied. External links (Twitter, GitHub) grouped last under a 'More' heading. Order front-loads work and writing; social/contact deprioritized to the bottom.
- **Trust / Credibility:** Credibility surfaced through copy and recognizable artifacts rather than a logo wall — mentions of Linear (current) and Vercel (past) live in the intro prose, and trust is carried by name-recognition of his open-source (Sonner/Vaul are widely used in the React ecosystem). No testimonials, client logos, or badges cluttering the hero; the shipped work is the proof.
- **Contact / Conversion:** Primary conversion is the newsletter signup ('Exclusive, newsletter-only content once a month. No spam, no nonsense') plus the paid animation course as the commercial CTA. Contact is low-friction and indirect — social links (Twitter/GitHub) under 'More' rather than a form or Cal.com booking. The funnel favors audience-building (email) over one-off contact.

### Synthesis
- **Takeaway:** STEAL: the discipline of making the no-motion / no-color baseline already correct, then adding motion only as a rare, sub-300ms transform/opacity enhancement — perfect model for an ECG animation that must degrade gracefully and read as clinical-credible under prefers-reduced-motion. Also steal the fused writing-in-portfolio single scroll and the list-not-cards project density. AVOID: his total absence of a graphic identity and accent color — for the Madhavi brand (editorial-minimal, maroon, ECG signature) going as monochrome/anonymous as Emil would waste the ownable ECG-as-ligature and maroon accent; keep his restraint but spend it deliberately on one signature, not zero.

---

## Framer Vertical Sharp templates

### Identity & Hero
- **Hero:** Vertical (Tamas Bodo, $129) opens with a full-viewport editorial cover: an oversized display headline set as a two-to-three-line statement ('I BREAK THINGS to see WHAT THEY ARE MADE OF'), with the name/role ('Adam Knoxville / VISUAL ARTIST/CREATOR') set small and letter-spaced beneath — magazine masthead logic where the manifesto is huge and the identity is a quiet caption. Numbered editorial phases (001 PHASE/BREAK, 002 PHASE/BUILD) act like a table-of-contents, signaling curation and a 'this is an issue, not a directory' framing. Credibility comes in the first 5s from typographic confidence and pacing, not logos. Sharp ($129) opens on a colourful editorial home with bold typographic hierarchy leading — personality-forward rather than image-forward, a distinct pastel palette that reads as an editorial magazine cover. YUYA (free, Peter Hodak) opens minimal: name (YUME YASKUMI) + email + one-line positioning statement ('freelancer specializing in minimal design, 10 years, based in Tokyo, working remote') then straight into a 'work.' grid. Hoffen (free, Gustave Flowbert) opens with a typography-led minimal hero built around clean lines and appear/scroll effects.
- **Wordmark / Identity:** Vertical treats the wordmark as an editorial device: 'VERTICAL' and index tags like 'IDX/AK 2026', 'INDX', 'CAT — 1.07' recur as running-header stamps, and the name itself is set letter-spaced (A d a m   K n o x v i l l e) so type-tracking becomes identity. Kinetic vertically-set type and marquee word-lists ('VISUAL EXPERIMENTS / FORM & FUNCTION / SOUND & MOTION') double as a self-generating logotype system. Sharp uses a colour + type-hierarchy identity rather than a mark. YUYA and Hoffen use a plain sans wordmark (name in nav top-left) with no graphic mark — identity carried by whitespace and restraint.
- **Signature Detail:** Vertical's ownable element is the index/version stamp language — small monospaced-feeling tags ('IDX/AK 2026', 'CAT — 1.07', 'NEUE 7.6', 'CONCEPTUAL REVISION') scattered as editorial marginalia, plus letter-spaced vertically-rhythmic type. Used with restraint: they never compete with the huge display type, they sit in corners/margins as metadata. This is the directly-stealable pattern for an ECG-signature-as-marginalia: one small recurring glyph/stamp that reads as a 'catalog number.' Sharp's signature is its pastel colour-block editorial voice. YUYA's is disciplined negative space (nothing ownable beyond restraint). Hoffen's is clean-line typographic minimalism.

### Typography & Layout
- **Whitespace & Layout:** Vertical uses a disciplined magazine grid with generous margins and deliberate narrative pacing — projects 'given space to breathe,' full-bleed imagery alternating with wide-tracked caption blocks, strong vertical rhythm that carries the eye down like turning pages. Reading width for manifesto text is held narrow/centered. YUYA and Hoffen achieve 'designed not templated' purely through very generous whitespace, a simple aligned work grid, and restraint. Sharp is denser (multi-page, blog + work) but keeps a consistent editorial grid.
- **Color / Accent Discipline:** Vertical runs near-monochrome (black/white/off-white) letting photography supply the only colour, so the single-accent discipline is essentially 'no accent, type carries it' — a clean model for maroon-as-sole-accent. Sharp is the opposite: a colourful pastel palette is central to its identity (accent-forward, high % of visual field). YUYA and Hoffen are minimal near-monochrome light palettes with sparse or no accent. For the Madhavi maroon constraint, Vertical/YUYA/Hoffen model restraint; Sharp models what NOT to do (colour competing with work).

### Motion
- **Motion:** All four favor restrained transform/opacity motion. Vertical uses editorial scroll pacing — appear-on-scroll for image/caption pairs, kinetic marquee word-lists, and carefully staged reveals that reinforce the 'issue' narrative rhythm rather than decoration. Sharp includes animated interactions and page transitions tied to its editorial personality. YUYA uses subtle entrance animations and 'Show More' progressive reveals on the work grid. Hoffen explicitly lists Appear Effects + Scroll Effects (Framer's built-in appear/scroll primitives) — clean fade/rise on scroll, no heavy motion. Discipline across all: opacity + small translate, no bounce.

### Content Presentation
- **Project Presentation:** Vertical presents work as a curated editorial sequence: full-bleed image + wide-tracked all-caps caption (title, medium, location, year — e.g. 'Discipline, held in motion . Japanese Culture . Osaka (2019)'), grouped under numbered phases, feeling like flipping through a magazine's plates rather than clicking cards. Deep-dive case-study pages are 'editorial-quality.' Sharp uses a multi-page CMS (Home, Work, Work post, Blog, Blog post, About, Contact, 404) — work items open to individual CMS-driven case-study posts. YUYA uses a clean card/list work grid (Stone Mind, Violet Orbit, etc.) with 'Show More' and per-project detail. Hoffen is image-grid gallery-first for AI-art/photography. Steal from Vertical: caption-as-metadata block (title/medium/place/year) under each artifact.
- **Writing / Blog Integration:** This is the key differentiator. Sharp has a full blog built into one CMS editor — Work and Blog are separate collections (Work post + Blog post) edited from a single Framer CMS, so a designer publishes case studies and writing side by side; SEO-ready metadata included. This is the direct model for fusing work + writing from one editor. Vertical includes a dedicated 'Thoughts' surface in its nav (Home / Work / About / Thoughts / Contact) treating essays/'written fragments' as a first-class editorial section coexisting with visual work. YUYA and Hoffen have no writing/blog surface — work + about + contact only.
- **Photography / Imagery:** Vertical is built around large-scale photography/imagery as primary content — full-bleed plates with restrained captions; imagery leads while type frames it, so personal media never feels like clutter because everything is captioned like a museum plate. Hoffen is explicitly tuned for photographers and AI artists — image-forward minimal galleries. YUYA shows project imagery in a clean grid. Sharp balances imagery with colour and type. The stealable pattern: caption every image with wide-tracked metadata so photography reads as curated, not decorative.

### Navigation & Conversion
- **Navigation:** Vertical: top wordmark 'VERTICAL' left, minimal nav (Work / About / Thoughts / Contact), plus footer sitemap (Home, Work, About, Thoughts, Contact, Privacy, Terms, 404); nav is short and editorial. Sharp: multi-page nav across Home/Work/Blog/About/Contact. YUYA: name left, Works/About/Contact right — minimal 3-item. Hoffen: minimal agency/portfolio nav. All keep the wordmark top-left and item count low.
- **Trust / Credibility:** Vertical surfaces credibility through curation and editorial polish rather than logos — numbered phases, index stamps, and an About/manifesto section imply seriousness. YUYA states credentials in prose ('multiple awards,' '10 years,' 'collaborate with businesses of all sizes worldwide') and social links (LinkedIn/Twitter/Behance) low in the page, keeping the hero clean. Sharp uses its blog as thought-leadership credibility. None clutter the hero with badges — affiliations live in About/footer.

### Synthesis
- **Takeaway:** STEAL: Vertical's caption-as-metadata + index-stamp system — set every artifact with a wide-tracked all-caps line (title . category . venue . year) and sprinkle one small recurring 'catalog number' stamp (IDX/…); this is the exact hook for the ECG-signature-as-marginalia and makes clinical/technical work read as curated, not templated. Also steal Sharp's single-CMS-editor model so case studies and writing live together. AVOID: Sharp's pastel colour-block loudness — for the editorial-minimal + maroon brand, colour must NOT compete with the work; follow Vertical/YUYA near-monochrome discipline and let maroon be the only accent. Also avoid shipping without explicit reduced-motion fallbacks — none of these four handle it, and the ECG animation makes it load-bearing for clinical credibility.

---

## Jordan Delcros

### Identity & Hero
- **Hero:** Opens with a custom WebGL scene behind a spare header line: 'Jordan Delcros — Creative Developer — Freelance'. A branded page loader with an intro animation runs first and doubles as a gate to 'unlock' sound. Credibility in the first 5s is the graphics engineering itself — a live 3D/generative canvas and gesture interaction — rather than copy or logos. This is the ANTI-REFERENCE: the signature graphic is loud and near-immersive, so editorial text is reduced to a single role line.
- **Wordmark / Identity:** Name set as plain text ('Jordan Delcros'), not a stylized logotype or monogram — the WebGL graphic, not the type, carries identity. The generative visual is effectively the brand mark. Restraint is inverted vs. an editorial site: the type stays neutral precisely because the moving graphic is doing the identity work.
- **Signature Detail:** The ownable element is the WebGL/generative system: a canvas-based 3D scene with gesture/pointer-reactive interaction, hidden interactive items scattered through the experience, and a sound layer unlocked at load. Jury singled out 'main user interaction' and animations (~8.0/10) as the standout. This is the calibration point — the signature graphic is pushed almost to overwhelming, sacrificing editorial calm and a11y (dev/accessibility scored lowest, ~6.4/10) for spectacle.

### Typography & Layout
- **Color / Accent Discipline:** Very restrained palette anchored on a single light lavender-gray (#C7CEDC) as the dominant field, letting the WebGL lighting/motion supply visual interest instead of color. Effectively a near-monochrome cool-gray base with the 3D render providing highlights — accent discipline is achieved by desaturation so the moving graphic isn't fighting bright color.

### Motion
- **Motion:** Motion-maximal: custom intro loader animation, continuous WebGL/generative rendering, gesture- and pointer-driven interaction, and animated transitions between sections (jury animations ~8.0/10, creativity ~8.22/10, its highest axis). Easing is fluid and interaction-reactive. This is the far end of the spectrum — motion is nearly always on-screen, the opposite of transform/opacity restraint.

### Content Presentation
- **Photography / Imagery:** Little to no personal/editorial photography — imagery is generated by the WebGL renderer, not shot media. Visuals are procedural/real-time rather than a photo library, so 'imagery' and 'signature graphic' are the same layer here.

### Synthesis
- **Takeaway:** STEAL: the desaturation discipline — pairing a loud generative graphic with a single muted base (#C7CEDC) so the signature never turns garish, exactly the guardrail for keeping an ECG/WebGL flourish subordinate to maroon editorial calm. AVOID: letting the signature graphic become the whole site — gesture-only 'unusual navigation', a sound-gated loader, and always-on WebGL tanked accessibility (~6.4/10) and buried the work; for a clinical+technical brand, cap the generative element to one restrained, reduced-motion-aware moment and keep navigation conventional and legible.

---

## Josh Comeau

### Identity & Hero
- **Hero:** Warm, blog-first landing rather than a corporate portfolio hero. 'Josh W Comeau' wordmark up top with horizontal nav (categories, courses, goodies, About). The credibility signal in the first 5 seconds is a friendly illustrated mascot of Josh himself (theme-aware: josh-happy-light.png / josh-happy-dark.png) plus an immediately visible list of well-known posts and course products — it reads 'prolific, trusted educator' instantly. Tone is inviting and playful (emoji, sparkles) but the layout stays a clean single content column, so whimsy sits on top of order, not chaos.
- **Wordmark / Identity:** Name set as a simple text wordmark ('Josh W Comeau') that doubles as the home link — no monogram or kinetic type. The real identity is the illustrated self-portrait mascot, which changes expression/version between light and dark mode and recurs across the site, functioning as a memorable brand mark. So identity = friendly avatar + consistent playful voice rather than a typographic logotype. Directly relevant to ECG-as-ligature: shows a personal graphic (his face) can BE the brand — an ECG mark could play the same recurring-motif role.
- **Signature Detail:** The ownable signature is 'purposeful whimsy' — small delightful interactive surprises that reward exploration: the collaborative Rainbow Configurator (real-time via PartyKit WebSockets, everyone sees your edits live), a Like button that stores up to 16 taps per user, animated SVG icons (arrow/trash) that morph on hover via React Spring, and cross-page View Transitions that slide/cross-fade. Restraint comes from confining whimsy to opt-in interactions and micro-moments rather than gratuitous page-load spectacle — the reading experience itself stays calm. This is the reference for 'how far to push whimsy without slop': make it interactive, contextual, and skippable.

### Typography & Layout
- **Whitespace & Layout:** Comfortable single reading column centered on the page with generous line-height and rem-based breakpoints, so long technical posts stay legible. Layout is 'full-bleed within a measure' — most prose is constrained but interactive demos/code widgets can break out wider for emphasis. 'Designed not templated' comes from adaptive components whose styling changes by context to feel cohesive, plus custom-drawn illustrations and per-theme color, not from an unusual grid.
- **Color / Accent Discipline:** Not single-accent — Josh runs a richer, intentional multi-hue system (a signature pink/magenta + a full set of semantic colors). Custom colors are defined for all four Aside/callout variants (info/success/warning/error) in BOTH light and dark themes, so color is a functional language, not just decoration. Color usage is more generous than a minimalist portfolio but still disciplined via a token system — every hue is deliberate and theme-paired. Contrast to Emil: Josh spends color freely but systematically.

### Motion
- **Motion:** Motion is playful but engineered: React Spring (v9) for organic interpolation of SVG point values (icon morphs), Framer Motion (v11, dynamically imported to save bundle) for layout animations, and the View Transitions API for subtle slide/cross-fade page changes. Hover states on icons and buttons are springy and physical. Durations feel snappy; motion is used to add delight and spatial continuity, but it's opt-in and micro-scale so it doesn't fight reading. The lesson: whimsy stays classy when it's transform/spring-based and confined to interaction moments.

### Content Presentation
- **Project Presentation:** Content is post/list-driven, not project-card-driven — articles appear as a LIST with title + short description + 'Read more', organized under a topic taxonomy (CSS, React, Animation, Career, JavaScript, SVG, Next.js, General). 'Real artifacts' are the interactive in-post demos themselves: live Sandpack React playgrounds, editable widgets, and animated diagrams embedded inline (via MDX). The proof-of-work is that you can manipulate the concept in the page, not that you see a screenshot of it.
- **Writing / Blog Integration:** The site basically IS the blog — writing is the primary surface, with courses/goodies as secondary product layers, fully fused. Posts are indexed both as a recent list and via a topic taxonomy for browsing. Content pipeline is MDX (v3) on Next.js 15 App Router, letting essays embed live React components — so 'writing' and 'interactive artifact' are the same object. Feed density is moderate: title + description per row, no heavy thumbnails.
- **Photography / Imagery:** Minimal literal photography; imagery is illustrated and functional — the custom mascot self-portrait (light/dark) plus hand-made diagrams, animated SVGs, and demo widgets. Personal presence is conveyed through the friendly avatar and voice rather than lifestyle photos, so personality is strong but never competes with or buries the technical content. Lesson: a single recurring custom illustration can carry 'personal' warmth without a photo gallery.

### Navigation & Conversion
- **Navigation:** Horizontal top nav with a small, focused set: categories, courses, goodies, About, plus the 'Josh W Comeau' wordmark as home link. A secondary topic taxonomy (CSS/React/Animation/Career/JS/SVG/Next.js/General) provides deep browsing. Nav is stable/simple; theme toggle lives in the chrome. Order prioritizes content discovery (categories) then products (courses) then play (goodies).
- **Trust / Credibility:** Credibility is built through volume and recognizability of the free writing plus named commercial courses (CSS for JS Developers, The Joy of React, Whimsical Animations) that the audience already knows. Social proof via BlueSky/GitHub/LinkedIn links. No logo wall or testimonials cluttering the hero — the recurring mascot + the sheer catalog of respected posts do the trust work.
- **Contact / Conversion:** Primary CTA is the free newsletter ('Enter your email to join my free newsletter'), which is the top-of-funnel for selling courses. Secondary conversion = course product links and 'goodies'. Social links (BlueSky, GitHub, LinkedIn) offer contact. It's an audience/product funnel (email -> course) rather than a hire-me/booking flow; no Cal.com-style scheduling.

### Synthesis
- **Takeaway:** STEAL: opt-in, contextual whimsy — confine delight to interactive micro-moments (hover morphs, one signature interactive widget) layered on top of a calm reading column, and drive it with springs/View Transitions that are code-split and reduced-motion-gated. For the Madhavi build this means the ECG signature can be a single delightful interactive/animated motif that rewards attention without turning the page into slop, plus a semantic color token system (like his per-theme Aside colors) so maroon holds across light/dark by re-authoring, not luck. AVOID: his multi-hue playful palette and mascot-driven warmth as-is — for an editorial-minimal, clinical+technical maroon brand, importing that many hues and cartoon energy would undercut credibility; take his SYSTEM discipline and one-signature restraint, not his color quantity or whimsy volume.

---

## Lee Robinson

### Identity & Hero
- **Hero:** Single-column, left-aligned text hero. Large plain 'Lee Robinson' heading followed by a short first-person intro paragraph ('I'm an engineer and writer') with contextual links embedded inline (e.g. /bio, /cursor). Credibility is front-loaded in prose: current role at Cursor, previously Vercel, '15 years coding, teaching for the second half', plus humanizing personal notes (husband, father, music fan). No avatar-dominant hero, no CTA button — authority comes from named companies and tenure stated conversationally in the first two lines.
- **Wordmark / Identity:** No custom logotype or monogram. Name is set as a plain heading in the site's body sans-serif. Identity is editorial/voice-driven rather than graphic — the 'brand' is the writing itself and the recognizable dev-influencer name, not a mark.
- **Signature Detail:** The ownable element is the writing-as-identity fusion plus buttery View Transitions API page navigation: clicking between the home page and an essay morphs shared elements smoothly rather than a hard reload. The recurring '/path' inline link style (treating internal routes like /bio, /stack, /agents as typographic tokens) is a subtle signature. Restraint: the transition is quick and shared-element based, never showy.

### Typography & Layout
- **Whitespace & Layout:** Constrained centered reading column (roughly editorial article width) with ample whitespace. Everything is a single vertical flow: intro, favorite writing list, links. Strong vertical rhythm and consistent gaps make it read as a designed essay page rather than a templated portfolio grid. No sidebars, no multi-column cards.
- **Color / Accent Discipline:** Near-monochrome neutral palette. Links carry the only accent (subtle color/underline), occupying a very small share of the field. Discipline is high — the page is content-first with color reserved almost entirely for interactive text.

### Motion
- **Motion:** Motion is restrained and purposeful: Next.js App Router + View Transitions API drive smooth cross-page transitions with shared-element morphing instead of jarring reloads. Hover states on links are subtle (color/underline). No scroll-jacking, parallax, or entrance animations on the content — transform/opacity discipline with short, eased durations. The one 'wow' is the page-transition smoothness, kept tasteful.

### Content Presentation
- **Project Presentation:** Work and projects are folded into the same text-list model as writing rather than shown as image cards. Featured items are linked titles with terse context; deeper artifacts point out to GitHub repos, YouTube, or dedicated MDX pages (/stack, /docs). Density is deliberately low — no screenshots or thumbnail grid on the index; the essays and repos ARE the portfolio.
- **Writing / Blog Integration:** Deepest example of writing/work fusion: the home page leads with 'Some of my favorite writing includes…' and lists essays as equal to professional roles. Writing lives at /writing and individual essays are MDX pages under the same design system, so there is no separate 'blog' silo. A Substack newsletter ('Optimism for the web') provides the subscribe surface. Feed is low-density (curated favorites on home, full index on /writing).
- **Photography / Imagery:** Minimal imagery on the home page — text-first, no dominant hero photo. Images (via next/image with priority) appear inside essays where a diagram/screenshot is load-bearing to the argument, never as decoration on the index. Personal identity is conveyed through words (husband, father) rather than photography.

### Navigation & Conversion
- **Navigation:** Very light navigation — no heavy persistent nav bar; the name heading anchors the top and internal '/path' links act as navigation. Order on home: intro paragraph, featured writing, then external links (GitHub, X, YouTube, newsletter). Structure favors a flat, essay-like flow over a menu-driven site.
- **Trust / Credibility:** Affiliations (Cursor, Vercel) are stated inline within sentences, plus tenure claims ('15 years coding'), rather than logo walls. Social proof is distributed: GitHub, large YouTube following, Substack, X — linked as plain text so credibility accrues without cluttering the hero.
- **Contact / Conversion:** Primary conversion is a plain 'Reach out' mailto at the end, supplemented by the Substack newsletter subscribe and social links. No booking/Cal.com widget — the funnel is email + newsletter + follow across platforms, low-pressure and text-based.

### Synthesis
- **Takeaway:** STEAL: the writing-and-work fusion in one flat, editorial single-column list plus tasteful View Transitions shared-element page morphs — for Madhavi this means presenting clinical/technical projects and essays in one coherent, low-density typographic feed and using a single restrained page transition as polish rather than many animations. AVOID: Lee's fully achromatic, near-imageless neutral palette and the choice to make writing carry the whole identity — Madhavi's brand needs a distinct maroon accent, an ECG signature glyph, and some visual identity so the site does not read as an anonymous dev blog; borrow the structure and restraint, but keep the ownable accent and signature that Lee deliberately omits.

---

## Obys Agency

### Identity & Hero
- **Hero:** Opening screen leads with narrative framing over ego: an oversized display headline dominates the viewport while the studio name recedes to a small top-left mark. Credibility is deferred below the fold as quantified text markers (80+ international awards, 24 SOTD, Awwwards Studio of the Year 2023, named clients CNN International / Porsche / Miro / Samsung / Hilton / Singapore Airlines) rather than a client-logo wall. First-5-seconds signal is typographic confidence plus an in-copy '(Scroll)' cue that invites downward motion. The hero is type-as-installation: a single large statement set in the studio's own typeface carries the whole screen with no hero image.
- **Wordmark / Identity:** Name set as a plain neo-grotesque logotype (studio uses the registered-mark styling, e.g. 'Obys®' / 'DES®') rather than a drawn symbol. The custom typeface itself IS the identity: OTF Obys NG, an in-house neo-grotesque in development since 2021, treated as an evolving system that drives hierarchy, spacing and rhythm. No separate graphic mark — the type does the identifying work.
- **Signature Detail:** The ownable element is the in-copy parenthetical labeling system used as a meta-editorial device: notations like '(Scroll)', '(02:19)', '(About Series)', '(Watch Trailer)' set small in-line, converting UI/navigation cues into readable editorial rhythm. Combined with the custom OTF Obys NG letterforms and a smooth custom cursor, these small parenthetical tags are the restrained, repeatable signature that reads across pages. Used sparingly, one per section, never decorative.

### Typography & Layout
- **Typography:** Single-family system built on the custom OTF Obys NG neo-grotesque (no serif counterpoint) — hierarchy comes from dramatic scale contrast, not typeface switching. Aggressive display sizing for statements with generous headline tracking; body copy stays small and tight for contrast. Editorial devices: small parenthetical in-line subheads, numbered season/index markers (01, 02, 03), and precise timecodes (03h 03m). This is a self-authored-type reference rather than a Fraunces/Inter serif-sans pairing — the takeaway is 'one strong custom family + scale' over pairing.
- **Whitespace & Layout:** Heavy vertical whitespace as the primary structural system; sections separated by large negative-space gaps that act as pause points (reinforced by the '(Scroll)' cue). Narrative blocks are centered with generous side margins (~600-800px reading width) creating tension against strictly left-aligned lists (menu, social, index). Sparse density: individual cards get breathing room, no masonry cram; modernist grid underpins alignment. Designed-not-templated feel comes from disciplined rhythm and asymmetry between centered prose and left-aligned meta.
- **Color / Accent Discipline:** Near-monochrome: cream/white ground with black type across the vast majority of the visual field. Color is functional not decorative — reserved for small alert-style labels ('(New)', 'Sold Out') and hover states on links. Accent occupies a tiny percentage of the field; restraint is the whole point. Award/credibility items are rendered as text, not colored badges.

### Content Presentation
- **Project Presentation:** Work/courses shown as a card catalog with consistent, near-identical formatting per item ([Title] / [Price] / [Year] / [Duration] / [badge]), emphasizing parity over per-card hierarchy — a product-catalog rhythm (closer to Skillshare than a bespoke portfolio grid). Numbered/season index markers give the collection editorial order. Real artifacts (trailers, durations) are surfaced as inline metadata and lazy-loaded video embeds rather than heavy screenshots.
- **Writing / Blog Integration:** No blog or essay index fused into the portfolio; the closest analog is the Design Education Series (des.obys.agency) as a separate cross-linked educational product. Writing serves sales/teaching, not a coexisting essay feed. Cross-linking a distinct 'series' sub-brand is the transferable idea.
- **Photography / Imagery:** Minimal ornamental imagery; typography is the primary visual language, so media (trailer thumbnails, project stills) appears sparingly and never dominates the type. When present, imagery is tightly framed and given whitespace. Good model for keeping personal/technical media subordinate to a strong type system.

### Navigation & Conversion
- **Navigation:** Understated top nav with a small top-left wordmark and short left-aligned link set (Practice / Seasons / About or Work / About); the name is deliberately de-emphasized so content leads. Persistent minimal top bar; a live CET timestamp in the footer adds a signature temporal detail.
- **Trust / Credibility:** Credibility-by-metrics woven into narrative rather than a hero logo wall: quantified claims (80+ awards, 24 SOTD, 1M visits, 4.7/5), award names (Awwwards Studio of the Year, CSSDA x3, Red Dot Best of the Best, FWA, Webby, European Design Awards), and a named client roster, mostly as text embedded in a chronological timeline.
- **Contact / Conversion:** Conversion is direct-action rather than a contact form: primary CTAs are purchase/enroll links (per-course URLs) with a secondary 'Log In' for existing students and tertiary social links. On the main agency site, contact is minimal and understated. No aggressive popups or newsletter gating.

### Synthesis
- **Takeaway:** STEAL: commit to ONE strong self-authored-feeling type family plus dramatic scale contrast and heavy vertical whitespace, and add a tiny restrained parenthetical/in-copy signature device (their '(Scroll)'/'(02:19)') — for Madhavi this maps cleanly to a single editorial family + generous rhythm + a small maroon parenthetical/ECG-glyph motif used once per section. AVOID: the custom-cursor + heavy scroll-driven motion with no visible prefers-reduced-motion fallback and near-zero client-logo restraint's reliance on metric-stacking — for a clinical+technical brand, motion must degrade to a static, high-contrast fallback and credibility should read calm, not maximal.

---

## Paco Coursey

### Identity & Hero
- **Hero:** Single-column, left-aligned text hero with no imagery. Opens with the name 'Paco Coursey' set as a plain heading, immediately followed by a short prose intro that states role and affiliation inline ('Webmaster at Linear', formerly Vercel design system/site/dashboard). Credibility is established in the first 5 seconds purely through named affiliations (Linear, Vercel) woven into a sentence rather than logos or badges. No hero graphic, no call-to-action button, no oversized display type — the restraint itself signals a design-engineer sensibility.
- **Wordmark / Identity:** No logotype or monogram. The name is set in the same body sans-serif as the rest of the page — identity is carried by voice, typography quality, and the ⌘K command palette rather than a graphic mark. The site treats the absence of a wordmark as a deliberate minimalist statement.
- **Signature Detail:** The ⌘K command palette (his own open-source cmdk library) is the ownable signature element — a functional easter egg that doubles as a portfolio artifact. The ⌘ glyph recurs subtly as a motif. Used with restraint: it is not decorative, it is a working component that demonstrates craft. The broader signature is 'magical details in interfaces' — micro-interactions that reward attention without shouting.

### Typography & Layout
- **Whitespace & Layout:** Narrow, centered single reading column with very generous whitespace around every block. Content is list-driven with clear, consistent margins between sections (writing, craft, contact). 'Designed not templated' is achieved through disciplined vertical rhythm, tight but intentional spacing between related items, and a total absence of visual noise (no cards, borders, or dividers).
- **Color / Accent Discipline:** Near-monochrome palette. Links are the only accent, rendered as subtle text color/underline changes rather than a bold hue. Accent occupies a tiny percentage of the visual field. Restraint is the entire color strategy — contrast comes from type weight and whitespace, not chroma.

### Content Presentation
- **Project Presentation:** Work is presented as a plain vertical list, not cards. Each entry is a linked project name with a one-line description and a direct link out (often to a GitHub repo or live demo). Zero-density, maximum-whitespace treatment — no thumbnails, no screenshots on the index. Deep dives live on separate /craft pages where individual interactions are demonstrated in isolation with live interactive components rather than static images.
- **Writing / Blog Integration:** Writing is a first-class, equal section on the home page: a few featured essays listed inline with an 'All writing' link to /writing. Blog posts are treated as portfolio-equal output rather than a separate blog silo. Feed is low-density (title + link), and posts are MDX/statically rendered on the same Next.js site, keeping writing and work under one coherent typographic system.
- **Photography / Imagery:** Essentially zero photography or personal imagery on the main page — visual interest is created entirely by typography and whitespace. Imagery appears only inside craft/demo pages where a screenshot or live component is load-bearing to explain an interaction.

### Navigation & Conversion
- **Navigation:** Minimal to nearly invisible navigation. No persistent sticky nav bar on the home page; navigation happens through inline links and section links (/craft, /writing). Wordmark/name sits at the top as the only anchor. Order: intro, then writing, then craft/work, then contact.
- **Trust / Credibility:** Affiliations are stated as plain text inside sentences ('Webmaster at Linear', 'previously Vercel'), never as logo walls or badges. Credibility is transferred through the quality of the linked open-source work (cmdk, next-themes) rather than declared credentials.
- **Contact / Conversion:** Conversion is low-pressure: a contact section with direct handles (email, Twitter/X). No booking widget or Cal.com. The closing line ('Pray at the altar of hard work') functions as a memorable sign-off/philosophical CTA rather than a sales prompt.

### Synthesis
- **Takeaway:** STEAL: the calm list-driven single-column layout with a working, ownable signature component (his cmdk ⌘K) that proves craft instead of decorating — for Madhavi this maps to letting the ECG signature be a real, functional/interactive element used with extreme restraint against near-monochrome type, plus fusing writing and work in one equal list. AVOID: going so fully achromatic and image-free that there is no place for a maroon accent or clinical warmth — Paco can survive on pure neutrals because his brand is 'invisible craft', but Madhavi's editorial-minimal + maroon + clinical identity needs one disciplined accent and a signature ECG glyph to carry personality that a strictly monochrome, imageless page would erase.

---

## Pentagram

### Identity & Hero
- **Hero:** Opens with the 'Pentagram' wordmark and the one-line positioning 'The world's largest independent design consultancy', then drops straight into a curated featured-work grid — no full-bleed hero image. Credibility is established instantly by the work itself (recognizable projects: Guggenheim, Mastercard, Saturday Night Live, Obama Presidential Center) plus the '© 1972 – 2026' longevity mark. First-5-seconds signal = breadth-of-work grid over a single statement; the portfolio preview is the hero.
- **Wordmark / Identity:** Name-as-logotype in a clean sans (no drawn pentagram icon shown); the wordmark is the mark. Set large near the top with generous surrounding whitespace. Identity rests on typographic purity and consistent whitespace rather than a graphic symbol — restraint is the brand.

### Typography & Layout
- **Typography:** Single modern sans across all hierarchies (no serif counterpart); hierarchy achieved through scale alone rather than style/weight switching. Generous letterspacing in nav and headings, tighter tracking in body. Editorial devices: partner-quote pullouts with attribution, tabular figures in dates/metadata ('© 1972 – 2026', news dates 'Jul 03, 2026'). Body constrained to ~60-75 characters. This is a type-by-scale reference, not a Fraunces/Inter serif-sans pairing — the lesson is 'one sans + ruthless scale discipline'.
- **Whitespace & Layout:** Whitespace is the structural system: sections are containers made of negative space, not borders or background fills. Substantial vertical rhythm isolates each work group; strict left-alignment for nav/body with centered placement reserved for the wordmark. Reading width kept to an optimal line length; symmetrical, rational padding (asymmetry avoided). Work grid runs roughly 2-4 columns responsively with uniform card proportions — the 'designed not templated' feel comes from consistent spacing across breakpoints.
- **Color / Accent Discipline:** Black type on white, near-zero decorative color; grays carry secondary metadata. Any accent (links/CTAs) is a single functional color used sparingly — color is functional, never ornamental, occupying a minimal share of the field.

### Content Presentation
- **Project Presentation:** Work-index is a uniform card grid (image + project title + optional one-line descriptor + discipline/sector tag chips), image-forward with consistent aspect ratios and ample per-card whitespace. Dual faceted filtering — by Client Type/Industry (Arts & Culture, Technology, Finance…) and by Discipline (Brand Identity, Packaging, Digital Experiences…) — with 'Load more' pagination ('Showing the latest 40 projects', roughly chronological). Every project deep-links to a clean /work/[slug] page; long-form project/story pages ('/story') provide deep-dive density with per-year hyperlinks for retrospectives.
- **Writing / Blog Integration:** A top-level 'News' section runs a vertical, evenly spaced feed of minimal cards: category tag (Work / Commentary / Event) + date ('Jul 03, 2026') + headline + one-line descriptor, capped with a 'See all news' link. Writing coexists with work as a parallel index rather than being fused into the work grid — clean separation of essay/news feed from portfolio.
- **Photography / Imagery:** High-resolution, unfiltered professional photography of finished work (logos, installations, book covers, packaging) in tight purposeful crops; consistent thumbnail aspect ratio (~16:9 or 4:3) across all cards keeps the grid calm even though images carry full color. Imagery is the color source but layout/type clarity is preserved; lazy-loaded on scroll. Good model for letting rich media live inside a disciplined uniform frame.

### Navigation & Conversion
- **Navigation:** Compact top nav (Work / About / News / Contact); wordmark starts centered in the hero and reduces to a top-left sticky mark on scroll. Footer holds social, newsletter, careers, legal. Nav recedes after the hero and returns on scroll — understated persistence.
- **Trust / Credibility:** Credibility without hero clutter: the '© 1972 – 2026' longevity mark, named partners appearing as per-project credits and quoted authorities, a prestige client roster surfaced through the work itself, and publications (Eye, Pentagram Papers) — all woven into work/news rather than a badge wall.
- **Contact / Conversion:** Low-friction: primary CTAs are 'See latest projects' style links deeper into work; secondary is footer newsletter signup; contact is segmented by office email (london@, newyork@, austin@, info@pentagram.de) plus a careers link. No popups or overlays.

### Synthesis
- **Takeaway:** STEAL: the ruthlessly uniform work-index grid — image-forward cards with a fixed aspect ratio, one-line descriptor, and discipline/sector tag, plus dual faceted filtering and whitespace-as-divider (no borders) — and hierarchy by scale in a single family; for Madhavi this is a calm, credible way to index projects/publications where consistent framing and generous rhythm read as 'designed'. AVOID: Pentagram's zero-accent, all-neutral palette and image-as-only-color approach — a maroon-anchored clinical/technical brand needs its single accent to actually carry identity across sections, and relying purely on partner-name/longevity credibility doesn't translate to an individual portfolio, so surface affiliations/publications deliberately instead.

---

## Rauno Freiberg

### Identity & Hero
- **Hero:** Understated, information-forward hero: no giant name headline. The opening is a single running sentence — 'Rauno Freiberg is an Estonian interaction designer working with Vercel and Devouring Details' — where name and role are woven into prose. A short manifesto ('Make it fast. Make it beautiful. Make it consistent...') sets the craft ethos. Credibility in first 5s comes from named affiliations (Vercel, Devouring Details) and the sheer restraint/precision of the type and spacing rather than any visual bravado. Some builds show an OS-desktop-style landing (logo over abstract atmospheric background) that hints at his interaction-design identity.
- **Wordmark / Identity:** No decorative logotype; the name is set in the same restrained sans as body copy, so identity is expressed through interaction quality rather than a mark. In desktop/OS-styled versions a small logo sits over an abstract background. The 'brand' is the tone system + micro-interactions, not a glyph.
- **Signature Detail:** The ownable element is a family of hand-crafted micro-interaction prototypes (Exclusion Tabs, Vanish Input, Wheel Input, Graph Slider, etc.) and an email 'Copied' clipboard feedback state. On OS-style builds: a macOS-like dock with subtle interface SOUNDS and a satisfying dock animation on theme switch. Restraint = each interaction is tiny, physical, and correct (spring/ease timing) rather than flashy; the feedback moment (copy → 'Copied') is the memorable signature.

### Typography & Layout
- **Whitespace & Layout:** Single centered narrow column with very generous whitespace and tight vertical rhythm; lists (Craft, Field Notes) are full-width single-column stacks with consistent inter-item spacing. Alignment is disciplined and left-aligned within a narrow measure. The 'designed not templated' feel comes from obsessive spacing consistency and optical alignment rather than grid gymnastics.
- **Color / Accent Discipline:** Near-monochrome neutral base (grey/near-black) with a single functional link color (blue/cyan-ish) used only for links — accent is functional, not ornamental, and occupies a tiny share of the field. Everything leans on tonal greys; color is a signal, not decoration.
- **Light / Dark & Tone:** Light and dark modes with a carefully calibrated TONE SYSTEM — dark mode uses well-chosen greys that complement the imagery, and switching modes triggers a playful, satisfying animation (dock/toggle). A single functional accent holds across themes. Dark mode is used to make imagery/prototypes pop; the tone ladder (not pure black/white) is the craft signal.

### Motion
- **Motion:** Motion is the whole point but applied with surgical restraint: spring/eased micro-interactions on inputs and toggles, transform/opacity based, no gratuitous scroll effects. Hover and press states have real physicality (timing that feels 'right'). Theme toggle has a bespoke animation. Interface sounds accompany some interactions on OS-style builds. Easing quality is the differentiator — everything feels deliberately tuned, never linear or janky.

### Content Presentation
- **Project Presentation:** Projects and 'Craft' items shown as a vertical single-column LIST of cards (not a grid): each = image/illustration/shader-render thumbnail + title + month-year + a labeled action button ('View Production', 'Read Essay', 'View Prototype'). Chronological newest-first. Selected standout micro-interactions are live 'View Prototype' demos; most are presentation cards linking out. On OS-style builds a horizontal side-scrolling feed mixes projects, experiments and photography.
- **Research-Artifact Presentation:** Writing/essays are first-class artifacts: acclaimed long-form pieces ('Invisible Details of Interaction Design', a 3000-word craft essay) surfaced via 'Read Essay' buttons and the Devouring Details project. Open-source credibility (cmdk, downloaded millions/week) functions like a citation/impact metric. No academic PDF/venue apparatus — artifacts are essays + shipped OSS shown with dates and outbound links.
- **Writing / Blog Integration:** Writing fuses directly into the portfolio: 'Field Notes' and 'Craft' are top-level nav peers to Projects, weighted equally, so reflection and work coexist in one narrow feed rather than a separate blog. Dated archive links (2023, 2022) act as a lightweight year index. Feed density is low/curated — each note earns its place.
- **Photography / Imagery:** Photography coexists as just another item type in the same list/feed (on OS-style builds, mixed into the side-scrolling feed alongside experiments and projects). It never dominates because it shares the same card scale and spacing as technical items — imagery is peer content, not a hero gallery.

### Navigation & Conversion
- **Navigation:** Horizontal top nav with primary destinations: Devouring Details, Craft, History of Software Design, Projects, Field Notes — plus social (Twitter, GitHub), dated archives, and an email with 'Copied' feedback. Name/identity sits at the top of the single column. Nav is flat and text-based, no heavy sticky bar.
- **Trust / Credibility:** Credibility surfaced through named affiliations in the hero prose (Vercel, Devouring Details; formerly The Browser Company/Arc) and through shipped, widely-used OSS (cmdk) and acclaimed essays — not logo walls. Collaborators/employers appear as inline named links, keeping the hero clean.
- **Contact / Conversion:** Conversion is a quiet copy-email interaction: an email element with a 'Copied' clipboard confirmation state, plus Twitter/GitHub links. No Cal.com/booking widget — the CTA is 'reach me' via a frictionless copy-my-email micro-interaction that itself demonstrates his craft.

### Synthesis
- **Takeaway:** STEAL: treat the whole site as a demonstration of craft — one signature interaction done perfectly (his 'Copied' feedback / tuned toggle) earns more trust than a feature list; a maroon ECG pulse rendered with a correct spring + reduced-motion fallback would be the Madhavi equivalent of his signature. AVOID: the near-nameless prose hero and interaction-only identity — for a clinical+technical brand you need clearer name/role hierarchy and explicit trust markers up front, so don't hide credentials inside a run-on sentence.

---

## Simon Willison

### Identity & Hero
- **Hero:** There is no hero in the conventional sense — no photo, no tagline, no full-screen intro. The top is a plain text title 'Simon Willison's Weblog', a slim horizontal nav (About, Subscribe, TILs, Tools), a sponsor box, and then immediately the newest post in a dense reverse-chronological feed. First-5-second credibility is delivered by content density and depth of archive (posts back to 2002, thousands of tags) rather than personal branding — you land inside the writing, not on a landing page.
- **Wordmark / Identity:** Name set as a plain, utilitarian text heading ('Simon Willison's Weblog'), serif-leaning, modest size — no logotype, monogram, or variable/kinetic type. No graphic doubles as identity; brand equity is the URL + the writing volume, not a mark.
- **Signature Detail:** The recurring 'pelican riding a bicycle' motif — an image he repeatedly asks each new AI model to generate as an informal capability benchmark. It functions as a running in-joke and ownable identity thread that reappears with restraint across posts, humanizing an otherwise dry technical feed.

### Typography & Layout
- **Color / Accent Discipline:** Predominantly monochrome/grayscale with a restrained link accent color. Chromatic breaks come only from post thumbnails (screenshots, bird photos) and sponsor boxes, not the chrome itself. Accent behaves consistently and quietly across the whole feed — color is never used to segment sections.
- **Light / Dark & Tone:** Light and dark mode both supported (dark mode added Dec 2025). Implemented via @media (prefers-color-scheme: dark) plus a data-theme attribute, with a footer toggle offering auto / forced-light / forced-dark; the dark theme was generated from the existing CSS using Claude Code. Single restrained accent holds across both themes.

### Motion
- **Motion:** No meaningful motion — plain links, no hover animation, no scroll effects, no entrance/exit transitions. Interaction is instant content access; the design deliberately favors static simplicity over embellishment, keeping transform/opacity usage effectively at zero.

### Content Presentation
- **Project Presentation:** Artifacts are presented as chronological feed entries, not cards: each release/tool is a title link + a short description/metadata line + bracketed tags + timestamp, with screenshots only inside full articles. High density (many per view), scannable, and cross-linked to GitHub releases (e.g. 'Release sqlite-utils 4.0rc3'). Real artifacts are surfaced as first-class feed items alongside essays.
- **Research-Artifact Presentation:** Content-type taxonomy via bracket prefixes/labels ([Research], [Release], [Tool], [Sighting]) lets papers, releases, and talks be filtered and visually distinguished from ordinary posts. Long analytical pieces carry word counts; talks/keynotes are announced inline as feed entries. Distinct from generic projects through the tag/type system rather than a separate publications page.
- **Writing / Blog Integration:** The site IS the portfolio — a fully writing-led fusion. A dense reverse-chronological feed (15-20+ items per view) mixes long essays, link-blog 'blogmarks', quotations, notes, and TILs. Extreme tagging (python 1,262, javascript 760, projects 544) and month/year archives (/2026/, /2025/, back to 2002) plus an Atom feed make it a searchable knowledge base rather than a marketing site. Custom Django CMS (Datasette-adjacent) drives it.
- **Photography / Imagery:** Imagery is small and subordinate: iNaturalist bird photos (pelicans, tying to the signature motif) and code/UI screenshots at ~200-400px, never full-bleed. No personal portraits or lifestyle photography — images support the technical narrative and coexist without dominating the text feed.

### Navigation & Conversion
- **Navigation:** Content-first, no sidebar. Top horizontal nav (About, Subscribe, TILs, Tools) plus a secondary row of content-type links (Entries, Links, Quotes, Notes, Guides, Elsewhere). Footer holds a year-archive index (2002-2026) and a dark-mode toggle. Wordmark sits at top-left; navigation is about slicing the archive, not conversion.
- **Trust / Credibility:** Trust is surfaced implicitly through volume and tenure: 24-year archive, thousands of tagged posts as evidence of expertise (python/sqlite/LLM domains), a sponsor box, and inline mentions of keynotes/talks (e.g. AIE, 'Code w/ Claude'). Credentials are demonstrated by the corpus rather than declared in a bio hero.
- **Contact / Conversion:** Soft, subscription-oriented conversion: a 'Subscribe' nav link, a sponsor CTA ('Pay $10/month to stay a month ahead'), and Atom feed for RSS followers. No email capture form or booking widget on the main page; CTAs are low-pressure ('Read the report', 'Try it out').

### Synthesis
- **Takeaway:** STEAL: the multi-type taggable feed architecture — Entries / Links / Quotes / Notes / TILs unified under a bracketed content-type taxonomy with <time> stamps and word counts — lets writing and artifacts share one dense, searchable surface; ideal for fusing a Madhavi writing/blog stream with projects and research. AVOID: the deliberately chrome-less, hero-less, near-monochrome utilitarian look — Simon can skip a hero because his readership is captive, but a Madhavi build needs an editorial hero, the maroon accent, and the ECG signature to establish identity before the feed takes over.

---

## Stas Bondar

### Identity & Hero
- **Hero:** Full-screen, motion-heavy opening built around his role rather than a value proposition: 'Front-End Developer' is repeated large across the viewport with an 'unmute' control and a 'Scroll Down' prompt, signaling an animated/video-backed intro. The header carries 'Stas Bondar — Front-End Developer' plus 'Art Director' and 'Awwwards Jury Member', with an availability status badge. Credibility in the first 5s comes from raw animation spectacle (SplitText character reveals, dithered visuals, scroll-driven 3D) and the jury credential — impressive, but the hero front-loads craft/vibe over a plain-language statement of what he does for whom.
- **Signature Detail:** The ownable element is a shader-driven ordered-dithering / Bayer-matrix pixelation treatment applied across images and videos, combined with scroll-velocity distortion — a distinctive, recognizable visual DNA. It is memorable and consistent, but it is applied everywhere and at full intensity, so it functions as an all-over aesthetic, not a restrained accent. Also notable: a Matter.js physics 'falling text' section. Lesson: a signature can be a single visual treatment (good), but here it saturates the whole site instead of being deployed sparingly (bad for a quiet clinical brand).

### Motion
- **Motion:** Maximal, continuous, and technically excellent but the opposite of restraint: GSAP (SplitText, ScrollTrigger, Draggable, Flip, gsap.quickTo), Barba.js page transitions, Three.js + custom GLSL shaders, and Matter.js physics all layered together. Effects include scroll-driven cube rotation, mouse-responsive rotation, scroll-velocity distortion, drag-and-drop, physics gravity/collisions, and scramble text. Easing/perf craft is real (quickTo used to avoid churning tweens), but almost nothing is a quiet transform/opacity reveal — motion is the content, everywhere, at all times.

### Content Presentation
- **Project Presentation:** Cases are shown as visual card/link tiles (Runway, Depo Studio, Dima Kutsenko, Orb Space, Terrane Group) leading into heavily-animated case views, arranged on a multi-column, independently-scrolling Cases page. Presentation prioritizes cinematic reveal and texture over dense, comparable detail (no visible repo/README/screenshot-grid rigor); depth lives in the motion, not in scannable artifact density.
- **Photography / Imagery:** Imagery is project media and video passed through the dithering/pixelation shader — a strong stylistic filter — rather than personal/ambient photography. There is no pattern here for letting personal photos coexist quietly beside technical work; all media is stylized to the house treatment and dominates the frame by design.

### Navigation & Conversion
- **Navigation:** Minimal nav — Home, Cases, Contacts — plus a prominent 'Let's Talk' CTA and a status badge ('Unavailable for Freelance Projects'). Structure is conventional and clean at the top level even though the pages beneath are experimental; Barba.js drives smooth transitions between these routes. The nav shell is the one restrained, borrowable part.
- **Trust / Credibility:** Credibility is surfaced through credentials and awards: 'Awwwards Jury Member' and 'Art Director' in the header, plus Awwwards / CSS Design Awards / FWA recognition and GSAP Site-of-the-Week/Month + Site-of-the-Year nomination. These sit near the top rather than being tucked away — effective proof, though wrapped in heavy motion rather than a calm credential strip.
- **Contact / Conversion:** Clear, multi-channel conversion: a 'Let's Talk' CTA plus direct contact via Telegram, WhatsApp, and email (hey@stabondar.com), with social proof links (Awwwards, LinkedIn, X). No booking/Cal.com, but the low-friction 'CTA + direct message channels + email' pattern is genuinely borrowable, even if the messaging-app options suit freelance more than a clinical brand.

### Synthesis
- **Takeaway:** AVOID the maximalism: layering GSAP + Three.js + shaders + physics + Barba.js so that motion becomes the content, independent-column scroll that breaks scannability, an all-over dithering treatment applied without restraint, a role-repetition hero that skips a plain value statement, and (critically) the absence of any prefers-reduced-motion / static fallback — all disqualifying for an editorial-minimal, clinical, fast-reading brand. The ONE thing worth stealing: the clean top-level nav-and-conversion shell — a minimal Home/Cases/Contact set with a single 'Let's Talk' CTA, an availability/status badge, and credentials (his 'Awwwards Jury Member') surfaced up top — plus the disciplined idea (executed at ~10% here) of ONE recognizable signature treatment as house DNA; for Madhavi that becomes a restrained maroon ECG accent, applied sparingly, never saturating the page the way the dither does.

---

## Studio Herrstrom

### Identity & Hero
- **Hero:** Bold, editorial, positioning-first opening. A large declarative headline states the studio's thesis — 'A design studio for brands who move culture' — rather than a name/role stack, so the first 5 seconds sell a point of view, not a resume. The wordmark 'STUDIO HERRSTRÖM' sits as a clean sans logotype in the header. Credibility is engineered to arrive fast through the recognizable client roster surfaced early (Spotify, Discord, Ray-Ban Meta, Back Market) and the founder's pedigree (ex-Brand Design Director at Spotify). The hero performs 'calm authority': minimal ornament, high-contrast type, whitespace doing the work, letting a category-defining sentence carry the fold.
- **Wordmark / Identity:** The name is set as a straightforward, confident all-caps sans logotype — STUDIO HERRSTRÖM — with the distinctive Swedish 'Ö' as the memorable typographic hook that makes the wordmark ownable without any illustrative logo. There is no monogram or kinetic/variable-type stunt; the identity strength comes from the diaeresis glyph and disciplined sans setting. A recurring '→ →' arrow motif functions as a secondary graphic device threaded through the UI. Directly relevant to the ECG-as-ligature idea: a single special glyph (the Ö here) can carry an entire brand identity if the rest of the type stays restrained — proof that one distinctive mark beats a busy logo.

### Content Presentation
- **Project Presentation:** Case studies are presented as large high-contrast image blocks, each tagged with a category label (Editorial, Platform, Consumer Electronics, Media & Entertainment, Marketplace) and paired with the client's logo plus a short descriptor and a '→ →' link into the deep dive. This is a portfolio-of-brands format: the artifact shown is the delivered identity system (renders, applications) rather than repos or demos. Visual rhythm comes from alternating big imagery and short text. Lesson: category tags + client logo + one line + arrow = enough to make a work index feel curated and editorial without dense cards.
- **Research-Artifact Presentation:** No academic-paper apparatus (no citations, PDFs, venues). The credibility-artifact equivalent is press and awards: features in Forbes/Wired/Billboard, 100+ industry awards, jury memberships (e.g. D&AD New Blood Awards 2026), and a published artifact ('THE ECHO Book'). These are surfaced as authority signals rather than formatted citations. Lesson for a research portfolio: press/awards can play the same trust role that publications do — same principle, different proof type.
- **Photography / Imagery:** Imagery IS the product here — large rendered brand/case-study images dominate and are the point, not competing personal media. There is minimal personal/lifestyle photography; the founder is represented through credentials and press rather than portraiture. The technique: let high-craft work imagery carry the whole visual field, keeping type and chrome neutral so the images never fight the interface.

### Navigation & Conversion
- **Navigation:** Deliberately sparse top nav — Process, Work, About, Contact — with the STUDIO HERRSTRÖM wordmark as the left anchor. A two-tier responsive nav pattern across mobile/desktop. Hierarchy is conveyed by selective visibility (few items) rather than mega-menus; the short list itself signals confidence. Work is prioritized in the order.
- **Trust / Credibility:** Trust is carried by the client roster (Spotify, Discord, Ray-Ban Meta, Back Market, Nike/YouTube/Meta Quest per press) plus founder pedigree (ex-Spotify Brand Design Director, 20+ years, 100+ awards) and third-party validation (Forbes/Wired/Billboard, jury seats, published book). These live in the work grid, About, and press sections rather than as a badge-cluttered hero — the hero stays a single positioning sentence and lets recognizable logos do the proving further down.

### Synthesis
- **Takeaway:** STEAL: the single-ownable-glyph identity strategy — the 'Ö' proves an entire brand can hinge on one distinctive typographic mark while everything else stays a restrained sans, which is the exact model for ECG-as-ligature (let the ECG glyph be the one loud thing in an otherwise quiet editorial system). Also steal the '→ →' repeatable interaction glyph used consistently at every nav/CTA, and the 'neutral chrome so the work pops' color discipline. And steal the positioning-sentence hero (a category-defining line) over a name/role stack. AVOID: going as image-dominant and text-light as a brand studio — Studio Herrström can let renders carry everything because their product is imagery; a clinical+technical researcher portfolio (Madhavi) needs substantive text, publications, and a11y rigor, so don't copy the near-absent writing surface or the unverified motion/a11y posture — pair their identity restraint with real content depth and explicit reduced-motion handling.

---

## Webflow BERGEN Mokat Lucide Teo templates

### Typography & Layout
- **Whitespace & Layout:** Generous margins and a disciplined magazine grid throughout. BERGEN/Mokat alternate full-bleed media with narrow captioned text blocks and let headlines break the grid for drama; Lucide/Teo achieve 'designed not templated' through very generous whitespace, a simple aligned work grid, and deliberate vertical rhythm. Reading width for prose held narrow/centered; index/galleries widen out. Strong page-turn pacing carries the eye down. This matches Brand_Kit's generous-whitespace + 96px section rhythm + 672px prose / 1200px index model.

### Motion
- **Motion:** Restrained, Webflow-native interactions: opacity + small translate reveals on scroll, staged section entrances, occasional oversized-type marquee or horizontal scroll for the work index. BERGEN/Mokat use editorial scroll pacing (image/caption reveals reinforcing the 'issue' rhythm); Lucide/Teo use subtle fade/rise-on-scroll and hover states on grid items. No heavy WebGL or scroll-jacking as a default. Discipline to steal: transform/opacity only, motion as pacing not decoration — matches the animate-skill rules.

### Content Presentation
- **Project Presentation:** BERGEN/Mokat present work as oversized-type magazine spreads: large project title breaking the grid, full-bleed imagery, wide-tracked caption metadata (title / role / year), each case study reading like a magazine plate rather than a card. Lucide/Teo use a storytelling grid of selected work that opens into structured case-study pages with alternating text/image sections. The stealable pattern for Madhavi: caption-as-metadata block (title . stack/domain . year) under each artifact, and a two-tier index (featured spreads + a compact list for the rest).
- **Writing / Blog Integration:** All are Webflow CMS-driven, so a blog/writing collection ships or is trivially added alongside the work collection — case studies and writing edited from one CMS, published side by side with SEO metadata. Lucide/Teo commonly include a blog/journal surface as a first-class nav peer; BERGEN/Mokat can host writing via the same CMS. This models the work+writing fusion (like Sharp/leerob) but via Webflow rather than MDX — for Madhavi the equivalent is MDX collections under one design system.
- **Photography / Imagery:** Image-forward but framed by type: full-bleed plates with wide-tracked captions (BERGEN/Mokat) so imagery reads as curated, not decorative; Lucide/Teo balance imagery within a storytelling grid. Consistent aspect ratios within a row, generous surrounding whitespace. The stealable rule matches Brand_Kit's photography section: caption every image with restrained metadata and keep one visual identity (same background/accent/type) so a gallery never introduces a new theme.

### Navigation & Conversion
- **Navigation:** Wordmark top-left, short editorial nav (Work / About / Journal / Contact), low item count, often a footer sitemap. BERGEN/Mokat may add an oversized-type or overlay menu for drama; Lucide/Teo keep a minimal fixed top nav. All keep the name top-left and items few — consistent with the Work · Photography · Writing · About · Contact order Madhavi needs.
- **Trust / Credibility:** Credibility via curation and editorial polish rather than badge walls — selected-work framing, About/manifesto sections, client/press logos kept in About or footer, not the hero. Prose-stated experience and social links sit low on the page. None clutter the hero, matching the Brand_Kit rule to surface affiliations (nference, IIT, MBBS, IAF) without crowding the opening.

### Synthesis
- **Takeaway:** STEAL: the oversized-type magazine-spread project page (BERGEN/Mokat) — a large title breaking the grid over full-bleed media with a wide-tracked caption metadata line (title . stack/domain . year) — plus Lucide/Teo's disciplined storytelling grid and single-CMS work+writing fusion. This gives dense founder-friendly case studies while staying editorial. AVOID: leaning on the platform for accessibility — none handle prefers-reduced-motion, so build the ECG/scroll fallbacks by hand; and avoid any template's standing bold accent competing with the work — keep near-monochrome and let maroon be the only <5% accent.

---

## kozodoi website

### Identity & Hero
- **Hero:** Left/top hero pairs a circular professional profile photo with the name set as 'Nikita Kozodoi, PhD' and role directly beneath: 'Senior AI Scientist at AWS.' Three emoji-led credibility descriptors follow ('Building AI and agentic solutions', 'PhD and 8+ years in applied AI/ML'). First-5-seconds credibility = photo + PhD in the name + named employer (AWS) + years-of-experience line. STEAL: putting the credential (PhD) inline with the name and the affiliation as the role subtitle is a compact clinical-credibility move.
- **Wordmark / Identity:** Name is set as a plain text logotype 'Nikita Kozodoi | AI Scientist' in the header/title — no monogram or graphic mark. Identity is carried by the consistent header name + role formula and the profile photo rather than a designed glyph. It is a Jekyll Minima-derived text wordmark, not a kinetic/variable type treatment.
- **Signature Detail:** The ownable element is the 'By the Numbers' stats strip — a row of quantified achievements (GitHub Stars, Commits, Publications, Citations, Talks, Blog Posts) — combined with a citation-distribution bar chart (2019-2026) on the publications page. Used with restraint as a single band rather than scattered. This turns credibility into a memorable, glanceable signature. Analog for ECG signature: one distinctive data-viz band that recurs.

### Typography & Layout
- **Whitespace & Layout:** Single centered content column (Minima) with modular card blocks on the homepage. Homepage uses a card grid for the four content categories (Blog, Talks, Publications, Featured Projects); interior pages (blog list, publications) use a stacked vertical list at a comfortable reading width. Rhythm is clean and consistent but template-derived rather than bespoke.
- **Light / Dark & Tone:** Ships an explicit dark/light theme toggle. A single accent holds across both themes on a neutral ground; dark mode makes the profile photo, project imagery, and stats pop. Good proof that a single maroon-like accent can survive a theme switch.

### Content Presentation
- **Project Presentation:** Homepage 'Featured Projects' shows three highlighted initiatives (Deep Research, GenAI Reflection, SWE-InfraBench) as cards with accompanying imagery. Deeper work lives under a Portfolio section and Kaggle Solutions with per-project write-ups linking code and results. Cards for featured/curated, list+write-up pages for the long tail. Real artifacts (repos, competition solutions, notebooks) are surfaced directly since posts are authored from Jupyter notebooks via fastpages.
- **Research-Artifact Presentation:** Dedicated Publications page lists papers chronologically by year, each entry showing title, venue+year (e.g. 'ICML 2026 Workshop...'), and an emoji type badge (Conference, Journal, Preprint, Package, Thesis), with per-entry metadata links (Abstract, PDF, Publication URL) — not every entry has all links. A top filter bar sorts by Type and Year; header shows aggregate metrics (16 Papers, 592 total citations, h-index 7) plus a citation bar chart; pagination at the bottom. Author names are omitted per entry to keep density low. STEAL: this filter-by-type/year + badge + link-row list is a clean, reusable publications-index pattern.
- **Writing / Blog Integration:** Writing is the backbone: a full Blog of ML tutorials, AWS posts, competition solutions and guides, authored in HTML, Jupyter notebooks (.ipynb), or Markdown and auto-converted to HTML by GitHub Actions + fastpages. Blog, Talks, Publications, and Portfolio coexist as top-level nav peers, so essays and research live side by side. CMS strategy = notebooks-as-posts (no external CMS), ideal for a writing-led + research-index clone.
- **Photography / Imagery:** Personal media is limited and purposeful: a single circular profile photo in the hero and per-project/post thumbnail imagery. No dominating personal photography — technical figures and project images carry the visual load, and the profile photo is the only personal media, keeping the technical focus.

### Navigation & Conversion
- **Navigation:** Top horizontal nav in linear order: Home, Blog, Talks, Publications, Awards. Wordmark (name) sits in the header alongside the nav. Simple, flat, no mega-menu; order front-loads writing (Blog) after Home, then speaking and research.
- **Trust / Credibility:** Credibility surfaced through: PhD in the name, 'Senior AI Scientist at AWS' role line, the 'By the Numbers' stats strip, an Awards nav section, citation counts + h-index on the publications page, and a downloadable CV. Social proof via LinkedIn, GitHub, Google Scholar, Twitter, Instagram icon links. Kept out of the hero body and concentrated in dedicated bands/sections.

### Synthesis
- **Takeaway:** STEAL: the filterable Publications index (type + year filters, emoji type badges, per-entry Abstract/PDF/URL link rows, aggregate citation/h-index header with a small bar chart) and the notebooks-as-posts fastpages workflow — together they give a real research-artifact index plus a low-friction writing pipeline, exactly the 'writing-led + research-index' pattern Madhavi needs, and the dark/light toggle proves a single accent can hold across themes. AVOID: adopting Minima's generic system-font, template-default look wholesale — it reads 'templated' and lacks the editorial serif/sans contrast, bespoke motion, and reduced-motion discipline the maroon/ECG/clinical brand wants; keep kozodoi's information architecture but re-skin the typography and add explicit prefers-reduced-motion handling.

---
