"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { 
  Save, Search, Globe, Share2, 
  Eye, Layout, CheckCircle2, AlertCircle,
  Link as LinkIcon, Image as ImageIcon
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PAGES = [
  { id: 'global', label: 'Global (Default)', path: '/' },
  { id: 'home', label: 'Home Page', path: '/' },
  { id: 'about', label: 'About Us', path: '/about' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'portfolio', label: 'Portfolio', path: '/portfolio' },
  { id: 'blog', label: 'Blog', path: '/blog' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

export default function SEOManagerPage() {
  const [activeTab, setActiveTab] = useState('global');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<Record<string, string>>({});
  
  const supabase = createClient();

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    const { data, error } = await supabase.from('site_config').select('*');
    if (error) {
      toast.error("Failed to load SEO configuration");
    } else {
      const configMap: Record<string, string> = {};
      data?.forEach(item => {
        configMap[item.key] = item.value;
      });
      setConfig(configMap);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(config)
      .filter(([key]) => key.startsWith('seo_') || key === 'meta_title' || key === 'meta_description')
      .map(([key, value]) => ({ key, value }));

    const { error } = await supabase.from('site_config').upsert(updates, { onConflict: 'key' });

    if (error) {
      toast.error("SEO synchronization failed: " + error.message);
    } else {
      toast.success("Search parameters committed successfully");
      await fetch('/api/revalidate?tag=global', { method: 'POST' });
    }
    setSaving(false);
  };

  const updateKey = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const getSEOValue = (pageId: string, type: 'title' | 'description') => {
    if (pageId === 'global') return config[`meta_${type}`] || "";
    return config[`seo_${pageId}_${type}`] || config[`meta_${type}`] || "";
  };

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Initializing SEO Matrix...</div>;

  const currentTitle = getSEOValue(activeTab, 'title');
  const currentDesc = getSEOValue(activeTab, 'description');
  const currentPath = PAGES.find(p => p.id === activeTab)?.path || "/";

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            SEO <span className="text-[#6C3FEF]">Manager</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Search Engine Optimization Protocol</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
          className="px-8 shadow-xl shadow-[#6C3FEF20]"
        >
          Commit Parameters
        </AdminButton>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs Sidebar */}
        <div className="lg:w-72 space-y-1">
          <div className="px-4 py-2 mb-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Indexable Pages</p>
          </div>
          {PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => setActiveTab(page.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === page.id 
                  ? "bg-[#6C3FEF] text-white shadow-xl shadow-[#6C3FEF30] translate-x-1" 
                  : "text-slate-500 hover:text-[#6C3FEF] hover:bg-white border border-transparent hover:border-slate-100"
              )}
            >
              <div className="flex items-center gap-3">
                {page.id === 'global' ? <Globe size={16} /> : <Layout size={16} />}
                {page.label}
              </div>
              {getSEOValue(page.id, 'title') && <CheckCircle2 size={14} className={activeTab === page.id ? "text-white/50" : "text-emerald-500"} />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Editor Card */}
            <AdminCard title={`${PAGES.find(p => p.id === activeTab)?.label} Parameters`}>
              <div className="space-y-6">
                <AdminInput 
                  label="Meta Title" 
                  value={activeTab === 'global' ? (config.meta_title || "") : (config[`seo_${activeTab}_title`] || "")} 
                  onChange={e => updateKey(activeTab === 'global' ? 'meta_title' : `seo_${activeTab}_title`, e.target.value)} 
                  placeholder={activeTab !== 'global' ? `Default: ${config.meta_title}` : "Enter primary title..."}
                />
                <AdminTextarea 
                  label="Meta Description" 
                  value={activeTab === 'global' ? (config.meta_description || "") : (config[`seo_${activeTab}_description`] || "")} 
                  onChange={e => updateKey(activeTab === 'global' ? 'meta_description' : `seo_${activeTab}_description`, e.target.value)} 
                  rows={4}
                  placeholder={activeTab !== 'global' ? `Default: ${config.meta_description}` : "Enter primary description..."}
                />
                
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[#6C3FEF] mb-4">
                    <Share2 size={14} />
                    <p className="text-[10px] font-black uppercase tracking-widest">OpenGraph Controls</p>
                  </div>
                  <AdminInput 
                    label="Social Share Image (URL)" 
                    value={activeTab === 'global' ? (config.og_image || "") : (config[`seo_${activeTab}_og_image`] || "")} 
                    onChange={e => updateKey(activeTab === 'global' ? 'og_image' : `seo_${activeTab}_og_image`, e.target.value)} 
                    icon={<ImageIcon size={14} />}
                  />
                </div>
              </div>
            </AdminCard>

            {/* Preview Card */}
            <div className="space-y-6">
              {/* Google Preview */}
              <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-slate-400">
                  <Search size={14} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Search Engine Simulator</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#202124] text-sm">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">Q</div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[#202124] leading-tight">Quantifyre LLP</span>
                      <span className="text-[10px] text-[#4d5156] leading-tight">https://quantifyrellp.space{currentPath}</span>
                    </div>
                  </div>
                  <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium leading-tight mt-2">
                    {currentTitle || "Site Meta Title - Quantifyre"}
                  </h3>
                  <p className="text-sm text-[#4d5156] leading-relaxed max-w-[600px] line-clamp-2 mt-1">
                    {currentDesc || "Please enter a meta description to see how your page will appear in search results. Optimization is key for visibility."}
                  </p>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-6">
                <div className="flex items-center gap-2 mb-4 text-[#6C3FEF]">
                  <AlertCircle size={14} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Optimization Tips</p>
                </div>
                <ul className="space-y-3">
                  <Tip text="Titles should be between 50-60 characters for optimal display." active={currentTitle.length >= 50 && currentTitle.length <= 60} />
                  <Tip text="Descriptions are most effective between 150-160 characters." active={currentDesc.length >= 150 && currentDesc.length <= 160} />
                  <Tip text="Ensure your target keyword is present in both title and description." active={currentTitle.toLowerCase().includes('ai') || currentDesc.toLowerCase().includes('ai')} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tip({ text, active }: { text: string, active: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <div className={cn(
        "mt-1 w-1.5 h-1.5 rounded-full",
        active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-300"
      )} />
      <p className={cn("text-[10px] font-bold tracking-wide", active ? "text-slate-900" : "text-slate-400")}>{text}</p>
    </li>
  );
}
