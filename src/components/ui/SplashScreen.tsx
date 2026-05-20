"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

/* ─── seeded random — no hydration mismatch ─────────────────── */
function seeded(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATED COUNTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const step = Math.ceil(target / 45);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FLOATING DOT GRID PARTICLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FloatingDots() {
  const rng = useMemo(() => seeded(55), []);
  const dots = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      size: 3 + rng() * 5,
      delay: rng() * 4,
      duration: 3 + rng() * 4,
      opacity: 0.15 + rng() * 0.25,
      color: i % 3 === 0 ? "#22c55e" : i % 3 === 1 ? "#10b981" : "#6ee7b7",
    })), [rng]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map(d => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`, top: `${d.y}%`,
            width: d.size, height: d.size,
            background: d.color,
            opacity: d.opacity,
          }}
          animate={{ y: [0, -20, 0], scale: [1, 1.4, 1], opacity: [d.opacity, d.opacity * 2, d.opacity] }}
          transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MORPHING BACKGROUND BLOBS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-left large blob */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.04) 50%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Bottom-right blob */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(110,231,183,0.1) 0%, rgba(34,197,94,0.05) 50%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Center subtle glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 60%)" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATED GRID LINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function GridLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(34,197,94,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,197,94,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PREMIUM PROGRESS BAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PremiumProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-72 md:w-[400px] space-y-3">
      {/* Track */}
      <div className="relative h-1.5 rounded-full overflow-visible" style={{ background: "rgba(34,197,94,0.12)" }}>
        {/* Glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: -4, height: 10,
            background: "rgba(34,197,94,0.25)",
            filter: "blur(6px)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 45, damping: 14 }}
        />
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
          style={{ background: "linear-gradient(90deg, #10b981, #22c55e, #6ee7b7, #22c55e)" }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 45, damping: 14 }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        {/* Leading pill */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 12, height: 12, marginLeft: -6,
            background: "#22c55e",
            boxShadow: "0 0 0 3px rgba(34,197,94,0.2), 0 0 16px rgba(34,197,94,0.5)",
          }}
          animate={{ left: `${progress}%` }}
          transition={{ type: "spring", stiffness: 45, damping: 14 }}
        />
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.6, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
            Initializing
          </span>
        </div>
        <span className="text-[11px] font-black tabular-nums text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
          {String(progress).padStart(3, "0")}%
        </span>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GLITCH TAGLINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function GlitchTagline({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 220);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative select-none">
      <span
        className="text-xs md:text-sm font-black uppercase tracking-[0.5em] text-slate-400"
        style={glitch ? { textShadow: "2px 0 #22c55e, -2px 0 #10b981" } : {}}
      >
        {text}
      </span>
      {glitch && (
        <>
          <span
            className="absolute inset-0 text-xs md:text-sm font-black uppercase tracking-[0.5em] text-primary/30 overflow-hidden"
            style={{ clipPath: "inset(0 0 60% 0)", transform: "translateX(3px)" }}
          >{text}</span>
          <span
            className="absolute inset-0 text-xs md:text-sm font-black uppercase tracking-[0.5em] text-emerald-400/30 overflow-hidden"
            style={{ clipPath: "inset(60% 0 0 0)", transform: "translateX(-2px)" }}
          >{text}</span>
        </>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ORBIT RING SYSTEM (light version)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function OrbitSystem() {
  const rings = [
    { size: 180, speed: 10, reverse: false, color: "#22c55e", opacity: 0.25, dotSize: 7, dashArray: "3 7" },
    { size: 135, speed: 7,  reverse: true,  color: "#10b981", opacity: 0.2,  dotSize: 5, dashArray: "2 5" },
    { size:  90, speed: 14, reverse: false, color: "#6ee7b7", opacity: 0.3,  dotSize: 4, dashArray: "1 4" },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ width: ring.size, height: ring.size }}
          animate={{ rotate: ring.reverse ? [360, 0] : [0, 360] }}
          transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox={`0 0 ${ring.size} ${ring.size}`} fill="none" className="absolute inset-0">
            <circle
              cx={ring.size / 2} cy={ring.size / 2} r={ring.size / 2 - 1.5}
              stroke={ring.color} strokeWidth="1.5"
              strokeOpacity={ring.opacity}
              strokeDasharray={ring.dashArray}
            />
          </svg>
          {/* Glowing dot */}
          <div
            className="absolute rounded-full"
            style={{
              width: ring.dotSize, height: ring.dotSize,
              background: ring.color,
              boxShadow: `0 0 ${ring.dotSize * 2}px ${ring.color}88`,
              top: 0, left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HUD CORNER BRACKETS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CornerBrackets() {
  const corners = [
    { pos: "top-5 left-5",     rotate: "0deg" },
    { pos: "top-5 right-5",    rotate: "90deg" },
    { pos: "bottom-5 left-5",  rotate: "270deg" },
    { pos: "bottom-5 right-5", rotate: "180deg" },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.pos} w-7 h-7 pointer-events-none`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.35, ease: "backOut" }}
        >
          <svg viewBox="0 0 28 28" fill="none" style={{ transform: `rotate(${c.rotate})` }}>
            <path d="M2 14 L2 2 L14 2" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGO ORB (light)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LogoOrb() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      {/* Soft pulsing auras */}
      {[120, 150, 180].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size, height: size,
            background: "transparent",
            border: `1px solid rgba(34,197,94,${0.15 - i * 0.04})`,
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2.5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      <OrbitSystem />

      {/* Logo card */}
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-2xl bg-white"
        style={{
          width: 72, height: 72,
          border: "1.5px solid rgba(34,197,94,0.3)",
          boxShadow: "0 4px 30px rgba(34,197,94,0.12), 0 1px 8px rgba(34,197,94,0.08), 0 0 0 4px rgba(34,197,94,0.04)",
        }}
        animate={{
          boxShadow: [
            "0 4px 30px rgba(34,197,94,0.12), 0 1px 8px rgba(34,197,94,0.08)",
            "0 4px 50px rgba(34,197,94,0.22), 0 1px 8px rgba(34,197,94,0.12)",
            "0 4px 30px rgba(34,197,94,0.12), 0 1px 8px rgba(34,197,94,0.08)",
          ],
          y: [0, -4, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/logo.png"
          alt="QUANTIFYRE"
          className="w-10 h-10 object-contain"
          onError={e => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
            const fb = img.nextElementSibling as HTMLElement;
            if (fb) fb.style.display = "flex";
          }}
        />
        <span
          className="hidden absolute inset-0 items-center justify-center text-2xl font-black text-primary"
          style={{ textShadow: "0 0 16px rgba(34,197,94,0.4)" }}
        >Q</span>
      </motion.div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FLOATING SYSTEM BADGES (in loading phase)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FloatingBadges() {
  const badges = [
    { label: "AI Core",    icon: "⚡", pos: "top-[18%] left-[8%]",   delay: 0.5 },
    { label: "Cloud",      icon: "☁️", pos: "top-[15%] right-[7%]",  delay: 0.8 },
    { label: "Security",   icon: "🛡️", pos: "bottom-[22%] left-[6%]", delay: 1.1 },
    { label: "Deploy",     icon: "🚀", pos: "bottom-[18%] right-[8%]",delay: 1.4 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      {badges.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute ${b.pos}`}
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: b.delay, type: "spring", stiffness: 200, damping: 18 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 bg-white border border-emerald-100 rounded-2xl px-4 py-2.5 shadow-md shadow-emerald-50"
            style={{ boxShadow: "0 4px 20px rgba(34,197,94,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <span className="text-base">{b.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{b.label}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN SPLASH SCREEN  ← light theme
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = [
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
    const steps = [8, 20, 35, 48, 60, 72, 82, 91, 97, 100];
    let i = 0;
    const timer = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        setMsgIndex(i);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => { setPhase("done"); setTimeout(onComplete, 550); }, 700);
      }
    }, 280);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/30 to-white" />
          <GridLines />
          <BackgroundBlobs />
          <FloatingDots />
          <CornerBrackets />
          <FloatingBadges />

          {/* Subtle top accent line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, #22c55e, #10b981, #22c55e, transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ─── CENTER CONTENT ─── */}
          <div className="relative z-10 flex flex-col items-center gap-8">

            {/* Logo Orb */}
            <LogoOrb />

            {/* Brand Logo Image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <img
                src="/logo.png"
                alt="QUANTIFYRE"
                className="h-10 md:h-14 w-auto object-contain"
                onError={e => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  const fb = img.nextElementSibling as HTMLElement;
                  if (fb) fb.style.display = "block";
                }}
              />
              <span
                className="hidden text-3xl font-black tracking-[0.2em] uppercase"
                style={{ color: "#1e293b" }}
              >
                QUANTIFYRE
              </span>

              {/* Divider line */}
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 160 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlitchTagline text="The Future, Faster." />
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-8 text-center"
            >
              {[
                { val: 12, suf: "+", label: "Projects" },
                { val: 99, suf: "%", label: "Uptime" },
                { val: 8,  suf: "+", label: "Clients" },
              ].map((s, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl font-black text-dark tabular-nums">
                    <Counter target={s.val} suffix={s.suf} />
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col items-center gap-4"
            >
              <PremiumProgressBar progress={progress} />

              {/* Status message */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={msgIndex}
                  initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -5, filter: "blur(4px)" }}
                  className="flex items-center gap-3"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map(j => (
                      <motion.div
                        key={j}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ scale: [1, 2, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: j * 0.13 }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                    {messages[msgIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="text-[8px] font-black uppercase tracking-[0.35em] text-slate-300">
                All Systems Operational
              </span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
              />
            </div>
            <span className="text-[7px] font-bold text-slate-200 tracking-widest">
              LLPIN: ACG-0636 · QUANTIFYRE LLP · GANDHINAGAR, GUJARAT
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
