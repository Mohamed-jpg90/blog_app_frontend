import './home.css'
export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-top">
        <div className="hero-badge">
          <span className="hero-badge-text">MyBlog</span>
        </div>
      </div>

      <h1 className="hero-headline">
        BLOG
        <br />
        SPACE
      </h1>

      <div className="hero-caption">
        <span className="hero-caption-label">Personal Blog</span>
        <span className="hero-caption-divider">||</span>
        <span className="hero-caption-text">
          A space where I share thoughts, ideas, and stories worth reading.
        </span>
      </div>
    </section>
  );
}