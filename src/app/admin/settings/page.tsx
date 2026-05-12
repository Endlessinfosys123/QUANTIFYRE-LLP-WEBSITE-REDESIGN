"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Save, Globe, Shield, MessageSquare, Code, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";

export default function GlobalSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>({
    site_name: "QUANTIFYRE LLP",
    site_tagline: "The Future, Faster",
    meta_title_suffix: "| QUANTIFYRE LLP",
    meta_description: "",
    meta_keywords: "",
    contact_email: "info@quantifyre.com",
    contact_phone: "",
    office_address: "",
    primary_color: "#6C3FEF",
    secondary_color: "#4ADE80",
    social_links: { instagram: "", linkedin: "", twitter: "", github: "" }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/get-content?table=site_settings&id=global");
      const data = await res.json();
      if (data.data) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "site_settings",
          data: { ...settings, id: "global" },
          revalidate_tag: "settings"
        }),
      });

      if (res.ok) {
        toast.success("Global settings updated!");
      } else {
        toast.error("Failed to save settings.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-dark tracking-tighter">Global Settings</h1>
          <p className="text-text-secondary font-medium mt-1">Manage branding, SEO, and contact information</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
        >
          Save Changes
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branding & Visuals */}
        <div className="space-y-8">
          <AdminCard className="p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Shield size={20} />
              </div>
              <h2 className="text-lg font-bold">Brand Identity</h2>
            </div>
            
            <div className="space-y-5">
              <AdminInput 
                label="Site Name" 
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              />
              <AdminInput 
                label="Tagline" 
                value={settings.site_tagline}
                onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <AdminInput 
                  label="Primary Color" 
                  type="color"
                  value={settings.primary_color}
                  onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                />
                <AdminInput 
                  label="Secondary Color" 
                  type="color"
                  value={settings.secondary_color}
                  onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                />
              </div>
            </div>
          </AdminCard>

          <AdminCard className="p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Globe size={20} />
              </div>
              <h2 className="text-lg font-bold">Search Engine Optimization (SEO)</h2>
            </div>
            
            <div className="space-y-5">
              <AdminInput 
                label="Meta Title Suffix" 
                placeholder="| QUANTIFYRE LLP"
                value={settings.meta_title_suffix}
                onChange={(e) => setSettings({ ...settings, meta_title_suffix: e.target.value })}
              />
              <AdminTextarea 
                label="Global Meta Description" 
                value={settings.meta_description}
                onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                rows={3}
              />
              <AdminTextarea 
                label="Keywords (comma separated)" 
                value={settings.meta_keywords}
                onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                rows={2}
              />
            </div>
          </AdminCard>
        </div>

        {/* Contact & Socials */}
        <div className="space-y-8">
          <AdminCard className="p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare size={20} />
              </div>
              <h2 className="text-lg font-bold">Contact Information</h2>
            </div>
            
            <div className="space-y-5">
              <AdminInput 
                label="Public Email" 
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              />
              <AdminInput 
                label="Public Phone" 
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              />
              <AdminTextarea 
                label="Office Address" 
                value={settings.office_address}
                onChange={(e) => setSettings({ ...settings, office_address: e.target.value })}
                rows={2}
              />
            </div>
          </AdminCard>

          <AdminCard className="p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Code size={20} />
              </div>
              <h2 className="text-lg font-bold">Social Media Links</h2>
            </div>
            
            <div className="space-y-5">
              {['instagram', 'linkedin', 'twitter', 'github'].map((platform) => (
                <AdminInput 
                  key={platform}
                  label={platform.charAt(0).toUpperCase() + platform.slice(1)} 
                  placeholder={`https://${platform}.com/...`}
                  value={settings.social_links?.[platform] || ""}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    social_links: { ...settings.social_links, [platform]: e.target.value } 
                  })}
                />
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
