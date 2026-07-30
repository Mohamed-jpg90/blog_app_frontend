"use client";

import { BookOpen, Users, FolderKanban, Layers } from "lucide-react";
import StatCard from "./StatCard";

const stats = [
  { icon: BookOpen, value: 120, suffix: "+", label: "Articles" },
  { icon: Users, value: 25, suffix: "K+", label: "Readers" },
  { icon: FolderKanban, value: 50, suffix: "+", label: "Projects" },
  { icon: Layers, value: 15, suffix: "", label: "Categories" },
];

export default function StatsSection() {
  return (
    <section className="relative bg-[#0a0a0a] px-6 py-24 sm:px-10 lg:px-16">
   
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#4c3a99]/[0.08] blur-[120px]"
      />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}