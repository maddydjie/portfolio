"use client";

import {
  Children,
  cloneElement,
  createRef,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export type SwapCardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const SwapCard = forwardRef<HTMLDivElement, SwapCardProps>(
  ({ className = "", ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 cursor-pointer rounded-xl border bg-transparent [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform] ${className}`.trim()}
    />
  ),
);
SwapCard.displayName = "SwapCard";

type Slot = { x: number; y: number; z: number; zIndex: number };

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

export type CardSwapHandle = {
  advance: () => void;
  bringToFront: (idx: number) => void;
  pause: () => void;
  resume: () => void;
};

type CardSwapProps = {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  onCardClick?: (idx: number) => void;
  onFrontChange?: (idx: number) => void;
  className?: string;
};

/** React Bits Card Swap — GSAP only, brand borders, reduced-motion safe. */
export const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(function CardSwap(
  {
    children,
    width = 420,
    height = 360,
    cardDistance = 48,
    verticalDistance = 56,
    delay = 4800,
    pauseOnHover = true,
    skewAmount = 4,
    easing = "linear",
    onCardClick,
    onFrontChange,
    className = "",
  },
  ref,
) {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power2.inOut",
          durDrop: 0.7,
          durMove: 0.7,
          durReturn: 0.7,
          promoteOverlap: 0.45,
          returnDelay: 0.16,
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<SwapCardProps>[],
    [children],
  );
  const refs = useMemo(
    () => childArr.map(() => createRef<HTMLDivElement>()),
    [childArr.length],
  );
  const onFrontChangeRef = useRef(onFrontChange);
  onFrontChangeRef.current = onFrontChange;

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const swappingRef = useRef(false);
  const container = useRef<HTMLDivElement>(null);
  const swapFnRef = useRef<() => void>(() => {});

  const placeAll = () => {
    const total = refs.length;
    order.current.forEach((cardIdx, slotIdx) => {
      const el = refs[cardIdx]?.current;
      if (el) placeNow(el, makeSlot(slotIdx, cardDistance, verticalDistance, total), skewAmount);
    });
  };

  const runSwapOnce = () => {
    if (order.current.length < 2 || swappingRef.current) return;
    const [front, ...rest] = order.current;
    const elFront = refs[front]?.current;
    if (!elFront) return;

    swappingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        swappingRef.current = false;
      },
    });
    tlRef.current = tl;

    tl.to(elFront, {
      y: "+=380",
      duration: config.durDrop,
      ease: config.ease,
    });

    tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx]?.current;
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, "promote");
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease,
        },
        `promote+=${i * 0.1}`,
      );
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
    tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, "return");
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease,
      },
      "return",
    );
    tl.call(() => {
      order.current = [...rest, front];
      onFrontChangeRef.current?.(order.current[0] ?? 0);
    });
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = 0;
    }
  };

  const startTimer = () => {
    clearTimer();
    if (pausedRef.current || prefersReducedMotion()) return;
    intervalRef.current = window.setInterval(() => swapFnRef.current(), delay);
  };

  useImperativeHandle(ref, () => ({
    advance: () => {
      runSwapOnce();
      startTimer();
    },
    bringToFront: (idx: number) => {
      if (idx < 0 || idx >= refs.length) return;
      tlRef.current?.kill();
      swappingRef.current = false;
      const without = order.current.filter((i) => i !== idx);
      order.current = [idx, ...without];
      placeAll();
      onFrontChangeRef.current?.(idx);
      startTimer();
    },
    pause: () => {
      pausedRef.current = true;
      tlRef.current?.pause();
      clearTimer();
    },
    resume: () => {
      pausedRef.current = false;
      tlRef.current?.play();
      startTimer();
    },
  }));

  useEffect(() => {
    const reduce = prefersReducedMotion();
    order.current = Array.from({ length: refs.length }, (_, i) => i);
    placeAll();
    onFrontChangeRef.current?.(order.current[0] ?? 0);

    if (reduce || refs.length < 2) return;

    swapFnRef.current = runSwapOnce;
    // First auto-swap after delay (not immediately).
    startTimer();

    const node = container.current;
    if (pauseOnHover && node) {
      const pause = () => {
        pausedRef.current = true;
        tlRef.current?.pause();
        clearTimer();
      };
      const resume = () => {
        pausedRef.current = false;
        tlRef.current?.play();
        startTimer();
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearTimer();
        tlRef.current?.kill();
      };
    }

    return () => {
      clearTimer();
      tlRef.current?.kill();
    };
    // Intentionally re-init when geometry/timing props change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs.length]);

  const rendered = childArr.map((child, i) =>
    isValidElement<SwapCardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        } as SwapCardProps & { ref: RefObject<HTMLDivElement | null> })
      : child,
  );

  return (
    <div
      ref={container}
      className={`relative overflow-visible [perspective:900px] ${className}`.trim()}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
});
CardSwap.displayName = "CardSwap";
