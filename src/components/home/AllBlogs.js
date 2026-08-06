"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../shared/Button";
import BaseUrl from "@/config/api";
import "./home.css";
import PostCard from "../profile/PostCard";
import GridSkeleton from "../shared/GridSkeleton";

export default function AllBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

  

    try {
      const res = await axios.get(`${BaseUrl}/api/blog/allblogs`);
      setBlogs(res.data);
    } catch (error) {
      console.log("ERROR STATUS:", error?.response?.status);
      console.log("ERROR DATA:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="allBlogs">
      <div className="allBlogs-header">
        <div>
          <h2 className="allBlogs-title">All posts</h2>
          <p className="allBlogs-subtitle">
            {loading
              ? "Loading stories…"
              : `${blogs.length} ${blogs.length === 1 ? "story" : "stories"} published`}
          </p>
        </div>

        <div>
          <Button onClick={() => router.push("/newBlog")}>
            + add new Blog
          </Button>
        </div>
      </div>

      <div className="allBlogs-grid">
        {loading ? (
          <GridSkeleton count={6} />
        ) : blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog, i) => (
            <PostCard key={blog._id} post={blog} delay={i * 0.05} />
          ))
        )}
      </div>
    </section>
  );
}