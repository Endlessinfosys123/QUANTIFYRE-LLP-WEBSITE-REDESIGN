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
  ArrowLeft, ExternalLink, Briefcase,
  Layers, Calendar, User, Globe, GripVertical
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

export default function PortfolioManagerPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
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
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) toast.error("Failed to load portfolio");
    else setProjects(data || []);
    setLoading(false);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = projects.findIndex((i) => i.id === active.id);
      const newIndex = projects.findIndex((i) => i.id === over.id);
      
      const newOrder = arrayMove(projects, oldIndex, newIndex);
      setProjects(newOrder);

      // Save new order to database
      const updates = newOrder.map((project, index) => ({
        id: project.id,
        order_index: index
      }));

      const { error } = await supabase.from('portfolio_projects').upsert(updates);
      if (error) toast.error("Failed to save order");
      else {
        toast.success("Project hierarchy updated");
        await fetch('/api/revalidate?tag=portfolio', { method: 'POST' });
      }
    }
  };

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setEditForm(project);
  };

  const handleCreate = () => {
    const newProject = {
      title: "",
      slug: "",
      client_name: "",
      project_year: new Date().getFullYear().toString(),
      category: "Software Development",
      thumbnail_url: "",
      full_image_url: "",
      technologies: [],
      project_link: "",
      order_index: projects.length,
      is_featured: false,
      extra_json: {}
    };
    setEditingId("new");
    setEditForm(newProject);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('portfolio_projects').upsert(editForm);

    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success("Project deployment recorded");
      setEditingId(null);
      fetchProjects();
      await fetch('/api/revalidate?tag=portfolio', { method: 'POST' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this project?")) return;
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Project removed from portfolio");
      fetchProjects();
    }
  };

  if (loading) return <div className="p-8 text-[#A0A0B0] font-black uppercase tracking-widest animate-pulse">Scanning Deployment Registry...</div>;

  if (editingId) {
    return (
      <div className="space-y-8 max-w-5xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setEditingId(null)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#A0A0B0] hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setEditForm({ ...editForm, is_featured: !editForm.is_featured })}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                editForm.is_featured 
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-500" 
                  : "bg-transparent border-[#1E1E2E] text-[#3F3F46]"
              )}
            >
              {editForm.is_featured ? "Featured Project" : "Standard Project"}
            </button>
            <AdminButton onClick={handleSave} isLoading={saving} icon={<Save size={18} />}>
              Save Project
            </AdminButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AdminCard title="Project Core" subtitle="Basic deployment data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminInput 
                  label="Project Title" 
                  value={editForm.title} 
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })} 
                />
                <AdminInput 
                  label="URL Slug" 
                  value={editForm.slug} 
                  onChange={e => setEditForm({ ...editForm, slug: e.target.value })} 
                />
                <AdminInput 
                  label="Client Name" 
                  value={editForm.client_name} 
                  onChange={e => setEditForm({ ...editForm, client_name: e.target.value })} 
                />
                <AdminInput 
                  label="Project Year" 
                  value={editForm.project_year} 
                  onChange={e => setEditForm({ ...editForm, project_year: e.target.value })} 
                />
                <AdminInput 
                  label="Category" 
                  value={editForm.category} 
                  onChange={e => setEditForm({ ...editForm, category: e.target.value })} 
                />
                <AdminInput 
                  label="Project Live Link" 
                  value={editForm.project_link} 
                  onChange={e => setEditForm({ ...editForm, project_link: e.target.value })} 
                  icon={<ExternalLink size={14} />}
                />
                <div className="md:col-span-2">
                  <AdminInput 
                    label="Technologies (Comma separated)" 
                    value={editForm.technologies?.join(', ')} 
                    onChange={e => setEditForm({ ...editForm, technologies: e.target.value.split(',').map((t: string) => t.trim()) })} 
                    icon={<Layers size={14} />}
                  />
                </div>
              </div>
            </AdminCard>
          </div>

          <div className="space-y-8">
            <AdminCard title="Visual Assets" subtitle="Project screenshots">
              <div className="space-y-6">
                <AdminInput 
                  label="Thumbnail URL" 
                  value={editForm.thumbnail_url} 
                  onChange={e => setEditForm({ ...editForm, thumbnail_url: e.target.value })} 
                />
                {editForm.thumbnail_url && (
                  <div className="aspect-video rounded-xl border border-[#1E1E2E] overflow-hidden bg-[#0A0A0F]">
                    <img src={editForm.thumbnail_url} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <AdminInput 
                  label="Full Image URL" 
                  value={editForm.full_image_url} 
                  onChange={e => setEditForm({ ...editForm, full_image_url: e.target.value })} 
                />
              </div>
            </AdminCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Project <span className="text-[#6C3FEF]">Portfolio</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Global Deployment Log</p>
        </div>
        <AdminButton onClick={handleCreate} icon={<Plus size={18} />}>
          Register New Project
        </AdminButton>
      </div>

      <AdminCard>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={projects.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <AdminTable headers={["", "Project", "Category", "Year", "Actions"]}>
              {projects.map((project) => (
                <SortableProjectRow key={project.id} project={project} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              {projects.length === 0 && (
                <AdminTableRow>
                  <AdminTableCell className="text-center py-20" colSpan={5}>
                    <p className="text-[#3F3F46] font-black uppercase text-xs tracking-widest">No projects found in registry</p>
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

function SortableProjectRow({ project, onEdit, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project.id });

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
          <div className="w-16 h-10 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg overflow-hidden flex items-center justify-center text-[#3F3F46]">
            {project.thumbnail_url ? (
              <img src={project.thumbnail_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <Briefcase size={20} />
            )}
          </div>
          <div>
            <p className="font-black text-white uppercase text-[12px] tracking-wider">{project.title}</p>
            <p className="text-[10px] text-[#A0A0B0] font-bold uppercase tracking-widest">{project.client_name}</p>
          </div>
        </div>
      </AdminTableCell>
      <AdminTableCell>
        <AdminBadge variant="primary">{project.category}</AdminBadge>
      </AdminTableCell>
      <AdminTableCell>
        <span className="text-[10px] font-black uppercase text-[#A0A0B0] tracking-widest flex items-center gap-1">
          <Calendar size={12} /> {project.project_year}
        </span>
      </AdminTableCell>
      <AdminTableCell>
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onEdit(project)}
            className="p-2 text-[#A0A0B0] hover:text-[#6C3FEF] hover:bg-[#6C3FEF10] rounded-lg transition-all"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(project.id)}
            className="p-2 text-[#3F3F46] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </AdminTableCell>
    </AdminTableRow>
  );
}
