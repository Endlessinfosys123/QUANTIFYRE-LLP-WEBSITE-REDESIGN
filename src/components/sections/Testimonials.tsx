"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Star, Quote, Sparkles } from "lucide-react";

export const Testimonials = () => {
  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full neural-grid opacity-20 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-32 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.4em]"
          >
            <Sparkles size={14} />
            Social Proof
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-tight"
          >
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Partners Say.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="relative group p-12 bg-white border-primary/5 hover:border-primary/20 transition-all duration-700 shadow-2xl shadow-primary/5 h-full flex flex-col">
                <div className="absolute top-10 right-10 text-primary/5 group-hover:text-primary/10 transition-colors duration-700">
                  <Quote size={80} fill="currentColor" />
                </div>
                
                <div className="space-y-8 relative z-10 h-full flex flex-col">
                  <div className="flex gap-1.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-primary" fill="currentColor" />
                    ))}
                  </div>
                  
                  <p className="text-dark text-xl font-medium leading-relaxed italic flex-grow">
                    "{t.quote}"
                  </p>
                  
                  <div className="pt-8 border-t border-primary/5 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-primary/20">
                      {t.author[0]}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-dark tracking-tight">{t.author}</h4>
                      <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em]">
                        {t.role} • {t.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animated Border Reveal */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-1000" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
