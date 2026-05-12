"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { motion } from "framer-motion";
import { Shield, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px]"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#111827] tracking-tighter mb-2">
            QUANTIFYRE <span className="text-[#6C3FEF]">CMS</span>
          </h1>
          <p className="text-[#6B7280] font-bold text-sm uppercase tracking-widest">
            Admin Control Center
          </p>
        </div>

        <AdminCard className="p-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#E5E7EB]">
            <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] flex items-center justify-center text-[#6C3FEF]">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#111827]">Secure Login</h2>
              <p className="text-xs text-[#6B7280]">Enter your credentials to continue</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <AdminInput
              label="Email Address"
              type="email"
              placeholder="admin@quantifyre.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <AdminInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 text-red-600"
              >
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="text-xs font-bold leading-tight">{error}</p>
              </motion.div>
            )}

            <AdminButton 
              type="submit" 
              className="w-full h-12" 
              isLoading={isLoading}
            >
              Sign In to Dashboard
            </AdminButton>
          </form>

          <div className="mt-8 text-center space-y-3">
            <p className="text-xs text-[#6B7280] font-medium">
              Don&apos;t have an account? <br />
              <Link href="/admin/register" className="text-[#6C3FEF] font-bold hover:underline">Register New Admin</Link>
            </p>
            <p className="text-xs text-[#6B7280] font-medium">
              Forgot password? <br />
              <span className="text-[#6C3FEF] font-bold">Contact the Super Admin</span>
            </p>
          </div>
        </AdminCard>

        <p className="mt-8 text-center text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
          © 2024 QUANTIFYRE LLP · All Rights Reserved
        </p>
      </motion.div>
    </div>
  );
}
