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
  Target, GripVertical
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

export default function ProcessManagerPage() {
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<any[]>([]);
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
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) toast.error("Failed to load process steps");
    else setSteps(data || []);
    setLoading(false);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = steps.findIndex((i) => i.id === active.id);
      const newIndex = steps.findIndex((i) => i.id === over.id);
      
      const newOrder = arrayMove(steps, oldIndex, newIndex);
      setSteps(newOrder);

      const updates = newOrder.map((step, index) => ({
        id: step.id,
        order_index: index,
        step_number: index + 1
      }));

      const { error } = await supabase.from('process_steps').upsert(updates);
      if (error) toast.error("Failed to save order");
      else {
        toast.success("Process hierarchy updated");
        await fetch('/api/revalidate?tag=process', { method: 'POST' });
      }
    }
  };

  const handleEdit = (step: any) => {
    setEditingId(step.id);
    setEditForm(step);
  };

  const handleCreate = () => {
    const newStep = {
      step_number: steps.length + 1,
      title: "",
      description: "",
      icon: "⚡",
      order_index: steps.length,
      is_active: true
    };
    setEditingId("new");
    setEditForm(newStep);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('process_steps').upsert(editForm);

    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success("Process step synchronized");
      setEditingId(null);
      fetchSteps();
      await fetch('/api/revalidate?tag=process', { method: 'POST' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this step?")) return;
    const { error } = await supabase.from('process_steps').delete().eq('id', id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Step removed from process");
      fetchSteps();
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Scanning Process Framework...</div>;

  if (editingId) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setEditingId(null)}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#6C3FEF] transition-colors"
          >
            ← Back to Framework
          </button>
          <AdminButton onClick={handleSave} isLoading={saving} icon={<Save size={18} />}>
            Commit Step
          </AdminButton>
        </div>

        <AdminCard title={editingId === "new" ? "New Process Step" : "Edit Step"}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminInput 
                label="Title" 
                value={editForm.title} 
                onChange={e => setEditForm({ ...editForm, title: e.target.value })} 
              />
              <AdminInput 
                label="Step Number" 
                type="number"
                value={editForm.step_number} 
                onChange={e => setEditForm({ ...editForm, step_number: parseInt(e.target.value) })} 
              />
              <AdminInput 
                label="Icon Emoji/Lucide" 
                value={editForm.icon} 
                onChange={e => setEditForm({ ...editForm, icon: e.target.value })} 
              />
            </div>
            <AdminTextarea 
              label="Description" 
              value={editForm.description} 
              onChange={e => setEditForm({ ...editForm, description: e.target.value })} 
              rows={4}
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Process <span className="text-[#6C3FEF]">Framework</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Engineering Lifecycle Manager</p>
        </div>
        <AdminButton onClick={handleCreate} icon={<Plus size={18} />}>
          Add Step
        </AdminButton>
      </div>

      <AdminCard>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={steps.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <AdminTable headers={["", "Step", "Details", "Status", "Actions"]}>
              {steps.map((step) => (
                <SortableStepRow key={step.id} step={step} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              {steps.length === 0 && (
                <AdminTableRow>
                  <AdminTableCell className="text-center py-20" colSpan={5}>
                    <p className="text-slate-300 font-black uppercase text-xs tracking-widest italic">No process steps registered</p>
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

function SortableStepRow({ step, onEdit, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: step.id });

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
          <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-xs font-black text-[#6C3FEF] shadow-inner">
            {step.step_number}
          </div>
          <p className="font-black text-slate-900 uppercase text-[12px] tracking-wider">{step.title}</p>
        </div>
      </AdminTableCell>
      <AdminTableCell>
        <p className="text-[10px] text-slate-400 font-bold line-clamp-1">{step.description}</p>
      </AdminTableCell>
      <AdminTableCell>
        <AdminBadge variant={step.is_active ? "success" : "secondary"}>
          {step.is_active ? "Active" : "Hidden"}
        </AdminBadge>
      </AdminTableCell>
      <AdminTableCell>
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onEdit(step)}
            className="p-2 text-slate-400 hover:text-[#6C3FEF] hover:bg-[#6C3FEF]/5 rounded-lg transition-all"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(step.id)}
            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </AdminTableCell>
    </AdminTableRow>
  );
}
