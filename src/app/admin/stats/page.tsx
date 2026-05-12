"use client";

import React, { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminToggle } from "@/components/admin/ui/AdminToggle";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminConfirmDialog } from "@/components/admin/ui/AdminConfirmDialog";
import { AdminToast } from "@/components/admin/ui/AdminToast";
import { DragSortList } from "@/components/admin/modules/DragSortList";
import { 
  Plus, Edit2, Trash2, Save, TrendingUp, 
  Loader2 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function StatsManager() {
  const [stats, setStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeStat, setActiveStat] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as any });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("stats")
        .select("*")
        .order("position", { ascending: true });
      if (data) setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (stat: any = null) => {
    setActiveStat(stat || {
      label: "",
      value: "",
      suffix: "",
      is_visible: true,
      position: stats.length,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!activeStat.label || !activeStat.value) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "stats",
          data: activeStat,
          revalidate_path: "/",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "Stat updated!", type: "success" });
        setIsModalOpen(false);
        fetchStats();
      }
    } catch (err) {
      setToast({ show: true, message: "Save failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activeStat?.id) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "stats",
          id: activeStat.id,
          revalidate_path: "/",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "Stat deleted.", type: "success" });
        setIsConfirmOpen(false);
        fetchStats();
      }
    } catch (err) {
      setToast({ show: true, message: "Delete failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorder = async (newItems: any[]) => {
    const updated = newItems.map((item, index) => ({ ...item, position: index }));
    setStats(updated);
    try {
      await Promise.all(updated.map(item => 
        fetch("/api/admin/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "stats",
            data: { id: item.id, position: item.position },
          }),
        })
      ));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tighter">
            Stats Counters
          </h1>
          <p className="text-[#6B7280] font-medium">Manage the numeric highlights shown on your site.</p>
        </div>
        <AdminButton icon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          Add New Stat
        </AdminButton>
      </div>

      <div className="max-w-2xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#6C3FEF]" size={40} />
            <p className="mt-4 font-bold text-[#6B7280]">Loading stats...</p>
          </div>
        ) : (
          <DragSortList
            items={stats}
            onReorder={handleReorder}
            keyExtractor={(item) => item.id}
            renderItem={(stat) => (
              <div className="flex items-center justify-between p-4 flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] flex items-center justify-center text-[#6C3FEF]">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111827]">{stat.value}{stat.suffix}</h3>
                    <p className="text-xs text-[#6B7280]">{stat.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AdminButton variant="ghost" size="sm" icon={<Edit2 size={16} />} onClick={() => handleOpenModal(stat)} />
                  <AdminButton variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" icon={<Trash2 size={16} />} onClick={() => { setActiveStat(stat); setIsConfirmOpen(true); }} />
                </div>
              </div>
            )}
          />
        )}
      </div>

      {/* Edit Modal */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={activeStat?.id ? "Edit Stat" : "New Stat"}
        size="sm"
      >
        <div className="space-y-6">
          <AdminInput 
            label="Stat Label (e.g. Clients)" 
            value={activeStat?.label}
            onChange={(e) => setActiveStat({ ...activeStat, label: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <AdminInput 
              label="Numeric Value" 
              value={activeStat?.value}
              onChange={(e) => setActiveStat({ ...activeStat, value: e.target.value })}
              placeholder="e.g. 500"
            />
            <AdminInput 
              label="Suffix (e.g. +)" 
              value={activeStat?.suffix}
              onChange={(e) => setActiveStat({ ...activeStat, suffix: e.target.value })}
              placeholder="+"
            />
          </div>
          <AdminToggle 
            label="Visible on Site" 
            checked={activeStat?.is_visible}
            onChange={(val) => setActiveStat({ ...activeStat, is_visible: val })}
          />
          <div className="flex justify-end gap-3 pt-6 border-t border-[#E5E7EB]">
            <AdminButton variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</AdminButton>
            <AdminButton icon={<Save size={18} />} onClick={handleSave} isLoading={isSaving}>Save Stat</AdminButton>
          </div>
        </div>
      </AdminModal>

      <AdminConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Stat"
        description={`Are you sure you want to delete the "${activeStat?.label}" counter?`}
        isLoading={isSaving}
      />

      <AdminToast 
        isVisible={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </div>
  );
}
