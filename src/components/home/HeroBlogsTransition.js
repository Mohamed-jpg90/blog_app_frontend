"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * HeroBlogsTransition
 * --------------------
 * Orchestrates the "hero behaves like a fixed background layer while the
 * next section rises above it like a floating glass panel" effect.
 *
 * How it works (see the write-up in the chat response for the full
 * explanation):
 *
 * 1. The outer wrapper is taller than the viewport (`200svh`). That extra
 *    height is the scroll "runway" the rise animation plays across.
 * 2. `hero` is rendered inside a `position: sticky; top: 0; height: 100svh`
 *    box — so instead of scrolling away immediately, it stays pinned to the
 *    viewport for the whole runway.
 * 3. `panel` sits right after it in normal document flow, pulled up with a
 *    negative top margin so it starts tucked under/behind the hero.
 * 4. `useScroll` tracks scroll progress through the runway (0 → 1). That
 *    progress drives translateY / rotateX / scale / opacity ONLY —
 *    transform + opacity are GPU-accelerated and never trigger layout, so
 *    this stays smooth even on lower-end devices.
 * 5. Once progress hits 1, the sticky hero naturally releases (because the
 *    200svh container has ended) and the page continues scrolling normally
 *    into the sections below (Quote, Stats, Footer).
 *
 * Reduced motion: if the user prefers reduced motion, we skip the pin/rise
 * choreography entirely and render both sections in normal flow.
 */
export default function HeroBlogsTransition({ hero, panel }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Panel entrance: rises + untilts + unscales + fades in across the first
  // ~65% of the runway, then holds steady for the remainder so it doesn't
  // feel like it's still "settling" right as the pin releases.
  const translateY = useTransform(scrollYProgress, [0, 0.65, 1], ["16%", "0%", "0%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.65, 1], [6, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [0.94, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 1]);

  // Hero recedes very subtly as the panel rises — a gentle dim + zoom that
  // sells the "background layer" depth cue without fighting the hero's own
  // entrance animations (which are left completely untouched).
  const heroFade = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.55, 0.55]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  if (reducedMotion) {
    return (
      <div className="relative">
        {hero}
        <div className="relative z-10 -mt-6">{panel}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full">
      <div className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden">
        <motion.div
          style={{ opacity: heroFade, scale: heroScale }}
          className="h-full w-full will-change-transform"
        >
          {hero}
        </motion.div>
      </div>

      {/* Overlap amount is intentionally smaller on mobile and grows on
          larger viewports, per the "reduce automatically on mobile" spec. */}
      <div
        className="relative z-10 -mt-[9svh] sm:-mt-[12svh] lg:-mt-[15svh] xl:-mt-[17svh]"
        style={{ perspective: "1600px" }}
      >
        <motion.div
          style={{
            translateY,
            rotateX,
            scale,
            opacity,
            transformOrigin: "top center",
          }}
          className="will-change-transform"
        >
          {panel}
        </motion.div>
      </div>
    </div>
  );
}