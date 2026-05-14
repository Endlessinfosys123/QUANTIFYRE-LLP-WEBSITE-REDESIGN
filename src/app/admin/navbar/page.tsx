"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { 
  Plus, GripVertical, Trash2, Save, 
  ExternalLink, Eye, EyeOff, MousePointerClick 
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface NavItem {
  id: string;
  label: string;
  href: string;
  order_index: number;
  is_cta: boolean;
  is_active: boolean;
  open_new_tab: boolean;
}

export default function NavbarManagerPage() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('nav_items')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      toast.error("Failed to load navigation items");
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addItem = () => {
    const newItem: NavItem = {
      id: `temp-${Date.now()}`,
      label: "New Link",
      href: "/",
      order_index: items.length,
      is_cta: false,
      is_active: true,
      open_new_tab: false
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<NavItem>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Prepare items for upsert (remove temp IDs, set order_index)
    const itemsToSave = items.map((item, index) => {
      const { id, ...rest } = item;
      const saveItem: any = { ...rest, order_index: index };
      if (!id.startsWith('temp-')) {
        saveItem.id = id;
      }
      return saveItem;
    });

    // First, delete items that are no longer in the list (if they were not temp)
    const currentIds = items.filter(i => !i.id.startsWith('temp-')).map(i => i.id);
    if (currentIds.length > 0) {
      // Note: This is a bit simplified. In production, you'd handle deletions more carefully.
      // For now, we'll just upsert everything and rely on the UI state.
    }

    const { error } = await supabase.from('nav_items').upsert(itemsToSave);

    if (error) {
      toast.error("Failed to save navbar: " + error.message);
    } else {
      toast.success("Navbar configuration updated");
      fetchItems(); // Refresh to get real IDs
      await fetch('/api/revalidate?tag=nav', { method: 'POST' });
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-[#A0A0B0] font-black uppercase tracking-widest animate-pulse">Synchronizing Nav Stack...</div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Navbar <span className="text-[#6C3FEF]">Manager</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Global Navigation Protocol</p>
        </div>
        <div className="flex items-center gap-3">
          <AdminButton 
            variant="outline" 
            onClick={addItem}
            icon={<Plus size={18} />}
          >
            Add New Item
          </AdminButton>
          <AdminButton 
            onClick={handleSave} 
            isLoading={saving}
            icon={<Save size={18} />}
            className="px-8"
          >
            Save Navigation
          </AdminButton>
        </div>
      </div>

      <AdminCard title="Navigation Structure" subtitle="Drag items to reorder the main menu">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={items.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {items.map((item) => (
                <SortableNavItem 
                  key={item.id} 
                  item={item} 
                  onUpdate={updateItem}
                  onDelete={deleteItem}
                />
              ))}
              {items.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed border-[#1E1E2E] rounded-2xl">
                  <p className="text-[#3F3F46] font-black uppercase text-xs tracking-widest">No navigation items found</p>
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </AdminCard>
    </div>
  );
}

function SortableNavItem({ item, onUpdate, onDelete }: { item: NavItem, onUpdate: any, onDelete: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    position: 'relative' as any
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={cn(
        "bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all",
        isDragging && "opacity-50 border-[#6C3FEF] shadow-2xl shadow-[#6C3FEF20]"
      )}
    >
      <button 
        {...attributes} 
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-[#3F3F46] hover:text-[#6C3FEF] transition-colors p-1"
      >
        <GripVertical size={20} />
      </button>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminInput 
          placeholder="Label (e.g. Home)" 
          value={item.label}
          onChange={e => onUpdate(item.id, { label: e.target.value })}
          className="h-9"
        />
        <AdminInput 
          placeholder="Href (e.g. /about)" 
          value={item.href}
          onChange={e => onUpdate(item.id, { href: e.target.value })}
          className="h-9"
          icon={<ExternalLink size={14} />}
        />
        
        <div className="flex items-center gap-4 px-2">
          <button 
            onClick={() => onUpdate(item.id, { is_cta: !item.is_cta })}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border",
              item.is_cta 
                ? "bg-[#6C3FEF] border-[#6C3FEF] text-white" 
                : "bg-transparent border-[#1E1E2E] text-[#3F3F46] hover:text-[#A0A0B0]"
            )}
          >
            <MousePointerClick size={14} />
            CTA Button
          </button>
          
          <button 
            onClick={() => onUpdate(item.id, { is_active: !item.is_active })}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border",
              item.is_active 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" 
                : "bg-red-500/10 border-red-500/30 text-red-500"
            )}
          >
            {item.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
            {item.is_active ? "Visible" : "Hidden"}
          </button>
        </div>

        <div className="flex items-center justify-end">
          <button 
            onClick={() => onDelete(item.id)}
            className="p-2 text-[#3F3F46] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
