import { SERVICES } from "@/lib/constants";
import { notFound } from "next/navigation";
import { CTA } from "@/components/sections/CTA";
import { 
  Brain, Code2, Monitor, BarChart3, Smartphone, PenTool,
  CheckSquare2, ArrowRight, Star, Clock, Users, ShieldCheck, Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }));
}

const iconMap: Record<string, React.ElementType> = {
  Brain, Code2, Monitor, BarChart3, Smartphone, PenTool,
};

// Extended per-service content
const SERVICE_EXTENDED: Record<string, {
  tagline: string;
  benefits: Array<{ icon: React.ElementType; title: string; text: string }>;
  process: string[];
  faqs: Array<{ q: string; a: string }>;
}> = {
  "ai-automation": {
    tagline: "Let machines do the heavy lifting — so your team can focus on what humans do best.",
    benefits: [
      { icon: Zap, title: "10x Faster Operations", text: "Eliminate repetitive manual tasks entirely with custom AI agents." },
      { icon: ShieldCheck, title: "Error-Free Execution", text: "AI-driven workflows maintain 99.9% accuracy with zero fatigue." },
      { icon: Users, title: "Team Empowerment", text: "Free your staff from data entry to focus on strategy and creativity." },
      { icon: Clock, title: "24/7 Processing", text: "Your automation never sleeps — processes run around the clock." },
    ],
    process: ["Business Process Audit", "Automation Blueprint Design", "AI Model Selection & Training", "Integration & Deployment", "Performance Monitoring"],
    faqs: [
      { q: "Which AI models do you integrate?", a: "We work with OpenAI GPT-4, Claude 3, Gemini, and open-source models via LangChain and HuggingFace." },
      { q: "Can you automate my existing software workflows?", a: "Yes — we connect to any software via APIs, webhooks, or RPA tooling." },
    ],
  },
  "software-engineering": {
    tagline: "Custom-built software that fits your business perfectly — no off-the-shelf compromises.",
    benefits: [
      { icon: Zap, title: "Built for Scale", text: "Architecture designed to handle 10x your current load from day one." },
      { icon: ShieldCheck, title: "Enterprise Security", text: "OWASP compliance, encryption at rest & in transit, strict RBAC." },
      { icon: Users, title: "Role-Based Access", text: "Granular permissions so every user sees exactly what they need." },
      { icon: Clock, title: "Rapid Delivery", text: "Agile sprints with weekly demos — you see progress from week 1." },
    ],
    process: ["Requirement Analysis", "System Architecture Design", "Agile Development Sprints", "Quality Assurance & UAT", "Deployment & Handover"],
    faqs: [
      { q: "Can you build an ERP for my business?", a: "Absolutely — we've built multi-school ERPs, agency management systems, and CRMs from scratch." },
      { q: "What databases do you use?", a: "SQL Server, PostgreSQL, MySQL, MongoDB — selected based on your specific data requirements." },
    ],
  },
  "web-development": {
    tagline: "Your website is your hardest-working sales rep — let's make it world-class.",
    benefits: [
      { icon: Zap, title: "Lightning Performance", text: "Next.js SSG/SSR delivers sub-1s load times globally via CDN." },
      { icon: ShieldCheck, title: "SEO Optimized", text: "Built-in metadata, structured data, and Core Web Vitals compliance." },
      { icon: Users, title: "Conversion Focused", text: "Every layout decision is backed by UX research and A/B testing." },
      { icon: Star, title: "Pixel Perfect Design", text: "Every component crafted to match your brand identity precisely." },
    ],
    process: ["Brand & Content Audit", "Wireframing & Prototyping", "Design System Creation", "Next.js Development", "SEO & Performance Tuning"],
    faqs: [
      { q: "Do you build e-commerce websites?", a: "Yes — including custom storefronts, payment integrations (Razorpay, Stripe), and inventory systems." },
      { q: "How long does a website take?", a: "A standard website takes 2–4 weeks. Complex portals take 6–10 weeks." },
    ],
  },
  "digital-marketing": {
    tagline: "Traffic without strategy is noise. We engineer growth that compounds month over month.",
    benefits: [
      { icon: Zap, title: "Data-Driven Campaigns", text: "Every decision is backed by analytics, not guesswork." },
      { icon: Star, title: "Measurable ROI", text: "Clear KPIs and monthly reports so you always know your return." },
      { icon: Users, title: "Audience Targeting", text: "Precision targeting across Meta, Google, LinkedIn, and more." },
      { icon: ShieldCheck, title: "Brand Safety", text: "We protect your brand reputation across every digital channel." },
    ],
    process: ["Competitor & Market Analysis", "Content & SEO Strategy", "Campaign Launch", "Performance Tracking", "Continuous Optimisation"],
    faqs: [
      { q: "Do you run Google Ads?", a: "Yes — Search, Display, Performance Max, and YouTube campaigns." },
      { q: "How soon can I see SEO results?", a: "Typically 3–6 months for significant organic growth, depending on competition." },
    ],
  },
  "mobile-development": {
    tagline: "Apps that feel as premium as the brand behind them — on iOS and Android, from a single codebase.",
    benefits: [
      { icon: Zap, title: "One Codebase, Two Platforms", text: "Flutter/React Native delivers native performance on both iOS and Android." },
      { icon: ShieldCheck, title: "Secure Architecture", text: "Encrypted local storage, biometric auth, and secure API layers." },
      { icon: Users, title: "Offline-First Design", text: "Apps that work even without internet — syncing when reconnected." },
      { icon: Star, title: "App Store Ready", text: "We handle submission, metadata, screenshots, and ASO." },
    ],
    process: ["UX Flow & Wireframing", "UI Design (Mobile First)", "Flutter/RN Development", "Device Testing Matrix", "App Store Submission"],
    faqs: [
      { q: "Can you add AI features to mobile apps?", a: "Yes — on-device ML, OpenAI integrations, recommendation engines, and more." },
      { q: "Do you maintain apps post-launch?", a: "Yes — we offer monthly retainer packages for bug fixes, OS updates, and new features." },
    ],
  },
  "uiux-design": {
    tagline: "Beautiful interfaces that users love — designed with research, built for conversion.",
    benefits: [
      { icon: Zap, title: "Research-Backed Design", text: "User interviews, heatmaps, and competitor analysis drive every decision." },
      { icon: Star, title: "High-Fidelity Prototypes", text: "Interactive Figma prototypes indistinguishable from the final product." },
      { icon: ShieldCheck, title: "Accessibility First", text: "WCAG 2.1 AA compliance built into every component." },
      { icon: Users, title: "Design Systems", text: "Scalable token-based systems that keep product UI consistent forever." },
    ],
    process: ["User Research & Personas", "Information Architecture", "Wireframing", "Visual Design", "Prototype & User Testing"],
    faqs: [
      { q: "Do you design for both web and mobile?", a: "Yes — fully responsive, adaptive designs for every screen size and platform." },
      { q: "Will I own the Figma files?", a: "Absolutely — all source files are handed over to you on project completion." },
    ],
  },
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = SERVICES.find((s) => s.id === params.id);
  if (!service) notFound();

  const Icon = iconMap[service.icon] ?? Code2;
  const extended = SERVICE_EXTENDED[service.id];

  return (
    <main className="bg-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-44 pb-24 bg-surface tech-grid border-b border-border overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 bg-primary/6 rounded-full blur-[90px] animate-morph-blob pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="flex items-center gap-3 mb-8 text-sm font-bold text-text-secondary">
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest">
                <Icon size={14} /> Service Capability
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.88] text-balance">
                {service.title}
              </h1>
              {extended && (
                <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed italic">
                  &ldquo;{extended.tagline}&rdquo;
                </p>
              )}
              <p className="text-lg text-text-secondary font-medium leading-relaxed text-pretty">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
                  Get a Free Quote <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Animated 3D-ish Icon Box */}
            <div className="relative w-full aspect-square max-w-sm mx-auto lg:ml-auto">
              <div className="absolute inset-0 bg-white rounded-[3rem] border border-border shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 tech-grid opacity-30" />
                <div className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-1/4 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <div className="relative z-10 w-44 h-44 bg-surface border border-border rounded-3xl shadow-xl flex items-center justify-center text-primary animate-float">
                  <Icon size={72} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────── */}
      {extended && (
        <section className="section-padding bg-white border-b border-border">
          <div className="container-custom">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest mb-6">
                Key Benefits
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                What You <span className="text-primary">Gain.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {extended.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="bento-card p-7 flex flex-col gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <benefit.icon size={20} />
                  </div>
                  <h3 className="font-black text-dark text-lg">{benefit.title}</h3>
                  <p className="text-text-secondary text-sm font-medium leading-relaxed">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DELIVERABLES + TECH STACK ─────────────────── */}
      <section className="section-padding bg-surface tech-grid border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Deliverables */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest mb-6">
                  Deliverables & Scope
                </div>
                <h2 className="text-4xl font-black text-dark tracking-tighter">
                  What We <span className="text-primary">Build.</span>
                </h2>
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
              {extended && (
                <div className="mt-10">
                  <h3 className="text-2xl font-black text-dark mb-6 tracking-tight">Execution Roadmap</h3>
                  <div className="space-y-3">
                    {extended.process.map((step, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white border border-border p-5 rounded-xl shadow-sm hover:border-primary transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm shrink-0">
                          {i + 1}
                        </div>
                        <span className="font-bold text-dark">{step}</span>
                        {i < extended.process.length - 1 && (
                          <ArrowRight size={16} className="ml-auto text-text-secondary/40" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tech Stack Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
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
                          <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center font-black text-dark text-xs shadow-sm">
                            {t.charAt(0)}
                          </div>
                          <span className="font-bold text-dark">{t}</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick CTA Card */}
                <div className="bg-primary rounded-2xl p-8 text-white space-y-4">
                  <div className="text-2xl animate-float inline-block">🚀</div>
                  <h3 className="text-xl font-black">Ready to Start?</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Get a free consultation and project estimate within 24 hours.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-black rounded-xl hover:bg-surface transition-colors text-sm">
                    Book Free Consultation <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────── */}
      {extended && (
        <section className="section-padding bg-white border-b border-border">
          <div className="container-custom max-w-3xl">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest mb-6">
                FAQs
              </div>
              <h2 className="text-4xl font-black text-dark tracking-tighter">Common Questions.</h2>
            </div>
            <div className="space-y-4">
              {extended.faqs.map((faq, i) => (
                <div key={i} className="bg-surface border border-border rounded-2xl p-7 space-y-3">
                  <h3 className="font-black text-dark text-lg">{faq.q}</h3>
                  <p className="text-text-secondary font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OTHER SERVICES ────────────────────────────── */}
      <section className="section-padding bg-surface tech-grid border-b border-border">
        <div className="container-custom">
          <h2 className="text-3xl font-black text-dark tracking-tight mb-8">Explore Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.filter((s) => s.id !== service.id).slice(0, 3).map((s) => {
              const SIcon = iconMap[s.icon] ?? Code2;
              return (
                <Link key={s.id} href={`/services/${s.id}`} className="bg-white border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <SIcon size={18} />
                  </div>
                  <div>
                    <div className="font-black text-dark group-hover:text-primary transition-colors">{s.title}</div>
                    <div className="text-sm text-text-secondary mt-1 font-medium line-clamp-2">{s.description}</div>
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
