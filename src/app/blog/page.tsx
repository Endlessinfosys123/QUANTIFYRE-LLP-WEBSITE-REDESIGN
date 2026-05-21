export const revalidate = 0;
import { Blog as BlogSection } from "@/components/sections/Blog";
import { getBlogPosts } from "@/lib/supabase/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, BarChart2, Eye, TrendingUp, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import * as motion from "framer-motion/client";
import { SplitHeadline, HeroBadge, FloatingShape, HeroGridBg, UnderlineReveal } from "@/components/ui/PageHero";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredPost = posts[0];

  return (
    <main className="bg-white min-h-screen">

      {/* BLOG HERO — Editorial Split Layout */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-white border-b border-emerald-50">
        <HeroGridBg variant="lines" />
        <FloatingShape size={500} x="-10%" y="-25%" color="rgba(34,197,94,0.06)" blur={100} delay={0} />
        <FloatingShape size={320} x="72%"  y="40%"  color="rgba(16,185,129,0.05)" blur={80}  delay={2} />

        {/* Accent top line */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{ background: "linear-gradient(90deg, #22c55e, #10b981, transparent)" }}
        />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">

            {/* LEFT — Headline */}
            <div className="space-y-8">
              <HeroBadge icon={<BarChart2 size={14} />} label="Technical Intelligence" />

              {/* Animated split headline */}
              <SplitHeadline
                text="The System "
                highlight="Log."
                className="text-7xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9]"
                highlightClass="text-primary"
                delay={0.1}
              />

              {/* Animated ink underline below headline */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-[3px] w-32 rounded-full"
                style={{ background: "linear-gradient(90deg, #22c55e, #10b981)" }}
              />

              {/* Stats row */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
                className="flex gap-6"
              >
                {[
                  { value: `${posts.length}+`, label: "Articles" },
                  { value: "5K+", label: "Monthly Readers" },
                  { value: "100%", label: "Free" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } },
                    }}
                    className="text-center"
                  >
                    <div className="text-2xl font-black text-dark">{s.value}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Description + category tags */}
            <div className="space-y-8">
              <motion.p
                initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.45, duration: 0.65 }}
                className="text-xl text-text-secondary font-medium leading-relaxed"
              >
                Engineering perspectives, system architecture deep-dives, and performance scaling strategies from the team building tomorrow's software.
              </motion.p>

              {/* Rotating category pills */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.6 } } }}
                className="flex flex-wrap gap-2"
              >
                {["Architecture", "AI/ML", "DevOps", "Performance", "Web Dev", "Security", "Mobile", "Cloud"].map((cat, i) => (
                  <motion.span
                    key={cat}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 10 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 16 } },
                    }}
                    whileHover={{ y: -3, background: "#f0fdf4", borderColor: "#22c55e" }}
                    className="px-4 py-1.5 bg-white border border-emerald-100 rounded-full text-xs font-bold text-slate-600 shadow-sm cursor-default transition-all"
                  >
                    {cat}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Post Dashboard Card */}
      {featuredPost && (
        <section className="py-20 bg-white border-b border-emerald-50 container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative rounded-3xl overflow-hidden bg-white border border-emerald-100 shadow-xl flex flex-col lg:flex-row items-stretch"
          >
            {/* Left: Article Info */}
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-slate-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 flex gap-4 opacity-50">
                 <div className="flex flex-col items-end">
                   <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Views</div>
                   <div className="text-sm font-black text-dark flex items-center gap-1"><Eye size={12}/> 12.4k</div>
                 </div>
                 <div className="flex flex-col items-end">
                   <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Engagement</div>
                   <div className="text-sm font-black text-green-600 flex items-center gap-1"><TrendingUp size={12}/> +42%</div>
                 </div>
              </div>

              <Badge variant="outline" className="w-fit mb-8 bg-white shadow-sm border-emerald-100">{featuredPost.category}</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight tracking-tight group-hover:text-primary transition-colors text-balance">
                {featuredPost.title}
              </h2>
              <p className="text-xl text-text-secondary mb-10 font-medium text-pretty leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-emerald-100">
                 <div className="flex items-center gap-4 text-xs font-black text-dark uppercase tracking-[0.2em]">
                   <span>{new Date(featuredPost.created_at).toLocaleDateString()}</span>
                   <span className="flex items-center gap-1.5 text-text-secondary">
                     <Clock size={12} /> 5 min read
                   </span>
                 </div>
                 <Link href={`/blog/${featuredPost.slug}`} className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2">
                   Read Article <ArrowRight size={16} />
                 </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="lg:w-1/2 relative aspect-square lg:aspect-auto border-l border-emerald-50 bg-white p-4">
               <div className="relative w-full h-full rounded-2xl overflow-hidden border border-emerald-100">
                  <Image
                    src={featuredPost.cover_image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-emerald-500/3 pointer-events-none" />
               </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Remaining Posts */}
      <div className="-mt-10">
        <BlogSection data={posts} />
      </div>

    </main>
  );
}
