import { getServiceBySlug, getServices } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  ArrowRight, CheckCircle2, Sparkles, Zap, 
  ShieldCheck, Clock, BarChart3, ChevronRight 
} from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";

export const revalidate = 0;

/*
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}
*/

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await params safely
  const { slug } = await params;
  
  // 2. Validate environment
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return <div className="p-20 text-center font-black text-red-500">CRITICAL ERROR: DATABASE_URL_MISSING</div>;
  }

  try {
    const service = await getServiceBySlug(slug);

    if (!service) {
      console.warn(`[ServicePage] No record found for slug: ${slug}`);
      notFound();
    }

    // 3. Robust data normalization
    const stats = Array.isArray(service.detail_page_stats) ? service.detail_page_stats : [];
    const capabilities = Array.isArray(service.detail_page_capabilities) 
      ? service.detail_page_capabilities 
      : Array.isArray(service.features) ? service.features : [];
    const roadmap = Array.isArray(service.detail_page_roadmap) ? service.detail_page_roadmap : [];
    const pageBadge = service.detail_page_badge || service.title || "Service Detail";
    const pageH1 = service.detail_page_h1 || service.title || "Enterprise Solution";
    const pageSubtext = service.detail_page_subtext || service.description || "";
    const pageContent = service.content || "Service protocols are being documented.";

    return (
      <main className="bg-white min-h-screen pb-20">
        
        {/* ═══════════════════════════════════════════
            HERO — Dynamic Service Entry
        ═══════════════════════════════════════════ */}
        <section className="relative pt-48 pb-32 overflow-hidden bg-surface tech-grid">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
             <div className="w-full h-full flex items-center justify-center text-[40vw] font-black text-dark select-none">
                {service.icon || "S"}
             </div>
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-border shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                  {pageBadge}
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-6xl md:text-9xl font-black text-dark tracking-tighter leading-[0.85] text-balance"
              >
                {pageH1}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-3xl text-text-secondary font-medium leading-relaxed max-w-3xl mx-auto text-pretty"
              >
                {pageSubtext}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <Button href="/contact" size="lg" className="h-20 px-12 rounded-2xl text-xl font-black shadow-2xl shadow-primary/20">
                  Engage Expertise <ArrowRight className="ml-3" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            STATS — Performance Metrics
        ═══════════════════════════════════════════ */}
        {stats.length > 0 && (
          <section className="relative z-20 -mt-16 container-custom">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border border-border rounded-3xl p-10 shadow-xl group hover:border-primary transition-all"
                  >
                     <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">{stat.label}</div>
                     <div className="text-5xl font-black text-dark group-hover:text-primary transition-colors">{stat.value}</div>
                  </motion.div>
                ))}
             </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            CAPABILITIES — Modular Index
        ═══════════════════════════════════════════ */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
               <div className="space-y-12 sticky top-32">
                  <div className="space-y-6">
                     <h2 className="text-5xl md:text-7xl font-black text-dark tracking-tighter">Core <span className="text-primary">Architecture.</span></h2>
                     <p className="text-xl text-text-secondary font-medium leading-relaxed max-w-lg">
                        Our {service.title} protocols are engineered for strict compliance, extreme performance, and limitless scale.
                     </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                     {capabilities.map((item: any, i: number) => (
                       <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-border hover:bg-surface transition-colors">
                          <CheckCircle2 size={24} className="text-primary" />
                          <span className="font-black text-dark uppercase text-xs tracking-wider">{item}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="space-y-8 bg-surface rounded-[3rem] p-12 border border-border">
                  <div className="prose prose-xl prose-slate max-w-none">
                    <h3 className="text-3xl font-black text-dark mb-8 tracking-tight uppercase tracking-tighter">Execution Protocol</h3>
                    <div className="text-text-secondary font-medium" dangerouslySetInnerHTML={{ __html: pageContent }} />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            ROADMAP — Delivery Timeline
        ═══════════════════════════════════════════ */}
        {roadmap.length > 0 && (
          <section className="section-padding bg-surface border-y border-border">
            <div className="container-custom">
              <h2 className="text-5xl font-black text-dark mb-16 tracking-tighter text-center italic">Deployment <span className="text-primary">Phase-lines.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 {roadmap.map((phase: any, i: number) => (
                   <div key={i} className="relative space-y-4">
                      <div className="text-7xl font-black text-primary/10 absolute -top-8 -left-4">0{i+1}</div>
                      <h4 className="text-xl font-black text-dark relative z-10 pt-4 uppercase tracking-tighter">{phase.title}</h4>
                      <p className="text-sm text-text-secondary font-bold leading-relaxed">{phase.description}</p>
                      {i < roadmap.length - 1 && (
                        <ChevronRight size={32} className="absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 text-border hidden md:block" />
                      )}
                   </div>
                 ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            CTA — Engagement Terminal
        ═══════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="bg-dark rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-dark.svg')] opacity-20" />
               <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                  <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">Initiate <br/> <span className="text-primary">Collaboration.</span></h2>
                  <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
                     Scale your infrastructure with {service.title}. Our engineers are standing by for deployment.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                     <Button href="/contact" variant="primary" size="lg" className="h-20 px-12 rounded-2xl text-xl font-black">Get Architecture Proposal</Button>
                     <Button href="/portfolio" variant="outline" size="lg" className="h-20 px-12 rounded-2xl text-xl font-black text-white border-slate-700">View Benchmarks</Button>
                  </div>
               </div>
            </div>
          </div>
        </section>

      </main>
    );
  } catch (error) {
    console.error(`[ServicePage] Runtime crash for slug: ${slug}`, error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-4 p-12 bg-white rounded-3xl border border-border shadow-2xl">
           <h2 className="text-3xl font-black text-dark">Data Retrieval Error</h2>
           <p className="text-text-secondary font-medium">The architecture registry is currently unavailable for this module.</p>
           <Button href="/services" variant="outline">Back to Services</Button>
        </div>
      </div>
    );
  }
}

