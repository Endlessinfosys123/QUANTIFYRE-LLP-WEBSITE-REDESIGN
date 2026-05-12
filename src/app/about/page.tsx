"use client";

import { motion } from "framer-motion";
import { Users, Target, Shield, Server, Activity, GitBranch } from "lucide-react";
import { STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* ENTERPRISE ABOUT HERO - Company Command Center */}
      <section className="relative pt-40 pb-20 overflow-hidden min-h-[90vh] bg-surface tech-grid border-b border-border flex items-center">
        <div className="container-custom relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* Left: Typography */}
             <div className="max-w-2xl space-y-8">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest"
                >
                  <Server size={14} className="text-accent" />
                  The Architecture Behind The Code
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                  className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] text-balance"
                >
                  Builders of <br />
                  <span className="text-primary">Digital Empires.</span>
                </motion.h1>
    
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed text-pretty max-w-xl"
                >
                  QUANTIFYRE LLP is a collective of systems engineers, technical architects, and product strategists obsessed with highly scalable, enterprise-grade software.
                </motion.p>
             </div>

             {/* Right: Concrete Visual - Command Center Dashboard */}
             <motion.div
               initial={{ opacity: 0, x: 50, rotateY: -10 }}
               animate={{ opacity: 1, x: 0, rotateY: 0 }}
               transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
               className="relative perspective-1000 w-full h-[500px]"
             >
                <div className="absolute inset-0 bg-white border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                   {/* Dashboard Header */}
                   <div className="h-12 bg-surface border-b border-border flex items-center justify-between px-6">
                      <div className="flex items-center gap-4">
                         <div className="flex gap-1.5">
                           <div className="w-3 h-3 rounded-full bg-border" />
                           <div className="w-3 h-3 rounded-full bg-border" />
                           <div className="w-3 h-3 rounded-full bg-border" />
                         </div>
                         <div className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                           <Activity size={12} className="text-green-500" /> System Status: Optimal
                         </div>
                      </div>
                   </div>
                   
                   {/* Dashboard Grid */}
                   <div className="flex-1 p-6 grid grid-cols-2 gap-4 bg-surface/30">
                      {/* Live Stats Blocks */}
                      <div className="col-span-2 grid grid-cols-4 gap-4">
                        {STATS.map((stat, i) => (
                           <div key={i} className="bg-white border border-border rounded-xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{stat.label}</div>
                              <div className="text-3xl font-black text-dark mt-2 flex items-baseline gap-1">
                                {stat.value}<span className="text-primary text-xl">{stat.suffix}</span>
                              </div>
                              <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-500" />
                           </div>
                        ))}
                      </div>

                      {/* Activity Graph */}
                      <div className="col-span-2 h-40 bg-white border border-border rounded-xl shadow-sm p-4 flex flex-col">
                         <div className="flex items-center justify-between mb-4">
                            <div className="text-xs font-bold text-dark uppercase tracking-widest">Deployment Frequency</div>
                            <GitBranch size={16} className="text-text-secondary" />
                         </div>
                         <div className="flex-1 flex items-end justify-between gap-2">
                            {[30, 45, 25, 60, 40, 80, 50, 90, 70, 100, 60, 85].map((h, i) => (
                               <div key={i} className="w-full bg-primary/10 rounded-t-sm relative group cursor-crosshair">
                                  <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-sm transition-all duration-300 group-hover:bg-accent" style={{ height: `${h}%` }} />
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>

          </div>
        </div>
      </section>

      {/* CORE VALUES - Enterprise Bento Grid */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
           <div className="mb-16 space-y-4 max-w-2xl">
              <h2 className="text-4xl font-black text-dark tracking-tighter">Operating Principles.</h2>
              <p className="text-lg text-text-secondary font-medium text-pretty">The strict engineering standards that govern every line of code we ship.</p>
           </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {[
              { icon: Users, title: "Client Obsessed", text: "We measure our success entirely by yours. Complete alignment on business goals.", span: "md:col-span-2" },
              { icon: Target, title: "Precision Engineering", text: "Every pixel and every line of code serves a distinct architectural purpose.", span: "md:col-span-1" },
              { icon: Shield, title: "Enterprise Security", text: "Military-grade encryption, strict RBAC, and OWASP compliance as standard.", span: "md:col-span-1" },
              { icon: Server, title: "Scalable Infrastructure", text: "Cloud-native deployments built to handle massive traffic spikes flawlessly.", span: "md:col-span-2" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "bento-card p-8 flex flex-col justify-between group",
                  item.span
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                   <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-dark mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-text-secondary font-medium leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
