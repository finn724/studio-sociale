"use client";

import { useEffect, type RefObject } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRefraction } from "@/lib/liquid-glass";
import LiquidGlass from "./LiquidGlass";

export default function GlassLens({
  containerRef,
  size = 200,
}: {
  containerRef: RefObject<HTMLElement | null>;
  size?: number;
}) {
  const supported = useRefraction();
  const reduced = useReducedMotion();
  const enabled = supported && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 110, damping: 17, mass: 0.7 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    const el = containerRef.current;
    if (!enabled || !el) return;

    let width = el.offsetWidth;
    let height = el.offsetHeight;
    let hovering = false;
    let onScreen = false;
    let raf = 0;
    const start = performance.now();

    const resize = new ResizeObserver(() => {
      width = el.offsetWidth;
      height = el.offsetHeight;
    });
    resize.observe(el);

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    visibility.observe(el);

    // When nobody is steering it, the lens wanders slowly across the copy.
    const drift = (now: number) => {
      raf = requestAnimationFrame(drift);
      if (hovering || !onScreen) return;
      const t = (now - start) / 1000;
      x.set(width * 0.55 + Math.cos(t * 0.45) * width * 0.3 - size / 2);
      y.set(height * 0.5 + Math.sin(t * 0.7) * height * 0.32 - size / 2);
    };
    raf = requestAnimationFrame(drift);

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      hovering = true;
      const rect = el.getBoundingClientRect();
      x.set(event.clientX - rect.left - size / 2);
      y.set(event.clientY - rect.top - size / 2);
    };
    const leave = () => {
      hovering = false;
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      visibility.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [enabled, containerRef, size, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-10"
      style={{ x: sx, y: sy, width: size, height: size }}
    >
      <LiquidGlass
        lens
        radius={size / 2}
        bezel={Math.round(size * 0.18)}
        strength={96}
        blur={0}
        aberration
        sheen={false}
        tint="rgba(255,255,255,0.02)"
        className="h-full w-full"
      />
    </motion.div>
  );
}
