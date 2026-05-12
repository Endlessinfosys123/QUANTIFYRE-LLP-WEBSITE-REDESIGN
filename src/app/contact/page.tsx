"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { COMPANY_DETAILS } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, TerminalSquare, Server, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* ENTERPRISE CONTACT HERO - CRM Dashboard Interface */}
      <section className="pt-32 pb-20 min-h-screen flex items-center bg-surface tech-grid border-b border-border">
        <div className="container-custom w-full relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] text-balance"
                >
                  Initiate <br/>
                  <span className="text-primary">Project.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-text-secondary font-medium text-pretty leading-relaxed"
                >
                  Our technical architects and product strategists are available to scope your requirements and outline a deployment roadmap.
                </motion.p>
              </div>

              {/* System Status Nodes (Replacing generic contact icons) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {[
                  { icon: Mail, label: "Encrypted Email", value: COMPANY_DETAILS.email, status: "Active" },
                  { icon: Phone, label: "Direct Line", value: COMPANY_DETAILS.phone, status: "Available" },
                  { icon: MapPin, label: "HQ Deployment", value: "Gandhinagar, IN", status: "Online" },
                  { icon: Server, label: "Support Cluster", value: "24/7 Monitoring", status: "Optimal" },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-border p-5 rounded-2xl shadow-sm hover:border-primary transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-dark group-hover:bg-primary group-hover:text-white transition-colors">
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
                ))}
              </motion.div>
            </div>

            {/* Right: High-Converting CRM Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="xl:col-span-7 xl:pl-12"
            >
              <div className="bg-white rounded-[2rem] shadow-2xl border border-border overflow-hidden">
                {/* Form Header */}
                <div className="h-14 bg-surface border-b border-border flex items-center justify-between px-8">
                   <div className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                     <ShieldCheck size={16} className="text-green-600" /> Secure Data Intake Form
                   </div>
                   <div className="text-[10px] text-text-secondary font-mono">REQ_ID: {Math.floor(Math.random() * 1000000)}</div>
                </div>
                
                {/* Form Body */}
                <form className="p-8 md:p-12 space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest">Full Name / Point of Contact</label>
                      <input type="text" className="w-full bg-surface border border-border rounded-xl px-5 py-4 text-dark font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-text-secondary/50" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest">Corporate Email Address</label>
                      <input type="email" className="w-full bg-surface border border-border rounded-xl px-5 py-4 text-dark font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-text-secondary/50" placeholder="jane@company.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest">Project Scope / Technical Requirements</label>
                    <textarea rows={5} className="w-full bg-surface border border-border rounded-xl px-5 py-4 text-dark font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none placeholder:text-text-secondary/50" placeholder="Describe the system architecture or product you need built..."></textarea>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                     <div className="text-xs text-text-secondary max-w-[200px] leading-tight">
                        By submitting, you agree to our standard NDA protocol.
                     </div>
                     <Button type="submit" size="lg" className="px-8 h-14 rounded-xl font-bold shadow-lg shadow-primary/20">
                       Deploy Request <Send size={18} className="ml-2" />
                     </Button>
                  </div>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
