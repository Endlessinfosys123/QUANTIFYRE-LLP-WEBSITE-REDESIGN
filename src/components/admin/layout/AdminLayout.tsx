"use client";

import React, { useEffect, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { AdminSkeleton } from "../ui/AdminSkeleton";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const isAuthPage = pathname === "/admin/login";

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (!user && !isAuthPage) {
        router.replace("/admin/login");
      }
      
      setLoading(false);
    };

    checkUser();
  }, [pathname, router, isAuthPage]);

  if (loading) {
    if (isAuthPage) return <>{children}</>;
    
    return (
      <div className="flex h-screen bg-[#0A0A0F]">
        <AdminSkeleton className="w-64 h-full rounded-none opacity-20" />
        <div className="flex-1 flex flex-col">
          <AdminSkeleton className="h-20 w-full rounded-none bg-[#0A0A0F] border-b border-white/5 opacity-20" />
          <div className="p-8 space-y-6">
            <AdminSkeleton className="h-10 w-48 opacity-20" />
            <AdminSkeleton className="h-[400px] w-full opacity-20" />
          </div>
        </div>
      </div>
    );
  }

  // If we are on login, just render the children without sidebar/header
  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0F] text-slate-200 font-sans selection:bg-[#6C3FEF]/30 selection:text-white">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
        {/* Quantum CMS Ambient Background Gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[#6C3FEF] opacity-[0.08] blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[#0EA5E9] opacity-[0.05] blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full neural-grid opacity-[0.15]" />
        </div>
        
        <div className="relative z-20">
          <AdminHeader />
        </div>
        <main className="p-8 flex-1 overflow-y-auto relative z-10 custom-scrollbar">
          {children}
        </main>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
};
