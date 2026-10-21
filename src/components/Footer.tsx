"use client";

import Link from "next/link";

export default function Footer() {
  function scrollToTop(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <footer className="overflow-hidden bg-bone px-6 pb-10 pt-20 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <h2
          className="shimmer-text font-display w-full text-center leading-[0.85]"
          style={{ fontSize: "clamp(3.2rem, 13vw, 11rem)" }}
        >
          Studio Socialé
        </h2>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-ink/10 pt-8 text-sm text-muted-light sm:flex-row">
          <p>Social media marketing</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms of service
            </Link>
            <a
              href="#top"
              onClick={scrollToTop}
              className="transition-colors hover:text-ink"
              style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
