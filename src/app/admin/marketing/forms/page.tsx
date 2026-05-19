"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { FileText, Plus, Database, Copy, Settings, Trash2, Mail, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function FormsBuilderPage() {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setForms(data);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Form <span className="text-[#6C3FEF]">Architect</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">
            Dynamic Form & Data Collection Hub
          </p>
        </div>
        
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-[#6C3FEF] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(108,63,239,0.3)] hover:bg-[#5b32d6] transition-all group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          Build New Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard className="bg-[#13131F]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Forms</p>
              <p className="text-2xl font-black text-white mt-1">
                {forms.filter(f => f.is_active).length}
              </p>
            </div>
          </div>
        </AdminCard>
        
        <AdminCard className="bg-[#13131F]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Database size={20} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Total Submissions</p>
              <p className="text-2xl font-black text-white mt-1">
                {forms.reduce((acc, f) => acc + (f.submissions_count || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="bg-[#13131F]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Auto-Replies</p>
              <p className="text-2xl font-black text-white mt-1">
                {forms.filter(f => f.send_auto_reply).length} Active
              </p>
            </div>
          </div>
        </AdminCard>
      </div>

      <AdminCard 
        title="Form Registry" 
        icon={<FileText size={18} />}
        className="bg-[#13131F]/80 backdrop-blur-md"
      >
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-[#6C3FEF]/30 border-t-[#6C3FEF] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loading Forms...</p>
          </div>
        ) : forms.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center">
            <FileText size={40} className="text-slate-600 mb-4" />
            <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-2">No Forms Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Create your first dynamic form to start collecting data from your users.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div key={form.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#6C3FEF]/50 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1 truncate" title={form.name}>{form.name}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">/{form.slug}</p>
                  </div>
                  <span className={cn(
                    "px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded border",
                    form.is_active ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-slate-400 bg-slate-400/10 border-slate-400/20"
                  )}>
                    {form.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><Database size={14} /> Submissions</span>
                    <span className="font-bold text-white">{form.submissions_count}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><MessageSquare size={14} /> Auto-Reply</span>
                    <span className="font-bold text-white">{form.send_auto_reply ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                  <button className="flex-1 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/5 hover:bg-white/10 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5">
                    <Settings size={14} /> Edit
                  </button>
                  <button className="flex-1 py-2 text-[10px] font-black text-[#6C3FEF] uppercase tracking-widest bg-[#6C3FEF]/10 hover:bg-[#6C3FEF] hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5">
                    <Copy size={14} /> Shortcode
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
