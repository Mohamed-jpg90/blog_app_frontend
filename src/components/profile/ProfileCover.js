"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProfileCover({ coverSrc }) {
  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-b-[28px] sm:h-[280px] md:h-[340px]">
      <Image
        src={coverSrc}
        alt="Profile cover"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Base darkening so text/avatar always read clearly */}
      <div className="absolute inset-0 bg-[#0a0a0a]/40" />

      {/* Subtle animated gradient overlay, on-brand violet wash */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(76,58,153,0.35), rgba(139,92,246,0.15), rgba(10,10,10,0.55))",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Fade into the base background at the bottom so the glass card feels continuous */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
}