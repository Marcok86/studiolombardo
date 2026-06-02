"use client";
import { useEffect, useState } from "react";

export type DeviceMode = "desktop" | "mobile" | "reduced";

/** Rileva la modalita' una volta lato client (evita mismatch SSR). */
export function useDeviceMode(): DeviceMode | null {
  const [mode, setMode] = useState<DeviceMode | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setMode("reduced");
      return;
    }
    const decide = () => {
      const smallScreen = window.matchMedia("(max-width: 820px)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      setMode(smallScreen || coarse ? "mobile" : "desktop");
    };
    decide();
    const mq = window.matchMedia("(max-width: 820px)");
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);

  return mode;
}

export const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, a: number, b: number) =>
  Math.min(Math.max(v, a), b);
