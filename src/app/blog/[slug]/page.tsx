import { getPostBySlug, getBlogPosts } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock, Share2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "framer-motion/client";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Article Header */}
      <section className="pt-48 pb-20 container-custom">
        <div className="max-w-4xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <Link href="/blog" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-dark hover:bg-surface transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <Badge variant="surface" className="px-6 py-2">{post.category}</Badge>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-[0.95] text-balance"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-between gap-8 pt-6 border-t border-border"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-black text-white">
                Q
              </div>
              <div>
                <div className="text-sm font-black text-dark">Quantifyre Engineering</div>
                <div className="text-xs text-text-secondary font-bold uppercase tracking-widest">
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs font-black text-dark uppercase tracking-widest">
              <span className="flex items-center gap-2"><Clock size={14} className="text-primary"/> 5 MIN READ</span>
              <button className="flex items-center gap-2 hover:text-primary transition-colors"><Share2 size={14} className="text-primary"/> SHARE</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative aspect-[21/9] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl"
        >
          <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
        </motion.div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-2xl prose-slate prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-p:text-text-secondary prose-strong:text-dark">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </section>

      {/* Article Footer */}
      <section className="pb-32 container-custom">
        <div className="max-w-3xl mx-auto pt-20 border-t border-border text-center space-y-12">
          <h3 className="text-4xl font-black text-dark tracking-tight">Stay updated with our technical logs.</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button href="/contact" size="lg" className="px-12 h-20 rounded-2xl text-xl font-black">Subscribe to Newsletter</Button>
            <Button href="/blog" variant="outline" size="lg" className="px-12 h-20 rounded-2xl text-xl font-black bg-white">Back to Insights</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
