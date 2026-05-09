"use client";

import { motion } from "framer-motion";
import { TECH_MARQUEE } from "@/lib/constants";

const MarqueeRow = ({ items, direction = "left" }: { items: string[], direction?: "left" | "right" }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
      <motion.div
        animate={{
          x: direction === "left" ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        className="flex gap-12 py-4"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-2xl md:text-3xl font-black text-dark/10 tracking-tighter uppercase"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const TechMarquee = () => {
  return (
    <section className="bg-white border-y border-border">
      <div className="space-y-0">
        <MarqueeRow items={TECH_MARQUEE} direction="left" />
        <MarqueeRow items={[...TECH_MARQUEE].reverse()} direction="right" />
      </div>
    </section>
  );
};
