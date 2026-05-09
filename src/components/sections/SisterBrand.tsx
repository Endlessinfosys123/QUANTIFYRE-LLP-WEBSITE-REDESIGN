"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { COMPANY_DETAILS } from "@/lib/constants";
import { ExternalLink } from "lucide-react";

export const SisterBrand = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-surface border border-primary/10 rounded-[32px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="space-y-6 relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark">
              Also Discover <span className="text-primary">{COMPANY_DETAILS.sisterBrand.name}</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Our client-facing digital agency brand — graphic design, social media marketing, SEO, and full digital strategy.
            </p>
          </div>

          <div className="relative z-10">
            <Button
              href={COMPANY_DETAILS.sisterBrand.url}
              className="gap-3 px-10 py-5 text-lg"
            >
              Visit ENDLESSINFOSYS <ExternalLink size={20} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
