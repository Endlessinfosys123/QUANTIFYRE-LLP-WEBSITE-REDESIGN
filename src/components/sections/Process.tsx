"use client";

import { motion } from "framer-motion";
import { Search, Layers, Cpu, CheckCircle2, Rocket, TrendingUp, Sparkles } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = {
  Search,
  Layers,
  Cpu,
  CheckCircle2,
  Rocket,
  TrendingUp,
};

export const Process = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden" id="process">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-32 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.4em]"
          >
            <Sparkles size={14} />
            Execution
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-tight"
          >
            From Vision to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Impact.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-text-secondary text-xl font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Our precise, battle-tested methodology ensures your project scales from a bold idea to a market-leading reality.
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated Path (Desktop) */}
          <div className="hidden lg:block absolute top-[120px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-12">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-32 h-32 rounded-[2.5rem] bg-white border border-primary/10 shadow-2xl shadow-primary/5 flex items-center justify-center text-primary relative z-10 group-hover:bg-primary group-hover:text-white transition-all duration-700"
                    >
                      <Icon size={40} strokeWidth={1.5} />
                    </motion.div>
                    
                    {/* Step Number Badge */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-white text-primary text-lg font-black flex items-center justify-center shadow-xl border border-primary/5 z-20 group-hover:scale-110 transition-transform duration-500">
                      0{step.step}
                    </div>

                    {/* Connecting Dot */}
                    <div className="hidden lg:block absolute top-[120px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
                  </div>

                  <div className="space-y-4 px-4">
                    <h3 className="text-2xl font-black text-dark tracking-tight group-hover:text-primary transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
