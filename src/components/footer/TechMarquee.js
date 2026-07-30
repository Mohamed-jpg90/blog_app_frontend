import { Marquee } from "../ui/marquee";

const stack = [
  "React", "Next.js", "Node.js", "MongoDB", "Express", "JavaScript",
  "TypeScript", "Tailwind CSS", "Framer Motion", "Magic UI", "REST API",
  "Git", "GitHub", "Docker", "UI/UX", "Frontend", "Backend", "Web Development",
];

function Pill({ label }) {
  return (
    <span className="flex shrink-0 items-center rounded-full border border-violet-400/15 bg-white/[0.03] px-5 py-2 text-sm text-[#ede7d6]/60 backdrop-blur-sm transition-all duration-300 hover:border-[#d4af6a]/50 hover:bg-[#d4af6a]/[0.06] hover:text-[#d4af6a]">
      {label}
    </span>
  );
}

export default function TechMarquee() {
  return (
    <div className="relative w-full">
      <Marquee pauseOnHover className="[--duration:38s]">
        {stack.map((item) => (
          <Pill key={item} label={item} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent sm:w-28" />
    </div>
  );
}