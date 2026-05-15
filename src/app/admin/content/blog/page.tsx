"use client";

import React, { useEffect, useState } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTextarea } from "@/components/admin/ui/AdminTextarea";
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/ui/AdminTable";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { TipTapEditor } from "@/components/admin/editor/TipTapEditor";
import { 
  Plus, Edit, Trash2, Save, 
  ArrowLeft, Search, FileText, Globe,
  Clock, User, Tag, Calendar
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BlogManagerPage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const supabase = createClient();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) toast.error("Failed to load blog posts");
    else setPosts(data || []);
    setLoading(false);
  };

  const handleEdit = (post: any) => {
    setEditingId(post.id);
    setEditForm(post);
    setActiveTab('content');
  };

  const handleCreate = () => {
    const newPost = {
      title: "",
      slug: "",
      excerpt: "",
      content: "<h2>Start your story...</h2>",
      cover_image: "",
      author: "QUANTIFYRE AI",
      category: "Technology",
      is_published: false,
      meta_title: "",
      meta_description: ""
    };
    setEditingId("new");
    setEditForm(newPost);
    setActiveTab('content');
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('blog_posts').upsert(editForm);

    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success("Intelligence report archived successfully");
      setEditingId(null);
      fetchPosts();
      await fetch('/api/revalidate?tag=blog', { method: 'POST' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm termination of this blog post?")) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) toast.error("Deactivation failed");
    else {
      toast.success("Post removed from index");
      fetchPosts();
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-black uppercase tracking-widest animate-pulse">Scanning Blog Archives...</div>;

  if (editingId) {
    return (
      <div className="space-y-8 max-w-5xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setEditingId(null)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#6C3FEF] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Archives
          </button>
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setEditForm({ ...editForm, is_published: !editForm.is_published })}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                editForm.is_published 
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" 
                  : "bg-amber-500/10 border-amber-500/30 text-amber-500"
              )}
            >
              {editForm.is_published ? "Status: Live" : "Status: Draft"}
            </button>
            <AdminButton onClick={handleSave} isLoading={saving} icon={<Save size={18} />}>
              Archive Post
            </AdminButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AdminCard>
              <div className="space-y-6">
                <AdminInput 
                  label="Post Title" 
                  placeholder="The Future of AI in Enterprise..."
                  value={editForm.title} 
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })} 
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Content Body</label>
                  <TipTapEditor 
                    content={editForm.content} 
                    onChange={content => setEditForm({ ...editForm, content })} 
                  />
                </div>
              </div>
            </AdminCard>
          </div>

          <div className="space-y-8">
            <AdminCard title="Metadata" subtitle="Post categorization & SEO">
              <div className="space-y-6">
                <AdminInput 
                  label="URL Slug" 
                  value={editForm.slug} 
                  onChange={e => setEditForm({ ...editForm, slug: e.target.value })} 
                />
                <AdminInput 
                  label="Category" 
                  value={editForm.category} 
                  onChange={e => setEditForm({ ...editForm, category: e.target.value })} 
                />
                <AdminInput 
                  label="Author" 
                  value={editForm.author} 
                  onChange={e => setEditForm({ ...editForm, author: e.target.value })} 
                />
                <AdminTextarea 
                  label="Excerpt (Short Summary)" 
                  value={editForm.excerpt} 
                  onChange={e => setEditForm({ ...editForm, excerpt: e.target.value })} 
                />
                <AdminInput 
                  label="Cover Image URL" 
                  value={editForm.cover_image} 
                  onChange={e => setEditForm({ ...editForm, cover_image: e.target.value })} 
                />
              </div>
            </AdminCard>

            <AdminCard title="Search Presence" subtitle="SEO Overrides">
              <div className="space-y-4">
                <AdminInput 
                  label="Meta Title" 
                  value={editForm.meta_title} 
                  onChange={e => setEditForm({ ...editForm, meta_title: e.target.value })} 
                />
                <AdminTextarea 
                  label="Meta Description" 
                  value={editForm.meta_description} 
                  onChange={e => setEditForm({ ...editForm, meta_description: e.target.value })} 
                />
              </div>
            </AdminCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Intelligence <span className="text-[#6C3FEF]">Blog</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Global Insight Management</p>
        </div>
        <AdminButton onClick={handleCreate} icon={<Plus size={18} />}>
          Draft New Intelligence
        </AdminButton>
      </div>

      <AdminCard>
        <AdminTable headers={["Post Details", "Category", "Status", "Actions"]}>
          {posts.map((post) => (
            <AdminTableRow key={post.id}>
              <AdminTableCell>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center text-slate-200 shadow-sm">
                    {post.cover_image ? (
                      <img src={post.cover_image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <FileText size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 uppercase text-[12px] tracking-wider">{post.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        <User size={10} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        <Calendar size={10} /> {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <AdminBadge variant="primary">{post.category}</AdminBadge>
              </AdminTableCell>
              <AdminTableCell>
                {post.is_published ? (
                  <AdminBadge variant="success">Published</AdminBadge>
                ) : (
                  <AdminBadge variant="warning">Draft</AdminBadge>
                )}
              </AdminTableCell>
              <AdminTableCell>
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => handleEdit(post)}
                    className="p-2 text-slate-400 hover:text-[#6C3FEF] hover:bg-[#6C3FEF]/5 rounded-lg transition-all"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </AdminTableCell>
            </AdminTableRow>
          ))}
          {posts.length === 0 && (
            <AdminTableRow>
              <AdminTableCell className="text-center py-20" colSpan={4}>
                <p className="text-slate-300 font-black uppercase text-xs tracking-widest italic">No blog posts found in archives</p>
              </AdminTableCell>
            </AdminTableRow>
          )}
        </AdminTable>
      </AdminCard>
    </div>
  );
}
