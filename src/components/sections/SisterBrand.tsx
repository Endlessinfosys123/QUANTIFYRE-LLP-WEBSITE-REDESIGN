"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { COMPANY_DETAILS } from "@/lib/constants";
import { ExternalLink, Sparkles } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

export const SisterBrand = ({ data }: { data?: any }) => {
  const name = data?.title || COMPANY_DETAILS.sisterBrand.name;
  const description = data?.description || "Our elite digital agency brand specialized in high-performance graphic design, social media growth, and full-spectrum digital marketing.";
  const url = data?.primary_cta_link || COMPANY_DETAILS.sisterBrand.url;
  const badge = data?.badge_text || "Sister Brand";
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white border border-primary/10 rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 text-center lg:text-left relative overflow-hidden shadow-2xl shadow-primary/5"
        >
          {/* Decorative background elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" 
          />

          <div className="space-y-10 relative z-10 max-w-3xl">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.4em]"
              >
                <Sparkles size={14} />
                {badge}
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-[0.9]">
                {name.toLowerCase().includes("meet") ? name : <>Meet <span className="text-primary">{name}.</span></>}
              </h2>
              <p className="text-text-secondary text-2xl font-medium leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Magnetic>
              <Button
                href={url}
                size="lg"
                className="gap-4 px-16 h-24 text-2xl font-black rounded-3xl shadow-xl shadow-primary/20 hover:shadow-primary/40"
              >
                Go Beyond <ExternalLink size={24} />
              </Button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
