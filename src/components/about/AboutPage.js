"use client";

import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiMail,
  FiMessageCircle,
  FiEdit3,
  FiUsers,
  FiSliders,
  FiCompass,
} from "react-icons/fi";
import { riseIn, staggerContainer } from "@/components/lib/motion-variants";

// TODO: change "Inkline" to your actual platform name
const PLATFORM = {
  name: "Inkline",
  tagline: "A place to write, share, and read real stories.",
  contactEmail: "mohammed.maged.dev@gmail.com",
};

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Twitter", href: "#" },
];

const STEPS = [
  { step: "01", title: "Create an account", desc: "Sign up in a few seconds — no complicated setup." },
  { step: "02", title: "Write your post", desc: "Add a title, your content, and a cover image." },
  { step: "03", title: "Publish it", desc: "Hit publish and it's live for everyone to read." },
];

const FEATURES = [
  {
    icon: FiEdit3,
    title: "Write & Publish",
    desc: "Create a new blog post in minutes — title, content, and a cover image.",
  },
  {
    icon: FiSliders,
    title: "Full Control Over Your Posts",
    desc: "Edit or update any of your own posts anytime, as many times as you want.",
  },
  {
    icon: FiCompass,
    title: "Explore Other Writers",
    desc: "Browse and read blog posts published by everyone else on the platform.",
  },
  {
    icon: FiUsers,
    title: "Your Own Profile",
    desc: "Manage your account, profile photo, and password from one place.",
  },
];
// -------------------------------------------------------------------------

function GlassPanel({ className = "", children }) {
  return (
    <div
      className={`rounded-[32px] border border-[#a78bfa]/12 bg-[#0a0a0a]/70 backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

// function SocialLinks({ className = "" }) {
//   return (
//     <div className={`flex items-center gap-4 text-sm ${className}`}>
//       {SOCIALS.map((s, i) => (
//         <span key={s.label} className="flex items-center gap-4">
//           
//             href={s.href}
//             className="text-[#d4af6a]/80 transition-colors duration-200 hover:text-[#d4af6a]"
//           >
//             {s.label}
//           </a>
//           {i < SOCIALS.length - 1 && <span className="text-[#ede7d6]/15">/</span>}
//         </span>
//       ))}
//     </div>
//   );
// }

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] px-4 py-10 text-[#ede7d6] sm:px-8">
      {/* ambient background glow, shared with rest of site */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#4c3a99]/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-[#6d5bd0]/12 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-full flex-col gap-6">
        {/* ---------------- Hero ---------------- */}
        <motion.div variants={riseIn} initial="hidden" animate="show" custom={0}>
          <GlassPanel className="px-6 pb-14 pt-6 sm:px-10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#ede7d6]/45">{PLATFORM.contactEmail}</span>
              {/* <SocialLinks className="hidden sm:flex" /> */}
            </div>

            <div className="mt-10 flex flex-col items-center">
              <span className="whitespace-nowrap rounded-full border border-[#a78bfa]/20 bg-[#0a0a0a]/85 px-4 py-1.5 text-[11px] text-[#ede7d6]/70 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                Welcome to {PLATFORM.name} ✍️
              </span>

              <h1 className="mt-8 max-w-xl text-center text-2xl font-medium leading-tight text-[#ede7d6]/55 sm:text-3xl">
                Your stories deserve a{" "}
                <span className="font-semibold text-[#ede7d6]">
                  home of their own.
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-center text-sm leading-relaxed text-[#ede7d6]/45">
                {PLATFORM.tagline} Write your own posts, edit them whenever you
                like, and explore what everyone else is publishing.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <motion.a
                  href="/newBlog"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-full bg-[#8b5cf6] px-5 py-2.5 text-sm font-medium text-[#0a0a0a] shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(139,92,246,0.6)]"
                >
                  Write Your First Post <FiArrowUpRight size={15} />
                </motion.a>
                <motion.a
                  href="/blogs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-full border border-[#a78bfa]/15 bg-[#0a0a0a]/60 px-5 py-2.5 text-sm font-medium text-[#ede7d6]/80 backdrop-blur-xl transition-colors duration-200 hover:border-[#8b5cf6]/40 hover:text-[#ede7d6]"
                >
                  Browse Posts
                </motion.a>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* ---------------- How it works ---------------- */}
        <motion.div variants={riseIn} initial="hidden" animate="show" custom={0.1}>
          <GlassPanel className="px-6 py-10 sm:px-10">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {STEPS.map(({ step, title, desc }) => (
                <div key={step} className="max-w-[180px] text-center">
                  <span className="text-xs font-semibold tracking-wider text-[#a78bfa]/70">
                    {step}
                  </span>
                  <h3 className="mt-1 text-sm font-medium text-[#ede7d6]">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#ede7d6]/40">{desc}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        {/* ---------------- Features ---------------- */}
        <motion.div variants={riseIn} initial="hidden" animate="show" custom={0.15}>
          <GlassPanel className="px-6 py-14 sm:px-10">
            <h2 className="text-center text-xl font-medium leading-snug sm:text-2xl">
              <span className="text-[#ede7d6]/55">Everything you need</span>
              <br />
              <span className="font-semibold text-[#ede7d6]">to write and share your work.</span>
            </h2>

            <div className="relative my-10 h-px bg-[#a78bfa]/10">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a78bfa]/20 bg-[#0a0a0a] px-4 py-1 text-xs text-[#ede7d6]/45">
                Features
              </span>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-8 sm:grid-cols-4"
            >
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <motion.div key={title} variants={riseIn} className="text-left">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#a78bfa]/15 bg-[#8b5cf6]/10 text-[#a78bfa]">
                    <Icon size={16} />
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-[#ede7d6]">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#ede7d6]/40">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </GlassPanel>
        </motion.div>

        {/* ---------------- Contact CTA ---------------- */}
        <motion.div variants={riseIn} initial="hidden" animate="show" custom={0.2}>
          <GlassPanel className="flex flex-col items-center px-6 py-16 sm:px-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#a78bfa]/15 bg-[#8b5cf6]/10 text-[#a78bfa]">
              <FiMessageCircle size={20} />
            </div>

            <h2 className="mt-6 max-w-sm text-center text-2xl font-semibold text-[#ede7d6] sm:text-3xl">
              Ready to share your first story?
            </h2>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href="/newBlog"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-full bg-[#8b5cf6] px-5 py-2.5 text-sm font-medium text-[#0a0a0a] shadow-[0_0_24px_rgba(139,92,246,0.4)]"
              >
                <FiEdit3 size={15} /> Create a Post
              </motion.a>
              <motion.a
                href={`mailto:${PLATFORM.contactEmail}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-full border border-[#a78bfa]/15 bg-[#0a0a0a]/60 px-5 py-2.5 text-sm font-medium text-[#ede7d6]/80 backdrop-blur-xl transition-colors duration-200 hover:border-[#8b5cf6]/40 hover:text-[#ede7d6]"
              >
                <FiMail size={15} /> Contact
              </motion.a>
            </div>
          </GlassPanel>
        </motion.div>

        {/* ---------------- Footer ---------------- */}
        <div className="flex flex-col items-center gap-3 px-2 py-4 text-xs text-[#ede7d6]/35 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {PLATFORM.name}. All rights reserved.</span>
          {/* <SocialLinks /> */}
        </div>
      </div>
    </main>
  );
}