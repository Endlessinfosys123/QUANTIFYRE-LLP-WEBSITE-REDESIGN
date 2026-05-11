"use client";

import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";

export const Blog = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute -bottom-20 -right-20 w-[30vw] h-[30vw] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary font-black text-xs uppercase tracking-[0.5em]">Insights</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-none"
            >
              The AI-First <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Thought Log.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Magnetic>
              <Button href="/blog" variant="outline" className="h-16 px-10 rounded-2xl border-primary/20 text-primary hover:bg-primary/5 group">
                Read All Articles <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-0 overflow-hidden group bg-transparent border-none shadow-none flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-surface border border-primary/5 shadow-2xl shadow-primary/5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge variant="surface">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-8 space-y-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    <span className="px-3 py-1 rounded-lg bg-primary/5">{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-primary/20" />
                    <span className="flex items-center gap-1.5 opacity-60">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  
                  <div className="space-y-4 flex-grow">
                    <h3 className="text-3xl font-black text-dark group-hover:text-primary transition-colors duration-500 tracking-tight line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-lg leading-relaxed font-medium line-clamp-2 opacity-80">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-4 text-primary font-black text-sm uppercase tracking-[0.3em] group/link"
                    >
                      Read Article
                      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all duration-500">
                        <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
