"use client";

import React from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSkeleton } from "../ui/AdminSkeleton";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/register";

  if (status === "loading") {
    return (
      <div className="flex h-screen bg-[#F8F7FF]">
        <AdminSkeleton className="w-64 h-full rounded-none" />
        <div className="flex-1 flex flex-col">
          <AdminSkeleton className="h-16 w-full rounded-none" />
          <div className="p-8 space-y-6">
            <AdminSkeleton className="h-10 w-48" />
            <AdminSkeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  // If we are on login/register, just render the children without sidebar/header
  if (isAuthPage) {
    return <>{children}</>;
  }

  if (status === "unauthenticated") {
    router.replace("/admin/login");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#F8F7FF]">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
