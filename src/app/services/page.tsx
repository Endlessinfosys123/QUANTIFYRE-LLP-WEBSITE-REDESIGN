"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Services } from "@/components/sections/Services";

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* UNIQUE SERVICES HERO */}
      <section className="relative pt-40 pb-20 overflow-hidden min-h-[70vh] flex flex-col justify-center border-b border-primary/5">
        {/* Abstract 3D Architecture Background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[50vw] opacity-10 pointer-events-none">
           <div className="absolute inset-0 border-[40px] border-primary rounded-full blur-[80px]" />
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="w-full h-full border-[2px] border-primary/50 border-dashed rounded-full"
           />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-1 bg-primary" />
              <span className="text-primary font-black uppercase tracking-widest text-sm">Capabilities Index</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-tight text-balance"
            >
              Engineering <br/> Architecture.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl text-pretty"
            >
              Explore our comprehensive suite of services. From intelligent automation to high-scale enterprise software, we provide end-to-end digital transformation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Reusing the Services Component but removing its internal top padding/headings since the Hero covers it */}
      <div className="-mt-32 relative z-20">
         <Services />
      </div>

      <Footer />
    </main>
  );
}
