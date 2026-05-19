"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Settings, Compass, Layers, 
  Briefcase, PenTool, MessageSquare, HelpCircle, 
  Database, Image as ImageIcon, Mail, Shield, 
  ChevronRight, LogOut, FileText, Cpu, Target,
  Zap, Info, List, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const MENU_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard", category: "main" },
  { label: "Site Config", icon: Settings, href: "/admin/site-config", category: "main" },
  { label: "Navbar Manager", icon: Compass, href: "/admin/navbar", category: "main" },
  
  { label: "Home Page", icon: Zap, href: "/admin/pages/home", category: "pages" },
  { label: "About Page", icon: Info, href: "/admin/pages/about", category: "pages" },
  { label: "Services Page", icon: Layers, href: "/admin/pages/services", category: "pages" },
  { label: "Portfolio Page", icon: Briefcase, href: "/admin/pages/portfolio", category: "pages" },
  { label: "Blog Page", icon: PenTool, href: "/admin/pages/blog", category: "pages" },
  { label: "Contact Page", icon: Mail, href: "/admin/pages/contact", category: "pages" },

  { label: "Services", icon: List, href: "/admin/content/services", category: "content" },
  { label: "Portfolio", icon: Briefcase, href: "/admin/content/portfolio", category: "content" },
  { label: "Blog Posts", icon: PenTool, href: "/admin/content/blog", category: "content" },
  { label: "Testimonials", icon: MessageSquare, href: "/admin/content/testimonials", category: "content" },
  { label: "FAQs", icon: HelpCircle, href: "/admin/content/faqs", category: "content" },
  { label: "Tech Stack", icon: Cpu, href: "/admin/content/tech-stack", category: "content" },
  { label: "Process Steps", icon: Target, href: "/admin/content/process", category: "content" },
  { label: "Scheduled", icon: Target, href: "/admin/content/scheduled", category: "content" },

  { label: "Inquiries", icon: Mail, href: "/admin/inquiries", category: "crm" },
  { label: "Forms Builder", icon: FileText, href: "/admin/marketing/forms", category: "crm" },

  { label: "A/B Tests", icon: Target, href: "/admin/marketing/ab-tests", category: "marketing" },
  { label: "Popups & Banners", icon: Layers, href: "/admin/marketing/popups", category: "marketing" },

  { label: "Media Library", icon: ImageIcon, href: "/admin/media", category: "site" },
  { label: "SEO Manager", icon: Search, href: "/admin/seo", category: "site" },
  
  { label: "Seed Manager", icon: Database, href: "/admin/seed", category: "advanced" },
  { label: "Webhooks", icon: Zap, href: "/admin/settings/webhooks", category: "advanced" },
  { label: "Settings", icon: Shield, href: "/admin/settings", category: "advanced" },
];

const CATEGORIES = {
  pages: "Page Editors",
  content: "Content Management",
  crm: "CRM & Forms",
  marketing: "Marketing",
  site: "Site Assets & SEO",
  advanced: "Advanced Config",
};

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 h-screen bg-[#0A0A0F]/80 backdrop-blur-xl border-r border-white/5 flex flex-col fixed left-0 top-0 z-50 text-slate-200">
      <div className="h-20 px-6 flex items-center border-b border-white/5">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#6C3FEF] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(108,63,239,0.5)]">
            <Shield size={18} className="text-white" />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase text-white">
            QUANTIFYRE <span className="text-[#6C3FEF]">v3</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
        {/* Main Links */}
        <div className="space-y-1">
          {MENU_ITEMS.filter(item => item.category === "main").map((item) => (
            <SidebarLink key={item.href} item={item} active={pathname === item.href} />
          ))}
        </div>

        {/* Categorized Links */}
        {Object.entries(CATEGORIES).map(([key, label]) => (
          <div key={key} className="space-y-2">
            <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              {label}
            </h3>
            <div className="space-y-1">
              {MENU_ITEMS.filter(item => item.category === key).map((item) => (
                <SidebarLink key={item.href} item={item} active={pathname === item.href} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/5 bg-[#0A0A0F]/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black text-[#EF4444] hover:bg-[#EF4444]/10 hover:text-red-400 transition-all uppercase tracking-widest group"
        >
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Sign Out Access
        </button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ item, active }: { item: any, active: boolean }) => (
  <Link
    href={item.href}
    className={cn(
      "flex items-center justify-between group px-4 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-wider",
      active 
        ? "bg-[#6C3FEF] text-white shadow-[0_4px_20px_rgba(108,63,239,0.3)] translate-x-1" 
        : "text-slate-400 hover:text-white hover:bg-white/5"
    )}
  >
    <div className="flex items-center gap-3">
      <item.icon size={16} className={cn("transition-colors", active ? "text-white" : "text-slate-500 group-hover:text-[#6C3FEF]")} />
      {item.label}
    </div>
    {active && <ChevronRight size={14} />}
  </Link>
);
