import { getServiceBySlug, getServices } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Service Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-surface tech-grid">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge variant="surface" className="px-6 py-2 text-xs font-black uppercase tracking-[0.3em]">
                {service.icon?.length <= 2 ? service.icon : <Sparkles size={14} className="mr-2" />}
                {service.title}
              </Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9]"
            >
              {service.title}.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl"
            >
              {service.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {service.tags?.map((tag: string, i: number) => (
                <div key={i} className="px-4 py-2 bg-white border border-border rounded-xl text-sm font-bold text-dark shadow-sm">
                  {tag}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content & Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Detailed Content (from TipTap) */}
            <div className="space-y-12">
              <div className="prose prose-xl prose-slate max-w-none">
                <div dangerouslySetInnerHTML={{ __html: service.content }} />
              </div>
            </div>

            {/* Features/Capabilities Sidebar */}
            <div className="space-y-12">
              <div className="bg-surface rounded-[3rem] p-12 border border-border sticky top-32">
                <h3 className="text-3xl font-black text-dark mb-8 tracking-tight">Key Capabilities</h3>
                <div className="space-y-6">
                  {service.features?.map((feature: string, i: number) => (
                    <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-border shadow-sm group hover:border-primary/20 transition-all">
                      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <CheckCircle2 size={20} />
                      </div>
                      <p className="font-bold text-dark">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                   <Button href="/contact" size="lg" className="w-full h-20 rounded-2xl text-xl font-black shadow-xl shadow-primary/20">
                     Start with {service.title.split(' ')[0]} <ArrowRight className="ml-3" />
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="section-padding bg-surface border-t border-border">
        <div className="container-custom text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-black text-dark tracking-tighter">Ready to scale your mission?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button href="/contact" size="lg" className="px-12 h-20 rounded-2xl text-xl font-black">Get a Proposal</Button>
            <Button href="/services" variant="outline" size="lg" className="px-12 h-20 rounded-2xl text-xl font-black bg-white">Explore All Services</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
