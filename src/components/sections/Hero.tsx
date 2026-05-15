"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Code2, Database, LayoutTemplate, Sparkles, Terminal } from "lucide-react";

export const Hero = ({ data, stats }: { data?: any, stats?: any[] }) => {
  const heroBadge = data?.badge_text || "Enterprise IT Engineering";
  const heroTitle = data?.heading_line1 || "Build High-Performance Software.";
  const heroSubtitle = data?.subtext || "We are a technology agency building scalable web applications, enterprise ERPs, and AI-driven automation systems for modern businesses.";
  const primaryCTA = data?.cta1_label || "Start a Project";
  const primaryLink = data?.cta1_link || "/contact";
  
  const systemBadges = data?.extra_json?.system_badges || [
    { text: "AI-Powered", emoji: "⚡" },
    { text: "Enterprise Grade", emoji: "🛡️" },
    { text: "Fast Delivery", emoji: "🚀" },
    { text: "Innovative Tech", emoji: "💡" }
  ];

  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white tech-grid min-h-screen flex items-center">
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none animate-morph-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none animate-morph-blob delay-300" />

      {/* Dynamic Floating Badges */}
      {systemBadges.slice(0, 4).map((badge: any, i: number) => {
        const positions = [
          "top-40 left-[8%]",
          "bottom-48 left-[5%]",
          "top-48 right-[5%]",
          "bottom-44 right-[6%]"
        ];
        const animationVariants = [
          { y: [0, -16, 0], rotate: [0, -4, 4, 0] },
          { y: [0, 14, 0], rotate: [0, 3, -3, 0] },
          { y: [0, -12, 0], rotate: [0, 4, -4, 0] },
          { y: [0, 18, 0], rotate: [0, -3, 3, 0] }
        ];

        return (
          <motion.div
            key={i}
            animate={animationVariants[i]}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            className={`absolute ${positions[i]} hidden xl:flex items-center gap-2 bg-white border-2 border-border rounded-2xl px-4 py-3 shadow-lg text-sm font-black text-dark pointer-events-none`}
          >
            <span className="text-xl">{typeof badge === 'string' ? '✨' : badge.emoji}</span> 
            {typeof badge === 'string' ? badge : badge.text}
          </motion.div>
        );
      })}

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
              {heroBadge}
            </motion.div>
            
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-dark tracking-tighter leading-[0.95] text-balance"
              >
                {heroTitle.split('<br />').map((line: string, i: number) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < heroTitle.split('<br />').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary font-medium max-w-lg leading-relaxed text-pretty"
              >
                {heroSubtitle}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4"
            >
              <Button href={primaryLink} size="lg" className="w-full sm:w-auto px-10 h-16 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30">
                {primaryCTA} <ArrowRight className="ml-2" size={20} />
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
                 <span className="text-dark font-black">
                   {stats?.find(s => s.label.toLowerCase().includes("business"))?.value || "50+"}
                 </span> Businesses Trust Us
               </div>
            </motion.div>
          </div>

          {/* Right: 3D Character Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="relative lg:h-[600px] w-full flex items-center justify-center"
          >
             {/* Background glow behind character */}
             <motion.div
               className="absolute w-[400px] h-[400px] rounded-full bg-primary/8 blur-[80px] pointer-events-none"
               animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             />

             {/* Character floating animation */}
             <motion.div
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10"
             >
               <img
                 src="/characters/hero-character.png"
                 alt="QUANTIFYRE AI Tech Professional"
                 className="w-[350px] md:w-[450px] h-auto drop-shadow-2xl relative z-10"
               />
             </motion.div>

             {/* Floating Dashboard Card */}
             <motion.div 
               animate={{ y: [0, -15, 0], x: [0, 5, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
               className="absolute -right-4 top-1/4 w-48 bg-white p-4 rounded-2xl shadow-2xl border border-border z-20"
             >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600"><LayoutTemplate size={18}/></div>
                  <div>
                    <div className="text-xs font-black text-dark">UI Component</div>
                    <div className="text-[10px] text-green-500 font-bold">✓ Compiled</div>
                  </div>
                </div>
             </motion.div>

             {/* Floating Code Card */}
             <motion.div 
               animate={{ y: [0, 12, 0], x: [0, -5, 0] }} 
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -left-4 bottom-1/4 w-44 bg-dark p-4 rounded-2xl shadow-2xl z-20"
             >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><Code2 size={18} className="text-primary"/></div>
                  <div>
                    <div className="text-xs font-bold text-white">System Live</div>
                    <div className="text-[10px] text-primary font-bold">Next.js 16</div>
                  </div>
                </div>
             </motion.div>

             {/* Floating emoji badges */}
             {["🚀", "⚡", "🔥"].map((emoji, i) => (
               <motion.div
                 key={i}
                 className="absolute text-3xl pointer-events-none z-20"
                 style={{
                   right: `${10 + i * 25}%`,
                   top: `${15 + i * 20}%`,
                 }}
                 animate={{
                   y: [0, -15, 0],
                   rotate: [0, 10, -10, 0],
                 }}
                 transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
               >
                 {emoji}
               </motion.div>
             ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
