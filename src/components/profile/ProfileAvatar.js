"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import img from '../../image/user.jpg'
// import BaseUrl from "@/config/api";
export default function ProfileAvatar({ 
    src  }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="relative -mt-16 h-28 w-28 shrink-0 sm:-mt-20 sm:h-32 sm:w-32"
    >
      <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#0a0a0a] shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_8px_30px_rgba(0,0,0,0.55)]">
        <div className="absolute inset-0 rounded-full " />
        <Image
          src={src || img }
          alt={"profile avatar"}
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>

      {/* Soft ambient glow behind the avatar */}
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-full blur-2xl"
      />


    </motion.div>
  );
}