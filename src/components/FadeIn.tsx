"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE } from "@/lib/motion";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  y?: number;
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 1.1,
  y = 40,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
