"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Portfolio as PortfolioSection } from "@/components/sections/Portfolio";

export default function PortfolioPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* UNIQUE PORTFOLIO HERO */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-surface">
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] font-black text-dark tracking-tighter leading-none whitespace-nowrap overflow-hidden text-ellipsis"
          >
            LANDMARKS
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center gap-8 text-primary font-black uppercase tracking-[0.5em] text-xs md:text-sm"
          >
            <span>Design</span>
            <span>•</span>
            <span>Engineering</span>
            <span>•</span>
            <span>Scale</span>
          </motion.div>
        </div>

        {/* Decorative Scroller */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border overflow-hidden">
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="w-1/4 h-full bg-primary"
          />
        </div>
      </section>

      {/* Reusing Portfolio component */}
      <div className="-mt-20">
        <PortfolioSection />
      </div>

      <Footer />
    </main>
  );
}
