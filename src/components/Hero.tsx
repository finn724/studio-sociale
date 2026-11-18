"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import { useIntroDone } from "@/lib/intro";
import LiquidBackground from "./LiquidBackground";
import LiquidGlass from "./LiquidGlass";
import Magnetic from "./Magnetic";
import PhoneMockup from "./PhoneMockup";
import SplitChars from "./SplitChars";

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
  ready,
}: {
  label: string;
  kind: "calendar" | "reel" | "plan";
  className: string;
  delay: number;
  ready: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-10 hidden lg:block ${className}`}
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ duration: 1.1, ease: EASE, delay: 1 + delay * 0.15 }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -12, 0], rotate: [0, delay % 2 ? 2 : -2, 0] }}
        transition={{ duration: 6 + delay, ease: "easeInOut", repeat: Infinity }}
      >
        <LiquidGlass
          radius={999}
          bezel={14}
          strength={30}
          blur={5}
          tint="rgba(15,17,21,0.38)"
          className="flex items-center gap-2.5 whitespace-nowrap py-2.5 pl-3 pr-4 text-xs font-medium text-bone"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bone/15 text-mist">
            <ChipIcon kind={kind} />
          </span>
          {label}
        </LiquidGlass>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = useIntroDone();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const phoneY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.7]);

  // Filters on an ancestor cut glass off from the backdrop, so clear it once the reveal lands.
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(10px)" },
    animate: ready
      ? { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }
      : undefined,
    transition: { duration: 1.2, ease: EASE, delay },
  });

  return (
    <section
      id="top"
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-midnight text-bone"
    >
      <LiquidBackground />

      <div
        aria-hidden
        className="grid-mask pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(239,236,230,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(239,236,230,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <motion.div
        style={reduced ? undefined : { y: contentY, scale: contentScale }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 pb-24 pt-32 sm:px-10"
      >
        <div className="grid flex-1 grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div {...fadeUp(0.1)} className="mb-8 inline-flex">
              <LiquidGlass
                radius={999}
                refract={false}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium tracking-wide text-bone/85"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mist opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mist" />
                </span>
                Management, content and strategy
              </LiquidGlass>
            </motion.div>

            <h1 className="font-display text-[14vw] sm:text-[76px] md:text-[86px] lg:text-[96px]">
              <span className="block">
                <SplitChars text="Social media" play={ready} delay={0.15} />
              </span>
              <span className="block">
                <SplitChars text="that moves your" play={ready} delay={0.4} />
              </span>
              <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                <motion.span
                  className="shimmer-text block italic"
                  initial={{ y: "105%", filter: "blur(16px)" }}
                  animate={ready ? { y: "0%", filter: "blur(0px)" } : undefined}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.85 }}
                >
                  brand forward.
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...fadeUp(1.05)}
              className="mt-8 max-w-md text-base text-bone/65 sm:text-lg"
            >
              We run the day-to-day of your social accounts, end to end, so
              your brand shows up like it means it.
            </motion.p>

            <motion.div {...fadeUp(1.2)} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#contact"
                  className="group flex min-h-11 items-center gap-3 rounded-full bg-bone py-1 pl-6 pr-1 text-sm font-medium text-ink shadow-[0_10px_40px_-10px_rgba(196,181,240,0.6)] transition-transform hover:scale-[1.03]"
                  style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                >
                  Start a project
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-bone transition-transform duration-500 group-hover:-rotate-45">
                    <ArrowIcon />
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <LiquidGlass radius={999} refract={false} className="flex">
                  <a
                    href="#services"
                    className="flex min-h-[52px] items-center px-6 text-sm font-medium text-bone/90"
                  >
                    See what we do
                  </a>
                </LiquidGlass>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            style={reduced ? undefined : { y: phoneY, rotate: phoneRotate }}
            className="relative flex justify-center"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(196,181,240,0.28), rgba(159,180,217,0.12) 40%, transparent 70%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 22, scale: 0.9 }}
              animate={ready ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : undefined}
              transition={{ duration: 1.7, ease: EASE, delay: 0.5 }}
              style={{ transformPerspective: 1200 }}
              className="relative"
            >
              <PhoneMockup />
              <FloatingChip label="Post scheduled" kind="calendar" className="-left-36 top-[30%]" delay={0} ready={ready} />
              <FloatingChip label="New reel edited" kind="reel" className="-right-32 top-[56%]" delay={1} ready={ready} />
              <FloatingChip label="Content plan ready" kind="plan" className="-left-28 bottom-6" delay={2} ready={ready} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-bone/40"
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
      </motion.div>

      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-midnight"
          style={{ opacity: dim }}
        />
      )}
    </section>
  );
}
