"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PortfolioPage() {
  const categories = ["All", "Web", "Mobile", "AI", "ERP", "Marketing"];
  const [activeTab, setActiveTab] = React.useState("All");

  const filteredProjects = activeTab === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.industry === activeTab || p.tech.some(t => t.includes(activeTab)));

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 border-b border-border">
        <div className="container-custom">
          <div className="max-w-3xl space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold text-sm uppercase tracking-[0.3em]"
            >
              Our Work
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-extrabold text-dark leading-tight"
            >
              Building Solutions That <span className="text-primary">Matter</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary leading-relaxed"
            >
              Explore our portfolio of high-performance web applications, enterprise software, and AI-powered solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-20">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-bold transition-all duration-300",
                  activeTab === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "bg-surface text-text-secondary hover:bg-primary/5 hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="p-0 overflow-hidden group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-sm p-8 text-center space-y-4">
                        <p className="text-white text-sm font-medium leading-relaxed">
                          {project.description}
                        </p>
                        <Link
                          href="#"
                          className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                        >
                          <ArrowUpRight size={24} />
                        </Link>
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="surface">{project.industry}</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[10px] font-black text-text-secondary/60 uppercase tracking-widest">{t}</span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Search size={60} className="mx-auto text-gray-200 mb-6" />
              <h3 className="text-2xl font-bold text-dark">No projects found</h3>
              <p className="text-text-secondary mt-2">Try another category or contact us for case studies.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
