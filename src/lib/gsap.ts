"use client";

import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/** Register GSAP plugins exactly once, browser-only. Safe to call repeatedly. */
export function registerGsap(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);
  registered = true;
}

export { gsap, ScrollTrigger };
