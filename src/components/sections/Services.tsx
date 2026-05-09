"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Monitor, BarChart3, Smartphone, PenTool, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

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
    <section className="section-padding bg-white" id="services">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-xs uppercase tracking-[0.3em]"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-dark"
          >
            What We Build For You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg"
          >
            End-to-end digital transformation — from AI automation to enterprise software.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <Card key={service.id} className="group">
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-primary/5">
                    <Icon size={28} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm group/link"
                  >
                    Learn More
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
