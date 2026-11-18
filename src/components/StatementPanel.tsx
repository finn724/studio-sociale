"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import FadeIn from "./FadeIn";
import BlobField from "./BlobField";
import LiquidGlass from "./LiquidGlass";
import SplitChars from "./SplitChars";
import { EASE } from "@/lib/motion";

const cards = [
  { src: "/feed/collage-2.jpg", className: "left-0 top-6 w-[54%]", travel: 90, spin: [-9, -3] },
  { src: "/feed/collage-3.jpg", className: "right-0 top-0 w-[47%]", travel: 170, spin: [7, 2] },
  { src: "/feed/collage-1.jpg", className: "left-[20%] bottom-0 w-[48%]", travel: 50, spin: [-5, 3] },
];

function CollageCard({
  card,
  index,
  progress,
}: {
  card: (typeof cards)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const y = useTransform(progress, [0, 1], [card.travel, -card.travel]);
  const rotate = useTransform(progress, [0, 1], card.spin);

  return (
    <motion.div
      className={`absolute ${card.className}`}
      style={reduced ? { rotate: card.spin[1] } : { y, rotate }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.1 + index * 0.12 }}
      >
        <LiquidGlass radius={26} bezel={16} strength={40} className="p-2">
          <div className="aspect-[3/4] overflow-hidden rounded-[18px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </LiquidGlass>
      </motion.div>
    </motion.div>
  );
}

export default function StatementPanel() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative overflow-hidden bg-midnight px-6 py-28 text-bone sm:px-10 sm:py-40"
    >
      <BlobField />

      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <FadeIn>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
              We&apos;re a social media team.
            </p>
          </FadeIn>
          <h2 className="font-display text-[11vw] sm:text-[58px] md:text-[72px] lg:text-[84px]">
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <motion.span
                className="shimmer-text block"
                initial={{ y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.3, ease: EASE }}
              >
                Grow your business.
              </motion.span>
            </span>
            <SplitChars
              text="We'll handle the editing."
              inView
              delay={0.3}
              stagger={0.02}
              className="block"
            />
          </h2>
          <FadeIn delay={0.16}>
            <p className="mt-10 max-w-lg text-base leading-relaxed text-bone/60 sm:text-lg">
              Hand us the camera roll, the brand book and the to-do list. We
              turn them into a feed that looks intentional, posts on time and
              sounds like you.
            </p>
          </FadeIn>
        </div>

        <div className="relative hidden h-[540px] lg:block">
          {cards.map((card, i) => (
            <CollageCard key={card.src} card={card} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
