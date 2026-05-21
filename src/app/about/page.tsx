export const revalidate = 0;
import { motion } from "framer-motion";
import { 
  getHeroSection, getStats, getWhyChooseUs, 
  getProcessSteps, getMissionVision, getTechStack,
  getTestimonials, getSiteConfig
} from "@/lib/supabase/data";
import { 
  Users, Target, Shield, Server, Zap, ShieldCheck, Clock, Globe, FileText,
  CheckCircle2, Quote, ArrowRight, Building2, Award, Linkedin, Instagram, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as motionClient from "framer-motion/client";
import { SplitHeadline, HeroBadge, FloatingShape, HeroGridBg, UnderlineReveal } from "@/components/ui/PageHero";

// Icon map for WHY_CHOOSE_US
const iconMap: Record<string, React.ElementType> = {
  Zap, ShieldCheck, Clock, Users, Globe, FileText, Target, Shield, Server,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motionClient.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest mb-6"
    >
      {children}
    </motionClient.div>
  );
}

export default async function AboutPage() {
  const [
    hero, stats, whyUs, process, missionVision, techStack, testimonials, config
  ] = await Promise.all([
    getHeroSection('about'),
    getStats(),
    getWhyChooseUs(),
    getProcessSteps(),
    getMissionVision(),
    getTechStack(),
    getTestimonials(),
    getSiteConfig()
  ]);

  // Group tech stack by category
  const groupedTech = techStack.reduce((acc: any, tech: any) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech.name);
    return acc;
  }, {});

  return (
    <main className="bg-white min-h-screen">
      
      {/* ═══════════════════════════════════════════
          HERO — Animated Split-Text + Floating Orbs
      ═══════════════════════════════════════════ */}
      <section className="relative pt-44 pb-28 overflow-hidden bg-white border-b border-emerald-50">
        {/* Background */}
        <HeroGridBg variant="dots" />
        <FloatingShape size={500} x="-10%" y="-20%" color="rgba(34,197,94,0.06)" blur={100} delay={0} />
        <FloatingShape size={350} x="65%" y="60%" color="rgba(16,185,129,0.05)" blur={80} delay={2} />
        <FloatingShape size={250} x="80%" y="5%" color="rgba(110,231,183,0.08)" blur={60} delay={1} />

        {/* Animated accent top line */}
        <motionClient.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{ background: "linear-gradient(90deg, #22c55e, #10b981, #6ee7b7, transparent)" }}
        />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* LEFT — Text */}
            <div className="space-y-8 max-w-2xl">
              <HeroBadge icon={<Building2 size={14} />} label={`About ${config.site_name || "QUANTIFYRE LLP"}`} />

              {/* Animated word-by-word headline */}
              <SplitHeadline
                text={`${hero?.heading_line1 || "Builders of"} `}
                highlight={hero?.heading_highlight || "Digital Empires."}
                className="text-6xl md:text-7xl lg:text-8xl font-black text-dark tracking-tighter leading-[0.9] text-balance"
                highlightClass="text-primary"
                delay={0.1}
              />

              <motionClient.p
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl text-text-secondary font-medium leading-relaxed text-pretty max-w-lg"
              >
                {hero?.subtext || "QUANTIFYRE LLP is a registered IT engineering firm building AI-powered digital infrastructure for ambitious businesses globally."}
              </motionClient.p>

              <motionClient.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                  Work With Us <ArrowRight size={18} />
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-emerald-100 text-dark font-black rounded-2xl hover:border-primary hover:text-primary transition-all shadow-sm">
                  Our Services
                </Link>
              </motionClient.div>

              {/* Inline stat chips */}
              <motionClient.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                {stats.slice(0, 3).map((stat: any, i: number) => (
                  <motionClient.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.95 + i * 0.1, type: "spring" }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-emerald-100 rounded-2xl shadow-sm"
                  >
                    <span className="text-xl font-black text-dark">{stat.value}<span className="text-primary text-base">{stat.suffix}</span></span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                  </motionClient.div>
                ))}
              </motionClient.div>
            </div>

            {/* RIGHT — Animated Dashboard Card */}
            <motionClient.div
              initial={{ opacity: 0, x: 50, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-50 to-transparent rounded-3xl" />

              <div className="relative bg-white rounded-3xl border border-emerald-100 shadow-2xl shadow-emerald-50 overflow-hidden">
                {/* Window bar */}
                <div className="h-11 bg-slate-50 border-b border-emerald-50 flex items-center justify-between px-5">
                  <div className="flex gap-1.5">
                    {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                      <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">company.dashboard</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-400">LIVE</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Stat grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {stats.slice(0, 4).map((stat: any, i: number) => (
                      <motionClient.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(34,197,94,0.1)" }}
                        className="bg-gradient-to-br from-white to-emerald-50/50 border border-emerald-100 rounded-2xl p-4 transition-all"
                      >
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{stat.label}</div>
                        <div className="text-3xl font-black text-dark">{stat.value}<span className="text-primary text-xl">{stat.suffix}</span></div>
                      </motionClient.div>
                    ))}
                  </div>

                  {/* Bar chart */}
                  <div className="bg-slate-50 rounded-2xl border border-emerald-50 p-4">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Project Velocity</div>
                    <div className="flex items-end gap-1.5 h-14">
                      {[35, 55, 40, 80, 60, 95, 70, 100, 75, 90, 65, 85].map((h, i) => (
                        <motionClient.div
                          key={i}
                          className="flex-1 rounded-t-md"
                          style={{ background: `rgba(34,197,94,${0.4 + (h / 100) * 0.6})` }}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.7 + i * 0.04, type: "spring", stiffness: 120 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-500">
                    <motionClient.div
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    All Systems Operational
                    <span className="ml-auto text-primary font-black">Est. 2024</span>
                  </div>
                </div>
              </div>
            </motionClient.div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionVision.map((item: any, i: number) => (
              <motionClient.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={cn(
                  "rounded-3xl border-2 p-10 md:p-14 space-y-6", 
                  i === 0 ? "bg-primary/5 border-primary/20" : "bg-accent/5 border-accent/20"
                )}
              >
                <div className="text-5xl animate-float inline-block">{item.type === 'mission' ? '🎯' : '🔭'}</div>
                <div className="text-xs font-black uppercase tracking-widest text-primary">{item.type === 'mission' ? 'Our Mission' : 'Our Vision'}</div>
                <h2 className="text-4xl font-black text-dark tracking-tight">{item.title}</h2>
                <p className="text-lg text-text-secondary font-medium leading-relaxed">{item.content}</p>
              </motionClient.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding bg-surface tech-grid border-b border-border">
        <div className="container-custom">
          <div className="mb-16">
            <SectionLabel>Why {config.site_name || "QUANTIFYRE"}</SectionLabel>
            <motionClient.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
            >
              Operating <span className="text-primary">Principles.</span>
            </motionClient.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item: any, i: number) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <motionClient.div
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
                </motionClient.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container-custom">
          <div className="mb-16">
            <SectionLabel>Technology Expertise</SectionLabel>
            <motionClient.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
            >
              Our Full <span className="text-primary">Stack.</span>
            </motionClient.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedTech).map(([category, techs]: any, i: number) => (
              <motionClient.div
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
                  {techs.map((tech: string) => (
                    <span key={tech} className="px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-bold text-dark hover:border-primary hover:text-primary transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </motionClient.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-padding bg-surface tech-grid border-b border-border">
        <div className="container-custom">
          <div className="mb-16">
            <SectionLabel>How We Work</SectionLabel>
            <motionClient.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
            >
              Our Process. <span className="text-primary">Zero Surprises.</span>
            </motionClient.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step: any, i: number) => (
              <motionClient.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-border rounded-2xl p-8 relative group hover:border-primary transition-colors shadow-sm"
              >
                <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm shadow-lg shadow-primary/30">
                  {i + 1}
                </div>
                <div className="mt-4 mb-3">
                  <h3 className="text-xl font-black text-dark">{step.title}</h3>
                </div>
                <p className="text-text-secondary font-medium leading-relaxed">{step.description}</p>
              </motionClient.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container-custom">
          <div className="mb-16">
            <SectionLabel>Client Stories</SectionLabel>
            <motionClient.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
            >
              What Clients <span className="text-primary">Say.</span>
            </motionClient.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t: any, i: number) => (
              <motionClient.div
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
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <span key={j} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>
                  <div className="font-black text-dark">{t.author_name}</div>
                  <div className="text-sm text-text-secondary font-medium">{t.author_role} · {t.author_company}</div>
                </div>
              </motionClient.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEGAL INFO CARD */}
      <section className="section-padding bg-surface tech-grid">
        <div className="container-custom">
          <motionClient.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-border rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-lg"
          >
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <Award size={28} className="text-primary" />
                <div>
                  <div className="font-black text-2xl text-dark">{config.site_name || "QUANTIFYRE LLP"}</div>
                  <div className="text-sm font-bold text-text-secondary">LLPIN: {config.llpin || "ACG-0636"} · Registered in India</div>
                </div>
              </div>
              <p className="text-text-secondary font-medium leading-relaxed max-w-lg">
                {config.legal_description || "A fully registered Limited Liability Partnership. We operate with complete legal accountability, transparent billing, and enterprise-grade NDA compliance."}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {config.instagram_url && (
                  <a href={config.instagram_url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-border rounded-xl font-bold text-dark hover:border-primary hover:text-primary transition-colors text-sm">
                    <Instagram size={16} /> Instagram
                  </a>
                )}
                {config.linkedin_url && (
                  <a href={config.linkedin_url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-border rounded-xl font-bold text-dark hover:border-primary hover:text-primary transition-colors text-sm">
                    <Linkedin size={16} /> LinkedIn
                  </a>
                )}
              </div>
            </div>
            <div className="shrink-0 text-center space-y-3">
              <div className="w-28 h-28 rounded-3xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto animate-float">
                <Building2 size={56} className="text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-xs font-black text-text-secondary uppercase tracking-widest">Est. 2024</div>
            </div>
          </motionClient.div>
        </div>
      </section>

    </main>
  );
}
