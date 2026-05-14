"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, AlertCircle, LogIn, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col items-center justify-center p-6 selection:bg-[#6C3FEF] selection:text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6C3FEF] opacity-[0.05] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0EA5E9] opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Branding */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-[#13131F] rounded-2xl shadow-2xl border border-[#1E1E2E] mb-6"
          >
            <Shield className="text-[#6C3FEF]" size={32} />
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
            QUANTIFYRE <span className="text-[#6C3FEF]">CMS</span>
          </h1>
          <p className="text-[#A0A0B0] font-bold text-xs uppercase tracking-[0.2em]">
            Ultimate Admin Panel v2.0
          </p>
        </div>

        <div className="bg-[#13131F] border border-[#1E1E2E] rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
          <div className="p-8">
            <div className="space-y-1 mb-8">
              <h2 className="text-xl font-black text-white">System Access</h2>
              <p className="text-sm text-[#A0A0B0] font-medium">Authentication required to access the AI core.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#A0A0B0] ml-1">
                  Email Identity
                </label>
                <input
                  type="email"
                  placeholder="admin@quantifyre.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 text-sm focus:outline-none focus:border-[#6C3FEF] transition-colors placeholder:text-[#3F3F46]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#A0A0B0] ml-1">
                  Security Key
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 text-sm focus:outline-none focus:border-[#6C3FEF] transition-colors placeholder:text-[#3F3F46]"
                  required
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-bold">{error}</p>
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-[#6C3FEF] hover:bg-[#5B35D1] text-white rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="px-8 pb-8">
             <div className="pt-6 border-t border-[#1E1E2E] flex items-center justify-between">
                <p className="text-[10px] font-black text-[#3F3F46] uppercase tracking-widest">
                  Secure Layer v2.0
                </p>
                <Link href="/" className="text-[10px] font-black text-[#6C3FEF] uppercase tracking-widest flex items-center gap-1 hover:underline">
                  Back to Website <ArrowRight size={10} />
                </Link>
             </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] font-bold text-[#3F3F46] uppercase tracking-[0.3em]">
          © 2025 QUANTIFYRE LLP · ALL RIGHTS RESERVED
        </p>
      </motion.div>
    </div>
  );
}
