"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Monitor, BarChart3, Smartphone, PenTool, ArrowRight, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";

const iconMap = {
  Brain,
  Code2,
  Monitor,
  BarChart3,
  Smartphone,
  PenTool,
};

export const Services = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden" id="services">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary font-black text-xs uppercase tracking-[0.5em]">Capabilities</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-none"
            >
              Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Digital Frontier.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-md"
          >
            <p className="text-text-secondary text-xl font-medium leading-relaxed">
              We don't just build software; we engineer competitive advantages through AI automation and enterprise-grade technology.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <Card className="group relative h-full p-12 border-primary/5 hover:border-primary/20 transition-all duration-700 bg-white shadow-2xl shadow-primary/5">
                  <div className="space-y-10 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="w-20 h-20 rounded-[2rem] bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl shadow-primary/5 border border-primary/5">
                        <Icon size={36} strokeWidth={1.5} />
                      </div>
                      <span className="text-5xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">0{i + 1}</span>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-dark group-hover:text-primary transition-colors duration-500 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-text-secondary text-lg leading-relaxed font-medium">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-primary/5">
                      <Link
                        href={`/services#${service.id}`}
                        className="inline-flex items-center gap-4 text-primary font-black text-sm uppercase tracking-widest group/link"
                      >
                        Explore Service
                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all duration-500">
                          <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                    <Sparkles className="text-primary/20" size={32} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
