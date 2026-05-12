"use client";

import { motion } from "framer-motion";
import { COMPANY_DETAILS } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, TerminalSquare, Server, ShieldCheck, Activity, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState("");

  // Fake boot sequence effect
  useEffect(() => {
    const sequence = [
      "Initializing secure connection...",
      "Establishing handshake protocol...",
      "Verifying encryption keys...",
      "Connection established. System ready."
    ];
    let step = 0;
    
    const interval = setInterval(() => {
      if (step < sequence.length) {
        setBootText(sequence[step]);
        step++;
      } else {
        setIsBooting(false);
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-white min-h-screen">
      
      {/* ENTERPRISE CONTACT HERO - Animated CRM Dashboard Interface */}
      <section className="pt-32 pb-20 min-h-screen flex items-center bg-surface tech-grid border-b border-border overflow-hidden">
        <div className="container-custom w-full relative z-10">
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             <motion.div 
               animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"
             />
             <motion.div 
               animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"
             />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start relative z-10">
            
            {/* Left: Interactive Details & System Status */}
            <div className="xl:col-span-5 space-y-12">
              <div className="space-y-6">
                <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-border text-primary font-bold text-[10px] uppercase tracking-widest shadow-sm"
                 >
                   <TerminalSquare size={12} />
                   Secure Communication Channel
                 </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                  className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] text-balance"
                >
                  Initiate <br/>
                  <span className="text-primary relative">
                    Project.
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -right-6 top-0 w-4 h-full bg-accent"
                    />
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-text-secondary font-medium text-pretty leading-relaxed"
                >
                  Our technical architects and product strategists are available to scope your requirements and outline a deployment roadmap.
                </motion.p>
              </div>

              {/* Animated System Status Nodes */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {[
                  { icon: Mail, label: "Encrypted Email", value: COMPANY_DETAILS.email, status: "Active" },
                  { icon: Phone, label: "Direct Line", value: COMPANY_DETAILS.phone, status: "Available" },
                  { icon: MapPin, label: "HQ Deployment", value: "Gandhinagar, IN", status: "Online" },
                  { icon: Server, label: "Support Cluster", value: "24/7 Monitoring", status: "Optimal" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { type: "spring" } }
                    }}
                    className="bg-white border border-border p-5 rounded-2xl shadow-sm hover:border-primary transition-colors group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-dark group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <item.icon size={18} />
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-text-secondary">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                           {item.status}
                        </div>
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">{item.label}</div>
                      <div className="text-sm font-bold text-dark truncate" title={item.value}>{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Highly Animated CRM Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring", bounce: 0.4 }}
              className="xl:col-span-7 relative perspective-1000"
            >
              <div className="bg-white rounded-[2rem] shadow-2xl border border-border overflow-hidden transform-style-3d relative">
                
                {/* Boot Sequence Overlay */}
                {isBooting && (
                  <div className="absolute inset-0 z-50 bg-dark text-green-400 font-mono text-sm p-8 flex flex-col justify-end pb-12">
                     <div className="flex items-center gap-2 mb-4"><Activity size={20} className="animate-pulse" /> System Boot</div>
                     <div>{bootText}</div>
                     <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity }} className="w-2 h-4 bg-green-400 mt-1" />
                  </div>
                )}

                {/* Form Header */}
                <div className="h-16 bg-surface border-b border-border flex items-center justify-between px-8 relative overflow-hidden">
                   <div className="absolute inset-0 tech-grid opacity-20" />
                   <div className="relative z-10 text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                     <ShieldCheck size={16} className="text-green-600" /> Secure Data Intake Form
                   </div>
                   <div className="relative z-10 text-[10px] text-text-secondary font-mono flex items-center gap-2">
                     <Cpu size={12} /> REQ_ID: {Math.floor(Math.random() * 1000000)}
                   </div>
                </div>
                
                {/* Form Body */}
                <form className="p-8 md:p-12 space-y-8 relative" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }} animate={!isBooting ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}
                      className="space-y-3 group"
                    >
                      <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest group-focus-within:text-primary transition-colors">Point of Contact</label>
                      <div className="relative">
                        <input type="text" className="w-full bg-surface/50 border-2 border-border rounded-xl px-5 py-4 text-dark font-medium focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-text-secondary/50" placeholder="Jane Doe" />
                        <div className="absolute inset-0 rounded-xl border border-primary opacity-0 group-focus-within:opacity-100 group-focus-within:animate-pulse pointer-events-none" />
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={!isBooting ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}
                      className="space-y-3 group"
                    >
                      <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest group-focus-within:text-primary transition-colors">Corporate Email</label>
                      <div className="relative">
                        <input type="email" className="w-full bg-surface/50 border-2 border-border rounded-xl px-5 py-4 text-dark font-medium focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-text-secondary/50" placeholder="jane@company.com" />
                        <div className="absolute inset-0 rounded-xl border border-primary opacity-0 group-focus-within:opacity-100 group-focus-within:animate-pulse pointer-events-none" />
                      </div>
                    </motion.div>

                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={!isBooting ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
                    className="space-y-3 group"
                  >
                    <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest group-focus-within:text-primary transition-colors">Project Scope / Architecture Needs</label>
                    <div className="relative">
                      <textarea rows={5} className="w-full bg-surface/50 border-2 border-border rounded-xl px-5 py-4 text-dark font-medium focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none placeholder:text-text-secondary/50" placeholder="Describe the system architecture, product vision, or technical roadblock..."></textarea>
                      <div className="absolute inset-0 rounded-xl border border-primary opacity-0 group-focus-within:opacity-100 group-focus-within:animate-pulse pointer-events-none" />
                    </div>
                  </motion.div>

                  <motion.div 
                     initial={{ opacity: 0 }} animate={!isBooting ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
                     className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6"
                  >
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                         <ShieldCheck size={20} className="text-green-600" />
                       </div>
                       <div className="text-xs font-bold text-text-secondary max-w-[200px] leading-tight">
                          End-to-end encryption active. Standard NDA applies.
                       </div>
                     </div>
                     <Button type="submit" size="lg" className="w-full sm:w-auto px-10 h-16 rounded-xl font-bold text-lg shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition-shadow group overflow-hidden relative">
                       <span className="relative z-10 flex items-center">Deploy Request <Send size={20} className="ml-3 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></span>
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                     </Button>
                  </motion.div>
                </form>
              </div>

              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 -bottom-6 w-32 h-32 bg-white rounded-2xl border border-border shadow-xl p-4 z-20 hidden md:block"
              >
                 <div className="text-[8px] font-black uppercase text-text-secondary mb-2">Network Status</div>
                 <div className="flex gap-1 items-end h-16">
                    {[40, 70, 30, 90, 60, 100].map((h, i) => (
                      <motion.div key={i} animate={{ height: [`${h}%`, `${Math.random()*100}%`, `${h}%`] }} transition={{ duration: 2, repeat: Infinity, delay: i*0.1 }} className="w-full bg-primary/20 rounded-sm" />
                    ))}
                 </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}
