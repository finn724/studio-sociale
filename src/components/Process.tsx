"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlobField from "./BlobField";
import FadeIn from "./FadeIn";
import LiquidGlass from "./LiquidGlass";
import SplitChars from "./SplitChars";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discovery call",
    description: "We learn your brand, your audience and what isn't working yet.",
    icon: (
      <path d="M8 6.5C8 5.7 8.7 5 9.5 5h3l1.5 4-2 1.5a10 10 0 005.5 5.5l1.5-2 4 1.5v3c0 .8-.7 1.5-1.5 1.5A16.5 16.5 0 018 6.5z" />
    ),
  },
  {
    title: "Strategy",
    description: "An audit and a plan: content pillars, platforms and posting rhythm.",
    icon: (
      <>
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="5.5" />
        <circle cx="16" cy="16" r="1.4" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Content",
    description: "We shoot, edit, design and write. You approve before anything goes live.",
    icon: (
      <>
        <rect x="5" y="9" width="22" height="16" rx="3" />
        <path d="M12 9l1.5-3h5L20 9" />
        <circle cx="16" cy="17" r="4.5" />
      </>
    ),
  },
  {
    title: "Post and refine",
    description: "We publish, manage the community and adjust every month from what performs.",
    icon: (
      <>
        <path d="M5 23l6-7 5 4 9-11" />
        <path d="M19 9h6v6" />
      </>
    ),
  },
];

function StepIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function StepCard({ step, index, refract = true }: { step: (typeof steps)[number]; index: number; refract?: boolean }) {
  return (
    <LiquidGlass
      tone="light"
      radius={34}
      bezel={24}
      strength={58}
      blur={8}
      refract={refract}
      className="flex h-full flex-col justify-between p-8 text-ink sm:p-9"
    >
      <div className="flex items-start justify-between">
        <span
          className="stroke-text font-display text-[96px] leading-[0.8] sm:text-[120px]"
          style={{ ["--stroke-color" as string]: "rgba(22,24,29,0.35)" }}
        >
          0{index + 1}
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-bone">
          <StepIcon>{step.icon}</StepIcon>
        </span>
      </div>
      <div>
        <h3 className="font-display text-4xl">{step.title}</h3>
        <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-muted-light">
          {step.description}
        </p>
      </div>
    </LiquidGlass>
  );
}

export default function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            if (countRef.current) {
              const current = Math.min(steps.length, Math.floor(self.progress * steps.length) + 1);
              countRef.current.textContent = String(current).padStart(2, "0");
            }
          },
        },
      });

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { rotateY: -28, scale: 0.84, y: 40 },
          {
            rotateY: 0,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 100%",
              end: "left 55%",
              scrub: true,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  const header = (
    <>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-light">
        How it works
      </p>
      <h2 className="font-display text-[12vw] sm:text-[56px] lg:text-[72px]">
        <SplitChars text="Four steps, zero guesswork." inView stagger={0.018} />
      </h2>
    </>
  );

  return (
    <section id="process" data-nav-theme="light" className="relative overflow-hidden bg-bone">
      <div ref={pinRef} className="relative hidden h-screen overflow-hidden lg:motion-safe:block">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <BlobField />
        </div>

        <div className="absolute left-10 top-1/2 z-0 w-[34vw] max-w-[480px] -translate-y-1/2 xl:left-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]">
          {header}
          <div className="mt-12 flex items-center gap-5">
            <span className="font-display text-3xl tabular-nums">
              <span ref={countRef}>01</span>
              <span className="text-ink/30"> / 0{steps.length}</span>
            </span>
            <span className="relative h-px w-40 overflow-hidden bg-ink/15">
              <span
                ref={barRef}
                className="absolute inset-0 origin-left bg-gradient-to-r from-mist via-lilac to-champagne"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </div>
        </div>

        <div className="relative z-10 flex h-full items-center">
          <div
            ref={trackRef}
            className="flex gap-8 pl-[46vw] pr-[8vw] will-change-transform"
            style={{ perspective: 1400 }}
          >
            {steps.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="h-[min(480px,60vh)] w-[400px] shrink-0"
              >
                <StepCard step={step} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative hidden px-10 py-36 lg:motion-reduce:block">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-xl">{header}</div>
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="h-[440px]">
                <StepCard step={step} index={i} refract={false} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative px-6 py-28 sm:px-10 lg:hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <BlobField />
        </div>
        <div className="relative">
          <div className="mb-14">{header}</div>
          <div className="flex flex-col gap-5">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.06} className="h-[340px]">
                <StepCard step={step} index={i} refract={false} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
