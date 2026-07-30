"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

/** @param {{ delay?: number, href?: string }} props */
export default function ExploreButton({ delay = 2.0, href = "#work" , text = "Explore" }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href={href} className="inline-block rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af6a]">
        <ShimmerButton
          shimmerColor="#d4af6a"
          background="rgba(10,10,10,1)"
          borderRadius="999px"
          className="group px-6 py-3 text-sm font-semibold text-[#ede7d6] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-300 hover:scale-[1.03]"
        >
          <span className="flex items-center gap-2">
            {text}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </ShimmerButton>
      </a>
    </motion.div>
  );
}