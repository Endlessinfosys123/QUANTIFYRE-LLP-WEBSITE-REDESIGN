"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { 
  Save, Zap, BarChart3, PenTool, 
  Layout, MousePointerClick
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BlogPageEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [configRes, postsRes] = await Promise.all([
      supabase.from('blog_page_config').select('*').single(),
      supabase.from('blog_posts').select('id, title').order('created_at', { ascending: false })
    ]);

    setConfig(configRes.data);
    setPosts(postsRes.data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await supabase.from('blog_page_config').upsert(config);
      toast.success("Blog configuration updated");
      await fetch('/api/revalidate?path=/blog', { method: 'POST' });
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-[#A0A0B0] font-black uppercase tracking-widest animate-pulse">Reading Log Stream...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Blog <span className="text-[#6C3FEF]">Log Editor</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Intelligence Stream Controller</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
          className="px-8"
        >
          Publish Log
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AdminCard title="Hero Parameters" icon={<Zap size={18} className="text-[#6C3FEF]" />}>
          <div className="space-y-6">
            <AdminInput label="Hero Label (Technical Intelligence)" value={config?.hero_label || ""} onChange={e => setConfig({ ...config, hero_label: e.target.value })} />
            <AdminInput label="Hero Heading (The System Log.)" value={config?.hero_heading || ""} onChange={e => setConfig({ ...config, hero_heading: e.target.value })} />
          </div>
        </AdminCard>

        <AdminCard title="Engagement Stats" icon={<BarChart3 size={18} className="text-[#0EA5E9]" />}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <AdminInput label="Views Count Display" value={config?.views_count || ""} onChange={e => setConfig({ ...config, views_count: e.target.value })} />
               <AdminInput label="Engagement Stat (e.g. +42%)" value={config?.engagement_stat || ""} onChange={e => setConfig({ ...config, engagement_stat: e.target.value })} />
            </div>
            <AdminInput label="Archive Button Label" value={config?.cta_label || ""} onChange={e => setConfig({ ...config, cta_label: e.target.value })} />
          </div>
        </AdminCard>

        <AdminCard title="Content Management" icon={<PenTool size={18} className="text-[#6C3FEF]" />} className="lg:col-span-2">
           <div className="p-10 border-2 border-dashed border-[#1E1E2E] rounded-3xl flex flex-col items-center text-center">
              <Layout size={48} className="text-[#3F3F46] mb-6" />
              <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-2">Detailed Post Control</h3>
              <p className="text-[#A0A0B0] text-xs font-medium max-w-sm mb-8 uppercase tracking-widest leading-relaxed">
                 To create new articles, edit rich text content, or manage categories, use the primary blog manager.
              </p>
              <AdminButton href="/admin/content/blog" icon={<MousePointerClick size={16} />}>Open Blog Manager</AdminButton>
           </div>
        </AdminCard>
      </div>
    </div>
  );
}
