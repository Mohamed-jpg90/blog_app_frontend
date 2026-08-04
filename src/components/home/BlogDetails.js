"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Fraunces, Inter } from "next/font/google";
import BaseUrl from "@/config/api";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export default function BlogDetails({ blog }) {
  const { title, image, images, date, content, owner, tags } = blog;

  // Support either a single `image` string (current API) or a future `images` array,
  // without breaking either shape.
  const gallery = images?.length ? images : image ? [image] : [];

  const [scale, setScale] = useState(1);
  const [radius, setRadius] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const MAX_SCROLL = 400;
    const MIN_SCALE = 0.86;

    const handleScroll = () => {
      const progress = Math.min(window.scrollY / MAX_SCROLL, 1);
      setScale(1 - progress * (1 - MIN_SCALE));
      setRadius(progress * 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % gallery.length),
    [gallery.length]
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length),
    [gallery.length]
  );

  // Lock scroll + keyboard nav while the lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, next, prev]);

  const readMinutes = Math.max(1, Math.round((content?.length || 0) / 1200));
  const dateLabel = new Date(Number(date)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const authorName = [owner?.firstName, owner?.lastName].filter(Boolean).join(" ");
  const initials = authorName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={`${display.variable} ${body.variable} font-body bg-[#0a0a0a] text-[#ede7d6]`}
    >
      {/* HERO */}
      <div
        className="sticky top-0 h-[62vh] sm:h-[70vh] w-full overflow-hidden origin-top will-change-transform transition-[border-radius] duration-100 ease-linear"
        style={{ transform: `scale(${scale})`, borderRadius: `${radius}px` }}
      >
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="group relative block h-full w-full cursor-zoom-in"
          aria-label="Open image full screen"
        >
          <Image
            src={`${gallery[0]}`}
            alt={title}
            fill
            sizes="100vw"
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {gallery.length > 1 && (
            <span className="absolute bottom-5 right-5 rounded-full bg-black/50 backdrop-blur px-3 py-1 text-xs font-medium tracking-wide text-[#ede7d6] ring-1 ring-white/10">
              1 / {gallery.length} · view gallery
            </span>
          )}
        </button>
      </div>

      {/* BODY */}
      <div className="relative z-10 -mt-16 mx-auto w-full lg:w-[60%] rounded-t-[28px] bg-[#0a0a0a] px-6 pb-24 pt-10 sm:px-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af6a]">
          {dateLabel} · {readMinutes} min read
        </span>

        <h1 className="font-display mt-3 text-[32px] font-semibold leading-[1.12] tracking-tight text-[#ede7d6] sm:text-[44px]">
          {title}
        </h1>

        {/* AUTHOR CARD */}
        <div className="mt-8 flex items-center justify-between gap-4 border-y border-white/10 py-5">
          <div className="flex items-center gap-3">
            {owner?.image ? (
              <div className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-white/10">
                <Image
                  src={`${owner.image}`}
                  alt={authorName}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d4af6a]/15 text-sm font-semibold text-[#d4af6a] ring-1 ring-white/10">
                {initials}
              </div>
            )}
            <div className="leading-tight">
              <p className="text-sm font-semibold text-[#ede7d6]">{authorName}</p>
              <p className="text-xs text-[#ede7d6]/50">Writer</p>
            </div>
          </div>

          {/* <button
            type="button"
            className="rounded-full border border-[#d4af6a]/40 px-4 py-1.5 text-xs font-semibold text-[#d4af6a] transition-colors hover:bg-[#d4af6a] hover:text-[#0a0a0a]"
          >
            Follow
          </button> */}
        </div>

        {/* CONTENT */}
      <div className="mt-10 space-y-3 text-[16px] leading-[1.85] text-[#ede7d6]/85">
  {(content || "")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line, i) => (
      <p key={i}>{line}</p>
    ))}
</div>

        {/* GALLERY STRIP — only renders if there's more than one image */}
        {gallery.length > 1 && (
          <div className="mt-12">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ede7d6]/40">
              Gallery
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {gallery.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => openLightbox(i)}
                  className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10 transition-opacity hover:opacity-80"
                >
                  <Image
                    src={`${img}`}
                    alt={`${title} ${i + 1}`}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAGS */}
        {tags?.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-[#ede7d6]/70 ring-1 ring-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#ede7d6] transition-colors hover:bg-white/20"
          >
            ✕
          </button>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-[#ede7d6] transition-colors hover:bg-white/20 sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-[#ede7d6] transition-colors hover:bg-white/20 sm:right-6"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative h-[80vh] w-[92vw] sm:w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`${gallery[activeIndex]}`}
              alt={`${title} full view`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {gallery.length > 1 && (
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === activeIndex ? "w-6 bg-[#d4af6a]" : "w-1.5 bg-white/30"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}