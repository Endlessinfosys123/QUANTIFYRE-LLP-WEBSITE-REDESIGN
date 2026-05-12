"use client";

import React, { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminToast } from "@/components/admin/ui/AdminToast";
import { Save, Phone, Mail, MapPin, Share2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactInfoManager() {
  const [info, setInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as any });

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .single();
      
      if (data) {
        setInfo(data);
      } else {
        // Initial state if table is empty
        setInfo({
          email: "hello@quantifyre.com",
          phone: "+91 000 000 0000",
          address: "Your Office Address Here",
          google_map_embed: "",
          facebook_url: "",
          twitter_url: "",
          linkedin_url: "",
          instagram_url: "",
        });
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
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "contact_info",
          data: info,
          revalidate_path: "/contact",
        }),
      });

      if (res.ok) {
        setToast({ show: true, message: "Contact information updated!", type: "success" });
      }
    } catch (err) {
      setToast({ show: true, message: "Update failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tighter">
            Contact & Socials
          </h1>
          <p className="text-[#6B7280] font-medium">Manage your office details and social media presence.</p>
        </div>
        <AdminButton icon={<Save size={18} />} onClick={handleSave} isLoading={isSaving} disabled={isLoading}>
          Save Contact Details
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <AdminCard title="Primary Contacts" subtitle="Phone, email and office address">
            <div className="space-y-6">
              <AdminInput 
                label="Public Email Address" 
                icon={<Mail size={18} />}
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
              />
              <AdminInput 
                label="Public Phone Number" 
                icon={<Phone size={18} />}
                value={info.phone}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              />
              <AdminTextarea 
                label="Office Address" 
                value={info.address}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
              />
            </div>
          </AdminCard>

          <AdminCard title="Google Maps" subtitle="Embed your office location">
            <div className="space-y-6">
              <AdminTextarea 
                label="Map Embed Code (iframe)" 
                placeholder='<iframe src="..." ...></iframe>'
                value={info.google_map_embed}
                onChange={(e) => setInfo({ ...info, google_map_embed: e.target.value })}
              />
              {info.google_map_embed && (
                <div className="rounded-xl overflow-hidden border border-[#E5E7EB] aspect-video">
                  <div dangerouslySetInnerHTML={{ __html: info.google_map_embed }} className="w-full h-full" />
                </div>
              )}
            </div>
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard title="Social Media Profiles" subtitle="Links to your official social pages">
            <div className="space-y-6">
              <AdminInput 
                label="LinkedIn URL" 
                placeholder="https://linkedin.com/company/..."
                value={info.linkedin_url}
                onChange={(e) => setInfo({ ...info, linkedin_url: e.target.value })}
              />
              <AdminInput 
                label="Instagram URL" 
                placeholder="https://instagram.com/..."
                value={info.instagram_url}
                onChange={(e) => setInfo({ ...info, instagram_url: e.target.value })}
              />
              <AdminInput 
                label="Facebook URL" 
                placeholder="https://facebook.com/..."
                value={info.facebook_url}
                onChange={(e) => setInfo({ ...info, facebook_url: e.target.value })}
              />
              <AdminInput 
                label="Twitter / X URL" 
                placeholder="https://x.com/..."
                value={info.twitter_url}
                onChange={(e) => setInfo({ ...info, twitter_url: e.target.value })}
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
