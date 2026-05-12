"use client";

import { motion } from "framer-motion";
import { CTA } from "@/components/sections/CTA";
import { Brain, Zap, ShieldCheck, Users, Clock, ArrowRight, CheckSquare2 } from "lucide-react";
import Link from "next/link";

function CartoonRobotBrain() {
  return (
    <motion.svg viewBox="0 0 100 100" className="w-32 h-32" animate={{ y: [-10, 10, -10], rotate: [0, -5, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M20 50 Q 50 10 80 50 Q 50 90 20 50" fill="#e0e7ff" stroke="#6366f1" strokeWidth="4" />
      <circle cx="50" cy="50" r="15" fill="#818cf8" stroke="#3730a3" strokeWidth="3" />
      <motion.circle cx="50" cy="50" r="5" fill="#fde047" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      <path d="M40 30 L60 30 M30 50 L70 50 M40 70 L60 70" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeDasharray="5,5" />
      <circle cx="20" cy="50" r="5" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <circle cx="80" cy="50" r="5" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
    </motion.svg>
  );
}

function FloatingGear({ x, y, delay, color }: { x: string; y: string; delay: number; color: string }) {
  return (
    <motion.svg className="absolute w-12 h-12 pointer-events-none" style={{ left: x, top: y }} animate={{ rotate: 360, y: [0, -20, 0] }} transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, delay, ease: "easeInOut" } }} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" fill={color} opacity="0.2" />
    </motion.svg>
  );
}

export default function AIAutomationPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-44 pb-28 bg-surface border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
        <div className="absolute top-10 right-20 w-96 h-96 bg-indigo-200/40 rounded-full blur-[100px] animate-morph-blob pointer-events-none" />
        <FloatingGear x="10%" y="20%" delay={0} color="#6366f1" />
        <FloatingGear x="85%" y="60%" delay={1} color="#f59e0b" />
        
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="inline-block mb-6">
            <CartoonRobotBrain />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-primary/20 text-primary font-black text-xs uppercase tracking-widest mb-6 shadow-sm">
            <Zap size={14} className="animate-pulse" /> Service: AI Automation
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] text-balance mb-6">
            Work <span className="text-primary relative inline-block animate-wiggle">Smarter,</span> Not Harder.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
            Let machines do the heavy lifting — so your team focuses on what humans do best. We build custom AI agents that automate your entire workflow.
          </motion.p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
               <div className="text-5xl font-black text-white mb-2 animate-bounce-cartoon inline-block">10x</div>
               <div className="text-indigo-100 font-bold uppercase tracking-wider text-sm">Faster Operations</div>
             </motion.div>
             <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
               <div className="text-5xl font-black text-white mb-2 animate-pulse">99.9%</div>
               <div className="text-indigo-100 font-bold uppercase tracking-wider text-sm">Accuracy Rate</div>
             </motion.div>
             <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
               <div className="text-5xl font-black text-white mb-2 animate-wiggle inline-block">24/7</div>
               <div className="text-indigo-100 font-bold uppercase tracking-wider text-sm">Always Running</div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* CORE BENEFITS */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute left-0 top-1/2 w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-[100px] animate-morph-blob pointer-events-none -translate-y-1/2 -translate-x-1/2" />
        <div className="container-custom relative z-10">
          <h2 className="text-5xl font-black text-dark text-center mb-16 tracking-tighter">AI Capabilities 🤖</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: Brain, title: "Custom AI Agents", text: "Purpose-built agents trained on your business data that automate entire workflows end-to-end.", bg: "bg-indigo-50", border: "border-indigo-200" },
              { icon: Zap, title: "LLM Integration", text: "Connect GPT-4, Claude 3, and Gemini to your existing tools with secure, production-ready pipelines.", bg: "bg-amber-50", border: "border-amber-200" },
              { icon: Users, title: "Predictive Analytics", text: "ML models that forecast demand, detect anomalies, and surface actionable business insights.", bg: "bg-emerald-50", border: "border-emerald-200" },
              { icon: ShieldCheck, title: "RPA + AI Hybrid", text: "Combine Robotic Process Automation with AI decision-making for legacy system compatibility.", bg: "bg-rose-50", border: "border-rose-200" },
            ].map((b, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className={`rounded-[2rem] border-2 p-8 ${b.bg} ${b.border} shadow-lg relative overflow-hidden group`}>
                <div className="w-16 h-16 rounded-2xl bg-white border-2 flex items-center justify-center text-dark mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm" style={{ borderColor: 'inherit' }}>
                  <b.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-dark mb-3">{b.title}</h3>
                <p className="text-text-secondary font-medium leading-relaxed">{b.text}</p>
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
                   <b.icon size={150} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-black text-white">What You Get 📦</h2>
              <div className="space-y-4">
                {["Custom AI Agents", "Workflow Automation", "Predictive Analytics", "LLM Integration (GPT, Claude)"].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">✓</div>
                    <span className="font-bold text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex-1">
               <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl relative">
                 <div className="absolute -top-4 -right-4 text-4xl animate-bounce-cartoon">📝</div>
                 <h3 className="text-2xl font-black mb-6">The Roadmap</h3>
                 <div className="space-y-4">
                    {["Process Audit", "Blueprint Design", "Model Training", "Integration", "Monitoring"].map((step, i) => (
                      <div key={i} className="flex gap-4 items-center">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-black text-xs shrink-0">{i+1}</div>
                        <div className="font-bold text-white/80">{step}</div>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
