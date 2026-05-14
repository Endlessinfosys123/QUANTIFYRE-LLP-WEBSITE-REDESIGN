"use client";

import React, { useEffect, useState, useRef } from "react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { 
  Upload, Trash2, Copy, Search, 
  Image as ImageIcon, FileText, 
  MoreVertical, Grid, List, X,
  Check, Loader2
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    // Listing files from 'media' bucket
    const { data, error } = await supabase.storage.from('media').list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'desc' },
    });

    if (error) {
      toast.error("Failed to access Media Vault: " + error.message);
    } else {
      setFiles(data || []);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    
    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, file);

    if (error) {
      toast.error("Upload failed: " + error.message);
    } else {
      toast.success("Asset secured in Vault");
      fetchFiles();
    }
    setUploading(false);
  };

  const handleDelete = async (name: string) => {
    if (!confirm("Are you sure you want to purge this asset?")) return;

    const { error } = await supabase.storage
      .from('media')
      .remove([name]);

    if (error) {
      toast.error("Deletion failed");
    } else {
      toast.success("Asset purged from system");
      setFiles(files.filter(f => f.name !== name));
    }
  };

  const copyUrl = (name: string) => {
    const { data } = supabase.storage.from('media').getPublicUrl(name);
    navigator.clipboard.writeText(data.publicUrl);
    toast.success("Public Link Copied");
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Media <span className="text-[#6C3FEF]">Vault</span>
          </h1>
          <p className="text-[#A0A0B0] font-medium mt-1 uppercase text-[10px] tracking-widest">Universal Asset Repository</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex bg-[#13131F] border border-[#1E1E2E] rounded-xl p-1">
            <button 
              onClick={() => setView('grid')}
              className={cn("p-2 rounded-lg transition-all", view === 'grid' ? "bg-[#6C3FEF] text-white" : "text-[#3F3F46] hover:text-[#A0A0B0]")}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-2 rounded-lg transition-all", view === 'list' ? "bg-[#6C3FEF] text-white" : "text-[#3F3F46] hover:text-[#A0A0B0]")}
            >
              <List size={18} />
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            className="hidden" 
          />
          <AdminButton 
            onClick={() => fileInputRef.current?.click()} 
            isLoading={uploading}
            icon={<Upload size={18} />}
          >
            Upload Asset
          </AdminButton>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3F3F46]" size={20} />
        <input 
          type="text"
          placeholder="SEARCH ASSETS..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-[#0F0F18] border border-[#1E1E2E] rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase tracking-widest text-white focus:outline-none focus:border-[#6C3FEF] transition-all placeholder:text-[#3F3F46]"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="mx-auto text-[#6C3FEF] animate-spin mb-4" size={32} />
          <p className="text-[#A0A0B0] font-black uppercase text-[10px] tracking-widest">Scanning Storage Sectors...</p>
        </div>
      ) : (
        <>
          {view === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredFiles.map((file) => (
                <FileCard 
                  key={file.id} 
                  file={file} 
                  onCopy={() => copyUrl(file.name)} 
                  onDelete={() => handleDelete(file.name)}
                  supabase={supabase}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#13131F] border border-[#1E1E2E] rounded-3xl overflow-hidden">
               <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#1E1E2E] bg-[#0A0A0F]">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#3F3F46]">Asset</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#3F3F46]">Size</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#3F3F46]">Type</th>
                    <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-[#3F3F46]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E1E2E]">
                  {filteredFiles.map((file) => (
                    <FileRow 
                      key={file.id} 
                      file={file} 
                      onCopy={() => copyUrl(file.name)} 
                      onDelete={() => handleDelete(file.name)}
                    />
                  ))}
                </tbody>
               </table>
            </div>
          )}

          {filteredFiles.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-[#1E1E2E] rounded-3xl">
              <ImageIcon className="mx-auto text-[#3F3F46] mb-4" size={40} />
              <p className="text-[#A0A0B0] font-black uppercase text-xs tracking-widest">No assets found in vault</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FileCard({ file, onCopy, onDelete, supabase }: any) {
  const isImage = file.metadata?.mimetype?.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name);
  const { data } = supabase.storage.from('media').getPublicUrl(file.name);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-[#13131F] border border-[#1E1E2E] rounded-2xl overflow-hidden hover:border-[#6C3FEF] transition-all"
    >
      <div className="aspect-square bg-[#0A0A0F] flex items-center justify-center overflow-hidden">
        {isImage ? (
          <img src={data.publicUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <FileText size={40} className="text-[#3F3F46]" />
        )}
      </div>
      
      <div className="p-3">
        <p className="text-[10px] font-black text-white uppercase tracking-widest truncate mb-1">{file.name}</p>
        <p className="text-[8px] text-[#3F3F46] font-bold uppercase tracking-widest">
          {(file.metadata?.size / 1024).toFixed(1)} KB
        </p>
      </div>

      <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
        <button 
          onClick={onCopy}
          className="p-2 bg-black/80 backdrop-blur-md text-white rounded-lg hover:bg-[#6C3FEF] transition-all"
          title="Copy Link"
        >
          <Copy size={14} />
        </button>
        <button 
          onClick={onDelete}
          className="p-2 bg-black/80 backdrop-blur-md text-[#EF4444] rounded-lg hover:bg-[#EF4444] hover:text-white transition-all"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function FileRow({ file, onCopy, onDelete }: any) {
  return (
    <tr className="hover:bg-[#1A1A2E] transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0A0A0F] rounded-lg flex items-center justify-center">
            <ImageIcon size={16} className="text-[#3F3F46]" />
          </div>
          <span className="text-xs font-bold text-white tracking-widest uppercase truncate max-w-[200px]">{file.name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-[10px] font-black text-[#A0A0B0] tracking-widest">{(file.metadata?.size / 1024).toFixed(1)} KB</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[10px] font-black text-[#3F3F46] uppercase tracking-widest">{file.metadata?.mimetype || "Unknown"}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={onCopy}
            className="p-2 text-[#A0A0B0] hover:text-[#6C3FEF] transition-all"
          >
            <Copy size={16} />
          </button>
          <button 
            onClick={onDelete}
            className="p-2 text-[#3F3F46] hover:text-[#EF4444] transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
