"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { 
  Save, Zap, Shield, Target, Eye, 
  BarChart3, Scale, History, Plus, Trash2
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  { id: 'hero', label: 'Hero', icon: Zap },
  { id: 'stats', label: 'Stats Bar', icon: BarChart3 },
  { id: 'mission-vision', label: 'Mission & Vision', icon: Target },
  { id: 'legal', label: 'Legal Card', icon: Scale },
];

export default function AboutPageEditor() {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [hero, setHero] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [mission, setMission] = useState<any>(null);
  const [vision, setVision] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [heroRes, statsRes, mvRes] = await Promise.all([
      supabase.from('hero_sections').select('*').eq('page', 'about').single(),
      supabase.from('about_stats').select('*').order('order_index'),
      supabase.from('about_mission_vision').select('*')
    ]);

    setHero(heroRes.data);
    setStats(statsRes.data || []);
    setMission(mvRes.data?.find((i: any) => i.type === 'mission'));
    setVision(mvRes.data?.find((i: any) => i.type === 'vision'));
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (activeTab === 'hero') {
        await supabase.from('hero_sections').upsert({ ...hero, page: 'about' }, { onConflict: 'page' });
      } else if (activeTab === 'stats') {
        await supabase.from('about_stats').upsert(stats);
      } else if (activeTab === 'mission-vision') {
        await supabase.from('about_mission_vision').upsert([mission, vision]);
      }
      toast.success("Section updated successfully");
      await fetch('/api/revalidate?path=/about', { method: 'POST' });
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-[#A0A0B0] font-black uppercase tracking-widest animate-pulse">Scanning Corporate Fragments...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            About <span className="text-[#6C3FEF]">Editor</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Company Logic Controller</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
          className="px-8"
        >
          Commit Segment
        </AdminButton>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
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

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {activeTab === 'hero' && (
                <AdminCard title="Hero Parameters" subtitle="About page introductory section">
                  <div className="space-y-6">
                    <AdminInput label="Badge Text" value={hero?.badge_text || ""} onChange={e => setHero({ ...hero, badge_text: e.target.value })} />
                    <AdminInput label="Heading Line 1" value={hero?.heading_line1 || ""} onChange={e => setHero({ ...hero, heading_line1: e.target.value })} />
                    <AdminInput label="Highlighted Word" value={hero?.heading_highlight || ""} onChange={e => setHero({ ...hero, heading_highlight: e.target.value })} />
                    <AdminTextarea label="Subtext" value={hero?.subtext || ""} onChange={e => setHero({ ...hero, subtext: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                      <AdminInput label="CTA 1 Label" value={hero?.cta1_label || ""} onChange={e => setHero({ ...hero, cta1_label: e.target.value })} />
                      <AdminInput label="CTA 1 Link" value={hero?.cta1_link || ""} onChange={e => setHero({ ...hero, cta1_link: e.target.value })} />
                    </div>
                  </div>
                </AdminCard>
              )}

              {activeTab === 'stats' && (
                <AdminCard title="Dashboard Stats" subtitle="Numerical proof of scale">
                  <div className="space-y-6">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="p-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl grid grid-cols-2 gap-4 relative group">
                        <AdminInput label="Value" value={stat.value} onChange={e => {
                          const newStats = [...stats];
                          newStats[idx].value = e.target.value;
                          setStats(newStats);
                        }} />
                        <AdminInput label="Label" value={stat.label} onChange={e => {
                          const newStats = [...stats];
                          newStats[idx].label = e.target.value;
                          setStats(newStats);
                        }} />
                      </div>
                    ))}
                  </div>
                </AdminCard>
              )}

              {activeTab === 'mission-vision' && (
                <div className="space-y-6">
                  <AdminCard title="Our Mission" icon={<Target size={18} className="text-[#6C3FEF]" />}>
                    <div className="space-y-4">
                      <AdminInput label="Heading" value={mission?.heading || ""} onChange={e => setMission({ ...mission, heading: e.target.value })} />
                      <AdminTextarea label="Body" value={mission?.body || ""} onChange={e => setMission({ ...mission, body: e.target.value })} />
                    </div>
                  </AdminCard>
                  <AdminCard title="Our Vision" icon={<Eye size={18} className="text-[#0EA5E9]" />}>
                    <div className="space-y-4">
                      <AdminInput label="Heading" value={vision?.heading || ""} onChange={e => setVision({ ...vision, heading: e.target.value })} />
                      <AdminTextarea label="Body" value={vision?.body || ""} onChange={e => setVision({ ...vision, body: e.target.value })} />
                    </div>
                  </AdminCard>
                </div>
              )}

              {activeTab === 'legal' && (
                <AdminCard title="Legal Identity" subtitle="Compliance and corporate data">
                   <div className="p-8 border-2 border-dashed border-[#1E1E2E] rounded-3xl text-center">
                      <p className="text-[#3F3F46] font-black uppercase text-[10px] tracking-widest mb-4">Legal card data is synchronized with Site Config</p>
                      <AdminButton variant="outline" href="/admin/site-config">Manage Corporate Data</AdminButton>
                   </div>
                </AdminCard>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
