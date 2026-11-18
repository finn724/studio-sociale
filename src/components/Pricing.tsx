"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { EASE } from "@/lib/motion";
import LiquidBackground from "./LiquidBackground";
import LiquidGlass from "./LiquidGlass";
import Magnetic from "./Magnetic";
import SplitChars from "./SplitChars";

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured: boolean;
};

const tiers: Tier[] = [
  {
    name: "Package name",
    price: "$XXX",
    period: "/mo",
    description: "Placeholder tier — swap in your real package name, price and inclusions.",
    features: ["Deliverable one", "Deliverable two", "Deliverable three"],
    featured: false,
  },
  {
    name: "Package name",
    price: "$XXX",
    period: "/mo",
    description: "Placeholder tier — swap in your real package name, price and inclusions.",
    features: ["Deliverable one", "Deliverable two", "Deliverable three", "Deliverable four"],
    featured: true,
  },
  {
    name: "Package name",
    price: "$XXX",
    period: "/mo",
    description: "Placeholder tier — swap in your real package name, price and inclusions.",
    features: [
      "Deliverable one",
      "Deliverable two",
      "Deliverable three",
      "Deliverable four",
      "Deliverable five",
    ],
    featured: false,
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path
        d="M3 8.5L6 11.5L13 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Tilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const spring = { stiffness: 160, damping: 18, mass: 0.5 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-midnight px-6 pb-28 pt-40 text-bone sm:px-10 sm:pb-36 sm:pt-48"
    >
      <LiquidBackground intensity={0.9} />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-bone/50"
            >
              Pricing
            </motion.p>
            <h1 className="font-display text-[13vw] sm:text-[64px] md:text-[80px]">
              <SplitChars text="Plans for every stage of growth." inView stagger={0.016} delay={0.2} />
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
            className="max-w-xs text-sm leading-relaxed text-bone/55"
          >
            Not sure which plan fits? Book a call and we&apos;ll help you
            pick the right one.
          </motion.p>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={`${tier.name}-${i}`}
              initial={{ opacity: 0, y: 80, rotateX: 14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.15 + i * 0.12 }}
              style={{ transformPerspective: 1200 }}
              className={tier.featured ? "md:-translate-y-6" : ""}
            >
              <Tilt>
                <LiquidGlass
                  radius={34}
                  bezel={24}
                  strength={56}
                  blur={tier.featured ? 10 : 6}
                  tint={tier.featured ? "rgba(239,236,230,0.12)" : "rgba(239,236,230,0.05)"}
                  className="flex h-full flex-col p-8 sm:p-9"
                >
                  {tier.featured && <span aria-hidden className="glow-ring" />}

                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl">{tier.name}</h2>
                    {tier.featured && (
                      <span className="rounded-full bg-bone px-3 py-1 text-xs font-medium text-ink">
                        Most popular
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-display text-6xl">{tier.price}</span>
                    <span className="text-sm text-bone/50">{tier.period}</span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-bone/65">{tier.description}</p>

                  <span aria-hidden className="my-7 h-px w-full bg-gradient-to-r from-bone/0 via-bone/25 to-bone/0" />

                  <ul className="flex flex-1 flex-col gap-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-bone/85">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mist/20 text-mist">
                          <CheckIcon />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Magnetic strength={0.15} className="mt-9 w-full">
                    <a
                      href="#contact"
                      className={`flex min-h-12 w-full items-center justify-center rounded-full text-sm font-medium transition-[transform,background] duration-500 hover:scale-[1.02] ${
                        tier.featured
                          ? "bg-bone text-ink shadow-[0_10px_40px_-10px_rgba(196,181,240,0.7)]"
                          : "border border-bone/25 bg-bone/5 text-bone hover:bg-bone/12"
                      }`}
                    >
                      Get started
                    </a>
                  </Magnetic>
                </LiquidGlass>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
