"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Brand-adapted port of React Bits' ProfileCard. Pointer-tilt 3D card with a
// pointer-tracked sheen + glare and a soft behind-glow. Rebranded to the site
// palette — maroon/ink sheen instead of the original rainbow holographic, per
// Brand_Kit (no blue/purple, one maroon accent). rAF-lerped, no framer-motion.
// Reduced-motion: static, no tilt.
const STYLE_ID = "pc-brand-styles";

const CSS = `
.pcb-wrap{ perspective:600px; position:relative; touch-action:none;
  --px:50%; --py:50%; --rx:0deg; --ry:0deg; --bx:50%; --by:50%; --from-center:0; --op:0; }
.pcb-wrap:hover,.pcb-wrap.active{ --op:1; }
.pcb-behind{ position:absolute; inset:-8%; z-index:0; pointer-events:none; border-radius:1rem;
  background:radial-gradient(circle at var(--px) var(--py), var(--color-hero-accent) 0%, transparent 45%);
  filter:blur(46px) saturate(1.05); opacity:calc(0.55*var(--op)); transition:opacity 220ms ease; }
.pcb-card{ position:relative; z-index:1; aspect-ratio:0.72; width:100%; border-radius:1rem;
  overflow:hidden; border:1px solid color-mix(in srgb, var(--color-hero-muted) 30%, transparent);
  background:#14120e; transform-style:preserve-3d; will-change:transform;
  transform:rotateX(var(--ry)) rotateY(var(--rx));
  box-shadow:0 30px 80px -30px rgba(0,0,0,.75); transition:transform .5s ease; }
.pcb-card.active{ transition:none; }
.pcb-layer{ position:absolute; inset:0; pointer-events:none; }
/* maroon holographic sheen */
.pcb-sheen{ z-index:3; mix-blend-mode:soft-light; opacity:calc(.4 + .5*var(--op)); transition:opacity .4s ease;
  background-image:
    repeating-linear-gradient(-48deg,
      transparent 0%, color-mix(in srgb,var(--color-hero-accent) 55%,transparent) 3%,
      transparent 6%, transparent 12%),
    linear-gradient(120deg,
      color-mix(in srgb,var(--color-hero-accent) 40%,transparent) 0%,
      transparent 38%, transparent 62%,
      color-mix(in srgb,#8b2e2a 55%,transparent) 100%);
  background-size:220% 220%, 180% 180%;
  background-position: var(--bx) var(--by), calc(100% - var(--bx)) var(--by); }
/* pointer glare */
.pcb-glare{ z-index:4; mix-blend-mode:overlay; opacity:calc(.5*var(--op)); transition:opacity .4s ease;
  background:radial-gradient(circle at var(--px) var(--py), rgba(255,255,255,.5), transparent 42%); }
/* fine grain */
.pcb-grain{ z-index:5; opacity:.12; mix-blend-mode:overlay;
  background-image:radial-gradient(rgba(255,255,255,.7) .5px, transparent .6px); background-size:3px 3px; }
.pcb-photo{ z-index:1; }
.pcb-photo img{ object-fit:cover; object-position:top; filter:grayscale(.35) contrast(1.05); }
.pcb-vignette{ z-index:2; background:linear-gradient(to top, rgba(20,18,14,.95) 4%, transparent 42%); }
.pcb-top{ position:absolute; top:0; inset-inline:0; z-index:6; display:flex; justify-content:space-between;
  padding:1rem 1.1rem; font-family:var(--font-mono); }
.pcb-name{ position:absolute; left:1.1rem; bottom:4.6rem; z-index:6; }
.pcb-name h3{ font-family:var(--font-serif); font-size:1.9rem; line-height:1; color:var(--color-hero-fg); letter-spacing:-.02em; }
.pcb-name p{ font-family:var(--font-mono); font-size:.78rem; color:var(--color-hero-muted); margin-top:.35rem; letter-spacing:.08em; }
.pcb-bar{ position:absolute; inset-inline:.7rem; bottom:.7rem; z-index:7; display:flex; align-items:center;
  justify-content:space-between; gap:.6rem; padding:.5rem .55rem .5rem .6rem; border-radius:.7rem;
  border:1px solid color-mix(in srgb,var(--color-hero-muted) 22%,transparent);
  background:color-mix(in srgb, #14120e 55%, transparent); backdrop-filter:blur(10px); }
.pcb-id{ display:flex; align-items:center; gap:.55rem; }
.pcb-mini{ width:2rem; height:2rem; border-radius:999px; overflow:hidden; flex:0 0 auto;
  border:1px solid color-mix(in srgb,var(--color-hero-muted) 30%,transparent); }
.pcb-mini img{ width:100%; height:100%; object-fit:cover; object-position:top; }
.pcb-handle{ font-family:var(--font-mono); font-size:.78rem; color:var(--color-hero-fg); }
.pcb-status{ font-family:var(--font-mono); font-size:.68rem; color:var(--color-hero-muted); display:flex; align-items:center; gap:.35rem; }
.pcb-status::before{ content:""; width:.4rem; height:.4rem; border-radius:999px; background:var(--color-success,#2d6a4f); }
.pcb-btn{ pointer-events:auto; font-family:var(--font-mono); font-size:.72rem; letter-spacing:.1em; color:var(--color-hero-fg);
  padding:.45rem .8rem; border-radius:.5rem; cursor:pointer; background:transparent;
  border:1px solid color-mix(in srgb,var(--color-hero-accent) 60%,transparent); transition:background .2s ease,color .2s ease; }
.pcb-btn:hover{ background:var(--color-hero-accent); color:#14120e; }
.pcb-corner{ font-family:var(--font-mono); font-size:.68rem; letter-spacing:.12em; color:var(--color-hero-muted); }
`;

function injectStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function ProfileCard({
  name = "BVS Madhavi",
  title = "Clinical AI Engineer · MBBS + IITM",
  handle = "maddydjie",
  status = "Available",
  contactText = "Contact",
  onContactClick,
}: {
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  onContactClick?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectStyles();
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card || prefersReducedMotion()) return;

    let raf = 0;
    let cx = 50;
    let cy = 50;
    let tx = 50;
    let ty = 50;
    let running = false;

    const apply = () => {
      wrap.style.setProperty("--px", `${cx}%`);
      wrap.style.setProperty("--py", `${cy}%`);
      wrap.style.setProperty("--bx", `${35 + (cx / 100) * 30}%`);
      wrap.style.setProperty("--by", `${35 + (cy / 100) * 30}%`);
      wrap.style.setProperty("--rx", `${((cx - 50) / 50) * 10}deg`);
      wrap.style.setProperty("--ry", `${((50 - cy) / 50) * 10}deg`);
    };
    const step = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      apply();
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(step);
      } else {
        running = false;
      }
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      tx = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
      ty = Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100));
      card.classList.add("active");
      kick();
    };
    const leave = () => {
      tx = 50;
      ty = 50;
      card.classList.remove("active");
      kick();
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const src = "/hero-portrait.jpg";
  const mini = useMemo(() => src, []);

  return (
    <div ref={wrapRef} className="pcb-wrap mx-auto w-[min(78vw,22rem)]">
      <div className="pcb-behind" />
      <div ref={cardRef} className="pcb-card">
        <div className="pcb-layer pcb-photo">
          <Image src={src} alt={`${name} portrait`} fill priority sizes="360px" />
        </div>
        <div className="pcb-layer pcb-vignette" />
        <div className="pcb-layer pcb-sheen" />
        <div className="pcb-layer pcb-glare" />
        <div className="pcb-layer pcb-grain" />

        <div className="pcb-top">
          <span className="pcb-corner">PORTFOLIO ’26</span>
          <span className="pcb-corner">◈</span>
        </div>

        <div className="pcb-name">
          <h3>{name}</h3>
          <p>{title}</p>
        </div>

        <div className="pcb-bar">
          <div className="pcb-id">
            <span className="pcb-mini">
              {/* mini avatar — plain img is fine inside the fixed 2rem chip */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image src={mini} alt="" width={32} height={32} />
            </span>
            <span>
              <span className="pcb-handle">@{handle}</span>
              <br />
              <span className="pcb-status">{status}</span>
            </span>
          </div>
          <button type="button" className="pcb-btn" onClick={onContactClick}>
            {contactText}
          </button>
        </div>
      </div>
    </div>
  );
}
