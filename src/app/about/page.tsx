"use client";

import { motion } from "framer-motion";
import { STATS, TECH_STACK, WHY_CHOOSE_US, TESTIMONIALS, PROCESS_STEPS } from "@/lib/constants";
import { 
  Users, Target, Shield, Server, Zap, ShieldCheck, Clock, Globe, FileText,
  CheckCircle2, Quote, ArrowRight, Building2, Award, Linkedin, Instagram
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Icon map for WHY_CHOOSE_US
const iconMap: Record<string, React.ElementType> = {
  Zap, ShieldCheck, Clock, Users, Globe, FileText, Target, Shield, Server,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest mb-6"
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* ═══════════════════════════════════════════
          HERO — Company Command Center
      ═══════════════════════════════════════════ */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-surface tech-grid border-b border-border">
        {/* Floating cartoon blobs */}
        <div className="absolute top-20 right-16 w-72 h-72 bg-primary/8 rounded-full blur-[80px] animate-morph-blob pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/8 rounded-full blur-[70px] animate-morph-blob delay-300 pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Typography */}
            <div className="space-y-8 max-w-2xl">
              <SectionLabel><Building2 size={14} /> About QUANTIFYRE LLP</SectionLabel>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-7xl md:text-8xl font-black text-dark tracking-tighter leading-[0.88]"
              >
                Builders of<br />
                <span className="text-primary">Digital Empires.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary font-medium leading-relaxed text-pretty max-w-lg"
              >
                QUANTIFYRE LLP (LLPIN: ACG-0636) is a registered IT engineering firm based in Gandhinagar, India — building AI-powered digital infrastructure for ambitious businesses globally.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
                  Work With Us <ArrowRight size={18} />
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-border text-dark font-black rounded-2xl hover:border-primary hover:text-primary transition-all">
                  Our Services
                </Link>
              </motion.div>
            </div>

            {/* Right — Command Center Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-white rounded-2xl border border-border shadow-2xl overflow-hidden"
            >
              <div className="h-12 bg-surface border-b border-border flex items-center justify-between px-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-xs font-bold text-text-secondary uppercase tracking-widest">company.dashboard</div>
              </div>
              <div className="p-6 space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="bg-surface border border-border rounded-xl p-4 group hover:border-primary transition-colors"
                    >
                      <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className="text-4xl font-black text-dark">{stat.value}<span className="text-primary text-2xl">{stat.suffix}</span></div>
                    </motion.div>
                  ))}
                </div>
                {/* Activity Bar */}
                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-3">Project Velocity</div>
                  <div className="flex items-end gap-2 h-14">
                    {[35, 55, 40, 80, 60, 95, 70, 100, 75, 90, 65, 85].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-full bg-primary rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.6 + i * 0.05, type: "spring" }}
                      />
                    ))}
                  </div>
                </div>
                {/* Status row */}
                <div className="flex items-center gap-3 text-xs font-bold text-text-secondary">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  All Systems Operational
                  <span className="ml-auto text-primary">Since 2024</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MISSION & VISION
      ═══════════════════════════════════════════ */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                emoji: "🎯",
                label: "Our Mission",
                title: "Accelerate Ambition",
                text: "To democratize access to enterprise-grade technology. We build intelligent systems that let every business — from a Gandhinagar startup to a Dubai-based enterprise — compete at the highest level.",
                bg: "bg-primary/5 border-primary/20",
              },
              {
                emoji: "🔭",
                label: "Our Vision",
                title: "The Future, Faster",
                text: "A world where every business decision is powered by intelligent data, every operation is automated, and every product experience is pixel-perfect. We are engineering that world — one deployment at a time.",
                bg: "bg-accent/5 border-accent/20",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={cn("rounded-3xl border-2 p-10 md:p-14 space-y-6", item.bg)}
              >
                <div className="text-5xl animate-float inline-block">{item.emoji}</div>
                <div className="text-xs font-black uppercase tracking-widest text-primary">{item.label}</div>
                <h2 className="text-4xl font-black text-dark tracking-tight">{item.title}</h2>
                <p className="text-lg text-text-secondary font-medium leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY CHOOSE US — Bento Grid
      ═══════════════════════════════════════════ */}
      <section className="section-padding bg-surface tech-grid border-b border-border">
        <div className="container-custom">
          <div className="mb-16">
            <SectionLabel>Why QUANTIFYRE</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
            >
              Operating <span className="text-primary">Principles.</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bento-card p-8 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-black text-dark mb-3">{item.title}</h3>
                  <p className="text-text-secondary font-medium leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TECH STACK SHOWCASE
      ═══════════════════════════════════════════ */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container-custom">
          <div className="mb-16">
            <SectionLabel>Technology Expertise</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
            >
              Our Full <span className="text-primary">Stack.</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(TECH_STACK).map(([category, techs], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-border rounded-2xl p-6 shadow-sm"
              >
                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {category.replace("_", " & ")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-bold text-dark hover:border-primary hover:text-primary transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR PROCESS
      ═══════════════════════════════════════════ */}
      <section className="section-padding bg-surface tech-grid border-b border-border">
        <div className="container-custom">
          <div className="mb-16">
            <SectionLabel>How We Work</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
            >
              Our Process. <span className="text-primary">Zero Surprises.</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-border rounded-2xl p-8 relative group hover:border-primary transition-colors shadow-sm"
              >
                <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm shadow-lg shadow-primary/30">
                  {step.step}
                </div>
                <div className="mt-4 mb-3">
                  <h3 className="text-xl font-black text-dark">{step.title}</h3>
                </div>
                <p className="text-text-secondary font-medium leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container-custom">
          <div className="mb-16">
            <SectionLabel>Client Stories</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
            >
              What Clients <span className="text-primary">Say.</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bento-card p-8 flex flex-col gap-6"
              >
                <Quote size={36} className="text-primary/30" strokeWidth={1.5} />
                <p className="text-lg font-medium text-dark leading-relaxed flex-1 italic">"{t.quote}"</p>
                <div className="pt-6 border-t border-border">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <span key={j} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>
                  <div className="font-black text-dark">{t.author}</div>
                  <div className="text-sm text-text-secondary font-medium">{t.role} · {t.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LEGAL / COMPANY INFO FOOTER CARD
      ═══════════════════════════════════════════ */}
      <section className="section-padding bg-surface tech-grid">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-border rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-lg"
          >
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <Award size={28} className="text-primary" />
                <div>
                  <div className="font-black text-2xl text-dark">QUANTIFYRE LLP</div>
                  <div className="text-sm font-bold text-text-secondary">LLPIN: ACG-0636 · Registered in India</div>
                </div>
              </div>
              <p className="text-text-secondary font-medium leading-relaxed max-w-lg">
                A fully registered Limited Liability Partnership. We operate with complete legal accountability, transparent billing, and enterprise-grade NDA compliance for all client engagements.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="https://instagram.com/quantifyre_llp_official" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-border rounded-xl font-bold text-dark hover:border-primary hover:text-primary transition-colors text-sm">
                  <Instagram size={16} /> Instagram
                </a>
                <a href="https://linkedin.com/in/tishypatelofficial" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-border rounded-xl font-bold text-dark hover:border-primary hover:text-primary transition-colors text-sm">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
            <div className="shrink-0 text-center space-y-3">
              <div className="w-28 h-28 rounded-3xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto animate-float">
                <Building2 size={56} className="text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-xs font-black text-text-secondary uppercase tracking-widest">Est. 2024</div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
