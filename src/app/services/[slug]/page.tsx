import { getServiceBySlug } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight, CheckCircle2, ChevronRight, MessageSquare, Code2, Layers
} from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { DynamicService3D } from "@/components/ui/DynamicService3D";
import { getServiceDetail } from "@/lib/serviceDetailsFallback";

export const revalidate = 0;

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return <div className="p-20 text-center font-black text-red-500">DB_URL_MISSING</div>;
  }

  let service: any = null;
  try {
    service = await getServiceBySlug(slug);
  } catch (e) {}

  if (!service) notFound();

  // Pull rich static content for this service
  const detail = getServiceDetail(slug);

  // DB data takes priority over static fallback where it exists
  const pageH1 = service.detail_page_h1 || service.title || detail.headline;
  const pageSubtext = service.detail_page_subtext || service.description || detail.subHeadline;
  const pageBadge = service.detail_page_badge || "Service";
  const pageContent = service.content;

  return (
    <main className="bg-white min-h-screen">

      {/* ══════════════════════════════════════════════
          HERO — Service-Specific Split Layout
      ══════════════════════════════════════════════ */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-surface tech-grid min-h-[92vh] flex items-center">
        <div className="container-custom relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-border shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">{pageBadge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-dark tracking-tighter leading-[0.9] text-balance"
              >
                {pageH1}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-lg"
              >
                {pageSubtext}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button href="/contact" size="lg" className="h-14 px-8 rounded-2xl text-base font-black shadow-xl shadow-primary/20">
                  Get Free Consultation <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button href="/portfolio" variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-base font-black">
                  View Our Work
                </Button>
              </motion.div>

              {/* Tech badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2"
              >
                {detail.techStack.slice(0, 6).map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white border border-border rounded-full text-xs font-black text-text-secondary shadow-sm">
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="relative h-[560px] w-full hidden lg:block"
            >
              <DynamicService3D slug={slug} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OVERVIEW — What This Service Is
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Overview</div>
            <h2 className="text-4xl md:text-6xl font-black text-dark tracking-tighter leading-tight">
              {detail.headline}
            </h2>
            <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed">
              {/* Use DB content if admin has added it, else use static detail */}
              {pageContent && pageContent.length > 50 ? pageContent : detail.overview}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT WE OFFER — 6 Detailed Cards
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container-custom">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">What We Offer</div>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                Everything Included in <span className="text-primary">{service.title}</span>
              </h2>
              <p className="text-text-secondary font-medium max-w-2xl mx-auto">
                A complete breakdown of every deliverable — so you know exactly what you are getting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detail.whatWeOffer.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                    <CheckCircle2 size={22} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-black text-dark mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-text-secondary font-medium leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURES — Quick Checklist
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Core Features</div>
                <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                  Built-In <span className="text-primary">Capabilities</span>
                </h2>
                <p className="text-text-secondary font-medium leading-relaxed">
                  Every project we deliver includes these capabilities as standard — not add-ons.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {detail.features.map((feat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-surface hover:border-primary/30 transition-all shadow-sm"
                  >
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="font-bold text-dark text-sm">{feat}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Why Us */}
            <div className="space-y-6">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Why Choose Us</div>
              {detail.whyUs.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-surface rounded-3xl p-8 border border-border hover:border-primary/30 transition-all shadow-sm"
                >
                  <h3 className="text-xl font-black text-dark mb-3">{w.title}</h3>
                  <p className="text-text-secondary font-medium leading-relaxed">{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS — Light Theme ═══ */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container-custom">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Our Process</div>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                How We <span className="text-primary">Deliver</span>
              </h2>
              <p className="text-text-secondary font-medium max-w-xl mx-auto">
                A transparent, structured process so you always know what happens next.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {detail.processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-white border border-border rounded-3xl p-8 hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="text-5xl font-black text-primary/15 mb-6">{step.step}</div>
                  <h3 className="text-xl font-black text-dark mb-3">{step.title}</h3>
                  <p className="text-text-secondary font-medium leading-relaxed text-sm">{step.desc}</p>
                  {i < detail.processSteps.length - 1 && (
                    <ChevronRight size={24} className="absolute top-1/2 -right-3 -translate-y-1/2 text-border hidden lg:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TECH STACK
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="container-custom">
          <div className="text-center space-y-8">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Technology Stack</div>
            <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tighter">
              Tools We Use for <span className="text-primary">{service.title}</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {detail.techStack.map((tech) => (
                <span key={tech} className="px-5 py-2.5 bg-white border border-border rounded-full text-sm font-black text-dark shadow-sm hover:border-primary hover:text-primary transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">FAQ</div>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                Common <span className="text-primary">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {detail.faq.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-surface rounded-3xl p-8 border border-border shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <MessageSquare size={20} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-dark text-lg mb-3">{item.q}</h3>
                      <p className="text-text-secondary font-medium leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA — Light ═══ */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-none">
              Ready to Start? <br /><span className="text-primary">Let's Talk.</span>
            </h2>
            <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto">
              Get a free 30-minute consultation with our {service.title} specialists. We'll assess your requirements and send a detailed proposal within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button href="/contact" variant="primary" size="lg" className="h-16 px-10 rounded-2xl text-lg font-black shadow-lg shadow-primary/20">
                Get Free Consultation
              </Button>
              <Button href="/portfolio" variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-lg font-black">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
