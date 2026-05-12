import { SERVICES } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CTA } from "@/components/sections/CTA";
import { Brain, Code2, Monitor, BarChart3, Smartphone, PenTool, CheckSquare2, Layers, Cpu } from "lucide-react";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }));
}

const iconMap = {
  Brain, Code2, Monitor, BarChart3, Smartphone, PenTool,
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = SERVICES.find((s) => s.id === params.id);
  if (!service) notFound();
  
  const Icon = iconMap[service.icon as keyof typeof iconMap] || Layers;

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* INDIVIDUAL SERVICE HERO - ENTERPRISE STRUCTURED */}
      <section className="relative pt-48 pb-24 overflow-hidden bg-surface tech-grid border-b border-border">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* Text Content */}
             <div className="max-w-2xl space-y-8">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-primary font-bold text-xs uppercase tracking-widest">
                 Capabilities / {service.title}
               </div>
               
               <h1 className="text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] text-balance">
                 {service.title}
               </h1>
               
               <p className="text-xl text-text-secondary font-medium leading-relaxed text-pretty">
                 {service.description}
               </p>
             </div>

             {/* Concrete Icon/Visual Box */}
             <div className="relative w-full aspect-square max-w-md mx-auto lg:ml-auto perspective-1000">
                <div className="absolute inset-0 bg-white rounded-[3rem] border border-border shadow-2xl flex items-center justify-center rotate-y-[-10deg] rotate-x-[10deg] transform-style-3d">
                   {/* Blueprint background inside the box */}
                   <div className="absolute inset-0 rounded-[3rem] tech-grid opacity-50" />
                   
                   <div className="relative z-10 w-48 h-48 bg-surface border border-border rounded-3xl shadow-lg flex items-center justify-center text-primary">
                     <Icon size={80} strokeWidth={1.5} />
                   </div>

                   {/* Floating Tech Badges */}
                   <div className="absolute -left-8 top-1/4 bg-white border border-border px-4 py-2 rounded-lg shadow-xl font-bold text-dark text-sm flex items-center gap-2 transform translate-z-[50px]">
                      <Cpu size={16} className="text-primary" /> Architecture
                   </div>
                   <div className="absolute -right-8 bottom-1/4 bg-white border border-border px-4 py-2 rounded-lg shadow-xl font-bold text-dark text-sm flex items-center gap-2 transform translate-z-[80px]">
                      <Code2 size={16} className="text-accent" /> Implementation
                   </div>
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* STRUCTURED SERVICE DETAILS */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content (Deliverables Checklist) */}
            <div className="lg:col-span-8 space-y-16">
               <div className="space-y-8">
                  <h2 className="text-4xl font-black text-dark tracking-tighter flex items-center gap-4">
                     <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">
                        <Layers size={18} />
                     </div>
                     Deliverables & Scope
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="bg-surface border border-border p-8 rounded-2xl flex items-start gap-4 hover:border-primary/50 transition-colors">
                        <CheckSquare2 className="text-primary shrink-0 mt-1" size={24} />
                        <span className="text-lg font-bold text-dark leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Right Sidebar (Tech Stack Dashboard-style) */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 p-8 rounded-[2rem] bg-white border border-border shadow-xl">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <h3 className="text-lg font-black text-dark ml-2">Tech Stack.config</h3>
                </div>
                
                <div className="space-y-3">
                  {service.tech.map((t, i) => (
                    <div key={i} className="group flex items-center justify-between bg-surface p-4 rounded-xl border border-border hover:border-primary transition-colors cursor-default">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center font-black text-dark text-xs">
                          {t.charAt(0)}
                        </div>
                        <span className="font-bold text-dark">{t}</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors" />
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
