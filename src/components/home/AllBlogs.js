"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../components/shared/BlogCard";
import Button from "../shared/Button";
import BaseUrl from "@/config/api";
import "./home.css";

export default function AllBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found in localStorage — user may not be logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${BaseUrl}/api/blog/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("DATA:", res.data);
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
            {blogs.length} {blogs.length === 1 ? "story" : "stories"} published
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
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        )}
      </div>
    </section>
  );
}