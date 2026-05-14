"use client";

import React from "react";
import { Bell, Globe, Search, Monitor, Terminal } from "lucide-react";
import Link from "next/link";

export const AdminHeader = () => {
  return (
    <header className="h-20 bg-[#0A0A0F] border-b border-[#1E1E2E] flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative max-w-md w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3F3F46] group-focus-within:text-[#6C3FEF] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search AI core archives..." 
            className="w-full h-11 pl-12 pr-4 bg-[#13131F] border border-[#1E1E2E] rounded-xl text-sm text-white focus:border-[#6C3FEF] outline-none transition-all placeholder:text-[#3F3F46]"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#13131F] border border-[#1E1E2E] rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
              Live Production
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#13131F] border border-[#1E1E2E] rounded-lg">
            <Terminal size={14} className="text-[#6C3FEF]" />
            <span className="text-[10px] font-black text-[#A0A0B0] uppercase tracking-widest">
              v2.0.42
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          href="https://quantifyrellp.space" 
          target="_blank"
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-black text-[#A0A0B0] hover:text-white hover:bg-[#1E1E2E] border border-transparent hover:border-[#1E1E2E] rounded-xl transition-all uppercase tracking-widest group"
        >
          <Monitor size={16} className="group-hover:text-[#6C3FEF] transition-colors" />
          Live Website
        </Link>
        
        <button className="w-11 h-11 flex items-center justify-center bg-[#13131F] border border-[#1E1E2E] text-[#A0A0B0] hover:text-[#6C3FEF] hover:border-[#6C3FEF] rounded-xl transition-all relative group">
          <Bell size={18} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-[#6C3FEF] rounded-full border-2 border-[#13131F] shadow-[0_0_10px_rgba(108,63,239,0.5)]" />
        </button>
      </div>
    </header>
  );
};
