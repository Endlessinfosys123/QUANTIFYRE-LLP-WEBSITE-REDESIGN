"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Clock, Users, Globe, FileText, CheckCircle2 } from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants";
import Image from "next/image";
import { Card } from "@/components/ui/Card";

const iconMap = {
  Zap,
  ShieldCheck,
  Clock,
  Users,
  Globe,
  FileText,
};

export const WhyUs = () => {
  return (
    <section className="section-padding bg-surface overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 neural-grid opacity-30" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left: Interactive Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white bg-white">
              <Image
                src="https://placehold.co/1000x1200/F8F7FF/6366f1?text=Precision+Engineering"
                alt="Quantifyre Engineering"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating Achievement Badges */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 p-8 rounded-[2.5rem] bg-white shadow-2xl border border-primary/5 space-y-3 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div className="text-3xl font-black text-dark">100%</div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Success Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 p-8 rounded-[2.5rem] bg-white shadow-2xl border border-primary/5 space-y-3 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Globe size={24} />
                </div>
                <div>
                  <div className="text-3xl font-black text-dark">Global</div>
                  <div className="text-[10px] font-bold text-accent uppercase tracking-widest">Operations</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-16 order-1 lg:order-2">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-px bg-primary" />
                <span className="text-primary font-black text-xs uppercase tracking-[0.5em]">Advantage</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-none"
              >
                Why Leaders <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Choose QUANTIFYRE.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl"
              >
                We merge creative vision with engineering precision to build software that doesn't just work—it dominates.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {WHY_CHOOSE_US.map((feature, i) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="group"
                  >
                    <div className="space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xl shadow-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-primary/5">
                        <Icon size={24} />
                      </div>
                      <h4 className="text-xl font-black text-dark tracking-tight">{feature.title}</h4>
                      <p className="text-text-secondary leading-relaxed font-medium text-sm">
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
