"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import BaseUrl from "@/config/api";
import { tabContent } from "@/components/lib/motion-variants";
import PostCardManage from "@/components/blog/Postcardmanage";
import GridSkeleton from "@/components/shared/GridSkeleton";
import Button from "@/components/shared/Button";
import Navbar from "@/components/layout/NavBar";

export default function MyBlogs() {
  const router = useRouter();
  const [posts, setPosts] = useState(null); // null = still loading, [] = loaded & empty
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
      return;
    }

    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/api/blog`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.blogs || res.data.data || res.data);
      } catch (err) {
        console.log(err);
        setError(
          err.response?.data?.message || "Couldn't load your posts. Please try again."
        );
        setPosts([]); // stop the skeleton, but we'll show the error, not "no posts"
      }
    };

    fetchMyPosts();
  }, [router]);

  const handleUpdated = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  const handleDeleted = (deletedId) => {
    setPosts((prev) => prev.filter((post) => post._id !== deletedId));
  };

  const isLoading = posts === null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 text-[#ede7d6] sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a78bfa]">
                Your posts
              </span>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#ede7d6] sm:text-4xl">
                My blogs
              </h1>
              <p className="mt-2 text-sm text-[#ede7d6]/50">
                {isLoading
                  ? "Loading your posts…"
                  : `${posts.length} ${posts.length === 1 ? "post" : "posts"} published`}
              </p>
            </div>
            <Button onClick={() => router.push("/newBlog")}>+ Add new blog</Button>
          </div>

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
            ) : error ? (
              <motion.div
                key="error"
                variants={tabContent}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-400/15 bg-[#0a0a0a]/50 py-16 text-center backdrop-blur-xl">
                  <p className="text-sm text-red-400/80">{error}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setPosts(null);
                      setError("");
                    }}
                    className="rounded-full border border-[#a78bfa]/20 px-4 py-1.5 text-xs text-[#ede7d6]/70 transition-colors hover:text-[#ede7d6]"
                  >
                    Try again
                  </button>
                </div>
              </motion.div>
            ) : posts.length === 0 ? (
              <motion.div
                key="empty"
                variants={tabContent}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <div className="flex flex-col items-center justify-center rounded-2xl border border-[#a78bfa]/10 bg-[#0a0a0a]/50 py-16 text-center backdrop-blur-xl">
                  <p className="text-sm text-[#ede7d6]/45">
                    No articles published yet.
                  </p>
                </div>
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
                    onUpdated={handleUpdated}
                    onDeleted={handleDeleted}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}