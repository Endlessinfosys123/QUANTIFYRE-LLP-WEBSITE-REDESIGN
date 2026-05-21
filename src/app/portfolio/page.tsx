export const revalidate = 0;
import { getPortfolio } from "@/lib/supabase/data";
import { PROJECTS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { ArrowRight, ArrowUpRight, ExternalLink, TrendingUp, Users, Globe, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TypewriterHeadline, HeroBadge, FloatingShape, HeroGridBg, UnderlineReveal } from "@/components/ui/PageHero";

const STATS = [
  { icon: TrendingUp, value: "12+", label: "Projects Delivered", color: "#22c55e" },
  { icon: Users,      value: "8+",  label: "Happy Clients",      color: "#10b981" },
  { icon: Globe,      value: "4",   label: "Countries Served",   color: "#6ee7b7" },
  { icon: Clock,      value: "100%",label: "On-Time Delivery",   color: "#34d399" },
];

export default async function PortfolioPage() {
  const dbProjects = await getPortfolio().catch(() => []);
  const projects = dbProjects.length > 0 ? dbProjects : PROJECTS.map((p: any) => ({
    id: p.id, title: p.title, slug: String(p.id),
    description: p.description, category: p.industry,
    technologies: p.tech, thumbnail_url: p.image,
  }));

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <main className="bg-white min-h-screen">

      {/* ═══ HERO — Typewriter + Animated Stat Burst ═══ */}
      <section className="relative pt-44 pb-28 overflow-hidden bg-white border-b border-emerald-50">
        <HeroGridBg variant="dots" />
        <FloatingShape size={550} x="-12%" y="-20%" color="rgba(34,197,94,0.06)"  blur={110} delay={0} />
        <FloatingShape size={380} x="68%"  y="55%"  color="rgba(16,185,129,0.05)" blur={80}  delay={2} />
        <FloatingShape size={240} x="82%"  y="-10%" color="rgba(110,231,183,0.07)" blur={55} delay={1} />

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{ background: "linear-gradient(90deg, #22c55e, #10b981, #6ee7b7, transparent)" }}
        />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">

            {/* Badge */}
            <div className="flex justify-center">
              <HeroBadge icon={<Briefcase size={14} />} label="Case Study Registry — Quantifyre LLP" />
            </div>

            {/* Typewriter headline */}
            <div className="space-y-4">
              <TypewriterHeadline
                text="Our Work."
                className="text-7xl md:text-[9rem] font-black text-dark tracking-tighter leading-[0.88]"
                delay={0.2}
                speed={0.06}
              />
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 1.2, duration: 0.65 }}
                className="text-xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto"
              >
                Real projects. Real clients. Real results. Every case study here represents a business problem we solved with precision engineering.
              </motion.p>
            </div>

            {/* Animated stat cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 1.4 } } }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.7, y: 20 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 16 } },
                    }}
                    whileHover={{ y: -5, boxShadow: `0 12px 30px ${s.color}22` }}
                    className="text-center p-5 rounded-2xl bg-white border border-emerald-100 shadow-sm transition-all cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${s.color}18` }}>
                      <Icon size={16} style={{ color: s.color }} />
                    </div>
                    <div className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">{s.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══ FEATURED PROJECT ═══ */}
      {featured && (
        <section className="py-20 bg-white border-b border-border">
          <div className="container-custom">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-12">Featured Case Study</div>
            <Link href={`/portfolio/${featured.slug || featured.id}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{featured.category || "Case Study"}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-dark tracking-tighter leading-tight group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                  </div>
                  <p className="text-xl text-text-secondary font-medium leading-relaxed">{featured.description}</p>
                  {featured.technologies && (
                    <div className="flex flex-wrap gap-3">
                      {(Array.isArray(featured.technologies) ? featured.technologies : []).slice(0, 5).map((t: string) => (
                        <span key={t} className="px-4 py-2 bg-surface border border-border rounded-full text-xs font-black text-dark shadow-sm">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm group-hover:gap-6 transition-all">
                    <span>Read Case Study</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-[8px] border-surface shadow-2xl group-hover:shadow-primary/10 transition-shadow">
                  {featured.thumbnail_url ? (
                    <Image src={featured.thumbnail_url} alt={featured.title} fill className="object-cover transition-transform duration-[8s] group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-[#0ea5e9]/10 flex items-center justify-center">
                      <span className="text-8xl font-black text-primary/10">{featured.title?.[0]}</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors">
                    <ExternalLink size={16} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ═══ ALL PROJECTS GRID ═══ */}
      <section className="py-24 bg-surface border-b border-border">
        <div className="container-custom">
          <div className="space-y-16">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">All Projects</div>
                <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                  Complete <span className="text-primary">Portfolio</span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj: any, i: number) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/portfolio/${proj.slug || proj.id}`}
                    className="group block bg-white rounded-3xl border border-border shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                      {proj.thumbnail_url ? (
                        <Image src={proj.thumbnail_url} alt={proj.title} fill className="object-cover transition-transform duration-[6s] group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-[#0ea5e9]/10 flex items-center justify-center">
                          <span className="text-7xl font-black text-primary/10">{proj.title?.[0]}</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-dark text-[10px] font-black uppercase tracking-widest rounded-full border border-border/50">
                          {proj.category || "Case Study"}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-sm">
                        <ArrowUpRight size={15} className="text-dark" />
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-black text-dark tracking-tight group-hover:text-primary transition-colors">{proj.title}</h3>
                      <p className="text-text-secondary font-medium text-sm leading-relaxed line-clamp-2">{proj.description}</p>
                      {proj.technologies && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {(Array.isArray(proj.technologies) ? proj.technologies : []).slice(0, 4).map((t: string) => (
                            <span key={t} className="px-3 py-1 bg-surface border border-border rounded-full text-[10px] font-black text-text-secondary">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA — Light ═══ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-none">
              Your Project<br /><span className="text-primary">Next?</span>
            </h2>
            <p className="text-xl text-text-secondary font-medium max-w-xl mx-auto">
              Let's turn your idea into the next case study on this page. Book a free consultation — proposal in 48 hours.
            </p>
            <Button href="/contact" size="lg" className="h-16 px-10 rounded-2xl text-lg font-black shadow-xl shadow-primary/20">
              Start a Project <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
