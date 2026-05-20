"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { TechStack3D } from "@/components/ui/TechStack3D";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAGNETIC CURSOR BLOB — follows the mouse with spring physics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CursorBlob({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 20, mass: 1 };
  const blobX = useSpring(mouseX, springConfig);
  const blobY = useSpring(mouseY, springConfig);

  // Secondary slower blob
  const slowConfig = { stiffness: 30, damping: 18, mass: 1.2 };
  const blob2X = useSpring(mouseX, slowConfig);
  const blob2Y = useSpring(mouseY, slowConfig);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [containerRef, mouseX, mouseY]);

  return (
    <>
      {/* Primary large soft blob */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          x: blobX,
          y: blobY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, rgba(16,185,129,0.04) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {/* Secondary smaller tighter glow */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 200,
          height: 200,
          x: blob2X,
          y: blob2Y,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CUSTOM CURSOR DOT — replaces default cursor inside hero
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CustomCursor({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isInside, setIsInside] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const springCfg = { stiffness: 400, damping: 30 };
  const cursorX = useSpring(mouseX, springCfg);
  const cursorY = useSpring(mouseY, springCfg);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onEnter = () => setIsInside(true);
    const onLeave = () => setIsInside(false);

    // Detect hovering over interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.closest("a, button, [role='button']") !== null
      );
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mousemove", onOver);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mousemove", onOver);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, mouseX, mouseY]);

  if (!isInside) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9990] rounded-full"
        style={{
          x: cursorX, y: cursorY,
          translateX: "-50%", translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          border: isHovering ? "2px solid rgba(34,197,94,0.8)" : "1.5px solid rgba(34,197,94,0.5)",
          backgroundColor: isHovering ? "rgba(34,197,94,0.08)" : "transparent",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9991] rounded-full bg-primary"
        style={{
          x: cursorX, y: cursorY,
          translateX: "-50%", translateY: "-50%",
          width: 5, height: 5,
          boxShadow: "0 0 8px rgba(34,197,94,0.6)",
        }}
      />
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAGNETIC BUTTON WRAPPER — buttons attract toward cursor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MagneticWrapper({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TILT CARD — 3D tilt on the right side visual
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 8);
    rotateY.set(dx * 8);
  }, [rotateX, rotateY]);

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springRX, rotateY: springRY, transformStyle: "preserve-3d", perspective: 800 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN HERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const Hero = ({ data, stats }: { data?: any; stats?: any[] }) => {
  const heroRef = useRef<HTMLElement>(null);
  const heroBadge = data?.badge_text || "Enterprise IT Engineering";
  const heroTitle = data?.heading_line1 || "Build High-Performance Software.";
  const heroSubtitle = data?.subtext || "We are a technology agency building scalable web applications, enterprise ERPs, and AI-driven automation systems for modern businesses.";
  const primaryCTA = data?.cta1_label || "Start a Project";
  const primaryLink = data?.cta1_link || "/contact";

  const systemBadges = data?.extra_json?.system_badges || [
    { text: "AI-Powered",      emoji: "⚡" },
    { text: "Enterprise Grade", emoji: "🛡️" },
    { text: "Fast Delivery",    emoji: "🚀" },
    { text: "Innovative Tech",  emoji: "💡" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white tech-grid min-h-screen flex items-center cursor-none"
    >
      {/* ── Cursor tracking effects ── */}
      <CursorBlob containerRef={heroRef} />
      <CustomCursor containerRef={heroRef} />

      {/* ── Static subtle glows ── */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none animate-morph-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none animate-morph-blob delay-300" />

      {/* ── Floating system badges ── */}
      {systemBadges.slice(0, 4).map((badge: any, i: number) => {
        const positions = [
          "top-40 left-[8%]",
          "bottom-48 left-[5%]",
          "top-48 right-[5%]",
          "bottom-44 right-[6%]",
        ];
        const animVars = [
          { y: [0, -16, 0], rotate: [0, -4, 4, 0] },
          { y: [0, 14, 0],  rotate: [0, 3, -3, 0] },
          { y: [0, -12, 0], rotate: [0, 4, -4, 0] },
          { y: [0, 18, 0],  rotate: [0, -3, 3, 0] },
        ];
        return (
          <motion.div
            key={i}
            animate={animVars[i]}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            className={`absolute ${positions[i]} hidden xl:flex items-center gap-2 bg-white border-2 border-border rounded-2xl px-4 py-3 shadow-lg text-sm font-black text-dark pointer-events-none`}
            style={{ boxShadow: "0 4px 20px rgba(34,197,94,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <span className="text-xl">{typeof badge === "string" ? "✨" : badge.emoji}</span>
            {typeof badge === "string" ? badge : badge.text}
          </motion.div>
        );
      })}

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text & CTA ── */}
          <div className="max-w-2xl space-y-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-surface border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest"
            >
              <Sparkles size={14} className="text-accent" />
              {heroBadge}
            </motion.div>

            {/* Headline */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-dark tracking-tighter leading-[0.95] text-balance"
              >
                {heroTitle.split("<br />").map((line: string, i: number) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < heroTitle.split("<br />").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary font-medium max-w-lg leading-relaxed text-pretty"
              >
                {heroSubtitle}
              </motion.p>
            </div>

            {/* CTAs — magnetic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4"
            >
              <MagneticWrapper>
                <Button
                  href={primaryLink}
                  size="lg"
                  className="w-full sm:w-auto px-10 h-16 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 cursor-none"
                >
                  {primaryCTA} <ArrowRight className="ml-2" size={20} />
                </Button>
              </MagneticWrapper>
              <MagneticWrapper>
                <Button
                  href="/portfolio"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-10 h-16 rounded-xl font-bold text-lg bg-white shadow-sm hover:bg-surface cursor-none"
                >
                  View Capabilities
                </Button>
              </MagneticWrapper>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-10 flex items-center gap-8 text-sm font-bold text-text-secondary"
            >
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-surface flex items-center justify-center shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full rounded-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <span className="text-dark font-black">
                  {stats?.find(s => s.label?.toLowerCase().includes("business"))?.value || "50+"}
                </span>{" "}
                Businesses Trust Us
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D Visual with tilt ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="relative lg:h-[600px] w-full flex items-center justify-center"
          >
            {/* Glow behind */}
            <motion.div
              className="absolute w-[450px] h-[450px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(34,197,94,0.08), transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Tilt + TechStack3D */}
            <TiltCard>
              <div className="relative z-10 w-full">
                <TechStack3D />
              </div>
            </TiltCard>

            {/* Floating emoji badges */}
            {["🚀", "⚡", "🔥"].map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl pointer-events-none z-20"
                style={{ right: `${10 + i * 25}%`, top: `${15 + i * 20}%` }}
                animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
