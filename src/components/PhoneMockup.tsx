"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import LiquidGlass from "./LiquidGlass";

const posts = Array.from({ length: 8 }, (_, i) => i);

function PostTile({ index }: { index: number }) {
  return (
    <div className="aspect-square overflow-hidden rounded-lg bg-midnight/40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/feed/post-${index + 1}.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function PhoneMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
        }}
        className="relative mx-auto w-[260px] sm:w-[290px]"
      >
        <LiquidGlass
          radius={46}
          bezel={22}
          strength={46}
          aberration
          className="overflow-hidden p-3"
        >
        <div className="relative overflow-hidden rounded-[34px] bg-midnight">
          {!reduced && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 z-10 w-1/2 -skew-x-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              }}
              initial={{ left: "-60%" }}
              animate={{ left: ["-60%", "130%"] }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
            />
          )}
          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{ background: "var(--bone)" }}
              >
                <span className="flex items-center gap-[1.5px] font-serif text-[13px] leading-none text-midnight">
                  <span>S</span>
                  <span className="mx-px h-[9px] w-px bg-midnight/60" />
                  <span>S</span>
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="font-display text-base leading-tight text-bone">
                  Studio Socialé
                </span>
                <span className="text-[11px] text-bone/40">
                  @studiosocialeofficial
                </span>
              </div>
            </div>
            <div className="flex justify-between text-center">
              {["128", "24.6k", "412"].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-xs font-semibold text-bone">
                    {stat}
                  </span>
                  <span className="text-[9px] uppercase tracking-wide text-bone/40">
                    {["posts", "followers", "following"][i]}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-9 w-full rounded-full bg-bone/10" />
          </div>

          <div className="h-[300px] overflow-hidden">
            <motion.div
              className="grid grid-cols-2 gap-1 px-1"
              animate={reduced ? undefined : { y: ["0%", "-50%"] }}
              transition={{
                duration: 14,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...posts, ...posts].map((p, i) => (
                <PostTile key={i} index={p} />
              ))}
            </motion.div>
          </div>
        </div>
        </LiquidGlass>
      </motion.div>
    </div>
  );
}
