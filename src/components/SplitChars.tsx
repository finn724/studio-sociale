"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const hidden = { y: "100%", rotateX: -80, opacity: 0, filter: "blur(10px)" };
const shown = { y: "0%", rotateX: 0, opacity: 1, filter: "blur(0px)" };

type SplitCharsProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
  inView?: boolean;
};

export default function SplitChars({
  text,
  className = "",
  delay = 0,
  stagger = 0.028,
  play = false,
  inView = false,
}: SplitCharsProps) {
  const words = text.split(" ").map((word) => Array.from(word));
  const offsets = words.map((_, i) =>
    words.slice(0, i).reduce((sum, chars) => sum + chars.length, 0)
  );

  return (
    <span className={className} style={{ perspective: 900 }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((chars, wi) => (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {chars.map((char, ci) => {
                const transition = {
                  duration: 1.15,
                  ease: EASE,
                  delay: delay + (offsets[wi] + ci) * stagger,
                };
                const reveal = inView
                  ? {
                      whileInView: shown,
                      viewport: { once: true, margin: "-8% 0px -8% 0px" },
                    }
                  : { animate: play ? shown : hidden };
                return (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    style={{ transformOrigin: "50% 100%" }}
                    initial={hidden}
                    transition={transition}
                    {...reveal}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
            {wi < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
