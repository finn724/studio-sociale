"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useIntroDone } from "@/lib/intro";
import LiquidGlass from "./LiquidGlass";
import Magnetic from "./Magnetic";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
];

type Theme = "dark" | "light";

function Monogram({ theme }: { theme: Theme }) {
  const color = theme === "dark" ? "text-bone" : "text-ink";
  const line = theme === "dark" ? "bg-bone/50" : "bg-ink/50";
  return (
    <span className={`flex items-center gap-[2px] font-serif text-[22px] leading-none transition-colors duration-500 ${color}`}>
      <span>S</span>
      <span className={`mx-[2px] h-[16px] w-px transition-colors duration-500 ${line}`} />
      <span>S</span>
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const introDone = useIntroDone();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
    const update = () => {
      setScrolled(window.scrollY > 24);
      const probe = 44;
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probe && rect.bottom > probe;
      });
      setTheme(current?.dataset.navTheme === "light" ? "light" : "dark");
    };
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dark = theme === "dark";
  const linkIdle = dark ? "text-bone/70" : "text-ink/65";
  const linkActive = dark ? "text-bone" : "text-ink";

  return (
    <header className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
      <motion.div
        className="w-full"
        style={{ maxWidth: scrolled ? 820 : 940, transition: "max-width 0.9s cubic-bezier(.16,1,.3,1)" }}
        initial={{ y: -90, opacity: 0 }}
        animate={introDone ? { y: 0, opacity: 1 } : { y: -90, opacity: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
      >
        <LiquidGlass
          radius={999}
          bezel={16}
          strength={34}
          tone={theme}
          tint={dark ? "rgba(239,236,230,0.06)" : "rgba(255,255,255,0.42)"}
          className="w-full overflow-hidden"
        >
          <nav aria-label="Primary" className="flex items-center justify-between py-2 pl-5 pr-2">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Studio Socialé home">
              <Monogram theme={theme} />
              <span
                className={`hidden text-[11px] font-semibold tracking-[0.18em] transition-colors duration-500 sm:inline ${
                  dark ? "text-bone" : "text-ink"
                }`}
              >
                STUDIO SOCIALÉ
              </span>
            </Link>

            <div className="hidden items-center md:flex" onPointerLeave={() => setHovered(null)}>
              {links.map((link) => {
                const current = link.href === "/pricing" && pathname === "/pricing";
                const lit = hovered ? hovered === link.href : current;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onPointerEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    onBlur={() => setHovered(null)}
                    className="relative rounded-full px-4 py-2 text-sm"
                  >
                    {lit && (
                      <motion.span
                        layoutId="nav-highlight"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: dark ? "rgba(239,236,230,0.14)" : "rgba(22,24,29,0.07)",
                          boxShadow: dark
                            ? "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 18px -6px rgba(159,180,217,0.55)"
                            : "inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 14px -6px rgba(22,24,29,0.25)",
                        }}
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className={`relative transition-colors duration-300 ${lit ? linkActive : linkIdle}`}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
              <Magnetic strength={0.25} className="ml-2">
                <Link
                  href="/#contact"
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-[background,color,transform] duration-500 hover:scale-[1.04] ${
                    dark ? "bg-bone text-ink" : "bg-ink text-bone"
                  }`}
                >
                  Book a call
                </Link>
              </Magnetic>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full md:hidden"
            >
              <span className="relative flex h-4 w-5 flex-col justify-between">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className={`h-px w-full ${dark ? "bg-bone" : "bg-ink"}`}
                    animate={
                      i === 1
                        ? { opacity: open ? 0 : 1 }
                        : { rotate: open ? (i === 0 ? 45 : -45) : 0, y: open ? (i === 0 ? 7 : -7) : 0 }
                    }
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                ))}
              </span>
            </button>
          </nav>

          <motion.span
            aria-hidden
            className="absolute inset-x-8 bottom-0 h-px origin-left"
            style={{
              scaleX: progress,
              background: "linear-gradient(90deg, var(--mist), var(--lilac), var(--champagne))",
            }}
          />
        </LiquidGlass>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-4 top-[84px] z-[99] md:hidden"
          >
            <LiquidGlass
              radius={28}
              tone="light"
              tint="rgba(239,236,230,0.82)"
              refract={false}
              className="flex flex-col gap-1 p-4"
            >
              {[...links, { href: "/#contact", label: "Book a call" }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-base transition-colors ${
                      link.href === "/#contact"
                        ? "mt-1 bg-ink text-center font-medium text-bone"
                        : "text-ink/80 active:bg-mist/25 active:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </LiquidGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
