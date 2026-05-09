"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, ArrowRight } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold text-sm uppercase tracking-[0.3em]"
            >
              Contact Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
            >
              Let's Build the <span className="text-primary">Next Big Thing</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              Have a project in mind? We respond to all inquiries within 24 hours.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left: Contact Form */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold text-dark">Send Us a Message</h2>
                <p className="text-text-secondary">Fill out the form below and our team will get back to you shortly.</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-dark uppercase tracking-widest">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:bg-white outline-none transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-dark uppercase tracking-widest">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:bg-white outline-none transition-all" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-dark uppercase tracking-widest">Phone Number</label>
                    <input type="tel" placeholder="+91 00000 00000" className="w-full px-6 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:bg-white outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-dark uppercase tracking-widest">Service Required</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                      <option>AI Automation</option>
                      <option>Software Engineering</option>
                      <option>Web Development</option>
                      <option>Mobile Apps</option>
                      <option>UI/UX Design</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-dark uppercase tracking-widest">Project Description</label>
                  <textarea rows={5} placeholder="Tell us about your project goals..." className="w-full px-6 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:bg-white outline-none transition-all resize-none" required></textarea>
                </div>

                <Button className="w-full py-5 text-lg gap-3">
                  Send Message <Send size={20} />
                </Button>
              </form>
            </div>

            {/* Right: Contact Info */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold text-dark">Contact Information</h2>
                <p className="text-text-secondary">Reach out through any of these channels or visit our office.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Mail, title: "Email Us", detail: COMPANY_DETAILS.email, sub: "Direct support" },
                  { icon: Phone, title: "Call Us", detail: COMPANY_DETAILS.phone, sub: "Mon-Sat, 9AM-7PM" },
                  { icon: Clock, title: "Response Time", detail: "Under 24 Hours", sub: "Guaranteed reply" },
                  { icon: Globe, title: "International", detail: "Global Reach", sub: "Dubai | London | USA" },
                ].map((item, i) => (
                  <Card key={i} className="flex flex-col gap-4 p-6 border-surface hover:border-primary/20 bg-surface/30">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark">{item.title}</h4>
                      <p className="text-sm text-primary font-bold">{item.detail}</p>
                      <p className="text-xs text-text-secondary mt-1">{item.sub}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-bold text-dark flex items-center gap-3">
                  <MapPin className="text-primary" /> Our Office
                </h4>
                <div className="p-8 bg-surface rounded-3xl border border-border space-y-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-primary/10 -translate-y-4 translate-x-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                    <MapPin size={120} fill="currentColor" />
                  </div>
                  <div className="relative z-10 space-y-4">
                    <p className="text-text-secondary leading-relaxed max-w-sm">
                      {COMPANY_DETAILS.address}
                    </p>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_DETAILS.address)}`}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-primary font-bold text-sm"
                    >
                      Open in Google Maps <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed Placeholder */}
      <section className="h-[400px] w-full bg-surface border-y border-border grayscale hover:grayscale-0 transition-all duration-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.497217315!2d72.63!3d23.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEzJzEyLjAiTiA3MsKwMzcnNDguMCJF!5e0!3m2!1sen!2sin!4v1620556200000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
}
