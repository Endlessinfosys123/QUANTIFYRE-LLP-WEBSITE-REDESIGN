"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Brain, Code2, Monitor, BarChart3, Smartphone, PenTool, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const iconMap = {
  Brain,
  Code2,
  Monitor,
  BarChart3,
  Smartphone,
  PenTool,
};

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="bg-dark py-24 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold text-sm uppercase tracking-[0.3em]"
            >
              Our Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1]"
            >
              Building the <span className="text-primary">Future</span> of Enterprise Software
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              From bespoke AI automation to enterprise-grade cloud platforms, we deliver end-to-end digital excellence.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Detailed Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-20">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={cn(
                    "flex flex-col lg:flex-row gap-12 items-center",
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  )}
                >
                  {/* Left: Content */}
                  <div className="flex-1 space-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-primary shadow-sm">
                      <Icon size={32} />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-4xl font-extrabold text-dark">{service.title}</h2>
                      <p className="text-text-secondary text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-dark font-medium">
                          <CheckCircle2 size={18} className="text-primary" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap gap-2">
                      {service.tech.map((t) => (
                        <span key={t} className="px-4 py-1.5 bg-surface text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-primary/5">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6">
                      <Button href="/contact" className="gap-2">
                        Get Started with {service.title} <ArrowRight size={20} />
                      </Button>
                    </div>
                  </div>

                  {/* Right: Illustration Placeholder */}
                  <div className="flex-1 w-full">
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                      <Image
                        src={`https://placehold.co/800x600/6C3FEF/FFFFFF?text=${service.title}`}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// Utility to fix missing import in this file
import { cn } from "@/lib/utils";
import Image from "next/image";
