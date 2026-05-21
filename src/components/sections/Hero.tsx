"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Zap, Code2, Brain, BarChart3, Smartphone, PenTool } from "lucide-react";
import { TechStack3D } from "@/components/ui/TechStack3D";
import type { Variants } from "framer-motion";

const EASE_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAGNETIC CURSOR BLOB — follows mouse with spring physics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CursorBlob({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blobX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const blobY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const blob2X = useSpring(mouseX, { stiffness: 30, damping: 18 });
  const blob2Y = useSpring(mouseY, { stiffness: 30, damping: 18 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [containerRef, mouseX, mouseY]);

  return (
    <>
      <motion.div className="absolute pointer-events-none rounded-full" style={{
        width: 600, height: 600, x: blobX, y: blobY,
        translateX: "-50%", translateY: "-50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, rgba(16,185,129,0.03) 50%, transparent 70%)",
        filter: "blur(24px)",
      }} />
      <motion.div className="absolute pointer-events-none rounded-full" style={{
        width: 180, height: 180, x: blob2X, y: blob2Y,
        translateX: "-50%", translateY: "-50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
        filter: "blur(6px)",
      }} />
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CUSTOM CURSOR DOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CustomCursor({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isInside, setIsInside] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const cursorY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsHovering(!!(e.target as HTMLElement).closest("a, button, [role='button']"));
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", () => setIsInside(true));
    el.addEventListener("mouseleave", () => setIsInside(false));
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", () => setIsInside(true));
      el.removeEventListener("mouseleave", () => setIsInside(false));
    };
  }, [containerRef, mouseX, mouseY]);

  if (!isInside) return null;
  return (
    <>
      <motion.div className="fixed pointer-events-none z-[9990] rounded-full"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: isHovering ? 48 : 32, height: isHovering ? 48 : 32,
          border: isHovering ? "2px solid rgba(34,197,94,0.9)" : "1.5px solid rgba(34,197,94,0.5)",
          backgroundColor: isHovering ? "rgba(34,197,94,0.08)" : "transparent" }}
        transition={{ duration: 0.18 }}
      />
      <motion.div className="fixed pointer-events-none z-[9991] rounded-full bg-primary"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", width: 5, height: 5,
          boxShadow: "0 0 8px rgba(34,197,94,0.7)" }}
      />
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAGNETIC BUTTON WRAPPER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MagneticWrapper({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top  + r.height / 2)) * strength);
  }, [x, y, strength]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VERTICAL SCROLLING SERVICE TICKER (right side)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const SERVICES_TICKER = [
  { icon: Brain,      label: "AI Automation",       color: "#8b5cf6" },
  { icon: Code2,      label: "Software Engineering", color: "#0ea5e9" },
  { icon: Zap,        label: "Web Development",      color: "#22c55e" },
  { icon: BarChart3,  label: "Digital Marketing",    color: "#f59e0b" },
  { icon: Smartphone, label: "Mobile Development",   color: "#ef4444" },
  { icon: PenTool,    label: "UI/UX Design",         color: "#a855f7" },
];

