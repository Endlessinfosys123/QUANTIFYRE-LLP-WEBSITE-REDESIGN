"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Portfolio = () => {
  return (
    <section className="section-padding bg-surface" id="portfolio">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-xs uppercase tracking-[0.3em]"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-dark"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg"
          >
            Real-world solutions built with cutting-edge technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {PROJECTS.map((project, i) => (
            <Card key={project.id} className="p-0 overflow-hidden group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <Link
                    href="/portfolio"
                    className="w-14 h-14 rounded-full bg-white text-primary flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl"
                  >
                    <ArrowUpRight size={28} />
                  </Link>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="surface">{project.industry}</Badge>
                  <div className="flex gap-2">
                    {project.tech.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm group/link pt-2"
                >
                  View Case Study
                  <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button href="/portfolio" variant="outline" className="gap-2">
            View All Projects <ArrowUpRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};
