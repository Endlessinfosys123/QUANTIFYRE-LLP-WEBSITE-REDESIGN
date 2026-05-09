"use client";

import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Blog = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-xs uppercase tracking-[0.3em]"
          >
            Insights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-dark"
          >
            Insights & Ideas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg"
          >
            AI, software engineering, and digital transformation — written by practitioners.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {BLOG_POSTS.map((post, i) => (
            <Card key={post.id} className="p-0 overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="primary" className="bg-primary/90 backdrop-blur-sm">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold text-text-secondary uppercase tracking-widest">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm group/link pt-2"
                >
                  Read More
                  <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button href="/blog" variant="outline" className="gap-2">
            Read All Articles <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};
