"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import AuthLayout from "./AuthLayout";
import Button from "@/components/shared/Button";
// import "@/components/AuthLayout.css";
import './auth.css'

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("Register data:", data);
    // call your register API here
  };

  return (
    <AuthLayout title="Create account" subtitle="Join MyBlog and start reading">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              className={`form-input ${errors.firstName ? "input-error" : ""}`}
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
              placeholder="Doe"
              className={`form-input ${errors.lastName ? "input-error" : ""}`}
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
            placeholder="you@example.com"
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
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className={`form-input ${errors.password ? "input-error" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: "Must include upper, lower case and a number",
              },
            })}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className={`form-input ${
              errors.confirmPassword ? "input-error" : ""
            }`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="auth-switch-text">
        Already have an account?{" "}
        <Link href="/login" className="auth-switch-link">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}