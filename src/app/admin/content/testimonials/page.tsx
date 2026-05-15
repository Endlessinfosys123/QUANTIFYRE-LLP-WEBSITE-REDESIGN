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
  MessageSquare, GripVertical, Star
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

export default function TestimonialManagerPage() {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
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
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) toast.error("Failed to load testimonials");
    else setTestimonials(data || []);
    setLoading(false);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = testimonials.findIndex((i) => i.id === active.id);
      const newIndex = testimonials.findIndex((i) => i.id === over.id);
      
      const newOrder = arrayMove(testimonials, oldIndex, newIndex);
      setTestimonials(newOrder);

      const updates = newOrder.map((t, index) => ({
        id: t.id,
        order_index: index
      }));

      const { error } = await supabase.from('testimonials').upsert(updates);
      if (error) toast.error("Failed to save order");
      else {
        toast.success("Testimonial order updated");
        await fetch('/api/revalidate?tag=testimonials', { method: 'POST' });
      }
    }
  };

  const handleEdit = (t: any) => {
    setEditingId(t.id);
    setEditForm(t);
  };

  const handleCreate = () => {
    const newT = {
      quote: "",
      author_name: "",
      author_role: "",
      author_company: "",
      avatar_url: "",
      avatar_initial: "",
      rating: 5,
      order_index: testimonials.length,
      is_active: true
    };
    setEditingId("new");
    setEditForm(newT);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('testimonials').upsert(editForm);

    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success("Testimonial updated");
      setEditingId(null);
      fetchTestimonials();
      await fetch('/api/revalidate?tag=testimonials', { method: 'POST' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this testimonial?")) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Testimonial removed");
      fetchTestimonials();
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Syncing Testimonial Registry...</div>;

  if (editingId) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setEditingId(null)}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#6C3FEF] transition-colors"
          >
            ← Back to Registry
          </button>
          <AdminButton onClick={handleSave} isLoading={saving} icon={<Save size={18} />}>
            Save Testimonial
          </AdminButton>
        </div>

        <AdminCard title={editingId === "new" ? "New Testimonial" : "Edit Testimonial"}>
          <div className="space-y-6">
            <AdminTextarea 
              label="Quote" 
              value={editForm.quote} 
              onChange={e => setEditForm({ ...editForm, quote: e.target.value })} 
              rows={4}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminInput 
                label="Author Name" 
                value={editForm.author_name} 
                onChange={e => setEditForm({ ...editForm, author_name: e.target.value })} 
              />
              <AdminInput 
                label="Author Role" 
                value={editForm.author_role} 
                onChange={e => setEditForm({ ...editForm, author_role: e.target.value })} 
              />
              <AdminInput 
                label="Author Company" 
                value={editForm.author_company} 
                onChange={e => setEditForm({ ...editForm, author_company: e.target.value })} 
              />
              <AdminInput 
                label="Rating (1-5)" 
                type="number"
                min="1" max="5"
                value={editForm.rating} 
                onChange={e => setEditForm({ ...editForm, rating: parseInt(e.target.value) })} 
              />
              <AdminInput 
                label="Avatar URL" 
                value={editForm.avatar_url} 
                onChange={e => setEditForm({ ...editForm, avatar_url: e.target.value })} 
              />
              <AdminInput 
                label="Avatar Initial" 
                value={editForm.avatar_initial} 
                onChange={e => setEditForm({ ...editForm, avatar_initial: e.target.value })} 
              />
            </div>
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Testimonial <span className="text-[#6C3FEF]">Manager</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Client Feedback Protocol</p>
        </div>
        <AdminButton onClick={handleCreate} icon={<Plus size={18} />}>
          Add Testimonial
        </AdminButton>
      </div>

      <AdminCard>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={testimonials.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <AdminTable headers={["", "Author", "Quote", "Rating", "Actions"]}>
              {testimonials.map((t) => (
                <SortableTestimonialRow key={t.id} t={t} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              {testimonials.length === 0 && (
                <AdminTableRow>
                  <AdminTableCell className="text-center py-20" colSpan={5}>
                    <p className="text-slate-300 font-black uppercase text-xs tracking-widest italic">No feedback registered</p>
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

function SortableTestimonialRow({ t, onEdit, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: t.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    position: 'relative' as any,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? '#F8FAFC' : 'transparent'
  };

  return (
    <AdminTableRow ref={setNodeRef} style={style}>
      <AdminTableCell>
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#6C3FEF] transition-colors p-1">
          <GripVertical size={18} />
        </button>
      </AdminTableCell>
      <AdminTableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-xs font-black uppercase text-slate-600 shadow-inner">
            {t.avatar_url ? (
              <img src={t.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              t.avatar_initial || t.author_name[0]
            )}
          </div>
          <div>
            <p className="font-black text-slate-900 uppercase text-[12px] tracking-wider">{t.author_name}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.author_role} @ {t.author_company}</p>
          </div>
        </div>
      </AdminTableCell>
      <AdminTableCell>
        <p className="text-[10px] text-slate-500 font-bold line-clamp-1 italic">"{t.quote}"</p>
      </AdminTableCell>
      <AdminTableCell>
        <div className="flex gap-1 text-amber-500">
          {[...Array(t.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
        </div>
      </AdminTableCell>
      <AdminTableCell>
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onEdit(t)}
            className="p-2 text-slate-400 hover:text-[#6C3FEF] hover:bg-[#6C3FEF]/5 rounded-lg transition-all"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(t.id)}
            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </AdminTableCell>
    </AdminTableRow>
  );
}
