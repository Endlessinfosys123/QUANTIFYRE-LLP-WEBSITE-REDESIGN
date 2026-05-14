"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/ui/AdminTable";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { 
  Plus, Edit, Trash2, Save, 
  HelpCircle, GripVertical
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function FAQManagerPage() {
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) toast.error("Failed to load FAQs");
    else setFaqs(data || []);
    setLoading(false);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = faqs.findIndex((i) => i.id === active.id);
      const newIndex = faqs.findIndex((i) => i.id === over.id);
      
      const newOrder = arrayMove(faqs, oldIndex, newIndex);
      setFaqs(newOrder);

      const updates = newOrder.map((faq, index) => ({
        id: faq.id,
        order_index: index
      }));

      const { error } = await supabase.from('faqs').upsert(updates);
      if (error) toast.error("Failed to save order");
      else {
        toast.success("FAQ order updated");
        await fetch('/api/revalidate?tag=faqs', { method: 'POST' });
      }
    }
  };

  const handleEdit = (faq: any) => {
    setEditingId(faq.id);
    setEditForm(faq);
  };

  const handleCreate = () => {
    const newFaq = {
      question: "",
      answer: "",
      order_index: faqs.length,
      is_active: true
    };
    setEditingId("new");
    setEditForm(newFaq);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('faqs').upsert(editForm);

    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success("FAQ updated");
      setEditingId(null);
      fetchFaqs();
      await fetch('/api/revalidate?tag=faqs', { method: 'POST' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("FAQ removed");
      fetchFaqs();
    }
  };

  if (loading) return <div className="p-8 text-[#A0A0B0] font-black uppercase tracking-widest animate-pulse">Syncing FAQ Registry...</div>;

  if (editingId) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setEditingId(null)}
            className="text-[10px] font-black uppercase tracking-widest text-[#A0A0B0] hover:text-white transition-colors"
          >
            ← Back to Registry
          </button>
          <AdminButton onClick={handleSave} isLoading={saving} icon={<Save size={18} />}>
            Save FAQ
          </AdminButton>
        </div>

        <AdminCard title={editingId === "new" ? "New FAQ" : "Edit FAQ"}>
          <div className="space-y-6">
            <AdminInput 
              label="Question" 
              value={editForm.question} 
              onChange={e => setEditForm({ ...editForm, question: e.target.value })} 
            />
            <AdminTextarea 
              label="Answer" 
              value={editForm.answer} 
              onChange={e => setEditForm({ ...editForm, answer: e.target.value })} 
              rows={6}
            />
            <div className="flex items-center gap-4">
               <button 
                onClick={() => setEditForm({ ...editForm, is_active: !editForm.is_active })}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                  editForm.is_active 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" 
                    : "bg-red-500/10 border-red-500/30 text-red-500"
                )}
              >
                {editForm.is_active ? "Active" : "Hidden"}
              </button>
            </div>
          </div>
        </AdminCard>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            FAQ <span className="text-[#6C3FEF]">Manager</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Question & Answer Protocol</p>
        </div>
        <AdminButton onClick={handleCreate} icon={<Plus size={18} />}>
          Add FAQ
        </AdminButton>
      </div>

      <AdminCard>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={faqs.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <AdminTable headers={["", "Question", "Status", "Actions"]}>
              {faqs.map((faq) => (
                <SortableFAQRow key={faq.id} faq={faq} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              {faqs.length === 0 && (
                <AdminTableRow>
                  <AdminTableCell className="text-center py-20" colSpan={4}>
                    <p className="text-[#3F3F46] font-black uppercase text-xs tracking-widest">No FAQs registered</p>
                  </AdminTableCell>
                </AdminTableRow>
              )}
            </AdminTable>
          </SortableContext>
        </DndContext>
      </AdminCard>
    </div>
  );
}

function SortableFAQRow({ faq, onEdit, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: faq.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    position: 'relative' as any,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? '#13131F' : 'transparent'
  };

  return (
    <AdminTableRow ref={setNodeRef} style={style}>
      <AdminTableCell>
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-[#3F3F46] hover:text-[#6C3FEF] transition-colors p-1">
          <GripVertical size={18} />
        </button>
      </AdminTableCell>
      <AdminTableCell>
        <p className="font-black text-white uppercase text-[12px] tracking-wider line-clamp-1">{faq.question}</p>
        <p className="text-[10px] text-[#A0A0B0] font-bold line-clamp-1">{faq.answer}</p>
      </AdminTableCell>
      <AdminTableCell>
        <AdminBadge variant={faq.is_active ? "success" : "secondary"}>
          {faq.is_active ? "Active" : "Hidden"}
        </AdminBadge>
      </AdminTableCell>
      <AdminTableCell>
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onEdit(faq)}
            className="p-2 text-[#A0A0B0] hover:text-[#6C3FEF] hover:bg-[#6C3FEF10] rounded-lg transition-all"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(faq.id)}
            className="p-2 text-[#3F3F46] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </AdminTableCell>
    </AdminTableRow>
  );
}
