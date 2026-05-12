"use client";

import { motion } from "framer-motion";
import { CTA } from "@/components/sections/CTA";
import { PenTool, Eye, LayoutTemplate, MousePointer2, Frame } from "lucide-react";

function CartoonDesignTools() {
  return (
    <motion.svg viewBox="0 0 200 200" className="w-64 h-auto drop-shadow-2xl" animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
      {/* Background Frame */}
      <rect x="20" y="30" width="160" height="140" rx="15" fill="#f8fafc" stroke="#334155" strokeWidth="6" strokeDasharray="10 5" />
      
      {/* Figma-like Nodes */}
      <motion.rect x="40" y="50" width="60" height="40" rx="8" fill="#a855f7" stroke="#334155" strokeWidth="4" animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.rect x="110" y="50" width="50" height="80" rx="8" fill="#f43f5e" stroke="#334155" strokeWidth="4" animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="70" cy="130" r="25" fill="#3b82f6" stroke="#334155" strokeWidth="4" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
      
      {/* Pen Tool Path */}
      <path d="M40 50 Q100 10 110 50 T70 130" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeDasharray="5 5" />
      
      {/* Floating Cursor */}
      <motion.g animate={{ x: [0, 30, 0], y: [0, 40, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M90 90 L110 120 L100 120 L105 135 L95 138 L90 122 L80 130 Z" fill="white" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
      </motion.g>
    </motion.svg>
  );
}

export default function UIUXDesignPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="relative pt-44 pb-28 bg-violet-50 border-b-8 border-violet-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,#ddd6fe_0%,transparent_70%)] animate-pulse pointer-events-none" />
        
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border-4 border-violet-200 text-violet-600 font-black text-sm uppercase tracking-widest shadow-sm">
              <PenTool size={18} className="animate-wiggle" /> UI/UX Design
            </motion.div>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100 }} className="text-6xl md:text-8xl font-black text-slate-800 tracking-tighter leading-[0.9]">
              Look <span className="text-violet-500 relative inline-block animate-rubberband delay-500">Stunning.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl text-slate-600 font-bold leading-relaxed">
              Beautiful interfaces that users love — designed with deep research and built for maximum conversion.
            </motion.p>
          </div>
          <div className="flex-1 flex justify-center">
            <CartoonDesignTools />
          </div>
        </div>
      </section>

      <section className="py-16 bg-violet-600">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { val: "40%", label: "Conversion Lift", icon: MousePointer2 },
               { val: "48h", label: "First Wireframes", icon: Frame },
               { val: "100%", label: "Figma Ownership", icon: LayoutTemplate }
             ].map((s, i) => (
               <motion.div key={i} whileHover={{ y: -10 }} className="bg-violet-700 rounded-[2rem] p-8 text-center border-4 border-violet-400 shadow-xl relative overflow-hidden">
                 <div className="absolute -right-6 -top-6 opacity-10"><s.icon size={120} /></div>
                 <div className="text-5xl font-black text-white mb-2 relative z-10">{s.val}</div>
                 <div className="text-violet-200 font-black uppercase tracking-widest relative z-10">{s.label}</div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: Eye, title: "User Research", text: "Interviews, heatmaps, and deep competitor analysis." },
               { icon: Frame, title: "Interactive Prototypes", text: "Figma prototypes that feel exactly like the final product." },
               { icon: LayoutTemplate, title: "Design Systems", text: "Token-based component libraries for endless scalability." },
               { icon: MousePointer2, title: "Accessibility", text: "WCAG 2.1 AA compliance built into every single component." },
             ].map((b, i) => (
               <motion.div key={i} whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }} className="bg-white p-8 rounded-[2rem] border-4 border-slate-200 text-center shadow-lg group">
                 <div className="w-20 h-20 mx-auto bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mb-6 border-4 border-violet-200 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                   <b.icon size={36} strokeWidth={2.5} />
                 </div>
                 <h3 className="text-xl font-black text-slate-800 mb-3">{b.title}</h3>
                 <p className="text-slate-600 font-bold">{b.text}</p>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
