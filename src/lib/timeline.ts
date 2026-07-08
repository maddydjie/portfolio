"use client";

import type { gsap } from "@/lib/gsap";

/** True the first time it's called with `key` this session; false afterward. */
export function playOncePerSession(key: string): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(key)) return false;
  sessionStorage.setItem(key, "1");
  return true;
}

/**
 * Let the user skip an intro timeline: the first scroll/keydown/pointerdown
 * seeks it to the end. Returns a cleanup that removes the listeners.
 */
export function wireSkip(tl: gsap.core.Timeline): () => void {
  const skip = () => {
    tl.progress(1);
  };
  const opts = { once: true, passive: true } as const;
  window.addEventListener("wheel", skip, opts);
  window.addEventListener("keydown", skip, opts);
  window.addEventListener("pointerdown", skip, opts);
  return () => {
    window.removeEventListener("wheel", skip);
    window.removeEventListener("keydown", skip);
    window.removeEventListener("pointerdown", skip);
  };
}
