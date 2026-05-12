"use client";

import { motion } from "framer-motion";
import { CTA } from "@/components/sections/CTA";
import { Smartphone, Download, Star, ShieldCheck, Zap } from "lucide-react";

function CartoonSmartphone() {
  return (
    <motion.svg viewBox="0 0 160 260" className="w-48 h-auto drop-shadow-2xl" animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      {/* Phone Body */}
      <rect x="20" y="10" width="120" height="240" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="6" />
      {/* Screen */}
      <rect x="28" y="25" width="104" height="210" rx="10" fill="#f0fdfa" />
      {/* Notch */}
      <rect x="60" y="25" width="40" height="15" rx="5" fill="#1e293b" />
      
      {/* App Icons */}
      <motion.rect x="40" y="60" width="25" height="25" rx="6" fill="#10b981" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
      <motion.rect x="80" y="60" width="25" height="25" rx="6" fill="#0ea5e9" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      <motion.rect x="40" y="100" width="25" height="25" rx="6" fill="#8b5cf6" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
      <motion.rect x="80" y="100" width="25" height="25" rx="6" fill="#f59e0b" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
      
      {/* Floating Sparkles */}
      <motion.path d="M140 30 L150 40 M145 30 L145 40" stroke="#fcd34d" strokeWidth="4" strokeLinecap="round" animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
    </motion.svg>
  );
}

export default function MobileDevelopmentPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="relative pt-44 pb-28 bg-teal-50 border-b-[10px] border-teal-200 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-200/30 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border-4 border-teal-200 text-teal-600 font-black text-sm uppercase tracking-widest shadow-sm">
              <Smartphone size={18} className="animate-pulse" /> App Development
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0.5 }} className="text-6xl md:text-8xl font-black text-slate-800 tracking-tighter leading-[0.9]">
              Pocket <span className="text-teal-500 relative inline-block animate-float">Power.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl text-slate-600 font-bold leading-relaxed">
              Native-feeling apps for iOS and Android built from a single powerful codebase. Beautiful, fast, and offline-ready.
            </motion.p>
          </div>
          <div className="flex-1 flex justify-center">
            <CartoonSmartphone />
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal-500">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { val: "1", label: "Codebase (iOS/Android)", icon: Zap },
               { val: "4.8★", label: "Average App Rating", icon: Star },
               { val: "6-10", label: "Weeks Delivery", icon: Download }
             ].map((s, i) => (
               <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white rounded-[3rem] p-8 text-center border-4 border-slate-800 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)]">
                 <div className="w-16 h-16 mx-auto bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-4 border-2 border-teal-200">
                   <s.icon size={32} strokeWidth={2.5} />
                 </div>
                 <div className="text-5xl font-black text-slate-800 mb-2">{s.val}</div>
                 <div className="text-teal-600 font-black uppercase tracking-widest">{s.label}</div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="container-custom">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {[
               { title: "React Native / Flutter", text: "60fps native performance on both platforms simultaneously." },
               { title: "Offline-First Design", text: "Apps that work perfectly without internet, syncing later." },
               { title: "On-Device AI", text: "Local machine learning for fast, private, and smart features." },
               { title: "App Store Ready", text: "We handle the entire submission and review process for you." },
             ].map((b, i) => (
               <motion.div key={i} whileHover={{ x: 10 }} className="flex items-center gap-6 bg-white p-6 rounded-full border-4 border-teal-100 hover:border-teal-400 transition-colors shadow-sm pr-10">
                 <div className="w-20 h-20 bg-teal-500 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white shrink-0">
                   <ShieldCheck size={32} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-slate-800 mb-1">{b.title}</h3>
                   <p className="text-slate-600 font-bold">{b.text}</p>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
