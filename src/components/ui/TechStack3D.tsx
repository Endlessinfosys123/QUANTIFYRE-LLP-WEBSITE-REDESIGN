"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Cpu, Database, LayoutTemplate, Network, Brain, Smartphone, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const TechStack3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1000px]" ref={containerRef}>
      {/* Central Core Element */}
      <motion.div
        className="absolute w-40 h-40 bg-white rounded-3xl shadow-[0_0_50px_rgba(108,63,239,0.3)] border-2 border-[#6C3FEF]/20 flex flex-col items-center justify-center z-30"
        animate={{ 
          rotateY: [0, 360],
          rotateX: [10, -10, 10],
          y: [0, -15, 0]
        }}
        transition={{ 
          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#6C3FEF]/10 to-[#0EA5E9]/10 backdrop-blur-sm" />
        <Brain size={64} className="text-[#6C3FEF] drop-shadow-xl z-10" />
        <div className="mt-2 text-[10px] font-black tracking-widest text-[#6C3FEF] uppercase z-10">AI Core</div>
        
        {/* Glow behind the core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#6C3FEF]/20 blur-[30px] rounded-full -z-10" />
      </motion.div>

      {/* Orbiting Elements */}
      <OrbitElement icon={Code2} label="Software" angle={0} radius={180} color="text-blue-500" delay={0} />
      <OrbitElement icon={Database} label="Data Sys" angle={72} radius={160} color="text-green-500" delay={1} />
      <OrbitElement icon={Smartphone} label="Mobile" angle={144} radius={200} color="text-purple-500" delay={2} />
      <OrbitElement icon={Network} label="Cloud" angle={216} radius={170} color="text-orange-500" delay={3} />
      <OrbitElement icon={ShieldCheck} label="Security" angle={288} radius={190} color="text-red-500" delay={4} />

      {/* Connectivity Lines (Simulated with background grid) */}
      <div className="absolute inset-0 bg-[url('/grid-dark.svg')] opacity-10 rounded-full" style={{ maskImage: 'radial-gradient(circle, black, transparent 70%)' }} />
    </div>
  );
};

function OrbitElement({ icon: Icon, label, angle, radius, color, delay }: any) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-20"
      initial={{ x: 0, y: 0 }}
      animate={{ 
        rotateZ: [0, 360],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: -delay * 5 }}
      style={{
        width: 1, height: 1, transformOrigin: "0 0"
      }}
    >
      <motion.div
        className={cn("absolute w-20 h-20 bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center justify-center gap-1", color)}
        style={{
          x: Math.cos((angle * Math.PI) / 180) * radius - 40,
          y: Math.sin((angle * Math.PI) / 180) * radius - 40,
        }}
        animate={{ 
          rotateZ: [360, 0], // Counter-rotate so it stays upright
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          rotateZ: { duration: 30, repeat: Infinity, ease: "linear", delay: -delay * 5 },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
        }}
      >
        <Icon size={24} />
        <span className="text-[8px] font-black uppercase tracking-widest text-slate-800">{label}</span>
      </motion.div>
    </motion.div>
  );
}