function ServiceTicker() {
  const doubled = [...SERVICES_TICKER, ...SERVICES_TICKER];
  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-10">
      <motion.div
        className="flex flex-col gap-3"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-sm whitespace-nowrap"
              style={{ boxShadow: `0 2px 12px ${s.color}15` }}
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${s.color}18` }}>
                <Icon size={12} style={{ color: s.color }} />
              </div>
              <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider">{s.label}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATED COUNTER — counts up from 0 to value
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const numVal = parseInt(value.replace(/\D/g, "")) || 0;

  useEffect(() => {
    let start = 0;
    const dur = 1600;
    const step = 16;
    const timer = setInterval(() => {
      start += step;
      const progress = Math.min(start / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numVal));
      if (start >= dur) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [numVal]);

  return <>{count}{suffix}</>;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROTATING WORDS — cycles through dynamic words in headline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ROTATING_WORDS = ["Faster.", "Smarter.", "Scalable.", "Profitable."];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden h-[1.05em] align-bottom" style={{ minWidth: "11rem" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="absolute inset-0 text-primary font-black"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_EXPO }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TILT CARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRX = useSpring(rotX, { stiffness: 80, damping: 20 });
  const sRY = useSpring(rotY, { stiffness: 80, damping: 20 });
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rotX.set(-((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 8);
    rotY.set(  ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) * 8);
  }, [rotX, rotY]);
  const onLeave = useCallback(() => { rotX.set(0); rotY.set(0); }, [rotX, rotY]);
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: sRX, rotateY: sRY, transformStyle: "preserve-3d", perspective: 800 }}
      className="w-full">
      {children}
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN HERO EXPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const Hero = ({ data, stats }: { data?: any; stats?: any[] }) => {
  const heroRef = useRef<HTMLElement>(null);
  const heroBadge   = data?.badge_text  || "Enterprise IT Engineering";
  const heroSubtitle = data?.subtext    || "We build scalable web apps, enterprise ERPs, and AI-driven automation systems for businesses that demand excellence.";
  const primaryCTA  = data?.cta1_label  || "Start a Project";
  const primaryLink = data?.cta1_link   || "/contact";

  /* Word variants for stagger */
  const containerV: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
  };
  const wordV: Variants = {
    hidden:   { y: "110%", opacity: 0 },
    visible:  { y: "0%",   opacity: 1, transition: { duration: 0.55, ease: EASE_EXPO } },
  };

  const headlineWords = ["Build", "High-Performance"];

  return (
    <section
      ref={heroRef}
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-white/90 min-h-screen flex items-center cursor-none"
    >
      {/* Cursor */}
      <CursorBlob containerRef={heroRef} />
      <CustomCursor containerRef={heroRef} />

      {/* Subtle top green gradient wash */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />

      {/* Animated accent top line */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: EASE_EXPO }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left z-10"
        style={{ background: "linear-gradient(90deg, #22c55e, #10b981, #6ee7b7, transparent)" }}
      />

      {/* Vertical service ticker (right edge) */}
      <ServiceTicker />

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text & CTA ── */}
          <div className="max-w-2xl space-y-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm"
            >
              <Sparkles size={13} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{heroBadge}</span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* ── HEADLINE: Word-by-word slide up + rotating word ── */}
            <div className="space-y-3">
              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl font-black text-dark tracking-tighter leading-[0.92]"
                variants={containerV}
                initial="hidden"
                animate="visible"
              >
                {/* Line 1 — word by word */}
                <div className="block">
                  {headlineWords.map((word, i) => (
                    <span key={i} className="overflow-hidden inline-block leading-[1.1] mr-3">
                      <motion.span className="inline-block" variants={wordV}>{word}</motion.span>
                    </span>
                  ))}
                </div>
                {/* Line 2 — "Software." with gradient */}
                <div className="block overflow-hidden leading-[1.1]">
                  <motion.span
                    className="inline-block text-transparent bg-clip-text"
                    style={{ backgroundImage: "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #059669 100%)" }}
                    variants={wordV}
                  >
                    Software.
                  </motion.span>
                </div>
                {/* Line 3 — "delivered" + rotating word */}
                <div className="block flex flex-wrap items-center gap-2 mt-1">
                  <span className="overflow-hidden inline-block leading-[1.1]">
                    <motion.span className="inline-block text-slate-400 text-5xl md:text-6xl font-black" variants={wordV}>
                      Delivered
                    </motion.span>
                  </span>
                  <RotatingWord />
                </div>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.7, duration: 0.65 }}
              className="text-xl text-text-secondary font-medium max-w-lg leading-relaxed text-pretty"
            >
              {heroSubtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <MagneticWrapper>
                <Button href={primaryLink} size="lg"
                  className="w-full sm:w-auto px-10 h-16 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/35 cursor-none">
                  {primaryCTA} <ArrowRight className="ml-2" size={20} />
                </Button>
              </MagneticWrapper>
              <MagneticWrapper>
                <Button href="/portfolio" variant="outline" size="lg"
                  className="w-full sm:w-auto px-10 h-16 rounded-2xl font-black text-lg bg-white border-emerald-100 hover:border-primary hover:text-primary cursor-none shadow-sm">
                  View Our Work
                </Button>
              </MagneticWrapper>
            </motion.div>

            {/* ── Stat row with animated counters ── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 1.0 } } }}
              className="flex flex-wrap gap-6 pt-4 border-t border-emerald-50"
            >
              {[
                { val: stats?.find(s => s.label?.toLowerCase().includes("project"))?.value || "12+", label: "Projects", suffix: "" },
                { val: stats?.find(s => s.label?.toLowerCase().includes("client") || s.label?.toLowerCase().includes("business"))?.value || "8+", label: "Clients", suffix: "" },
                { val: stats?.find(s => s.label?.toLowerCase().includes("countr"))?.value || "4", label: "Countries", suffix: "" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } } }}
                  className="flex flex-col"
                >
                  <span className="text-3xl font-black text-dark leading-none">
                    <AnimatedCounter value={s.val.replace(/\D/g, "") || "0"} suffix={s.val.replace(/[0-9]/g, "") || "+"} />
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: 3D TechStack with tilt ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
            className="relative lg:h-[600px] w-full flex items-center justify-center"
          >
            {/* Emerald glow behind card */}
            <motion.div
              className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(34,197,94,0.08), transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <TiltCard>
              <div className="relative z-10 w-full">
                <TechStack3D />
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
