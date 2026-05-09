"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-xs uppercase tracking-[0.3em]"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-dark"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} className="relative group">
              <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                <Quote size={60} fill="currentColor" />
              </div>
              <div className="space-y-6 relative z-10">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-dark font-medium leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center font-bold text-primary border border-primary/10 shadow-inner">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark">{t.author}</h4>
                    <p className="text-xs text-text-secondary font-medium uppercase tracking-widest">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
