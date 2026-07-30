"use client";

import BentoCard from "./BentoCard";

/** @param {{ blogs: object[] }} props */
export default function BentoGrid({ blogs }) {
  const [top, center, bottomLeft, topRight, last] = blogs;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(200px,1fr)] md:gap-5">
      <BentoCard blog={top} area="top" size="featured" className="md:col-span-2 md:col-start-1 md:row-start-1" />
      <BentoCard blog={center} area="center" size="featured" className="md:col-span-1 md:col-start-3 md:row-span-2 md:row-start-1" />
      <BentoCard blog={topRight} area="topRight" size="compact" className="md:col-span-1 md:col-start-4 md:row-start-1" />
      <BentoCard blog={bottomLeft} area="bottomLeft" size="featured" className="md:col-span-2 md:col-start-1 md:row-start-2" />
      <BentoCard blog={last} area="last" size="compact" className="md:col-span-1 md:col-start-4 md:row-start-2" />
    </div>
  );
}