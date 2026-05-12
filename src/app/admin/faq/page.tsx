"use client";

import React, { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminSelect } from "@/components/admin/ui/AdminSelect";
import { AdminToggle } from "@/components/admin/ui/AdminToggle";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminConfirmDialog } from "@/components/admin/ui/AdminConfirmDialog";
import { AdminToast } from "@/components/admin/ui/AdminToast";
import { DragSortList } from "@/components/admin/modules/DragSortList";
import { 
  Plus, Edit2, Trash2, Save, HelpCircle, 
  Loader2, Filter 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function FAQManager() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [filterPage, setFilterPage] = useState("all");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as any });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("position", { ascending: true });
      if (data) setFaqs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (faq: any = null) => {
    setActiveFaq(faq || {
      question: "",
      answer: "",
      page: "homepage",
      is_visible: true,
      position: faqs.length,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!activeFaq.question || !activeFaq.answer) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "faqs",
          data: activeFaq,
          revalidate_path: "/",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "FAQ saved!", type: "success" });
        setIsModalOpen(false);
        fetchFaqs();
      }
    } catch (err) {
      setToast({ show: true, message: "Save failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activeFaq?.id) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "faqs",
          id: activeFaq.id,
          revalidate_path: "/",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "FAQ deleted.", type: "success" });
        setIsConfirmOpen(false);
        fetchFaqs();
      }
    } catch (err) {
      setToast({ show: true, message: "Delete failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorder = async (newItems: any[]) => {
    // Only reorder within the filtered context if applicable
    const updated = newItems.map((item, index) => ({ ...item, position: index }));
    setFaqs(updated);
    try {
      await Promise.all(updated.map(item => 
        fetch("/api/admin/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "faqs",
            data: { id: item.id, position: item.position },
          }),
        })
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredFaqs = filterPage === "all" ? faqs : faqs.filter(f => f.page === filterPage);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tighter">
            FAQ Manager
          </h1>
          <p className="text-[#6B7280] font-medium">Create and organize frequently asked questions.</p>
        </div>
        <AdminButton icon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          New FAQ
        </AdminButton>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E5E7EB]">
        <div className="flex items-center gap-2 text-sm font-bold text-[#6B7280]">
          <Filter size={16} /> Filter by Page:
        </div>
        <div className="flex gap-2">
          {["all", "homepage", "services", "about", "contact"].map(page => (
            <button
              key={page}
              onClick={() => setFilterPage(page)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterPage === page 
                ? "bg-[#6C3FEF] text-white shadow-md" 
                : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#6C3FEF]" size={40} />
          <p className="mt-4 font-bold text-[#6B7280]">Loading FAQs...</p>
        </div>
      ) : (
        <DragSortList
          items={filteredFaqs}
          onReorder={handleReorder}
          keyExtractor={(item) => item.id}
          renderItem={(faq) => (
            <div className="flex items-center justify-between p-4 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] flex items-center justify-center text-[#6C3FEF]">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#111827]">{faq.question}</h3>
                  <p className="text-xs text-[#6B7280]">Page: {faq.page} · {faq.is_visible ? "Visible" : "Hidden"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AdminButton variant="ghost" size="sm" icon={<Edit2 size={16} />} onClick={() => handleOpenModal(faq)} />
                <AdminButton variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" icon={<Trash2 size={16} />} onClick={() => { setActiveFaq(faq); setIsConfirmOpen(true); }} />
              </div>
            </div>
          )}
        />
      )}

      {/* Edit Modal */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={activeFaq?.id ? "Edit FAQ" : "New FAQ"}
        size="md"
      >
        <div className="space-y-6">
          <AdminInput 
            label="Question" 
            value={activeFaq?.question}
            onChange={(e) => setActiveFaq({ ...activeFaq, question: e.target.value })}
          />
          <AdminTextarea 
            label="Answer" 
            value={activeFaq?.answer}
            onChange={(e) => setActiveFaq({ ...activeFaq, answer: e.target.value })}
          />
          <AdminSelect 
            label="Display on Page"
            value={activeFaq?.page}
            onChange={(e) => setActiveFaq({ ...activeFaq, page: e.target.value })}
            options={[
              { label: "Homepage", value: "homepage" },
              { label: "Services Page", value: "services" },
              { label: "About Page", value: "about" },
              { label: "Contact Page", value: "contact" },
            ]}
          />
          <AdminToggle 
            label="Show on Website" 
            checked={activeFaq?.is_visible}
            onChange={(val) => setActiveFaq({ ...activeFaq, is_visible: val })}
          />
          <div className="flex justify-end gap-3 pt-6 border-t border-[#E5E7EB]">
            <AdminButton variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</AdminButton>
            <AdminButton icon={<Save size={18} />} onClick={handleSave} isLoading={isSaving}>Save FAQ</AdminButton>
          </div>
        </div>
      </AdminModal>

      <AdminConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ item?"
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
