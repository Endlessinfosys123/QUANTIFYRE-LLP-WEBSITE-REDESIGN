import React from "react";
import { Bell, Globe, Search } from "lucide-react";
import Link from "next/link";

export const AdminHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
          <input 
            type="text" 
            placeholder="Search content, blogs, or projects..." 
            className="w-full h-10 pl-10 pr-4 bg-[#F8F7FF] border border-transparent rounded-lg text-sm focus:bg-white focus:border-[#6C3FEF] outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#6B7280] hover:text-[#6C3FEF] hover:bg-[#F3F0FF] rounded-lg transition-all"
        >
          <Globe size={18} /> View Website
        </Link>
        
        <button className="p-2 text-[#6B7280] hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </div>
    </header>
  );
};
