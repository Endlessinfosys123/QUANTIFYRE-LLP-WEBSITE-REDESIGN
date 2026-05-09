"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_POSTS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Clock, ArrowRight, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const categories = ["All", "AI Automation", "Web Development", "Software Engineering"];
  const [activeTab, setActiveTab] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesTab = activeTab === "All" || post.category === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-2xl space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-bold text-sm uppercase tracking-[0.3em]"
              >
                Our Blog
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-extrabold text-dark leading-tight"
              >
                Insights for the <span className="text-primary">AI Era</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary leading-relaxed"
              >
                Expert perspectives on AI automation, high-performance web development, and digital transformation.
              </motion.p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Listing */}
      <section className="py-20">
        <div className="container-custom">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <div className="flex items-center gap-2 text-dark font-bold text-sm uppercase tracking-widest mr-4">
              <Tag size={16} className="text-primary" /> Filter:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 border-2",
                  activeTab === cat
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white border-surface text-text-secondary hover:border-primary/20 hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="p-0 overflow-hidden group h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="primary" className="shadow-lg">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors duration-300 mb-4 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-6 border-t border-border">
                        <Link
                          href="#"
                          className="inline-flex items-center gap-2 text-primary font-bold text-sm group/link"
                        >
                          Read Article
                          <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-primary/40" />
              </div>
              <h3 className="text-2xl font-bold text-dark">No articles found</h3>
              <p className="text-text-secondary mt-2">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-dark overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="grid grid-cols-6 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-white/20 h-full" />
            ))}
          </div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Subscribe to <span className="text-primary">IRIS</span> Insights</h2>
            <p className="text-gray-400 text-lg">
              Get our weekly deep-dive into AI, automation, and tech strategy delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary transition-colors"
                required
              />
              <button className="bg-primary text-white font-bold px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
