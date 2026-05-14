import { getProjectBySlug, getPortfolio } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Calendar, Tag, User } from "lucide-react";
import Image from "next/image";
import * as motion from "framer-motion/client";

export async function generateStaticParams() {
  const projects = await getPortfolio();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Project Hero */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-surface tech-grid">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Badge variant="surface" className="px-6 py-2 text-xs font-black uppercase tracking-[0.3em]">
                  {project.category}
                </Badge>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9]"
              >
                {project.title}.
              </motion.h1>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                    <User size={12} /> Client
                  </div>
                  <p className="text-xl font-bold text-dark">{project.client_name}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                    <Calendar size={12} /> Year
                  </div>
                  <p className="text-xl font-bold text-dark">{project.project_year}</p>
                </div>
              </div>

              {project.project_link && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                   <Button href={project.project_link} target="_blank" size="lg" className="h-20 px-12 rounded-2xl text-xl font-black shadow-xl shadow-primary/20">
                     Visit Experience <ArrowUpRight className="ml-3" />
                   </Button>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl"
            >
               <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Breakdown */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-24">
            {/* The Challenge */}
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-dark tracking-tight">The Mission.</h2>
              <div className="prose prose-2xl prose-slate max-w-none font-medium text-text-secondary leading-relaxed">
                {project.description}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-8 p-12 bg-surface rounded-[3rem] border border-border">
              <div className="flex items-center gap-4">
                <Tag className="text-primary" size={32} />
                <h3 className="text-3xl font-black text-dark tracking-tight">Technology Architecture</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {project.technologies?.map((tech: string, i: number) => (
                  <div key={i} className="px-6 py-3 bg-white border border-border rounded-2xl text-lg font-bold text-dark shadow-sm">
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Results Content */}
            <div className="prose prose-xl prose-slate max-w-none">
               <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="container-custom flex justify-between items-center">
          <Link href="/portfolio" className="text-primary font-black uppercase tracking-widest text-sm hover:translate-x-[-10px] transition-transform">
             ← Back to Portfolio
          </Link>
          <Button href="/contact" className="h-16 px-10 rounded-2xl font-black">
            Build Something Similar
          </Button>
        </div>
      </section>
    </main>
  );
}
