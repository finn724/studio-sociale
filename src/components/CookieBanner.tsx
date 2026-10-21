"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useCookieConsent } from "@/lib/cookie-consent";

export default function CookieBanner() {
  const { choice, setChoice } = useCookieConsent();

  return (
    <AnimatePresence>
      {choice === null && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="glass fixed inset-x-4 bottom-4 z-[150] mx-auto flex max-w-xl flex-col gap-4 rounded-panel p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm leading-relaxed text-ink/80">
            We use essential cookies to run this site, and would like your
            permission for analytics cookies to understand how it&apos;s
            used. Read our{" "}
            <Link href="/privacy" className="underline hover:text-ink">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setChoice("necessary-only")}
              className="min-h-11 rounded-full border border-ink/20 px-4 text-sm font-medium text-ink/80 transition-colors hover:border-ink/40"
            >
              Necessary only
            </button>
            <button
              type="button"
              onClick={() => setChoice("accepted")}
              className="min-h-11 rounded-full bg-ink px-5 text-sm font-medium text-bone transition-transform hover:scale-[1.03]"
              style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
            >
              Accept all
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
