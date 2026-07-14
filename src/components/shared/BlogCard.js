import Image from "next/image";
import Link from "next/link";
import FadeOverlay from "./FadeOverlay";
import "./shared.css";

export default function BlogCard({ blog }) {
  const { id, title, excerpt, coverImage, date } = blog;

  return (
    <Link href={`/blogDetails/${id}`} className="blogCard">
      <div className="blogCard-imageWrap">
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="blogCard-image"
        />
        <FadeOverlay height="70%" />
        <div className="blogCard-textOverlay">
          <span className="blogCard-date">{date}</span>
          <h3 className="blogCard-title">{title}</h3>
          <p className="blogCard-excerpt">{excerpt}</p>
        </div>
      </div>
    </Link>
  );
}