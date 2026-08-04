"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@/components/shared/Button";
import BaseUrl from "@/config/api";
import toast from "react-hot-toast";


export default function ChangePasswordPage() {
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    setServerError("");
    setServerSuccess("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${BaseUrl}/api/user/updatePassword`,
        { lastPass: data.currentPassword, newPass: data.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // setServerSuccess(res.data.message || "Your password has been updated.");
      reset();
      toast.success(res.data.message ||"Your password has been changed.", {
       style: {
      borderRadius: '10px',
      background: '#1A1A1A',
      color: '#EDE7D6 ',
    },

      });

    } catch (err) {
      setServerError(err.response?.data?.message || "Something went wrong");
        toast.error("some thing wrong", {
       style: {
      borderRadius: '10px',
      background: '#1A1A1A',
      color: '#EDE7D6 ',
    },

      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0a] px-6 py-16">
      <div className="w-full max-w-[460px] rounded-[28px] border border-[#a78bfa]/15 bg-[#0a0a0a]/75 p-8 backdrop-blur-2xl">
        <h1 className="text-[28px] font-bold text-[#ede7d6]">Change password</h1>
        <p className="mb-7 mt-2 text-sm text-[#ede7d6]/50">
          Choose a strong password to keep your account secure
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-[18px]">
            <label htmlFor="currentPassword" className="mb-1.5 block text-[13px] font-medium text-[#ede7d6]/70">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-[10px] border bg-[#0a0a0a]/60 px-3.5 py-3 text-sm text-[#ede7d6] outline-none transition-colors duration-200 ${errors.currentPassword ? "border-red-400/50" : "border-[#a78bfa]/15 focus:border-[#8b5cf6]/50"
                }`}
              {...register("currentPassword", { required: "Current password is required" })}
            />
            {errors.currentPassword && (
              <p className="mt-1.5 text-xs text-red-400">{errors.currentPassword.message}</p>
            )}
          </div>

          <div className="mb-[18px]">
            <label htmlFor="newPassword" className="mb-1.5 block text-[13px] font-medium text-[#ede7d6]/70">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-[10px] border bg-[#0a0a0a]/60 px-3.5 py-3 text-sm text-[#ede7d6] outline-none transition-colors duration-200 ${errors.newPassword ? "border-red-400/50" : "border-[#a78bfa]/15 focus:border-[#8b5cf6]/50"
                }`}
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Must include upper, lower case and a number",
                },
              })}
            />
            {errors.newPassword && (
              <p className="mt-1.5 text-xs text-red-400">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="mb-[18px]">
            <label htmlFor="confirmPassword" className="mb-1.5 block text-[13px] font-medium text-[#ede7d6]/70">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-[10px] border bg-[#0a0a0a]/60 px-3.5 py-3 text-sm text-[#ede7d6] outline-none transition-colors duration-200 ${errors.confirmPassword ? "border-red-400/50" : "border-[#a78bfa]/15 focus:border-[#8b5cf6]/50"
                }`}
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) => value === newPassword || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>

          {serverError && <p className="mb-3 text-center text-xs text-red-400">{serverError}</p>}

          <Button
            type="submit"
            variant="primary"
            className="mt-2 w-full rounded-full bg-[#8b5cf6] py-3 text-sm font-medium text-[#0a0a0a] shadow-[0_0_24px_rgba(139,92,246,0.35)] transition-opacity duration-200 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update password"}
          </Button>

          {serverSuccess && (
            <p className="mt-3.5 text-center text-[13px] text-[#7fd88f]">{serverSuccess}</p>
          )}
        </form>
      </div>
    </div>
  );
}