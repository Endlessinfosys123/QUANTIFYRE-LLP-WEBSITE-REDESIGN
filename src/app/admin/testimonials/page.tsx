"use client";

import React, { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminStarRating } from "@/components/admin/ui/AdminStarRating";
import { AdminToggle } from "@/components/admin/ui/AdminToggle";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminConfirmDialog } from "@/components/admin/ui/AdminConfirmDialog";
import { AdminToast } from "@/components/admin/ui/AdminToast";
import { DragSortList } from "@/components/admin/modules/DragSortList";
import { ImageUpload } from "@/components/admin/modules/ImageUpload";
import { 
  Plus, Edit2, Trash2, Save, MessageSquare, 
  Loader2, Quote 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as any });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("position", { ascending: true });
      if (data) setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (testimonial: any = null) => {
    setActiveTestimonial(testimonial || {
      name: "",
      designation: "",
      company: "",
      content: "",
      rating: 5,
      avatar_url: "",
      is_visible: true,
      position: testimonials.length,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!activeTestimonial.name || !activeTestimonial.content) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "testimonials",
          data: activeTestimonial,
          revalidate_path: "/",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "Testimonial saved!", type: "success" });
        setIsModalOpen(false);
        fetchTestimonials();
      }
    } catch (err) {
      setToast({ show: true, message: "Save failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activeTestimonial?.id) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "testimonials",
          id: activeTestimonial.id,
          revalidate_path: "/",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "Testimonial removed.", type: "success" });
        setIsConfirmOpen(false);
        fetchTestimonials();
      }
    } catch (err) {
      setToast({ show: true, message: "Delete failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorder = async (newItems: any[]) => {
    const updated = newItems.map((item, index) => ({ ...item, position: index }));
    setTestimonials(updated);
    try {
      await Promise.all(updated.map(item => 
        fetch("/api/admin/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "testimonials",
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
            Testimonials Manager
          </h1>
          <p className="text-[#6B7280] font-medium">Manage client feedback and success stories.</p>
        </div>
        <AdminButton icon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          Add Testimonial
        </AdminButton>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#6C3FEF]" size={40} />
          <p className="mt-4 font-bold text-[#6B7280]">Loading feedback...</p>
        </div>
      ) : (
        <DragSortList
          items={testimonials}
          onReorder={handleReorder}
          keyExtractor={(item) => item.id}
          renderItem={(t) => (
            <div className="flex items-center justify-between p-4 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 border border-[#E5E7EB] overflow-hidden flex items-center justify-center">
                  {t.avatar_url ? (
                    <img src={t.avatar_url} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={20} className="text-[#9CA3AF]" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-[#111827]">{t.name}</h3>
                  <p className="text-xs text-[#6B7280]">{t.designation} at {t.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AdminButton variant="ghost" size="sm" icon={<Edit2 size={16} />} onClick={() => handleOpenModal(t)} />
                <AdminButton variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" icon={<Trash2 size={16} />} onClick={() => { setActiveTestimonial(t); setIsConfirmOpen(true); }} />
              </div>
            </div>
          )}
        />
      )}

      {/* Edit Modal */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={activeTestimonial?.id ? "Edit Testimonial" : "New Testimonial"}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <AdminInput 
              label="Client Name" 
              value={activeTestimonial?.name}
              onChange={(e) => setActiveTestimonial({ ...activeTestimonial, name: e.target.value })}
            />
            <AdminInput 
              label="Designation" 
              value={activeTestimonial?.designation}
              onChange={(e) => setActiveTestimonial({ ...activeTestimonial, designation: e.target.value })}
            />
          </div>
          
          <AdminInput 
            label="Company Name" 
            value={activeTestimonial?.company}
            onChange={(e) => setActiveTestimonial({ ...activeTestimonial, company: e.target.value })}
          />

          <AdminTextarea 
            label="Testimonial Content" 
            value={activeTestimonial?.content}
            onChange={(e) => setActiveTestimonial({ ...activeTestimonial, content: e.target.value })}
          />

          <AdminStarRating 
            label="Rating"
            rating={activeTestimonial?.rating || 5}
            onChange={(val) => setActiveTestimonial({ ...activeTestimonial, rating: val })}
          />

          <ImageUpload 
            label="Client Avatar" 
            value={activeTestimonial?.avatar_url}
            onChange={(url) => setActiveTestimonial({ ...activeTestimonial, avatar_url: url })}
          />

          <AdminToggle 
            label="Visible on Site" 
            checked={activeTestimonial?.is_visible}
            onChange={(val) => setActiveTestimonial({ ...activeTestimonial, is_visible: val })}
          />

          <div className="flex justify-end gap-3 pt-6 border-t border-[#E5E7EB]">
            <AdminButton variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</AdminButton>
            <AdminButton icon={<Save size={18} />} onClick={handleSave} isLoading={isSaving}>Save Testimonial</AdminButton>
          </div>
        </div>
      </AdminModal>

      <AdminConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Remove Testimonial"
        description={`Are you sure you want to remove the feedback from "${activeTestimonial?.name}"?`}
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

const UserIcon = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
