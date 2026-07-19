"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Mono text that scrambles then settles left-to-right — a "decrypt" reveal.
// Adapted from React Bits' DecryptedText; rAF-driven, no deps. Reduced-motion
// renders the final string immediately. Re-runs when `replayKey` changes.
// `startOnView` waits until the span enters the viewport (for below-fold use).
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*+·×";

export function DecryptedText({
  text,
  className = "",
  replayKey = 0,
  charsPerFrame = 0.5,
  startOnView = false,
}: {
  text: string;
  className?: string;
  replayKey?: number;
  charsPerFrame?: number;
  startOnView?: boolean;
}) {
  const [out, setOut] = useState(text);
  const [armed, setArmed] = useState(!startOnView);
  const raf = useRef(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const el = spanRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!armed) {
      setOut(text);
      return;
    }
    if (prefersReducedMotion()) {
      setOut(text);
      return;
    }
    let revealed = 0;
    const total = text.length;
    const tick = () => {
      revealed += charsPerFrame;
      const r = Math.floor(revealed);
      let s = "";
      for (let i = 0; i < total; i++) {
        if (text[i] === " ") s += " ";
        else if (i < r) s += text[i];
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (r < total) raf.current = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [text, charsPerFrame, replayKey, armed]);

  return (
    <span ref={spanRef} className={className} aria-label={text}>
      {out}
    </span>
  );
}
