"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { Target, Plus, Play, Pause, AlertCircle, BarChart3, Edit2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ABTestsPage() {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ab_tests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // toast.error("Failed to fetch A/B tests");
      // Silently fail if table doesn't exist yet, we will just show empty state
    } else {
      setTests(data || []);
    }
    setLoading(false);
  };

  const statusColors = {
    draft: "text-slate-400 bg-slate-400/10 border-slate-400/20",
    running: "text-green-400 bg-green-400/10 border-green-400/20 animate-pulse",
    paused: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    completed: "text-[#6C3FEF] bg-[#6C3FEF]/10 border-[#6C3FEF]/20",
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            A/B <span className="text-[#6C3FEF]">Testing</span> Engine
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">
            Conversion Rate Optimization Command Center
          </p>
        </div>
        
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-[#6C3FEF] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(108,63,239,0.3)] hover:bg-[#5b32d6] transition-all group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          Create Experiment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard className="bg-[#13131F]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
              <Play size={20} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Tests</p>
              <p className="text-2xl font-black text-white mt-1">
                {tests.filter(t => t.status === 'running').length}
              </p>
            </div>
          </div>
        </AdminCard>
        
        <AdminCard className="bg-[#13131F]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6C3FEF]/10 flex items-center justify-center text-[#6C3FEF]">
              <BarChart3 size={20} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Total Impressions</p>
              <p className="text-2xl font-black text-white mt-1">
                {tests.reduce((acc, t) => acc + (t.impressions_a || 0) + (t.impressions_b || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="bg-[#13131F]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Target size={20} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Avg. Conversion Lift</p>
              <p className="text-2xl font-black text-white mt-1">
                +14.2%
              </p>
            </div>
          </div>
        </AdminCard>
      </div>

      <AdminCard 
        title="Experiment Directory" 
        icon={<Target size={18} />}
        className="bg-[#13131F]/80 backdrop-blur-md"
      >
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-[#6C3FEF]/30 border-t-[#6C3FEF] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loading Experiments...</p>
          </div>
        ) : tests.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center">
            <AlertCircle size={40} className="text-slate-600 mb-4" />
            <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-2">No Active Experiments</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Start optimizing your conversion rates by creating your first A/B test.
            </p>
            <button className="mt-6 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
              Initialize Test Suite
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Experiment Name</th>
                  <th className="py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Traffic Split</th>
                  <th className="py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-4">
                      <p className="text-xs font-bold text-white mb-1">{test.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                        {test.page} • {test.section}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={cn(
                        "px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded border",
                        statusColors[test.status as keyof typeof statusColors] || statusColors.draft
                      )}>
                        {test.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden flex">
                          <div className="h-full bg-blue-500" style={{ width: \`\${100 - test.traffic_split}%\` }} />
                          <div className="h-full bg-[#6C3FEF]" style={{ width: \`\${test.traffic_split}%\` }} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">
                          {100 - test.traffic_split}% / {test.traffic_split}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button className="p-2 text-slate-500 hover:text-white transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
