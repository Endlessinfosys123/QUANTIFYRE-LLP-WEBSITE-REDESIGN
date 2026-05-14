"use client";

import React, { useEffect, useState } from "react";
import { 
  FileText, Briefcase, MessageSquare, HelpCircle, 
  Plus, ExternalLink, RefreshCw, Mail, 
  Activity, Shield, AlertCircle, CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    testimonials: 0,
    faqs: 0,
    inquiries: 0
  });

  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      // Parallel fetch for counts
      const [
        { count: blogs },
        { count: projects },
        { count: testimonials },
        { count: faqs },
        { count: inquiries }
      ] = await Promise.all([
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('faqs').select('*', { count: 'exact', head: true }),
        supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new')
      ]);

      setStats({
        blogs: blogs || 0,
        projects: projects || 0,
        testimonials: testimonials || 0,
        faqs: faqs || 0,
        inquiries: inquiries || 0
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  const statCards = [
    { label: "Blog Posts", value: stats.blogs, icon: FileText, color: "text-blue-400" },
    { label: "Projects", value: stats.projects, icon: Briefcase, color: "text-purple-400" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquare, color: "text-emerald-400" },
    { label: "FAQs", value: stats.faqs, icon: HelpCircle, color: "text-amber-400" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            AI Core <span className="text-[#6C3FEF]">Dashboard</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1">Status Report: All systems nominal.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="https://quantifyrellp.space" 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#13131F] border border-[#1E1E2E] rounded-xl text-xs font-black uppercase tracking-widest text-[#A0A0B0] hover:text-white hover:border-[#6C3FEF] transition-all group"
          >
            <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
            Live View
          </Link>
          <button 
            className="flex items-center gap-2 px-4 py-2.5 bg-[#6C3FEF] rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#5B35D1] transition-all shadow-lg shadow-[#6C3FEF20]"
          >
            <RefreshCw size={14} />
            Revalidate Cache
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl relative overflow-hidden group hover:border-[#6C3FEF50] transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={48} className={stat.color} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3F3F46] mb-1">
              {stat.label}
            </p>
            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* New Inquiries Alert */}
          {stats.inquiries > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#6C3FEF10] border border-[#6C3FEF30] p-6 rounded-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6C3FEF] rounded-xl flex items-center justify-center text-white relative">
                  <Mail size={24} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#13131F] text-[8px] flex items-center justify-center font-bold">
                    {stats.inquiries}
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-white uppercase text-sm tracking-wider">New Mission Requests</h4>
                  <p className="text-xs text-[#A0A0B0] font-medium">You have {stats.inquiries} unread inquiries waiting in the inbox.</p>
                </div>
              </div>
              <Link 
                href="/admin/inquiries"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#6C3FEF] transition-all"
              >
                Open Inbox
              </Link>
            </motion.div>
          )}

          {/* Activity Log Placeholder */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-[#1E1E2E] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-[#6C3FEF]" />
                <h3 className="font-black text-white uppercase text-sm tracking-widest">System Log</h3>
              </div>
              <button className="text-[10px] font-black text-[#3F3F46] hover:text-[#6C3FEF] uppercase tracking-widest transition-colors">
                View Full Log
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[#1E1E2E] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg flex items-center justify-center text-[#6C3FEF]">
                      <RefreshCw size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">System Config Updated</p>
                      <p className="text-[10px] text-[#3F3F46] font-black uppercase tracking-wider">By Administrator • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-[#A0A0B0] bg-[#0A0A0F] px-2 py-1 rounded border border-[#1E1E2E] uppercase tracking-widest">
                    Success
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-3xl p-6">
            <h3 className="font-black text-white uppercase text-sm tracking-widest mb-6 flex items-center gap-2">
              <Plus size={18} className="text-[#6C3FEF]" />
              Quick Mission
            </h3>
            <div className="space-y-3">
              <QuickActionButton label="Add Blog Post" icon={FileText} href="/admin/content/blog" />
              <QuickActionButton label="Add Project" icon={Briefcase} href="/admin/content/portfolio" />
              <QuickActionButton label="New FAQ" icon={HelpCircle} href="/admin/content/faqs" />
            </div>
          </div>

          {/* System Health */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Shield size={120} />
            </div>
            <h3 className="font-black text-white uppercase text-sm tracking-widest mb-6 flex items-center gap-2">
              <Shield size={18} className="text-[#6C3FEF]" />
              Core Integrity
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                  Operational
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black text-[#A0A0B0] uppercase tracking-widest">
                  <span>Resource Sync</span>
                  <span className="text-white">100%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0A0A0F] rounded-full overflow-hidden border border-[#1E1E2E]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-full bg-gradient-to-r from-[#6C3FEF] to-[#0EA5E9]" 
                  />
                </div>
              </div>
              <p className="text-[10px] text-[#3F3F46] font-black uppercase tracking-widest">
                Last integrity check: Just now
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const QuickActionButton = ({ label, icon: Icon, href }: any) => (
  <Link 
    href={href}
    className="w-full flex items-center justify-between p-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl hover:border-[#6C3FEF] transition-all group"
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-[#13131F] border border-[#1E1E2E] rounded-lg flex items-center justify-center text-[#A0A0B0] group-hover:text-[#6C3FEF] transition-colors">
        <Icon size={16} />
      </div>
      <span className="text-xs font-black text-white uppercase tracking-wider">{label}</span>
    </div>
    <Plus size={14} className="text-[#3F3F46] group-hover:text-white transition-colors" />
  </Link>
);
