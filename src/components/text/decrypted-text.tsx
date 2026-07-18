"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Mono text that scrambles then settles left-to-right — a "decrypt" reveal.
// Adapted from React Bits' DecryptedText; rAF-driven, no deps. Reduced-motion
// renders the final string immediately. Re-runs when `replayKey` changes.
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*+·×";

export function DecryptedText({
  text,
  className = "",
  replayKey = 0,
  charsPerFrame = 0.5,
}: {
  text: string;
  className?: string;
  replayKey?: number;
  charsPerFrame?: number;
}) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);

  useEffect(() => {
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
  }, [text, charsPerFrame, replayKey]);

  return (
    <span className={className} aria-label={text}>
      {out}
    </span>
  );
}
