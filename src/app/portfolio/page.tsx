export const revalidate = 0;
import { getPortfolio } from "@/lib/supabase/data";
import { PROJECTS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

const INDUSTRIES = ["All", "Education", "Marketing", "Automotive", "HealthTech", "E-Commerce", "SaaS"];

const STATS = [
  { value: "12+", label: "Projects Delivered" },
  { value: "8+",  label: "Happy Clients" },
  { value: "4",   label: "Countries Served" },
  { value: "100%",label: "On-Time Delivery" },
];

export default async function PortfolioPage() {
  const dbProjects = await getPortfolio().catch(() => []);
  const projects = dbProjects.length > 0 ? dbProjects : PROJECTS.map((p: any) => ({
    id: p.id, title: p.title, slug: String(p.id),
    description: p.description, category: p.industry,
    technologies: p.tech, thumbnail_url: p.image,
    thumbnail_image: p.image,
  }));

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <main className="bg-white min-h-screen">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-40 pb-16 overflow-hidden bg-dark text-white">
        {/* Animated grid background */}
        <div className="absolute inset-0 tech-grid opacity-10" />
        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0.18, 0.08] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-primary blur-[150px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="space-y-8 max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-white/80 font-black uppercase tracking-[0.3em] text-[10px]">Case Study Registry — Quantifyre LLP</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
              className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.88]">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#0ea5e9]">Work.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="text-xl text-white/60 font-medium leading-relaxed max-w-2xl mx-auto">
              Real projects. Real clients. Real results. Every case study here represents a business problem we solved with precision engineering.
            </motion.p>
          </div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {STATS.map((s, i) => (
              <div key={i} className="text-center p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-4xl font-black text-primary mb-2">{s.value}</div>
                <div className="text-xs font-black text-white/40 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED PROJECT ═══════════════════ */}
      {featured && (
        <section className="py-20 bg-surface border-b border-border">
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
                        <span key={t} className="px-4 py-2 bg-white border border-border rounded-full text-xs font-black text-dark shadow-sm">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm group-hover:gap-6 transition-all">
                    <span>Read Case Study</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-[8px] border-white shadow-2xl group-hover:shadow-primary/20 transition-shadow">
                  {featured.thumbnail_url ? (
                    <Image src={featured.thumbnail_url} alt={featured.title} fill className="object-cover transition-transform duration-[8s] group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-[#0ea5e9]/20 flex items-center justify-center">
                      <span className="text-6xl font-black text-primary/20">{featured.title?.[0]}</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <ExternalLink size={16} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════ ALL PROJECTS GRID ═══════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="space-y-16">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">All Projects</div>
                <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                  Complete <span className="text-primary">Portfolio</span>
                </h2>
              </div>
              <div className="hidden md:flex gap-2">
                {INDUSTRIES.slice(0, 5).map((ind) => (
                  <span key={ind} className="px-4 py-2 rounded-full text-xs font-black text-text-secondary border border-border bg-surface hover:border-primary hover:text-primary transition-colors cursor-pointer">
                    {ind}
                  </span>
                ))}
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
                  <Link href={`/portfolio/${proj.slug || proj.id}`} className="group block bg-white rounded-3xl border border-border shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                      {proj.thumbnail_url ? (
                        <Image src={proj.thumbnail_url} alt={proj.title} fill className="object-cover transition-transform duration-[6s] group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-[#0ea5e9]/10 flex items-center justify-center">
                          <span className="text-7xl font-black text-primary/10">{proj.title?.[0]}</span>
                        </div>
                      )}
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-dark/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                          {proj.category || "Case Study"}
                        </span>
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <ArrowUpRight size={15} className="text-dark" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-black text-dark tracking-tight group-hover:text-primary transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-text-secondary font-medium text-sm leading-relaxed line-clamp-2">
                        {proj.description}
                      </p>
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

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-24 bg-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Your Project<br /><span className="text-primary">Next?</span>
            </h2>
            <p className="text-xl text-slate-400 font-medium max-w-xl mx-auto">
              Let's turn your idea into the next case study on this page. Book a free consultation — proposal in 48 hours.
            </p>
            <Button href="/contact" size="lg" className="h-16 px-10 rounded-2xl text-lg font-black">
              Start a Project <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
