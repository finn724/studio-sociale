"use client";

import { motion, useReducedMotion } from "framer-motion";

const cells = Array.from({ length: 12 }, (_, i) => i);

export function CalendarIcon({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect
        x="8"
        y="10"
        width="48"
        height="46"
        rx="8"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <path d="M8 22H56" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      {cells.map((cell) => {
        const col = cell % 4;
        const row = Math.floor(cell / 4);
        return (
          <motion.rect
            key={cell}
            x={14 + col * 10.5}
            y={27 + row * 9.5}
            width="7"
            height="7"
            rx="1.5"
            fill="currentColor"
            initial={{ opacity: 0.15 }}
            animate={
              active && !reduced
                ? { opacity: [0.15, 1, 0.15] }
                : { opacity: 0.15 }
            }
            transition={{
              duration: 1.6,
              repeat: active ? Infinity : 0,
              delay: cell * 0.09,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </svg>
  );
}

export function PlayIcon({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
      <motion.circle
        cx="32"
        cy="32"
        r="22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={
          active && !reduced
            ? { scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }
            : { scale: 1, opacity: 0.5 }
        }
        transition={{ duration: 1.8, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        style={{ transformOrigin: "32px 32px" }}
      />
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M27 23L41 32L27 41V23Z" fill="currentColor" />
    </svg>
  );
}

export function GrowthIcon({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        d="M9 46L9 46"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <motion.path
        d="M8 46L20 32L29 39L44 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={
          reduced
            ? { pathLength: 1, opacity: 1 }
            : active
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0.3, opacity: 0.4 }
        }
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M36 18H44V26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={
          reduced
            ? { pathLength: 1, opacity: 1 }
            : active
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0.3, opacity: 0.4 }
        }
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
    </svg>
  );
}
