"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
// import { MagicCard } from "@/components/magicui/magic-card";
import { MagicCard } from "../ui/magic-card";
import BaseUrl from "@/config/api";

export default function PostCard({ post, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <MagicCard
        gradientColor="#4c3a99"
        gradientOpacity={0.4}
        className="overflow-hidden rounded-2xl border border-[#a78bfa]/12 bg-[#0a0a0a]/60 backdrop-blur-xl"
      >
        <a href={post.href} className="block">
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={`${BaseUrl}${post.image}`}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-[#ede7d6]">
                {post.title}
              </h3>
              <FiArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-[#a78bfa]/60 transition-transform duration-300  group-hover:rotate-45 group-hover:text-[#8b5cf6]"
              />
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-[#ede7d6]/50">
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-[#ede7d6]/35">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </a>
      </MagicCard>
    </motion.div>
  );
}