"use client";

import React, { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminToggle } from "@/components/admin/ui/AdminToggle";
import { AdminTagInput } from "@/components/admin/ui/AdminTagInput";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminConfirmDialog } from "@/components/admin/ui/AdminConfirmDialog";
import { AdminToast } from "@/components/admin/ui/AdminToast";
import { DragSortList } from "@/components/admin/modules/DragSortList";
import { ImageUpload } from "@/components/admin/modules/ImageUpload";
import { 
  Plus, Edit2, Trash2, Save, Briefcase, 
  Search, Loader2, Link as LinkIcon 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function PortfolioManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as any });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("position", { ascending: true });
      if (data) setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (project: any = null) => {
    setActiveProject(project || {
      title: "",
      client: "",
      category: "",
      description: "",
      tech_stack: [],
      image_url: "",
      live_url: "",
      is_visible: true,
      position: projects.length,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!activeProject.title) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "projects",
          data: activeProject,
          revalidate_path: "/portfolio",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ show: true, message: "Project saved successfully!", type: "success" });
        setIsModalOpen(false);
        fetchProjects();
      }
    } catch (err) {
      setToast({ show: true, message: "Failed to save project.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activeProject?.id) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "projects",
          id: activeProject.id,
          revalidate_path: "/portfolio",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "Project deleted successfully!", type: "success" });
        setIsConfirmOpen(false);
        fetchProjects();
      }
    } catch (err) {
      setToast({ show: true, message: "Delete failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorder = async (newItems: any[]) => {
    const updated = newItems.map((item, index) => ({ ...item, position: index }));
    setProjects(updated);
    try {
      await Promise.all(updated.map(item => 
        fetch("/api/admin/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "projects",
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
            Portfolio Manager
          </h1>
          <p className="text-[#6B7280] font-medium">Showcase your best work and case studies.</p>
        </div>
        <AdminButton icon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          Add New Project
        </AdminButton>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#6C3FEF]" size={40} />
          <p className="mt-4 font-bold text-[#6B7280]">Loading projects...</p>
        </div>
      ) : (
        <DragSortList
          items={projects}
          onReorder={handleReorder}
          keyExtractor={(item) => item.id}
          renderItem={(project) => (
            <div className="flex items-center justify-between p-4 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-20 h-14 rounded-lg bg-gray-100 border border-[#E5E7EB] overflow-hidden flex items-center justify-center">
                  {project.image_url ? (
                    <img src={project.image_url} className="w-full h-full object-cover" />
                  ) : (
                    <Briefcase size={20} className="text-[#9CA3AF]" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-[#111827]">{project.title}</h3>
                  <p className="text-xs text-[#6B7280]">{project.client} · {project.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AdminButton variant="ghost" size="sm" icon={<Edit2 size={16} />} onClick={() => handleOpenModal(project)}>
                  Edit
                </AdminButton>
                <AdminButton variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" icon={<Trash2 size={16} />} onClick={() => { setActiveProject(project); setIsConfirmOpen(true); }}>
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
        title={activeProject?.id ? "Edit Project" : "New Project"}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <AdminInput 
              label="Project Title" 
              value={activeProject?.title}
              onChange={(e) => setActiveProject({ ...activeProject, title: e.target.value })}
            />
            <AdminInput 
              label="Client Name" 
              value={activeProject?.client}
              onChange={(e) => setActiveProject({ ...activeProject, client: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <AdminInput 
              label="Category" 
              value={activeProject?.category}
              onChange={(e) => setActiveProject({ ...activeProject, category: e.target.value })}
              placeholder="Web App, Branding, etc."
            />
            <AdminInput 
              label="Live URL" 
              icon={<LinkIcon size={16} />}
              value={activeProject?.live_url}
              onChange={(e) => setActiveProject({ ...activeProject, live_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <AdminTextarea 
            label="Project Overview" 
            value={activeProject?.description}
            onChange={(e) => setActiveProject({ ...activeProject, description: e.target.value })}
          />

          <AdminTagInput 
            label="Tech Stack" 
            tags={activeProject?.tech_stack || []}
            onChange={(tags) => setActiveProject({ ...activeProject, tech_stack: tags })}
          />

          <ImageUpload 
            label="Featured Project Image" 
            value={activeProject?.image_url}
            onChange={(url) => setActiveProject({ ...activeProject, image_url: url })}
          />

          <AdminToggle 
            label="Published & Visible" 
            checked={activeProject?.is_visible}
            onChange={(val) => setActiveProject({ ...activeProject, is_visible: val })}
          />

          <div className="flex justify-end gap-3 pt-6 border-t border-[#E5E7EB]">
            <AdminButton variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</AdminButton>
            <AdminButton icon={<Save size={18} />} onClick={handleSave} isLoading={isSaving}>Save Project</AdminButton>
          </div>
        </div>
      </AdminModal>

      <AdminConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${activeProject?.title}"? This action cannot be undone.`}
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
