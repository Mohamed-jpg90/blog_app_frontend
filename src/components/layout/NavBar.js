"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import img from "../../image/logo.jpg";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "My Blogs", href: "/my-blogs" },
  { label: "All Blogs", href: "/blogs" },
];

export default function Navbar() {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userMenuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(Boolean(token));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setUserMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    router.push("/login");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-[#0a0a0a]/85" : "bg-[#0a0a0a]/40"
      } backdrop-blur-md border-b border-violet-400/15`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="relative h-9 w-9 overflow-hidden rounded-[10px] ring-1 ring-violet-400/15">
            <Image src={img} alt="logo" fill sizes="36px" className="object-cover" />
          </div>
          <span className="font-semibold tracking-tight text-[#ede7d6]">Blogs</span>
        </Link>

        {/* Center links — glassy pill, desktop only */}
        <ul className="hidden md:flex items-center gap-1 rounded-full border border-violet-400/15 bg-white/5 px-1.5 py-1.5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-full px-4 py-1.5 text-sm font-medium text-[#ede7d6]/75 transition-colors hover:bg-[#8b5cf6]/10 hover:text-[#a78bfa]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => router.push("/login")}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#ede7d6]/80 transition-colors hover:text-[#a78bfa]"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="rounded-full bg-[#8b5cf6] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#7c3aed]"
              >
                Register
              </button>
            </>
          ) : (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                aria-expanded={userMenuOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-[#ede7d6] ring-1 ring-violet-400/15 transition-colors hover:bg-[#8b5cf6]/15"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
                  <path
                    d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.14 0-7.5 2.24-7.5 5v1a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-1c0-2.76-3.36-5-7.5-5Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-2xl border border-violet-400/15 bg-[#0f0f0f]/95 p-1.5 shadow-xl backdrop-blur-md animate-[fadeIn_0.12s_ease-out]">
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[#ede7d6]/85 transition-colors hover:bg-[#8b5cf6]/10 hover:text-[#a78bfa]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#a78bfa]">
                      <path
                        d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.14 0-7.5 2.24-7.5 5v1a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-1c0-2.76-3.36-5-7.5-5Z"
                        fill="currentColor"
                      />
                    </svg>
                    Profile
                  </Link>
                  <div className="my-1 h-px bg-violet-400/15" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path
                        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-violet-400/15 transition-colors hover:bg-[#8b5cf6]/10"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#ede7d6]">
            {mobileOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="overLay h-full">
          <div className="md:hidden border-t border-violet-400/15 bg-[#0a0a0a]/95 backdrop-blur-md px-4 pb-6 pt-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-[#ede7d6]/85 transition-colors hover:bg-[#8b5cf6]/10 hover:text-[#a78bfa]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 h-px bg-violet-400/15" />

            {!isLoggedIn ? (
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    router.push("/login");
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-full border border-violet-400/20 px-4 py-2.5 text-sm font-medium text-[#ede7d6] transition-colors hover:border-violet-400/40 hover:text-[#a78bfa]"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    router.push("/register");
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-full bg-[#8b5cf6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7c3aed]"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-1">
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-[15px] font-medium text-[#ede7d6]/85 transition-colors hover:bg-[#8b5cf6]/10 hover:text-[#a78bfa]"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}