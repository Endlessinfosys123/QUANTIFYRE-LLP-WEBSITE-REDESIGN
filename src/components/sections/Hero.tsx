"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Code2, Database, LayoutTemplate, Sparkles, Terminal } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white tech-grid min-h-screen flex items-center">
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none animate-morph-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none animate-morph-blob delay-300" />

      {/* Cartoon Floating Badges */}
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [0, -4, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-[8%] hidden xl:flex items-center gap-2 bg-white border-2 border-border rounded-2xl px-4 py-3 shadow-lg text-sm font-black text-dark pointer-events-none"
      >
        <span className="text-xl">⚡</span> AI-Powered
      </motion.div>
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-48 left-[5%] hidden xl:flex items-center gap-2 bg-white border-2 border-border rounded-2xl px-4 py-3 shadow-lg text-sm font-black text-dark pointer-events-none"
      >
        <span className="text-xl">🛡️</span> Enterprise Grade
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 4, -4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute top-48 right-[5%] hidden xl:flex items-center gap-2 bg-white border-2 border-border rounded-2xl px-4 py-3 shadow-lg text-sm font-black text-dark pointer-events-none"
      >
        <span className="text-xl">🚀</span> Fast Delivery
      </motion.div>
      <motion.div
        animate={{ y: [0, 18, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute bottom-44 right-[6%] hidden xl:flex items-center gap-2 bg-white border-2 border-border rounded-2xl px-4 py-3 shadow-lg text-sm font-black text-dark pointer-events-none"
      >
        <span className="text-xl">💡</span> Innovative Tech
      </motion.div>

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Typography & CTAs */}
          <div className="max-w-2xl space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-surface border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest"
            >
              <Sparkles size={14} className="text-accent" />
              Enterprise IT Engineering
            </motion.div>
            
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-dark tracking-tighter leading-[0.95] text-balance"
              >
                Build High-<br />
                Performance <br />
                <span className="text-primary">Software.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary font-medium max-w-lg leading-relaxed text-pretty"
              >
                We are a technology agency building scalable web applications, enterprise ERPs, and AI-driven automation systems for modern businesses.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4"
            >
              <Button href="/contact" size="lg" className="w-full sm:w-auto px-10 h-16 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30">
                Start a Project <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button href="/portfolio" variant="outline" size="lg" className="w-full sm:w-auto px-10 h-16 rounded-xl font-bold text-lg bg-white shadow-sm hover:bg-surface">
                View Capabilities
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-10 flex items-center gap-8 text-sm font-bold text-text-secondary"
            >
               <div className="flex -space-x-3">
                 {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-surface flex items-center justify-center shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full rounded-full object-cover" />
                    </div>
                 ))}
               </div>
               <div>
                 <span className="text-dark font-black">50+</span> Businesses Trust Us
               </div>
            </motion.div>
          </div>

          {/* Right: Concrete Tech Visual (Dashboard Mockup) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="relative lg:h-[600px] w-full perspective-1000"
          >
             {/* Main Dashboard Window */}
             <div className="absolute inset-0 bg-white rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col z-10">
               {/* Browser/Window Header */}
               <div className="h-10 bg-surface border-b border-border flex items-center px-4 gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-400" />
                   <div className="w-3 h-3 rounded-full bg-amber-400" />
                   <div className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
                 <div className="mx-auto bg-white border border-border rounded text-[10px] font-mono px-4 py-1 text-text-secondary flex items-center gap-2">
                   <Terminal size={10} /> quantifyre-admin.production
                 </div>
               </div>
               {/* Dashboard Content */}
               <div className="flex-1 p-6 grid grid-cols-3 gap-4 bg-surface/30">
                 {/* Sidebar */}
                 <div className="col-span-1 space-y-4">
                   <div className="h-24 bg-white border border-border rounded-xl shadow-sm p-4">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mb-2"><Database size={16} className="text-primary"/></div>
                      <div className="h-2 w-1/2 bg-surface rounded" />
                   </div>
                   <div className="h-48 bg-white border border-border rounded-xl shadow-sm p-4 space-y-3">
                      {[...Array(4)].map((_, i) => <div key={i} className="h-8 bg-surface rounded-lg" />)}
                   </div>
                 </div>
                 {/* Main Area */}
                 <div className="col-span-2 space-y-4">
                   <div className="h-32 bg-white border border-border rounded-xl shadow-sm p-4 flex flex-col justify-between">
                     <div className="flex justify-between items-center">
                       <div className="h-3 w-1/3 bg-surface rounded" />
                       <div className="h-6 w-16 bg-primary/10 rounded-full" />
                     </div>
                     <div className="flex items-end gap-2 h-12">
                       {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                         <div key={i} className="w-full bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }} />
                       ))}
                     </div>
                   </div>
                   <div className="h-40 bg-white border border-border rounded-xl shadow-sm p-4 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                      <div className="relative z-10 flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-border">
                           <Code2 size={24} className="text-primary" />
                         </div>
                         <div>
                           <div className="text-sm font-bold text-dark">System Architecture</div>
                           <div className="text-xs text-text-secondary mt-1">Next.js 14 • Node.js • PostgreSQL</div>
                         </div>
                      </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Floating Decorative Elements */}
             <motion.div 
               animate={{ y: [0, -15, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -right-8 top-1/4 w-40 bg-white p-4 rounded-xl shadow-xl border border-border z-20"
             >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><LayoutTemplate size={16}/></div>
                  <div>
                    <div className="text-xs font-bold text-dark">UI Component</div>
                    <div className="text-[10px] text-text-secondary">Compiled successfully</div>
                  </div>
                </div>
             </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
