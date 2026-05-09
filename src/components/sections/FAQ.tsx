"use client";

import { motion } from "framer-motion";
import { FAQS } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";

export const FAQ = () => {
  return (
    <section className="section-padding bg-white" id="faq">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-xs uppercase tracking-[0.3em]"
          >
            Support
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-dark"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion items={FAQS} />
        </div>
      </div>
    </section>
  );
};
