"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { 
  Save, Layout, Zap, Rocket, 
  ExternalLink, Layers, Terminal, ListPlus,
  Trash2
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  { id: 'hero', label: 'Hero Section', icon: Zap },
  { id: 'cta', label: 'Global CTA', icon: Rocket },
  { id: 'sister', label: 'Sister Brand', icon: Layers },
];

export default function HomePageEditor() {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Data States
  const [hero, setHero] = useState<any>(null);
  const [cta, setCta] = useState<any>(null);
  const [sister, setSister] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [heroRes, ctaRes, sisterRes] = await Promise.all([
      supabase.from('hero_sections').select('*').eq('page', 'home').single(),
      supabase.from('cta_sections').select('*').eq('page', 'global').single(),
      supabase.from('sister_brand').select('*').limit(1).single()
    ]);

    setHero(heroRes.data);
    setCta(ctaRes.data);
    setSister(sisterRes.data);
    setLoading(false);
  };

  const handleSaveHero = async () => {
    setSaving(true);
    const { error } = await supabase.from('hero_sections').upsert({
      ...hero,
      page: 'home'
    }, { onConflict: 'page' });

    if (error) toast.error("Hero update failed");
    else toast.success("Hero section synchronized");
    setSaving(false);
  };

  const handleSaveCTA = async () => {
    setSaving(true);
    const { error } = await supabase.from('cta_sections').upsert({
      ...cta,
      page: 'global'
    }, { onConflict: 'page' });

    if (error) toast.error("CTA update failed");
    else toast.success("Global CTA updated");
    setSaving(false);
  };

  const handleSaveSister = async () => {
    setSaving(true);
    const { error } = await supabase.from('sister_brand').upsert(sister);

    if (error) toast.error("Sister brand update failed");
    else toast.success("Sister brand data saved");
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-[#A0A0B0] font-black uppercase tracking-widest animate-pulse">Accessing Page Fragments...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Home <span className="text-[#6C3FEF]">Editor</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Landing Page Matrix</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === tab.id 
                  ? "bg-[#6C3FEF] text-white shadow-lg shadow-[#6C3FEF20]" 
                  : "text-[#A0A0B0] hover:text-white hover:bg-[#13131F]"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'hero' && (
              <motion.div key="hero" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <AdminCard 
                  title="Hero Architecture" 
                  subtitle="Primary conversion zone"
                  headerAction={<AdminButton onClick={handleSaveHero} isLoading={saving} size="sm">Sync Hero</AdminButton>}
                >
                  <div className="space-y-6">
                    <AdminInput 
                      label="Badge Text" 
                      value={hero?.badge_text || ""} 
                      onChange={e => setHero({ ...hero, badge_text: e.target.value })} 
                    />
                    <AdminInput 
                      label="Main Heading Line 1" 
                      value={hero?.heading_line1 || ""} 
                      onChange={e => setHero({ ...hero, heading_line1: e.target.value })} 
                    />
                    <AdminTextarea 
                      label="Subtext" 
                      value={hero?.subtext || ""} 
                      onChange={e => setHero({ ...hero, subtext: e.target.value })} 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <AdminInput 
                        label="CTA 1 Label" 
                        value={hero?.cta1_label || ""} 
                        onChange={e => setHero({ ...hero, cta1_label: e.target.value })} 
                      />
                      <AdminInput 
                        label="CTA 1 Link" 
                        value={hero?.cta1_link || ""} 
                        onChange={e => setHero({ ...hero, cta1_link: e.target.value })} 
                      />
                    </div>
                    
                    <div className="pt-6 border-t border-[#1E1E2E]">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6C3FEF] mb-4">System Badges (Ticker)</h4>
                      <div className="space-y-3">
                        {hero?.extra_json?.system_badges?.map((badge: string, index: number) => (
                          <div key={index} className="flex gap-2">
                            <AdminInput 
                              value={badge} 
                              onChange={e => {
                                const newBadges = [...hero.extra_json.system_badges];
                                newBadges[index] = e.target.value;
                                setHero({ ...hero, extra_json: { ...hero.extra_json, system_badges: newBadges } });
                              }}
                              className="h-9"
                            />
                            <button 
                              onClick={() => {
                                const newBadges = hero.extra_json.system_badges.filter((_: any, i: number) => i !== index);
                                setHero({ ...hero, extra_json: { ...hero.extra_json, system_badges: newBadges } });
                              }}
                              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newBadges = [...(hero?.extra_json?.system_badges || []), "New Badge"];
                            setHero({ ...hero, extra_json: { ...(hero?.extra_json || {}), system_badges: newBadges } });
                          }}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#A0A0B0] hover:text-[#6C3FEF] transition-colors"
                        >
                          <ListPlus size={14} /> Add Badge
                        </button>
                      </div>
                    </div>
                  </div>
                </AdminCard>
              </motion.div>
            )}

            {activeTab === 'cta' && (
              <motion.div key="cta" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <AdminCard 
                  title="Global CTA Section" 
                  subtitle="Bottom of page conversion"
                  headerAction={<AdminButton onClick={handleSaveCTA} isLoading={saving} size="sm">Sync CTA</AdminButton>}
                >
                  <div className="space-y-6">
                    <AdminInput 
                      label="Section Label" 
                      value={cta?.section_label || ""} 
                      onChange={e => setCta({ ...cta, section_label: e.target.value })} 
                    />
                    <AdminInput 
                      label="Main Heading" 
                      value={cta?.heading || ""} 
                      onChange={e => setCta({ ...cta, heading: e.target.value })} 
                    />
                    <AdminTextarea 
                      label="Subtext" 
                      value={cta?.subtext || ""} 
                      onChange={e => setCta({ ...cta, subtext: e.target.value })} 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <AdminInput 
                        label="Button 1 Label" 
                        value={cta?.btn1_label || ""} 
                        onChange={e => setCta({ ...cta, btn1_label: e.target.value })} 
                      />
                      <AdminInput 
                        label="Button 1 Link" 
                        value={cta?.btn1_link || ""} 
                        onChange={e => setCta({ ...cta, btn1_link: e.target.value })} 
                      />
                    </div>
                  </div>
                </AdminCard>
              </motion.div>
            )}

            {activeTab === 'sister' && (
              <motion.div key="sister" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <AdminCard 
                  title="Sister Brand Module" 
                  subtitle="EndlessInfosys integration"
                  headerAction={<AdminButton onClick={handleSaveSister} isLoading={saving} size="sm">Sync Brand</AdminButton>}
                >
                  <div className="space-y-6">
                    <AdminInput 
                      label="Brand Name" 
                      value={sister?.brand_name || ""} 
                      onChange={e => setSister({ ...sister, brand_name: e.target.value })} 
                    />
                    <AdminInput 
                      label="Section Label" 
                      value={sister?.section_label || ""} 
                      onChange={e => setSister({ ...sister, section_label: e.target.value })} 
                    />
                    <AdminInput 
                      label="Heading" 
                      value={sister?.heading || ""} 
                      onChange={e => setSister({ ...sister, heading: e.target.value })} 
                    />
                    <AdminTextarea 
                      label="Description" 
                      value={sister?.description || ""} 
                      onChange={e => setSister({ ...sister, description: e.target.value })} 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <AdminInput 
                        label="CTA Label" 
                        value={sister?.cta_label || ""} 
                        onChange={e => setSister({ ...sister, cta_label: e.target.value })} 
                      />
                      <AdminInput 
                        label="CTA Link" 
                        value={sister?.cta_link || ""} 
                        onChange={e => setSister({ ...sister, cta_link: e.target.value })} 
                      />
                    </div>
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
