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
import EditProfilePage from "@/components/profile/EditProfile";
import ChangePasswordPage from "@/components/profile/ChangePasswordPage";

import BaseUrl from "@/config/api";

export default function ProfilePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Posts");
  const [posts, setPosts] = useState(null); // null = still loading, [] = loaded & empty
  const [user, setUser] = useState(null);

  const readCachedUser = () => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const { password, tokens, ...safeUser } = parsed;
      return safeUser;
    } catch {
      return null;
    }
  };

  const fetchUserFromApi = async (token) => {
    try {
      const res = await axios.get(`${BaseUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
      return;
    }

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/api/blog`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.blogs || res.data.data || res.data);
      } catch (err) {
        console.log(err);
        setPosts([]); // stop the skeleton even on failure
      }
    };

    const cached = readCachedUser();
    if (cached) {
      setUser(cached);
    } else {
      fetchUserFromApi(token);
    }

    fetchPosts();
  }, [router]);

  const tabContent = useMemo(
    () => ({
      Posts: (
        <PostsTab
          posts={posts}
          onUpdated={(updatedPost) => {
            setPosts((prev) =>
              prev.map((post) =>
                post._id === updatedPost._id ? updatedPost : post
              )
            );
          }}
          onDeleted={(deletedId) => {
            setPosts((prev) => prev.filter((post) => post._id !== deletedId));
          }}
        />
      ),
      Edit: (
        <EditProfilePage
          currentUser={user}
          onUpdated={(updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }}
        />
      ),
      change: <ChangePasswordPage />,
    }),
    [posts, user]
  );

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-[#ede7d6]">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#4c3a99]/25 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-[#6d5bd0]/15 blur-[120px]" />

        <Particles className="absolute inset-0" quantity={70} color="#a78bfa" ease={60} />
      </div>

      <div className="mx-auto w-[90%] pt-28">
        {user && <ProfileGlassCard user={user} />}

        <div className="mx-auto mt-10 max-w-4xl">
          <StickyTabs activeTab={activeTab} onChange={setActiveTab} />

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