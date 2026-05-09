"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageSquare } from "lucide-react";

export const CTA = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/5 border border-primary/10 rounded-[40px] p-12 md:p-24 text-center space-y-10 relative overflow-hidden shadow-2xl shadow-primary/5"
        >
          {/* Animated Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 blur-[100px] pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-dark leading-tight tracking-tight max-w-4xl mx-auto">
              Ready to Build Something Extraordinary?
            </h2>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Tell us your vision. We'll make it a reality — faster than you thought possible.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <Button href="/contact" size="lg" className="w-full sm:w-auto gap-3 h-16 px-10 rounded-2xl shadow-xl shadow-primary/20">
              Start Your Project <ArrowRight size={20} />
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto border-primary/20 text-primary hover:bg-primary/5 gap-3 h-16 px-10 rounded-2xl">
              Schedule a Call <MessageSquare size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
