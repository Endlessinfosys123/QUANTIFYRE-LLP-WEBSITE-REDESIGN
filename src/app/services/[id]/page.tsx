import { SERVICES } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CTA } from "@/components/sections/CTA";
import { Brain, Code2, Monitor, BarChart3, Smartphone, PenTool, CheckCircle2, Sparkles } from "lucide-react";

// Server component to generate static params for all services
export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }));
}

const iconMap = {
  Brain,
  Code2,
  Monitor,
  BarChart3,
  Smartphone,
  PenTool,
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = SERVICES.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon as keyof typeof iconMap] || Sparkles;

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* INDIVIDUAL SERVICE HERO */}
      <section className="relative pt-48 pb-24 overflow-hidden bg-surface border-b border-primary/5">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white shadow-xl shadow-primary/5 border border-primary/10">
               <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                 <Icon size={16} />
               </div>
               <span className="text-primary font-black uppercase tracking-widest text-xs">Capabilities / {service.title}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] text-balance">
              {service.title}
            </h1>
            
            <p className="text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl text-pretty">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE DETAILS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-16">
               <div className="space-y-8">
                  <h2 className="text-4xl font-black text-dark tracking-tighter">What We Deliver</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="bg-surface border border-primary/5 p-8 rounded-3xl flex items-start gap-4">
                        <CheckCircle2 className="text-primary shrink-0 mt-1" size={24} />
                        <span className="text-lg font-bold text-dark">{item}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="p-12 rounded-[3rem] bg-dark text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
                 <h3 className="text-3xl font-black mb-6 relative z-10">Ready to leverage {service.title}?</h3>
                 <p className="text-lg text-white/70 mb-8 relative z-10 max-w-xl text-pretty">
                   Our engineering team is ready to audit your current setup and build a roadmap for implementation.
                 </p>
                 <a href="/contact" className="inline-block px-10 py-4 bg-primary text-white font-bold rounded-2xl relative z-10 hover:bg-primary-light transition-colors shadow-xl shadow-primary/20">
                   Schedule Consultation
                 </a>
               </div>
            </div>

            {/* Right Sidebar (Tech Stack) */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 p-10 rounded-[3rem] bg-surface border border-primary/5 shadow-2xl shadow-primary/5">
                <h3 className="text-2xl font-black text-dark mb-8 tracking-tight">Technology Stack</h3>
                <div className="flex flex-col gap-4">
                  {service.tech.map((t, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-border">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-bold text-dark">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
