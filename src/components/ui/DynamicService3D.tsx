"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Database, Smartphone, BarChart2, PenTool, Cpu, Shield, Zap, Globe, TrendingUp, Layers, Server, Cloud, Target, Search, Megaphone } from "lucide-react";

/* ─── AI Automation Animation ─────────────────────────────── */
function AIAutomationVisual() {
  const nodes = [
    { icon: Brain, angle: 0, dist: 160, color: "#6C3FEF", label: "LLM Core" },
    { icon: Zap, angle: 60, dist: 160, color: "#a855f7", label: "Auto-Trigger" },
    { icon: Database, angle: 120, dist: 160, color: "#0ea5e9", label: "Data Sync" },
    { icon: Shield, angle: 180, dist: 160, color: "#10b981", label: "Auth Guard" },
    { icon: Cloud, angle: 240, dist: 160, color: "#f59e0b", label: "Cloud Deploy" },
    { icon: Cpu, angle: 300, dist: 160, color: "#ef4444", label: "GPU Process" },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Center pulsing AI core */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], boxShadow: ["0 0 40px #6C3FEF44", "0 0 80px #6C3FEF88", "0 0 40px #6C3FEF44"] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute z-30 w-28 h-28 rounded-full bg-[#6C3FEF] flex items-center justify-center shadow-2xl"
      >
        <Brain size={52} className="text-white" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
        />
      </motion.div>

      {/* Orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[340px] h-[340px] rounded-full border border-[#6C3FEF]/20"
      />

      {/* Nodes */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = Math.cos(rad) * n.dist;
        const y = Math.sin(rad) * n.dist;
        const Icon = n.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            className="absolute z-20"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-lg border border-white/10 backdrop-blur-sm"
              style={{ background: `${n.color}22`, borderColor: `${n.color}44` }}
            >
              <Icon size={22} style={{ color: n.color }} />
              <span className="text-[8px] font-black text-white/60 uppercase tracking-wide leading-none">{n.label}</span>
            </motion.div>
            {/* Connection line */}
            <svg className="absolute top-1/2 left-1/2 pointer-events-none" style={{ width: n.dist, height: 2, transform: `translate(-${n.dist}px,-1px) rotate(${n.angle + 180}deg)`, transformOrigin: "left center" }}>
              <motion.line x1={0} y1={0} x2={n.dist} y2={0} stroke={n.color} strokeWidth={1} strokeOpacity={0.3} strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -16] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </motion.div>
        );
      })}

      {/* Floating data packets */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-[#6C3FEF] shadow-[0_0_12px_#6C3FEF]"
          animate={{
            rotate: [i * 120, i * 120 + 360],
            x: [Math.cos((i * 120 * Math.PI) / 180) * 120, Math.cos(((i * 120 + 360) * Math.PI) / 180) * 120],
            y: [Math.sin((i * 120 * Math.PI) / 180) * 120, Math.sin(((i * 120 + 360) * Math.PI) / 180) * 120],
          }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ─── Custom Software Animation ───────────────────────────── */
function SoftwareEngVisual() {
  const layers = [
    { label: "React UI Layer", color: "#0ea5e9", icon: Layers },
    { label: "Node.js API Layer", color: "#10b981", icon: Server },
    { label: "PostgreSQL DB Layer", color: "#6C3FEF", icon: Database },
    { label: "Docker / CI-CD", color: "#f59e0b", icon: Cloud },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-4 w-72">
        {layers.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={i}
              initial={{ x: i % 2 === 0 ? -80 : 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.7, type: "spring" }}
            >
              <motion.div
                animate={{ x: [0, i % 2 === 0 ? 6 : -6, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl border shadow-xl"
                style={{ background: `${layer.color}11`, borderColor: `${layer.color}44` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: layer.color }}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-black text-dark tracking-tight">{layer.label}</div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(3)].map((_, j) => (
                      <motion.div key={j} className="w-2 h-2 rounded-full"
                        style={{ background: layer.color }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: j * 0.2 }}
                      />
                    ))}
                    <span className="text-[10px] font-bold text-text-secondary ml-1">LIVE</span>
                  </div>
                </div>
                <motion.div className="ml-auto w-3 h-3 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.4, 1], boxShadow: ["0 0 0 0 #10b98155", "0 0 0 8px #10b98100"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      {/* Terminal floating card */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-6 right-6 bg-[#0d1117] rounded-2xl p-4 border border-[#30363d] shadow-2xl w-44"
      >
        <div className="flex gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="font-mono text-[10px] space-y-1">
          <div className="text-green-400">$ git push origin</div>
          <div className="text-[#0ea5e9]">✓ Build success</div>
          <div className="text-[#6C3FEF]">✓ Tests passed</div>
          <div className="text-white/60">✓ Deploying...</div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Web Dev Animation ────────────────────────────────────── */
function WebDevVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main browser mockup */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotateX: [2, -2, 2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Browser chrome */}
        <div className="h-10 bg-slate-100 flex items-center px-4 gap-2 border-b border-slate-200">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex-1 mx-4 bg-white rounded-full h-5 flex items-center px-3">
            <span className="text-[9px] text-slate-400 font-mono">quantifyrellp.space</span>
          </div>
        </div>
        {/* Fake hero */}
        <div className="p-5 space-y-3">
          <div className="h-5 bg-primary/20 rounded-full w-3/4" />
          <div className="h-3 bg-slate-100 rounded-full w-full" />
          <div className="h-3 bg-slate-100 rounded-full w-5/6" />
          <div className="flex gap-2 mt-4">
            <div className="h-9 w-28 bg-primary rounded-xl" />
            <div className="h-9 w-24 bg-slate-100 rounded-xl" />
          </div>
        </div>
        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-2 p-5 pt-0">
          {["99 Speed", "100 SEO", "A+ Perf"].map((m) => (
            <div key={m} className="bg-green-50 border border-green-200 rounded-xl p-2 text-center">
              <div className="text-[10px] font-black text-green-700">{m}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating badge — Next.js */}
      <motion.div animate={{ y: [-12, 0, -12], x: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute top-8 -right-4 bg-dark text-white px-4 py-2 rounded-2xl shadow-xl text-xs font-black flex items-center gap-2">
        <Zap size={14} className="text-yellow-400" /> Next.js 14
      </motion.div>

      {/* Floating badge — SEO */}
      <motion.div animate={{ y: [0, -10, 0], x: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-12 -left-6 bg-primary text-white px-4 py-2 rounded-2xl shadow-xl text-xs font-black flex items-center gap-2">
        <TrendingUp size={14} /> +240% Traffic
      </motion.div>

      {/* Floating badge — Mobile */}
      <motion.div animate={{ y: [-5, 8, -5] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-2 right-8 bg-white border border-border text-dark px-4 py-2 rounded-2xl shadow-xl text-xs font-black flex items-center gap-2">
        <Globe size={14} className="text-primary" /> Responsive
      </motion.div>
    </div>
  );
}

/* ─── Digital Marketing Animation ─────────────────────────── */
function DigitalMarketingVisual() {
  const metrics = [
    { label: "Impressions", value: "2.4M", color: "#6C3FEF", inc: "+18%" },
    { label: "Conversions", value: "12.8K", color: "#10b981", inc: "+34%" },
    { label: "ROAS", value: "4.2x", color: "#f59e0b", inc: "+22%" },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="space-y-4 w-72">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-5 border border-border shadow-xl"
        >
          <div className="text-xs font-black text-text-secondary uppercase tracking-widest mb-4">Campaign Performance</div>
          <div className="flex items-end gap-2 h-24">
            {[40, 65, 45, 80, 55, 90, 72, 95, 60, 85, 70, 100].map((h, i) => (
              <motion.div key={i} className="flex-1 rounded-t-lg bg-primary"
                initial={{ height: 0 }} animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.06, duration: 0.5, type: "spring" }}
                style={{ opacity: 0.4 + h / 180 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[9px] text-text-secondary font-bold">Jan</span>
            <span className="text-[9px] text-text-secondary font-bold">Dec</span>
          </div>
        </motion.div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-white rounded-2xl p-3 border border-border shadow-lg text-center"
            >
              <div className="text-lg font-black" style={{ color: m.color }}>{m.value}</div>
              <div className="text-[9px] text-text-secondary font-bold mt-0.5">{m.label}</div>
              <div className="text-[9px] font-black text-green-500 mt-1">{m.inc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating platform icons */}
      <motion.div animate={{ y: [-8, 4, -8], rotate: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-6 right-4 bg-[#1877F2] text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl font-black text-xl">f</motion.div>
      <motion.div animate={{ y: [4, -8, 4], rotate: [3, -3, 3] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-20 -right-2 bg-gradient-to-br from-[#f09433] to-[#bc1888] text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl">
        <Target size={22} />
      </motion.div>
      <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute top-4 left-2 bg-white border border-border text-dark px-3 py-2 rounded-2xl shadow-lg text-xs font-black flex items-center gap-2">
        <Search size={12} className="text-primary" /> SEO #1 Rank
      </motion.div>
    </div>
  );
}

/* ─── Mobile App Animation ─────────────────────────────────── */
function MobileAppVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Center phone */}
      <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-40 h-72 bg-[#0f172a] rounded-[2.5rem] border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#0f172a] rounded-b-2xl z-20 border-b border-slate-600" />
        <div className="flex-1 bg-gradient-to-b from-[#6C3FEF] to-[#0ea5e9] p-4 flex flex-col justify-between">
          <div className="space-y-2 mt-6">
            <div className="h-2 bg-white/30 rounded-full w-3/4" />
            <div className="h-2 bg-white/20 rounded-full w-1/2" />
          </div>
          <div className="space-y-2">
            <div className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/30 rounded-full" />
              <div className="space-y-1">
                <div className="h-2 bg-white/40 rounded-full w-16" />
                <div className="h-1.5 bg-white/20 rounded-full w-12" />
              </div>
            </div>
            <div className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/30 rounded-full" />
              <div className="space-y-1">
                <div className="h-2 bg-white/40 rounded-full w-20" />
                <div className="h-1.5 bg-white/20 rounded-full w-10" />
              </div>
            </div>
          </div>
          <div className="flex justify-around pb-2">
            {[Smartphone, Globe, Database].map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Icon size={18} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Ghosted background phones */}
      <motion.div animate={{ y: [8, -8, 8], x: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        className="absolute left-10 z-10 w-32 h-56 bg-slate-200 rounded-[2rem] border-4 border-slate-300 opacity-50 shadow-xl" />
      <motion.div animate={{ y: [-5, 12, -5], x: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
        className="absolute right-10 z-10 w-32 h-56 bg-slate-800 rounded-[2rem] border-4 border-slate-600 opacity-40 shadow-xl" />

      {/* Floating labels */}
      <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-4 right-4 bg-white border border-border rounded-2xl px-3 py-2 shadow-lg text-xs font-black flex gap-2 items-center z-30">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Flutter
      </motion.div>
      <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
        className="absolute bottom-8 left-2 bg-dark text-white rounded-2xl px-3 py-2 shadow-lg text-xs font-black z-30">
        iOS + Android ✓
      </motion.div>
    </div>
  );
}

/* ─── UI/UX Design Animation ───────────────────────────────── */
function UIUXVisual() {
  const frames = [
    { title: "Wireframe", offset: 40, rotate: -8, bg: "bg-white border border-slate-200" },
    { title: "Lo-Fi", offset: 20, rotate: -4, bg: "bg-slate-50 border border-primary/20" },
    { title: "Hi-Fi", offset: 0, rotate: 0, bg: "bg-white border border-primary/40 shadow-2xl" },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {frames.map((f, i) => (
          <motion.div
            key={i}
            animate={{ y: [0 - i * 4, 8 - i * 4, 0 - i * 4] }}
            transition={{ duration: 3.5 + i, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute w-72 rounded-3xl p-5 ${f.bg}`}
            style={{ top: -f.offset, transform: `rotate(${f.rotate}deg)`, zIndex: i + 1 }}
          >
            <div className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3">{f.title}</div>
            {i === 2 ? (
              <div className="space-y-3">
                <div className="h-24 bg-gradient-to-r from-primary to-[#0ea5e9] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-black text-sm">Hero Section</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["Service 1", "Service 2", "Service 3"].map((s) => (
                    <div key={s} className="h-16 bg-surface rounded-xl border border-border flex items-center justify-center">
                      <span className="text-[9px] font-black text-text-secondary">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="h-8 bg-primary rounded-xl" />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="h-16 bg-slate-100 rounded-xl" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-12 bg-slate-100 rounded-xl" />
                  <div className="h-12 bg-slate-100 rounded-xl" />
                </div>
                <div className="h-6 bg-slate-100 rounded-full w-2/3" />
              </div>
            )}
          </motion.div>
        ))}
        {/* Cursor */}
        <motion.div
          animate={{ x: [60, 180, 80, 220, 60], y: [40, 100, 160, 80, 40] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-40 pointer-events-none"
        >
          <div className="relative">
            <div className="w-4 h-4 border-2 border-primary bg-primary/20 rounded-full" />
            <div className="absolute -bottom-5 left-4 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">Design</div>
          </div>
        </motion.div>
      </div>

      {/* Color palette */}
      <motion.div animate={{ y: [-5, 5, -5], rotate: [0, 3, 0] }} transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-4 right-6 bg-white border border-border rounded-2xl p-3 shadow-xl">
        <div className="text-[9px] font-black text-text-secondary mb-2 uppercase">Brand Palette</div>
        <div className="flex gap-2">
          {["#6C3FEF", "#0ea5e9", "#10b981", "#f59e0b", "#0f172a"].map((c) => (
            <div key={c} className="w-6 h-6 rounded-full shadow-sm" style={{ background: c }} />
          ))}
        </div>
      </motion.div>

      <motion.div animate={{ y: [5, -8, 5] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-4 left-4 bg-[#6C3FEF] text-white rounded-2xl px-3 py-2 text-xs font-black shadow-lg flex items-center gap-2">
        <PenTool size={12} /> Figma Pro
      </motion.div>
    </div>
  );
}

/* ─── Main Export ──────────────────────────────────────────── */
export function DynamicService3D({ slug }: { slug: string }) {
  const s = (slug || "").toLowerCase();

  if (s.includes("ai") || s.includes("automat")) return <AIAutomationVisual />;
  if (s.includes("software") || s.includes("engineerin") || s.includes("erp")) return <SoftwareEngVisual />;
  if (s.includes("web") || s.includes("ecommerce") || s.includes("site")) return <WebDevVisual />;
  if (s.includes("digital") || s.includes("market") || s.includes("seo")) return <DigitalMarketingVisual />;
  if (s.includes("mobile") || s.includes("app")) return <MobileAppVisual />;
  if (s.includes("ui") || s.includes("ux") || s.includes("design")) return <UIUXVisual />;

  // Generic tech fallback — still unique
  return <SoftwareEngVisual />;
}
