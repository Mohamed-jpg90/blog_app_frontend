"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Link from "next/link";
import AuthLayout from "./AuthLayout";
import Button from "@/components/shared/Button";
// import "@/components/AuthLayout.css";
import './auth.css'
import toast from "react-hot-toast";
import axios from "axios";
import BaseUrl from "@/config/api";
import { useRouter } from "next/navigation";



export default function LoginPage() {


const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login data:", data);

    try {
      
  const res = await axios.post(
    `${BaseUrl}/api/auth/login`,
    data
  );

  console.log(res.data);
  localStorage.setItem("token",res.data.access_token)
  localStorage.setItem("user" , JSON.stringify(res.data.user ) )
    toast(res.data.message,
  {
    style: {
      borderRadius: '10px',
      background: '#1A1A1A',
      color: '#EDE7D6 ',
    },
  }
    )

    reset()
    router.back()
    } catch ({error}) {
      console.log("the error is :"+ error);
      
    }
   
  };


useEffect(()=>{
  const token = localStorage.getItem("token")
   if (token) {
      router.replace("/")
    }

},[router])

//     useEffect(()=>{
//     toast('login Page',
//   {
//     style: {
//       borderRadius: '10px',
//       background: '#1A1A1A',
//       color: '#EDE7D6 ',
//     },
//   }
// );
//   },[])

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
                value: 6,
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