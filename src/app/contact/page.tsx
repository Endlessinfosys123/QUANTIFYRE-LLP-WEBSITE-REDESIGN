"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { COMPANY_DETAILS } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useRef, FormEvent } from "react";

// ── Cartoon SVG Characters ──────────────────────────────────────────────────

function RocketSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M32 4C32 4 20 16 20 32H44C44 16 32 4 32 4Z" fill="#6366f1" stroke="#3730a3" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="26" y="32" width="12" height="16" rx="2" fill="#818cf8" stroke="#3730a3" strokeWidth="2"/>
      <path d="M20 40L14 44L20 48V40Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M44 40L50 44L44 48V40Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="32" cy="22" r="5" fill="white" stroke="#3730a3" strokeWidth="2"/>
      <circle cx="32" cy="22" r="3" fill="#bae6fd"/>
      <path d="M26 48 Q32 56 38 48" stroke="#f97316" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M28 50 Q32 60 36 50" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function PaperPlaneSVG({ className, sent }: { className?: string; sent?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.path
        d="M4 32L60 8L44 60L32 40L4 32Z"
        fill="#6366f1" stroke="#3730a3" strokeWidth="2" strokeLinejoin="round"
        animate={sent ? { x: [0, 200], y: [0, -200], opacity: [1, 0] } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.path
        d="M32 40L44 28"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
        animate={sent ? { pathLength: [1, 0] } : {}}
      />
      <motion.path
        d="M60 8L32 40"
        stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3"
      />
    </svg>
  );
}

