"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Portfolio as PortfolioSection } from "@/components/sections/Portfolio";
import { PROJECTS } from "@/lib/constants";
import Image from "next/image";

export default function PortfolioPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* ENTERPRISE PORTFOLIO HERO - Device Mockup Gallery */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-surface tech-grid border-b border-border min-h-screen flex items-center">
        <div className="container-custom relative z-10 w-full">
           
           <div className="text-center mb-16 space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[12vw] md:text-[8vw] lg:text-[10vw] font-black text-dark tracking-tighter leading-none"
              >
                LANDMARKS
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center gap-4 md:gap-8 text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-sm"
              >
                <span>Architecture</span>
                <span>•</span>
                <span>Implementation</span>
                <span>•</span>
                <span>Scale</span>
              </motion.div>
           </div>

           {/* Interactive Floating Mockups Gallery */}
           <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[600px] perspective-1000 mt-12">
              
              {/* Center MacBook Mockup (Primary) */}
              <motion.div
                 initial={{ opacity: 0, y: 100, rotateX: 20 }}
                 animate={{ opacity: 1, y: 0, rotateX: 0 }}
                 transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[60%] z-30"
              >
                 <div className="relative w-full aspect-[16/10] rounded-t-2xl border-[6px] md:border-[10px] border-dark bg-dark shadow-2xl overflow-hidden group">
                    <Image src={PROJECTS[0].image} alt="Project 1" fill className="object-cover transition-transform duration-[10s] group-hover:scale-110" />
                 </div>
                 <div className="w-[110%] -ml-[5%] h-3 md:h-5 bg-border rounded-b-xl shadow-2xl flex justify-center mt-0.5">
                    <div className="w-1/6 h-full bg-text-secondary/20 rounded-b-lg" />
                 </div>
              </motion.div>

              {/* Left Floating Mockup */}
              <motion.div
                 initial={{ opacity: 0, x: -100, rotateY: 30 }}
                 animate={{ opacity: 1, x: 0, rotateY: 15 }}
                 transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                 className="absolute left-0 top-1/4 w-[50%] md:w-[40%] z-20 hidden sm:block"
              >
                 <div className="relative w-full aspect-[16/10] rounded-t-xl border-[4px] md:border-[8px] border-border bg-white shadow-xl overflow-hidden opacity-80 hover:opacity-100 hover:z-40 transition-all duration-500">
                    <Image src={PROJECTS[1].image} alt="Project 2" fill className="object-cover" />
                 </div>
                 <div className="w-[110%] -ml-[5%] h-2 md:h-4 bg-surface border border-border rounded-b-lg shadow-lg flex justify-center mt-0.5" />
              </motion.div>

              {/* Right Floating Mockup */}
              <motion.div
                 initial={{ opacity: 0, x: 100, rotateY: -30 }}
                 animate={{ opacity: 1, x: 0, rotateY: -15 }}
                 transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                 className="absolute right-0 bottom-1/4 w-[45%] md:w-[35%] z-20 hidden sm:block"
              >
                 <div className="relative w-full aspect-[16/10] rounded-t-xl border-[4px] md:border-[6px] border-white bg-white shadow-2xl overflow-hidden opacity-90 hover:opacity-100 hover:z-40 transition-all duration-500">
                    <Image src={PROJECTS[2].image} alt="Project 3" fill className="object-cover" />
                 </div>
                 <div className="w-[110%] -ml-[5%] h-2 md:h-3 bg-surface border border-border rounded-b-md shadow-xl flex justify-center mt-0.5" />
              </motion.div>

           </div>

        </div>
      </section>

      {/* Reusing Portfolio component */}
      <div className="-mt-10 relative z-20">
        <PortfolioSection />
      </div>

      <Footer />
    </main>
  );
}
