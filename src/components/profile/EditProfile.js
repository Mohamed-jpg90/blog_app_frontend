"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FiCamera } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/components/shared/Button";
import BaseUrl from "@/config/api";
import { useRouter } from "next/navigation";

export default function EditProfilePage({ currentUser, onUpdated }) {
  const router = useRouter();
  // currentUser.image is already a full Cloudinary URL — don't prefix it with BaseUrl
  const [preview, setPreview] = useState(currentUser?.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [serverError, setServerError] = useState("");
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
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

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    if (imageFile) formData.append("image", imageFile);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${BaseUrl}/api/user/updateuser`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message || "Your profile has been updated.", {
        style: {
          borderRadius: "10px",
          background: "#1A1A1A",
          color: "#EDE7D6",
        },
      });

      // Push the fresh user straight back into the parent's state and cache —
      // no extra GET request, no full page refresh needed.
      onUpdated?.(res.data.user);
      router.refresh();
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setServerError(message);
      toast.error(message, {
        style: {
          borderRadius: "10px",
          background: "#1A1A1A",
          color: "#EDE7D6",
        },
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0a] px-6 py-16">
      <div className="w-full max-w-[460px] rounded-[28px] border border-[#a78bfa]/15 bg-[#0a0a0a]/75 p-8 backdrop-blur-2xl">
        <h1 className="text-[28px] font-bold text-[#ede7d6]">Edit profile</h1>
        <p className="mb-7 mt-2 text-sm text-[#ede7d6]/50">
          Update your personal information
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Avatar */}
          <div className="mb-7 flex flex-col items-center">
            <div className="relative">
              <div className="relative flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border border-[#a78bfa]/20 bg-[#0a0a0a]/60">
                {preview ? (
                  <Image src={preview} alt="Profile" fill sizes="100px" className="object-cover" />
                ) : (
                  <span className="text-3xl font-bold uppercase text-[#ede7d6]/40">
                    {currentUser?.firstName?.[0] || "U"}
                  </span>
                )}
              </div>
              <div aria-hidden className="absolute -inset-2 -z-10 rounded-full bg-[#8b5cf6]/20 blur-xl" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change photo"
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-[#8b5cf6] text-sm text-[#0a0a0a] transition-colors duration-200 hover:bg-[#a78bfa]"
              >
                <FiCamera />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
            {imageError && <p className="mt-2 text-center text-xs text-red-400">{imageError}</p>}
          </div>

          {/* First / Last name */}
          <div className="flex gap-3">
            <div className="mb-[18px] flex-1">
              <label htmlFor="firstName" className="mb-1.5 block text-[13px] font-medium text-[#ede7d6]/70">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                className={`w-full rounded-[10px] border bg-[#0a0a0a]/60 px-3.5 py-3 text-sm text-[#ede7d6] outline-none transition-colors duration-200 ${errors.firstName ? "border-red-400/50" : "border-[#a78bfa]/15 focus:border-[#8b5cf6]/50"
                  }`}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "Too short" },
                })}
              />
              {errors.firstName && (
                <p className="mt-1.5 text-xs text-red-400">{errors.firstName.message}</p>
              )}
            </div>

            <div className="mb-[18px] flex-1">
              <label htmlFor="lastName" className="mb-1.5 block text-[13px] font-medium text-[#ede7d6]/70">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                className={`w-full rounded-[10px] border bg-[#0a0a0a]/60 px-3.5 py-3 text-sm text-[#ede7d6] outline-none transition-colors duration-200 ${errors.lastName ? "border-red-400/50" : "border-[#a78bfa]/15 focus:border-[#8b5cf6]/50"
                  }`}
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "Too short" },
                })}
              />
              {errors.lastName && (
                <p className="mt-1.5 text-xs text-red-400">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-[18px]">
            <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-[#ede7d6]/70">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full rounded-[10px] border bg-[#0a0a0a]/60 px-3.5 py-3 text-sm text-[#ede7d6] outline-none transition-colors duration-200 ${errors.email ? "border-red-400/50" : "border-[#a78bfa]/15 focus:border-[#8b5cf6]/50"
                }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          {serverError && <p className="mb-3 text-center text-xs text-red-400">{serverError}</p>}

          <Button
            type="submit"
            variant="primary"
            className="mt-2 w-full rounded-full bg-[#8b5cf6] py-3 text-sm font-medium text-[#0a0a0a] shadow-[0_0_24px_rgba(139,92,246,0.35)] transition-opacity duration-200 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}