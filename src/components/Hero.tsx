"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import PhoneMockup from "./PhoneMockup";
import BlobField from "./BlobField";

const headlineLines = [
  { text: "Social media", italic: false },
  { text: "that moves your", italic: false },
  { text: "brand forward.", italic: true },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChipIcon({ kind }: { kind: "calendar" | "reel" | "plan" }) {
  if (kind === "calendar") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="3.5" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 2V4.5M11 2V4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M5.5 9.5L7 11L10.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "reel") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 12L6 7L9 9.5L14 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 4H14V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FloatingChip({
  label,
  kind,
  className,
  delay,
}: {
  label: string;
  kind: "calendar" | "reel" | "plan";
  className: string;
  delay: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`glass absolute hidden items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-bone/90 lg:flex ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={
        reduced
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: [0, -10, 0] }
      }
      transition={
        reduced
          ? { duration: 0.8, ease: EASE, delay }
          : { duration: 5, ease: "easeInOut", repeat: Infinity, delay }
      }
    >
      <span className="text-mist">
        <ChipIcon kind={kind} />
      </span>
      {label}
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const reduced = useReducedMotion();

  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${mouseX}% ${mouseY}%, rgba(159,180,217,0.16), transparent 60%)`;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-midnight pt-32 text-bone"
    >
      <div
        aria-hidden
        className="grid-mask pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(239,236,230,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(239,236,230,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <BlobField />

      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: spotlight }}
        />
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 sm:px-10">
        <div className="grid flex-1 grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="glass mb-8 inline-flex items-center rounded-full px-4 py-2 text-xs font-medium tracking-wide text-bone/80"
            >
              Management, content and strategy
            </motion.div>

            <h1 className="font-display text-[14vw] sm:text-[72px] md:text-[80px] lg:text-[88px]">
              {headlineLines.map((line, i) => (
                <span key={line.text} className="block overflow-hidden">
                  <motion.span
                    className={`block ${line.italic ? "shimmer-text italic" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1.2,
                      ease: EASE,
                      delay: 0.3 + i * 0.14,
                    }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.9 }}
              className="mt-8 max-w-md text-base text-bone/60 sm:text-lg"
            >
              We run the day-to-day of your social accounts, end to end, so
              your brand shows up like it means it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.05 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="group flex min-h-11 items-center gap-3 rounded-full bg-bone py-1 pl-6 pr-1 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
                style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
              >
                Start a project
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-bone transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowIcon />
                </span>
              </a>
              <a
                href="#services"
                className="flex min-h-11 items-center rounded-full border border-bone/25 px-6 text-sm font-medium text-bone/90 transition-colors hover:border-bone/50"
              >
                See what we do
              </a>
            </motion.div>
          </div>

          <div className="relative flex justify-center pb-10 lg:pb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
              className="relative"
            >
              <PhoneMockup />
              <FloatingChip
                label="Post scheduled"
                kind="calendar"
                className="-left-6 top-6 sm:-left-10"
                delay={0}
              />
              <FloatingChip
                label="New reel edited"
                kind="reel"
                className="-right-4 top-1/2 sm:-right-10"
                delay={1.4}
              />
              <FloatingChip
                label="Content plan ready"
                kind="plan"
                className="-left-4 bottom-10 sm:-left-12"
                delay={2.6}
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex items-center justify-center gap-3 pb-8 text-[11px] uppercase tracking-[0.2em] text-bone/40"
        >
          <span>Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-bone/20">
            {!reduced && (
              <motion.span
                className="absolute left-0 top-0 h-4 w-px bg-bone/80"
                animate={{ y: ["-20%", "120%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
