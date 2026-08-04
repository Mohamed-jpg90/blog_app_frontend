"use client";

import { motion } from "framer-motion";

const TABS = ["Posts", "Edit", "change"];

export default function StickyTabs({ activeTab, onChange }) {
  return (
    <div className="sticky top-0 z-20 -mx-4 border-b border-[#a78bfa]/10 bg-[#0a0a0a]/75 px-4 backdrop-blur-2xl sm:mx-0 sm:rounded-2xl sm:px-2">
      <div className="mx-auto flex max-w-4xl gap-1 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChange(tab)}
              className={`relative shrink-0 px-4 py-3.5 text-sm font-medium transition-colors duration-300 ${
                isActive ? "text-[#ede7d6]" : "text-[#ede7d6]/45 hover:text-[#ede7d6]/75"
              }`}
            >
              {tab}
              {isActive && (
                <motion.span
                  layoutId="active-tab-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[#8b5cf6] shadow-[0_0_10px_rgba(139,92,246,0.7)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}