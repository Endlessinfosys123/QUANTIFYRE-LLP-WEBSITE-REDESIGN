"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { COMPANY_DETAILS } from "@/lib/constants";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* UNIQUE CONTACT HERO (Split Screen) */}
      <section className="pt-32 pb-20 min-h-screen flex items-center bg-surface">
        <div className="container-custom w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Interactive Details */}
            <div className="space-y-12">
              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] text-balance"
                >
                  Start The <br/>
                  <span className="text-primary">Conversation.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-text-secondary font-medium max-w-md text-pretty"
                >
                  Whether it's a massive enterprise system or a cutting-edge web platform, we're ready to engineer your future.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                {[
                  { icon: Mail, label: "Email", value: COMPANY_DETAILS.email },
                  { icon: Phone, label: "Phone", value: COMPANY_DETAILS.phone },
                  { icon: MapPin, label: "HQ", value: COMPANY_DETAILS.address },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-lg shadow-primary/5 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1">{item.label}</div>
                      <div className="text-lg font-bold text-dark">{item.value}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: High-Converting Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-primary/10 border border-primary/5">
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-dark uppercase tracking-widest mb-3">Name</label>
                      <input type="text" className="w-full bg-surface border-none rounded-2xl px-6 py-5 text-dark focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-dark uppercase tracking-widest mb-3">Email</label>
                      <input type="email" className="w-full bg-surface border-none rounded-2xl px-6 py-5 text-dark focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="john@company.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-dark uppercase tracking-widest mb-3">Project Details</label>
                      <textarea rows={4} className="w-full bg-surface border-none rounded-2xl px-6 py-5 text-dark focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" placeholder="Tell us about your goals..."></textarea>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full h-16 rounded-2xl text-lg font-bold gap-3 shadow-xl shadow-primary/20">
                    Send Message <Send size={20} />
                  </Button>
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
