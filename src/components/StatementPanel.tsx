"use client";

import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "./FadeIn";
import BlobField from "./BlobField";
import { EASE } from "@/lib/motion";

const cards = [
  { src: "/feed/collage-2.jpg", rotate: -6, className: "left-0 top-4 w-[55%]" },
  { src: "/feed/collage-3.jpg", rotate: 4, className: "right-0 top-0 w-[48%]" },
  { src: "/feed/collage-1.jpg", rotate: -3, className: "left-[18%] bottom-0 w-[50%]" },
];

function Collage() {
  const reduced = useReducedMotion();

  return (
    <div className="relative hidden h-[420px] lg:block">
      {cards.map((card, i) => (
        <motion.div
          key={card.src}
          className={`glass absolute overflow-hidden rounded-[20px] p-1.5 ${card.className}`}
          style={{ rotate: card.rotate }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.1 }}
        >
          <motion.div
            className="aspect-[3/4] overflow-hidden rounded-xl"
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function StatementPanel() {
  return (
    <section className="relative overflow-hidden bg-midnight px-6 py-28 text-bone sm:px-10 sm:py-40">
      <BlobField variant="single-lilac" />

      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <FadeIn>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
              We&apos;re a social media team.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="font-display text-[11vw] sm:text-[58px] md:text-[72px] lg:text-[80px]">
              <span className="shimmer-text">Grow your business.</span>
              <br />
              We&apos;ll handle the editing.
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-10 max-w-lg text-base leading-relaxed text-bone/60 sm:text-lg">
              Hand us the camera roll, the brand book and the to-do list. We
              turn them into a feed that looks intentional, posts on time and
              sounds like you.
            </p>
          </FadeIn>
        </div>

        <Collage />
      </div>
    </section>
  );
}
