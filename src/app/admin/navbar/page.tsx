"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/ui/AdminTable";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { 
  Plus, Edit, Trash2, Save, 
  Search, Compass, GripVertical,
  ExternalLink, MousePointer2,
  X
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

export default function NavbarManagerPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
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
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('nav_items')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) toast.error("Failed to load navigation items");
    else setItems(data || []);
    setLoading(false);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      
      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);

      const updates = newOrder.map((item, index) => ({
        id: item.id,
        order_index: index
      }));

      const { error } = await supabase.from('nav_items').upsert(updates);
      if (error) toast.error("Failed to save order");
      else {
        toast.success("Navigation hierarchy updated");
        await fetch('/api/revalidate?tag=global', { method: 'POST' });
      }
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleCreate = () => {
    setEditingId("new");
    setEditForm({
      label: "",
      href: "",
      target: "_self",
      is_active: true,
      order_index: items.length
    });
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('nav_items').upsert(editForm);

    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success("Navigation item synchronized");
      setEditingId(null);
      fetchItems();
      await fetch('/api/revalidate?tag=global', { method: 'POST' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    const { error } = await supabase.from('nav_items').delete().eq('id', id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Link removed from navigation");
      fetchItems();
      await fetch('/api/revalidate?tag=global', { method: 'POST' });
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Initializing Navigation Matrix...</div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Navbar <span className="text-[#6C3FEF]">Manager</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Global Link Authority</p>
        </div>
        <AdminButton onClick={handleCreate} icon={<Plus size={18} />}>
          Add Link
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List View */}
        <div className="lg:col-span-2">
          <AdminCard className="shadow-2xl shadow-slate-200/60">
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={items.map(i => i.id)}
                strategy={verticalListSortingStrategy}
              >
                <AdminTable headers={["", "Label", "Path", "Status", "Actions"]}>
                  {items.map((item) => (
                    <SortableNavItem key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} active={editingId === item.id} />
                  ))}
                  {items.length === 0 && (
                    <AdminTableRow>
                      <AdminTableCell className="text-center py-20" colSpan={5}>
                        <p className="text-slate-300 font-black uppercase text-xs tracking-widest italic">No active links in navbar</p>
                      </AdminTableCell>
                    </AdminTableRow>
                  )}
                </AdminTable>
              </SortableContext>
            </DndContext>
          </AdminCard>
        </div>

        {/* Editor Sidebar */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {editingId ? (
              <motion.div
                key="editor"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <AdminCard title={editingId === "new" ? "New Link" : "Edit Link"} icon={<Edit size={18} />}>
                  <div className="space-y-6">
                    <AdminInput 
                      label="Menu Label" 
                      placeholder="e.g. Services"
                      value={editForm.label} 
                      onChange={e => setEditForm({ ...editForm, label: e.target.value })} 
                    />
                    <AdminInput 
                      label="URL Path" 
                      placeholder="e.g. /services"
                      value={editForm.href} 
                      onChange={e => setEditForm({ ...editForm, href: e.target.value })} 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Target Window</label>
                        <select 
                          value={editForm.target}
                          onChange={e => setEditForm({ ...editForm, target: e.target.value })}
                          className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-[#6C3FEF10] focus:border-[#6C3FEF] appearance-none cursor-pointer font-medium"
                        >
                          <option value="_self">Same Window</option>
                          <option value="_blank">New Window</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Visibility</label>
                        <select 
                          value={editForm.is_active ? "true" : "false"}
                          onChange={e => setEditForm({ ...editForm, is_active: e.target.value === "true" })}
                          className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-[#6C3FEF10] focus:border-[#6C3FEF] appearance-none cursor-pointer font-medium"
                        >
                          <option value="true">Active</option>
                          <option value="false">Hidden</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex gap-3">
                      <AdminButton 
                        onClick={handleSave} 
                        isLoading={saving} 
                        className="flex-1"
                        icon={<Save size={16} />}
                      >
                        Save Link
                      </AdminButton>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </AdminCard>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 border-2 border-dashed border-slate-100 rounded-3xl text-center"
              >
                <Compass size={48} className="mx-auto text-slate-100 mb-4" />
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Select an item to edit or create a new link</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SortableNavItem({ item, onEdit, onDelete, active }: any) {
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
    background: isDragging ? '#F8FAFC' : active ? '#6C3FEF05' : 'transparent'
  };

  return (
    <AdminTableRow ref={setNodeRef} style={style} className={active ? "ring-2 ring-inset ring-[#6C3FEF20]" : ""}>
      <AdminTableCell>
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#6C3FEF] transition-colors p-1">
          <GripVertical size={18} />
        </button>
      </AdminTableCell>
      <AdminTableCell>
        <p className="font-black text-slate-900 uppercase text-[12px] tracking-wider">{item.label}</p>
      </AdminTableCell>
      <AdminTableCell>
        <div className="flex items-center gap-2 text-slate-400">
          {item.target === "_blank" ? <ExternalLink size={12} className="text-[#6C3FEF]" /> : <MousePointer2 size={12} />}
          <code className="text-[10px] font-black uppercase tracking-widest">{item.href}</code>
        </div>
      </AdminTableCell>
      <AdminTableCell>
        <AdminBadge variant={item.is_active ? "success" : "secondary"}>
          {item.is_active ? "Active" : "Hidden"}
        </AdminBadge>
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
