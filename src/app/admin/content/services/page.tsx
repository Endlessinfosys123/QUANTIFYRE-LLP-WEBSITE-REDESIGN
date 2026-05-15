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
  ArrowLeft, Search, Layout, 
  BarChart, Zap, Target, Box, GripVertical
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { RichTextEditor } from "@/components/admin/modules/RichTextEditor";
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

export default function ServicesManagerPage() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState('basic');

  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) toast.error("Failed to load services");
    else setServices(data || []);
    setLoading(false);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = services.findIndex((i) => i.id === active.id);
      const newIndex = services.findIndex((i) => i.id === over.id);
      
      const newOrder = arrayMove(services, oldIndex, newIndex);
      setServices(newOrder);

      // Save new order to database
      const updates = newOrder.map((service, index) => ({
        id: service.id,
        order_index: index
      }));

      const { error } = await supabase.from('services').upsert(updates);
      if (error) toast.error("Failed to save order");
      else {
        toast.success("Service hierarchy updated");
        await fetch('/api/revalidate?tag=services', { method: 'POST' });
      }
    }
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setEditForm(service);
    setActiveEditTab('basic');
  };

  const handleCreate = () => {
    const newService = {
      slug: "",
      title: "",
      description: "",
      icon: "⚡",
      tags: [],
      order_index: services.length,
      detail_page_badge: "",
      detail_page_h1: "",
      detail_page_subtext: "",
      detail_page_stats: [],
      detail_page_capabilities: [],
      detail_page_deliverables: [],
      detail_page_roadmap: [],
      content: ""
    };
    setEditingId("new");
    setEditForm(newService);
    setActiveEditTab('basic');
  };

  const handleSave = async () => {
    setSaving(true);
    // If it's a new service, we need to handle it differently (upsert might not return the ID or handle new properly depending on how it's called)
    // But since it's a single item, it should be fine.
    const { error } = await supabase.from('services').upsert(editForm);

    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success("Service synchronized with AI core");
      setEditingId(null);
      fetchServices();
      await fetch('/api/revalidate?tag=services', { method: 'POST' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Service removed from core");
      fetchServices();
    }
  };

  if (loading) return <div className="p-8 text-[#A0A0B0] font-black uppercase tracking-widest animate-pulse">Scanning Service Registry...</div>;

  if (editingId) {
    return (
      <div className="space-y-8 max-w-5xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setEditingId(null)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#A0A0B0] hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back to Registry
          </button>
          <AdminButton onClick={handleSave} isLoading={saving} icon={<Save size={18} />}>
            Commit Service
          </AdminButton>
        </div>

        <div className="flex gap-4 p-1 bg-[#13131F] border border-[#1E1E2E] rounded-2xl w-fit">
          {[
            { id: 'basic', label: 'Basic Info', icon: Box },
            { id: 'content', label: 'Page Content', icon: Layout },
            { id: 'stats', label: 'Stats & Roadmap', icon: BarChart },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveEditTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeEditTab === tab.id ? "bg-[#6C3FEF] text-white" : "text-[#A0A0B0] hover:text-white"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeEditTab === 'basic' && (
            <motion.div key="basic" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <AdminCard title="Identity & Core" subtitle="Base service parameters">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AdminInput 
                    label="Service Title" 
                    value={editForm.title} 
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })} 
                  />
                  <AdminInput 
                    label="Slug (URL Path)" 
                    value={editForm.slug} 
                    onChange={e => setEditForm({ ...editForm, slug: e.target.value })} 
                  />
                  <AdminInput 
                    label="Icon Emoji/Lucide" 
                    value={editForm.icon} 
                    onChange={e => setEditForm({ ...editForm, icon: e.target.value })} 
                  />
                  <AdminInput 
                    label="Tags (Comma separated)" 
                    value={editForm.tags?.join(', ')} 
                    onChange={e => setEditForm({ ...editForm, tags: e.target.value.split(',').map((t: string) => t.trim()) })} 
                  />
                  <div className="md:col-span-2">
                    <AdminTextarea 
                      label="Short Description" 
                      value={editForm.description} 
                      onChange={e => setEditForm({ ...editForm, description: e.target.value })} 
                    />
                  </div>
                </div>
              </AdminCard>
            </motion.div>
          )}

          {activeEditTab === 'content' && (
            <motion.div key="content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <AdminCard title="Detail Page Layout" subtitle="Content for the dedicated service page">
                <div className="space-y-6">
                  <AdminInput 
                    label="Page Badge Text" 
                    value={editForm.detail_page_badge} 
                    onChange={e => setEditForm({ ...editForm, detail_page_badge: e.target.value })} 
                  />
                  <AdminInput 
                    label="Main Heading (H1)" 
                    value={editForm.detail_page_h1} 
                    onChange={e => setEditForm({ ...editForm, detail_page_h1: e.target.value })} 
                  />
                  <AdminTextarea 
                    label="Subtext / Paragraph" 
                    value={editForm.detail_page_subtext} 
                    onChange={e => setEditForm({ ...editForm, detail_page_subtext: e.target.value })} 
                  />
                  
                  <div className="space-y-4 pt-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#A0A0B0]">Detailed Service Page Content (Rich Text)</label>
                    <RichTextEditor 
                      content={editForm.content || ""} 
                      onChange={content => setEditForm({ ...editForm, content })} 
                      placeholder="Enter detailed service methodology, technical specs, etc..."
                    />
                  </div>
                </div>
              </AdminCard>
            </motion.div>
          )}

          {activeEditTab === 'stats' && (
            <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <AdminCard title="Performance & Delivery" subtitle="Stats, capabilities, and deliverables">
                <div className="space-y-8">
                  <p className="text-[10px] font-black uppercase text-[#3F3F46] tracking-widest">Advanced JSON fields currently require structured input via Admin Hub.</p>
                  <div className="p-10 border-2 border-dashed border-[#1E1E2E] rounded-3xl text-center">
                    <Layout size={32} className="mx-auto text-[#3F3F46] mb-4" />
                    <p className="text-xs text-[#A0A0B0] font-bold">Complex JSON fields (stats, roadmap) are managed via specialized builders in v2.1.</p>
                  </div>
                </div>
              </AdminCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Service <span className="text-[#6C3FEF]">Registry</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Capability Matrix Manager</p>
        </div>
        <AdminButton onClick={handleCreate} icon={<Plus size={18} />}>
          Register New Service
        </AdminButton>
      </div>

      <AdminCard>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={services.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <AdminTable headers={["", "Service", "Slug", "Status", "Actions"]}>
              {services.map((service) => (
                <SortableServiceRow key={service.id} service={service} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              {services.length === 0 && (
                <AdminTableRow>
                  <AdminTableCell className="text-center py-20" colSpan={5}>
                    <p className="text-[#3F3F46] font-black uppercase text-xs tracking-widest">No services registered in core</p>
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

function SortableServiceRow({ service, onEdit, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: service.id });

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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl flex items-center justify-center text-xl">
            {service.icon}
          </div>
          <div>
            <p className="font-black text-white uppercase text-[12px] tracking-wider">{service.title}</p>
            <p className="text-[10px] text-[#A0A0B0] font-bold line-clamp-1">{service.description}</p>
          </div>
        </div>
      </AdminTableCell>
      <AdminTableCell>
        <code className="text-[#6C3FEF] text-[10px] font-black uppercase tracking-widest">/{service.slug}</code>
      </AdminTableCell>
      <AdminTableCell>
        <AdminBadge variant={service.is_active ? "success" : "secondary"}>
          {service.is_active ? "Active" : "Disabled"}
        </AdminBadge>
      </AdminTableCell>
      <AdminTableCell>
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onEdit(service)}
            className="p-2 text-[#A0A0B0] hover:text-[#6C3FEF] hover:bg-[#6C3FEF10] rounded-lg transition-all"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(service.id)}
            className="p-2 text-[#3F3F46] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </AdminTableCell>
    </AdminTableRow>
  );
}
