import Image from "next/image";
import Link from "next/link";
import FadeOverlay from "./FadeOverlay";
import "./shared.css";
import BaseUrl from "@/config/api";
export default function BlogCard({ blog }) {
  const img = BaseUrl+ blog.image

  return (
    <Link href={`/blogDetails/${blog._id}`} className="blogCard">
      <div className="blogCard-imageWrap">
        <Image
          src={img}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="blogCard-image"
        />
        <FadeOverlay height="70%" />
        <div className="blogCard-textOverlay">
          <span className="blogCard-date">{blog.date}</span>
          <h3 className="blogCard-title">{blog.title}</h3>
          <p className="blogCard-excerpt">{blog.content}</p>
        </div>
      </div>
    </Link>
  );
}