"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { motion } from "framer-motion";
import { UserPlus, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    admin_secret: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          admin_secret: formData.admin_secret
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/login");
        }, 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px]"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#111827] tracking-tighter mb-2">
            QUANTIFYRE <span className="text-[#6C3FEF]">CMS</span>
          </h1>
          <p className="text-[#6B7280] font-bold text-sm uppercase tracking-widest">
            Create Admin Account
          </p>
        </div>

        <AdminCard className="p-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#E5E7EB]">
            <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] flex items-center justify-center text-[#6C3FEF]">
              <UserPlus size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#111827]">New Registration</h2>
              <p className="text-xs text-[#6B7280]">Join the administration team</p>
            </div>
          </div>

          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#111827]">Account Created!</h3>
              <p className="text-[#6B7280] text-sm">
                Registration successful. Redirecting you to the login page...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <AdminInput
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <AdminInput
                label="Email Address"
                type="email"
                placeholder="admin@quantifyre.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <AdminInput
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <AdminInput
                  label="Confirm"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <AdminInput
                label="Admin Registration Secret"
                type="password"
                placeholder="Enter secret to allow registration"
                value={formData.admin_secret}
                onChange={(e) => setFormData({ ...formData, admin_secret: e.target.value })}
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
                className="w-full h-12 mt-4" 
                isLoading={isLoading}
              >
                Register Admin Account
              </AdminButton>

              <div className="pt-4 text-center">
                <Link 
                  href="/admin/login" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#6C3FEF] hover:underline"
                >
                  <ArrowLeft size={14} /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </AdminCard>

        <p className="mt-8 text-center text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
          © 2024 QUANTIFYRE LLP · Secure Environment
        </p>
      </motion.div>
    </div>
  );
}
