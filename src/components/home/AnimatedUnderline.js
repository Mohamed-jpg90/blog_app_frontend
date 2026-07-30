"use client";

import { motion, useReducedMotion } from "framer-motion";

/** @param {{ delay?: number, widthClass?: string }} props */
export default function AnimatedUnderline({ delay = 1.3, widthClass = "w-24" }) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.65, 0, 0.35, 1] }}
      style={{ transformOrigin: "left" }}
      className={`mt-4 block h-[3px] rounded-full bg-gradient-to-r from-[#d4af6a] to-[#d4af6a]/10 ${widthClass}`}
    />
  );
}