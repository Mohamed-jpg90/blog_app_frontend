"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiEdit2, FiTrash2 } from "react-icons/fi";
import { MagicCard } from "../ui/magic-card";
import BaseUrl from "@/config/api";
import Link from "next/link";
import EditPostModal from "./Editpostmodal";
import ConfirmDeleteDialog from "./Confirmdeletedialog";

export default function PostCardManage({ post, delay = 0, onUpdated, onDeleted }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="group relative"
      >
        {/* Manage controls — appear on hover, sit above the card link */}
        <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setEditOpen(true);
            }}
            aria-label="Edit post"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#a78bfa]/20 bg-[#0a0a0a]/85 text-[#ede7d6]/80 backdrop-blur-xl transition-colors duration-200 hover:border-[#8b5cf6]/50 hover:text-[#ede7d6]"
          >
            <FiEdit2 size={13} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setDeleteOpen(true);
            }}
            aria-label="Delete post"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#a78bfa]/20 bg-[#0a0a0a]/85 text-[#ede7d6]/80 backdrop-blur-xl transition-colors duration-200 hover:border-red-400/50 hover:text-red-400"
          >
            <FiTrash2 size={13} />
          </button>
        </div>

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
                <h3 className="text-base font-semibold text-[#ede7d6]">
                  {post.title?.split(/\s+/).slice(0, 10).join(" ")}
                  {post.title?.split(/\s+/).length > 10 ? "..." : ""}
                </h3>
                <FiArrowUpRight
                  size={16}
                  className="mt-1 shrink-0 text-[#a78bfa]/60 transition-transform duration-300 group-hover:rotate-45 group-hover:text-[#8b5cf6]"
                />
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-[#ede7d6]/50">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-[#ede7d6]/35">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        </MagicCard>
      </motion.div>

      <EditPostModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        post={post}
        onUpdated={(updatedPost) => {
          onUpdated?.(updatedPost);
          setEditOpen(false);
        }}
      />
      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        post={post}
        onDeleted={(id) => {
          onDeleted?.(id);
          setDeleteOpen(false);
        }}
      />
    </>
  );
}