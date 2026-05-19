"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

// Cartoon rocket that shoots off on hover
function CartoonRocket() {
  return (
    <motion.svg
      viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16"
      whileHover={{ y: -60, x: 60, rotate: 45, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      <path d="M40 6C40 6 24 22 24 42H56C56 22 40 6 40 6Z" fill="#6366f1" stroke="#3730a3" strokeWidth="2.5" strokeLinejoin="round"/>
      <rect x="32" y="42" width="16" height="18" rx="3" fill="#818cf8" stroke="#3730a3" strokeWidth="2"/>
      <path d="M24 52L16 58L24 64V52Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M56 52L64 58L56 64V52Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="40" cy="28" r="6" fill="white" stroke="#3730a3" strokeWidth="2"/>
      <circle cx="40" cy="28" r="3.5" fill="#bae6fd"/>
      <path d="M32 64 Q40 76 48 64" stroke="#f97316" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M35 67 Q40 80 45 67" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </motion.svg>
  );
}

function CartoonStar({ size = 24, color = "#f59e0b", delay = 0 }: { size?: number; color?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24" fill="none"
      style={{ width: size, height: size }}
      animate={{ rotate: 360, scale: [1, 1.3, 1] }}
      transition={{ rotate: { duration: 6, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, delay } }}
    >
      <path d="M12 2L14.4 9.6H22L15.9 14.4L18.3 22L12 17.2L5.7 22L8.1 14.4L2 9.6H9.6L12 2Z" fill={color} stroke="white" strokeWidth="0.5"/>
    </motion.svg>
  );
}

export const CTA = ({ data }: { data?: any }) => {
  const badge = data?.section_label || "Unlimited Potential";
  const title = data?.heading || "Let's Engineer Your Digital Legacy.";
  const description = data?.subtext || "The future waits for no one. Partner with QUANTIFYRE to build intelligent systems that scale with your ambition.";
  const primaryText = data?.btn1_label || "Start the Mission";
  const primaryLink = data?.btn1_link || "/contact";
  const secondaryText = data?.btn2_label || "Free Strategy Call 📞";
  const secondaryLink = data?.btn2_link || "/contact";

  return (
    <section className="section-padding bg-white relative overflow-hidden">

      {/* Cartoon morphing background blobs */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-primary/8 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-morph-blob" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-accent/8 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none animate-morph-blob delay-300" />

      {/* Floating stars */}
      <div className="absolute top-16 left-[15%] animate-float pointer-events-none"><CartoonStar size={20} color="#f59e0b" delay={0} /></div>
      <div className="absolute top-24 right-[18%] animate-float-reverse pointer-events-none"><CartoonStar size={14} color="#6366f1" delay={0.3} /></div>
      <div className="absolute bottom-20 left-[25%] animate-float pointer-events-none"><CartoonStar size={18} color="#0ea5e9" delay={0.6} /></div>
      <div className="absolute bottom-12 right-[22%] animate-float-reverse pointer-events-none"><CartoonStar size={24} color="#ec4899" delay={0.9} /></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white border-2 border-primary/10 rounded-[4rem] p-14 md:p-28 text-center space-y-12 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(99,102,241,0.12)]"
        >
          {/* Animated spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 w-80 h-80 border-[3px] border-dashed border-primary/15 rounded-full pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-64 h-64 border-[3px] border-dashed border-accent/15 rounded-full pointer-events-none"
          />

          <div className="space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/8 border-2 border-primary/15 text-primary text-xs font-black uppercase tracking-[0.4em]"
            >
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                <Sparkles size={16} />
              </motion.span>
              {badge}
            </motion.div>
            
            <h2 className="text-5xl md:text-8xl font-black text-dark leading-[0.9] tracking-tighter max-w-5xl mx-auto">
              {title}
            </h2>
            
            <p className="text-text-secondary text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10 pt-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Button
                href={primaryLink}
                size="lg"
                className="w-full sm:w-auto px-16 h-20 text-xl font-black rounded-2xl shadow-[0_20px_50px_-10px_rgba(99,102,241,0.4)] hover:shadow-[0_30px_70px_-10px_rgba(99,102,241,0.6)] relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <motion.span
                    animate={{ rotate: [0, -15, 15, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2.5 }}
                    className="mr-3 text-xl"
                  >🚀</motion.span>
                  {primaryText}
                  <ArrowRight size={22} className="ml-3 group-hover:translate-x-2 transition-transform duration-200" />
                </span>
                <span className="absolute inset-0 pointer-events-none">
                  <span className="absolute top-0 -left-full w-1/2 h-full bg-white/20 skew-x-12 group-hover:animate-shimmer" />
                </span>
              </Button>
            </motion.div>

            {secondaryText && (
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Button
                  href={secondaryLink}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-20 px-12 text-xl font-black rounded-2xl border-2 border-primary/20 text-primary hover:bg-primary/5"
                >
                  {secondaryText}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Animated floating stats instead of character */}
          <motion.div 
            className="absolute -bottom-2 -right-6 hidden lg:block z-10"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-dark text-white rounded-2xl p-4 shadow-2xl border border-white/10 text-left w-36">
              <div className="text-2xl font-black text-primary">12+</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-1">Projects Delivered</div>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => <div key={i} className="text-yellow-400 text-xs">★</div>)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
