"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Plus, Search, Layers, Edit, Trash2, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/get-content?table=services");
      const data = await res.json();
      setServices(data.data || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: any) => {
    setCurrentService(service);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "services",
          data: currentService,
          revalidate_path: "/services"
        }),
      });

      if (res.ok) {
        toast.success("Service saved!");
        setIsEditing(false);
        fetchServices();
      }
    } catch (error) {
      toast.error("Failed to save service.");
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-dark tracking-tighter">
              {currentService.id ? "Edit Service" : "New Service"}
            </h1>
            <p className="text-text-secondary font-medium mt-1">Configure service details and capabilities</p>
          </div>
          <div className="flex gap-4">
            <AdminButton variant="outline" onClick={() => setIsEditing(false)}>Cancel</AdminButton>
            <AdminButton onClick={handleSave}>Save Service</AdminButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminCard className="p-8 space-y-6">
            <h2 className="text-lg font-bold mb-4">Core Information</h2>
            <AdminInput 
              label="Service Title" 
              value={currentService.title}
              onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
            />
            <AdminInput 
              label="URL Slug" 
              value={currentService.slug}
              onChange={(e) => setCurrentService({ ...currentService, slug: e.target.value })}
            />
            <AdminInput 
              label="Icon Name (Lucide)" 
              value={currentService.icon_name}
              onChange={(e) => setCurrentService({ ...currentService, icon_name: e.target.value })}
            />
            <AdminTextarea 
              label="Short Description" 
              value={currentService.short_description}
              onChange={(e) => setCurrentService({ ...currentService, short_description: e.target.value })}
              rows={4}
            />
          </AdminCard>

          <AdminCard className="p-8 space-y-6">
            <h2 className="text-lg font-bold mb-4">SEO & Metadata</h2>
            <AdminInput 
              label="Meta Title" 
              value={currentService.meta_title || ""}
              onChange={(e) => setCurrentService({ ...currentService, meta_title: e.target.value })}
            />
            <AdminTextarea 
              label="Meta Description" 
              value={currentService.meta_description || ""}
              onChange={(e) => setCurrentService({ ...currentService, meta_description: e.target.value })}
              rows={3}
            />
            <div className="flex items-center gap-2 pt-4">
              <input 
                type="checkbox" 
                checked={currentService.is_active}
                onChange={(e) => setCurrentService({ ...currentService, is_active: e.target.checked })}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <span className="font-bold text-dark text-sm">Published & Visible</span>
            </div>
          </AdminCard>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-dark tracking-tighter">Services Management</h1>
          <p className="text-text-secondary font-medium mt-1">Manage your agency's core capabilities</p>
        </div>
        <AdminButton 
          icon={<Plus size={18} />}
          onClick={() => {
            setCurrentService({ title: "", slug: "", icon_name: "Code2", short_description: "", is_active: true });
            setIsEditing(true);
          }}
        >
          Add New Service
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           [...Array(3)].map((_, i) => <AdminCard key={i} className="h-[200px] animate-pulse bg-gray-50" />)
        ) : (
          services.map((service) => (
            <AdminCard key={service.id} className="group overflow-hidden">
               <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Layers size={24} />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      service.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {service.is_active ? 'Active' : 'Draft'}
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-dark mb-2 line-clamp-1">{service.title}</h3>
                  <p className="text-sm text-text-secondary font-medium line-clamp-2 mb-6 h-10">
                    {service.short_description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                      /{service.slug}
                    </span>
                    <div className="flex gap-2">
                       <button 
                        onClick={() => handleEdit(service)}
                        className="p-2 rounded-lg bg-surface border border-border text-text-secondary hover:text-primary transition-colors"
                       >
                         <Edit size={16} />
                       </button>
                       <button className="p-2 rounded-lg bg-surface border border-border text-text-secondary hover:text-red-600 transition-colors">
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </div>
               </div>
            </AdminCard>
          ))
        )}
      </div>
    </div>
  );
}
