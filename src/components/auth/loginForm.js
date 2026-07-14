"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Link from "next/link";
import AuthLayout from "./AuthLayout";
import Button from "@/components/shared/Button";
// import "@/components/AuthLayout.css";
import './auth.css'
import toast from "react-hot-toast";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    // call your login API here
  };


    useEffect(()=>{
    toast('login Page',
  {
    style: {
      borderRadius: '10px',
      background: '#1A1A1A',
      color: '#EDE7D6 ',
    },
  }
);
  },[])

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue to MyBlog">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            })}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <p className="auth-switch-text">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="auth-switch-link">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}