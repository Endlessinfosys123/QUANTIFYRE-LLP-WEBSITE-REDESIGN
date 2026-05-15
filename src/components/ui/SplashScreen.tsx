"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo, lazy, Suspense } from "react";

const Spline = lazy(() => import('@splinetool/react-spline').then(mod => ({ default: mod.default })));

const SPLINE_SPLASH_SCENE = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode';

// ── Particle System ──────────────────────────────────────────────────────
function FloatingParticle({ delay, x, y, size, color }: { delay: number; x: string; y: string; size: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, backgroundColor: color }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1.5, 0],
        y: [0, -60, -120],
      }}
      transition={{ delay, duration: 3, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

// ── Orbital Ring ─────────────────────────────────────────────────────────
function OrbitalRing({ radius, duration, dotCount, color, delay = 0 }: { radius: number; duration: number; dotCount: number; color: string; delay?: number }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width: radius * 2, height: radius * 2 }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      {/* Ring border */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: `1px solid ${color}20` }}
      />
      {/* Dots */}
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (i / dotCount) * 360;
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              backgroundColor: color,
              left: `calc(50% + ${radius * Math.cos(rad)}px - 3px)`,
              top: `calc(50% + ${radius * Math.sin(rad)}px - 3px)`,
              boxShadow: `0 0 12px ${color}`,
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        );
      })}
    </motion.div>
  );
}

// ── Glitch Text Effect ──────────────────────────────────────────────────
function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.span
        className="relative z-10"
        animate={{ opacity: [1, 0.8, 1, 0.9, 1] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-primary/30"
        style={{ clipPath: "inset(0 0 65% 0)" }}
        animate={{ x: [0, 3, -2, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-accent/30"
        style={{ clipPath: "inset(65% 0 0 0)" }}
        animate={{ x: [0, -3, 2, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4, delay: 0.1 }}
      >
        {text}
      </motion.span>
    </div>
  );
}

// ── Code Rain Effect ─────────────────────────────────────────────────────
function CodeRain() {
  const columns = useMemo(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      left: `${(i / 12) * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
      chars: "QFYRe01{}[]<>/=:;".split(""),
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
      {columns.map((col, i) => (
        <motion.div
          key={i}
          className="absolute text-primary font-mono text-xs leading-loose whitespace-pre"
          style={{ left: col.left }}
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: col.duration, repeat: Infinity, ease: "linear", delay: col.delay }}
        >
          {col.chars.map((c, j) => (
            <div key={j}>{c}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// ── Progress Bar (Premium) ───────────────────────────────────────────────
function LoadingBar({ progress }: { progress: number }) {
  return (
    <div className="w-80 md:w-96 space-y-3">
      <div className="relative h-2 bg-dark/5 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #6366f1)" }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        {/* Glow */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary blur-md"
          animate={{ left: `${progress}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        />
      </div>
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary/60">
          System Initialization
        </span>
        <span className="text-xs font-black text-primary tabular-nums">
          {progress}%
        </span>
      </div>
    </div>
  );
}

// ── Main SplashScreen ────────────────────────────────────────────────────
export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "launching" | "done">("loading");

  useEffect(() => {
    const steps = [8, 18, 30, 42, 55, 68, 78, 88, 95, 100];
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
          setTimeout(onComplete, 500);
        }, 1000);
      }
    }, 240);
    return () => clearInterval(timer);
  }, [onComplete]);

  const loadingMessages = [
    "Booting AI Core…",
    "Loading Neural Networks…",
    "Syncing Cloud Infrastructure…",
    "Compiling Design System…",
    "Initializing 3D Engine…",
    "Connecting Databases…",
    "Deploying Interface…",
    "Calibrating Experience…",
    "Final System Check…",
    "🚀 Ready for Liftoff!",
  ];
  const msgIndex = Math.min(Math.floor(progress / 10), loadingMessages.length - 1);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      <CodeRain />

      {/* Morphing gradient blobs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)" }}
        animate={{ x: [0, 50, -30, 0], y: [0, -30, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%)", left: "20%", top: "20%" }}
        animate={{ x: [0, -40, 30, 0], y: [0, 40, -30, 0], scale: [1, 0.8, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbital Rings */}
      <OrbitalRing radius={180} duration={12} dotCount={4} color="#6366f1" />
      <OrbitalRing radius={240} duration={18} dotCount={6} color="#a855f7" delay={1} />
      <OrbitalRing radius={300} duration={24} dotCount={3} color="#0ea5e9" delay={2} />

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.3}
          x={`${10 + Math.random() * 80}%`}
          y={`${20 + Math.random() * 60}%`}
          size={3 + Math.random() * 4}
          color={["#6366f1", "#a855f7", "#0ea5e9", "#f59e0b", "#22c55e"][i % 5]}
        />
      ))}

      {/* ═════ Main Content ═════ */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* 3D Character with floating animation */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.7 }}
          animate={{
            opacity: 1,
            y: phase === "launching" ? -200 : 0,
            scale: phase === "launching" ? 0.5 : 1,
          }}
          transition={{
            opacity: { duration: 0.8 },
            y: { duration: phase === "launching" ? 0.8 : 0.6, type: "spring", stiffness: 100 },
            scale: { duration: phase === "launching" ? 0.8 : 0.6 },
          }}
          className="relative"
        >
          {/* Character Glow */}
          <motion.div
            className="absolute -inset-12 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(108,63,239,0.15), transparent 70%)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Spline 3D Character */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
          >
            <Suspense fallback={
              <motion.div
                className="w-full h-full flex items-center justify-center text-7xl"
                animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🧑‍💻
              </motion.div>
            }>
              <Spline
                scene={SPLINE_SPLASH_SCENE}
                style={{ background: 'transparent', width: '100%', height: '100%' }}
              />
            </Suspense>
          </motion.div>

          {/* Floating tech icons around character */}
          {["⚡", "🔮", "💎", "🧠"].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl pointer-events-none"
              style={{
                left: `${50 + 70 * Math.cos((i * 90 * Math.PI) / 180)}%`,
                top: `${50 + 70 * Math.sin((i * 90 * Math.PI) / 180)}%`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="flex flex-col items-center gap-4"
        >
          <img src="/logo.png" alt="QUANTIFYRE" className="h-14 md:h-20 w-auto object-contain" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
          />
        </motion.div>

        {/* Glitch Tagline */}
        <GlitchText
          text="THE FUTURE, FASTER."
          className="text-lg md:text-2xl font-black text-dark tracking-[0.4em] uppercase"
        />

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-5"
        >
          <LoadingBar progress={progress} />

          <div className="flex items-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ scale: [1, 2, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
            <AnimatePresence mode="wait">
              <motion.span
                key={msgIndex}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] ml-2"
              >
                {loadingMessages[msgIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-black text-text-secondary/40 uppercase tracking-[0.3em]">
            All Systems Operational
          </span>
        </div>
        <span className="text-[9px] font-bold text-text-secondary/30 tracking-widest">
          LLPIN: ACG-0636 · Gandhinagar, India
        </span>
      </motion.div>
    </motion.div>
  );
}
