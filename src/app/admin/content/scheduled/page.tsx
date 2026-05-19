"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { CalendarClock, Clock, CheckCircle2, XCircle, AlertCircle, Play, Edit2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ScheduledContentPage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('scheduled_content')
      .select('*')
      .order('scheduled_at', { ascending: true });

    if (!error && data) {
      setSchedules(data);
    }
    setLoading(false);
  };

  const statusColors = {
    pending: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    executed: "text-green-400 bg-green-400/10 border-green-400/20",
    failed: "text-red-400 bg-red-400/10 border-red-400/20",
    cancelled: "text-slate-400 bg-slate-400/10 border-slate-400/20",
  };

  const actionIcons = {
    publish: <Play size={14} className="text-green-400" />,
    unpublish: <XCircle size={14} className="text-red-400" />,
    update: <Edit2 size={14} className="text-blue-400" />
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Temporal <span className="text-[#0EA5E9]">Queue</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">
            Scheduled Content & Action Manager
          </p>
        </div>
        
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-slate-200 transition-all"
        >
          <CalendarClock size={16} />
          New Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminCard className="bg-[#13131F]/80 backdrop-blur-md border-t-4 border-t-blue-500">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pending</p>
              <p className="text-xl font-black text-white mt-0.5">
                {schedules.filter(s => s.status === 'pending').length}
              </p>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="bg-[#13131F]/80 backdrop-blur-md border-t-4 border-t-green-500">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Executed</p>
              <p className="text-xl font-black text-white mt-0.5">
                {schedules.filter(s => s.status === 'executed').length}
              </p>
            </div>
          </div>
        </AdminCard>
        
        <AdminCard className="bg-[#13131F]/80 backdrop-blur-md border-t-4 border-t-red-500">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Failed</p>
              <p className="text-xl font-black text-white mt-0.5">
                {schedules.filter(s => s.status === 'failed').length}
              </p>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="bg-[#13131F]/80 backdrop-blur-md border-t-4 border-t-slate-500">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-400">
              <XCircle size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cancelled</p>
              <p className="text-xl font-black text-white mt-0.5">
                {schedules.filter(s => s.status === 'cancelled').length}
              </p>
            </div>
          </div>
        </AdminCard>
      </div>

      <AdminCard 
        title="Execution Pipeline" 
        icon={<CalendarClock size={18} />}
        className="bg-[#13131F]/80 backdrop-blur-md"
      >
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-[#0EA5E9]/30 border-t-[#0EA5E9] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loading Pipeline...</p>
          </div>
        ) : schedules.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center">
            <CalendarClock size={40} className="text-slate-600 mb-4" />
            <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-2">Queue Empty</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              You have no scheduled actions. You can schedule content publishing, unpublishing, or updates from the individual content editors.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Target</th>
                  <th className="py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Action</th>
                  <th className="py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Scheduled Time</th>
                  <th className="py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Controls</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-4">
                      <p className="text-xs font-bold text-white mb-1">{schedule.table_name}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider truncate w-32">
                        {schedule.record_id}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {actionIcons[schedule.action as keyof typeof actionIcons]}
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                          {schedule.action}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-xs font-bold text-white mb-1">
                        {new Date(schedule.scheduled_at).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                        {new Date(schedule.scheduled_at).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={cn(
                        "px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded border",
                        statusColors[schedule.status as keyof typeof statusColors] || statusColors.pending
                      )}>
                        {schedule.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button className="p-2 text-slate-500 hover:text-white transition-colors disabled:opacity-50" disabled={schedule.status !== 'pending'}>
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-red-400 transition-colors disabled:opacity-50" disabled={schedule.status !== 'pending'}>
                        <XCircle size={16} />
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
