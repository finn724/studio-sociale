"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import LiquidGlass from "./LiquidGlass";
import Magnetic from "./Magnetic";

export default function Footer() {
  function scrollToTop(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.__lenis && !reduced) {
      window.__lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }
  }

  return (
    <footer data-nav-theme="light" className="overflow-hidden bg-bone px-6 pb-10 pt-24 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="overflow-hidden pb-[0.06em]">
          <motion.h2
            className="shimmer-text font-display w-full text-center leading-[0.85]"
            style={{ fontSize: "clamp(3.2rem, 13vw, 11rem)" }}
            initial={{ y: "100%", clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ y: "0%", clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 1.5, ease: EASE }}
          >
            Studio Socialé
          </motion.h2>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-ink/10 pt-8 text-sm text-muted-light sm:flex-row">
          <p>Social media marketing</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms of service
            </Link>
            <Magnetic strength={0.3}>
              <LiquidGlass radius={999} tone="light" refract={false} className="flex">
                <a
                  href="#top"
                  onClick={scrollToTop}
                  className="flex min-h-10 items-center gap-2 px-4 text-ink/80 transition-colors hover:text-ink"
                >
                  Back to top
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M6 10V2M6 2L2.5 5.5M6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </LiquidGlass>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
