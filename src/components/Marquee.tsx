"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const words = [
  { text: "Management", outline: false },
  { text: "Reels", outline: true },
  { text: "TikToks", outline: false },
  { text: "Carousels", outline: true },
  { text: "Captions", outline: false },
  { text: "Strategy", outline: true },
  { text: "Community", outline: false },
  { text: "✦", outline: false },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {words.map((word, i) => (
        <span
          key={i}
          className={`font-display text-[56px] sm:text-[72px] md:text-[88px] ${
            word.outline ? "stroke-text text-ink" : "text-ink"
          }`}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !trackRef.current) return;

    lastScrollY.current = window.scrollY;
    const baseSpeed = 0.55;
    let trackWidth = trackRef.current.scrollWidth / 2;

    const onResize = () => {
      if (trackRef.current) trackWidth = trackRef.current.scrollWidth / 2;
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      const currentScrollY = window.scrollY;
      const velocity = Math.min(
        Math.abs(currentScrollY - lastScrollY.current) * 0.08,
        6
      );
      lastScrollY.current = currentScrollY;

      xRef.current -= baseSpeed + velocity;
      if (xRef.current <= -trackWidth) xRef.current += trackWidth;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${xRef.current}px)`;
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-bone py-8">
      <div ref={trackRef} className="flex w-max will-change-transform">
        <Track />
        <Track />
      </div>
    </div>
  );
}
