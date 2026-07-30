"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
// import { MagicCard } from "@/components/ui/magic-card";
import { MagicCard } from "../ui/magic-card";
import BaseUrl from "@/config/api";
import { bentoVariants } from "./bentoVariants";

function readTime(content = "") {
  return Math.max(1, Math.round(content.length / 1200));
}

function formatDate(date) {
  const d = new Date(Number(date));
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/**
 * @param {{ blog: object, area: 'top'|'center'|'bottomLeft'|'topRight'|'last', size?: 'featured'|'compact', className?: string }} props
 */
export default function BentoCard({ blog, area, size = "compact", className = "" }) {
  if (!blog) return null;

  const category = blog.category || blog.tags?.[0] || "Blog";
  const isFeatured = size === "featured";

  return (
    <motion.div
      variants={bentoVariants[area]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`group relative h-full min-h-[220px] ${className}`}
    >
      <Link href={`/blog/${blog._id}`} className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5cf6]">
        <MagicCard
          gradientColor="#150f26"
          gradientFrom="#8b5cf6"
          gradientTo="#8b5cf633"
          className="h-full rounded-2xl border border-violet-400/15 bg-white/[0.03] p-0 backdrop-blur-md transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-violet-400/30"
        >
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl">
            <div className={`relative w-full overflow-hidden ${isFeatured ? "h-3/5" : "h-2/3"}`}>
              <Image
                src={`${BaseUrl}${blog.image}`}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#c4b5fd] backdrop-blur-md ring-1 ring-white/10">
                {category}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 className={`font-semibold leading-snug text-[#ede7d6] ${isFeatured ? "text-lg sm:text-xl" : "text-base"}`}>
                  {blog.title}
                </h3>

                {isFeatured && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#ede7d6]/60">
                    {(blog.content || "").replace(/\s+/g, " ").slice(0, 140)}…
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[#ede7d6]/45">
                  {formatDate(blog.date)} · {readTime(blog.content)} min read
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[#ede7d6] ring-1 ring-white/10 transition-all duration-300 group-hover:bg-[#8b5cf6] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </div>
            </div>
          </div>
        </MagicCard>
      </Link>
    </motion.div>
  );
}