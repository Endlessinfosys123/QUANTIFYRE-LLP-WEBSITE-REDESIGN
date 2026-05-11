"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

export const CTA = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-accent/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white border border-primary/10 rounded-[4rem] p-16 md:p-32 text-center space-y-12 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(99,102,241,0.1)]"
        >
          {/* Subtle Internal Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-64 h-64 border-[30px] border-primary/5 rounded-full pointer-events-none"
          />

          <div className="space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.4em]"
            >
              <Sparkles size={14} />
              Unlimited Potential
            </motion.div>
            
            <h2 className="text-5xl md:text-8xl font-black text-dark leading-[0.9] tracking-tighter max-w-5xl mx-auto">
              Let's Engineer Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Digital Legacy.</span>
            </h2>
            
            <p className="text-text-secondary text-xl md:text-3xl max-w-3xl mx-auto leading-tight font-medium">
              The future waits for no one. Partner with QUANTIFYRE to build intelligent systems that scale with your ambition.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 relative z-10 pt-10">
            <Magnetic>
              <Button href="/contact" size="lg" className="w-full sm:w-auto px-20 h-24 text-2xl font-black rounded-3xl shadow-[0_30px_60px_-15px_rgba(99,102,241,0.4)] hover:shadow-[0_40px_80px_-15px_rgba(99,102,241,0.6)]">
                Start the Mission <ArrowRight size={24} className="ml-4" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto h-24 px-16 text-2xl font-black rounded-3xl border-primary/20 text-primary hover:bg-primary/5 backdrop-blur-xl">
                Free Strategy Call
              </Button>
            </Magnetic>
          </div>

          {/* Floating Element */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-10 hidden lg:block opacity-20"
          >
            <MessageSquare size={120} className="text-primary" strokeWidth={0.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
