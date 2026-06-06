"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Brain, Code2, Monitor, BarChart3, Smartphone, PenTool } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const iconMap = {
  Brain,
  Code2,
  Monitor,
  BarChart3,
  Smartphone,
  PenTool,
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SPOTLIGHT CARD — cursor glow follows mouse within card
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SpotlightBentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(280px circle at ${x}px ${y}px, rgba(34,197,94,0.07), transparent 80%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      style={{ background } as any}
      className={cn(
        "bento-card group relative overflow-hidden flex flex-col p-8 md:p-10 cursor-default",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

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
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-black text-[11px] uppercase tracking-[0.3em]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Core Capabilities
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter"
            >
              Engineered for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400">
                Scale.
              </span>
            </motion.h2>
          </div>
          <div className="space-y-4 shrink-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                {displayServices.length || 6} Disciplines
              </span>
            </div>
            <div className="text-right text-slate-400 font-medium text-sm hidden lg:block">
              Hover for spotlight · Click to explore →
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
          {displayServices.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Code2;
            const isLarge = i === 0 || i === 3;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(isLarge && "lg:col-span-2 lg:row-span-1")}
              >
                <SpotlightBentoCard className="h-full">
                  {/* Tech Background for large cards */}
                  {isLarge && (
                    <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-gradient-to-tl from-emerald-500/5 to-transparent pointer-events-none rounded-tl-[100px] transition-transform duration-700 group-hover:scale-110" />
                  )}

                  <div className="relative z-10 flex-1">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-14 h-14 bg-white border border-emerald-50 rounded-2xl shadow-[0_4px_20px_rgba(34,197,94,0.08)] flex items-center justify-center text-emerald-500 mb-8 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_8px_30px_rgba(34,197,94,0.25)] transition-all duration-400"
                    >
                      {service.icon?.length <= 2 ? (
                        <span className="text-2xl">{service.icon}</span>
                      ) : (
                        <Icon size={26} />
                      )}
                    </motion.div>
                    
                    <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight line-clamp-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 mt-auto pt-6 border-t border-emerald-50 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {(service.tags || []).slice(0, 3).map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white border border-emerald-50 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm hover:border-emerald-200 hover:text-emerald-600 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.tags && service.tags.length > 3 && (
                        <span className="px-3 py-1 rounded-lg text-[10px] font-bold text-slate-400">
                          +{service.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white transition-all duration-300 shrink-0"
                    >
                      <ArrowRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>

                  {/* Bottom accent on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-bl-[24px]"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </SpotlightBentoCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
