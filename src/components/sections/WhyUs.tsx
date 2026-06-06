"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, ShieldCheck, Clock, Users, Globe, FileText } from "lucide-react";
import Image from "next/image";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATED NUMBER COUNTER
   Counts up from 0 to target value when it enters viewport
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AnimatedCounter({
  value,
  suffix = "",
  className = "",
}: {
  value: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    // Parse the numeric part and suffix from value like "12+", "100%", "8+"
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const valueSuffix = match[2] || suffix;
    const duration = 1800;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target * 10) / 10;
      setDisplay(`${Number.isInteger(current) ? current : current.toFixed(1)}${valueSuffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

const iconMap = {
  Zap,
  ShieldCheck,
  Clock,
  Users,
  Globe,
  FileText,
};

export const WhyUs = ({ data, stats }: { data?: any[]; stats?: any[] }) => {
  const displayFeatures = data && data.length > 0 ? data : [];

  const successRateRaw =
    stats?.find((s) => s.label.toLowerCase().includes("success"))?.value || "100%";
  const projectsCountRaw =
    stats?.find((s) => s.label.toLowerCase().includes("project"))?.value || "12+";

  return (
    <section className="section-padding bg-surface overflow-hidden relative">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(34,197,94,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── LEFT: Premium Generated Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Main image frame */}
            <div className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-[0_30px_80px_rgba(34,197,94,0.15)] aspect-[4/5]">
              <Image
                src="/whyus-dashboard.png"
                alt="Quantifyre Engineering Dashboard"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent" />
            </div>

            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-[3.5rem] border border-emerald-100/50 pointer-events-none" />

            {/* ── Floating badge: Success Rate ── */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 bg-white rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-emerald-50 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-800 leading-none">
                    <AnimatedCounter value={successRateRaw} />
                  </div>
                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.25em] mt-1">
                    Success Rate
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Floating badge: Projects ── */}
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -bottom-8 -left-8 bg-white rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-emerald-50 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                  <Globe size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-800 leading-none">
                    <AnimatedCounter value={projectsCountRaw} />
                  </div>
                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.25em] mt-1">
                    Projects Shipped
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <div className="space-y-14 order-1 lg:order-2">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3"
              >
                <div className="w-10 h-px bg-emerald-500" />
                <span className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.4em]">
                  Advantage
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-none"
              >
                Why Leaders Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400">
                  QUANTIFYRE.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl"
              >
                We merge creative vision with engineering precision to build
                software that doesn&apos;t just work—it dominates.
              </motion.p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayFeatures.map((feature, i) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap] || Zap;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.08 * i,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group cursor-default"
                  >
                    <div className="space-y-3">
                      <div className="w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-[0_4px_20px_rgba(34,197,94,0.12)] group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_8px_30px_rgba(34,197,94,0.3)] transition-all duration-400 border border-emerald-50">
                        <Icon size={22} />
                      </div>
                      <h4 className="text-lg font-black text-slate-800 tracking-tight">
                        {feature.title}
                      </h4>
                      <p className="text-slate-500 leading-relaxed font-medium text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
