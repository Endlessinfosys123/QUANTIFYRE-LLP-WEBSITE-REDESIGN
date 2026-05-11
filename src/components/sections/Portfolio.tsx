"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";

export const Portfolio = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden" id="portfolio">
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -right-20 w-[40vw] h-[40vw] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[40vw] h-[40vw] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary font-black text-xs uppercase tracking-[0.5em]">Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-none"
            >
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Digital Landmarks.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Magnetic>
              <Button href="/portfolio" variant="outline" className="h-16 px-10 rounded-2xl border-primary/20 text-primary hover:bg-primary/5 group">
                View All Case Studies <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={i % 2 === 1 ? "md:mt-24" : ""}
            >
              <Card className="p-0 overflow-hidden group bg-transparent border-none shadow-none">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] bg-surface border border-primary/5 shadow-2xl shadow-primary/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  
                  {/* Floating Badge on Image */}
                  <div className="absolute top-8 left-8 z-20">
                    <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2">
                      <Sparkles size={14} className="text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-dark">{project.industry}</span>
                    </div>
                  </div>

                  {/* Overlay Link */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px] flex items-center justify-center">
                    <Magnetic>
                      <Link
                        href="/portfolio"
                        className="w-20 h-20 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500"
                      >
                        <ExternalLink size={32} />
                      </Link>
                    </Magnetic>
                  </div>
                </div>

                <div className="pt-10 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-primary/5 text-[10px] font-bold text-primary uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-dark tracking-tighter group-hover:text-primary transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-lg leading-relaxed font-medium line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center gap-4 text-primary font-black text-sm uppercase tracking-[0.3em] group/link"
                    >
                      Case Study
                      <div className="w-12 h-px bg-primary/20 group-hover/link:w-20 transition-all duration-500" />
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
