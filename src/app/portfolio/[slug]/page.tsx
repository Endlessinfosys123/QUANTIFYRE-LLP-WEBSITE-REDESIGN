import { getProjectBySlug } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Calendar, User, Layers, ExternalLink, ArrowLeft, CheckCircle2, Target, TrendingUp, Clock, Shield, Zap } from "lucide-react";
import Image from "next/image";
import * as motion from "framer-motion/client";

export const revalidate = 0;

const CHALLENGE_FALLBACKS: Record<string, { challenge: string; solution: string; outcome: string; results: { value: string; label: string }[] }> = {
  default: {
    challenge: "The client's existing system was a monolithic, legacy architecture that had accumulated years of technical debt. Manual processes were costing the team 40+ hours per week, data silos were preventing real-time decision making, and the system could not scale beyond 500 concurrent users without crashing.",
    solution: "We conducted a full technical audit and designed a modern microservices architecture. By migrating to a cloud-native stack with automated CI/CD pipelines, we eliminated manual bottlenecks, centralized data through a unified API layer, and implemented horizontal auto-scaling to handle unlimited concurrent users.",
    outcome: "The new system went live on schedule with zero downtime during migration. The client's team now operates 3x faster, infrastructure costs dropped by 40%, and the platform has scaled to serve 10,000+ daily active users without a single critical incident.",
    results: [
      { value: "3x", label: "Team Productivity" },
      { value: "40%", label: "Cost Reduction" },
      { value: "10K+", label: "Daily Active Users" },
      { value: "0", label: "Critical Incidents" },
    ],
  },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return <div className="p-20 text-center font-black text-red-500">DB_URL_MISSING</div>;
  }

  let project: any = null;
  try {
    project = await getProjectBySlug(slug);
  } catch (e) {}
  if (!project) notFound();

  const techStack = Array.isArray(project.technologies) ? project.technologies
    : Array.isArray(project.tags) ? project.tags : [];
  const clientName = project.client_name || "Enterprise Partner";
  const projectYear = project.project_year || "2024";
  const projectCategory = project.category || "Case Study";
  const heroImage = project.thumbnail_url || project.image_url;
  const pageContent = project.content;
  const fallback = CHALLENGE_FALLBACKS.default;

  return (
    <main className="bg-white min-h-screen">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-44 pb-24 overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary blur-[150px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="space-y-12 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4">
              <Link href="/portfolio" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-dark transition-all text-white/60">
                <ArrowLeft size={18} />
              </Link>
              <Badge className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] bg-white/10 text-white border-white/20">
                Case Study — {projectCategory}
              </Badge>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.88]">
              {project.title}<span className="text-primary">.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-3xl">
              {project.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              {[
                { icon: User,     label: "Client",     value: clientName },
                { icon: Calendar, label: "Year",       value: projectYear },
                { icon: Layers,   label: "Category",   value: projectCategory },
                { icon: Target,   label: "Stack",      value: techStack.slice(0, 2).join(", ") || "Custom" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[9px]">
                      <Icon size={10} /> {item.label}
                    </div>
                    <div className="text-white font-black text-lg tracking-tight">{item.value}</div>
                  </div>
                );
              })}
            </motion.div>

            {project.project_link && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Button href={project.project_link} target="_blank" size="lg" className="h-14 px-8 rounded-2xl text-base font-black">
                  View Live Project <ExternalLink className="ml-2" size={16} />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ HERO IMAGE ═══ */}
      {heroImage && (
        <section className="bg-dark pb-24">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative aspect-[16/7] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
              <Image src={heroImage} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══ RESULTS / METRICS ═══ */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container-custom">
          <div className="space-y-12">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Measurable Outcomes</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {fallback.results.map((r, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface rounded-3xl p-8 border border-border text-center hover:border-primary/30 transition-all shadow-sm">
                  <div className="text-5xl font-black text-primary mb-3">{r.value}</div>
                  <div className="text-xs font-black text-text-secondary uppercase tracking-widest">{r.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CHALLENGE → SOLUTION → OUTCOME ═══ */}
      <section className="py-24 bg-surface border-b border-border">
        <div className="container-custom max-w-5xl">
          <div className="space-y-20">
            {[
              { icon: Target,     color: "#ef4444", label: "The Challenge", text: fallback.challenge },
              { icon: Zap,        color: "#6C3FEF", label: "Our Solution",  text: fallback.solution },
              { icon: TrendingUp, color: "#10b981", label: "The Outcome",   text: fallback.outcome },
            ].map((block, i) => {
              const Icon = block.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
                  <div className="flex flex-col items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${block.color}18`, border: `1.5px solid ${block.color}44` }}>
                      <Icon size={24} style={{ color: block.color }} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: block.color }}>{block.label}</div>
                  </div>
                  <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                    <p className="text-text-secondary font-medium leading-relaxed text-lg">
                      {/* Use CMS content if available, else fallback */}
                      {i === 0 && pageContent && pageContent.length > 50 ? pageContent : block.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      {techStack.length > 0 && (
        <section className="py-20 bg-white border-b border-border">
          <div className="container-custom">
            <div className="space-y-10">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Technology Stack</div>
              <div className="flex flex-wrap gap-4">
                {techStack.map((tech: string, i: number) => (
                  <motion.span key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="px-6 py-3 bg-surface border border-border rounded-2xl text-base font-black text-dark shadow-sm hover:border-primary hover:text-primary transition-colors cursor-default">
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ KEY FEATURES DELIVERED ═══ */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="container-custom">
          <div className="space-y-10">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Key Features Delivered</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Custom Admin Dashboard", "Role-Based Access Control", "Real-Time Data Sync",
                "Automated Report Generation", "Third-Party API Integrations", "Mobile-Responsive Design",
                "Secure Authentication System", "Automated Testing Suite", "CI/CD Deployment Pipeline",
              ].map((feat, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                  <span className="font-bold text-dark text-sm">{feat}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT CLIENT SAID ═══ */}
      <section className="py-20 bg-primary">
        <div className="container-custom max-w-3xl text-center space-y-8">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Client Feedback</div>
          <blockquote className="text-3xl md:text-4xl font-black text-white leading-tight">
            "QUANTIFYRE delivered exactly what we needed — on time, on budget, and with a level of technical quality we hadn't seen before."
          </blockquote>
          <div className="font-black text-white/70 uppercase tracking-widest text-sm">— {clientName}</div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 bg-dark">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <Link href="/portfolio" className="group flex items-center gap-4 text-white font-black uppercase tracking-widest text-sm hover:text-primary transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                <ArrowLeft size={20} />
              </div>
              All Case Studies
            </Link>
            <div className="text-center md:text-right space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                Build Something <span className="text-primary">Like This?</span>
              </h2>
              <Button href="/contact" variant="primary" size="lg" className="h-14 px-8 rounded-2xl text-base font-black">
                Start Your Project <ArrowUpRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
