"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Code2, Database, ShieldCheck, Terminal, Cpu, CheckCircle2 } from "lucide-react";
import type { Variants } from "framer-motion";

const EASE_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATED COUNTER — counts up from 0 on mount
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) { setDisplay(value); return; }
    const target = parseFloat(match[1]);
    const suffix = match[2] || "";
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };

    // Start after a short delay so it feels intentional
    const timeout = setTimeout(() => requestAnimationFrame(step), 600);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex flex-col">
      <span className="text-3xl md:text-4xl font-black text-slate-800 leading-none tabular-nums">
        {display}
      </span>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
        {label}
      </span>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SUBTLE GLOW AURA — a soft, slow tracking color wash behind content
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function GlowAura({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const auraX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const auraY = useSpring(mouseY, { stiffness: 45, damping: 22 });

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
    <motion.div 
      className="absolute pointer-events-none rounded-full" 
      style={{
        width: 600, height: 600, x: auraX, y: auraY,
        translateX: "-50%", translateY: "-50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, rgba(34,197,94,0.03) 50%, transparent 70%)",
        filter: "blur(60px)",
      }} 
    />
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAGNETIC WRAPPER — button magnet effect
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MagneticWrapper({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });
  
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
   INTERACTIVE 3D TILT CONTAINER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TiltContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRX = useSpring(rotX, { stiffness: 90, damping: 20 });
  const springRY = useSpring(rotY, { stiffness: 90, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    rotX.set(-((e.clientY - cy) / (r.height / 2)) * 6);
    rotY.set(  ((e.clientX - cx) / (r.width  / 2)) * 6);
  }, [rotX, rotY]);

  const onLeave = useCallback(() => { rotX.set(0); rotY.set(0); }, [rotX, rotY]);

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={onMove} 
      onMouseLeave={onLeave}
      style={{ rotateX: springRX, rotateY: springRY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROTATING HEADLINE WORDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ROTATING_WORDS = ["Future.", "Possible.", "Legacy.", "Tomorrow."];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-transparent bg-clip-text"
          style={{ backgroundImage: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)" }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FUTURISTIC SOFTWARE CANVAS MOCKUP (Light, Elegant, Interactive)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function InteractiveSoftwareCanvas() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [activeMetric, setActiveMetric] = useState(0);

  const metrics = [
    { label: "Response Speed", value: "0.034ms", prev: "0.041ms" },
    { label: "Deploy Success", value: "99.98%", prev: "99.91%" },
    { label: "CPU Load", value: "2.1%", prev: "4.8%" },
  ];
  
  useEffect(() => {
    const rawLines = [
      "quantifyre init --production",
      "✓ Connected to Secure Cloud Core",
      "✓ Synchronized AI Models (Emerald v2.1)",
      "✓ Database Queries Optimized (0.04ms)",
      "system.deploy() -> success ✓",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setTerminalLines(prev => [...prev, rawLines[i % rawLines.length]].slice(-4));
      i++;
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % metrics.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[580px] h-[500px] bg-white border border-emerald-100 rounded-3xl p-6 shadow-[0_20px_60px_rgba(16,185,129,0.1)] flex flex-col justify-between overflow-hidden">
      {/* Subtle shine lines */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-emerald-50 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase ml-2 flex items-center gap-1.5">
            <Terminal size={11} className="text-emerald-500" /> quantifyre.app
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-400"
          />
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">
            Live
          </span>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-2 gap-4 my-4 flex-grow">
        {/* Animated Metrics Panel */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-emerald-100">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMetric}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-[9px] font-black uppercase tracking-wider text-emerald-100 mb-1">
                {metrics[activeMetric].label}
              </div>
              <div className="text-2xl font-black text-white">{metrics[activeMetric].value}</div>
              <div className="text-[8px] text-emerald-200 mt-1">
                ↑ was {metrics[activeMetric].prev}
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Mini bar chart */}
          <div className="flex items-end gap-1 h-12 w-full pt-2">
            {[60, 85, 40, 95, 70, 88, 55, 90].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-white/30 rounded-sm"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
              />
            ))}
          </div>
        </div>

        {/* Live IDE Terminal simulator */}
        <div className="bg-slate-900 rounded-2xl p-4 flex flex-col justify-between font-mono text-[9px] text-emerald-400 overflow-hidden shadow-inner">
          <div className="space-y-1.5">
            {terminalLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <span className="text-slate-500 mr-1.5">$</span>{line}
              </motion.div>
            ))}
            {/* Blinking cursor */}
            <div className="flex items-center gap-1">
              <span className="text-slate-500">$</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-1.5 h-3 bg-emerald-400"
              />
            </div>
          </div>
          <div className="text-slate-500 text-[8px] flex items-center justify-between border-t border-slate-800 pt-2 mt-2">
            <span>node v20.11 · RAM: 2.1/16GB</span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="border border-emerald-50 rounded-2xl p-4 bg-emerald-50/20">
        <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Performance Timeline</div>
        <svg className="w-full" height="36" viewBox="0 0 200 36" preserveAspectRatio="none">
          <defs>
            <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,28 Q25,10 50,24 T100,8 T150,30 T200,18 L200,36 L0,36 Z" fill="url(#heroChartGrad)" />
          <path d="M0,28 Q25,10 50,24 T100,8 T150,30 T200,18" fill="none" stroke="#10b981" strokeWidth="1.5" />
          {/* Moving dot */}
          <motion.circle
            r="3" fill="#22c55e"
            animate={{ offsetDistance: ["0%", "100%"] }}
            style={{ offsetPath: "path('M0,28 Q25,10 50,24 T100,8 T150,30 T200,18')" } as any}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Floating service chips */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-emerald-50 mt-3">
        {[
          { label: "AI Integration", icon: Cpu },
          { label: "Cloud Scalability", icon: Database },
          { label: "Secure Systems", icon: ShieldCheck },
        ].map((chip, idx) => {
          const Icon = chip.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -2, scale: 1.03 }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 cursor-default"
            >
              <Icon size={11} /> {chip.label}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN HERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const Hero = ({ data, stats }: { data?: any; stats?: any[] }) => {
  const heroRef = useRef<HTMLElement>(null);
  
  const heroBadge    = data?.badge_text || "Enterprise Software Engineering";
  const heroSubtitle = data?.subtext    || "We construct robust cloud architectures, enterprise-scale software, and custom AI systems designed to power high-growth business operations.";
  const primaryCTA   = data?.cta1_label || "Get Consultation";
  const primaryLink  = data?.cta1_link  || "/contact";

  const projectsValue  = stats?.find(s => s.label?.toLowerCase().includes("project"))?.value  || "12+";
  const clientsValue   = stats?.find(s => s.label?.toLowerCase().includes("client") || s.label?.toLowerCase().includes("business"))?.value || "8+";

  return (
    <section
      ref={heroRef}
      className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden bg-transparent min-h-screen flex items-center"
    >
      {/* Soft interactive cursor tracking aura */}
      <GlowAura containerRef={heroRef} />

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT COLUMN: Typography & Action ── */}
          <div className="max-w-2xl space-y-8">
            
            {/* Elegant Minimal Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm"
            >
              <Sparkles size={12} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">{heroBadge}</span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* High-Impact Headline with Rotating Word */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_EXPO }}
                className="text-6xl md:text-7xl lg:text-[5.5rem] font-black text-slate-800 tracking-tighter leading-[0.9] text-balance"
              >
                Engineering the <br />
                <RotatingWord />
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg"
              >
                {heroSubtitle}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <MagneticWrapper>
                <Button 
                  href={primaryLink} 
                  size="lg"
                  className="w-full sm:w-auto px-10 h-16 rounded-2xl font-black text-base shadow-xl shadow-primary/10 hover:shadow-primary/20"
                >
                  {primaryCTA} <ArrowRight className="ml-2" size={18} />
                </Button>
              </MagneticWrapper>
              <MagneticWrapper>
                <Button 
                  href="/portfolio" 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto px-10 h-16 rounded-2xl font-black text-base bg-white border-emerald-100 hover:border-primary hover:text-primary shadow-sm"
                >
                  View Capabilities
                </Button>
              </MagneticWrapper>
            </motion.div>

            {/* Animated Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-10 pt-6 border-t border-emerald-50 max-w-md"
            >
              <AnimatedStat value={projectsValue} label="Success Projects" />
              <AnimatedStat value={clientsValue} label="Happy Clients" />
              <AnimatedStat value="100%" label="Satisfaction Rate" />
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: Interactive Software Canvas Mockup ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE_EXPO }}
            className="flex items-center justify-center lg:justify-end"
          >
            <TiltContainer>
              <InteractiveSoftwareCanvas />
            </TiltContainer>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
