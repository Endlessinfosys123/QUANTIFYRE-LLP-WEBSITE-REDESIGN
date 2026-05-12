import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, FileText, Zap, Briefcase, PenTool, 
  MessageSquare, HelpCircle, TrendingUp, Palette, Compass, 
  Image, Phone, Search, Layers, Users, BarChart3, LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

const MENU_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin", category: "main" },
  { label: "Page Sections", icon: Layers, href: "/admin/sections", category: "content" },
  { label: "Hero Manager", icon: Zap, href: "/admin/hero", category: "content" },
  { label: "Services", icon: Layers, href: "/admin/services", category: "content" },
  { label: "Portfolio", icon: Briefcase, href: "/admin/portfolio", category: "content" },
  { label: "Blog Posts", icon: PenTool, href: "/admin/blog", category: "content" },
  { label: "Testimonials", icon: MessageSquare, href: "/admin/testimonials", category: "content" },
  { label: "FAQ Manager", icon: HelpCircle, href: "/admin/faq", category: "content" },
  { label: "Stats Counters", icon: TrendingUp, href: "/admin/stats", category: "content" },
  { label: "Global Settings", icon: Palette, href: "/admin/settings", category: "site" },
  { label: "Navigation", icon: Compass, href: "/admin/navigation", category: "site" },
  { label: "Media Library", icon: Image, href: "/admin/media", category: "site" },
  { label: "Contact Info", icon: Phone, href: "/admin/contact-info", category: "site" },
  { label: "Admin Users", icon: Users, href: "/admin/users", category: "advanced" },
  { label: "Analytics", icon: BarChart3, href: "/admin/analytics", category: "analytics" },
];

const CATEGORIES = {
  content: "Content",
  site: "Site",
  advanced: "Advanced",
  analytics: "Analytics",
};

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 h-screen bg-white border-r border-[#E5E7EB] flex flex-col fixed left-0 top-0 z-50">
      <div className="h-16 px-6 flex items-center border-b border-[#E5E7EB]">
        <Link href="/admin" className="text-xl font-black text-[#111827] tracking-tighter">
          QUANTIFYRE <span className="text-[#6C3FEF]">CMS</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
        {/* Main Link */}
        <div className="space-y-1">
          {MENU_ITEMS.filter(item => item.category === "main").map((item) => (
            <SidebarLink key={item.href} item={item} active={pathname === item.href} />
          ))}
        </div>

        {/* Categorized Links */}
        {Object.entries(CATEGORIES).map(([key, label]) => (
          <div key={key} className="space-y-2">
            <h3 className="px-4 text-[11px] font-black uppercase tracking-[0.15em] text-[#9CA3AF]">
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

      {/* User Info & Logout */}
      <div className="p-4 border-t border-[#E5E7EB] bg-[#F9F9FF]">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#6C3FEF] text-white flex items-center justify-center font-bold text-sm uppercase">
            {session?.user?.name?.[0] || "A"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-[#111827] truncate">{session?.user?.name || "Admin"}</p>
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
              {(session?.user as any)?.role?.replace("_", " ") || "Editor"}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ item, active }: { item: any, active: boolean }) => (
  <Link
    href={item.href}
    className={cn(
      "flex items-center justify-between group px-4 py-2.5 rounded-lg text-sm font-bold transition-all",
      active 
        ? "bg-[#F3F0FF] text-[#6C3FEF]" 
        : "text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]"
    )}
  >
    <div className="flex items-center gap-3">
      <item.icon size={18} className={cn("transition-colors", active ? "text-[#6C3FEF]" : "text-[#9CA3AF] group-hover:text-[#111827]")} />
      {item.label}
    </div>
    {active && <ChevronRight size={14} />}
  </Link>
);
