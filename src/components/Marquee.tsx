"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const primary = ["Management", "Reels", "TikToks", "Carousels", "Captions", "Strategy", "Community"];
const secondary = ["Content calendars", "Shoots", "Editing", "Growth plans", "Comments & DMs", "Monthly recaps"];

function Track({ words, variant }: { words: string[]; variant: "a" | "b" }) {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden>
      {words.map((word, i) => (
        <span key={word} className="flex items-center gap-10">
          <span
            className={
              variant === "a"
                ? `font-display text-[56px] text-ink sm:text-[76px] md:text-[96px] ${i % 2 ? "stroke-text" : ""}`
                : "font-display text-[34px] italic text-muted-light sm:text-[44px] md:text-[52px]"
            }
          >
            {word}
          </span>
          <span
            className={`inline-block bg-gradient-to-br from-mist via-lilac to-champagne bg-clip-text text-transparent ${
              variant === "a" ? "text-[32px] sm:text-[44px]" : "text-[22px]"
            }`}
          >
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const skewRef = useRef<HTMLDivElement>(null);
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const a = rowA.current;
    const b = rowB.current;
    const skewEl = skewRef.current;
    if (reduced || !a || !b || !skewEl) return;

    let widthA = a.scrollWidth / 2;
    let widthB = b.scrollWidth / 2;
    let xA = 0;
    let xB = -widthB;
    let skew = 0;
    let lastY = window.scrollY;

    const onResize = () => {
      widthA = a.scrollWidth / 2;
      widthB = b.scrollWidth / 2;
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      const y = window.scrollY;
      const velocity = y - lastY;
      lastY = y;

      const boost = Math.min(Math.abs(velocity) * 0.14, 9);
      xA -= 0.6 + boost;
      xB += 0.45 + boost * 0.8;
      if (xA <= -widthA) xA += widthA;
      if (xB >= 0) xB -= widthB;

      const targetSkew = Math.max(-12, Math.min(12, velocity * 0.35));
      skew += (targetSkew - skew) * 0.12;

      a.style.transform = `translate3d(${xA}px,0,0)`;
      b.style.transform = `translate3d(${xB}px,0,0)`;
      skewEl.style.transform = `skewX(${-skew}deg)`;
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      data-nav-theme="light"
      aria-label="What we make"
      className="relative z-10 -mt-12 overflow-hidden rounded-t-[44px] bg-bone py-12 shadow-[0_-40px_80px_-30px_rgba(8,9,12,0.65)]"
    >
      <div ref={skewRef} className="flex flex-col gap-3 will-change-transform">
        <div ref={rowA} className="flex w-max will-change-transform">
          <Track words={primary} variant="a" />
          <Track words={primary} variant="a" />
        </div>
        <div ref={rowB} className="flex w-max will-change-transform">
          <Track words={secondary} variant="b" />
          <Track words={secondary} variant="b" />
        </div>
      </div>
      <span className="sr-only">
        Management, reels, TikToks, carousels, captions, strategy and community.
      </span>
    </section>
  );
}
