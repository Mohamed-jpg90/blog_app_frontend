"use client";

import { useState } from "react";
import Modal from "./Modal";
import BaseUrl from "@/config/api";

export default function ConfirmDeleteDialog({ open, onClose, post, onDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BaseUrl}/api/blog/${post._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to delete the post");
      }

      onDeleted?.(post._id);
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Delete post" maxWidth="max-w-sm">
      <p className="text-sm text-[#ede7d6]/60">
        Are you sure you want to delete{" "}
        <span className="font-medium text-[#ede7d6]">{post?.title}</span>? This can&apos;t be undone.
      </p>

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-[#a78bfa]/15 px-4 py-2 text-sm text-[#ede7d6]/70 transition-colors duration-200 hover:text-[#ede7d6]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="rounded-full bg-red-500/90 px-5 py-2 text-sm font-medium text-[#0a0a0a] shadow-[0_0_20px_rgba(239,68,68,0.35)] transition-opacity duration-200 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
}