"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Code2, Monitor, BarChart3, Smartphone, PenTool } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const iconMap = {
  Brain,
  Code2,
  Monitor,
  BarChart3,
  Smartphone,
  PenTool,
};

export const Services = ({ data }: { data?: any[] }) => {
  const displayServices = data && data.length > 0 ? data : [];

  return (
    <section className="section-padding bg-surface tech-grid relative" id="services">
      <div className="container-custom relative z-10">
        
        <div className="mb-20 flex items-end justify-between gap-8">
          <div className="space-y-6 max-w-3xl">
           <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest"
            >
              Core Capabilities
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-dark tracking-tighter"
            >
              Engineered for <span className="text-primary">Scale.</span>
            </motion.h2>
          </div>
          {/* Floating services character */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className="hidden lg:block shrink-0"
          >
            <img
              src="/characters/services-character.png"
              alt="Services Developer"
              className="w-40 h-40 object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
          {displayServices.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Code2;
            const isLarge = i === 0 || i === 3;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "bento-card group relative overflow-hidden flex flex-col p-8 md:p-10",
                  isLarge && "lg:col-span-2 lg:row-span-1"
                )}
              >
                 {/* Tech Background Graphic for Large Cards */}
                 {isLarge && (
                   <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-gradient-to-tl from-primary/5 to-transparent pointer-events-none rounded-tl-[100px] transition-transform duration-700 group-hover:scale-110" />
                 )}

                 <div className="relative z-10 flex-1">
                    <div className="w-14 h-14 bg-white border border-border rounded-xl shadow-sm flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {service.icon?.length <= 2 ? (
                        <span className="text-2xl">{service.icon}</span>
                      ) : (
                        <Icon size={28} />
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-black text-dark mb-4 tracking-tight line-clamp-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-text-secondary font-medium leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                 </div>

                 {/* Interactive Footer */}
                 <div className="relative z-10 mt-auto pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {(service.tags || []).slice(0, 3).map((tech: string, idx: number) => (
                        <div key={idx} className="px-3 py-1 bg-white border border-border rounded-md text-[10px] font-bold text-dark shadow-sm z-10 relative hover:z-20 hover:-translate-y-1 transition-transform cursor-default" title={tech}>
                          {tech}
                        </div>
                      ))}
                      {service.tags && service.tags.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center text-[8px] font-bold text-text-secondary z-0 relative">
                          +{service.tags.length - 3}
                        </div>
                      )}
                    </div>
                    
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-dark group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors"
                    >
                      <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform" />
                    </Link>
                 </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
