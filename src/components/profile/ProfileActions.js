"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiUserPlus, FiUserCheck, FiMessageCircle, FiShare2 } from "react-icons/fi";

function ActionButton({ children, onClick, active = false, ariaLabel }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-xl transition-all duration-300 ${
        active
          ? "border-[#8b5cf6]/60 bg-[#8b5cf6]/15 text-[#ede7d6] shadow-[0_0_20px_rgba(139,92,246,0.35)]"
          : "border-[#a78bfa]/15 bg-[#0a0a0a]/60 text-[#ede7d6]/80 hover:border-[#8b5cf6]/40 hover:text-[#ede7d6] hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]"
      }`}
    >
      {children}
    </motion.button>
  );
}

export default function ProfileActions() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <ActionButton
        ariaLabel={isFollowing ? "Unfollow" : "Follow"}
        active={isFollowing}
        onClick={() => setIsFollowing((prev) => !prev)}
      >
        {isFollowing ? <FiUserCheck size={15} /> : <FiUserPlus size={15} />}
        {isFollowing ? "Following" : "Follow"}
      </ActionButton>

      <ActionButton ariaLabel="Message">
        <FiMessageCircle size={15} />
        Message
      </ActionButton>

      <ActionButton ariaLabel="Share profile">
        <FiShare2 size={15} />
        Share
      </ActionButton>
    </div>
  );
}