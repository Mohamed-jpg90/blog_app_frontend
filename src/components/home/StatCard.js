"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
// import { MagicCard } from "@/components/ui/magic-card";
import { MagicCard } from "../ui/magic-card";

/** @param {{ icon: React.ComponentType, value: number, suffix?: string, label: string }} props */
export default function StatCard({ icon: Icon, value, suffix = "", label }) {
  return (
    <MagicCard
      gradientColor="#150f26"
      gradientFrom="#8b5cf6"
      gradientTo="#8b5cf633"
      className="rounded-2xl border border-violet-400/15 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30"
    >
      <div className="flex flex-col items-start gap-3">
        {Icon && (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b5cf6]/10 text-[#a78bfa] ring-1 ring-violet-400/15">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div className="flex items-baseline gap-1">
          <NumberTicker value={value} className="text-4xl font-semibold tracking-tight text-[#ede7d6]" />
          <span className="text-4xl font-semibold tracking-tight text-[#a78bfa]">{suffix}</span>
        </div>
        <span className="text-sm text-[#ede7d6]/55">{label}</span>
      </div>
    </MagicCard>
  );
}