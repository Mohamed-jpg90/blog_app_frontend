"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./home.css";

export default function BlogDetails({ blog }) {
    const { title, excerpt, coverImage, date, content } = blog;
    const [scale, setScale] = useState(1);
    const [radius, setRadius] = useState(0);
    const heroRef = useRef(null);

    useEffect(() => {
        const MAX_SCROLL = 400; // px over which the shrink happens
        const MIN_SCALE = 0.82;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const progress = Math.min(scrollY / MAX_SCROLL, 1);

            const newScale = 1 - progress * (1 - MIN_SCALE);
            const newRadius = progress * 15; // 0 -> 15px

            setScale(newScale);
            setRadius(newRadius);

            console.log(blog)
            console.log(coverImage);
            
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <article className="blogDetails">
            <div
                ref={heroRef}
                className="blogDetails-hero"
                style={{
                    transform: `scale(${scale})`,
                    borderRadius: `${radius}px`,
                }}
            >
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    sizes="100vw"
                    priority
                    className="blogDetails-heroImage"
                />
            </div>

            <div className="blogDetails-body">
                <span className="blogDetails-date">{date}</span>
                <h1 className="blogDetails-title">{title}</h1>
                <p className="blogDetails-excerpt">{excerpt}</p>

                <div className="blogDetails-content">
                    {(content || "").split("\n\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </article>
    );
}