"use client";

import { motion } from "framer-motion";
import { CTA } from "@/components/sections/CTA";
import { Megaphone, TrendingUp, Target, Share2, BarChart2 } from "lucide-react";

function CartoonMegaphone() {
  return (
    <motion.svg viewBox="0 0 200 200" className="w-56 h-56" animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
      {/* Sound waves */}
      <motion.path d="M160 50 Q180 100 160 150" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" animate={{ opacity: [0, 1, 0], x: [0, 10, 20] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.path d="M175 30 Q205 100 175 170" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" animate={{ opacity: [0, 1, 0], x: [0, 15, 30] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
      
      {/* Megaphone Body */}
      <path d="M50 100 L140 40 L140 160 Z" fill="#10b981" stroke="#065f46" strokeWidth="6" strokeLinejoin="round" />
      <rect x="30" y="85" width="20" height="30" rx="5" fill="#334155" stroke="#1e293b" strokeWidth="6" />
      <path d="M140 40 Q150 100 140 160" fill="#ecfdf5" stroke="#065f46" strokeWidth="6" />
      
      {/* Handle */}
      <path d="M70 120 L70 160 A10 10 0 0 0 90 160 L90 135" fill="none" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

export default function DigitalMarketingPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="relative pt-44 pb-28 bg-emerald-50 border-b-8 border-emerald-200 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-300/30 rounded-full blur-[40px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-teal-300/30 rounded-full blur-[60px] animate-morph-blob" />
        
        <div className="container-custom relative z-10 flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border-4 border-emerald-200 text-emerald-600 font-black text-sm uppercase tracking-widest shadow-sm">
              <Megaphone size={18} className="animate-wiggle" /> Growth Marketing
            </motion.div>
            <motion.h1 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-black text-slate-800 tracking-tighter leading-[0.9]">
              Engineered <span className="text-emerald-500 relative inline-block animate-bounce-cartoon delay-1000">Growth.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl text-slate-600 font-bold leading-relaxed">
              Traffic without strategy is noise. We build data-driven funnels that compound your revenue month over month.
            </motion.p>
          </div>
          <div className="flex-1 flex justify-center">
            <CartoonMegaphone />
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-500 border-b-[12px] border-emerald-600">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { val: "3x", label: "Average ROI", icon: TrendingUp },
               { val: "2x", label: "Traffic Growth", icon: Target },
               { val: "30d", label: "First Results", icon: BarChart2 }
             ].map((s, i) => (
               <motion.div key={i} whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 2 : -2 }} className="bg-white rounded-[2rem] p-8 text-center border-4 border-slate-800 shadow-[8px_8px_0px_0px_#1e293b] group">
                 <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-4 group-hover:animate-spin-slow">
                   <s.icon size={32} strokeWidth={3} />
                 </div>
                 <div className="text-5xl font-black text-slate-800 mb-2">{s.val}</div>
                 <div className="text-emerald-600 font-black uppercase tracking-widest">{s.label}</div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-emerald-50/50">
        <div className="container-custom">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
             {[
               { title: "SEO & Content Strategy", text: "Keyword research and technical SEO that drives organic traffic." },
               { title: "Paid Advertising (PPC)", text: "Google, Meta, and LinkedIn ads with full attribution." },
               { title: "Social Media Dominance", text: "Brand authority building on Instagram, X, and LinkedIn." },
               { title: "Analytics & Reports", text: "Transparent monthly reporting on CAC, leads, and ROI." },
             ].map((b, i) => (
               <motion.div key={i} whileHover={{ y: -10 }} className="bg-white p-10 rounded-[3rem] border-4 border-emerald-100 hover:border-emerald-500 transition-colors shadow-xl">
                 <h3 className="text-3xl font-black text-slate-800 mb-4 flex items-center gap-4">
                   <span className="text-4xl animate-bounce-cartoon inline-block">📈</span> {b.title}
                 </h3>
                 <p className="text-slate-600 font-bold text-xl">{b.text}</p>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
