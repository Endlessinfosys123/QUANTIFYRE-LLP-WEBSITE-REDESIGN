"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_DETAILS, SERVICES } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, ChevronDown } from "lucide-react";
import { useState, FormEvent } from "react";

// Top 30 country codes
const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1",  flag: "🇺🇸", name: "USA/Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+7",  flag: "🇷🇺", name: "Russia" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
];

function PaperPlaneSVG() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <path d="M4 24L44 6L32 44L24 28L4 24Z" fill="var(--primary)" stroke="var(--color-dark)" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M24 28L32 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function StarBurst({ className }: { className?: string }) {
  return (
    <div className={`absolute rounded-full opacity-20 animate-morph-blob pointer-events-none ${className}`} />
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", message: "", services: [] as string[]
  });

  const handleServiceToggle = (serviceTitle: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(serviceTitle)
        ? prev.services.filter((s) => s !== serviceTitle)
        : [...prev.services, serviceTitle],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      
      const { error } = await supabase.from('contact_inquiries').insert({
        full_name: form.name,
        email: form.email,
        phone: `${selectedCountry.code}${form.phone}`,
        project_details: form.message,
        services_interested: form.services,
        status: 'new'
      });

      if (error) throw error;
      setFormState("success");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to send inquiry. Please try again.");
      setFormState("idle");
    }
  };

  const inputBase =
    "w-full bg-white border-2 rounded-2xl px-5 py-4 text-dark font-semibold text-base outline-none transition-all duration-300 placeholder:text-text-secondary/40";
  const getInputClass = (field: string) =>
    `${inputBase} ${focusedField === field
      ? "border-primary shadow-[0_0_0_4px_rgba(99,102,241,0.12)] scale-[1.01]"
      : "border-border hover:border-primary/40"
    }`;

  return (
    <main className="bg-white min-h-screen">
      <section className="relative pt-36 pb-28 overflow-hidden">
        {/* Background blobs */}
        <StarBurst className="w-[500px] h-[500px] -top-40 -left-48 bg-primary" />
        <StarBurst className="w-[400px] h-[400px] -bottom-32 -right-40 bg-accent delay-300" />
        {[
          "top-40 left-1/4 bg-primary", "top-64 right-1/3 bg-accent",
          "bottom-60 left-1/3 bg-amber-400", "bottom-32 right-1/4 bg-rose-400",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-4 h-4 rounded-full opacity-25 pointer-events-none animate-float ${cls}`} style={{ animationDelay: `${i * 0.4}s` }} />
        ))}

        <div className="container-custom relative z-10">

          {/* Header */}
          <div className="text-center mb-20 space-y-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border-2 border-primary/20 text-primary font-black uppercase tracking-widest text-xs"
            >
              <span className="animate-bounce-cartoon inline-block">✉️</span> Start A Conversation
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
              className="text-7xl md:text-9xl font-black text-dark tracking-tighter leading-[0.85]"
            >
              Let&apos;s <span className="text-primary">Build.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-text-secondary font-medium max-w-xl mx-auto leading-relaxed"
            >
              Drop us a message and we&apos;ll respond within one business day with a project blueprint.
            </motion.p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* LEFT — Info + Map */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Contact Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="relative rounded-3xl border-2 border-border bg-white p-8 overflow-hidden shadow-sm"
              >
                <div className="animate-float inline-block mb-5">
                  <span className="text-5xl">👋</span>
                </div>
                <h3 className="text-2xl font-black text-dark mb-2">Say Hello</h3>
                <p className="text-text-secondary font-medium mb-6 leading-relaxed text-sm">
                  We read every message personally. No bots, no auto-replies. Real humans, real responses.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email Us", value: COMPANY_DETAILS.email, color: "bg-primary/10 text-primary" },
                    { icon: Phone, label: "Primary Line", value: COMPANY_DETAILS.phones[0], color: "bg-green-50 text-green-700" },
                    { icon: Phone, label: "Alternate Line", value: COMPANY_DETAILS.phones[1], color: "bg-blue-50 text-blue-700" },
                    { icon: MapPin, label: "Office", value: "Kudasan, Gandhinagar, Gujarat", color: "bg-amber-50 text-amber-700" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-start gap-4 group cursor-default"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform mt-0.5`}>
                        <item.icon size={17} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{item.label}</div>
                        <div className="font-bold text-dark text-sm break-all">{item.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-primary/5 rounded-full animate-morph-blob pointer-events-none" />
              </motion.div>

              {/* Google Map Embed */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="rounded-3xl border-2 border-border overflow-hidden shadow-sm"
              >
                <div className="h-10 bg-surface border-b border-border flex items-center gap-3 px-4">
                  <MapPin size={14} className="text-primary" />
                  <span className="text-xs font-black text-dark uppercase tracking-widest">Our Office</span>
                </div>
                <iframe
                  title="QUANTIFYRE LLP Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.2865734791604!2d72.63508767521735!3d23.178853879007476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2a05b0a89c83%3A0xf94e29dd3bf40861!2sKudasan%2C%20Gandhinagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715500000000!5m2!1sen!2sin"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
                <div className="p-4 bg-white">
                  <div className="text-xs font-bold text-text-secondary leading-relaxed">
                    📍 {COMPANY_DETAILS.address}
                  </div>
                </div>
              </motion.div>

            </div>

            {/* RIGHT — Full Animated Form */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
              className="lg:col-span-8"
            >
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="bg-white rounded-[2.5rem] border-2 border-border shadow-2xl p-16 text-center flex flex-col items-center gap-6 min-h-[600px] justify-center relative overflow-hidden"
                  >
                    <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <CheckCircle2 size={80} className="text-green-500" strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="text-5xl font-black text-dark">Sent! 🎉</h2>
                    <p className="text-xl text-text-secondary font-medium max-w-md leading-relaxed">
                      Our team will reach out within one business day with a detailed project blueprint.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => setFormState("idle")}
                      className="mt-4 px-8 py-4 rounded-2xl border-2 border-border text-dark font-bold hover:border-primary hover:text-primary transition-colors"
                    >
                      Send Another ↩
                    </motion.button>
                    {[...Array(14)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full pointer-events-none"
                        style={{
                          background: ["var(--primary)","#0ea5e9","#f59e0b","#ec4899","#22c55e"][i % 5],
                          left: `${8 + (i * 7) % 84}%`,
                          top: `${15 + (i * 9) % 70}%`,
                        }}
                        animate={{ y: [-20, 20], opacity: [1, 0], rotate: [0, 180] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, repeatType: "reverse" }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="bg-white rounded-[2.5rem] border-2 border-border shadow-2xl overflow-hidden"
                  >
                    {/* Form top bar */}
                    <div className="px-10 pt-8 pb-6 border-b-2 border-border bg-surface/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-3.5 h-3.5 rounded-full bg-red-400 animate-pulse" />
                          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-pulse delay-100" />
                          <div className="w-3.5 h-3.5 rounded-full bg-green-400 animate-pulse delay-200" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-text-secondary ml-2">New Project Request</span>
                      </div>
                      <PaperPlaneSVG />
                    </div>

                    <div className="p-10 space-y-8">

                      {/* Row 1: Name & Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div className="space-y-2 group" animate={{ scale: focusedField === "name" ? 1.01 : 1 }} transition={{ type: "spring", stiffness: 300 }}>
                          <label className="flex items-center gap-2 text-sm font-black text-dark uppercase tracking-widest">
                            <motion.span animate={{ rotate: focusedField === "name" ? [0, -15, 15, 0] : 0 }} transition={{ duration: 0.4 }}>👤</motion.span>
                            Full Name *
                          </label>
                          <input
                            type="text" required placeholder="Jane Doe"
                            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                            className={getInputClass("name")}
                          />
                        </motion.div>
                        <motion.div className="space-y-2 group" animate={{ scale: focusedField === "email" ? 1.01 : 1 }} transition={{ type: "spring", stiffness: 300 }}>
                          <label className="flex items-center gap-2 text-sm font-black text-dark uppercase tracking-widest">
                            <motion.span animate={{ rotate: focusedField === "email" ? [0, -15, 15, 0] : 0 }} transition={{ duration: 0.4 }}>✉️</motion.span>
                            Email Address *
                          </label>
                          <input
                            type="email" required placeholder="jane@company.com"
                            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                            className={getInputClass("email")}
                          />
                        </motion.div>
                      </div>

                      {/* Row 2: Phone with Country Code */}
                      <motion.div className="space-y-2" animate={{ scale: focusedField === "phone" ? 1.005 : 1 }} transition={{ type: "spring", stiffness: 300 }}>
                        <label className="flex items-center gap-2 text-sm font-black text-dark uppercase tracking-widest">
                          <motion.span animate={{ rotate: focusedField === "phone" ? [0, -15, 15, 0] : 0 }} transition={{ duration: 0.4 }}>📱</motion.span>
                          Phone Number
                        </label>
                        <div className="flex gap-3">
                          {/* Country Code Selector */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                              className="flex items-center gap-2 h-full px-4 py-4 bg-white border-2 border-border rounded-2xl font-bold text-dark hover:border-primary transition-colors whitespace-nowrap"
                            >
                              <span className="text-xl">{selectedCountry.flag}</span>
                              <span className="text-sm">{selectedCountry.code}</span>
                              <ChevronDown size={14} className={`transition-transform ${showCountryDropdown ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                              {showCountryDropdown && (
                                <motion.div
                                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                  className="absolute top-full mt-2 left-0 z-50 bg-white border-2 border-border rounded-2xl shadow-2xl overflow-y-auto max-h-60 min-w-[220px]"
                                >
                                  {COUNTRY_CODES.map((c) => (
                                    <button
                                      key={c.code + c.name}
                                      type="button"
                                      onClick={() => { setSelectedCountry(c); setShowCountryDropdown(false); }}
                                      className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-surface text-left transition-colors ${selectedCountry.code === c.code && selectedCountry.name === c.name ? "bg-primary/5 text-primary" : "text-dark"}`}
                                    >
                                      <span className="text-xl">{c.flag}</span>
                                      <span className="font-bold text-sm">{c.name}</span>
                                      <span className="ml-auto text-xs font-black text-text-secondary">{c.code}</span>
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {/* Phone input */}
                          <input
                            type="tel" placeholder="98765 43210"
                            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                            className={`${getInputClass("phone")} flex-1`}
                          />
                        </div>
                      </motion.div>

                      {/* Row 3: Service Selection */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-black text-dark uppercase tracking-widest">
                          <span>🛠️</span> Services Interested In
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {SERVICES.map((s) => {
                            const selected = form.services.includes(s.title);
                            return (
                              <motion.button
                                key={s.id}
                                type="button"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleServiceToggle(s.title)}
                                className={`px-4 py-3 rounded-xl border-2 text-left text-sm font-bold transition-all duration-200 ${
                                  selected
                                    ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/20"
                                    : "border-border bg-surface text-dark hover:border-primary/50"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-primary border-primary" : "border-border"}`}>
                                    {selected && <span className="text-white text-[10px] font-black">✓</span>}
                                  </div>
                                  <span className="leading-tight">{s.title}</span>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Row 4: Message */}
                      <motion.div className="space-y-2" animate={{ scale: focusedField === "message" ? 1.005 : 1 }} transition={{ type: "spring", stiffness: 300 }}>
                        <label className="flex items-center gap-2 text-sm font-black text-dark uppercase tracking-widest">
                          <motion.span animate={{ rotate: focusedField === "message" ? [0, -15, 15, 0] : 0 }} transition={{ duration: 0.4 }}>💬</motion.span>
                          Project Details *
                        </label>
                        <textarea
                          rows={5} required
                          placeholder="Tell us about your vision, budget, and timeline..."
                          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                          onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                          className={`${getInputClass("message")} resize-none`}
                        />
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-primary"
                              animate={{ width: `${Math.min(100, (form.message.length / 300) * 100)}%` }}
                              transition={{ type: "spring", stiffness: 200 }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-text-secondary tabular-nums">{form.message.length}/300</span>
                        </div>
                      </motion.div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={formState === "loading"}
                        whileHover={{ scale: 1.03, y: -3, boxShadow: "0 20px 50px rgba(99,102,241,0.4)" }}
                        whileTap={{ scale: 0.97, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="relative w-full h-20 rounded-2xl bg-primary text-white font-black text-xl overflow-hidden group flex items-center justify-center gap-4 shadow-lg shadow-primary/30"
                      >
                        <span className="absolute inset-0 pointer-events-none">
                          <span className="absolute top-0 -left-full w-1/2 h-full bg-white/20 skew-x-12 group-hover:animate-shimmer" />
                        </span>
                        {formState === "loading" ? (
                          <span className="flex items-center gap-3">
                            <Loader2 size={24} className="animate-spin" /> Sending…
                          </span>
                        ) : (
                          <span className="flex items-center gap-3 relative z-10">
                            <motion.span className="inline-block" animate={{ rotate: [0, -15, 15, -10, 10, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}>
                              🚀
                            </motion.span>
                            Launch Your Project
                            <Send size={22} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                          </span>
                        )}
                      </motion.button>

                      <p className="text-center text-xs text-text-secondary font-semibold">
                        🔒 End-to-end encrypted &nbsp;·&nbsp; No spam, ever &nbsp;·&nbsp; NDA available on request
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
