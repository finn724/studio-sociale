"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import FadeIn from "./FadeIn";
import { CalendarIcon, GrowthIcon, PlayIcon } from "./ServiceIcons";

const services = [
  {
    id: "management",
    title: "Management",
    summary:
      "We run your accounts day to day so they stay active, on brand and on time.",
    pills: ["Content calendar", "Comments and DMs", "Monthly recap"],
    Icon: CalendarIcon,
  },
  {
    id: "content",
    title: "Content",
    summary:
      "Reels, TikToks, carousels and stories made to look and sound like your brand.",
    pills: ["Short-form video", "Carousel design", "Captions in your voice"],
    Icon: PlayIcon,
  },
  {
    id: "strategy",
    title: "Strategy",
    summary:
      "A clear plan for what to post, where to post it and why.",
    pills: ["Account audit", "Content pillars", "Growth plan"],
    Icon: GrowthIcon,
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  return (
    <section id="services" className="bg-bone px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn className="mb-16 max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-light">
            What we do
          </p>
          <h2 className="font-display text-[12vw] sm:text-[56px] md:text-[64px]">
            Three ways we keep your feed alive.
          </h2>
        </FadeIn>

        <FadeIn
          className="hidden h-[560px] gap-4 md:flex"
          delay={0.1}
        >
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={service.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                animate={{ flexGrow: isActive ? 2.4 : 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-panel p-8 text-left"
                style={{
                  background: isActive ? "var(--midnight)" : "var(--stone)",
                  color: isActive ? "var(--bone)" : "var(--ink)",
                  transition: "background 0.8s cubic-bezier(.16,1,.3,1), color 0.8s cubic-bezier(.16,1,.3,1)",
                }}
              >
                <div className="flex items-start justify-between">
                  <span
                    style={{ color: isActive ? "var(--mist)" : "currentColor" }}
                  >
                    <service.Icon active={isActive} />
                  </span>
                  <span className="font-display text-2xl opacity-40">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-display mt-10 text-3xl sm:text-4xl">
                  {service.title}
                </h3>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="mt-6 flex flex-1 flex-col justify-between"
                    >
                      <p className="max-w-xs text-sm leading-relaxed text-bone/70">
                        {service.summary}
                      </p>
                      <div className="mt-8 flex flex-wrap gap-2">
                        {service.pills.map((pill) => (
                          <span
                            key={pill}
                            className="rounded-full border border-bone/20 px-3 py-1.5 text-xs text-bone/80"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </FadeIn>

        <div className="flex flex-col gap-3 md:hidden">
          {services.map((service, i) => {
            const isOpen = openMobile === i;
            return (
              <div
                key={service.id}
                className="overflow-hidden rounded-panel"
                style={{
                  background: isOpen ? "var(--midnight)" : "var(--stone)",
                  color: isOpen ? "var(--bone)" : "var(--ink)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenMobile(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <service.Icon active={isOpen} />
                    <span className="font-display text-2xl">
                      {service.title}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="text-xl"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-sm leading-relaxed text-bone/70">
                          {service.summary}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {service.pills.map((pill) => (
                            <span
                              key={pill}
                              className="rounded-full border border-bone/20 px-3 py-1.5 text-xs text-bone/80"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
