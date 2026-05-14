"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { 
  Save, Zap, Briefcase, Grid
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PortfolioPageEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const [hero, setHero] = useState<any>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [heroRes, configRes] = await Promise.all([
      supabase.from('hero_sections').select('*').eq('page', 'portfolio').single(),
      supabase.from('portfolio_page_config').select('*').single()
    ]);

    setHero(heroRes.data);
    setConfig(configRes.data);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        supabase.from('hero_sections').upsert({ ...hero, page: 'portfolio' }, { onConflict: 'page' }),
        supabase.from('portfolio_page_config').upsert(config)
      ]);
      toast.success("Portfolio layout updated");
      await fetch('/api/revalidate?path=/portfolio', { method: 'POST' });
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-[#A0A0B0] font-black uppercase tracking-widest animate-pulse">Scanning Archive...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Portfolio <span className="text-[#6C3FEF]">Editor</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Visual Achievement Controller</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
          className="px-8"
        >
          Commit Archive
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <div className="p-6 bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl">
               <p className="text-[10px] font-black text-[#A0A0B0] uppercase tracking-widest mb-4">Project data is managed in Portfolio Content</p>
               <AdminButton variant="outline" size="sm" href="/admin/content/portfolio" className="w-full">Open Project Manager</AdminButton>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
