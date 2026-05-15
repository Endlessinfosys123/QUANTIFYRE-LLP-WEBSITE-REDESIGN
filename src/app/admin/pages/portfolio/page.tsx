"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { 
  Save, Zap, Briefcase, Grid, Layout, Layers
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PortfolioPageEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hero, setHero] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);
  const [layout, setLayout] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('content');
  
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [heroRes, configRes, layoutRes] = await Promise.all([
      supabase.from('hero_sections').select('*').eq('page', 'portfolio').single(),
      supabase.from('portfolio_page_config').select('*').single(),
      supabase.from('site_config').select('*').like('key', 'show_%_portfolio')
    ]);

    setHero(heroRes.data);
    setConfig(configRes.data);
    
    const layoutMap: Record<string, string> = {};
    layoutRes.data?.forEach(item => {
      layoutMap[item.key] = item.value;
    });
    setLayout(layoutMap);
    
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (activeTab === 'content') {
        await Promise.all([
          supabase.from('hero_sections').upsert({ ...hero, page: 'portfolio' }, { onConflict: 'page' }),
          supabase.from('portfolio_page_config').upsert(config)
        ]);
      } else if (activeTab === 'layout') {
        const updates = Object.entries(layout).map(([key, value]) => ({ key, value }));
        await supabase.from('site_config').upsert(updates, { onConflict: 'key' });
      }
      toast.success("Portfolio layout updated");
      await fetch('/api/revalidate?path=/portfolio', { method: 'POST' });
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Scanning Archive...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Portfolio <span className="text-[#6C3FEF]">Editor</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Visual Achievement Controller</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
          className="px-8 shadow-xl shadow-[#6C3FEF20]"
        >
          Commit Archive
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
              <motion.div key="content" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <AdminCard title="Hero Parameters" icon={<Zap size={18} className="text-[#6C3FEF]" />}>
                  <div className="space-y-6">
                    <AdminInput label="Main Heading (e.g. LANDMARKS)" value={hero?.heading_line1 || ""} onChange={e => setHero({ ...hero, heading_line1: e.target.value })} />
                    <AdminInput label="Subheading" value={hero?.heading_line2 || ""} onChange={e => setHero({ ...hero, heading_line2: e.target.value })} />
                    <AdminTextarea label="Hero Description" value={hero?.subtext || ""} onChange={e => setHero({ ...hero, subtext: e.target.value })} />
                  </div>
                </AdminCard>

                <AdminCard title="Grid Configuration" icon={<Grid size={18} className="text-[#0EA5E9]" />}>
                  <div className="space-y-6">
                    <AdminInput label="Section Label" value={config?.section_label || ""} onChange={e => setConfig({ ...config, section_label: e.target.value })} />
                    <AdminInput label="Section Heading" value={config?.section_heading || ""} onChange={e => setConfig({ ...config, section_heading: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                       <AdminInput label="CTA Button Label" value={config?.cta_label || ""} onChange={e => setConfig({ ...config, cta_label: e.target.value })} />
                       <AdminInput label="CTA Button Link" value={config?.cta_link || ""} onChange={e => setConfig({ ...config, cta_link: e.target.value })} />
                    </div>
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Project data is managed in Portfolio Content</p>
                       <AdminButton variant="outline" size="sm" href="/admin/content/portfolio" className="w-full">Open Project Manager</AdminButton>
                    </div>
                  </div>
                </AdminCard>
              </motion.div>
            )}

            {activeTab === 'layout' && (
              <motion.div key="layout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <AdminCard title="Layout Matrix" subtitle="Section visibility control">
                  <div className="space-y-4">
                    {[
                      { key: 'show_portfolio_grid', label: 'Primary Project Matrix' },
                      { key: 'show_cta_portfolio', label: 'Conversion Zone' },
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
