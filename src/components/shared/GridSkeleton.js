// components/shared/GridSkeleton.jsx
export default function GridSkeleton({ count = 6, className = "" }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`h-full min-h-[220px] animate-pulse rounded-2xl border border-violet-400/10 bg-white/[0.03] ${className}`}
        />
      ))}
    </>
  );
}