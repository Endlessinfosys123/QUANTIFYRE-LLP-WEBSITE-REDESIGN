import { getProjectBySlug, getPortfolio } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  ArrowUpRight, Calendar, Tag, User, 
  Layers, ExternalLink, ArrowLeft 
} from "lucide-react";
import Image from "next/image";
import * as motion from "framer-motion/client";

export const revalidate = 0;

export async function generateStaticParams() {
  const projects = await getPortfolio();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await params safely
  const { slug } = await params;
  
  // 2. Validate environment
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return <div className="p-20 text-center font-black text-red-500">CRITICAL ERROR: DATABASE_URL_MISSING</div>;
  }

  try {
    const project = await getProjectBySlug(slug);

    if (!project) {
      console.warn(`[ProjectPage] No record found for slug: ${slug}`);
      notFound();
    }

    // 3. Robust data normalization
    const techStack = Array.isArray(project.technologies) 
      ? project.technologies 
      : Array.isArray(project.tags) ? project.tags : [];
    
    const clientName = project.client_name || "Enterprise Partner";
    const projectYear = project.project_year || "2024";
    const projectCategory = project.category || "Case Study";
    const heroImage = project.thumbnail_url || project.image_url || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070";
    const pageContent = project.content || "Implementation details are currently being archived.";

    return (
      <main className="bg-white min-h-screen">
        
        {/* ═══════════════════════════════════════════
            PROJECT HERO — Cinematic Entry
        ═══════════════════════════════════════════ */}
        <section className="relative pt-48 pb-24 overflow-hidden bg-surface tech-grid border-b border-border">
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              
              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <Link href="/portfolio" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-white hover:border-primary transition-all text-text-secondary hover:text-primary">
                    <ArrowLeft size={18} />
                  </Link>
                  <Badge variant="surface" className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] bg-white">
                    Case Study: {projectCategory}
                  </Badge>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="text-6xl md:text-9xl font-black text-dark tracking-tighter leading-[0.85] text-balance"
                >
                  {project.title}.
                </motion.h1>

                <div className="grid grid-cols-2 gap-12 pt-10 border-t border-border">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                      <User size={12} /> Institutional Client
                    </div>
                    <p className="text-2xl font-black text-dark tracking-tight">{clientName}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                      <Calendar size={12} /> Milestone Date
                    </div>
                    <p className="text-2xl font-black text-dark tracking-tight">{projectYear}</p>
                  </div>
                </div>

                {project.project_link && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                     <Button href={project.project_link} target="_blank" size="lg" className="h-20 px-12 rounded-2xl text-xl font-black shadow-2xl shadow-primary/20">
                       Explore Platform <ExternalLink className="ml-3" size={20} />
                     </Button>
                  </motion.div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="relative aspect-square rounded-[4rem] overflow-hidden border-[16px] border-white shadow-2xl group"
              >
                 <Image 
                  src={heroImage} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-[5s] group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            PROJECT CONTENT — Detailed Breakdown
        ═══════════════════════════════════════════ */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto space-y-32">
              
              {/* The Mission Statement */}
              <div className="space-y-10">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">The Objective</div>
                <h2 className="text-5xl font-black text-dark tracking-tighter leading-none">Architecting <br/> <span className="text-primary">Performance.</span></h2>
                <div className="prose prose-2xl prose-slate max-w-none font-medium text-text-secondary leading-relaxed italic border-l-4 border-primary/20 pl-8">
                  {project.description}
                </div>
              </div>

              {/* Tech Infrastructure Bento */}
              <div className="space-y-10 p-12 md:p-16 bg-surface rounded-[4rem] border border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Layers size={120} className="text-primary" />
                </div>
                <div className="relative z-10 space-y-10">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                        <Tag size={24} />
                     </div>
                     <h3 className="text-3xl font-black text-dark tracking-tight uppercase tracking-tighter">Technology Stack</h3>
                   </div>
                   <div className="flex flex-wrap gap-4">
                     {techStack.map((tech: string, i: number) => (
                       <div key={i} className="px-8 py-4 bg-white border border-border rounded-2xl text-xl font-black text-dark shadow-sm hover:border-primary hover:text-primary transition-all cursor-default">
                         {tech}
                       </div>
                     ))}
                   </div>
                </div>
              </div>

              {/* Detailed Case Study (TipTap Content) */}
              <div className="prose prose-xl prose-slate max-w-none space-y-12">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-8">Implementation Registry</div>
                <div className="text-text-secondary font-medium" dangerouslySetInnerHTML={{ __html: pageContent }} />
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FOOTER NAVIGATION — Continuous Flow
        ═══════════════════════════════════════════ */}
        <section className="py-32 bg-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-dark.svg')] opacity-10" />
          <div className="container-custom relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
            <Link href="/portfolio" className="group flex items-center gap-6 text-white font-black uppercase tracking-[0.3em] text-sm">
               <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                  <ArrowLeft size={24} />
               </div>
               <span>Return to Repository</span>
            </Link>
            
            <div className="text-center md:text-right space-y-6">
               <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Next Milestone?</h2>
               <Button href="/contact" variant="primary" size="lg" className="h-20 px-12 rounded-2xl text-xl font-black">
                  Start Your Project <ArrowUpRight className="ml-3" />
               </Button>
            </div>
          </div>
        </section>

      </main>
    );
  } catch (error) {
    console.error(`[ProjectPage] Runtime crash for slug: ${slug}`, error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-center">
        <div className="space-y-4 p-12 bg-white rounded-3xl border border-border shadow-2xl">
           <h2 className="text-3xl font-black text-dark">Registry Error</h2>
           <p className="text-text-secondary font-medium">This case study is currently being re-indexed.</p>
           <Button href="/portfolio" variant="outline">Back to Portfolio</Button>
        </div>
      </div>
    );
  }
}

