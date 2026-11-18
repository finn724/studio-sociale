"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { markIntroDone } from "@/lib/intro";
import { INTRO_SEEN_KEY } from "@/lib/intro-script";

const CURTAIN = [0.76, 0, 0.24, 1] as const;
const noopSubscribe = () => () => {};
const readSkip = () => document.documentElement.dataset.intro === "skip";

export default function Preloader() {
  const skip = useSyncExternalStore(noopSubscribe, readSkip, () => false);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (skip) {
      markIntroDone();
      return;
    }
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {}

    const root = document.documentElement;
    root.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setLeaving(true);
      markIntroDone();
      root.style.overflow = "";
    }, 1750);

    return () => {
      clearTimeout(timer);
      root.style.overflow = "";
    };
  }, [skip]);

  if (skip || gone) return null;

  return (
    <motion.div
      aria-hidden
      className="preloader fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-midnight text-bone"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{ clipPath: leaving ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.15, ease: CURTAIN }}
      onAnimationComplete={() => {
        if (leaving) setGone(true);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(520px circle at 50% 50%, rgba(196,181,240,0.18), transparent 70%)",
        }}
      />

      <motion.div
        className="relative flex flex-col items-center gap-7"
        animate={leaving ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: CURTAIN }}
      >
        <div className="flex items-center font-serif text-[92px] leading-none sm:text-[128px]">
          <motion.span
            initial={{ x: -60, opacity: 0, filter: "blur(14px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          >
            S
          </motion.span>
          <motion.span
            className="mx-5 block h-[92px] w-px bg-bone/60 sm:h-[128px]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, ease: EASE }}
          />
          <motion.span
            initial={{ x: 60, opacity: 0, filter: "blur(14px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          >
            S
          </motion.span>
        </div>
        <motion.p
          className="pl-[0.55em] text-[11px] uppercase text-bone/60"
          initial={{ opacity: 0, letterSpacing: "0.15em" }}
          animate={{ opacity: 1, letterSpacing: "0.55em" }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.45 }}
        >
          Studio Socialé
        </motion.p>
        <motion.span
          className="h-px w-40 origin-left bg-gradient-to-r from-mist via-lilac to-champagne"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}
