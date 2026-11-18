"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import LiquidGlass from "./LiquidGlass";
import SplitChars from "./SplitChars";
import { CalendarIcon, GrowthIcon, PlayIcon } from "./ServiceIcons";

const services = [
  {
    id: "management",
    title: "Management",
    summary:
      "We run your accounts day to day so they stay active, on brand and on time.",
    pills: ["Content calendar", "Comments and DMs", "Monthly recap"],
    Icon: CalendarIcon,
    image: "/feed/collage-1.jpg",
  },
  {
    id: "content",
    title: "Content",
    summary:
      "Reels, TikToks, carousels and stories made to look and sound like your brand.",
    pills: ["Short-form video", "Carousel design", "Captions in your voice"],
    Icon: PlayIcon,
    image: "/feed/collage-3.jpg",
  },
  {
    id: "strategy",
    title: "Strategy",
    summary: "A clear plan for what to post, where to post it and why.",
    pills: ["Account audit", "Content pillars", "Growth plan"],
    Icon: GrowthIcon,
    image: "/feed/collage-2.jpg",
  },
];

type Service = (typeof services)[number];

function Details({ service }: { service: Service }) {
  return (
    <>
      <h3 className="font-display text-4xl">{service.title}</h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/80">{service.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {service.pills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-bone/25 bg-bone/10 px-3 py-1.5 text-xs text-bone/90"
          >
            {pill}
          </span>
        ))}
      </div>
    </>
  );
}

function CardChrome({ service, index, active }: { service: Service; index: number; active: boolean }) {
  return (
    <div className="flex items-start justify-between">
      <LiquidGlass
        radius={999}
        bezel={12}
        strength={26}
        sheen={false}
        className="flex h-16 w-16 items-center justify-center text-bone [&_svg]:h-9 [&_svg]:w-9"
      >
        <service.Icon active={active} />
      </LiquidGlass>
      <LiquidGlass
        radius={999}
        refract={false}
        sheen={false}
        className="px-3 py-1.5 font-display text-lg text-bone/90"
      >
        0{index + 1}
      </LiquidGlass>
    </div>
  );
}

function Photo({ src, active }: { src: string; active: boolean }) {
  return (
    <>
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        animate={{ scale: active ? 1.02 : 1.14, filter: active ? "saturate(1.05)" : "saturate(0.7)" }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,17,21,0.35) 0%, rgba(15,17,21,0.05) 35%, rgba(15,17,21,0.15) 60%, rgba(15,17,21,0.75) 100%)",
        }}
      />
    </>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" data-nav-theme="light" className="bg-bone px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-light">
              What we do
            </p>
            <h2 className="font-display text-[12vw] sm:text-[56px] md:text-[68px]">
              <SplitChars text="Three ways we keep your feed alive." inView stagger={0.014} />
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-light">
            Pick one, or hand us all three. Hover a card to see what&apos;s inside.
          </p>
        </div>

        <div className="hidden h-[620px] gap-4 md:flex">
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={service.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={isActive}
                initial={{ clipPath: "inset(100% 0% 0% 0% round 36px)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0% round 36px)" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                animate={{ flexGrow: isActive ? 2.6 : 1 }}
                transition={{
                  flexGrow: { duration: 0.9, ease: EASE },
                  clipPath: { duration: 1.3, ease: EASE, delay: i * 0.12 },
                }}
                className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-[36px] p-6 text-left text-bone"
              >
                <Photo src={service.image} active={isActive} />

                <div className="relative flex h-full flex-col">
                  <CardChrome service={service} index={i} active={isActive} />

                  <div className="mt-auto">
                    <AnimatePresence mode="wait" initial={false}>
                      {isActive ? (
                        <motion.div
                          key="panel"
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 24 }}
                          transition={{ duration: 0.7, ease: EASE }}
                        >
                          <LiquidGlass
                            radius={26}
                            bezel={20}
                            strength={52}
                            blur={6}
                            tint="rgba(15,17,21,0.18)"
                            className="p-6"
                          >
                            <Details service={service} />
                          </LiquidGlass>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="title"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="font-display text-4xl"
                        >
                          {service.title}
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 md:hidden">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ clipPath: "inset(100% 0% 0% 0% round 30px)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% round 30px)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.2, ease: EASE }}
              className="relative flex min-h-[460px] flex-col overflow-hidden rounded-[30px] p-5 text-bone"
            >
              <Photo src={service.image} active />
              <div className="relative flex flex-1 flex-col">
                <CardChrome service={service} index={i} active />
                <LiquidGlass
                  radius={22}
                  refract={false}
                  tint="rgba(15,17,21,0.28)"
                  className="mt-auto p-5"
                >
                  <Details service={service} />
                </LiquidGlass>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
