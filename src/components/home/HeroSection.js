"use client";

import { useEffect, useState } from "react";
import "./home.css";
import { TextAnimate } from "../ui/text-animate";

export default function HeroSection() {
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 500); // 0.5s
    const descTimer = setTimeout(() => setShowDescription(true), 1500); // 1.5s

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(descTimer);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-top">
        <div className="hero-badge">
          <span className="hero-badge-text">MyBlog</span>
        </div>
      </div>

      <h1 className="hero-headline">
        {showTitle && (
          <>
            <TextAnimate animation="blurIn">
              {`Blog \n  space`}

            </TextAnimate>
     
          </>
        )}
      </h1>

      {showDescription && (
        <div className="hero-caption">
          <span className="hero-caption-label">Personal Blog</span>
          <span className="hero-caption-divider">||</span>
          <span className="hero-caption-text">
            A space where I share thoughts, ideas, and stories worth reading.
          </span>
        </div>
      )}
    </section>
  );
}