"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertCircle, CheckCircle2, UserPlus, LogIn, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UnifiedAuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    admin_secret: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

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
          setMode("login");
          setSuccess(false);
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex flex-col items-center justify-center p-6 selection:bg-[#6C3FEF] selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px]"
      >
        {/* Branding */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl shadow-[#6C3FEF15] border border-[#F3F0FF] mb-6"
          >
            <Shield className="text-[#6C3FEF]" size={32} />
          </motion.div>
          <h1 className="text-4xl font-black text-[#111827] tracking-tighter mb-2">
            QUANTIFYRE <span className="text-[#6C3FEF]">CMS</span>
          </h1>
          <p className="text-[#6B7280] font-bold text-xs uppercase tracking-[0.2em]">
            Enterprise Administration
          </p>
        </div>

        <AdminCard className="overflow-hidden border-0 shadow-2xl shadow-[#6C3FEF10]">
          {/* Mode Toggle */}
          <div className="flex border-b border-[#F3F0FF]">
            <button 
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-4 text-sm font-black transition-all ${mode === 'login' ? 'text-[#6C3FEF] border-b-2 border-[#6C3FEF] bg-[#F3F0FF]/30' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
            >
              SIGN IN
            </button>
            <button 
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 py-4 text-sm font-black transition-all ${mode === 'register' ? 'text-[#6C3FEF] border-b-2 border-[#6C3FEF] bg-[#F3F0FF]/30' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
            >
              CREATE ACCOUNT
            </button>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-[#111827]">Welcome Back</h2>
                    <p className="text-sm text-[#6B7280] font-medium">Please enter your details to sign in.</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <AdminInput
                      label="Email Address"
                      type="email"
                      placeholder="admin@quantifyre.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <AdminInput
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />

                    {error && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-600">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <p className="text-xs font-bold">{error}</p>
                      </div>
                    )}

                    <AdminButton 
                      type="submit" 
                      className="w-full h-12 text-base" 
                      isLoading={isLoading}
                      icon={<LogIn size={18} />}
                    >
                      Sign In to Panel
                    </AdminButton>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {success ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-2xl font-black text-[#111827]">Account Created!</h3>
                      <p className="text-[#6B7280] font-medium">Switching to login mode...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-1 mb-6">
                        <h2 className="text-xl font-black text-[#111827]">Create Admin</h2>
                        <p className="text-sm text-[#6B7280] font-medium">Register a new administrative account.</p>
                      </div>

                      <AdminInput
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <AdminInput
                        label="Work Email"
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
                          placeholder="••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                        <AdminInput
                          label="Confirm"
                          type="password"
                          placeholder="••••"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                      <AdminInput
                        label="Registration Secret"
                        type="password"
                        placeholder="Optional security key"
                        value={formData.admin_secret}
                        onChange={(e) => setFormData({ ...formData, admin_secret: e.target.value })}
                      />

                      {error && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-600">
                          <AlertCircle size={18} className="shrink-0 mt-0.5" />
                          <p className="text-xs font-bold">{error}</p>
                        </div>
                      )}

                      <AdminButton 
                        type="submit" 
                        className="w-full h-12 text-base mt-2" 
                        isLoading={isLoading}
                        variant="secondary"
                        icon={<UserPlus size={18} />}
                      >
                        Register Now
                      </AdminButton>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-8 pb-8">
             <div className="pt-6 border-t border-[#F3F0FF] flex items-center justify-between">
                <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">
                  Secure Layer v2.0
                </p>
                <Link href="/" className="text-[10px] font-black text-[#6C3FEF] uppercase tracking-widest flex items-center gap-1 hover:underline">
                  Back to Website <ArrowRight size={10} />
                </Link>
             </div>
          </div>
        </AdminCard>

        <p className="mt-10 text-center text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.3em]">
          © 2024 QUANTIFYRE LLP · Confidential
        </p>
      </motion.div>
    </div>
  );
}
