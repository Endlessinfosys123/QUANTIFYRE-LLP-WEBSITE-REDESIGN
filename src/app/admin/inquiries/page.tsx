"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/ui/AdminTable";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { 
  Mail, Search, Archive, Trash2, 
  CheckCircle2, Clock, User, Phone,
  MessageSquare, ArrowLeft, Send, Terminal
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function InquiriesManagerPage() {
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'archived'>('all');

  const supabase = createClient();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) toast.error("Failed to intercept inquiries");
    else setInquiries(data || []);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contact_inquiries')
      .update({ status })
      .eq('id', id);
    
    if (error) toast.error("Transmission error");
    else {
      toast.success(`Inquiry marked as ${status}`);
      fetchInquiries();
      if (selectedId === id) setSelectedId(null);
    }
  };

  const markAllAsRead = async () => {
    if (!confirm("Mark all new inquiries as read?")) return;
    const { error } = await supabase
      .from('contact_inquiries')
      .update({ status: 'read' })
      .eq('status', 'new');
    
    if (error) toast.error("Update failed");
    else {
      toast.success("Inbox cleared");
      fetchInquiries();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently wipe this transmission from the core?")) return;
    const { error } = await supabase.from('contact_inquiries').delete().eq('id', id);
    if (error) toast.error("Wipe failed");
    else {
      toast.success("Data purged");
      fetchInquiries();
      setSelectedId(null);
    }
  };

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Message", "Status"];
    const rows = inquiries.map(i => [
      new Date(i.created_at).toLocaleString(),
      i.full_name,
      i.email,
      i.phone || "",
      i.message.replace(/\n/g, " "),
      i.status
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CRM Data Exported");
  };

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = i.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'new') return matchesSearch && i.status === 'new';
    if (activeFilter === 'archived') return matchesSearch && i.status === 'archived';
    return matchesSearch && i.status !== 'archived';
  });

  const selectedInquiry = inquiries.find(i => i.id === selectedId);

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Decrypting Inquiries...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Inquiry <span className="text-[#6C3FEF]">CRM</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Global Communications Hub</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(['all', 'new', 'archived'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  activeFilter === f ? "bg-white text-[#6C3FEF] shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#6C3FEF] transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-4 focus:ring-[#6C3FEF10] focus:border-[#6C3FEF] outline-none transition-all placeholder:text-slate-400"
            />
          </div>
          <AdminButton variant="outline" onClick={exportCSV} className="h-11">Export</AdminButton>
        </div>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
            {inquiries.filter(i => i.status === 'new').length} New Inbound Signals
          </p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-[10px] font-black text-[#6C3FEF] uppercase tracking-widest hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List View */}
        <div className={cn("lg:col-span-1 space-y-4", selectedId ? "hidden lg:block" : "block")}>
          <div className="space-y-3">
            {filteredInquiries.map((inquiry) => (
              <button
                key={inquiry.id}
                onClick={() => setSelectedId(inquiry.id)}
                className={cn(
                  "w-full text-left p-5 rounded-2xl border transition-all relative group overflow-hidden shadow-sm",
                  selectedId === inquiry.id 
                    ? "bg-[#6C3FEF] border-[#6C3FEF] shadow-xl shadow-[#6C3FEF20] translate-x-1" 
                    : "bg-white border-slate-200 hover:border-[#6C3FEF50] hover:bg-slate-50/50"
                )}
              >
                {inquiry.status === 'new' && (
                  <div className="absolute top-5 right-5 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    selectedId === inquiry.id ? "bg-white/20 text-white" : "bg-slate-100 text-[#6C3FEF]"
                  )}>
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className={cn("font-black uppercase text-[10px] tracking-widest", selectedId === inquiry.id ? "text-white" : "text-slate-900")}>
                      {inquiry.full_name}
                    </h4>
                    <p className={cn("text-[10px] font-bold uppercase tracking-wider mt-0.5", selectedId === inquiry.id ? "text-white/60" : "text-slate-400")}>
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className={cn("text-[11px] font-bold line-clamp-2 leading-relaxed", selectedId === inquiry.id ? "text-white/80" : "text-slate-500")}>
                  {inquiry.message}
                </p>
              </button>
            ))}
            {filteredInquiries.length === 0 && (
              <div className="text-center py-20 bg-white border border-slate-200 border-dashed rounded-3xl">
                <Mail size={32} className="mx-auto text-slate-100 mb-4" />
                <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">No inquiries found</p>
              </div>
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className={cn("lg:col-span-2", !selectedId ? "hidden lg:block" : "block")}>
          <AnimatePresence mode="wait">
            {selectedId ? (
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <AdminCard className="shadow-2xl shadow-slate-200/60">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setSelectedId(null)}
                        className="lg:hidden p-2 text-slate-400 hover:text-[#6C3FEF]"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <div>
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">{selectedInquiry?.full_name}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                            <Mail size={12} /> {selectedInquiry?.email}
                          </span>
                          {selectedInquiry?.phone && (
                            <span className="flex items-center gap-1 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                              <Phone size={12} /> {selectedInquiry?.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleStatusChange(selectedId, 'archived')}
                        className="p-2.5 bg-slate-50 border border-slate-200 text-slate-400 hover:text-[#6C3FEF] rounded-xl transition-all shadow-sm"
                        title="Archive"
                      >
                        <Archive size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(selectedId)}
                        className="p-2.5 bg-slate-50 border border-slate-200 text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-sm"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6C3FEF] mb-4">Transmission Brief</h4>
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative">
                        <MessageSquare className="absolute top-6 right-6 text-slate-200/50" size={40} />
                        <p className="text-sm font-medium text-slate-700 leading-relaxed relative z-10">
                          {selectedInquiry?.message}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6C3FEF] mb-4">Services Interested</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedInquiry?.services?.map((service: string) => (
                            <AdminBadge key={service} variant="primary">{service}</AdminBadge>
                          ))}
                          {(!selectedInquiry?.services || selectedInquiry.services.length === 0) && (
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">General Inquiry</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6C3FEF] mb-4">Logistics</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <Clock size={12} /> Received: {new Date(selectedInquiry?.created_at).toLocaleString()}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <CheckCircle2 size={12} /> Status: {selectedInquiry?.status}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-10 border-t border-slate-100">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6C3FEF] mb-6 text-center">Protocol Actions</h4>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <AdminButton 
                          className="w-full sm:w-auto"
                          icon={<Send size={16} />}
                          onClick={() => window.open(`mailto:${selectedInquiry?.email}`)}
                        >
                          Send Intelligence Response
                        </AdminButton>
                        <AdminButton 
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() => handleStatusChange(selectedId, 'replied')}
                        >
                          Mark as Resolved
                        </AdminButton>
                      </div>
                    </div>
                  </div>
                </AdminCard>
              </motion.div>
            ) : (
              <div className="h-[600px] bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center p-10 shadow-xl shadow-slate-200/40">
                <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-inner">
                  <Terminal size={40} />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-2">No Brief Selected</h3>
                <p className="text-xs text-slate-400 font-medium max-w-xs">Select a mission transmission from the left to view full intelligence data.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
