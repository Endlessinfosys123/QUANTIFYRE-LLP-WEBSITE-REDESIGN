"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PREMIUM LIQUID MESH BACKGROUND
   An ultra-modern, luxury-tier background animation. It renders
   slow-morphing, liquid gradient orbs blending emerald, mint,
   cream, and white. This creates a Stripe/Linear-like premium
   tech aesthetic that stays clean and bright without clutter.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function PremiumMeshBg() {
  return (
    <div className="absolute inset-0 w-full h-full bg-white overflow-hidden pointer-events-none z-0">
      {/* ── Grid Pattern (Subtle & clean) ── */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(34,197,94,0.12) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Soft Liquid Gradient Orbs ── */}
      {/* Orb 1: Pale Emerald */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "55vw",
          height: "55vw",
          left: "-10vw",
          top: "-15vw",
          background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, rgba(34,197,94,0.02) 60%, transparent 100%)",
          filter: "blur(120px)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2: Soft Mint */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "45vw",
          height: "45vw",
          right: "-5vw",
          bottom: "-10vw",
          background: "radial-gradient(circle, rgba(110,231,183,0.08) 0%, rgba(16,185,129,0.02) 70%, transparent 100%)",
          filter: "blur(140px)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Orb 3: Cream / Warm Glow to soften green */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "35vw",
          height: "35vw",
          left: "30vw",
          top: "20vw",
          background: "radial-gradient(circle, rgba(250,204,21,0.035) 0%, rgba(253,224,71,0.01) 60%, transparent 100%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 20, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* ── Soft glowing accent lines ── */}
      <div 
        className="absolute inset-0 opacity-[0.1]"
        style={{
          background: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, transparent 40%, rgba(16,185,129,0.08) 100%)",
        }}
      />
    </div>
  );
}
