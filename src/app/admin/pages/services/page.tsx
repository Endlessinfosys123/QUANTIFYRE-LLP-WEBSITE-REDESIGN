"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { 
  Save, Zap, Layers, Eye, EyeOff, 
  GripVertical, Settings, Layout
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
  const [layout, setLayout] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('content');
  
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [heroRes, servicesRes, configRes] = await Promise.all([
      supabase.from('hero_sections').select('*').eq('page', 'services').single(),
      supabase.from('services').select('*').order('order_index'),
      supabase.from('site_config').select('*').like('key', 'show_%_services')
    ]);

    setHero(heroRes.data);
    setServices(servicesRes.data || []);
    
    const layoutMap: Record<string, string> = {};
    configRes.data?.forEach(item => {
      layoutMap[item.key] = item.value;
    });
    setLayout(layoutMap);
    
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (activeTab === 'content') {
        await supabase.from('hero_sections').upsert({ ...hero, page: 'services' }, { onConflict: 'page' });
      } else if (activeTab === 'layout') {
        const updates = Object.entries(layout).map(([key, value]) => ({ key, value }));
        await supabase.from('site_config').upsert(updates, { onConflict: 'key' });
      }
      toast.success("Page configuration saved");
      await fetch('/api/revalidate?path=/services', { method: 'POST' });
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Loading Service Catalog...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Services <span className="text-[#6C3FEF]">Index Editor</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Capability Matrix Manager</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
          className="px-8 shadow-xl shadow-[#6C3FEF20]"
        >
          Publish Changes
        </AdminButton>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-1">
          <button
            onClick={() => setActiveTab('content')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === 'content' ? "bg-[#6C3FEF] text-white shadow-xl shadow-[#6C3FEF30]" : "text-slate-500 hover:bg-white"
            )}
          >
            <Layers size={16} />
            Page Content
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === 'layout' ? "bg-[#6C3FEF] text-white shadow-xl shadow-[#6C3FEF30]" : "text-slate-500 hover:bg-white"
            )}
          >
            <Layout size={16} />
            Layout Manager
          </button>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'content' && (
              <motion.div key="content" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
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
                      <div key={service.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-xl shadow-sm">
                            {service.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{service.title}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">/{service.slug}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <AdminButton variant="outline" size="sm" href={`/admin/content/services?id=${service.id}`} icon={<Settings size={14} />}>Edit Detail</AdminButton>
                          <div className={cn(
                            "p-2 rounded-lg border transition-all",
                            service.is_active ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" : "border-red-500/20 text-red-500 bg-red-500/5"
                          )}>
                            {service.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AdminCard>
              </motion.div>
            )}

            {activeTab === 'layout' && (
              <motion.div key="layout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <AdminCard title="Layout Matrix" subtitle="Section visibility control">
                  <div className="space-y-4">
                    {[
                      { key: 'show_services_grid', label: 'Primary Capability Matrix' },
                      { key: 'show_faq_services', label: 'Service-Specific FAQs' },
                      { key: 'show_cta_services', label: 'Conversion Zone' },
                    ].map(section => (
                      <div key={section.key} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <div>
                          <p className="text-xs font-black text-slate-900 uppercase tracking-wider">{section.label}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Section Toggle</p>
                        </div>
                        <select 
                          value={layout[section.key] === 'true' ? 'true' : 'false'}
                          onChange={e => setLayout({ ...layout, [section.key]: e.target.value })}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase outline-none cursor-pointer hover:border-[#6C3FEF] transition-colors"
                        >
                          <option value="true">Visible</option>
                          <option value="false">Hidden</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </AdminCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
