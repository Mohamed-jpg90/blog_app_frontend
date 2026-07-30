"use client";

import { motion } from "framer-motion";
// import PostCard from "../PostCard";
import PostCard from "../PostCard";
// import { tabContent } from "@/lib/motion-variants";
import { tabContent } from "@/components/lib/motion-variants";

export default function PostsTab({ posts }) {
  if (!posts?.length) {
    return (
      <motion.div variants={tabContent} initial="hidden" animate="show" exit="exit">
        <EmptyState message="No articles published yet." />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={tabContent}
      initial="hidden"
      animate="show"
      exit="exit"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post, i) => (
        <PostCard key={post.id} post={post} delay={i * 0.05} />
      ))}
    </motion.div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#a78bfa]/10 bg-[#0a0a0a]/50 py-16 text-center backdrop-blur-xl">
      <p className="text-sm text-[#ede7d6]/45">{message}</p>
    </div>
  );
}