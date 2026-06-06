"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { TECH_MARQUEE } from "@/lib/constants";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PREMIUM TECH MARQUEE
   - Smooth infinite scroll using useAnimationFrame
   - Pauses on hover
   - Beautiful separator dots between items
   - Two-row with different speeds
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function InfiniteRow({
  items,
  direction = 1,
  speed = 0.6,
  className = "",
}: {
  items: string[];
  direction?: 1 | -1;
  speed?: number;
  className?: string;
}) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const tripled = [...items, ...items, ...items];

  useAnimationFrame(() => {
    if (paused) return;
    if (!containerRef.current) return;
    const singleWidth = containerRef.current.scrollWidth / 3;
    const current = x.get();
    const next = current + direction * speed;

    if (direction === -1 && Math.abs(next) >= singleWidth) {
      x.set(0);
    } else if (direction === 1 && next >= 0) {
      x.set(-singleWidth);
    } else {
      x.set(next);
    }
  });

  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex w-max items-center gap-0"
      >
        {tripled.map((item, i) => (
          <div key={i} className="flex items-center">
            <motion.span
              whileHover={{ scale: 1.05, color: "#22c55e" }}
              transition={{ duration: 0.2 }}
              className="text-2xl md:text-3xl font-black text-slate-800/10 tracking-tighter uppercase cursor-default whitespace-nowrap px-8 py-4 hover:text-emerald-500 transition-colors duration-200"
            >
              {item}
            </motion.span>
            {/* Separator dot */}
            <span className="w-2 h-2 rounded-full bg-emerald-400/20 flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export const TechMarquee = () => {
  const row2Items = [...TECH_MARQUEE].reverse();

  return (
    <section className="relative bg-white border-y border-emerald-50 overflow-hidden py-2">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-transparent to-emerald-50/30 pointer-events-none" />

      <div className="space-y-1">
        <InfiniteRow items={TECH_MARQUEE} direction={-1} speed={0.55} />
        <InfiniteRow items={row2Items} direction={1} speed={0.4} className="opacity-60" />
      </div>
    </section>
  );
};
