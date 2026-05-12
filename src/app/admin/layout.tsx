import React from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { AdminProviders } from "@/components/admin/layout/AdminProviders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | QUANTIFYRE LLP",
  description: "Enterprise CMS for QUANTIFYRE LLP Website",
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProviders>
      {/* 
        The AdminLayout component handles:
        - Authentication check
        - Sidebar/Header layout
        - Loading skeletons
      */}
      <AdminLayout>{children}</AdminLayout>
    </AdminProviders>
  );
}
