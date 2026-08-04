"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
// import { MagicCard } from "@/components/magicui/magic-card";
import { MagicCard } from "../ui/magic-card";
import BaseUrl from "@/config/api";
import Link from "next/link";

export default function PostCard({ post, delay = 0 }) {
  function formatDate(date) {
  const d = new Date(Number(date));
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

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
        <Link href={`/blogDetails/${post._id}`} className="block">
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={`${post.image}`}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="line-clamp-2 h-14 leading-7 text-base font-semibold text-[#ede7d6]">
                {post.title?.split(/\s+/).slice(0, 10).join(" ")}
                {post.title?.split(/\s+/).length > 10 ? "..." : ""}
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
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </Link>
      </MagicCard>
    </motion.div>
  );
}