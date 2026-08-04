"use client";

import { motion, AnimatePresence } from "framer-motion";
import { tabContent } from "@/components/lib/motion-variants";
import PostCardManage from "../../blog/Postcardmanage";
import GridSkeleton from "@/components/shared/GridSkeleton";

export default function PostsTab({ posts, onUpdated, onDeleted }) {
  const isLoading = posts === null || posts === undefined;

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <GridSkeleton count={6} />
        </motion.div>
      ) : !posts.length ? (
        <motion.div
          key="empty"
          variants={tabContent}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <EmptyState message="No articles published yet." />
        </motion.div>
      ) : (
        <motion.div
          key="posts"
          variants={tabContent}
          initial="hidden"
          animate="show"
          exit="exit"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post, i) => (
            <PostCardManage
              key={post._id}
              post={post}
              delay={i * 0.05}
              onUpdated={onUpdated}
              onDeleted={onDeleted}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#a78bfa]/10 bg-[#0a0a0a]/50 py-16 text-center backdrop-blur-xl">
      <p className="text-sm text-[#ede7d6]/45">{message}</p>
    </div>
  );
}