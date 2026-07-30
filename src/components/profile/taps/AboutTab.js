"use client";

import { motion } from "framer-motion";
import { tabContent, staggerContainer, riseIn } from "@/components/lib/motion-variants";

function GlassSection({ title, children, delay = 0 }) {
  return (
    <motion.div
      variants={riseIn}
      custom={delay}
      className="rounded-2xl border border-[#a78bfa]/12 bg-[#0a0a0a]/60 p-6 backdrop-blur-xl"
    >
      <h3 className="text-sm font-medium uppercase tracking-wide text-[#ede7d6]/40">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </motion.div>
  );
}

export default function AboutTab({ about }) {
  return (
    <motion.div
      variants={tabContent}
      initial="hidden"
      animate="show"
      exit="exit"
      className="grid grid-cols-1 gap-5 md:grid-cols-2"
    >
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="md:col-span-2">
        <GlassSection title="Biography">
          <p className="text-sm leading-relaxed text-[#ede7d6]/65">
            {about.biography}
          </p>
        </GlassSection>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <GlassSection title="Skills" delay={0.05}>
          <div className="flex flex-wrap gap-2">
            {about.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[#a78bfa]/15 bg-[#8b5cf6]/10 px-3 py-1 text-xs text-[#ede7d6]/75"
              >
                {skill}
              </span>
            ))}
          </div>
        </GlassSection>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <GlassSection title="Interests" delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {about.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-[#a78bfa]/15 bg-[#0a0a0a]/60 px-3 py-1 text-xs text-[#ede7d6]/60"
              >
                {interest}
              </span>
            ))}
          </div>
        </GlassSection>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="md:col-span-2">
        <GlassSection title="Experience" delay={0.15}>
          <ul className="space-y-4">
            {about.experience.map((role) => (
              <li key={`${role.company}-${role.title}`} className="flex flex-col gap-0.5 border-l border-[#a78bfa]/20 pl-4">
                <span className="text-sm font-medium text-[#ede7d6]">
                  {role.title} · {role.company}
                </span>
                <span className="text-xs text-[#ede7d6]/40">{role.period}</span>
              </li>
            ))}
          </ul>
        </GlassSection>
      </motion.div>
    </motion.div>
  );
}