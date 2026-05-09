"use client";

import { motion } from "framer-motion";
import { Search, Layers, Cpu, CheckCircle2, Rocket, TrendingUp } from "lucide-react";
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
    <section className="section-padding bg-surface" id="process">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-xs uppercase tracking-[0.3em]"
          >
            How We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-dark"
          >
            Our Proven Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg"
          >
            A systematic approach that delivers on time, on budget, every time.
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated Dashed Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dashed border-primary/20 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 relative z-10">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-surface shadow-xl flex items-center justify-center text-primary relative z-10">
                      <Icon size={32} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg border-2 border-white">
                      {step.step}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-dark">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
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
