"use client";

import { motion } from "framer-motion";
import { CTA } from "@/components/sections/CTA";
import { Monitor, Rocket, Search, ShoppingCart, Layout } from "lucide-react";

function CartoonBrowser() {
  return (
    <motion.svg viewBox="0 0 200 150" className="w-64 h-auto drop-shadow-2xl" animate={{ y: [-10, 10, -10], rotate: [0, 2, -2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
      {/* Browser Chrome */}
      <rect x="10" y="10" width="180" height="130" rx="12" fill="white" stroke="#334155" strokeWidth="4" />
      <path d="M10 35 L190 35" stroke="#334155" strokeWidth="4" />
      <circle cx="25" cy="22" r="4" fill="#ef4444" />
      <circle cx="40" cy="22" r="4" fill="#eab308" />
      <circle cx="55" cy="22" r="4" fill="#22c55e" />
      
      {/* Content Blocks */}
      <rect x="25" y="50" width="80" height="15" rx="4" fill="#e2e8f0" />
      <rect x="25" y="75" width="150" height="8" rx="4" fill="#f1f5f9" />
      <rect x="25" y="90" width="120" height="8" rx="4" fill="#f1f5f9" />
      
      <motion.rect x="120" y="50" width="55" height="15" rx="4" fill="#ec4899" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      
      {/* Floating Elements popping out */}
      <motion.g animate={{ y: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
        <circle cx="160" cy="110" r="15" fill="#f59e0b" stroke="#334155" strokeWidth="3" />
        <path d="M155 110 L165 110 M160 105 L160 115" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  );
}

export default function WebDevelopmentPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="relative pt-44 pb-28 bg-pink-50 border-b-4 border-pink-200 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-fuchsia-300/40 rounded-full blur-[100px] animate-morph-blob pointer-events-none" />
        
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border-4 border-pink-200 text-pink-600 font-black text-sm uppercase tracking-widest shadow-sm">
              <Monitor size={18} className="animate-bounce" /> Web Dev
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-black text-slate-800 tracking-tighter leading-[0.9]">
              Pixel <span className="text-pink-500 relative inline-block animate-wiggle delay-500">Perfect.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl text-slate-600 font-bold leading-relaxed">
              Your website is your hardest-working sales rep. We build lightning-fast Next.js experiences that convert.
            </motion.p>
          </div>
          <div className="flex-1 flex justify-center">
            <CartoonBrowser />
          </div>
        </div>
      </section>

      <section className="py-16 bg-pink-500 border-b-8 border-pink-600">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { val: "<1s", label: "Load Time", emoji: "⚡" },
               { val: "100", label: "Lighthouse Score", emoji: "💯" },
               { val: "2-4", label: "Weeks Delivery", emoji: "🚀" }
             ].map((s, i) => (
               <motion.div key={i} whileHover={{ y: -5 }} className="bg-white rounded-[2rem] p-8 text-center border-4 border-pink-700 shadow-[8px_8px_0px_0px_rgba(190,24,93,1)]">
                 <div className="text-6xl mb-4 animate-float">{s.emoji}</div>
                 <div className="text-5xl font-black text-pink-600 mb-2">{s.val}</div>
                 <div className="text-slate-800 font-black uppercase tracking-widest">{s.label}</div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
               { icon: Rocket, title: "Next.js Performance", text: "Sub-second page loads globally via Edge functions." },
               { icon: Search, title: "SEO Architecture", text: "Built-in structured data and Core Web Vitals compliance." },
               { icon: ShoppingCart, title: "E-Commerce Ready", text: "Full stores with Razorpay, Stripe, and inventory sync." },
               { icon: Layout, title: "Headless CMS", text: "Sanity and Contentful integrations for easy editing." },
             ].map((b, i) => (
               <motion.div key={i} whileHover={{ scale: 1.02 }} className="flex items-start gap-6 bg-white p-8 rounded-[2rem] border-4 border-slate-200 hover:border-pink-300 transition-colors">
                 <div className="w-16 h-16 bg-pink-100 rounded-2xl border-4 border-pink-200 flex items-center justify-center text-pink-500 shrink-0 animate-pulse">
                   <b.icon size={28} strokeWidth={3} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-slate-800 mb-3">{b.title}</h3>
                   <p className="text-slate-600 font-bold text-lg">{b.text}</p>
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
