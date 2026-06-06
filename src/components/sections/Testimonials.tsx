"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { Star, Quote, Sparkles } from "lucide-react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INFINITE AUTO-SCROLLING TESTIMONIALS MARQUEE
   Two rows: Row 1 scrolls left, Row 2 scrolls right
   Pauses on hover (individual card)
   Stripe/Clerk.com / Linear.app style
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function TestimonialCard({ t }: { t: any }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ scale: hovered ? 1.02 : 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative group flex-shrink-0 w-[340px] md:w-[400px] bg-white border border-emerald-50 rounded-3xl p-8 shadow-[0_4px_20px_rgba(34,197,94,0.06)] hover:shadow-[0_8px_40px_rgba(34,197,94,0.12)] hover:border-emerald-100 transition-all duration-500 overflow-hidden"
    >
      {/* Subtle gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-3xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Big quote mark */}
      <div className="absolute top-6 right-6 text-emerald-100 group-hover:text-emerald-200 transition-colors duration-500">
        <Quote size={48} fill="currentColor" />
      </div>

      <div className="relative z-10 flex flex-col h-full gap-5">
        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(t.rating || 5)].map((_, i) => (
            <Star key={i} size={14} className="text-amber-400" fill="currentColor" />
          ))}
        </div>

        {/* Quote text */}
        <p className="text-slate-700 font-medium leading-relaxed text-[15px] flex-grow">
          &ldquo;{t.content || t.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-4 border-t border-emerald-50">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-emerald-200 shrink-0">
            {(t.client_name || t.author || "Q")?.[0]}
          </div>
          <div>
            <div className="font-black text-slate-800 text-sm">{t.client_name || t.author}</div>
            <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
              {t.client_role || t.role}
              {(t.client_company || t.company) && ` · ${t.client_company || t.company}`}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow line reveal */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 to-emerald-300"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

/* Infinite scroll row with velocity-based speed */
function MarqueeRow({
  items,
  direction = 1,
  speed = 0.4,
}: {
  items: any[];
  direction?: 1 | -1;
  speed?: number;
}) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Duplicate items for seamless loop
  const doubled = [...items, ...items, ...items];

  useAnimationFrame(() => {
    if (paused) return;
    if (!containerRef.current) return;

    const current = x.get();
    const singleWidth = containerRef.current.scrollWidth / 3;
    const next = current + direction * speed;

    // Reset to seamless loop point
    if (direction === 1 && Math.abs(next) >= singleWidth) {
      x.set(0);
    } else if (direction === -1 && next >= 0) {
      x.set(-singleWidth);
    } else {
      x.set(next);
    }
  });

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left fade mask */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-[#f0fdf4] to-transparent" />
      {/* Right fade mask */}
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-[#f0fdf4] to-transparent" />

      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex gap-6 w-max"
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export const Testimonials = ({ data }: { data?: any[] }) => {
  const displayTestimonials = data && data.length > 0 ? data : TESTIMONIALS;

  // Split into two rows for visual richness
  const mid = Math.ceil(displayTestimonials.length / 2);
  const row1 = displayTestimonials.slice(0, mid);
  const row2 = displayTestimonials.slice(mid);

  // If very few testimonials, just duplicate them for both rows
  const row1Final = row1.length >= 2 ? row1 : [...displayTestimonials];
  const row2Final = row2.length >= 2 ? row2 : [...displayTestimonials].reverse();

  return (
    <section className="section-padding bg-surface overflow-hidden relative">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(34,197,94,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10 mb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-black uppercase tracking-[0.3em]"
          >
            <Sparkles size={13} />
            Social Proof
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-tight"
          >
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400">
              Partners Say.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-slate-500 text-lg font-medium"
          >
            Trusted by engineering teams and business leaders worldwide.
          </motion.p>
        </div>
      </div>

      {/* ── Marquee Rows ── */}
      <div className="space-y-6 relative z-10">
        <MarqueeRow items={row1Final} direction={-1} speed={0.35} />
        {row2Final.length > 0 && (
          <MarqueeRow items={row2Final} direction={1} speed={0.28} />
        )}
      </div>
    </section>
  );
};
