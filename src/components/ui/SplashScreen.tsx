"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// ── Cartoon SVG Components ────────────────────────────────────────────────

function QuantifyreLogoMark() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
      {/* Outer hex */}
      <motion.path
        d="M40 4L72 22V58L40 76L8 58V22L40 4Z"
        stroke="#6366f1" strokeWidth="3" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      {/* Inner Q */}
      <motion.text
        x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
        fill="#6366f1" fontSize="34" fontWeight="900" fontFamily="system-ui"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
      >
        Q
      </motion.text>
    </svg>
  );
}

function CartoonRocketLaunch() {
  return (
    <motion.svg
      viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-24"
      initial={{ y: 0 }}
      animate={{ y: [-5, -180], opacity: [1, 1, 0] }}
      transition={{ delay: 2.2, duration: 0.8, ease: [0.6, -0.05, 0.8, 1] }}
    >
      {/* Body */}
      <path d="M40 8C40 8 24 24 24 48H56C56 24 40 8 40 8Z" fill="var(--primary)" stroke="var(--color-dark)" strokeWidth="2.5" strokeLinejoin="round"/>
      <rect x="28" y="48" width="24" height="22" rx="3" fill="var(--color-accent)" stroke="var(--color-dark)" strokeWidth="2"/>
      {/* Fins */}
      <path d="M24 58L14 66L24 72V58Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M56 58L66 66L56 72V58Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Window */}
      <circle cx="40" cy="32" r="8" fill="white" stroke="var(--color-dark)" strokeWidth="2"/>
      <circle cx="40" cy="32" r="5" fill="#bae6fd"/>
      <circle cx="38" cy="30" r="1.5" fill="white" opacity="0.8"/>
      {/* Flame */}
      <motion.g
        animate={{ scaleY: [1, 1.5, 0.8, 1.4, 1], scaleX: [1, 0.8, 1.2, 0.9, 1] }}
        transition={{ duration: 0.3, repeat: Infinity }}
        style={{ transformOrigin: "40px 72px" }}
      >
        <path d="M32 70 Q40 92 48 70" stroke="#f97316" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <path d="M35 74 Q40 96 45 74" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path d="M38 77 Q40 94 42 77" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </motion.g>
    </motion.svg>
  );
}

function StarFloat({ x, y, size, delay, color }: { x: string; y: string; size: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], rotate: [0, 180, 360] }}
      transition={{ delay, duration: 2, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
        <path d="M12 2l2.4 7.6H22l-6.1 4.8 2.4 7.6L12 17.2 5.7 22l2.4-7.6L2 9.6h7.6L12 2z"/>
      </svg>
    </motion.div>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────

function LoadingBar({ progress }: { progress: number }) {
  return (
    <div className="w-72 h-2 bg-border rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      />
    </div>
  );
}

// ── Main SplashScreen ─────────────────────────────────────────────────────

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "launching" | "done">("loading");

  // Fake progress
  useEffect(() => {
    const steps = [15, 30, 45, 60, 75, 88, 95, 100];
    let i = 0;
    const timer = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(timer);
        setPhase("launching");
        setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 600);
        }, 1200);
      }
    }, 260);
    return () => clearInterval(timer);
  }, [onComplete]);

  const loadingMessages = [
    "Initializing AI Core…",
    "Loading Design System…",
    "Connecting Tech Stack…",
    "Preparing Launch Sequence…",
    "Deploying Interface…",
    "Almost Ready…",
    "🚀 Ready for Liftoff!",
  ];

  const msgIndex = Math.min(Math.floor(progress / 15), loadingMessages.length - 1);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-40" />

      {/* Morphing blobs */}
      <div className="absolute w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] animate-morph-blob pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-[400px] h-[400px] bg-accent/6 rounded-full blur-[100px] animate-morph-blob delay-300 pointer-events-none top-1/4 left-1/4" />

      {/* Floating Stars */}
      <StarFloat x="10%" y="15%" size={20} delay={0.2} color="#f59e0b" />
      <StarFloat x="85%" y="20%" size={16} delay={0.5} color="#6366f1" />
      <StarFloat x="15%" y="75%" size={14} delay={0.8} color="#0ea5e9" />
      <StarFloat x="80%" y="70%" size={22} delay={0.3} color="#ec4899" />
      <StarFloat x="50%" y="10%" size={12} delay={1.0} color="#22c55e" />
      <StarFloat x="5%" y="50%" size={18} delay={0.6} color="#f59e0b" />
      <StarFloat x="90%" y="45%" size={14} delay={0.9} color="#6366f1" />

      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
          style={{
            transformOrigin: "center",
            left: `calc(50% + ${160 * Math.cos((deg * Math.PI) / 180)}px)`,
            top: `calc(50% + ${160 * Math.sin((deg * Math.PI) / 180)}px)`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        
        {/* Logo + Rocket */}
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
            className="flex flex-col items-center gap-6 mb-8"
          >
            <img src="/logo.png" alt="QUANTIFYRE" className="h-20 md:h-28 w-auto object-contain" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="h-1.5 bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </motion.div>

          {/* Rocket */}
          <AnimatePresence>
            {phase === "launching" && (
              <motion.div
                initial={{ opacity: 1 }}
                className="mb-2"
              >
                <CartoonRocketLaunch />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-5"
        >
          <LoadingBar progress={progress} />
          
          <div className="flex items-center gap-3">
            {/* Animated dots */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
            <motion.span
              key={msgIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-black text-text-secondary uppercase tracking-widest ml-2"
            >
              {loadingMessages[msgIndex]}
            </motion.span>
          </div>

          <div className="text-xs font-bold text-text-secondary/50 tabular-nums">
            {progress}%
          </div>
        </motion.div>
        
      </div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-10 text-xs font-black text-text-secondary/40 uppercase tracking-[0.3em]"
      >
        LLPIN: ACG-0636 · Gandhinagar, India
      </motion.div>
    </motion.div>
  );
}
