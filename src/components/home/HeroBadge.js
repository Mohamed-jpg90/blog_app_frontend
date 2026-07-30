"use client";

import { motion, useReducedMotion } from "framer-motion";

/** @param {{ delay?: number }} props */
export default function HeroBadge({ delay = 0.3 }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#d4af6a]" />
      <span className="text-xs font-medium tracking-wide text-[#ede7d6]/80">
        MyBlog
      </span>
    </motion.div>
  );
}