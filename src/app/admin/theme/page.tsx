"use client";

import React, { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminColorPicker } from "@/components/admin/ui/AdminColorPicker";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminToast } from "@/components/admin/ui/AdminToast";
import { ImageUpload } from "@/components/admin/modules/ImageUpload";
import { Save, Palette, Globe, Smartphone } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ThemeManager() {
  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as any });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");
      
      if (data) {
        const obj = data.reduce((acc: any, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setSettings(obj);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Prepare batch update
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
      }));

      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "site_settings",
          data: updates,
          revalidate_path: "/",
        }),
      });

      if (res.ok) {
        setToast({ show: true, message: "Theme settings updated!", type: "success" });
      }
    } catch (err) {
      setToast({ show: true, message: "Update failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tighter">
            Theme & Branding
          </h1>
          <p className="text-[#6B7280] font-medium">Customize your website&apos;s colors, logos, and identity.</p>
        </div>
        <AdminButton icon={<Save size={18} />} onClick={handleSave} isLoading={isSaving} disabled={isLoading}>
          Save Configuration
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <AdminCard title="Brand Colors" subtitle="Primary colors used throughout the site">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminColorPicker 
                label="Primary Color" 
                value={settings.primary_color || "#6C3FEF"}
                onChange={(val) => updateSetting("primary_color", val)}
              />
              <AdminColorPicker 
                label="Secondary Color" 
                value={settings.secondary_color || "#F3F0FF"}
                onChange={(val) => updateSetting("secondary_color", val)}
              />
              <AdminColorPicker 
                label="Accent Color" 
                value={settings.accent_color || "#10B981"}
                onChange={(val) => updateSetting("accent_color", val)}
              />
              <AdminColorPicker 
                label="Text Color" 
                value={settings.text_color || "#111827"}
                onChange={(val) => updateSetting("text_color", val)}
              />
            </div>
          </AdminCard>

          <AdminCard title="Logos & Icons" subtitle="Official branding assets">
            <div className="space-y-6">
              <ImageUpload 
                label="Main Navigation Logo" 
                value={settings.logo_main}
                onChange={(url) => updateSetting("logo_main", url)}
              />
              <ImageUpload 
                label="Footer Logo" 
                value={settings.logo_footer}
                onChange={(url) => updateSetting("logo_footer", url)}
              />
              <ImageUpload 
                label="Favicon (Browser Tab Icon)" 
                value={settings.favicon}
                onChange={(url) => updateSetting("favicon", url)}
              />
            </div>
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard title="Site Identity" subtitle="Global metadata and header settings">
            <div className="space-y-6">
              <AdminInput 
                label="Website Title" 
                value={settings.site_title}
                onChange={(e) => updateSetting("site_title", e.target.value)}
              />
              <AdminInput 
                label="Site Tagline" 
                value={settings.site_tagline}
                onChange={(e) => updateSetting("site_tagline", e.target.value)}
              />
              <AdminInput 
                label="Copyright Text" 
                value={settings.copyright_text}
                onChange={(e) => updateSetting("copyright_text", e.target.value)}
              />
            </div>
          </AdminCard>

          <AdminCard title="Navigation CTA" subtitle="The primary button in your header">
            <div className="space-y-6">
              <AdminInput 
                label="Button Text" 
                value={settings.nav_cta_text}
                onChange={(e) => updateSetting("nav_cta_text", e.target.value)}
              />
              <AdminInput 
                label="Button Link" 
                value={settings.nav_cta_link}
                onChange={(e) => updateSetting("nav_cta_link", e.target.value)}
              />
            </div>
          </AdminCard>
        </div>
      </div>

      <AdminToast 
        isVisible={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </div>
  );
}
