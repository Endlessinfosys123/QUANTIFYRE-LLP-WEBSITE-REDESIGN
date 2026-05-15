"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/ui/AdminTable";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { 
  Plus, Edit, Trash2, Save, 
  Cpu, GripVertical, Check, X
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

export default function TechStackManagerPage() {
  const [loading, setLoading] = useState(true);
  const [stack, setStack] = useState<any[]>([]);
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
    fetchStack();
  }, []);

  const fetchStack = async () => {
    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) toast.error("Failed to load tech stack");
    else setStack(data || []);
    setLoading(false);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = stack.findIndex((i) => i.id === active.id);
      const newIndex = stack.findIndex((i) => i.id === over.id);
      
      const newOrder = arrayMove(stack, oldIndex, newIndex);
      setStack(newOrder);

      const updates = newOrder.map((item, index) => ({
        id: item.id,
        order_index: index
      }));

      const { error } = await supabase.from('tech_stack').upsert(updates);
      if (error) toast.error("Failed to save order");
      else {
        toast.success("Stack order updated");
        await fetch('/api/revalidate?tag=tech-stack', { method: 'POST' });
      }
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleCreate = () => {
    const newItem = {
      name: "",
      category: "Frontend",
      logo_url: "",
      show_in_ticker: true,
      order_index: stack.length,
      is_active: true
    };
    setEditingId("new");
    setEditForm(newItem);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('tech_stack').upsert(editForm);

    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success("Technology updated");
      setEditingId(null);
      fetchStack();
      await fetch('/api/revalidate?tag=tech-stack', { method: 'POST' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this technology?")) return;
    const { error } = await supabase.from('tech_stack').delete().eq('id', id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Technology removed");
      fetchStack();
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Syncing Technology Matrix...</div>;

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
            Save Technology
          </AdminButton>
        </div>

        <AdminCard title={editingId === "new" ? "Add Technology" : "Edit Technology"}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminInput 
                label="Name" 
                value={editForm.name} 
                onChange={e => setEditForm({ ...editForm, name: e.target.value })} 
              />
              <AdminInput 
                label="Category" 
                value={editForm.category} 
                onChange={e => setEditForm({ ...editForm, category: e.target.value })} 
                placeholder="Frontend, Backend, AI_ML, etc."
              />
              <AdminInput 
                label="Logo URL" 
                value={editForm.logo_url} 
                onChange={e => setEditForm({ ...editForm, logo_url: e.target.value })} 
              />
            </div>
            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
               <button 
                onClick={() => setEditForm({ ...editForm, show_in_ticker: !editForm.show_in_ticker })}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                  editForm.show_in_ticker 
                    ? "bg-[#6C3FEF]/10 border-[#6C3FEF]/30 text-[#6C3FEF]" 
                    : "bg-transparent border-slate-200 text-slate-400"
                )}
              >
                {editForm.show_in_ticker ? "Show in Ticker" : "Hidden from Ticker"}
              </button>
              <button 
                onClick={() => setEditForm({ ...editForm, is_active: !editForm.is_active })}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                  editForm.is_active 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" 
                    : "bg-red-500/10 border-red-500/30 text-red-500"
                )}
              >
                {editForm.is_active ? "Active" : "Disabled"}
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
            Tech <span className="text-[#6C3FEF]">Stack</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Technology Integration Protocol</p>
        </div>
        <AdminButton onClick={handleCreate} icon={<Plus size={18} />}>
          Add Tech
        </AdminButton>
      </div>

      <AdminCard>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={stack.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <AdminTable headers={["", "Technology", "Category", "Ticker", "Actions"]}>
              {stack.map((item) => (
                <SortableTechRow key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              {stack.length === 0 && (
                <AdminTableRow>
                  <AdminTableCell className="text-center py-20" colSpan={5}>
                    <p className="text-slate-300 font-black uppercase text-xs tracking-widest italic">No technologies registered</p>
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

function SortableTechRow({ item, onEdit, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

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
          <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded flex items-center justify-center p-1 shadow-inner">
            {item.logo_url ? (
              <img src={item.logo_url} alt="" className="w-full h-full object-contain" />
            ) : (
              <Cpu size={14} className="text-slate-200" />
            )}
          </div>
          <p className="font-black text-slate-900 uppercase text-[12px] tracking-wider">{item.name}</p>
        </div>
      </AdminTableCell>
      <AdminTableCell>
        <AdminBadge variant="secondary">{item.category}</AdminBadge>
      </AdminTableCell>
      <AdminTableCell>
        {item.show_in_ticker ? (
          <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Check size={14} />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <X size={14} />
          </div>
        )}
      </AdminTableCell>
      <AdminTableCell>
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onEdit(item)}
            className="p-2 text-slate-400 hover:text-[#6C3FEF] hover:bg-[#6C3FEF]/5 rounded-lg transition-all"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(item.id)}
            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </AdminTableCell>
    </AdminTableRow>
  );
}
