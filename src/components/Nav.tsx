"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
];

function Monogram() {
  return (
    <span className="flex items-center gap-[2px] font-serif text-[22px] leading-none text-ink">
      <span>S</span>
      <span className="mx-[2px] h-[16px] w-px bg-ink/50" />
      <span>S</span>
    </span>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="flex w-full max-w-[900px] items-center justify-between rounded-full px-5 py-2.5 transition-[background,box-shadow,border-color] duration-500"
        style={{
          background: scrolled
            ? "rgba(239,236,230,0.78)"
            : "rgba(239,236,230,0.1)",
          backdropFilter: "blur(20px) saturate(1.7)",
          WebkitBackdropFilter: "blur(20px) saturate(1.7)",
          border: scrolled
            ? "1px solid rgba(159,180,217,0.5)"
            : "1px solid rgba(159,180,217,0.3)",
          boxShadow: scrolled
            ? "0 12px 40px rgba(15,17,21,0.16)"
            : "0 6px 24px rgba(15,17,21,0.06)",
        }}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="Studio Socialé home"
        >
          <Monogram />
          <span className="hidden text-[11px] font-semibold tracking-[0.18em] text-ink sm:inline">
            STUDIO SOCIALÉ
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-ink/80 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bone transition-transform hover:scale-[1.03]"
            style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
          >
            Book a call
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full md:hidden"
        >
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <motion.span
              className="h-px w-full bg-ink"
              animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
            <motion.span
              className="h-px w-full bg-ink"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="h-px w-full bg-ink"
              animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="glass fixed inset-x-4 top-[76px] z-[99] flex flex-col gap-1 rounded-[28px] p-4 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3 text-base text-ink/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-1 rounded-2xl bg-ink px-4 py-3 text-center text-base font-medium text-bone"
            >
              Book a call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
