"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Save, Layers, Zap, Info, MousePointer2 } from "lucide-react";
import { toast } from "react-hot-toast";

const SECTIONS = [
  { id: 'hero', label: 'Hero Section', icon: Zap },
  { id: 'why_us', label: 'Why Choose Us', icon: Info },
  { id: 'sister_brand', label: 'Sister Brand', icon: Layers },
  { id: 'cta', label: 'Call to Action', icon: MousePointer2 },
];

export default function PageSectionsPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sectionData, setSectionData] = useState<any>(null);

  useEffect(() => {
    fetchSectionData();
  }, [activeSection]);

  const fetchSectionData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/get-content?table=page_sections&section_id=${activeSection}`);
      const data = await res.json();
      setSectionData(data.data || {
        section_id: activeSection,
        title: "",
        subtitle: "",
        description: "",
        badge_text: "",
        primary_cta_text: "",
        primary_cta_link: "",
        secondary_cta_text: "",
        secondary_cta_link: ""
      });
    } catch (error) {
      console.error("Failed to fetch section:", error);
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
          table: "page_sections",
          data: sectionData,
          revalidate_path: "/"
        }),
      });

      if (res.ok) {
        toast.success(`${SECTIONS.find(s => s.id === activeSection)?.label} updated!`);
      } else {
        toast.error("Failed to save changes.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-dark tracking-tighter">Page Sections</h1>
          <p className="text-text-secondary font-medium mt-1">Control all content blocks on your website</p>
        </div>
        <AdminButton 
          onClick={handleSave} 
          isLoading={saving}
          icon={<Save size={18} />}
        >
          Save Changes
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeSection === section.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-white text-text-secondary hover:bg-gray-50 border border-border'
              }`}
            >
              <section.icon size={18} />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Form */}
        <div className="lg:col-span-3">
          <AdminCard className="p-8">
            {loading ? (
              <div className="py-20 text-center text-text-secondary font-bold">Loading section data...</div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                   <h2 className="text-xl font-black text-dark">
                     Editing: {SECTIONS.find(s => s.id === activeSection)?.label}
                   </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <AdminInput 
                      label="Section Title" 
                      value={sectionData.title || ""}
                      onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                    />
                    <AdminInput 
                      label="Badge / Tag Text" 
                      value={sectionData.badge_text || ""}
                      onChange={(e) => setSectionData({ ...sectionData, badge_text: e.target.value })}
                    />
                    <AdminTextarea 
                      label="Main Description" 
                      value={sectionData.description || ""}
                      onChange={(e) => setSectionData({ ...sectionData, description: e.target.value })}
                      rows={5}
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-surface border border-border space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-primary">Primary Call to Action</h3>
                      <AdminInput 
                        label="Button Text" 
                        value={sectionData.primary_cta_text || ""}
                        onChange={(e) => setSectionData({ ...sectionData, primary_cta_text: e.target.value })}
                      />
                      <AdminInput 
                        label="Button Link" 
                        value={sectionData.primary_cta_link || ""}
                        onChange={(e) => setSectionData({ ...sectionData, primary_cta_link: e.target.value })}
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-surface border border-border space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Secondary Call to Action</h3>
                      <AdminInput 
                        label="Button Text" 
                        value={sectionData.secondary_cta_text || ""}
                        onChange={(e) => setSectionData({ ...sectionData, secondary_cta_text: e.target.value })}
                      />
                      <AdminInput 
                        label="Button Link" 
                        value={sectionData.secondary_cta_link || ""}
                        onChange={(e) => setSectionData({ ...sectionData, secondary_cta_link: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
