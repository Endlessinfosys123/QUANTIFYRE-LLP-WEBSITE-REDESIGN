"use client";

import React, { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ImageUpload } from "@/components/admin/modules/ImageUpload";
import { AdminToast } from "@/components/admin/ui/AdminToast";
import { Save, RefreshCw, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function HeroManager() {
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    cta_text: "",
    cta_link: "",
    image_url: "",
    bg_color: "#FFFFFF",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as any });

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    setIsLoading(true);
    try {
      const { data: heroData, error } = await supabase
        .from("page_content")
        .select("content")
        .eq("section", "hero")
        .single();

      if (heroData) {
        setData(heroData.content);
      }
    } catch (err) {
      console.error("Error fetching hero data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "page_content",
          data: {
            section: "hero",
            content: data,
          },
          revalidate_path: "/",
        }),
      });

      const result = await res.json();
      if (result.success) {
        setToast({ show: true, message: "Hero section updated successfully!", type: "success" });
      } else {
        setToast({ show: true, message: "Error: " + result.error, type: "error" });
      }
    } catch (err) {
      setToast({ show: true, message: "Failed to save data.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tighter">
            Hero Manager
          </h1>
          <p className="text-[#6B7280] font-medium">Control the main landing section of your website.</p>
        </div>
        <div className="flex items-center gap-3">
          <AdminButton variant="outline" icon={<Eye size={18} />} href="/" target="_blank">
            Preview Live
          </AdminButton>
          <AdminButton 
            icon={<Save size={18} />} 
            onClick={handleSave} 
            isLoading={isSaving}
            disabled={isLoading}
          >
            Save Changes
          </AdminButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <AdminCard title="Primary Content">
            <div className="space-y-6">
              <AdminInput 
                label="Main Title (H1)" 
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Empowering Your Digital Future"
              />
              <AdminTextarea 
                label="Subtitle / Description" 
                value={data.subtitle}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                placeholder="Enter a compelling description..."
              />
              <div className="grid grid-cols-2 gap-4">
                <AdminInput 
                  label="CTA Button Text" 
                  value={data.cta_text}
                  onChange={(e) => setData({ ...data, cta_text: e.target.value })}
                  placeholder="Get Started"
                />
                <AdminInput 
                  label="CTA Button Link" 
                  value={data.cta_link}
                  onChange={(e) => setData({ ...data, cta_link: e.target.value })}
                  placeholder="/contact"
                />
              </div>
            </div>
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard title="Visuals & Branding">
            <div className="space-y-6">
              <ImageUpload 
                label="Hero Image / Illustration" 
                value={data.image_url}
                onChange={(url) => setData({ ...data, image_url: url })}
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
