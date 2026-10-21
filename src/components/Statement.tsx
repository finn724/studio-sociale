"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "./FadeIn";

gsap.registerPlugin(ScrollTrigger);

const statement =
  "Your brand is already on social media. The question is, are you using it right?";

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = statement.split(" ");

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !containerRef.current) return;

    const targets = wordsRef.current.filter(
      (el): el is HTMLSpanElement => el !== null
    );

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0.12 });
      gsap.to(targets, {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-bone px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div
          ref={containerRef}
          className="font-display max-w-4xl text-[9vw] sm:text-[52px] md:text-[64px] lg:text-[72px]"
        >
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="mr-[0.22em] inline-block text-ink"
            >
              {word}
            </span>
          ))}
        </div>

        <div className="mt-16 flex justify-end">
          <div className="flex max-w-md flex-col gap-6 text-right">
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
