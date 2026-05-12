"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Users, Target, Shield } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* UNIQUE ABOUT HERO */}
      <section className="relative pt-40 pb-20 overflow-hidden min-h-[80vh] flex flex-col justify-center">
        {/* Subtle Bento Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="grid grid-cols-4 grid-rows-4 h-full w-full gap-4 p-4">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="border border-primary/10 rounded-3xl bg-surface/50" />
            ))}
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary font-black uppercase tracking-widest text-xs"
            >
              The People Behind The Code
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-dark tracking-tighter leading-[0.85] text-balance"
            >
              Builders of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Digital Empires.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed text-pretty"
            >
              QUANTIFYRE LLP isn't just an IT agency. We are a collective of engineers, designers, and strategists obsessed with pushing the boundaries of what's possible on the web.
            </motion.p>
          </div>
        </div>
      </section>

      {/* CORE VALUES (Quick section to fill page) */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Client Obsessed", text: "We measure our success entirely by yours." },
              { icon: Target, title: "Precision Engineering", text: "Every pixel and every line of code serves a purpose." },
              { icon: Shield, title: "Uncompromising Quality", text: "Enterprise-grade security and performance as standard." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-10 h-full">
                  <item.icon size={40} className="text-primary mb-6" />
                  <h3 className="text-2xl font-bold text-dark mb-4">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
