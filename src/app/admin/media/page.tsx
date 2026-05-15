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
  const [selectedFile, setSelectedFile] = useState<any>(null);
  
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Media <span className="text-[#6C3FEF]">Vault</span>
          </h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Universal Asset Repository</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex bg-slate-100 border border-slate-200 rounded-xl p-1 shadow-inner">
            <button 
              onClick={() => setView('grid')}
              className={cn("p-2 rounded-lg transition-all", view === 'grid' ? "bg-white text-[#6C3FEF] shadow-sm" : "text-slate-400 hover:text-slate-600")}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-2 rounded-lg transition-all", view === 'list' ? "bg-white text-[#6C3FEF] shadow-sm" : "text-slate-400 hover:text-slate-600")}
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
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text"
          placeholder="SEARCH ASSETS..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:border-[#6C3FEF] shadow-sm transition-all placeholder:text-slate-300"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="mx-auto text-[#6C3FEF] animate-spin mb-4" size={32} />
          <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Scanning Storage Sectors...</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {view === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredFiles.map((file) => (
                  <FileCard 
                    key={file.id} 
                    file={file} 
                    isActive={selectedFile?.id === file.id}
                    onClick={() => setSelectedFile(file)}
                    onCopy={() => copyUrl(file.name)} 
                    onDelete={() => handleDelete(file.name)}
                    supabase={supabase}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                 <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Asset</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Size</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                      <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredFiles.map((file) => (
                      <FileRow 
                        key={file.id} 
                        file={file} 
                        isActive={selectedFile?.id === file.id}
                        onClick={() => setSelectedFile(file)}
                        onCopy={() => copyUrl(file.name)} 
                        onDelete={() => handleDelete(file.name)}
                      />
                    ))}
                  </tbody>
                 </table>
              </div>
            )}

            {filteredFiles.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                <ImageIcon className="mx-auto text-slate-200 mb-4" size={40} />
                <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No assets found in vault</p>
              </div>
            )}
          </div>

          <AnimatePresence>
            {selectedFile && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:w-80 h-fit sticky top-8"
              >
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative">
                  <button 
                    onClick={() => setSelectedFile(null)}
                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-900 transition-colors"
                  >
                    <X size={18} />
                  </button>

                  <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden mb-6 border border-slate-100 shadow-inner">
                    {selectedFile.metadata?.mimetype?.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(selectedFile.name) ? (
                      <img 
                        src={supabase.storage.from('media').getPublicUrl(selectedFile.name).data.publicUrl} 
                        alt="" 
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <FileText size={48} className="text-slate-200" />
                    )}
                  </div>

                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest break-all mb-4">{selectedFile.name}</h3>
                  
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <DetailItem label="Size" value={`${(selectedFile.metadata?.size / 1024).toFixed(1)} KB`} />
                    <DetailItem label="Type" value={selectedFile.metadata?.mimetype || "N/A"} />
                    <DetailItem label="Created" value={new Date(selectedFile.created_at).toLocaleDateString()} />
                    <DetailItem label="Updated" value={new Date(selectedFile.updated_at).toLocaleDateString()} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <button 
                      onClick={() => copyUrl(selectedFile.name)}
                      className="flex items-center justify-center gap-2 py-3 bg-[#6C3FEF] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#6C3FEF20] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <Copy size={14} />
                      Link
                    </button>
                    <button 
                      onClick={() => { handleDelete(selectedFile.name); setSelectedFile(null); }}
                      className="flex items-center justify-center gap-2 py-3 bg-red-50 text-red-500 border border-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={14} />
                      Purge
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-[10px] font-bold text-slate-600 truncate">{value}</p>
    </div>
  );
}

function FileCard({ file, onCopy, onDelete, supabase, onClick, isActive }: any) {
  const isImage = file.metadata?.mimetype?.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name);
  const { data } = supabase.storage.from('media').getPublicUrl(file.name);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={onClick}
      className={cn(
        "group relative bg-white border rounded-2xl overflow-hidden transition-all cursor-pointer",
        isActive ? "border-[#6C3FEF] shadow-xl shadow-[#6C3FEF10] ring-1 ring-[#6C3FEF]" : "border-slate-200 hover:border-slate-400 hover:shadow-lg"
      )}
    >
      <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
        {isImage ? (
          <img src={data.publicUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <FileText size={40} className="text-slate-200" />
        )}
      </div>
      
      <div className="p-3">
        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest truncate mb-1">{file.name}</p>
        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">
          {(file.metadata?.size / 1024).toFixed(1)} KB
        </p>
      </div>

      <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
        <button 
          onClick={(e) => { e.stopPropagation(); onCopy(); }}
          className="p-2 bg-white/90 backdrop-blur-md text-slate-600 rounded-lg shadow-sm border border-slate-200 hover:bg-[#6C3FEF] hover:text-white transition-all"
          title="Copy Link"
        >
          <Copy size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function FileRow({ file, onCopy, onDelete, onClick, isActive }: any) {
  return (
    <tr 
      onClick={onClick}
      className={cn(
        "transition-colors group cursor-pointer",
        isActive ? "bg-slate-50" : "hover:bg-slate-50/50"
      )}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <ImageIcon size={16} className="text-slate-300" />
          </div>
          <span className="text-xs font-bold text-slate-900 tracking-widest uppercase truncate max-w-[200px]">{file.name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-[10px] font-black text-slate-400 tracking-widest">{(file.metadata?.size / 1024).toFixed(1)} KB</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{file.metadata?.mimetype || "Unknown"}</span>
      </td>
      <td className="px-6 py-4 text-right">
        <button 
          onClick={(e) => { e.stopPropagation(); onCopy(); }}
          className="p-2 text-slate-300 hover:text-[#6C3FEF] transition-all"
        >
          <Copy size={16} />
        </button>
      </td>
    </tr>
  );
}
