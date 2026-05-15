"use client";

import React from "react";
import { Bell, Globe, Search, Monitor, Terminal } from "lucide-react";
import Link from "next/link";

export const AdminHeader = () => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative max-w-md w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#6C3FEF] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search Admin Panel..." 
            className="w-full h-11 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#6C3FEF20] focus:border-[#6C3FEF] outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">
              Live Production
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
            <Terminal size={14} className="text-[#6C3FEF]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              v2.1.0
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          href="https://quantifyrellp.space" 
          target="_blank"
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-black text-slate-500 hover:text-[#6C3FEF] hover:bg-[#6C3FEF]/5 rounded-xl transition-all uppercase tracking-widest group border border-transparent hover:border-[#6C3FEF]/10"
        >
          <Monitor size={16} className="transition-colors" />
          Live Website
        </Link>
        
        <button className="w-11 h-11 flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-400 hover:text-[#6C3FEF] hover:border-[#6C3FEF] rounded-xl transition-all relative group">
          <Bell size={18} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-[#6C3FEF] rounded-full border-2 border-white shadow-lg shadow-[#6C3FEF40]" />
        </button>
      </div>
    </header>
  );
};
