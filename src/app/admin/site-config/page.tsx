"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { 
  Save, Globe, Shield, MessageSquare, 
  Code, Image as ImageIcon, Layout,
  AtSign, Phone, MapPin, Share2, Palette,
  Terminal, Search, Zap
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  { id: 'general', label: 'General', icon: Layout },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'contact', label: 'Contact', icon: AtSign },
  { id: 'social', label: 'Social', icon: Share2 },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'footer', label: 'Footer', icon: Shield },
  { id: 'advanced', label: 'Advanced', icon: Terminal },
];

export default function SiteConfigPage() {
  const [activeTab, setActiveTab] = useState('general');
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
      toast.error("Failed to load configuration");
    } else {
      const configMap: Record<string, string> = {};
      data.forEach(item => {
        configMap[item.key] = item.value;
      });
      setConfig(configMap);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(config).map(([key, value]) => ({
      key,
      value
    }));

    const { error } = await supabase.from('site_config').upsert(updates, { onConflict: 'key' });

    if (error) {
      toast.error("Failed to save changes: " + error.message);
    } else {
      toast.success("System configuration updated successfully");
      // Trigger revalidation
      try {
        await fetch('/api/revalidate?tag=global', { method: 'POST' });
      } catch (e) {
        console.error("Revalidation failed", e);
      }
    }
    setSaving(false);
  };

  const updateKey = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Initializing Data Stream...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Site <span className="text-[#6C3FEF]">Configuration</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Master Control Unit</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
          className="px-8"
        >
          Commit Changes
        </AdminButton>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs Sidebar */}
        <div className="lg:w-64 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === tab.id 
                  ? "bg-[#6C3FEF] text-white shadow-xl shadow-[#6C3FEF30] translate-x-1" 
                  : "text-slate-500 hover:text-[#6C3FEF] hover:bg-white"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'general' && (
                <AdminCard title="General Identity" subtitle="Primary site identifiers">
                  <div className="space-y-6">
                    <AdminInput 
                      label="Site Name" 
                      value={config.site_name || ""} 
                      onChange={e => updateKey('site_name', e.target.value)} 
                    />
                    <AdminInput 
                      label="Tagline" 
                      value={config.tagline || ""} 
                      onChange={e => updateKey('tagline', e.target.value)} 
                    />
                    <AdminInput 
                      label="LLPIN / Registration" 
                      value={config.llpin || ""} 
                      onChange={e => updateKey('llpin', e.target.value)} 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <AdminInput 
                        label="Loading Bar Text" 
                        value={config.loading_bar_text || ""} 
                        onChange={e => updateKey('loading_bar_text', e.target.value)} 
                      />
                      <AdminInput 
                        label="Loading Bar Sub" 
                        value={config.loading_bar_sub || ""} 
                        onChange={e => updateKey('loading_bar_sub', e.target.value)} 
                      />
                    </div>
                  </div>
                </AdminCard>
              )}

              {activeTab === 'seo' && (
                <AdminCard title="Search & Indexing" subtitle="Global SEO parameters">
                  <div className="space-y-6">
                    <AdminInput 
                      label="Default Meta Title" 
                      value={config.meta_title || ""} 
                      onChange={e => updateKey('meta_title', e.target.value)} 
                    />
                    <AdminTextarea 
                      label="Default Meta Description" 
                      value={config.meta_description || ""} 
                      onChange={e => updateKey('meta_description', e.target.value)} 
                    />
                    <AdminInput 
                      label="Google Analytics ID" 
                      value={config.google_analytics_id || ""} 
                      onChange={e => updateKey('google_analytics_id', e.target.value)} 
                    />
                  </div>
                </AdminCard>
              )}

              {activeTab === 'contact' && (
                <AdminCard title="Contact Channels" subtitle="Public communication methods">
                  <div className="space-y-6">
                    <AdminInput 
                      label="Primary Email" 
                      icon={<AtSign size={16} />}
                      value={config.email || ""} 
                      onChange={e => updateKey('email', e.target.value)} 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <AdminInput 
                        label="Primary Phone" 
                        icon={<Phone size={16} />}
                        value={config.phone_primary || ""} 
                        onChange={e => updateKey('phone_primary', e.target.value)} 
                      />
                      <AdminInput 
                        label="Alternate Phone" 
                        icon={<Phone size={16} />}
                        value={config.phone_alternate || ""} 
                        onChange={e => updateKey('phone_alternate', e.target.value)} 
                      />
                    </div>
                    <AdminTextarea 
                      label="Full Office Address" 
                      icon={<MapPin size={16} />}
                      value={config.address_full || ""} 
                      onChange={e => updateKey('address_full', e.target.value)} 
                    />
                    <AdminInput 
                      label="Map Embed URL" 
                      value={config.map_embed_url || ""} 
                      onChange={e => updateKey('map_embed_url', e.target.value)} 
                    />
                  </div>
                </AdminCard>
              )}

              {activeTab === 'social' && (
                <AdminCard title="Social Networks" subtitle="External platform connections">
                  <div className="space-y-6">
                    <AdminInput 
                      label="LinkedIn URL" 
                      value={config.linkedin_url || ""} 
                      onChange={e => updateKey('linkedin_url', e.target.value)} 
                    />
                    <AdminInput 
                      label="Instagram URL" 
                      value={config.instagram_url || ""} 
                      onChange={e => updateKey('instagram_url', e.target.value)} 
                    />
                    <AdminInput 
                      label="Twitter/X URL" 
                      value={config.twitter_url || ""} 
                      onChange={e => updateKey('twitter_url', e.target.value)} 
                    />
                  </div>
                </AdminCard>
              )}

              {activeTab === 'branding' && (
                <AdminCard title="Visual Identity" subtitle="Logos and color tokens">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <AdminInput 
                        label="Header Logo Path" 
                        value={config.logo_header || ""} 
                        onChange={e => updateKey('logo_header', e.target.value)} 
                      />
                      <AdminInput 
                        label="Footer Logo Path" 
                        value={config.logo_footer || ""} 
                        onChange={e => updateKey('logo_footer', e.target.value)} 
                      />
                    </div>
                    <AdminInput 
                      label="Favicon Path" 
                      value={config.favicon || ""} 
                      onChange={e => updateKey('favicon', e.target.value)} 
                    />
                  </div>
                </AdminCard>
              )}

              {activeTab === 'footer' && (
                <AdminCard title="Footer content" subtitle="Bottom area messaging">
                  <div className="space-y-6">
                    <AdminInput 
                      label="Footer Tagline" 
                      value={config.footer_tagline || ""} 
                      onChange={e => updateKey('footer_tagline', e.target.value)} 
                    />
                    <AdminTextarea 
                      label="Footer Description" 
                      value={config.footer_description || ""} 
                      onChange={e => updateKey('footer_description', e.target.value)} 
                    />
                    <AdminInput 
                      label="International Presence" 
                      value={config.international_presence || ""} 
                      onChange={e => updateKey('international_presence', e.target.value)} 
                    />
                    <AdminInput 
                      label="Copyright Text" 
                      value={config.copyright_text || ""} 
                      onChange={e => updateKey('copyright_text', e.target.value)} 
                    />
                  </div>
                </AdminCard>
              )}

              {activeTab === 'advanced' && (
                <AdminCard title="Advanced Control" subtitle="Raw code and system parameters">
                  <div className="space-y-6">
                    <AdminTextarea 
                      label="Custom CSS" 
                      placeholder="/* Injected into head */"
                      value={config.custom_css || ""} 
                      onChange={e => updateKey('custom_css', e.target.value)} 
                    />
                    <AdminTextarea 
                      label="Robots.txt" 
                      value={config.robots_txt || ""} 
                      onChange={e => updateKey('robots_txt', e.target.value)} 
                    />
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
