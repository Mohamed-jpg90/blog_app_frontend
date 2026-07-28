"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FiCamera } from "react-icons/fi";
import Button from "@/components/shared/Button";
import "./profile.css";

export default function EditProfilePage({ currentUser }) {
  const [preview, setPreview] = useState(currentUser?.avatar || null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
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
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (imageFile) formData.append("avatar", imageFile);

    console.log("Update profile:", { ...data, imageFile });
    // await fetch("/api/user/update", { method: "PUT", body: formData });
  };

  return (
    <div className="editProfile-wrapper">
      <div className="editProfile-box">
        <h1 className="editProfile-title">Edit profile</h1>
        <p className="editProfile-subtitle">
          Update your personal information
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="avatar-section">
            <div className="avatar-circle">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile"
                  fill
                  sizes="100px"
                  className="avatar-img"
                />
              ) : (
                <span className="avatar-placeholder">
                  {currentUser?.firstName?.[0] || "U"}
                </span>
              )}
              <button
                type="button"
                className="avatar-edit-btn"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change photo"
              >
                <FiCamera />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="avatar-input"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
            {imageError && <p className="form-error">{imageError}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                className={`form-input ${
                  errors.firstName ? "input-error" : ""
                }`}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "Too short" },
                })}
              />
              {errors.firstName && (
                <p className="form-error">{errors.firstName.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                className={`form-input ${
                  errors.lastName ? "input-error" : ""
                }`}
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "Too short" },
                })}
              />
              {errors.lastName && (
                <p className="form-error">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? "input-error" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. 01012345678"
              className={`form-input ${errors.phone ? "input-error" : ""}`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+\s-]{8,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
            />
            {errors.phone && (
              <p className="form-error">{errors.phone.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>

          {isSubmitSuccessful && (
            <p className="form-success">Your profile has been updated.</p>
          )}
        </form>
      </div>
    </div>
  );
}