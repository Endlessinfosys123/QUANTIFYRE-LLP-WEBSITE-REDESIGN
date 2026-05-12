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
  Plus, Edit2, Trash2, Save, Compass, 
  ExternalLink, Loader2 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function NavigationManager() {
  const [links, setLinks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as any });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("nav_links")
        .select("*")
        .order("position", { ascending: true });
      if (data) setLinks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (link: any = null) => {
    setActiveLink(link || {
      label: "",
      href: "",
      is_visible: true,
      position: links.length,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!activeLink.label || !activeLink.href) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "nav_links",
          data: activeLink,
          revalidate_path: "/",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "Menu link saved!", type: "success" });
        setIsModalOpen(false);
        fetchLinks();
      }
    } catch (err) {
      setToast({ show: true, message: "Save failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activeLink?.id) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "nav_links",
          id: activeLink.id,
          revalidate_path: "/",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "Link deleted.", type: "success" });
        setIsConfirmOpen(false);
        fetchLinks();
      }
    } catch (err) {
      setToast({ show: true, message: "Delete failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorder = async (newItems: any[]) => {
    const updated = newItems.map((item, index) => ({ ...item, position: index }));
    setLinks(updated);
    try {
      await Promise.all(updated.map(item => 
        fetch("/api/admin/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "nav_links",
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
            Navigation Manager
          </h1>
          <p className="text-[#6B7280] font-medium">Reorder and edit your website&apos;s main menu.</p>
        </div>
        <AdminButton icon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          Add Menu Link
        </AdminButton>
      </div>

      <div className="max-w-2xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#6C3FEF]" size={40} />
            <p className="mt-4 font-bold text-[#6B7280]">Loading menu...</p>
          </div>
        ) : (
          <DragSortList
            items={links}
            onReorder={handleReorder}
            keyExtractor={(item) => item.id}
            renderItem={(link) => (
              <div className="flex items-center justify-between p-4 flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] flex items-center justify-center text-[#6C3FEF]">
                    <Compass size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111827]">{link.label}</h3>
                    <p className="text-xs text-[#6B7280]">{link.href} · {link.is_visible ? "Visible" : "Hidden"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AdminButton variant="ghost" size="sm" icon={<Edit2 size={16} />} onClick={() => handleOpenModal(link)} />
                  <AdminButton variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" icon={<Trash2 size={16} />} onClick={() => { setActiveLink(link); setIsConfirmOpen(true); }} />
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
        title={activeLink?.id ? "Edit Menu Link" : "New Menu Link"}
        size="sm"
      >
        <div className="space-y-6">
          <AdminInput 
            label="Link Label" 
            value={activeLink?.label}
            onChange={(e) => setActiveLink({ ...activeLink, label: e.target.value })}
            placeholder="e.g. Services"
          />
          <AdminInput 
            label="Target URL (href)" 
            value={activeLink?.href}
            onChange={(e) => setActiveLink({ ...activeLink, href: e.target.value })}
            placeholder="e.g. /services"
          />
          <AdminToggle 
            label="Display in Menu" 
            checked={activeLink?.is_visible}
            onChange={(val) => setActiveLink({ ...activeLink, is_visible: val })}
          />
          <div className="flex justify-end gap-3 pt-6 border-t border-[#E5E7EB]">
            <AdminButton variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</AdminButton>
            <AdminButton icon={<Save size={18} />} onClick={handleSave} isLoading={isSaving}>Save Link</AdminButton>
          </div>
        </div>
      </AdminModal>

      <AdminConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Menu Link"
        description={`Are you sure you want to delete the "${activeLink?.label}" link?`}
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
