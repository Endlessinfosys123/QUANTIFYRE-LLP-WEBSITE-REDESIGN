"use client";

import { motion } from "framer-motion";
import { Services } from "@/components/sections/Services";
import { Network, Database, Cloud, Lock } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* ENTERPRISE SERVICES HERO - Cloud Infrastructure Visual */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-surface tech-grid border-b border-border">
        
        {/* Concrete Infrastructure Background Visual */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full flex items-center justify-center">
              {/* Central Server Node */}
              <motion.div 
                animate={{ boxShadow: ["0 0 0 0 rgba(99,102,241,0.2)", "0 0 0 40px rgba(99,102,241,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 rounded-3xl border-2 border-primary/20 bg-white shadow-2xl flex items-center justify-center z-20"
              >
                 <Network size={40} className="text-primary" />
              </motion.div>

              {/* Connecting Lines & Sub-nodes */}
              {[
                { icon: Database, pos: "-translate-x-64 -translate-y-48" },
                { icon: Cloud, pos: "translate-x-64 -translate-y-48" },
                { icon: Lock, pos: "-translate-x-64 translate-y-48" },
                { icon: ServerNode, pos: "translate-x-64 translate-y-48" },
              ].map((Node, i) => (
                <div key={i} className={`absolute top-1/2 left-1/2 ${Node.pos}`}>
                   {/* Line connecting to center */}
                   <svg className="absolute top-1/2 left-1/2 w-[256px] h-[192px] -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 overflow-visible">
                      <motion.line 
                        x1="50%" y1="50%" 
                        x2={i % 2 === 0 ? "100%" : "0%"} 
                        y2={i < 2 ? "100%" : "0%"} 
                        stroke="currentColor" 
                        className="text-border" 
                        strokeWidth="2" 
                        strokeDasharray="4 4"
                      />
                      <motion.circle 
                         cx={i % 2 === 0 ? "100%" : "0%"} 
                         cy={i < 2 ? "100%" : "0%"} 
                         r="4" 
                         className="fill-primary"
                         animate={{ r: [3, 6, 3] }}
                         transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      />
                   </svg>
                   {/* Node Box */}
                   <div className="w-16 h-16 rounded-2xl border border-border bg-white shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
                      <Node.icon size={24} className="text-text-secondary" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8 bg-white/80 backdrop-blur-xl border border-border/50 p-12 rounded-[3rem] shadow-2xl shadow-primary/5">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-surface border border-border"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Service Architecture Index</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] text-balance"
            >
              Enterprise <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Capabilities.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto text-pretty"
            >
              Explore our strict, scalable, and highly available engineering services. Built for organizations that demand precision.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Reusing the Services Component (which is now a Bento Grid) */}
      <div className="relative z-20">
         <Services />
      </div>

    </main>
  );
}

function ServerNode({ size, className }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}
