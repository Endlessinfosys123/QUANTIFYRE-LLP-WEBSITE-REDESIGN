"use client";

import React, { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/ui/AdminTable";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminConfirmDialog } from "@/components/admin/ui/AdminConfirmDialog";
import { AdminToast } from "@/components/admin/ui/AdminToast";
import { AdminSelect } from "@/components/admin/ui/AdminSelect";
import { RichTextEditor } from "@/components/admin/modules/RichTextEditor";
import { ImageUpload } from "@/components/admin/modules/ImageUpload";
import { 
  Plus, Edit2, Trash2, Save, PenTool, 
  Search, Loader2, Calendar, User
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function BlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activePost, setActivePost] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as any });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (post: any = null) => {
    setActivePost(post || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      author: "",
      status: "draft",
      tags: [],
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!activePost.title || !activePost.slug) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "blog_posts",
          data: {
            ...activePost,
            published_at: activePost.status === 'published' && !activePost.published_at ? new Date().toISOString() : activePost.published_at
          },
          revalidate_path: "/blog",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ show: true, message: "Blog post saved successfully!", type: "success" });
        setIsModalOpen(false);
        fetchPosts();
      }
    } catch (err) {
      setToast({ show: true, message: "Failed to save post.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activePost?.id) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "blog_posts",
          id: activePost.id,
          revalidate_path: "/blog",
        }),
      });
      if (res.ok) {
        setToast({ show: true, message: "Post deleted successfully!", type: "success" });
        setIsConfirmOpen(false);
        fetchPosts();
      }
    } catch (err) {
      setToast({ show: true, message: "Delete failed.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tighter">
            Blog Manager
          </h1>
          <p className="text-[#6B7280] font-medium">Create and publish articles to your blog.</p>
        </div>
        <AdminButton icon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          New Article
        </AdminButton>
      </div>

      <AdminCard noPadding>
        <div className="p-4 border-b border-[#E5E7EB]">
          <AdminInput 
            icon={<Search size={18} />} 
            placeholder="Search articles by title or author..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#6C3FEF]" size={40} />
            <p className="mt-4 font-bold text-[#6B7280]">Loading articles...</p>
          </div>
        ) : (
          <AdminTable headers={["Article", "Author", "Status", "Date", "Actions"]}>
            {filteredPosts.map((post) => (
              <AdminTableRow key={post.id}>
                <AdminTableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-[#E5E7EB]">
                      {post.featured_image ? <img src={post.featured_image} className="w-full h-full object-cover" /> : <PenTool size={18} className="m-auto mt-2.5 text-[#9CA3AF]" />}
                    </div>
                    <div className="max-w-[300px]">
                      <p className="font-bold text-[#111827] truncate">{post.title}</p>
                      <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">/{post.slug}</p>
                    </div>
                  </div>
                </AdminTableCell>
                <AdminTableCell>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-[#9CA3AF]" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                </AdminTableCell>
                <AdminTableCell>
                  <AdminBadge variant={post.status === "published" ? "success" : "neutral"}>
                    {post.status}
                  </AdminBadge>
                </AdminTableCell>
                <AdminTableCell>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Calendar size={14} />
                    <span className="text-xs">{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </AdminTableCell>
                <AdminTableCell>
                  <div className="flex items-center gap-1">
                    <AdminButton variant="ghost" size="sm" icon={<Edit2 size={16} />} onClick={() => handleOpenModal(post)} />
                    <AdminButton variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" icon={<Trash2 size={16} />} onClick={() => { setActivePost(post); setIsConfirmOpen(true); }} />
                  </div>
                </AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTable>
        )}
      </AdminCard>

      {/* Edit/Create Modal */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={activePost?.id ? "Edit Article" : "New Article"}
        size="full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AdminInput 
              label="Article Title" 
              className="text-xl font-bold"
              value={activePost?.title}
              onChange={(e) => setActivePost({ ...activePost, title: e.target.value })}
            />
            <AdminInput 
              label="URL Slug" 
              value={activePost?.slug}
              onChange={(e) => setActivePost({ ...activePost, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
            />
            <AdminTextarea 
              label="Excerpt / Short Summary" 
              value={activePost?.excerpt}
              onChange={(e) => setActivePost({ ...activePost, excerpt: e.target.value })}
            />
            <div>
              <label className="text-sm font-medium text-[#374151] mb-2 block">Article Content</label>
              <RichTextEditor 
                content={activePost?.content || ""}
                onChange={(html) => setActivePost({ ...activePost, content: html })}
                className="min-h-[500px]"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <AdminCard title="Publishing Settings">
              <div className="space-y-6">
                <AdminSelect 
                  label="Status"
                  value={activePost?.status}
                  onChange={(e) => setActivePost({ ...activePost, status: e.target.value })}
                  options={[
                    { label: "Draft", value: "draft" },
                    { label: "Published", value: "published" },
                  ]}
                />
                <AdminInput 
                  label="Author Name" 
                  value={activePost?.author}
                  onChange={(e) => setActivePost({ ...activePost, author: e.target.value })}
                />
              </div>
            </AdminCard>

            <AdminCard title="Featured Image">
              <ImageUpload 
                value={activePost?.featured_image}
                onChange={(url) => setActivePost({ ...activePost, featured_image: url })}
              />
            </AdminCard>

            <div className="flex flex-col gap-3">
              <AdminButton icon={<Save size={18} />} className="w-full" onClick={handleSave} isLoading={isSaving}>
                Save Changes
              </AdminButton>
              <AdminButton variant="ghost" className="w-full" onClick={() => setIsModalOpen(false)}>
                Cancel
              </AdminButton>
            </div>
          </div>
        </div>
      </AdminModal>

      <AdminConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Article"
        description={`Are you sure you want to delete "${activePost?.title}"? This will permanently remove the article from the blog.`}
        isLoading={isSaving}
      />

      <AdminToast 
        isVisible={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </div>
  );
}
