"use client";

import { motion, useReducedMotion } from "framer-motion";

type Blob = {
  color: string;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay?: number;
};

const shapes = [
  "60% 40% 55% 45% / 55% 45% 55% 45%",
  "45% 55% 60% 40% / 45% 55% 45% 55%",
  "55% 45% 40% 60% / 60% 40% 60% 40%",
  "40% 60% 45% 55% / 50% 50% 50% 50%",
];

function DriftingBlob({ color, size, top, left, duration, delay = 0 }: Blob) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: color,
        opacity: 0.4,
        filter: "blur(90px)",
        willChange: "transform, border-radius",
      }}
      animate={
        reduced
          ? undefined
          : {
              borderRadius: shapes,
              x: [0, 40, -30, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.08, 0.96, 1],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function BlobField({
  variant = "trio",
  className = "",
}: {
  variant?: "trio" | "single-lilac";
  className?: string;
}) {
  if (variant === "single-lilac") {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        <DriftingBlob
          color="var(--lilac)"
          size={560}
          top="20%"
          left="55%"
          duration={26}
        />
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <DriftingBlob
        color="var(--mist)"
        size={520}
        top="-10%"
        left="5%"
        duration={22}
      />
      <DriftingBlob
        color="var(--lilac)"
        size={480}
        top="30%"
        left="60%"
        duration={28}
        delay={2}
      />
      <DriftingBlob
        color="var(--champagne)"
        size={420}
        top="55%"
        left="20%"
        duration={24}
        delay={4}
      />
    </div>
  );
}
