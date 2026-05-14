"use client";

import React, { useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { 
  Database, RefreshCw, AlertTriangle, 
  Terminal, CheckCircle2, XCircle
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function SeedManagerPage() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  const handleRunSeed = async () => {
    if (!confirm("This will overwrite existing configurations with seed data. Proceed?")) return;
    
    setRunning(true);
    setStatus('running');
    setLogs(["🚀 Initializing v2.0 Seeding Protocol...", "📡 Connecting to Supabase Core..."]);

    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        setLogs(prev => [...prev, ...data.logs, "✨ Seeding completed successfully!"]);
        setStatus('success');
        toast.success("Database synchronized with seed data");
      } else {
        setLogs(prev => [...prev, `❌ Error: ${data.error}`]);
        setStatus('error');
        toast.error("Seeding protocol failed");
      }
    } catch (err: any) {
      setLogs(prev => [...prev, `💥 Fatal Error: ${err.message}`]);
      setStatus('error');
      toast.error("Network or system failure");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Seed <span className="text-[#6C3FEF]">Manager</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Database Population Protocol</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <AdminCard title="Protocol Control" subtitle="Warning: Destructive action">
            <div className="space-y-6">
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <p className="text-[10px] font-bold text-amber-200 uppercase leading-relaxed tracking-wider">
                  Running the seed protocol will reset or overwrite configuration keys, heroes, and services to their default states.
                </p>
              </div>
              
              <AdminButton 
                onClick={handleRunSeed} 
                isLoading={running}
                variant={status === 'error' ? 'danger' : 'primary'}
                className="w-full h-14"
                icon={<RefreshCw size={18} />}
              >
                {running ? "Executing..." : "Execute Seed"}
              </AdminButton>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest justify-center">
                  <CheckCircle2 size={16} /> Sync Complete
                </div>
              )}
            </div>
          </AdminCard>
        </div>

        <div className="md:col-span-2">
          <div className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-3xl overflow-hidden flex flex-col h-[500px]">
            <div className="px-6 py-4 border-b border-[#1E1E2E] flex items-center justify-between bg-[#13131F]">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-[#6C3FEF]" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">System Output</h3>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1E1E2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#1E1E2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#1E1E2E]" />
              </div>
            </div>
            <div className="flex-1 p-6 font-mono text-xs overflow-y-auto space-y-2 scrollbar-hide">
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "py-1",
                    log.startsWith('❌') || log.startsWith('💥') ? "text-red-400" : 
                    log.startsWith('✅') || log.startsWith('✨') ? "text-emerald-400" : 
                    "text-[#A0A0B0]"
                  )}
                >
                  {log}
                </motion.div>
              ))}
              {logs.length === 0 && (
                <div className="h-full flex items-center justify-center text-[#3F3F46] font-black uppercase tracking-widest opacity-30">
                  Awaiting instruction...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
