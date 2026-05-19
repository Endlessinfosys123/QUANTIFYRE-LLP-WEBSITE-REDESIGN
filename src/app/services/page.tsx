export const revalidate = 0;
import { getServices } from "@/lib/supabase/data";
import { SERVICES } from "@/lib/constants";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { ArrowRight, Brain, Code2, Monitor, BarChart3, Smartphone, PenTool, CheckCircle2, Zap, Clock, Globe, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ICON_MAP: Record<string, any> = {
  Brain, Code2, Monitor, BarChart3, Smartphone, PenTool
};

const SERVICE_COLORS: Record<string, { from: string; to: string; accent: string }> = {
  "ai-automation":      { from: "#6C3FEF", to: "#a855f7", accent: "#ddd6fe" },
  "software-engineering":{ from: "#0ea5e9", to: "#38bdf8", accent: "#bae6fd" },
  "web-development":    { from: "#10b981", to: "#34d399", accent: "#a7f3d0" },
  "digital-marketing":  { from: "#f59e0b", to: "#fbbf24", accent: "#fde68a" },
  "mobile-development": { from: "#ef4444", to: "#f87171", accent: "#fecaca" },
  "uiux-design":        { from: "#8b5cf6", to: "#c084fc", accent: "#ede9fe" },
};

const WHY_US = [
  { icon: Zap,         title: "AI-First Approach",        desc: "Every solution we build has intelligent automation at its core — not as an afterthought." },
  { icon: Clock,       title: "On-Time Delivery",         desc: "Strict sprint cycles, weekly demos, and zero surprise delays. We respect your deadlines." },
  { icon: ShieldCheck, title: "Enterprise-Grade Security",desc: "OWASP compliance, end-to-end encryption, and RBAC built into every project by default." },
  { icon: Globe,       title: "International Experience", desc: "Clients across India, UAE, UK, Canada, and Australia — we work across time zones seamlessly." },
];

export default async function ServicesPage() {
  const dbServices = await getServices().catch(() => []);
  // Use DB data if available, else fall back to constants
  const services = dbServices.length > 0 ? dbServices : SERVICES.map((s, i) => ({
    ...s, slug: s.id, title: s.title, description: s.description,
  }));

  return (
    <main className="bg-white min-h-screen">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-surface tech-grid border-b border-border">
        {/* Animated background orbs */}
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary blur-[120px] pointer-events-none" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent blur-[100px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-border shadow-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Service Portfolio — Quantifyre LLP</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-[7rem] font-black text-dark tracking-tighter leading-[0.88] text-balance">
              What We<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#0ea5e9]">Build.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-3xl mx-auto">
              Six high-performance engineering disciplines. One team. Complete digital transformation
              from strategy through launch — for companies that refuse to compromise.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3">
              {["AI Automation", "Custom Software", "Web Development", "Mobile Apps", "Digital Marketing", "UI/UX Design"].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-white border border-border rounded-full text-xs font-black text-text-secondary shadow-sm">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICE CARDS GRID ═══════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Our Disciplines</div>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                Six Services. <span className="text-primary">One Roof.</span>
              </h2>
              <p className="text-text-secondary font-medium max-w-xl mx-auto">
                Each service is a complete practice — not a side offering. Click any to see full details, deliverables, and case studies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((svc: any, i: number) => {
                const slug = svc.slug || svc.id;
                const colors = SERVICE_COLORS[slug] || { from: "#6C3FEF", to: "#a855f7", accent: "#ddd6fe" };
                const staticSvc = SERVICES.find(s => s.id === slug);
                const Icon = ICON_MAP[staticSvc?.icon || "Code2"] || Code2;
                const deliverables = staticSvc?.deliverables || [];
                const tech = staticSvc?.tech || [];

                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group relative bg-white rounded-3xl border border-border shadow-sm hover:shadow-2xl hover:border-transparent transition-all duration-500 overflow-hidden flex flex-col"
                  >
                    {/* Gradient top bar */}
                    <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${colors.from}, ${colors.to})` }} />

                    {/* Icon area */}
                    <div className="p-8 pb-0">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                        style={{ background: `linear-gradient(135deg, ${colors.from}22, ${colors.to}22)`, border: `1.5px solid ${colors.from}44` }}>
                        <Icon size={28} style={{ color: colors.from }} />
                      </div>

                      <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: colors.from }}>
                        {`0${i + 1}. Service`}
                      </div>
                      <h3 className="text-2xl font-black text-dark tracking-tight mb-3">{svc.title}</h3>
                      <p className="text-text-secondary font-medium leading-relaxed text-sm mb-6">{svc.description}</p>
                    </div>

                    {/* Deliverables */}
                    {deliverables.length > 0 && (
                      <div className="px-8 pb-6">
                        <div className="text-[9px] font-black uppercase tracking-widest text-text-secondary mb-3">Includes</div>
                        <div className="space-y-2">
                          {deliverables.map((d: string, j: number) => (
                            <div key={j} className="flex items-center gap-3">
                              <CheckCircle2 size={14} style={{ color: colors.from }} className="flex-shrink-0" />
                              <span className="text-sm font-bold text-dark">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech stack pills */}
                    {tech.length > 0 && (
                      <div className="px-8 pb-6">
                        <div className="flex flex-wrap gap-2">
                          {tech.map((t: string) => (
                            <span key={t} className="px-3 py-1 rounded-full text-[10px] font-black"
                              style={{ background: colors.accent, color: colors.from }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto p-8 pt-0">
                      <Link href={`/services/${slug}`}
                        className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 font-black text-sm group/cta"
                        style={{ borderColor: `${colors.from}33`, color: colors.from }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = colors.from;
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = colors.from;
                        }}
                      >
                        <span>View Full Details</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none rounded-3xl"
                      style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHY QUANTIFYRE ═══════════════════ */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container-custom">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Why Us</div>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                The Quantifyre <span className="text-primary">Difference</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_US.map((w, i) => {
                const Icon = w.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-black text-dark mb-3">{w.title}</h3>
                    <p className="text-text-secondary font-medium text-sm leading-relaxed">{w.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROCESS SNAPSHOT ═══════════════════ */}
      <section className="py-24 bg-dark text-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">How We Work</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                From Idea to <span className="text-primary">Live Product</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {["Discovery", "UI/UX Design", "Development", "QA & Testing", "Deployment", "Support"].map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto text-primary font-black">
                    0{i + 1}
                  </div>
                  <div className="text-sm font-black text-white">{step}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-none">
              Not Sure Which <br /><span className="text-primary">Service You Need?</span>
            </h2>
            <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto">
              Book a free 30-minute strategy session. We'll assess your requirements and recommend the right combination of services to hit your goals.
            </p>
            <Button href="/contact" size="lg" className="h-16 px-10 rounded-2xl text-lg font-black shadow-xl shadow-primary/20">
              Book Free Strategy Call <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
