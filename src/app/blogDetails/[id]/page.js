import { notFound } from "next/navigation";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import BlogDetails from "@/components/home/BlogDetails";
import BaseUrl from "@/config/api";

async function getBlog(id) {
  // Using fetch (not axios) here so Next.js automatically dedupes this
  // request — generateMetadata and the page component both call getBlog(id)
  // for the same id, but the network request only fires once.
  const res = await fetch(`${BaseUrl}/api/blog/${id}`, {
    next: { revalidate: 60 }, // cache for 60s, regenerate in the background after that
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.blog;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return {
      title: "Post not found",
    };
  }

  // Google typically shows ~155-160 characters of a description in results
  const description =
    blog.content?.length > 155
      ? blog.content.slice(0, 155).trim() + "…"
      : blog.content;

  const authorName = blog.owner
    ? [blog.owner.firstName, blog.owner.lastName].filter(Boolean).join(" ")
    : undefined;

  return {
    title: blog.title,
    description,
    alternates: {
      canonical: `/blogDetails/${blog._id}`,
    },
    openGraph: {
      type: "article",
      title: blog.title,
      description,
      url: `/blogDetails/${blog._id}`,
      images: blog.image
        ? [{ url: blog.image, width: 1200, height: 630, alt: blog.title }]
        : undefined,
      publishedTime: blog.date ? new Date(Number(blog.date)).toISOString() : undefined,
      authors: authorName ? [authorName] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: blog.image ? [blog.image] : undefined,
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <Navbar />
      <BlogDetails blog={blog} />
      <Footer />
    </div>
  );
}