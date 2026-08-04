"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TextAnimate } from "../ui/text-animate";
import { Particles } from "../ui/particles";
import HeroBadge from "./HeroBadge";
import AnimatedUnderline from "./AnimatedUnderline";
import ExploreButton from "./ExploreButton";
import GradientBackground from "./GradientBackground";

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [titleGlow, setTitleGlow] = useState(false);

  // Glow appears once the title + underline beat of the timeline is done.
  useEffect(() => {
    const t = setTimeout(() => setTitleGlow(true), 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      aria-label="Hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-24 sm:px-10 lg:px-16"
    >
      <GradientBackground />

      {!reducedMotion && (
        <Particles
          className="absolute inset-0 -z-10"
          quantity={90}
          ease={70}
          color="#d4af6a"
          staticity={40}
        />
      )}

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <HeroBadge delay={0.3} />

        <h1
          className={`mt-6 text-[15vw] font-semibold leading-[0.95] tracking-tight text-[#ede7d6] transition-[filter] duration-700 ease-out sm:text-[10vw] md:text-[7vw] lg:text-[6.5rem] ${
            titleGlow ? "drop-shadow-[0_0_46px_rgba(212,175,106,0.28)]" : ""
          }`}
        >
          <div>
            <TextAnimate animation="blurIn" delay={0.7}>
              Blog
            </TextAnimate>
          </div>
          <div>
            <TextAnimate animation="blurIn" delay={1.0}>
              Space
            </TextAnimate>
          </div>
        </h1>

        <AnimatedUnderline delay={1.3} />

        <motion.p
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md text-balance text-[15px] leading-relaxed text-[#ede7d6]/60 sm:text-base"
        >
          A space where I share thoughts, ideas, and stories worth reading.
        </motion.p>

        <div className="mt-10">
          <ExploreButton delay={2.0} href="/blogs" />
        </div>
      </div>
    </section>
  );
}