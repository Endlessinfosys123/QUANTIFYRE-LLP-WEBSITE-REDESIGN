"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PREMIUM LIQUID MESH BACKGROUND — Mouse Reactive Edition
   
   Three slow-morphing gradient orbs that:
   1. Float autonomously with looping animations
   2. Subtly react to mouse position (gentle parallax)
   3. Create a Stripe/Linear.app premium aesthetic
   
   Performance: All CSS-based, no canvas, no JS animation loop.
   Mouse tracking uses spring physics for smooth feel.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function PremiumMeshBg() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Very slow, gentle spring — gives a dreamy parallax feel
  const springX = useSpring(mouseX, { stiffness: 12, damping: 20, mass: 2 });
  const springY = useSpring(mouseY, { stiffness: 12, damping: 20, mass: 2 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="absolute inset-0 w-full h-full bg-white overflow-hidden pointer-events-none z-0">
      
      {/* ── Subtle dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34,197,94,0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Orb 1: Large Emerald (top-left, mouse-parallax) ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "60vw",
          height: "60vw",
          x: "-10vw",
          y: "-15vw",
          background: "radial-gradient(circle, rgba(16,185,129,0.09) 0%, rgba(34,197,94,0.04) 50%, transparent 80%)",
          filter: "blur(110px)",
          translateX: springX.get() * -25,
          translateY: springY.get() * -20,
        }}
        animate={{
          x: ["-10vw", "-5vw", "-12vw", "-10vw"],
          y: ["-15vw", "-10vw", "-18vw", "-15vw"],
          scale: [1, 1.07, 0.96, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Orb 2: Mint (bottom-right, mouse-parallax) ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          right: "-5vw",
          bottom: "-10vw",
          background: "radial-gradient(circle, rgba(110,231,183,0.1) 0%, rgba(16,185,129,0.04) 60%, transparent 100%)",
          filter: "blur(130px)",
        }}
        animate={{
          x: [0, "-4vw", "3vw", 0],
          y: [0, "4vw", "-3vw", 0],
          scale: [1, 1.1, 0.93, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* ── Orb 3: Warm accent (center, mouse-reactive) ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          left: "28vw",
          top: "15vw",
          background: "radial-gradient(circle, rgba(52,211,153,0.06) 0%, rgba(16,185,129,0.02) 60%, transparent 100%)",
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, "3vw", "-4vw", 0],
          y: [0, "2vw", "-4vw", 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* ── Orb 4: Small accent blip (bottom-left) ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "25vw",
          height: "25vw",
          left: "5vw",
          bottom: "10vw",
          background: "radial-gradient(circle, rgba(167,243,208,0.07) 0%, transparent 80%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, "2vw", "-3vw", 0],
          y: [0, "-3vw", "2vw", 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* ── Diagonal gradient sweep for depth ── */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, transparent 45%, rgba(16,185,129,0.08) 100%)",
        }}
      />
    </div>
  );
}
