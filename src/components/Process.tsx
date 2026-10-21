"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "./FadeIn";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discovery call",
    description:
      "We learn your brand, your audience and what isn't working yet.",
  },
  {
    title: "Strategy",
    description:
      "An audit and a plan: content pillars, platforms and posting rhythm.",
  },
  {
    title: "Content",
    description:
      "We shoot, edit, design and write. You approve before anything goes live.",
  },
  {
    title: "Post and refine",
    description:
      "We publish, manage the community and adjust every month from what performs.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const scrollTriggerConfig = {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 0.6,
      };

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: scrollTriggerConfig }
        );
      }
      if (mobileLineRef.current) {
        gsap.fromTo(
          mobileLineRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: scrollTriggerConfig }
        );
      }

      const dots = dotsRef.current.filter(
        (el): el is HTMLDivElement => el !== null
      );
      gsap.to(dots, {
        backgroundColor: "var(--midnight)",
        borderColor: "var(--midnight)",
        stagger: 1,
        ease: "none",
        scrollTrigger: scrollTriggerConfig,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-bone px-6 py-28 sm:px-10 sm:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <FadeIn className="mb-20 max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-light">
            How it works
          </p>
          <h2 className="font-display text-[12vw] sm:text-[56px] md:text-[64px]">
            Four steps, zero guesswork.
          </h2>
        </FadeIn>

        <div className="relative hidden md:block">
          <div className="absolute left-0 right-0 top-[11px] h-px bg-ink/10" />
          <div
            ref={lineRef}
            className="absolute left-0 top-[11px] h-px w-full origin-left bg-ink"
          />
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col">
                <div
                  ref={(el) => {
                    dotsRef.current[i] = el;
                  }}
                  className="mb-8 h-6 w-6 rounded-full border-2 border-ink/20 bg-bone"
                  style={{ transition: "background-color 0.3s, border-color 0.3s" }}
                />
                <span className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-light">
                  Step 0{i + 1}
                </span>
                <h3 className="font-display mb-3 text-2xl">{step.title}</h3>
                <p className="max-w-[240px] text-sm leading-relaxed text-muted-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col gap-10 pl-10 md:hidden">
          <div className="absolute bottom-2 left-[11px] top-2 w-px bg-ink/10" />
          <div
            ref={mobileLineRef}
            className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-ink"
          />
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="absolute -left-10 top-1 h-6 w-6 rounded-full border-2 border-ink/20 bg-bone" />
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted-light">
                Step 0{i + 1}
              </span>
              <h3 className="font-display mb-2 text-2xl">{step.title}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
