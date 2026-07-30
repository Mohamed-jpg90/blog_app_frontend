"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../shared/Button";
import BaseUrl from "@/config/api";
import BentoGrid from "./BentoGrid";

export default function AllBlogsHome() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${BaseUrl}/api/blog/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(Array.isArray(res.data) ? res.data.slice(0, 5) : []);
      } catch (error) {
        console.log("ERROR:", error?.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      aria-label="Latest stories"
      className="relative overflow-hidden rounded-t-[2rem]  bg-[#0a0a0a]/80 px-6 py-20  sm:rounded-t-[2.75rem] sm:px-10 sm:py-24 lg:rounded-t-[3.25rem] lg:px-16"
    >
      {/* Faint top sheen — glass edge, matches Footer/QuoteSection */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/25 to-transparent"
      /> */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#6d5bd0]/[0.05] to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a78bfa]">
              Featured
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#ede7d6] sm:text-4xl">
              Latest stories
            </h2>
            <p className="mt-2 text-sm text-[#ede7d6]/50">
              {blogs.length} {blogs.length === 1 ? "story" : "stories"} published
            </p>
          </div>
          <Button onClick={() => router.push("/newBlog")}>+ Add new blog</Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(200px,1fr)] md:gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-full min-h-[220px] animate-pulse rounded-2xl border border-violet-400/10 bg-white/[0.03]"
              />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-sm text-[#ede7d6]/50">No blogs found yet.</p>
        ) : (
          <BentoGrid blogs={blogs} />
        )}
      </div>
    </section>
  );
}