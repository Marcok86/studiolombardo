"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "motion/react";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Edificio che si COSTRUISCE in base allo scroll (progress 0→1):
 * ogni piano cresce dalla base in sequenza, una linea di scansione
 * dorata risale, la camera sale e il volume orbita. Lo scroll È la storia.
 */
function Build({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const levelRefs = useRef<(THREE.Group | null)[]>([]);
  const scan = useRef<THREE.Mesh>(null);

  const reduce = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const { levels, total } = useMemo(() => {
    const defs = [
      { w: 2.7, h: 0.6, d: 2.1 },
      { w: 2.1, h: 0.95, d: 1.6 },
      { w: 1.5, h: 1.15, d: 1.2 },
      { w: 1.0, h: 1.5, d: 0.85 },
    ];
    let y = 0;
    const out = defs.map((d) => {
      const item = { ...d, baseY: y };
      y += d.h;
      return item;
    });
    return { levels: out, total: y };
  }, []);

  const N = levels.length;

  useFrame((state, delta) => {
    const p = reduce ? 1 : THREE.MathUtils.clamp(progress.get(), 0, 1);

    // costruzione sequenziale dei piani
    levels.forEach((l, i) => {
      const g = levelRefs.current[i];
      if (!g) return;
      const start = (i / N) * 0.82;
      const win = 0.82 / N;
      const t = THREE.MathUtils.clamp((p - start) / win, 0, 1);
      const e = easeOut(t);
      g.scale.y = Math.max(0.0001, e);
      g.scale.x = 0.82 + 0.18 * e;
      g.scale.z = 0.82 + 0.18 * e;
      g.visible = t > 0.001;
    });

    // orbita del volume + parallax puntatore
    if (group.current) {
      const target = -0.7 + p * 2.3 + state.pointer.x * 0.25;
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        target,
        4,
        delta
      );
    }

    // camera che sale per mostrare il volume completo
    const cam = state.camera;
    const camY = 1.1 + p * 2.4;
    cam.position.y = THREE.MathUtils.damp(cam.position.y, camY, 3, delta);
    cam.lookAt(0, 0.4 + p * 0.7, 0);

    // linea di scansione che risale con la costruzione
    if (scan.current) {
      scan.current.position.y = p * total;
      const mat = scan.current.material as THREE.MeshBasicMaterial;
      mat.opacity = p > 0.02 && p < 0.98 ? 0.09 : 0;
    }
  });

  return (
    <group ref={group} rotation={[0.12, -0.7, 0]}>
      <group position={[0, -total / 2, 0]}>
        {levels.map((l, i) => (
          <group
            key={i}
            position={[0, l.baseY, 0]}
            ref={(el) => {
              levelRefs.current[i] = el;
            }}
          >
            <mesh position={[0, l.h / 2, 0]}>
              <boxGeometry args={[l.w, l.h, l.d]} />
              <meshBasicMaterial color="#caa14e" transparent opacity={0.05} />
              <Edges color="#ecc77e" />
            </mesh>
          </group>
        ))}

        <gridHelper args={[10, 20, "#6b5524", "#19222c"]} position={[0, 0, 0]} />

        <mesh ref={scan} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.6, 3.6]} />
          <meshBasicMaterial
            color="#ecc77e"
            transparent
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function MethodCanvas({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <Canvas
      camera={{ position: [5.2, 2, 5.6], fov: 38 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Build progress={progress} />
    </Canvas>
  );
}
