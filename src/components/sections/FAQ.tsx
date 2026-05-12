"use client";

import { motion } from "framer-motion";
import { FAQS } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";
import { Sparkles } from "lucide-react";

export const FAQ = ({ data }: { data?: any[] }) => {
  const displayFaqs = data && data.length > 0 ? data : FAQS;
  return (
    <section className="section-padding bg-white relative overflow-hidden" id="faq">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-32 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.4em]"
          >
            <Sparkles size={14} />
            Support
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-tight"
          >
            Curious? <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">We Have Answers.</span>
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <Accordion items={displayFaqs} />
        </div>
      </div>
    </section>
  );
};
