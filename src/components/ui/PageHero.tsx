"use client";

import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WORD-BY-WORD SPLIT TEXT — each word slides up independently
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function SplitHeadline({
  text,
  highlight,
  className = "",
  highlightClass = "text-primary",
  delay = 0,
}: {
  text: string;
  highlight?: string;
  className?: string;
  highlightClass?: string;
  delay?: number;
}) {
  const parts = highlight ? text.split(highlight) : [text];
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.045, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
  };

  const renderWords = (str: string, extra = "") =>
    str.split(" ").filter(Boolean).map((w, i) => (
      <span key={`${str}-${i}`} className="overflow-hidden inline-block leading-[1.15]">
        <motion.span variants={word} className={`inline-block ${extra}`}>{w}&nbsp;</motion.span>
      </span>
    ));

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {parts[0] && renderWords(parts[0])}
      {highlight && (
        <span className="overflow-hidden inline-block leading-[1.15]">
          <motion.span variants={word} className={`inline-block ${highlightClass}`}>
            {highlight}&nbsp;
          </motion.span>
        </span>
      )}
      {parts[1] && renderWords(parts[1])}
    </motion.h1>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CHAR-BY-CHAR TYPEWRITER — characters type one by one
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function TypewriterHeadline({
  text,
  className = "",
  delay = 0.3,
  speed = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: speed, delayChildren: delay } } }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   REVEAL LINE — animated underline draw on headline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function UnderlineReveal({ children, delay = 0.8 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.span
        className="absolute left-0 bottom-1 h-[3px] rounded-full"
        style={{ background: "linear-gradient(90deg, #22c55e, #10b981)" }}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay, duration: 0.7, ease: EASE_OUT_EXPO }}
      />
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO BADGE — animated pill above headline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function HeroBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm shadow-emerald-50"
    >
      <span className="flex items-center justify-center w-5 h-5 text-primary">{icon}</span>
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{label}</span>
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FLOATING SHAPE — decorative animated bg element
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function FloatingShape({
  size = 300,
  x = "0%",
  y = "0%",
  color = "rgba(34,197,94,0.06)",
  delay = 0,
  blur = 80,
}: {
  size?: number;
  x?: string;
  y?: string;
  color?: string;
  delay?: number;
  blur?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: `blur(${blur}px)` }}
      animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -15, 0] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO GRID BG — subtle dot/line grid
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function HeroGridBg({ variant = "dots" }: { variant?: "dots" | "lines" }) {
  if (variant === "lines") {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
    );
  }
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(rgba(34,197,94,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STAT CHIP — animated counter chip
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function StatChip({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 18 }}
      className="flex flex-col items-center gap-0.5 px-5 py-3 bg-white rounded-2xl border border-emerald-100 shadow-sm"
    >
      <span className="text-2xl font-black text-dark">{value}</span>
      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{label}</span>
    </motion.div>
  );
}
