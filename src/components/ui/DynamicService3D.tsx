"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Code2, Database, Smartphone, Globe, Cpu, LayoutTemplate, Shield, Zap, Terminal, AppWindow } from "lucide-react";
import { TechStack3D } from "./TechStack3D";

export const DynamicService3D = ({ slug }: { slug: string }) => {
  if (slug === "ai-automation" || slug === "ai-integration") {
    return (
      <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1000px]">
        {/* Central Brain */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotateY: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute z-30 flex flex-col items-center justify-center w-48 h-48 bg-gradient-to-tr from-[#6C3FEF]/20 to-purple-500/20 backdrop-blur-xl border border-[#6C3FEF]/50 rounded-full shadow-[0_0_80px_rgba(108,63,239,0.5)]"
        >
          <Brain size={80} className="text-[#6C3FEF]" />
        </motion.div>
        
        {/* Floating Neural Nodes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute z-20 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-purple-400"
            initial={{ 
              x: Math.cos((i * 45 * Math.PI) / 180) * 100, 
              y: Math.sin((i * 45 * Math.PI) / 180) * 100 
            }}
            animate={{ 
              x: Math.cos((i * 45 * Math.PI) / 180) * 200, 
              y: Math.sin((i * 45 * Math.PI) / 180) * 200,
              rotateZ: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          >
            <Zap size={24} />
          </motion.div>
        ))}
      </div>
    );
  }

  if (slug === "web-development" || slug === "web-app") {
    return (
      <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1200px]">
        <motion.div
          animate={{ rotateX: [10, -10, 10], rotateY: [-15, 15, -15], y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-30 w-80 h-48 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="p-4 grid grid-cols-3 gap-2 h-full opacity-50">
            <div className="col-span-1 bg-slate-100 rounded" />
            <div className="col-span-2 flex flex-col gap-2">
              <div className="h-4 bg-slate-100 rounded w-1/2" />
              <div className="h-full bg-slate-100 rounded" />
            </div>
          </div>
        </motion.div>

        {/* Floating elements around it */}
        <motion.div 
          animate={{ z: [0, 50, 0], y: [-20, -50, -20], rotateZ: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -right-10 top-10 z-40 bg-blue-500 text-white p-4 rounded-2xl shadow-xl flex gap-3 items-center"
        >
          <LayoutTemplate size={24} /> UI Rendered
        </motion.div>
        
        <motion.div 
          animate={{ z: [0, 80, 0], y: [20, 50, 20], rotateZ: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -left-10 bottom-10 z-40 bg-green-500 text-white p-4 rounded-2xl shadow-xl flex gap-3 items-center"
        >
          <Code2 size={24} /> API Synced
        </motion.div>
      </div>
    );
  }

  if (slug === "custom-software" || slug === "software-engineering") {
    return (
      <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1000px]">
        {/* Core Server Stack */}
        <div className="relative z-20 flex flex-col gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ x: [0, i % 2 === 0 ? 10 : -10, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              className="w-64 h-16 bg-[#13131F] border border-slate-700 rounded-xl shadow-2xl flex items-center px-6 justify-between"
            >
               <Database size={24} className="text-blue-400" />
               <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                 <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
               </div>
            </motion.div>
          ))}
        </div>

        {/* Orbital Terminals */}
        <motion.div
          className="absolute z-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ width: 400, height: 400, border: '1px dashed rgba(108,63,239,0.3)', borderRadius: '50%' }}
        >
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-green-400 p-4 rounded-xl border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)] font-mono text-xs">
             $ init --system core
           </div>
        </motion.div>
      </div>
    );
  }

  if (slug === "mobile-app-development" || slug === "app-development") {
    return (
      <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1000px]">
        {/* Floating Phones */}
        <motion.div
          animate={{ rotateY: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-30 w-48 h-96 bg-white border-8 border-slate-900 rounded-[3rem] shadow-2xl overflow-hidden"
        >
          {/* iOS Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-900 rounded-b-xl z-20" />
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-4">
            <Smartphone size={48} className="mb-4" />
            <div className="w-full h-12 bg-white/20 rounded-xl mb-2" />
            <div className="w-full h-12 bg-white/20 rounded-xl mb-2" />
            <div className="w-full h-24 bg-white/20 rounded-xl" />
          </div>
        </motion.div>

        <motion.div
          animate={{ rotateY: [20, -20, 20], y: [10, -10, 10], x: 100, z: -50 }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-20 w-48 h-96 bg-slate-800 border-8 border-slate-700 rounded-[3rem] shadow-2xl opacity-80"
        />
        
        <motion.div
          animate={{ rotateY: [20, -20, 20], y: [10, -10, 10], x: -100, z: -50 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-20 w-48 h-96 bg-slate-100 border-8 border-slate-300 rounded-[3rem] shadow-2xl opacity-80"
        />
      </div>
    );
  }

  // Default fallback animation
  return <TechStack3D />;
};
