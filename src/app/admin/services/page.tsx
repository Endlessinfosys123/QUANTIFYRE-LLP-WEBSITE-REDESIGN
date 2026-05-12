"use client";

import React, { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminToggle } from "@/components/admin/ui/AdminToggle";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminConfirmDialog } from "@/components/admin/ui/AdminConfirmDialog";
import { AdminToast } from "@/components/admin/ui/AdminToast";
import { DragSortList } from "@/components/admin/modules/DragSortList";
import { RichTextEditor } from "@/components/admin/modules/RichTextEditor";
import { ImageUpload } from "@/components/admin/modules/ImageUpload";
import { 
  Plus, Edit2, Trash2, Save, Layers, 
  ExternalLink, Search, Loader2 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ServicesManager() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeService, setActiveService] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as any });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("position", { ascending: true });
      if (data) setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (service: any = null) => {
    setActiveService(service || {
      title: "",
      slug: "",
      description: "",
      detailed_content: "",
      icon_url: "",
      image_url: "",
      is_visible: true,
      position: services.length,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!activeService.title || !activeService.slug) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "services",
          data: activeService,
          revalidate_path: "/services",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ show: true, message: "Service saved successfully!", type: "success" });
        setIsModalOpen(false);
        fetchServices();
      }
    } catch (err) {
      setToast({ show: true, message: "Failed to save service.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activeService?.id) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "services",
          id: activeService.id,
          revalidate_path: "/services",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "Service deleted successfully!", type: "success" });
        setIsConfirmOpen(false);
        fetchServices();
      }
    } catch (err) {
      setToast({ show: true, message: "Delete failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorder = async (newItems: any[]) => {
    const updated = newItems.map((item, index) => ({ ...item, position: index }));
    setServices(updated);
    
    // Batch update positions in background
    try {
      await Promise.all(updated.map(item => 
        fetch("/api/admin/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "services",
            data: { id: item.id, position: item.position },
          }),
        })
      ));
    } catch (err) {
      console.error("Reorder failed:", err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tighter">
            Services Manager
          </h1>
          <p className="text-[#6B7280] font-medium">Manage and reorder your service offerings.</p>
        </div>
        <AdminButton icon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          Add New Service
        </AdminButton>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#6C3FEF]" size={40} />
          <p className="mt-4 font-bold text-[#6B7280]">Loading services...</p>
        </div>
      ) : (
        <DragSortList
          items={services}
          onReorder={handleReorder}
          keyExtractor={(item) => item.id}
          renderItem={(service) => (
            <div className="flex items-center justify-between p-4 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F3F0FF] flex items-center justify-center text-[#6C3FEF] overflow-hidden">
                  {service.icon_url ? <img src={service.icon_url} className="w-full h-full object-cover" /> : <Layers size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-[#111827]">{service.title}</h3>
                  <p className="text-xs text-[#6B7280]">/{service.slug} · {service.is_visible ? "Visible" : "Hidden"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AdminButton variant="ghost" size="sm" icon={<Edit2 size={16} />} onClick={() => handleOpenModal(service)}>
                  Edit
                </AdminButton>
                <AdminButton variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" icon={<Trash2 size={16} />} onClick={() => { setActiveService(service); setIsConfirmOpen(true); }}>
                  Delete
                </AdminButton>
              </div>
            </div>
          )}
        />
      )}

      {/* Edit/Create Modal */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={activeService?.id ? "Edit Service" : "New Service"}
        size="xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <AdminInput 
              label="Service Title" 
              value={activeService?.title}
              onChange={(e) => setActiveService({ ...activeService, title: e.target.value })}
            />
            <AdminInput 
              label="Slug (URL Path)" 
              value={activeService?.slug}
              onChange={(e) => setActiveService({ ...activeService, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
            />
            <AdminTextarea 
              label="Brief Description" 
              value={activeService?.description}
              onChange={(e) => setActiveService({ ...activeService, description: e.target.value })}
            />
            <AdminToggle 
              label="Show on Website" 
              checked={activeService?.is_visible}
              onChange={(val) => setActiveService({ ...activeService, is_visible: val })}
            />
          </div>
          <div className="space-y-6">
            <ImageUpload 
              label="Service Icon/Logo" 
              value={activeService?.icon_url}
              onChange={(url) => setActiveService({ ...activeService, icon_url: url })}
            />
            <ImageUpload 
              label="Featured Image" 
              value={activeService?.image_url}
              onChange={(url) => setActiveService({ ...activeService, image_url: url })}
            />
          </div>
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-[#374151] mb-2 block">Detailed Service Page Content</label>
            <RichTextEditor 
              content={activeService?.detailed_content || ""}
              onChange={(html) => setActiveService({ ...activeService, detailed_content: html })}
            />
          </div>
          <div className="lg:col-span-2 flex justify-end gap-3 pt-6 border-t border-[#E5E7EB]">
            <AdminButton variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</AdminButton>
            <AdminButton icon={<Save size={18} />} onClick={handleSave} isLoading={isSaving}>Save Service</AdminButton>
          </div>
        </div>
      </AdminModal>

      <AdminConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Service"
        description={`Are you sure you want to delete "${activeService?.title}"? This action cannot be undone.`}
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
