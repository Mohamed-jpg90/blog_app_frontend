"use client";

import { TextAnimate } from "../ui/text-animate";
import GradientBackground from "./GradientBackground";
import AnimatedUnderline from "./AnimatedUnderline";

export default function QuoteSection() {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden rounded-t-[2rem] border-x border-t border-violet-400/15 bg-[#0a0a0a]/75 px-6 py-20  backdrop-blur-2xl sm:rounded-t-[2.75rem] sm:px-10 sm:py-24 lg:rounded-t-[3.25rem] lg:px-16">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-[#0a0a0a]/25 backdrop-blur-[3px]" />

      {/* Soft violet glow so the panel matches the Footer/AllBlogs language */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[380px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6d5bd0]/[0.12] blur-[130px]"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="text-4xl font-semibold uppercase leading-[1.05] tracking-[0.08em] text-[#ede7d6] sm:text-6xl md:text-7xl">
          <TextAnimate animation="blurInUp" by="word" delay={0.1}>
            Code. Learn. Share.
          </TextAnimate>
        </h2>
        <AnimatedUnderline delay={0.9} widthClass="w-32" />
      </div>
    </section>
  );
}