"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Clock, Users, Globe, FileText } from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants";
import Image from "next/image";

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
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-12">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-primary font-bold text-xs uppercase tracking-[0.3em]"
              >
                The QUANTIFYRE Advantage
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold text-dark leading-tight"
              >
                Why Businesses Choose Us
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {WHY_CHOOSE_US.map((feature, i) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <h4 className="font-bold text-dark">{feature.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Graphic/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-[40px] -rotate-3" />
            <div className="relative aspect-square rounded-[32px] overflow-hidden border-8 border-white shadow-2xl">
              <Image
                src="https://placehold.co/800x800/F8F7FF/6C3FEF?text=Our+Team+at+Work"
                alt="Why Choose Quantifyre"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating Stats Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-border space-y-1 hidden md:block"
            >
              <div className="text-3xl font-black text-primary">98%</div>
              <div className="text-[10px] font-bold text-dark uppercase tracking-widest">Client Retention</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
