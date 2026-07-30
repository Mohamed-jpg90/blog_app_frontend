"use client";

import { motion } from "framer-motion";
// import { NumberTicker } from "@/components/magicui/number-ticker";
import { NumberTicker } from "../ui/number-ticker";

export default function ProfileStatCard({ label, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="group flex flex-col items-center gap-1 rounded-2xl border border-[#a78bfa]/15 bg-[#0a0a0a]/60 px-5 py-3 backdrop-blur-xl transition-colors duration-300 hover:border-[#8b5cf6]/40"
    >
      <span className="text-xl font-semibold text-[#ede7d6] sm:text-2xl">
        <NumberTicker value={value} className="text-[#ede7d6]" />
      </span>
      <span className="text-xs uppercase tracking-wide text-[#ede7d6]/40">
        {label}
      </span>
    </motion.div>
  );
}