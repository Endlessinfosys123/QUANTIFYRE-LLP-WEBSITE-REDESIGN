export const revalidate = 0;
import { getServices } from "@/lib/supabase/data";
import { SERVICES } from "@/lib/constants";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { ArrowRight, Brain, Code2, Monitor, BarChart3, Smartphone, PenTool, CheckCircle2, Zap, Clock, Globe, ShieldCheck, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SplitHeadline, HeroBadge, FloatingShape, HeroGridBg } from "@/components/ui/PageHero";

const ICON_MAP: Record<string, any> = { Brain, Code2, Monitor, BarChart3, Smartphone, PenTool };

const SERVICE_META: Record<string, { from: string; to: string; bg: string; text: string }> = {
  "ai-automation":       { from: "#6C3FEF", to: "#a855f7", bg: "bg-violet-50",  text: "text-violet-700" },
  "software-engineering":{ from: "#0ea5e9", to: "#38bdf8", bg: "bg-sky-50",     text: "text-sky-700"    },
  "web-development":     { from: "#10b981", to: "#34d399", bg: "bg-emerald-50", text: "text-emerald-700" },
  "digital-marketing":   { from: "#f59e0b", to: "#fbbf24", bg: "bg-amber-50",   text: "text-amber-700"  },
  "mobile-development":  { from: "#ef4444", to: "#f87171", bg: "bg-red-50",     text: "text-red-700"    },
  "uiux-design":         { from: "#8b5cf6", to: "#c084fc", bg: "bg-purple-50",  text: "text-purple-700" },
};

const WHY_US = [
  { icon: Zap,         title: "AI-First Approach",         desc: "Every solution we build has intelligent automation at its core — not as an afterthought." },
  { icon: Clock,       title: "On-Time Delivery",          desc: "Strict sprint cycles, weekly demos, and zero surprise delays. We respect your deadlines." },
  { icon: ShieldCheck, title: "Enterprise-Grade Security", desc: "OWASP compliance, end-to-end encryption, and RBAC built into every project by default." },
  { icon: Globe,       title: "International Experience",  desc: "Clients across India, UAE, UK, Canada, and Australia — we work across time zones seamlessly." },
];

const SERVICE_TAGS = ["AI Automation", "Custom Software", "Web Development", "Mobile Apps", "Digital Marketing", "UI/UX Design"];

export default async function ServicesPage() {
  const dbServices = await getServices().catch(() => []);
  const services = dbServices.length > 0 ? dbServices : SERVICES.map((s) => ({
    ...s, slug: s.id,
  }));

  return (
    <main className="bg-white min-h-screen">

      {/* ═══════════ HERO — Staggered Word + Floating Tags ═══════════ */}
      <section className="relative pt-44 pb-28 overflow-hidden bg-white border-b border-emerald-50">
        {/* Background */}
        <HeroGridBg variant="lines" />
        <FloatingShape size={600} x="-15%" y="-30%" color="rgba(34,197,94,0.05)" blur={120} delay={0} />
        <FloatingShape size={400} x="70%"  y="50%"  color="rgba(16,185,129,0.06)" blur={90}  delay={3} />
        <FloatingShape size={280} x="55%"  y="-15%" color="rgba(110,231,183,0.07)" blur={60} delay={1.5} />

        {/* Top accent line */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{ background: "linear-gradient(90deg, #22c55e, #10b981, transparent)" }}
        />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">

            {/* Badge */}
            <div className="flex justify-center mb-10">
              <HeroBadge icon={<Layers size={14} />} label="Service Portfolio — Quantifyre LLP" />
            </div>

            {/* Giant animated headline */}
            <div className="text-center space-y-6 mb-12">
              <SplitHeadline
                text="What We "
                highlight="Build."
                className="text-6xl md:text-8xl lg:text-[7rem] font-black text-dark tracking-tighter leading-[0.88] text-balance"
                highlightClass="text-transparent bg-clip-text"
                delay={0.1}
              />
              {/* Apply gradient via style on the highlight span — workaround */}
              <style>{`.services-hero-highlight { background: linear-gradient(135deg,#22c55e,#10b981); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }`}</style>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.55, duration: 0.65 }}
                className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-3xl mx-auto"
              >
                Six high-performance engineering disciplines. One team. Complete digital transformation
                from strategy through launch — for companies that refuse to compromise.
              </motion.p>
            </div>

            {/* Staggered floating service tags */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } } }}
              className="flex flex-wrap justify-center gap-3"
            >
              {SERVICE_TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.85 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 16 } },
                  }}
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(34,197,94,0.15)" }}
                  className="px-5 py-2.5 bg-white border border-emerald-100 rounded-full text-xs font-black text-slate-600 shadow-sm cursor-default transition-shadow"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex justify-center gap-4 mt-12"
            >
              <Button href="/contact" size="lg" className="h-14 px-10 rounded-2xl font-black text-base shadow-lg shadow-primary/20">
                Start a Project <ArrowRight className="ml-2" size={18} />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════ SERVICE CARDS ═══════════ */}
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
                const meta = SERVICE_META[slug] || { from: "#6C3FEF", to: "#a855f7", bg: "bg-violet-50", text: "text-violet-700" };
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
                    <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${meta.from}, ${meta.to})` }} />

                    <div className="p-8 pb-0">
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                        style={{ background: `${meta.from}15`, border: `1.5px solid ${meta.from}33` }}>
                        <Icon size={28} style={{ color: meta.from }} />
                      </div>
                      {/* Number + Title */}
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: meta.from }}>
                        {`0${i + 1}. Service`}
                      </div>
                      <h3 className="text-2xl font-black text-dark tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                        {svc.title}
                      </h3>
                      <p className="text-text-secondary font-medium leading-relaxed text-sm mb-6">
                        {svc.description}
                      </p>
                    </div>

                    {/* Deliverables */}
                    {deliverables.length > 0 && (
                      <div className="px-8 pb-6">
                        <div className="text-[9px] font-black uppercase tracking-widest text-text-secondary mb-3">Includes</div>
                        <div className="space-y-2">
                          {deliverables.map((d: string, j: number) => (
                            <div key={j} className="flex items-center gap-3">
                              <CheckCircle2 size={14} style={{ color: meta.from }} className="flex-shrink-0" />
                              <span className="text-sm font-bold text-dark">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech pills */}
                    {tech.length > 0 && (
                      <div className="px-8 pb-6">
                        <div className="flex flex-wrap gap-2">
                          {tech.map((t: string) => (
                            <span key={t} className={`px-3 py-1 rounded-full text-[10px] font-black ${meta.bg} ${meta.text}`}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA — pure CSS hover via group class, no inline event handlers */}
                    <div className="mt-auto p-8 pt-0">
                      <Link href={`/services/${slug}`}
                        className="w-full flex items-center justify-between p-4 rounded-2xl border font-black text-sm transition-all duration-300 group-hover:text-white group-hover:border-transparent"
                        style={{ borderColor: `${meta.from}44`, color: meta.from,
                          ["--hover-bg" as string]: meta.from }}
                      >
                        <span>View Full Details</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY US ═══════════ */}
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

      {/* ═══════════ PROCESS ═══════════ */}
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

      {/* ═══════════ CTA ═══════════ */}
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
