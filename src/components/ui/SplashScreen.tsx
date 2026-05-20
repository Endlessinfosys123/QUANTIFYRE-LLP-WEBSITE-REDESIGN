"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";

/* ─── Types ───────────────────────────────────────────────────────── */
type Phase = "boot" | "loading" | "reveal" | "done";

/* ─── Utility: seeded pseudo-random (no hydration mismatch) ────────── */
function seeded(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PARTICLE FIELD — quantum dots flying from center
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function QuantumParticles({ active }: { active: boolean }) {
  const rng = useMemo(() => seeded(42), []);
  const particles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => {
      const r = rng;
      const angle = r() * Math.PI * 2;
      const radius = 40 + r() * 280;
      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        size: 1.5 + r() * 3,
        delay: r() * 1.2,
        color: i % 5 === 0 ? "#22c55e" : i % 5 === 1 ? "#10b981" : i % 5 === 2 ? "#6ee7b7" : i % 5 === 3 ? "#34d399" : "#a7f3d0",
        duration: 1.5 + r() * 2,
      };
    }), [rng]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}` }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={active ? {
            x: p.x,
            y: p.y,
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
          } : {}}
          transition={{ duration: p.duration, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HEXAGON GRID — morphing background
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HexGrid() {
  const hexPath = "M18 3 L33 12 L33 30 L18 39 L3 30 L3 12 Z";
  const rng = useMemo(() => seeded(99), []);
  const hexes = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      col: i % 8,
      row: Math.floor(i / 8),
      delay: rng() * 2,
      opacity: 0.03 + rng() * 0.08,
      animDelay: rng() * 4,
    })), [rng]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexpat" x="0" y="0" width="72" height="62.4" patternUnits="userSpaceOnUse">
            <path d={hexPath} fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.15" transform="translate(18 11.7)" />
            <path d={hexPath} fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.1" transform="translate(54 11.7)" />
            <path d={hexPath} fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.12" transform="translate(36 42.9)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexpat)" />
      </svg>
      {/* Animated glowing hexes */}
      {hexes.map(h => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{
            left: `${(h.col * 12.5) + (h.row % 2 === 0 ? 0 : 6.25)}%`,
            top: `${h.row * 22}%`,
            width: 36,
            height: 36,
            borderRadius: "2px",
            background: `rgba(34,197,94,${h.opacity})`,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
          animate={{
            opacity: [h.opacity, h.opacity * 4, h.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 3 + h.animDelay, repeat: Infinity, ease: "easeInOut", delay: h.delay }}
        />
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCANNING LINE — cinematic scanline sweep
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-20"
      style={{ background: "linear-gradient(90deg, transparent, #22c55e, #6ee7b7, #22c55e, transparent)", boxShadow: "0 0 12px #22c55e, 0 0 24px #22c55e44" }}
      initial={{ top: "-2%" }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TERMINAL BOOT SEQUENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TerminalLine({ text, delay, color = "#6ee7b7" }: { text: string; delay: number; color?: string }) {
  const [shown, setShown] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setShown(true);
      let i = 0;
      const iv = setInterval(() => {
        setTyped(text.slice(0, ++i));
        if (i >= text.length) clearInterval(iv);
      }, 22);
      return () => clearInterval(iv);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [text, delay]);

  if (!shown) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 font-mono"
      style={{ fontSize: "10px", color }}
    >
      <span style={{ color: "#22c55e" }}>▸</span>
      <span>{typed}</span>
      {typed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ color: "#22c55e" }}
        >█</motion.span>
      )}
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ORBIT RING SYSTEM — rotating rings around logo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function OrbitRings() {
  const rings = [
    { size: 200, speed: 8,  reverse: false, color: "#22c55e",  dotSize: 8,  dashArray: "4 8",   opacity: 0.6 },
    { size: 155, speed: 5,  reverse: true,  color: "#10b981",  dotSize: 6,  dashArray: "2 6",   opacity: 0.5 },
    { size: 110, speed: 12, reverse: false, color: "#6ee7b7",  dotSize: 5,  dashArray: "1 4",   opacity: 0.4 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full flex items-center justify-center"
          style={{ width: ring.size, height: ring.size }}
          animate={{ rotate: ring.reverse ? [360, 0] : [0, 360] }}
          transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
        >
          {/* SVG dashed ring */}
          <svg className="absolute inset-0" viewBox={`0 0 ${ring.size} ${ring.size}`} fill="none">
            <circle
              cx={ring.size / 2} cy={ring.size / 2} r={ring.size / 2 - 1}
              stroke={ring.color} strokeWidth="1" strokeOpacity={ring.opacity}
              strokeDasharray={ring.dashArray}
            />
          </svg>
          {/* Glowing dot on ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: ring.dotSize, height: ring.dotSize,
              background: ring.color,
              boxShadow: `0 0 ${ring.dotSize * 2}px ${ring.color}, 0 0 ${ring.dotSize * 4}px ${ring.color}44`,
              top: 0, left: "50%", transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   QUANTUM PROGRESS BAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function QuantumProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-72 md:w-[380px] space-y-3">
      {/* Main bar */}
      <div className="relative h-[3px] rounded-full overflow-visible" style={{ background: "rgba(34,197,94,0.1)" }}>
        {/* Glow trail */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "rgba(34,197,94,0.15)", filter: "blur(8px)", height: "12px", top: "-4.5px" }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        />
        {/* Sharp line */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
          style={{ background: "linear-gradient(90deg, #10b981, #22c55e, #6ee7b7)" }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        {/* Leading dot */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 10, height: 10,
            background: "#22c55e",
            boxShadow: "0 0 8px #22c55e, 0 0 20px #22c55e88",
            marginLeft: -5,
          }}
          animate={{ left: `${progress}%` }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[9px] font-mono uppercase tracking-[0.3em]" style={{ color: "rgba(110,231,183,0.6)" }}>
            INITIALIZING
          </span>
        </div>
        <motion.span
          className="font-mono font-black text-[11px] tabular-nums"
          style={{ color: "#22c55e", textShadow: "0 0 10px #22c55e" }}
        >
          {progress.toString().padStart(3, "0")}%
        </motion.span>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GLITCH LOGO TEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function GlitchLogo() {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 300);
    };
    const iv = setInterval(trigger, 3000 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative select-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Main text */}
      <motion.h1
        className="text-4xl md:text-6xl font-black tracking-[0.15em] uppercase"
        style={{
          color: "#fff",
          textShadow: glitching
            ? "3px 0 #22c55e, -3px 0 #10b981, 0 0 20px #22c55e"
            : "0 0 30px rgba(34,197,94,0.3)",
        }}
      >
        QUANTIFYRE
      </motion.h1>

      {/* Glitch layer 1 */}
      {glitching && (
        <motion.div
          className="absolute inset-0 text-4xl md:text-6xl font-black tracking-[0.15em] uppercase overflow-hidden"
          style={{ color: "#22c55e", clipPath: "inset(30% 0 40% 0)", transform: "translateX(4px)" }}
          animate={{ x: [4, -4, 0] }}
          transition={{ duration: 0.1, repeat: 3 }}
        >
          QUANTIFYRE
        </motion.div>
      )}

      {/* Glitch layer 2 */}
      {glitching && (
        <motion.div
          className="absolute inset-0 text-4xl md:text-6xl font-black tracking-[0.15em] uppercase overflow-hidden"
          style={{ color: "#6ee7b7", clipPath: "inset(60% 0 10% 0)", transform: "translateX(-3px)" }}
          animate={{ x: [-3, 3, 0] }}
          transition={{ duration: 0.1, repeat: 3, delay: 0.05 }}
        >
          QUANTIFYRE
        </motion.div>
      )}

      {/* Tagline */}
      <motion.p
        className="text-center font-mono text-[10px] tracking-[0.6em] uppercase mt-2"
        style={{ color: "rgba(110,231,183,0.7)", letterSpacing: "0.5em" }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        THE FUTURE, FASTER
      </motion.p>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CORNER BRACKETS — HUD style
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HUDCorners() {
  const corners = ["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"];
  const rotations = ["0deg", "90deg", "270deg", "180deg"];
  return (
    <>
      {corners.map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-8 h-8 pointer-events-none`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
        >
          <svg viewBox="0 0 32 32" fill="none" style={{ transform: `rotate(${rotations[i]})` }}>
            <path d="M2 16 L2 2 L16 2" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CENTER LOGO ORB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LogoOrb() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
      {/* Pulsing aura */}
      {[1, 1.4, 1.8].map((scale, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 80, height: 80,
            background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
            border: "1px solid rgba(34,197,94,0.2)",
          }}
          animate={{ scale: [scale, scale * 1.15, scale], opacity: [0.6, 0.1, 0.6] }}
          transition={{ duration: 2 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}

      {/* Orbit rings */}
      <OrbitRings />

      {/* Core logo card */}
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-2xl"
        style={{
          width: 72, height: 72,
          background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.05))",
          border: "1px solid rgba(34,197,94,0.4)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 30px rgba(34,197,94,0.2), inset 0 0 20px rgba(34,197,94,0.05)",
        }}
        animate={{
          boxShadow: [
            "0 0 30px rgba(34,197,94,0.2), inset 0 0 20px rgba(34,197,94,0.05)",
            "0 0 60px rgba(34,197,94,0.4), inset 0 0 30px rgba(34,197,94,0.1)",
            "0 0 30px rgba(34,197,94,0.2), inset 0 0 20px rgba(34,197,94,0.05)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <img
          src="/logo.png"
          alt="QUANTIFYRE"
          className="w-10 h-10 object-contain"
          style={{ filter: "brightness(1.2) drop-shadow(0 0 8px rgba(34,197,94,0.5))" }}
          onError={e => {
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
            const fallback = el.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <span
          className="hidden absolute inset-0 items-center justify-center text-2xl font-black"
          style={{ color: "#22c55e", textShadow: "0 0 20px #22c55e" }}
        >
          Q
        </span>
      </motion.div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FLOATING DATA STREAMS — vertical streaks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DataStreams() {
  const rng = useMemo(() => seeded(77), []);
  const streams = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: rng() * 100,
      delay: rng() * 3,
      duration: 1.5 + rng() * 2,
      height: 40 + rng() * 100,
      opacity: 0.2 + rng() * 0.4,
    })), [rng]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streams.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            width: 1,
            height: s.height,
            background: "linear-gradient(180deg, transparent, #22c55e, transparent)",
            opacity: s.opacity,
          }}
          initial={{ y: "-20%" }}
          animate={{ y: "120%" }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NOISE TEXTURE OVERLAY — premium grain effect
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-30"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.025,
        mixBlendMode: "overlay",
      }}
    />
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN SPLASH SCREEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("boot");
  const [msgIndex, setMsgIndex] = useState(0);
  const [particlesActive, setParticlesActive] = useState(false);

  const terminalLines = [
    { text: "QUANTIFYRE OS v3.0 — BOOT SEQUENCE INITIATED", delay: 0.1, color: "#22c55e" },
    { text: "Loading quantum core modules...", delay: 0.6 },
    { text: "AI engine calibrated ██████████ 100%", delay: 1.1 },
    { text: "Cloud infrastructure: ONLINE", delay: 1.5 },
    { text: "Security layer: ACTIVE", delay: 1.9 },
  ];

  const statusMessages = [
    "Booting Quantum Core…",
    "Loading AI Modules…",
    "Calibrating Cloud Nodes…",
    "Syncing Databases…",
    "Initializing Security Layer…",
    "Compiling Interface…",
    "Running Diagnostics…",
    "Deploying Experience…",
    "Final Checks…",
    "✦ System Ready!",
  ];

  useEffect(() => {
    // Boot phase -> loading phase
    const bootTimer = setTimeout(() => {
      setPhase("loading");
      setParticlesActive(true);
    }, 2400);

    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    const steps = [8, 20, 35, 48, 60, 72, 82, 91, 97, 100];
    let i = 0;
    const timer = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        setMsgIndex(i);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setPhase("reveal");
          setTimeout(onComplete, 900);
        }, 600);
      }
    }, 300);

    return () => clearInterval(timer);
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#020b08" }}
          exit={phase === "reveal" ? {
            clipPath: ["inset(0% 0% 0% 0%)", "inset(50% 0% 50% 0%)", "inset(50% 0% 50% 0%)"],
            opacity: 0,
          } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background layers */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.04) 40%, transparent 70%)",
            }}
          />
          <HexGrid />
          <DataStreams />
          <ScanLine />
          <NoiseOverlay />
          <HUDCorners />

          {/* Quantum particles burst */}
          <QuantumParticles active={particlesActive} />

          {/* ─── BOOT PHASE ─── */}
          <AnimatePresence mode="wait">
            {phase === "boot" && (
              <motion.div
                key="boot"
                className="relative z-10 flex flex-col gap-2 px-8"
                style={{ width: "min(480px, 90vw)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
              >
                {/* Terminal header */}
                <motion.div
                  className="flex items-center gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                >
                  <div className="flex gap-1.5">
                    {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                      <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] tracking-widest ml-2" style={{ color: "rgba(110,231,183,0.4)" }}>
                    QUANTIFYRE — TERMINAL
                  </span>
                </motion.div>
                <div
                  className="rounded-xl p-5 space-y-2"
                  style={{
                    background: "rgba(34,197,94,0.03)",
                    border: "1px solid rgba(34,197,94,0.12)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {terminalLines.map((line, i) => (
                    <TerminalLine key={i} text={line.text} delay={line.delay} color={line.color || "rgba(110,231,183,0.7)"} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── LOADING PHASE ─── */}
            {(phase === "loading" || phase === "reveal") && (
              <motion.div
                key="loading"
                className="relative z-10 flex flex-col items-center gap-8"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Logo orb */}
                <LogoOrb />

                {/* Brand name */}
                <GlitchLogo />

                {/* Stats row */}
                <motion.div
                  className="flex items-center gap-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    { val: "12+", label: "Projects" },
                    { val: "99%", label: "Uptime" },
                    { val: "8+", label: "Clients" },
                  ].map((s, i) => (
                    <div key={i} className="text-center space-y-1">
                      <div
                        className="text-xl font-black font-mono tabular-nums"
                        style={{ color: "#22c55e", textShadow: "0 0 12px rgba(34,197,94,0.5)" }}
                      >
                        {s.val}
                      </div>
                      <div className="text-[8px] font-black uppercase tracking-widest" style={{ color: "rgba(110,231,183,0.4)" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Progress bar */}
                <motion.div
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <QuantumProgressBar progress={progress} />

                  {/* Status message */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={msgIndex}
                      initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2].map(j => (
                          <motion.div
                            key={j}
                            className="w-1 h-1 rounded-full"
                            style={{ background: "#22c55e" }}
                            animate={{ scale: [1, 2, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.7, repeat: Infinity, delay: j * 0.15 }}
                          />
                        ))}
                      </div>
                      <span
                        className="text-[9px] font-mono uppercase tracking-[0.3em]"
                        style={{ color: "rgba(110,231,183,0.6)" }}
                      >
                        {statusMessages[msgIndex]}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom HUD */}
          <motion.div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="font-mono text-[8px] uppercase tracking-[0.35em]" style={{ color: "rgba(110,231,183,0.3)" }}>
                All Systems Operational
              </span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
              />
            </div>
            <span className="font-mono text-[7px] tracking-widest" style={{ color: "rgba(110,231,183,0.15)" }}>
              LLPIN: ACG-0636 · QUANTIFYRE LLP · GANDHINAGAR, GUJARAT
            </span>
          </motion.div>

          {/* Top-right badge */}
          <motion.div
            className="absolute top-5 right-12 hidden md:flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: "rgba(110,231,183,0.3)" }}>
              EST. 2024
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
