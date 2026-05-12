"use client";

import { motion } from "framer-motion";
import { CTA } from "@/components/sections/CTA";
import { Code2, Server, Database, Lock, Laptop } from "lucide-react";
import Link from "next/link";

function CartoonCodeBlock() {
  return (
    <motion.svg viewBox="0 0 120 100" className="w-40 h-32" animate={{ y: [-15, 15, -15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      <rect x="10" y="20" width="100" height="70" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="4" />
      <circle cx="20" cy="30" r="3" fill="#ef4444" />
      <circle cx="30" cy="30" r="3" fill="#eab308" />
      <circle cx="40" cy="30" r="3" fill="#22c55e" />
      <motion.rect x="20" y="50" width="60" height="6" rx="3" fill="#0ea5e9" animate={{ width: [60, 40, 80, 60] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.rect x="20" y="65" width="40" height="6" rx="3" fill="#8b5cf6" animate={{ width: [40, 60, 30, 40] }} transition={{ duration: 2.5, repeat: Infinity }} />
      <motion.rect x="20" y="80" width="80" height="6" rx="3" fill="#10b981" animate={{ width: [80, 50, 70, 80] }} transition={{ duration: 3, repeat: Infinity }} />
    </motion.svg>
  );
}

function FloatingCloud({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.svg className="absolute w-24 h-16 pointer-events-none opacity-40" style={{ left: x, top: y }} animate={{ x: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }} viewBox="0 0 24 24" fill="#bae6fd" stroke="#0284c7" strokeWidth="1">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </motion.svg>
  );
}

export default function SoftwareEngineeringPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-44 pb-28 bg-slate-50 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <FloatingCloud x="15%" y="15%" delay={0} />
        <FloatingCloud x="75%" y="25%" delay={2} />
        <FloatingCloud x="80%" y="65%" delay={1} />
        
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-sky-200 text-sky-600 font-black text-xs uppercase tracking-widest mb-6 shadow-sm">
              <Code2 size={14} className="animate-spin-slow" /> Custom Software
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-black text-slate-800 tracking-tighter leading-[0.9]">
              Built for <span className="text-sky-500 relative inline-block animate-rubberband delay-1000">Scale.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
              Bespoke web apps, ERPs, CRMs, and platforms built exactly to your business logic. No off-the-shelf compromises.
            </motion.p>
          </div>
          <div className="flex-1 flex justify-center">
            <CartoonCodeBlock />
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-sky-500">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <motion.div whileHover={{ scale: 1.05 }} className="bg-sky-600 rounded-3xl p-6 text-center border-4 border-sky-400 shadow-xl">
               <div className="text-5xl font-black text-white mb-2 animate-bounce-cartoon inline-block">6-12</div>
               <div className="text-sky-100 font-black uppercase tracking-wider text-sm">Week Delivery</div>
             </motion.div>
             <motion.div whileHover={{ scale: 1.05 }} className="bg-sky-600 rounded-3xl p-6 text-center border-4 border-sky-400 shadow-xl">
               <div className="text-5xl font-black text-white mb-2 animate-pulse">99.5%</div>
               <div className="text-sky-100 font-black uppercase tracking-wider text-sm">Uptime SLA</div>
             </motion.div>
             <motion.div whileHover={{ scale: 1.05 }} className="bg-sky-600 rounded-3xl p-6 text-center border-4 border-sky-400 shadow-xl">
               <div className="text-5xl font-black text-white mb-2 animate-wiggle inline-block">0</div>
               <div className="text-sky-100 font-black uppercase tracking-wider text-sm">Tech Debt</div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE GRID */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom">
          <h2 className="text-5xl font-black text-slate-800 text-center mb-16 tracking-tighter">Architecture Details 🏗️</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Database, title: "Enterprise ERPs", color: "text-blue-500", bg: "bg-blue-50" },
              { icon: Laptop, title: "SaaS Platforms", color: "text-purple-500", bg: "bg-purple-50" },
              { icon: Server, title: "Cloud Infra", color: "text-cyan-500", bg: "bg-cyan-50" },
              { icon: Lock, title: "Legacy Migration", color: "text-teal-500", bg: "bg-teal-50" },
            ].map((b, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className={`rounded-3xl border-4 border-slate-100 p-8 text-center shadow-lg relative group overflow-hidden ${b.bg}`}>
                <div className={`w-20 h-20 mx-auto rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center ${b.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <b.icon size={36} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-black text-slate-800">{b.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
