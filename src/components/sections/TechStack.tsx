"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_STACK } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export const TechStack = ({ data }: { data?: any[] }) => {
  const displayTech = data && data.length > 0 ? data : [];

  // Group by category
  const techByCategory: Record<string, string[]> = displayTech.reduce((acc: any, item: any) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item.name);
    return acc;
  }, {});

  const categories = ["All", ...Object.keys(techByCategory)];
  const [activeTab, setActiveTab] = React.useState("All");

  const filteredTech = activeTab === "All" 
    ? Array.from(new Set(displayTech.map(item => item.name)))
    : techByCategory[activeTab] || [];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-xs uppercase tracking-[0.3em]"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-dark"
          >
            Our Technology Stack
          </motion.h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                activeTab === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                  : "bg-surface text-text-secondary hover:bg-primary/5 hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => (
              <motion.div
                key={tech}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Badge variant="surface" className="px-6 py-3 text-sm lowercase font-bold tracking-tight bg-white border-2 border-surface hover:border-primary/20 transition-colors shadow-sm">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
