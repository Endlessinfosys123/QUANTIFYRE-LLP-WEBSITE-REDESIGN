"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Blog as BlogSection } from "@/components/sections/Blog";
import { BLOG_POSTS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, BarChart2, Eye, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function BlogPage() {
  const featuredPost = BLOG_POSTS[0];

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* ENTERPRISE BLOG HERO - Data-Driven Insights Dashboard */}
      <section className="pt-40 pb-20 container-custom">
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row items-end justify-between gap-8 border-b border-border pb-8">
          <div className="space-y-4">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface border border-border text-primary font-bold text-[10px] uppercase tracking-widest"
             >
               <BarChart2 size={12} />
               Technical Intelligence
             </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-black text-dark tracking-tighter"
            >
              The System Log.
            </motion.h1>
          </div>
          <motion.p
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-text-secondary font-medium max-w-sm text-right hidden md:block text-pretty"
          >
            Engineering perspectives, system architecture deep-dives, and performance scaling strategies.
          </motion.p>
        </div>

        {/* Featured Post Dashboard Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative rounded-3xl overflow-hidden bg-white border border-border shadow-xl flex flex-col lg:flex-row items-stretch"
        >
          {/* Left: Article Info */}
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-surface relative overflow-hidden">
            {/* Fake Dashboard Elements */}
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

            <Badge variant="outline" className="w-fit mb-8 bg-white shadow-sm border-border">{featuredPost.category}</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight tracking-tight group-hover:text-primary transition-colors text-balance">
              {featuredPost.title}
            </h2>
            <p className="text-xl text-text-secondary mb-10 font-medium text-pretty leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto pt-8 border-t border-border">
               <div className="flex items-center gap-4 text-xs font-black text-dark uppercase tracking-[0.2em]">
                 <span>{featuredPost.date}</span>
                 <span className="flex items-center gap-1.5 text-text-secondary">
                   <Clock size={12} /> {featuredPost.readTime}
                 </span>
               </div>
               <Link href="/blog" className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg group-hover:bg-accent transition-colors flex items-center gap-2">
                 Read System Log <ArrowRight size={16} />
               </Link>
            </div>
          </div>

          {/* Right: Concrete Image with UI Overlay */}
          <div className="lg:w-1/2 relative aspect-square lg:aspect-auto border-l border-border bg-white p-4">
             <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border">
                <Image 
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
             </div>
          </div>
        </motion.div>
      </section>

      {/* Remaining Posts */}
      <div className="-mt-10">
        <BlogSection />
      </div>

      <Footer />
    </main>
  );
}
