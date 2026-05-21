"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Code2, Database, ShieldCheck, Terminal, Cpu } from "lucide-react";
import type { Variants } from "framer-motion";

const EASE_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

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
        width: 500, height: 500, x: auraX, y: auraY,
        translateX: "-50%", translateY: "-50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, rgba(34,197,94,0.02) 50%, transparent 70%)",
        filter: "blur(40px)",
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
   FUTURISTIC SOFTWARE CANVAS MOCKUP (Light, Elegant, Interactive)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function InteractiveSoftwareCanvas() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  
  // Typing simulator for a clean high-performance terminal
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

  return (
    <div className="relative w-full max-w-[580px] h-[480px] bg-white border border-emerald-100 rounded-3xl p-6 shadow-[0_20px_50px_rgba(16,185,129,0.06)] flex flex-col justify-between overflow-hidden">
      {/* Subtle shine lines */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/[0.01] to-transparent pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-emerald-50 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase ml-2 flex items-center gap-1.5">
            <Terminal size={11} className="text-emerald-500" /> main.py
          </span>
        </div>
        <div className="px-3 py-1 bg-emerald-50 rounded-full text-[9px] font-black text-emerald-600 uppercase tracking-widest">
          Active Node
        </div>
      </div>

      {/* Dashboard Grid (Main content inside mockup) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 flex-grow">
        {/* Real-time Query Stats Graph */}
        <div className="bg-emerald-50/20 border border-emerald-100/50 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-0.5">Response Speed</div>
            <div className="text-2xl font-black text-dark">0.034ms</div>
          </div>
          {/* Render nice wavy SVG graph */}
          <div className="h-16 w-full pt-4">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              <path d="M0,25 Q15,10 30,22 T60,5 T90,28 T100,20 L100,30 L0,30 Z" fill="url(#chartGrad)" />
              <path d="M0,25 Q15,10 30,22 T60,5 T90,28 T100,20" fill="none" stroke="#10b981" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Live IDE Terminal simulator */}
        <div className="bg-slate-900 rounded-2xl p-4 flex flex-col justify-between font-mono text-[9px] text-emerald-400 overflow-hidden shadow-inner">
          <div className="space-y-1.5">
            {terminalLines.map((line, idx) => (
              <div key={idx} className="whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="text-slate-500 mr-1.5">$</span>{line}
              </div>
            ))}
          </div>
          <div className="text-slate-500 text-[8px] flex items-center justify-between border-t border-slate-800 pt-2 mt-2">
            <span>RAM: 2.1 / 16 GB</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Floating service chips */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-50">
        {[
          { label: "AI Integration", icon: Cpu, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "Cloud Scalability", icon: Database, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "Secure Systems", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
        ].map((chip, idx) => {
          const Icon = chip.icon;
          return (
            <div key={idx} className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-[10px] font-black uppercase tracking-wider ${chip.color}`}>
              <Icon size={11} /> {chip.label}
            </div>
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

  return (
    <section
      ref={heroRef}
      className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden bg-transparent min-h-screen flex items-center"
    >
      {/* Soft interactive cursor tracking aura */}
      <GlowAura containerRef={heroRef} />

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT COLUMN: Pristine Typography & Action ── */}
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

            {/* Breathtaking High-Impact Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_EXPO }}
                className="text-6xl md:text-7xl lg:text-[5.5rem] font-black text-dark tracking-tighter leading-[0.9] text-balance"
              >
                Engineering the <br />
                <span 
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)" }}
                >
                  Digital Future.
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xl text-text-secondary font-medium leading-relaxed max-w-lg"
              >
                {heroSubtitle}
              </motion.p>
            </div>

            {/* Sleek Buttons */}
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

            {/* Pristine Clean Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="flex flex-wrap gap-8 pt-6 border-t border-emerald-50 max-w-md"
            >
              {[
                { val: stats?.find(s => s.label?.toLowerCase().includes("project"))?.value || "12+", label: "Success Projects" },
                { val: stats?.find(s => s.label?.toLowerCase().includes("client") || s.label?.toLowerCase().includes("business"))?.value || "8+", label: "Happy Clients" },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl font-black text-dark leading-none">{stat.val}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">{stat.label}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: Stunning Interactive Software Canvas Mockup ── */}
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
