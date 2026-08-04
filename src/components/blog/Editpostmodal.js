"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FiCamera } from "react-icons/fi";
import Modal from "./Modal";
import BaseUrl from "@/config/api";

export default function EditPostModal({ open, onClose, post, onUpdated }) {
const [preview, setPreview] = useState(post?.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [serverError, setServerError] = useState("");
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  });

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Please upload a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be smaller than 5MB");
      return;
    }
    setImageError("");
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

const onSubmit = async (data) => {
  setServerError("");

  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await fetch(`${BaseUrl}/api/blog/${post._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update post");
    }

    onUpdated?.(result.blog);
 toast(res.data.message,
  {
    style: {
      borderRadius: '10px',
      background: '#1A1A1A',
      color: '#EDE7D6 ',
    },
  }
    )
    handleClose();
  } catch (err) {
    setServerError(err.message);
     toast.error(res.data.message ||  "something went wrong ", 
  {
    style: {
      borderRadius: '10px',
      background: '#1A1A1A',
      color: '#EDE7D6 ',
    },
  }
    )
  }
};

  const handleClose = () => {
    reset();
    setImageFile(null);
    setImageError("");
    setServerError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Edit post">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Image upload */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-32 w-full overflow-hidden rounded-xl border border-[#a78bfa]/15 bg-[#0a0a0a]/60">
            {preview ? (
              <Image src={preview} alt="Cover preview" fill sizes="400px" className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[#ede7d6]/35">
                No image selected
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#a78bfa]/20 bg-[#0a0a0a]/85 text-[#ede7d6] shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-colors duration-200 hover:border-[#8b5cf6]/50"
              aria-label="Change cover image"
            >
              <FiCamera size={14} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
          {imageError && <p className="text-xs text-red-400">{imageError}</p>}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#ede7d6]/45">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={`w-full rounded-lg border bg-[#0a0a0a]/60 px-3.5 py-2.5 text-sm text-[#ede7d6] outline-none transition-colors duration-200 placeholder:text-[#ede7d6]/25 ${errors.title ? "border-red-400/50" : "border-[#a78bfa]/15 focus:border-[#8b5cf6]/50"
              }`}
            {...register("title", { required: "Title is required", minLength: { value: 3, message: "Too short" } })}
          />
          {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="content" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#ede7d6]/45">
            Description
          </label>
          <textarea
            id="content"
            rows={4}
            className={`w-full resize-none rounded-lg border bg-[#0a0a0a]/60 px-3.5 py-2.5 text-sm text-[#ede7d6] outline-none transition-colors duration-200 placeholder:text-[#ede7d6]/25 ${errors.content ? "border-red-400/50" : "border-[#a78bfa]/15 focus:border-[#8b5cf6]/50"
              }`}
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 10,
                message: "Too short",
              },
            })} />
          {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content.message}</p>}
        </div>

        {serverError && <p className="text-xs text-red-400">{serverError}</p>}

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-[#a78bfa]/15 px-4 py-2 text-sm text-[#ede7d6]/70 transition-colors duration-200 hover:text-[#ede7d6]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-[#8b5cf6] px-5 py-2 text-sm font-medium text-[#0a0a0a] shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-opacity duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}