"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROCESS_STEPS } from "@/lib/constants";
import { Search, Layers, Cpu, CheckCircle2, Rocket, TrendingUp } from "lucide-react";

const iconMap = {
  Search,
  Layers,
  Cpu,
  CheckCircle2,
  Rocket,
  TrendingUp,
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   IMMERSIVE VERTICAL TIMELINE — Process Section
   - Animated connector line grows as user scrolls
   - Each step card reveals with cinematic spring
   - Alternating left/right layout on desktop
   - Glassmorphism step cards with icon + glow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ProcessStep({
  step,
  index,
  isLeft,
}: {
  step: any;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = iconMap[step.icon as keyof typeof iconMap] || Cpu;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
          type: "spring",
          stiffness: 80,
          damping: 16,
        }}
        className={`w-full md:w-[calc(50%-3rem)] ml-12 md:ml-0 ${
          isLeft ? "md:text-right md:items-end" : "md:text-left md:items-start"
        } flex flex-col`}
      >
        <div className="group relative bg-white border border-emerald-50 rounded-3xl p-8 shadow-[0_4px_24px_rgba(34,197,94,0.06)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.14)] hover:border-emerald-100 transition-all duration-500 overflow-hidden cursor-default">
          {/* Corner glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

          {/* Step number badge */}
          <div
            className={`absolute top-6 ${
              isLeft ? "md:left-auto md:right-6 left-6" : "left-6"
            } flex`}
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-white text-[10px] font-black shadow-lg shadow-emerald-200">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div
            className={`relative z-10 pt-2 ${
              isLeft ? "md:flex md:flex-col md:items-end" : ""
            }`}
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-200 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon size={26} strokeWidth={2} />
            </div>

            <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-3">
              {step.title}
            </h3>

            <p className="text-slate-500 leading-relaxed font-medium text-[15px] max-w-sm">
              {step.description}
            </p>
          </div>

          {/* Bottom accent bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-bl-3xl"
            initial={{ width: "0%" }}
            animate={inView ? { width: "40%" } : {}}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.05 }}
          />
        </div>
      </motion.div>

      {/* ── Center node (only on desktop) ── */}
      <div className="absolute left-0 md:static md:flex-shrink-0 md:w-24 flex flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.05, type: "spring", stiffness: 200 }}
          className="w-10 h-10 rounded-full border-4 border-emerald-500 bg-white shadow-xl shadow-emerald-100 flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
            className="w-3 h-3 rounded-full bg-emerald-500"
          />
        </motion.div>
      </div>

      {/* ── Spacer for opposite side (desktop) ── */}
      <div className="hidden md:block w-[calc(50%-3rem)]" />
    </div>
  );
}

export const Process = ({ data }: { data?: any[] }) => {
  const displaySteps = data && data.length > 0 ? data : [];
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animated connector line that grows as user scrolls
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="section-padding bg-white relative overflow-hidden border-y border-emerald-50">
      {/* Subtle bg texture */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(34,197,94,0.07) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-custom relative z-10">
        {/* ── Header ── */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-5 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-black text-[11px] uppercase tracking-[0.3em]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Execution Methodology
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter"
            >
              How We{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400">
                Ship.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-medium max-w-xs text-right hidden md:block leading-relaxed"
          >
            A predictable, transparent engineering process designed to eliminate technical debt from day one.
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Vertical center line (desktop only) */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-px bg-emerald-100 overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-emerald-500 to-emerald-300"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-16">
            {displaySteps.map((step, i) => (
              <ProcessStep
                key={i}
                step={step}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
