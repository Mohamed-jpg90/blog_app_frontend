"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { Particles } from "../ui/particles";
import GradientBackground from "../home/GradientBackground";
import FooterReveal from "./FooterReveal";
import TechMarquee from "./TechMarquee";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blogs" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const resources = [
  { label: "Latest Articles", href: "/blogs" },
  { label: "Popular Topics", href: "/categories" },
  { label: "Newsletter", href: "#newsletter" },
];

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: HiOutlineMail, label: "Email", href: "mailto:hello@myblog.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    /* Outer wrapper creates spacing from the preceding section */
    <div className="mt-16 sm:mt-24 lg:mt-32 w-full">
      <FooterReveal>
        <footer className="relative overflow-hidden rounded-t-[2rem] border-x border-t border-violet-400/15 bg-[#0a0a0a]/80  backdrop-blur-2xl sm:rounded-t-[2.75rem] lg:rounded-t-[3.25rem]">
          {/* Background layer — same system as Hero: animated gradient + particles */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <GradientBackground />
            <Particles
              className="absolute inset-0"
              quantity={90}
              ease={70}
              color="#a78bfa"
              staticity={40}
            />
          </div>

          {/* Top sheen — sells the glass edge */}
          {/* <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/25 to-transparent"
          /> */}

          {/* Infinite marquee strip */}
          {/* <div className="relative border-b border-violet-400/15 py-6">
            <TechMarquee />
          </div> */}

          <div className="relative mx-auto max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] px-5 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div className="grid grid-cols-1 gap-10 xs:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] 2xl:gap-16">
              
              {/* Brand */}
              <div className="max-w-sm col-span-1 xs:col-span-2 lg:col-span-1">
                <Link
                  href="/"
                  className="text-2xl font-semibold tracking-tight text-[#ede7d6] sm:text-3xl"
                >
                  MyBlog
                </Link>
                <p className="mt-4 text-sm leading-relaxed text-[#ede7d6]/55 sm:text-base">
                  Stories, thoughts &amp; ideas worth reading — a quiet corner
                  of the internet for writing that matters.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {socials.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/20 bg-white/[0.03] text-[#ede7d6]/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af6a]/50 hover:text-[#d4af6a] hover:shadow-[0_0_24px_-6px_rgba(212,175,106,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a]/60"
                    >
                      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <nav aria-label="Footer navigation">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ede7d6]/40">
                  Navigation
                </h3>
                <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                  {navigation.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-[#ede7d6]/65 transition-colors duration-300 hover:text-[#d4af6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a]/60"
                      >
                        {item.label}
                        <HiOutlineArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Resources */}
              <nav aria-label="Resources">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ede7d6]/40">
                  Resources
                </h3>
                <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                  {resources.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-[#ede7d6]/65 transition-colors duration-300 hover:text-[#d4af6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a]/60"
                      >
                        {item.label}
                        <HiOutlineArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Newsletter */}
              <div id="newsletter" className="col-span-1 xs:col-span-2 lg:col-span-1">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ede7d6]/40">
                  Newsletter
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#ede7d6]/55 sm:mt-5">
                  Get new stories delivered straight to your inbox. No spam,
                  ever.
                </p>
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    aria-label="Email address"
                    className="w-full rounded-full border border-violet-400/20 bg-white/[0.03] px-4 py-2.5 text-sm text-[#ede7d6] placeholder:text-[#ede7d6]/35 outline-none transition-colors duration-300 focus:border-[#d4af6a]/50"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 rounded-full border border-violet-400/25 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-[#ede7d6]/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af6a]/60 hover:bg-[#d4af6a]/10 hover:text-[#d4af6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a]/60"
                  >
                    Join
                  </button>
                </form>
                {submitted && (
                  <p className="mt-2 text-xs text-[#d4af6a]/80">
                    Thanks — you&apos;re subscribed.
                  </p>
                )}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-violet-400/15 pt-8 sm:mt-16 sm:flex-row">
              <p className="text-center text-xs text-[#ede7d6]/40 sm:text-left">
                © {new Date().getFullYear()} MyBlog. All rights reserved.
              </p>
              <p className="text-center text-xs text-[#ede7d6]/40 sm:text-right">
                Made with <span className="text-[#d4af6a]">❤</span> using
                Next.js &amp; Tailwind CSS.
              </p>
            </div>
          </div>
        </footer>
      </FooterReveal>
    </div>
  );
}