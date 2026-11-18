"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "./FadeIn";
import GlassLens from "./GlassLens";

gsap.registerPlugin(ScrollTrigger);

const statement =
  "Your brand is already on social media. The question is, are you using it right?";

const accent = new Set(["social", "media.", "right?"]);

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = statement.split(" ");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !containerRef.current) return;

    const targets = wordsRef.current.filter((el): el is HTMLSpanElement => el !== null);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0.1, filter: "blur(8px)", y: 14 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section data-nav-theme="light" className="relative bg-bone px-6 pb-8 pt-28 sm:px-10 sm:pb-10 sm:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted-light">
          The honest question
        </p>
        <div ref={containerRef} className="relative">
          <h2 className="font-display relative max-w-5xl text-[10vw] sm:text-[56px] md:text-[72px] lg:text-[88px]">
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                className={`mr-[0.22em] inline-block ${
                  accent.has(word.toLowerCase()) ? "italic text-[#6f7fa3]" : "text-ink"
                }`}
              >
                {word}
              </span>
            ))}
          </h2>
          <GlassLens containerRef={containerRef} />
        </div>

        <div className="mt-20 flex justify-end">
          <div className="flex max-w-md flex-col gap-6 border-l border-ink/10 pl-8">
            <FadeIn>
              <p className="text-base leading-relaxed text-muted-light sm:text-lg">
                Social media isn&apos;t just for fun. It&apos;s the most
                powerful marketing tool your brand has, and it works best
                when someone treats it like a full-time job.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-base leading-relaxed text-muted-light sm:text-lg">
                That&apos;s us. You keep running your business; we plan,
                shoot, edit, post and reply so your accounts never go quiet.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
