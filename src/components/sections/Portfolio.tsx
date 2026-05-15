"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Portfolio = ({ data }: { data?: any[] }) => {
  const displayProjects = data && data.length > 0 ? data : [];

  return (
    <section className="section-padding bg-surface tech-grid relative">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-6 max-w-2xl">
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest"
              >
                Case Studies
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
              >
                Shipped <span className="text-primary">Products.</span>
              </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <Link href="/portfolio" className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-border font-bold text-dark hover:bg-surface hover:text-primary transition-colors shadow-sm">
                View All Projects <ArrowUpRight size={18} />
             </Link>
          </motion.div>
        </div>

        <div className="space-y-32">
          {displayProjects.map((project, i) => {
            const isEven = i % 2 === 0;

            return (
              <div key={project.id} className={cn(
                "flex flex-col gap-12 lg:gap-20 items-center",
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              )}>
                 
                 {/* Visual Mockup Side */}
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95, rotateY: isEven ? 10 : -10 }}
                   whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   className="w-full lg:w-3/5 perspective-1000"
                 >
                    <div className="relative w-full rounded-t-2xl rounded-b-lg border-[8px] border-border bg-white shadow-2xl overflow-hidden aspect-[16/10]">
                       <div className="h-4 bg-surface border-b border-border flex items-center justify-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-border" />
                       </div>
                        <Link href={`/portfolio/${project.slug}`} className="relative w-full h-full bg-surface block">
                          {project.thumbnail_url ? (
                            <Image 
                              src={project.thumbnail_url}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                              <Monitor size={48} />
                            </div>
                          )}
                        </Link>
                    </div>
                    <div className="w-[110%] -ml-[5%] h-4 bg-border rounded-b-xl shadow-xl flex justify-center mt-0.5">
                      <div className="w-1/6 h-full bg-text-secondary/20 rounded-b-lg" />
                    </div>
                 </motion.div>

                 {/* Content Side */}
                 <motion.div 
                   initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: 0.2 }}
                   className="w-full lg:w-2/5 space-y-8"
                 >
                   <div className="space-y-4">
                     <div className="flex items-center gap-3">
                       <span className="px-3 py-1 bg-white border border-border rounded-md text-xs font-bold text-dark uppercase tracking-widest shadow-sm">
                         {project.category}
                       </span>
                       <span className="text-xs font-black text-text-secondary uppercase tracking-widest">{project.project_year}</span>
                     </div>
                      <Link href={`/portfolio/${project.slug}`}>
                        <h3 className="text-4xl md:text-5xl font-black text-dark tracking-tighter hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                     <p className="text-xl text-text-secondary font-medium leading-relaxed text-pretty">
                       {project.client_name}
                     </p>
                   </div>

                   <div className="space-y-4 pt-4 border-t border-border">
                     <div className="text-xs font-black text-dark uppercase tracking-widest">Technology Stack</div>
                     <div className="flex flex-wrap gap-2">
                       {(project.technologies || []).map((t: string, idx: number) => (
                         <div key={idx} className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-dark shadow-sm">
                           {t}
                         </div>
                       ))}
                     </div>
                   </div>

                    <div className="pt-6 flex items-center gap-6">
                       {project.project_link && (
                          <Link href={project.project_link} target="_blank" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
                            Launch Experience <ArrowUpRight size={18} />
                          </Link>
                       )}
                       <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-2 text-dark/40 font-black uppercase tracking-widest text-sm hover:text-primary transition-all">
                         View Case Study <ArrowUpRight size={18} />
                       </Link>
                    </div>
                 </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
