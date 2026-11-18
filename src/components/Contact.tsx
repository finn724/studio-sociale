"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import FadeIn from "./FadeIn";
import ContactForm from "./ContactForm";
import LiquidBackground from "./LiquidBackground";
import LiquidGlass from "./LiquidGlass";
import Magnetic from "./Magnetic";
import SplitChars from "./SplitChars";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16.5 3v9.8a3.9 3.9 0 11-3-3.8V13a1.1 1.1 0 100 .01M16.5 3a5 5 0 004.5 4.3V11a8 8 0 01-4.5-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const socials = [
  { href: "https://www.instagram.com/studiosocialeofficial", label: "@studiosocialeofficial", Icon: InstagramIcon },
  { href: "https://www.tiktok.com/@studio.sociale", label: "@studio.sociale", Icon: TikTokIcon },
];

export default function Contact() {
  return (
    <section
      id="contact"
      data-nav-theme="dark"
      className="relative z-10 -mt-12 overflow-hidden rounded-t-[44px] border-t border-bone/10 bg-midnight px-6 pb-28 pt-36 text-bone shadow-[0_-40px_80px_-30px_rgba(8,9,12,0.5)] sm:px-10 sm:pb-36 sm:pt-44"
    >
      <LiquidBackground intensity={0.85} />

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-[12vw] sm:text-[64px] md:text-[80px]">
            <SplitChars text="Let's build your" inView stagger={0.022} />{" "}
            <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
              <motion.span
                className="shimmer-text inline-block italic"
                initial={{ y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.45 }}
              >
                feed.
              </motion.span>
            </span>
          </h2>
          <FadeIn delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-bone/60 sm:text-lg">
              Tell us about your business and what you need. Prefer DMs?
              We&apos;re there too.
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map(({ href, label, Icon }) => (
                <Magnetic key={href} strength={0.2}>
                  <LiquidGlass radius={999} refract={false} className="flex">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-2 px-5 text-sm text-bone/85 transition-colors hover:text-bone"
                    >
                      <Icon />
                      {label}
                    </a>
                  </LiquidGlass>
                </Magnetic>
              ))}
            </div>
          </FadeIn>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
        >
          <LiquidGlass
            radius={36}
            bezel={26}
            strength={50}
            blur={12}
            tint="rgba(15,17,21,0.28)"
          >
            <ContactForm />
          </LiquidGlass>
        </motion.div>
      </div>
    </section>
  );
}
