"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

/* ─── Animated Counter ────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 40);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

/* ─── DNA Helix ─────────────────────────────────────────────── */
function DNAHelix() {
  const points = Array.from({ length: 18 });
  return (
    <svg width="60" height="200" viewBox="0 0 60 200" className="overflow-visible">
      {points.map((_, i) => {
        const y = (i / (points.length - 1)) * 200;
        const phase = (i / points.length) * Math.PI * 4;
        const xA = 30 + Math.cos(phase) * 22;
        const xB = 30 + Math.cos(phase + Math.PI) * 22;
        return (
          <g key={i}>
            <motion.circle cx={xA} cy={y} r={4} fill="#6C3FEF"
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }} />
            <motion.circle cx={xB} cy={y} r={4} fill="#0ea5e9"
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 + 0.75 }} />
            {i % 3 === 0 && (
              <motion.line x1={xA} y1={y} x2={xB} y2={y} stroke="#6C3FEF44" strokeWidth={1.5}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Floating Data Nodes ────────────────────────────────── */
function FloatingNodes() {
  const nodes = useMemo(() => [
    { x: "15%", y: "20%", label: "AI Core",    color: "#6C3FEF", size: 48, delay: 0 },
    { x: "78%", y: "15%", label: "Cloud",      color: "#0ea5e9", size: 40, delay: 0.3 },
    { x: "10%", y: "65%", label: "Security",   color: "#10b981", size: 36, delay: 0.6 },
    { x: "80%", y: "70%", label: "Database",   color: "#f59e0b", size: 44, delay: 0.9 },
    { x: "45%", y: "8%",  label: "API",        color: "#ef4444", size: 32, delay: 1.2 },
    { x: "50%", y: "85%", label: "Deploy",     color: "#8b5cf6", size: 38, delay: 1.5 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: node.x, top: node.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: node.delay + 0.5, duration: 0.5, type: "spring" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className="rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                width: node.size, height: node.size,
                background: `${node.color}18`,
                border: `1.5px solid ${node.color}44`,
                boxShadow: `0 0 20px ${node.color}22`,
              }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: node.color }} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: `${node.color}99` }}>
              {node.label}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Connection lines between nodes */}
      <svg className="absolute inset-0 w-full h-full">
        {[[0,1],[1,4],[4,3],[3,5],[5,2],[2,0],[0,3],[1,5]].map(([a, b], i) => {
          const na = nodes[a]; const nb = nodes[b];
          return (
            <motion.line key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="#6C3FEF" strokeWidth={0.5} strokeOpacity={0.12}
              strokeDasharray="4 6"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Premium Loading Bar ─────────────────────────────────── */
function LoadingBar({ progress }: { progress: number }) {
  return (
    <div className="w-72 md:w-96 space-y-3">
      <div className="relative h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: "linear-gradient(90deg, #6C3FEF, #0ea5e9, #6C3FEF)", backgroundSize: "200% 100%" }}
          animate={{ width: `${progress}%`, backgroundPosition: ["0% 0%", "100% 0%"] }}
          transition={{ width: { type: "spring", stiffness: 50, damping: 15 }, backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" } }}
        >
          <motion.div className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>
      </div>
      <div className="flex justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Initializing</span>
        <span className="text-[10px] font-black text-primary tabular-nums">{progress}%</span>
      </div>
    </div>
  );
}

/* ─── Glitch Text ─────────────────────────────────────────── */
function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`relative select-none ${className}`}>
      <motion.span className="relative z-10"
        animate={{ opacity: [1, 0.85, 1, 0.92, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 4 }}>
        {text}
      </motion.span>
      <motion.span className="absolute top-0 left-0 text-primary/40"
        style={{ clipPath: "inset(0 0 70% 0)" }}
        animate={{ x: [0, 4, -2, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 4.5 }}>
        {text}
      </motion.span>
      <motion.span className="absolute top-0 left-0 text-[#0ea5e9]/40"
        style={{ clipPath: "inset(70% 0 0 0)" }}
        animate={{ x: [0, -4, 2, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 4.5, delay: 0.08 }}>
        {text}
      </motion.span>
    </div>
  );
}

/* ─── Main SplashScreen ───────────────────────────────────── */
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
    "🚀 System Ready!",
  ];

  useEffect(() => {
    const steps = [10, 22, 35, 48, 60, 72, 82, 91, 97, 100];
    let i = 0;
    const timer = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        setMsgIndex(i);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => { setPhase("done"); setTimeout(onComplete, 600); }, 800);
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
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Soft background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40" />

          {/* Animated background particles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 2 + (i % 4),
                height: 2 + (i % 4),
                left: `${5 + (i * 3.1) % 90}%`,
                top: `${5 + (i * 7.3) % 90}%`,
                background: i % 3 === 0 ? "#6C3FEF" : i % 3 === 1 ? "#0ea5e9" : "#10b981",
              }}
              animate={{ opacity: [0, 0.6, 0], scale: [0, 1.5, 0], y: [0, -40, -80] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.15, ease: "easeOut" }}
            />
          ))}

          {/* DNA Helixes on sides */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-40 hidden lg:block">
            <DNAHelix />
          </div>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-40 hidden lg:block" style={{ transform: "translateY(-50%) scaleX(-1)" }}>
            <DNAHelix />
          </div>

          {/* Floating Nodes */}
          <FloatingNodes />

          {/* ─── CENTER CONTENT ─── */}
          <div className="relative z-10 flex flex-col items-center gap-10">

            {/* Pulsing ring system */}
            <div className="relative flex items-center justify-center mb-4">
              {[140, 100, 68].map((size, i) => (
                <motion.div key={i}
                  className="absolute rounded-full border"
                  style={{ width: size, height: size, borderColor: i === 0 ? "#6C3FEF22" : i === 1 ? "#0ea5e944" : "#6C3FEF66" }}
                  animate={{ scale: [1, 1.08, 1], rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
                  transition={{ scale: { duration: 2.5, repeat: Infinity }, rotate: { duration: 12 + i * 4, repeat: Infinity, ease: "linear" } }}
                />
              ))}

              {/* Center logo card */}
              <motion.div
                animate={{ boxShadow: ["0 0 0 0 #6C3FEF20", "0 0 0 20px #6C3FEF00"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 w-16 h-16 rounded-2xl bg-white border border-border shadow-2xl flex items-center justify-center"
              >
                <img src="/logo.png" alt="Q" className="h-10 w-auto object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <span className="font-black text-primary text-2xl absolute" style={{ display: 'none' }}>Q</span>
              </motion.div>
            </div>

            {/* Logo */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-3">
              <img src="/logo.png" alt="QUANTIFYRE" className="h-12 md:h-16 w-auto object-contain" />
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.8, duration: 0.5 }}
                className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </motion.div>

            {/* Tagline */}
            <GlitchText text="THE FUTURE, FASTER." className="text-base md:text-xl font-black text-dark tracking-[0.4em] uppercase" />

            {/* Live stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex items-center gap-8 text-center">
              {[{ val: 12, suf: "+", label: "Projects" }, { val: 99, suf: "%", label: "Uptime" }, { val: 8, suf: "+", label: "Clients" }].map((s, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl font-black text-dark tabular-nums">
                    <Counter target={s.val} suffix={s.suf} />
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-text-secondary">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Loading bar */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-4">
              <LoadingBar progress={progress} />

              <AnimatePresence mode="wait">
                <motion.div key={msgIndex}
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                  className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(j => (
                      <motion.div key={j} className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ scale: [1, 2, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: j * 0.12 }} />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.25em]">
                    {messages[msgIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Bottom status bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9px] font-black text-text-secondary/40 uppercase tracking-[0.3em]">All Systems Operational</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <span className="text-[8px] font-bold text-text-secondary/25 tracking-widest">
              LLPIN: ACG-0636 · Gandhinagar, Gujarat, India
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
