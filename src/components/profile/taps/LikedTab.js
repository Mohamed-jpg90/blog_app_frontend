"use client";

import { motion } from "framer-motion";
// import PostCard from "../PostCard";
import PostCard from "../PostCard";
// import { tabContent } from "@/component/lib/motion-varia
import { tabContent } from "@/components/lib/motion-variants";
import { EmptyState } from "./PostsTab";
import EditProfilePage from "../EditProfile";

export default function LikedTab({ posts }) {
  if (!posts?.length) {
    return (
      <motion.div variants={tabContent} initial="hidden" animate="show" exit="exit">
        <EmptyState message="Articles you like will show up here." />
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