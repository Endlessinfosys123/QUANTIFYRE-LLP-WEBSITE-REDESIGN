"use client";

import { motion } from "framer-motion";
import { COMPANY_DETAILS, WHY_CHOOSE_US } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, Target, Eye, Award, ArrowRight, Shield, Globe, Zap } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-bold text-sm uppercase tracking-[0.3em]"
              >
                Who We Are
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold text-dark leading-tight"
              >
                We Are <span className="text-primary">QUANTIFYRE</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary leading-relaxed"
              >
                A team of engineers, designers, and AI specialists dedicated to accelerating the digital transformation of enterprises worldwide.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-primary/10 shadow-sm inline-block"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Shield size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-dark">Registered LLP</div>
                  <div className="text-xs text-text-secondary">LLPIN: {COMPANY_DETAILS.llpin}</div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square lg:aspect-video rounded-[32px] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image
                src="https://placehold.co/1200x800/6C3FEF/FFFFFF?text=Our+Headquarters"
                alt="Quantifyre HQ"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://placehold.co/800x1000/F8F7FF/6C3FEF?text=Founder+Photo"
                alt="Tishy Patel"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dark to-transparent">
                <h3 className="text-2xl font-bold text-white">Tishy Patel</h3>
                <p className="text-primary font-bold text-sm uppercase tracking-widest">Founder & CEO</p>
              </div>
            </motion.div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-extrabold text-dark">Meet the Visionaries</h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Founded by Tishy Patel (Tishykumar Chandrakantbhai Patel) with a vision to integrate AI into every enterprise workflow. Supported by co-partner Chandrakant Hirabhai Patel, we've grown from a startup into a registered LLP serving international markets.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary">
                    <Target size={20} />
                  </div>
                  <h4 className="font-bold text-dark text-lg">Our Mission</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    To deliver enterprise-grade AI solutions that solve real business problems with unprecedented speed.
                  </p>
                </Card>
                <Card className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary">
                    <Eye size={20} />
                  </div>
                  <h4 className="font-bold text-dark text-lg">Our Vision</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    To be the world's most trusted partner for AI-powered digital transformation and high-performance engineering.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-surface">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-extrabold text-dark">Our Core Values</h2>
            <p className="text-text-secondary text-lg">
              The principles that guide every line of code we write and every solution we design.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Innovation First", icon: Zap, desc: "We don't just use technology; we push its boundaries." },
              { title: "Absolute Quality", icon: Award, desc: "Bugs are not an option. Performance is our obsession." },
              { title: "Client Success", icon: Users, desc: "Your growth is the only metric that matters to us." },
              { title: "Global Impact", icon: Globe, desc: "Building solutions that work at scale, anywhere in the world." },
            ].map((v, i) => (
              <Card key={i} className="text-center space-y-4 bg-white border-transparent hover:border-primary/20">
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-primary mx-auto">
                  <v.icon size={28} />
                </div>
                <h4 className="font-bold text-dark text-xl">{v.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* International Presence */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-dark rounded-[40px] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
            </div>
            <div className="flex-1 space-y-6 relative z-10">
              <h2 className="text-4xl font-extrabold text-white">Global Footprint</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                While headquartered in India, our reach is global. We actively serve clients and collaborate with partners in Dubai, London, Australia, Canada, and the USA.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {["🇦🇪 Dubai", "🇬🇧 London", "🇦🇺 Australia", "🇨🇦 Canada", "🇺🇸 USA"].map((loc) => (
                  <span key={loc} className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 text-center relative z-10">
              <div className="text-primary text-8xl font-black mb-4 opacity-50">7+</div>
              <div className="text-white text-2xl font-bold uppercase tracking-widest">Countries Served</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
