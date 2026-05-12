import { SERVICES } from "@/lib/constants";
import { notFound } from "next/navigation";
import { CTA } from "@/components/sections/CTA";
import { Brain, Code2, Monitor, BarChart3, Smartphone, PenTool, CheckSquare2, ArrowRight, Zap, ShieldCheck, Clock, Users, Star } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }));
}

const iconMap: Record<string, React.ElementType> = { Brain, Code2, Monitor, BarChart3, Smartphone, PenTool };

const EXTENDED: Record<string, {
  tagline: string;
  stat1: string; stat1Label: string;
  stat2: string; stat2Label: string;
  stat3: string; stat3Label: string;
  benefits: { title: string; text: string }[];
  process: string[];
  faqs: { q: string; a: string }[];
}> = {
  "ai-automation": {
    tagline: "Let machines do the heavy lifting — so your team focuses on what humans do best.",
    stat1: "10x", stat1Label: "Faster Operations",
    stat2: "99.9%", stat2Label: "Accuracy Rate",
    stat3: "24/7", stat3Label: "Always Running",
    benefits: [
      { title: "Custom AI Agents", text: "Purpose-built agents trained on your business data that automate entire workflows end-to-end." },
      { title: "LLM Integration", text: "Connect GPT-4, Claude 3, and Gemini to your existing tools with secure, production-ready pipelines." },
      { title: "Predictive Analytics", text: "ML models that forecast demand, detect anomalies, and surface actionable business insights." },
      { title: "RPA + AI Hybrid", text: "Combine Robotic Process Automation with AI decision-making for legacy system compatibility." },
    ],
    process: ["Business Process Audit", "Automation Blueprint", "Model Training & Fine-tuning", "Integration & Testing", "Deployment & Monitoring"],
    faqs: [
      { q: "Which AI models do you integrate?", a: "OpenAI GPT-4, Claude 3, Gemini, and open-source models via LangChain and HuggingFace." },
      { q: "Can you automate existing software?", a: "Yes — via APIs, webhooks, or RPA tooling for any software stack." },
      { q: "Is my data secure?", a: "All data is processed with encryption at rest and in transit. We sign NDAs on all AI projects." },
    ],
  },
  "software-engineering": {
    tagline: "Custom-built software that fits your business perfectly — no off-the-shelf compromises.",
    stat1: "6–12", stat1Label: "Week Delivery",
    stat2: "99.5%", stat2Label: "Uptime SLA",
    stat3: "0", stat3Label: "Tech Debt Policy",
    benefits: [
      { title: "Enterprise ERPs", text: "Multi-module ERP systems with RBAC, audit trails, encrypted databases, and real-time dashboards." },
      { title: "SaaS Platforms", text: "Multi-tenant SaaS architectures with subscription billing, onboarding flows, and analytics." },
      { title: "Cloud Infrastructure", text: "AWS/Azure/GCP deployments with auto-scaling, CI/CD pipelines, and zero-downtime releases." },
      { title: "Legacy Migration", text: "Safe, incremental migration of legacy .NET, PHP, and Java systems to modern cloud-native stacks." },
    ],
    process: ["Requirements Analysis", "System Architecture", "Agile Sprint Development", "QA & UAT", "Deployment & Handover"],
    faqs: [
      { q: "Can you build a full ERP?", a: "Yes — we've built multi-school ERPs, agency management systems, and CRMs from scratch." },
      { q: "What databases do you use?", a: "SQL Server, PostgreSQL, MongoDB, MySQL — chosen based on your data shape and scale requirements." },
      { q: "Do you provide source code?", a: "Yes — full source code ownership is transferred to you on project completion." },
    ],
  },
  "web-development": {
    tagline: "Your website is your hardest-working sales rep — let's make it world-class.",
    stat1: "<1s", stat1Label: "Load Time",
    stat2: "100", stat2Label: "Lighthouse Score",
    stat3: "2–4", stat3Label: "Weeks Delivery",
    benefits: [
      { title: "Next.js Performance", text: "Server-side rendering, static generation, and edge functions for sub-second page loads globally." },
      { title: "SEO Architecture", text: "Technical SEO built-in: structured data, OpenGraph, sitemap, robots.txt, Core Web Vitals." },
      { title: "E-Commerce Ready", text: "Full online stores with Razorpay/Stripe, inventory, order tracking, and admin panels." },
      { title: "CMS Integration", text: "Headless CMS setups (Sanity, Contentful) so you can update content without a developer." },
    ],
    process: ["Brand & Content Audit", "Wireframing & Prototyping", "Design System", "Next.js Development", "SEO & Performance Tuning"],
    faqs: [
      { q: "Do you build e-commerce sites?", a: "Yes — including storefronts, payment gateways, inventory, and admin dashboards." },
      { q: "Will the site be mobile-friendly?", a: "Every site is mobile-first by default, tested on 15+ screen sizes and browsers." },
      { q: "Can I edit the site myself after launch?", a: "Yes — we integrate CMS platforms so your team can manage content independently." },
    ],
  },
  "digital-marketing": {
    tagline: "Traffic without strategy is noise. We engineer growth that compounds month over month.",
    stat1: "3x", stat1Label: "Average ROI",
    stat2: "2x", stat2Label: "Traffic Growth",
    stat3: "30d", stat3Label: "First Results",
    benefits: [
      { title: "SEO & Content", text: "Keyword research, technical SEO, and content calendars that drive organic traffic that compounds." },
      { title: "Paid Ads (PPC)", text: "Google Search, Performance Max, Meta Ads, and LinkedIn campaigns with full attribution tracking." },
      { title: "Social Media", text: "Platform-specific content strategy for Instagram, LinkedIn, and X that builds brand authority." },
      { title: "Analytics & Reports", text: "Monthly performance reports with clear KPIs — traffic, leads, CAC, and conversion rates." },
    ],
    process: ["Market & Competitor Analysis", "Channel Strategy", "Content Creation", "Campaign Launch", "Monthly Optimisation"],
    faqs: [
      { q: "How soon will I see results?", a: "PPC results within 7 days. SEO significant growth within 3–6 months." },
      { q: "Do you manage social media?", a: "Yes — content creation, scheduling, community management, and growth strategy." },
      { q: "What's the minimum engagement?", a: "We recommend a 3-month minimum for digital marketing to see meaningful compounding results." },
    ],
  },
  "mobile-development": {
    tagline: "Apps that feel as premium as the brand behind them — on iOS and Android.",
    stat1: "1", stat1Label: "Codebase, 2 Platforms",
    stat2: "4.8★", stat2Label: "Avg App Rating",
    stat3: "6–10", stat3Label: "Weeks Delivery",
    benefits: [
      { title: "Flutter / React Native", text: "Single codebase delivers 60fps native performance on both iOS and Android simultaneously." },
      { title: "Offline-First", text: "Apps that work without internet, syncing data automatically when reconnected." },
      { title: "AI Features", text: "On-device ML, chat interfaces, recommendation engines, and real-time AI integrations." },
      { title: "App Store Ready", text: "We handle full submission — metadata, screenshots, ASO, and App Store review support." },
    ],
    process: ["UX Flow & Wireframing", "UI Design (Mobile First)", "Flutter / RN Development", "Device Testing Matrix", "App Store Submission"],
    faqs: [
      { q: "Flutter or React Native — which do you recommend?", a: "Flutter for pixel-perfect UI. React Native if you have an existing React/JS team." },
      { q: "Can you add AI to an existing app?", a: "Yes — we integrate OpenAI, on-device TensorFlow Lite, and real-time APIs into existing apps." },
      { q: "Do you maintain apps after launch?", a: "Yes — monthly retainer packages cover OS updates, bug fixes, and feature additions." },
    ],
  },
  "uiux-design": {
    tagline: "Beautiful interfaces that users love — designed with research, built for conversion.",
    stat1: "40%", stat1Label: "Avg Conversion Lift",
    stat2: "48h", stat2Label: "First Wireframes",
    stat3: "100%", stat3Label: "File Ownership",
    benefits: [
      { title: "User Research", text: "Interviews, surveys, heatmaps, and competitor analysis before a single pixel is designed." },
      { title: "High-Fidelity Prototypes", text: "Interactive Figma prototypes that feel like the real product — shareable with your stakeholders." },
      { title: "Design Systems", text: "Token-based component libraries (Figma + code) that keep every team in sync forever." },
      { title: "Accessibility", text: "WCAG 2.1 AA compliance, contrast checks, and keyboard navigation built into every component." },
    ],
    process: ["User Research & Personas", "Information Architecture", "Wireframing", "Visual Design", "Prototype & Usability Testing"],
    faqs: [
      { q: "Do I own the Figma files?", a: "Yes — all source files, assets, and component libraries are handed over on completion." },
      { q: "Do you design for mobile too?", a: "Every design is fully responsive — desktop, tablet, and mobile variants are included." },
      { q: "Can you redesign an existing product?", a: "Yes — we do full UX audits and redesigns while maintaining user familiarity." },
    ],
  },
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = SERVICES.find((s) => s.id === params.id);
  if (!service) notFound();

  const Icon = iconMap[service.icon] ?? Code2;
  const ext = EXTENDED[service.id];
  const others = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <main className="bg-white min-h-screen">

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-44 pb-28 bg-surface tech-grid border-b border-border overflow-hidden">
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[100px] animate-morph-blob pointer-events-none" />
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-bold text-text-secondary mb-10">
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span className="text-border">/</span>
            <span className="text-dark">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest">
                <Icon size={14} /> Service Capability
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.88] text-balance">
                {service.title}
              </h1>
              {ext && (
                <p className="text-xl md:text-2xl text-text-secondary font-medium italic leading-relaxed">
                  &ldquo;{ext.tagline}&rdquo;
                </p>
              )}
              <p className="text-lg text-text-secondary font-medium leading-relaxed text-pretty">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
                  Get Free Quote <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-border text-dark font-black rounded-2xl hover:border-primary hover:text-primary transition-all">
                  Book Discovery Call
                </Link>
              </div>
            </div>

            {/* Stats + Icon Box */}
            <div className="lg:col-span-5 space-y-5">
              {/* Floating Icon Box */}
              <div className="relative bg-white rounded-[2.5rem] border border-border shadow-xl p-10 flex items-center justify-center aspect-square max-w-xs mx-auto overflow-hidden">
                <div className="absolute inset-0 tech-grid opacity-20" />
                <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-1/3 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                <div className="relative z-10 flex flex-col items-center gap-4 animate-float">
                  <div className="w-28 h-28 bg-surface border border-border rounded-3xl shadow-lg flex items-center justify-center text-primary">
                    <Icon size={56} strokeWidth={1.5} />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-primary">{service.title}</div>
                </div>
              </div>

              {/* Key Stats */}
              {ext && (
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: ext.stat1, label: ext.stat1Label },
                    { val: ext.stat2, label: ext.stat2Label },
                    { val: ext.stat3, label: ext.stat3Label },
                  ].map((s, i) => (
                    <div key={i} className="bg-white border border-border rounded-2xl p-4 text-center shadow-sm hover:border-primary transition-colors">
                      <div className="text-2xl font-black text-primary">{s.val}</div>
                      <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mt-1 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ──────────────────────────────────────── */}
      {ext && (
        <section className="section-padding bg-white border-b border-border">
          <div className="container-custom">
            <div className="mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest mb-5">
                <Zap size={12} /> Core Capabilities
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">What You <span className="text-primary">Gain.</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ext.benefits.map((b, i) => (
                <div key={i} className="bento-card p-8 group flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0 mt-0.5">
                    {[<Zap key={0}/>, <ShieldCheck key={1}/>, <Star key={2}/>, <Users key={3}/>][i % 4]}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-dark mb-2">{b.title}</h3>
                    <p className="text-text-secondary font-medium leading-relaxed">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── DELIVERABLES + TECH STACK ─────────────────────── */}
      <section className="section-padding bg-surface tech-grid border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest mb-5">
                  Deliverables & Scope
                </div>
                <h2 className="text-4xl font-black text-dark tracking-tighter">What We <span className="text-primary">Build.</span></h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="bg-white border border-border p-6 rounded-2xl flex items-start gap-4 hover:border-primary/50 transition-colors shadow-sm group">
                    <CheckSquare2 className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={22} />
                    <span className="text-base font-bold text-dark leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Process Timeline */}
              {ext && (
                <div>
                  <h3 className="text-2xl font-black text-dark mb-5 tracking-tight flex items-center gap-3">
                    <Clock size={22} className="text-primary" /> Execution Roadmap
                  </h3>
                  <div className="space-y-3">
                    {ext.process.map((step, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white border border-border p-5 rounded-xl shadow-sm hover:border-primary transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm shrink-0">{i + 1}</div>
                        <span className="font-bold text-dark">{step}</span>
                        {i < ext.process.length - 1 && <ArrowRight size={14} className="ml-auto text-text-secondary/30" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                {/* Tech Stack Terminal */}
                <div className="bg-white border border-border rounded-[2rem] shadow-xl overflow-hidden">
                  <div className="h-12 bg-surface border-b border-border flex items-center gap-3 px-6">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs font-black text-dark ml-2 uppercase tracking-widest">Tech Stack.config</span>
                  </div>
                  <div className="p-6 space-y-3">
                    {service.tech.map((t, i) => (
                      <div key={i} className="flex items-center justify-between bg-surface p-4 rounded-xl border border-border hover:border-primary transition-colors group cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center font-black text-dark text-xs shadow-sm">{t.charAt(0)}</div>
                          <span className="font-bold text-dark">{t}</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-primary rounded-2xl p-8 text-white space-y-4">
                  <div className="text-3xl animate-float inline-block">🚀</div>
                  <h3 className="text-xl font-black">Ready to Start?</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Free consultation and project estimate within 24 hours.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-black rounded-xl hover:bg-surface transition-colors text-sm">
                    Book Free Consultation <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQs ──────────────────────────────────────────── */}
      {ext && (
        <section className="section-padding bg-white border-b border-border">
          <div className="container-custom max-w-3xl">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest mb-5">
                FAQs
              </div>
              <h2 className="text-4xl font-black text-dark tracking-tighter">Common <span className="text-primary">Questions.</span></h2>
            </div>
            <div className="space-y-4">
              {ext.faqs.map((faq, i) => (
                <div key={i} className="bg-surface border border-border rounded-2xl p-7 space-y-3 hover:border-primary transition-colors">
                  <h3 className="font-black text-dark text-lg flex items-start gap-3">
                    <span className="text-primary mt-0.5 shrink-0">Q.</span>{faq.q}
                  </h3>
                  <p className="text-text-secondary font-medium leading-relaxed pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── OTHER SERVICES ────────────────────────────────── */}
      <section className="section-padding bg-surface tech-grid border-b border-border">
        <div className="container-custom">
          <h2 className="text-3xl font-black text-dark tracking-tight mb-8">Explore Other <span className="text-primary">Capabilities</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {others.map((s) => {
              const SIcon = iconMap[s.icon] ?? Code2;
              return (
                <Link key={s.id} href={`/services/${s.id}`} className="bg-white border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <SIcon size={18} />
                  </div>
                  <div>
                    <div className="font-black text-dark group-hover:text-primary transition-colors text-sm">{s.title}</div>
                    <div className="text-xs text-text-secondary mt-1 font-medium line-clamp-2">{s.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
