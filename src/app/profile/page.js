"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Particles } from "@/components/ui/particles";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/footer/Footer";

import ProfileGlassCard from "@/components/profile/ProfileGlassCard";
import StickyTabs from "@/components/profile/StickyTabs";

import PostsTab from "@/components/profile/taps/PostsTab";
import LikedTab from "@/components/profile/taps/LikedTab";
import BookmarksTab from "@/components/profile/taps/BookmarksTab";
import AboutTab from "@/components/profile/taps/AboutTab";

import BaseUrl from "@/config/api";

const user = {
  name: "Mohammed",
  role: "Full-stack Developer",
  bio: "Building thoughtful web products with React, Next.js and a soft spot for RTL, Arabic-language interfaces.",
  location: "Cairo, Egypt",
  joinDate: "Jan 2023",
  avatar: "/images/profileImage.png",
  cover: "/images/profile-cover.jpg",
  verified: true,
  followers: 1280,
  following: 96,
  articles: 34,
};

const about = {
  biography:
    "Frontend-leaning full-stack developer working across e-commerce, CRM and blog platforms.",
  skills: [
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "Tailwind CSS",
    "MongoDB",
  ],
  interests: [
    "RTL / Arabic UI",
    "Algorithmic problem-solving",
    "Design systems",
  ],
  experience: [
    {
      title: "Full-stack Developer",
      company: "Freelance",
      period: "2023 — Present",
    },
    {
      title: "Frontend Developer",
      company: "Tawasul",
      period: "2022 — 2023",
    },
  ],
};

export default function ProfilePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Posts");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/");
        return;
      }

      try {
        const res = await axios.get(`${BaseUrl}/api/blog`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(res.data.blogs || res.data.data || res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchuserData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${BaseUrl}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        console.log(res.data);
        
      } catch (e) {
        console.log(e);
      }
    };

    fetchPosts();
    fetchuserData();
  }, [router]);

  const tabContent = useMemo(
    () => ({
      Posts: <PostsTab posts={posts} />,
      Liked: <LikedTab posts={[]} />,
      Bookmarks: <BookmarksTab posts={[]} />,
      About: <AboutTab about={about} />,
    }),
    [posts]
  );

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-[#ede7d6]">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#4c3a99]/25 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-[#6d5bd0]/15 blur-[120px]" />

        <Particles
          className="absolute inset-0"
          quantity={70}
          color="#a78bfa"
          ease={60}
        />
      </div>

      <div className="mx-auto w-[90%] pt-28">
        <ProfileGlassCard user={user ?? {}} />

        <div className="mx-auto mt-10 max-w-4xl">
          <StickyTabs
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </main>
  );
}