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
      <div className="flex h-screen bg-[#F8FAFC]">
        <AdminSkeleton className="w-64 h-full rounded-none" />
        <div className="flex-1 flex flex-col">
          <AdminSkeleton className="h-20 w-full rounded-none bg-white border-b border-slate-200" />
          <div className="p-8 space-y-6">
            <AdminSkeleton className="h-10 w-48" />
            <AdminSkeleton className="h-[400px] w-full" />
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
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#6C3FEF] opacity-[0.05] blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#0EA5E9] opacity-[0.05] blur-[150px] rounded-full" />
        </div>
        
        <AdminHeader />
        <main className="p-8 flex-1 overflow-y-auto relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};
