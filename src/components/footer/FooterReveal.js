"use client";

import { motion, useReducedMotion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 90, scale: 0.96, rotateX: 4 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FooterReveal({ children }) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative -mt-16 sm:-mt-20 lg:-mt-28"
      style={{ perspective: "1800px" }}
    >
      <motion.div
        initial={reducedMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={reducedMotion ? undefined : revealVariants}
        style={{ transformOrigin: "top center" }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}