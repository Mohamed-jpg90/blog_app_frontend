"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FiUploadCloud, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "@/components/shared/Button";
import "./home.css";
import axios from "axios";
import BaseUrl from "@/config/api";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE_MB = 5;

export default function AddBlogForm() {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please upload a valid image file");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setImageError(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setImageError("");
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
    setImageError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data) => {
    try {
      if (!imageFile) {
        setImageError("A cover image is required");
        return;
      }
      const token = localStorage.getItem("token");


      if (!token) {
        toast.error("You must be logged in to publish a post.", toastStyle.error);
        return;
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("image", imageFile);

      await axios.post(`${BaseUrl}/api/blog`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Your post has been published.", toastStyle.success);
      reset();
      removeImage();
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message, toastStyle.error);
    }
  };

useEffect(()=>{
      const token = localStorage.getItem("token");

if(!token){
  router.replace('/login')
}

},[])

  return (
    <div className="addBlog-wrapper">
      <div className="addBlog-box">
        <h1 className="addBlog-title">Add new post</h1>
        <p className="addBlog-subtitle">
          Write your story and give it a cover image
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Give your post a title"
              className={`form-input ${errors.title ? "input-error" : ""}`}
              {...register("title", {
                required: "Title is required",
                minLength: { value: 4, message: "Title is too short" },
                maxLength: { value: 120, message: "Title is too long" },
              })}
            />
            {errors.title && (
              <p className="form-error">{errors.title.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              rows={8}
              placeholder="Write your blog content here..."
              className={`form-input form-textarea ${
                errors.content ? "input-error" : ""
              }`}
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 50,
                  message: "Content should be at least 50 characters",
                },
              })}
            />
            {errors.content && (
              <p className="form-error">{errors.content.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Cover image</label>

            {!preview ? (
              <div
                className={`upload-dropzone ${
                  isDragging ? "upload-dropzone-active" : ""
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
              >
                <FiUploadCloud className="upload-icon" />
                <p className="upload-text">
                  <span className="upload-text-strong">Click to upload</span>{" "}
                  or drag and drop
                </p>
                <p className="upload-hint">
                  PNG, JPG up to {MAX_FILE_SIZE_MB}MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="upload-input"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </div>
            ) : (
              <div className="upload-preview">
                <Image
                  src={preview}
                  alt="Cover preview"
                  fill
                  sizes="440px"
                  className="upload-preview-img"
                />
                <button
                  type="button"
                  className="upload-remove"
                  onClick={removeImage}
                  aria-label="Remove image"
                >
                  <FiX />
                </button>
              </div>
            )}

            {imageError && <p className="form-error">{imageError}</p>}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish post"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// toast styling to match the dark / violet / gold / cream design system
const toastStyle = {
  success: {
    style: {
      background: "#0A0A0A",
      color: "#EDE7D6",
      border: "1px solid #7C3AED",
    },
    iconTheme: {
      primary: "#7C3AED",
      secondary: "#EDE7D6",
    },
  },
  error: {
    style: {
      background: "#0A0A0A",
      color: "#EDE7D6",
      border: "1px solid #B91C1C",
    },
    iconTheme: {
      primary: "#EF4444",
      secondary: "#EDE7D6",
    },
  },
};