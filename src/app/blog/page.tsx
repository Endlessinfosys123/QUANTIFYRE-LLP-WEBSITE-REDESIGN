"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Blog as BlogSection } from "@/components/sections/Blog";
import { BLOG_POSTS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function BlogPage() {
  const featuredPost = BLOG_POSTS[0];

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* UNIQUE BLOG HERO (Magazine Style) */}
      <section className="pt-40 pb-20 container-custom">
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row items-end justify-between gap-8 border-b border-border pb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black text-dark tracking-tighter"
          >
            The Log.
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-text-secondary font-medium uppercase tracking-[0.3em] text-xs max-w-[200px]"
          >
            Perspectives on Engineering & AI
          </motion.p>
        </div>

        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative rounded-[3rem] overflow-hidden bg-surface flex flex-col lg:flex-row items-stretch"
        >
          <div className="lg:w-1/2 relative aspect-square lg:aspect-auto">
            <Image 
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-primary/5">
            <Badge variant="surface" className="w-fit mb-6">{featuredPost.category}</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight tracking-tight group-hover:text-primary transition-colors text-balance">
              {featuredPost.title}
            </h2>
            <p className="text-xl text-text-secondary mb-8 font-medium text-pretty">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto pt-8 border-t border-primary/10">
               <div className="flex items-center gap-4 text-xs font-black text-primary uppercase tracking-[0.2em]">
                 <span>{featuredPost.date}</span>
                 <span className="flex items-center gap-1.5 opacity-60">
                   <Clock size={12} /> {featuredPost.readTime}
                 </span>
               </div>
               <Link href="/blog" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-xl group-hover:bg-primary group-hover:text-white transition-colors">
                 <ArrowRight size={20} />
               </Link>
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