function EnvelopeSVG({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="8" width="76" height="50" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2.5"/>
      <motion.path
        d="M2 10 L40 36 L78 10"
        stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        animate={active ? { d: "M2 10 L40 20 L78 10" } : { d: "M2 10 L40 36 L78 10" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {active && (
        <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <circle cx="60" cy="20" r="12" fill="#6366f1"/>
          <path d="M55 20 L59 24 L66 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.g>
      )}
    </svg>
  );
}

function StarBurstSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {[0,45,90,135].map((deg, i) => (
        <motion.line
          key={i}
          x1="20" y1="20"
          x2={20 + 16 * Math.cos((deg * Math.PI) / 180)}
          y2={20 + 16 * Math.sin((deg * Math.PI) / 180)}
          stroke={i % 2 === 0 ? "#f59e0b" : "#6366f1"}
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      <circle cx="20" cy="20" r="5" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
    </svg>
  );
}

function BlobDecor({ className, color }: { className?: string; color?: string }) {
  return (
    <div
      className={`absolute rounded-full opacity-20 animate-morph-blob pointer-events-none ${className}`}
      style={{ background: color || "#6366f1" }}
    />
  );
}

// ── Contact Page ─────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setTimeout(() => setFormState("success"), 2000);
  };

  const inputBase =
    "w-full bg-white border-2 rounded-2xl px-5 py-4 text-dark font-semibold text-base outline-none transition-all duration-300 placeholder:text-text-secondary/40";
  const inputActive =
    "border-primary shadow-[0_0_0_4px_rgba(99,102,241,0.15)] scale-[1.01]";
  const inputIdle =
    "border-border hover:border-primary/40";

  return (
    <main className="bg-white min-h-screen">
      <section className="relative pt-36 pb-28 overflow-hidden">

        {/* ── Cartoon Background Decor ─────────────────────────────────── */}
        <BlobDecor className="w-[500px] h-[500px] -top-40 -left-48" color="#6366f1" />
        <BlobDecor className="w-[400px] h-[400px] -bottom-32 -right-40 delay-300" color="#0ea5e9" />
        <div className="absolute top-28 right-12 animate-float delay-200">
          <StarBurstSVG className="w-12 h-12 opacity-50" />
        </div>
        <div className="absolute bottom-40 left-16 animate-float-reverse delay-500">
          <StarBurstSVG className="w-8 h-8 opacity-40" />
        </div>
        {/* Floating dots */}
        {[
          "top-40 left-1/4 bg-primary",
          "top-64 right-1/3 bg-accent",
          "bottom-60 left-1/3 bg-amber-400",
          "bottom-32 right-1/4 bg-rose-400",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 rounded-full opacity-30 pointer-events-none ${cls} animate-float`}
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        <div className="container-custom relative z-10">

          {/* Header */}
          <div className="text-center mb-20 space-y-6">
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
              transition={{ delay: 0.15, type: "spring", stiffness: 120 }}
              className="text-7xl md:text-9xl font-black text-dark tracking-tighter leading-[0.85]"
            >
              Let&apos;s <span className="text-primary relative">
                Build.
                <motion.span
                  animate={{ scaleX: [0, 1] }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute bottom-0 left-0 h-3 bg-primary/20 w-full rounded-full -z-10"
                />
              </span>
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

          {/* ── Main Grid ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT — Info Cards */}
            <div className="lg:col-span-4 space-y-6">

              {/* Animated Envelope */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="relative rounded-3xl border-2 border-border bg-white p-8 overflow-hidden shadow-sm"
              >
                <div className="animate-float inline-block mb-6">
                  <EnvelopeSVG className="w-24 h-auto" active={focusedField === "email"} />
                </div>
                <h3 className="text-2xl font-black text-dark mb-1">Say Hello 👋</h3>
                <p className="text-text-secondary font-medium mb-6 leading-relaxed">We read every message personally. No bots, no auto-replies.</p>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email Us", value: COMPANY_DETAILS.email, color: "bg-primary/10 text-primary" },
                    { icon: Phone, label: "Call Us", value: COMPANY_DETAILS.phone, color: "bg-green-50 text-green-700" },
                    { icon: MapPin, label: "Visit Us", value: "Gandhinagar, Gujarat, India", color: "bg-amber-50 text-amber-700" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-center gap-4 group cursor-default"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform`}>
                        <item.icon size={18} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{item.label}</div>
                        <div className="font-bold text-dark text-sm truncate max-w-[200px]" title={item.value}>{item.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Blob inside card */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-full animate-morph-blob pointer-events-none" />
              </motion.div>

              {/* Rocket card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center overflow-hidden relative"
              >
                <div className="animate-bounce-cartoon inline-block mb-4">
                  <RocketSVG className="w-20 h-auto mx-auto" />
                </div>
                <div className="font-black text-dark text-xl mb-2">Fast Turnaround 🚀</div>
                <div className="text-text-secondary font-medium text-sm leading-relaxed">We kick off every project within 48 hours of first contact.</div>
              </motion.div>
            </div>

            {/* RIGHT — Animated Form */}
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
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="bg-white rounded-[2.5rem] border-2 border-border shadow-2xl p-16 text-center flex flex-col items-center gap-6 min-h-[500px] justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <CheckCircle2 size={80} className="text-green-500" strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="text-5xl font-black text-dark">Message Sent! 🎉</h2>
                    <p className="text-xl text-text-secondary font-medium max-w-md leading-relaxed">
                      Our team has received your request and will reach out within one business day.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormState("idle")}
                      className="mt-4 px-8 py-4 rounded-2xl border-2 border-border text-dark font-bold hover:border-primary hover:text-primary transition-colors"
                    >
                      Send Another ↩
                    </motion.button>
                    {/* Confetti dots */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full pointer-events-none"
                        style={{
                          background: ["#6366f1","#0ea5e9","#f59e0b","#ec4899","#22c55e"][i % 5],
                          left: `${10 + (i * 8) % 80}%`,
                          top: `${20 + (i * 11) % 60}%`,
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
                    {/* Form header bar */}
                    <div className="px-10 pt-8 pb-6 border-b-2 border-border bg-surface/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-3.5 h-3.5 rounded-full bg-red-400 animate-pulse" />
                          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-pulse delay-100" />
                          <div className="w-3.5 h-3.5 rounded-full bg-green-400 animate-pulse delay-200" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-text-secondary ml-2">New Project Request</span>
                      </div>
                      <PaperPlaneSVG className="w-8 h-8 opacity-50" />
                    </div>

                    <div className="p-10 space-y-8">

                      {/* Name */}
                      <motion.div
                        className="space-y-2"
                        animate={{ scale: focusedField === "name" ? 1.01 : 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <label className="flex items-center gap-2 text-sm font-black text-dark uppercase tracking-widest">
                          <motion.span
                            animate={{ rotate: focusedField === "name" ? [0, -15, 15, 0] : 0 }}
                            transition={{ duration: 0.4 }}
                          >👤</motion.span>
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Jane Doe"
                          required
                          className={`${inputBase} ${focusedField === "name" ? inputActive : inputIdle}`}
                        />
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        className="space-y-2"
                        animate={{ scale: focusedField === "email" ? 1.01 : 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <label className="flex items-center gap-2 text-sm font-black text-dark uppercase tracking-widest">
                          <motion.span
                            animate={{ rotate: focusedField === "email" ? [0, -15, 15, 0] : 0 }}
                            transition={{ duration: 0.4 }}
                          >✉️</motion.span>
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="jane@company.com"
                          required
                          className={`${inputBase} ${focusedField === "email" ? inputActive : inputIdle}`}
                        />
                      </motion.div>

                      {/* Message */}
                      <motion.div
                        className="space-y-2"
                        animate={{ scale: focusedField === "message" ? 1.005 : 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <label className="flex items-center gap-2 text-sm font-black text-dark uppercase tracking-widest">
                          <motion.span
                            animate={{ rotate: focusedField === "message" ? [0, -15, 15, 0] : 0 }}
                            transition={{ duration: 0.4 }}
                          >💬</motion.span>
                          Project Details
                        </label>
                        <textarea
                          rows={6}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Tell us about your vision, budget, and timeline..."
                          required
                          className={`${inputBase} resize-none ${focusedField === "message" ? inputActive : inputIdle}`}
                        />
                        {/* Live char count cartoon bar */}
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-primary"
                              animate={{ width: `${Math.min(100, (form.message.length / 300) * 100)}%` }}
                              transition={{ type: "spring", stiffness: 200 }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-text-secondary tabular-nums">
                            {form.message.length}/300
                          </span>
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
                        {/* Shimmer */}
                        <span className="absolute inset-0 pointer-events-none">
                          <span className="absolute top-0 -left-full w-1/2 h-full bg-white/20 skew-x-12 group-hover:animate-shimmer" />
                        </span>

                        {formState === "loading" ? (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3"
                          >
                            <Loader2 size={24} className="animate-spin" />
                            Sending your message…
                          </motion.span>
                        ) : (
                          <motion.span className="flex items-center gap-3 relative z-10">
                            <motion.span
                              className="inline-block"
                              animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                            >
                              🚀
                            </motion.span>
                            Launch Your Project
                            <Send size={22} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                          </motion.span>
                        )}
                      </motion.button>

                      <p className="text-center text-xs text-text-secondary font-semibold">
                        🔒 End-to-end encrypted &nbsp;·&nbsp; No spam, ever &nbsp;·&nbsp; NDA available
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
