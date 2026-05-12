"use client";

import { motion } from "framer-motion";
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

export const Process = () => {
  return (
    <section className="section-padding bg-white relative border-y border-border">
      <div className="container-custom">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-6 max-w-2xl">
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-surface border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest"
              >
                Execution Methodology
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
              >
                How We <span className="text-primary">Ship.</span>
              </motion.h2>
           </div>
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary font-medium max-w-sm text-right hidden md:block"
           >
             A predictable, transparent engineering process designed to eliminate technical debt from day one.
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 relative">
          
          {/* Connecting Lines for Desktop */}
          <div className="absolute top-12 left-0 right-0 hidden lg:block h-px bg-border z-0">
             <motion.div 
               initial={{ scaleX: 0, originX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="w-full h-full bg-primary"
             />
          </div>

          {PROCESS_STEPS.map((step, i) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] || Cpu;
            
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10"
              >
                 <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-2xl bg-white border-2 border-primary shadow-xl flex items-center justify-center text-primary relative group">
                       <Icon size={32} strokeWidth={2.5} />
                       <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dark text-white flex items-center justify-center text-xs font-black shadow-lg">
                         {step.step}
                       </div>
                    </div>
                 </div>
                 
                 <div className="pl-2 border-l-2 border-border py-2">
                   <h3 className="text-2xl font-black text-dark mb-3 tracking-tight">
                     {step.title}
                   </h3>
                   <p className="text-text-secondary font-medium leading-relaxed">
                     {step.description}
                   </p>
                 </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
