// "use client";

// import { motion } from "framer-motion";
// import { FiMapPin, FiCalendar } from "react-icons/fi";
// import ProfileAvatar from "./ProfileAvatar";
// import ProfileActions from "./ProfileActions";
// import ProfileStatCard from "./ProfileStatCard";
// // import { riseIn } from "@/lib/motion-variants";
// import { riseIn } from "../lib/motion-variants";
// // import {riseIn}

// export default function ProfileGlassCard({ user }) {
//     return (
//         <motion.div
//             variants={riseIn}
//             initial="hidden"
//             animate="show"
//             custom={0.1}
//             className="relative z-10 mx-auto -mt-10 w-full max-w-4xl rounded-[28px] border border-[#a78bfa]/15 bg-[#0a0a0a]/75 px-6 pb-6 pt-0 backdrop-blur-2xl sm:px-8"
//         >
//             <div className="flex flex-col items-center text-cente  sm:flex-row sm:items-end sm:gap-6 sm:text-left">
//                 <div>
//                     <ProfileAvatar alt={user.name} verified={user.verified} />

//                 </div>

//                 <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-3">
//                     <h1 className="text-2xl font-semibold text-[#ede7d6] sm:text-3xl">
//                         {user.name}
//                     </h1>

//                 </div>

//                 {/* <div className="mt-4 sm:mt-0 sm:pb-2">


//           <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-[#ede7d6]/50 sm:justify-start">
//             <span className="flex items-center gap-1.5">
//               <FiMapPin size={13} /> {user.location}
//             </span>
//             <span className="flex items-center gap-1.5">
//               <FiCalendar size={13} /> Joined {user.joinDate}
//             </span>
//           </div>
//         </div>

//         <div className="mt-5 sm:mt-0 sm:pb-2">
//           <ProfileActions />
//         </div> */}


//             </div>

//             {user.bio && (
//                 <p className="mx-automt-3 max-w-2xl text-sm leading-7 text-[#ede7d6]/65 sm:mx-0 sm:text-left">
//                     {user.bio}
//                 </p>
//             )}

//             <div className="mt-6 grid grid-cols-3 gap-3 sm:max-w-md">
//                 <ProfileStatCard label="Followers" value={user.followers} delay={0.05} />
//                 <ProfileStatCard label="Following" value={user.following} delay={0.1} />
//                 <ProfileStatCard label="Articles" value={user.articles} delay={0.15} />
//             </div>
//         </motion.div>
//     );
// }




"use client";

import { motion } from "framer-motion";
import ProfileAvatar from "./ProfileAvatar";
import ProfileStatCard from "./ProfileStatCard";
import { riseIn } from "../lib/motion-variants";

export default function ProfileGlassCard({ user = {} }) {
  return (
    <motion.div
      variants={riseIn}
      initial="hidden"
      animate="show"
      custom={0.1}
      className="relative z-10 mx-auto -mt-10 w-full max-w-4xl rounded-[28px] border border-[#a78bfa]/15 bg-[#0a0a0a]/75 px-6 py-8 backdrop-blur-2xl"
    >
      {/* Avatar + Name */}
      <div className="flex flex-col items-center text-center">
        <ProfileAvatar
          src={user.image || null }
        />

        <h1 className="mt-5 text-3xl font-bold text-[#ede7d6]">
          {user.firstName +"  "+ user.lastName || "unkonwn User"}
        </h1>

        {user.email && (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#ede7d6]/65">
            {user.email || "No bio available"}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="mt-10 flex justify-center">
        <div className="grid w-full max-w-xl grid-cols-3 gap-4">
          <ProfileStatCard
            label="Followers"
            value={user.followers ?? 0}
            delay={0.1}
          />

          <ProfileStatCard
            label="Following"
            value={user.following ?? 0}
            delay={0.05}
          />

          <ProfileStatCard
            label="Articles"
            value={user.articles ?? 0}
            delay={0.15}
          />

        </div>
      </div>
    </motion.div>
  );
}