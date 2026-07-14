import BlogCard from "../../components/shared/BlogCard";
import "./home.css";

export default function AllBlogs({ blogs = [] }) {
  return (
    <section className="allBlogs">
      <div className="allBlogs-header">
        <h2 className="allBlogs-title">All posts</h2>
        <p className="allBlogs-subtitle">
          {blogs.length} {blogs.length === 1 ? "story" : "stories"} published
        </p>
      </div>

      <div className="allBlogs-grid">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}