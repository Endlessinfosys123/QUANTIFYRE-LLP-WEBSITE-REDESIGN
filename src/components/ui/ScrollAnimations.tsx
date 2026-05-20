"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";

/* ─── Fade Up — most common scroll reveal ──────────────────── */
export function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Fade In Left ─────────────────────────────────────────── */
export function FadeLeft({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Fade In Right ────────────────────────────────────────── */
export function FadeRight({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scale In ─────────────────────────────────────────────── */
export function ScaleIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger Children ─────────────────────────────────────── */
export function StaggerContainer({ children, className = "", stagger = 0.1 }: { children: ReactNode; className?: string; stagger?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className}
      variants={{
        hidden:  { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax Section ─────────────────────────────────────── */
export function ParallaxSection({ children, speed = 0.3, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -60}px`, `${speed * 60}px`]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
}

/* ─── Reveal Text — letter by letter ──────────────────────── */
export function RevealText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");
  return (
    <motion.span ref={ref} className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <motion.span key={i} className="overflow-hidden inline-block"
          variants={{ hidden: { y: "110%", opacity: 0 }, visible: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── Counter Animate on Scroll ────────────────────────────── */
export function CounterCard({ value, suffix = "", label, color = "#6C3FEF" }: { value: number; suffix?: string; label: string; color?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="text-center"
    >
      <motion.div
        className="text-5xl font-black tabular-nums"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        {inView ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {value}{suffix}
          </motion.span>
        ) : "0"}
      </motion.div>
      <div className="text-xs font-black text-text-secondary uppercase tracking-widest mt-2">{label}</div>
    </motion.div>
  );
}

/* ─── Horizontal Marquee Scroll ────────────────────────────── */
export function MarqueeScroll({ items, speed = 30 }: { items: string[]; speed?: number }) {
  const duplicated = [...items, ...items];
  return (
    <div className="overflow-hidden py-4">
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: [0, `-${50}%`] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {duplicated.map((item, i) => (
          <span key={i} className="px-6 py-3 bg-white border border-border rounded-full text-sm font-black text-text-secondary whitespace-nowrap shadow-sm">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Scroll Progress Bar (global) ────────────────────────── */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[99999] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #10b981, #22c55e, #6ee7b7)" }}
    />
  );
}

/* ─── Blur Reveal ─── text blurs in beautifully ───────────── */
export function BlurReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Spotlight Card ─── green glow follows cursor ────────── */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(250px circle at ${x}px ${y}px, rgba(34,197,94,0.08), transparent 80%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      className={`relative overflow-hidden ${className}`}
      style={{ background } as any}
    >
      {children}
    </motion.div>
  );
}

/* ─── Typewriter Text ─── chars appear one by one ─────────── */
export function TypewriterText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const chars = text.split("");
  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: delay } } }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── Slide Up Fade ─── smooth section entrance ────────────── */
export function SlideUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
