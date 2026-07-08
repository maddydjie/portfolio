"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { prefersReducedMotion } from "@/lib/motion";

function Knot({ reduce }: { reduce: boolean }) {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    const m = ref.current;
    if (!m || reduce) return;
    m.rotation.x += delta * 0.14;
    m.rotation.y += delta * 0.2;
    // subtle cursor parallax (pointer is -1..1)
    m.rotation.z += (state.pointer.x * 0.25 - m.rotation.z) * 0.05;
  });
  return (
    <mesh ref={ref} rotation={[0.3, 0.2, 0]}>
      {/* torus-knot p=2,q=3 = a trefoil braid — the weave in 3D */}
      <torusKnotGeometry args={[1, 0.34, 240, 32, 2, 3]} />
      <meshStandardMaterial color="#d97a6c" metalness={1} roughness={0.08} envMapIntensity={1.5} />
    </mesh>
  );
}

export function ChromeKnot({ className = "" }: { className?: string }) {
  const reduce = prefersReducedMotion();
  return (
    <Canvas
      aria-hidden
      dpr={[1, 2]}
      frameloop={reduce ? "demand" : "always"}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className={`pointer-events-none !absolute inset-0 ${className}`}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.35} />
      <Knot reduce={reduce} />
      {/* self-contained reflections — no external HDR/CDN */}
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[3, 3, 2]} scale={[5, 5, 1]} />
        <Lightformer intensity={1.3} color="#8b2e2a" position={[-4, 1, 1]} scale={[4, 4, 1]} />
        <Lightformer intensity={1.6} position={[0, -3, 2]} scale={[6, 3, 1]} />
      </Environment>
    </Canvas>
  );
}
