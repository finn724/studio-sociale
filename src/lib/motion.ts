import type { Transition, Variants } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

export const transitionBase: Transition = {
  duration: 1.1,
  ease: EASE,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE },
  },
};

export const fadeUpStagger = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const maskReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 1.2, ease: EASE },
  },
};

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" };
