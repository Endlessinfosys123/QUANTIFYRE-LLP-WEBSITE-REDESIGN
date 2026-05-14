"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { 
  Save, Zap, Layers, Eye, EyeOff, 
  GripVertical, Settings
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ServicesPageEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hero, setHero] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [heroRes, servicesRes] = await Promise.all([
      supabase.from('hero_sections').select('*').eq('page', 'services').single(),
      supabase.from('services').select('*').order('order_index')
    ]);

    setHero(heroRes.data);
    setServices(servicesRes.data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await supabase.from('hero_sections').upsert({ ...hero, page: 'services' }, { onConflict: 'page' });
      toast.success("Page configuration saved");
      await fetch('/api/revalidate?path=/services', { method: 'POST' });
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-[#A0A0B0] font-black uppercase tracking-widest animate-pulse">Loading Service Catalog...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Services <span className="text-[#6C3FEF]">Index Editor</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Capability Matrix Manager</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
          className="px-8"
        >
          Publish Layout
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AdminCard title="Hero Architecture" icon={<Zap size={18} className="text-[#6C3FEF]" />}>
            <div className="space-y-6">
              <AdminInput label="Badge Text" value={hero?.badge_text || ""} onChange={e => setHero({ ...hero, badge_text: e.target.value })} />
              <AdminInput label="Heading Line 1" value={hero?.heading_line1 || ""} onChange={e => setHero({ ...hero, heading_line1: e.target.value })} />
              <AdminInput label="Highlighted Word" value={hero?.heading_highlight || ""} onChange={e => setHero({ ...hero, heading_highlight: e.target.value })} />
              <AdminTextarea label="Subtext" value={hero?.subtext || ""} onChange={e => setHero({ ...hero, subtext: e.target.value })} />
            </div>
          </AdminCard>

          <AdminCard title="Service Grid Layout" subtitle="Visibility control for the main index">
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.id} className="p-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#13131F] rounded-xl flex items-center justify-center text-xl">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight">{service.title}</h4>
                      <p className="text-[10px] text-[#3F3F46] font-black uppercase tracking-widest">/{service.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AdminButton variant="outline" size="sm" href={`/admin/content/services?id=${service.id}`} icon={<Settings size={14} />}>Edit Detail</AdminButton>
                    <button 
                      onClick={() => {
                        // In a real app, this would update the local state and then save
                        toast.info("Manage visibility in the Services Content module");
                      }}
                      className={cn(
                        "p-2 rounded-lg border transition-all",
                        service.is_active ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" : "border-red-500/20 text-red-500 bg-red-500/5"
                      )}
                    >
                      {service.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>

        <div className="space-y-8">
           <AdminCard title="Quick Tips" icon={<Layers size={18} className="text-[#0EA5E9]" />}>
              <ul className="space-y-4">
                 <li className="text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest leading-relaxed">
                    <span className="text-white block mb-1">Detailed Control</span>
                    To edit service icons, tags, or detail page content, use the <span className="text-[#6C3FEF]">Services Content Manager</span>.
                 </li>
                 <li className="text-[10px] font-bold text-[#A0A0B0] uppercase tracking-widest leading-relaxed">
                    <span className="text-white block mb-1">Slug Integrity</span>
                    Changing a slug will break any existing links to that service. Proceed with caution.
                 </li>
              </ul>
           </AdminCard>
        </div>
      </div>
    </div>
  );
}
