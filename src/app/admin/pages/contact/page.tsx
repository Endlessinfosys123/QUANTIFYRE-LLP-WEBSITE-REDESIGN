"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { 
  Save, Zap, Mail, MessageSquare, 
  AtSign, Phone, MapPin, Bell, 
  Settings, CheckCircle2
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  { id: 'hero', label: 'Hero', icon: Zap },
  { id: 'hello', label: 'Say Hello Card', icon: MessageSquare },
  { id: 'form', label: 'Form Config', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function ContactPageEditor() {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [hero, setHero] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);
  const [siteConfig, setSiteConfig] = useState<any>({});

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [heroRes, configRes, siteRes] = await Promise.all([
      supabase.from('hero_sections').select('*').eq('page', 'contact').single(),
      supabase.from('contact_form_config').select('*').single(),
      supabase.from('site_config').select('*')
    ]);

    setHero(heroRes.data);
    setConfig(configRes.data);
    
    const scMap: any = {};
    siteRes.data?.forEach(item => scMap[item.key] = item.value);
    setSiteConfig(scMap);
    
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (activeTab === 'hero') {
        await supabase.from('hero_sections').upsert({ ...hero, page: 'contact' }, { onConflict: 'page' });
      } else if (activeTab === 'hello') {
        const updates = Object.entries(siteConfig)
          .filter(([key]) => ['email', 'phone_primary', 'phone_alternate', 'address_full', 'map_embed_url'].includes(key))
          .map(([key, value]) => ({ key, value }));
        await supabase.from('site_config').upsert(updates, { onConflict: 'key' });
      } else {
        await supabase.from('contact_form_config').upsert(config);
      }
      toast.success("Contact parameters synchronized");
      await fetch('/api/revalidate?path=/contact', { method: 'POST' });
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Initializing Communication Uplink...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Contact <span className="text-[#6C3FEF]">Editor</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Inbound Signal Configuration</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
          className="px-8"
        >
          Commit Parameters
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
                  ? "bg-[#6C3FEF] text-white shadow-xl shadow-[#6C3FEF30] translate-x-1" 
                  : "text-slate-500 hover:text-[#6C3FEF] hover:bg-white"
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
                <AdminCard title="Hero Architecture" subtitle="Contact page introductory section">
                  <div className="space-y-6">
                    <AdminInput label="Badge Text" value={hero?.badge_text || ""} onChange={e => setHero({ ...hero, badge_text: e.target.value })} />
                    <AdminInput label="Heading" value={hero?.heading_line1 || ""} onChange={e => setHero({ ...hero, heading_line1: e.target.value })} />
                    <AdminTextarea label="Subtext" value={hero?.subtext || ""} onChange={e => setHero({ ...hero, subtext: e.target.value })} />
                  </div>
                </AdminCard>
              )}

              {activeTab === 'hello' && (
                <AdminCard title="Say Hello Card" subtitle="Public contact information details">
                  <div className="space-y-6">
                    <AdminInput label="Email Identity" icon={<AtSign size={16} />} value={siteConfig.email || ""} onChange={e => setSiteConfig({ ...siteConfig, email: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                      <AdminInput label="Primary Line" icon={<Phone size={16} />} value={siteConfig.phone_primary || ""} onChange={e => setSiteConfig({ ...siteConfig, phone_primary: e.target.value })} />
                      <AdminInput label="Alternate Line" icon={<Phone size={16} />} value={siteConfig.phone_alternate || ""} onChange={e => setSiteConfig({ ...siteConfig, phone_alternate: e.target.value })} />
                    </div>
                    <AdminTextarea label="Office Address" icon={<MapPin size={16} />} value={siteConfig.address_full || ""} onChange={e => setSiteConfig({ ...siteConfig, address_full: e.target.value })} />
                    <AdminInput label="Map Embed URL" value={siteConfig.map_embed_url || ""} onChange={e => setSiteConfig({ ...siteConfig, map_embed_url: e.target.value })} />
                  </div>
                </AdminCard>
              )}

              {activeTab === 'form' && (
                <AdminCard title="Contact Form Configuration" subtitle="Inbound data capture settings">
                  <div className="space-y-6">
                    <AdminInput label="Form Heading" value={config?.form_heading || ""} onChange={e => setConfig({ ...config, form_heading: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                       <AdminInput label="Submit Button Label" value={config?.submit_btn_label || ""} onChange={e => setConfig({ ...config, submit_btn_label: e.target.value })} />
                       <AdminInput label="Success Toast Message" value={config?.success_message || ""} onChange={e => setConfig({ ...config, success_message: e.target.value })} />
                    </div>
                    <AdminTextarea label="Trust Text (below button)" value={config?.trust_text || ""} onChange={e => setConfig({ ...config, trust_text: e.target.value })} />
                  </div>
                </AdminCard>
              )}

              {activeTab === 'notifications' && (
                <AdminCard title="Notification Protocol" subtitle="Internal signal routing">
                  <div className="space-y-6">
                    <AdminInput label="Destination Email" icon={<Mail size={16} />} value={config?.notification_email || ""} onChange={e => setConfig({ ...config, notification_email: e.target.value })} />
                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                       <div className="flex items-center gap-3">
                          <CheckCircle2 className={config?.send_auto_reply ? "text-emerald-500" : "text-slate-300"} size={20} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Send Auto-Reply to Client</span>
                       </div>
                       <button 
                        onClick={() => setConfig({ ...config, send_auto_reply: !config.send_auto_reply })}
                        className={cn(
                          "w-12 h-6 rounded-full transition-all relative",
                          config?.send_auto_reply ? "bg-[#6C3FEF]" : "bg-slate-200"
                        )}
                       >
                          <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-all", config?.send_auto_reply ? "right-1" : "left-1")} />
                       </button>
                    </div>
                    {config?.send_auto_reply && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                        <AdminInput label="Auto-Reply Subject" value={config?.auto_reply_subject || ""} onChange={e => setConfig({ ...config, auto_reply_subject: e.target.value })} />
                        <AdminTextarea label="Auto-Reply Body" value={config?.auto_reply_body || ""} onChange={e => setConfig({ ...config, auto_reply_body: e.target.value })} />
                      </motion.div>
                    )}
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
