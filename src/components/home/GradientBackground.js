"use client";

export default function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,#0a0a0a,#161022,#0a0a0a,#1a1408)] bg-[length:300%_300%] animate-gradient-flow motion-reduce:animate-none"
    />
  );
}
