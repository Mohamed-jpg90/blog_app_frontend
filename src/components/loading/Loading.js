"use client";

import { useEffect, useState } from "react";
import "./loading.css";

const MIN_DISPLAY_TIME = 4000; // ms

export default function PageLoader({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const minTimer = setTimeout(() => {
      setIsExiting(true);
    }, MIN_DISPLAY_TIME);

    return () => clearTimeout(minTimer);
  }, []);

  useEffect(() => {
    if (!isExiting) return;

    // wait for the slide-up/fade-out transition to finish before unmounting
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(removeTimer);
  }, [isExiting]);

  return (
    <>
      {isLoading && (
        <div className={`page-loader ${isExiting ? "page-loader-exit" : ""}`}>
          <div className="card">
            <div className="loader">
              <p>loading</p>
              <div className="words">
                <span className="word">buttons</span>
                <span className="word">forms</span>
                <span className="word">switches</span>
                <span className="word">Blogs</span>
                <span className="word">buttons</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}