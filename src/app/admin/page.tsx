"use client";

import React from "react";
import { AdminStatCard } from "@/components/admin/ui/AdminStatCard";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/ui/AdminTable";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { 
  FileText, Briefcase, MessageSquare, Layers, 
  Image as ImageIcon, HelpCircle, Plus, Upload, 
  ArrowRight, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  // Mock data for initial UI build
  const stats = [
    { label: "Blog Posts", value: 24, icon: FileText },
    { label: "Portfolio", value: 12, icon: Briefcase },
    { label: "Testimonials", value: 8, icon: MessageSquare },
    { label: "Services", value: 6, icon: Layers },
    { label: "Media Assets", value: 156, icon: ImageIcon },
    { label: "FAQ Items", value: 15, icon: HelpCircle },
  ];

  const recentChanges = [
    { type: "Blog", name: "Why Next.js 14 is the future", user: "Tishy Patel", time: "2 hours ago", status: "published" },
    { type: "Service", name: "AI Automation", user: "Tishy Patel", time: "5 hours ago", status: "updated" },
    { type: "Hero", name: "Homepage Headline", user: "Admin", time: "Yesterday", status: "updated" },
    { type: "Portfolio", name: "School ERP System", user: "Tishy Patel", time: "2 days ago", status: "published" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tighter">
            System Overview
          </h1>
          <p className="text-[#6B7280] font-medium">Welcome back, here&apos;s what&apos;s happening on the site.</p>
        </div>
        <div className="flex items-center gap-3">
          <AdminButton variant="outline" icon={<Upload size={18} />} href="/admin/media">
            Upload Media
          </AdminButton>
          <AdminButton icon={<Plus size={18} />} href="/admin/blog/new">
            New Blog Post
          </AdminButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <AdminStatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2">
          <AdminCard 
            title="Recent Changes" 
            subtitle="Latest updates to website content"
            headerAction={
              <Link href="/admin/content" className="text-xs font-bold text-[#6C3FEF] hover:underline flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            }
          >
            <AdminTable headers={["Type", "Item Name", "Updated By", "Time", "Status"]}>
              {recentChanges.map((change, i) => (
                <AdminTableRow key={i}>
                  <AdminTableCell className="font-bold text-[#6C3FEF]">{change.type}</AdminTableCell>
                  <AdminTableCell className="font-semibold">{change.name}</AdminTableCell>
                  <AdminTableCell className="text-[#6B7280]">{change.user}</AdminTableCell>
                  <AdminTableCell className="flex items-center gap-1.5 text-[#6B7280]">
                    <Clock size={14} /> {change.time}
                  </AdminTableCell>
                  <AdminTableCell>
                    <AdminBadge variant={change.status === "published" ? "success" : "info"}>
                      {change.status}
                    </AdminBadge>
                  </AdminTableCell>
                </AdminTableRow>
              ))}
            </AdminTable>
          </AdminCard>
        </div>

        {/* Quick Tips / System Health */}
        <div className="space-y-6">
          <AdminCard title="Quick Actions">
            <div className="grid grid-cols-1 gap-3">
              <AdminButton variant="secondary" className="justify-start text-left" icon={<Briefcase size={18} />} href="/admin/portfolio/new">
                Add New Project
              </AdminButton>
              <AdminButton variant="secondary" className="justify-start text-left" icon={<MessageSquare size={18} />} href="/admin/testimonials">
                Add Testimonial
              </AdminButton>
              <AdminButton variant="secondary" className="justify-start text-left" icon={<HelpCircle size={18} />} href="/admin/faq">
                New FAQ Item
              </AdminButton>
            </div>
          </AdminCard>

          <AdminCard title="System Health" className="bg-green-50 border-green-100">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-700">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold">All Systems Operational</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-green-600">
                  <span>Database Sync</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-1.5 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[100%]" />
                </div>
              </div>
              <p className="text-[10px] text-green-600 font-medium">
                Last full revalidation: 14 mins ago
              </p>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
