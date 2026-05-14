"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Instagram, Linkedin, Twitter, 
  Mail, Phone, MapPin, ArrowUpRight 
} from "lucide-react";

interface FooterProps {
  links: any[];
  config: Record<string, string>;
}

export const Footer = ({ links, config }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: config.linkedin_url, label: "LinkedIn" },
    { icon: Instagram, href: config.instagram_url, label: "Instagram" },
    { icon: Twitter, href: config.twitter_url, label: "Twitter" },
  ].filter(link => link.href && link.href !== "#");

  const columns = {
    company: links.filter(l => l.column_name === 'company'),
    services: links.filter(l => l.column_name === 'services'),
    legal: links.filter(l => l.column_name === 'legal'),
  };

  return (
    <footer className="bg-dark text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block">
              <img src={config.logo_footer || "/logo-footer.png"} alt="QUANTIFYRE" className="h-12 w-auto" />
            </Link>
            <p className="text-white/60 text-lg leading-relaxed max-w-sm">
              {config.footer_description || "AI-Powered Digital Transformation & Software Engineering Firm."}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary">Company</h4>
            <ul className="space-y-4">
              {columns.company.map((link: any) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary">Capabilities</h4>
            <ul className="space-y-4">
              {/* Fallback or dynamic services from footer_links */}
              {columns.services.map((link: any) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary">Contact</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Email Us</p>
                  <a href={`mailto:${config.email}`} className="text-white font-bold hover:text-primary transition-colors">
                    {config.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Call Us</p>
                  <a href={`tel:${config.phone_primary}`} className="text-white font-bold hover:text-primary transition-colors">
                    {config.phone_primary}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Our Base</p>
                  <p className="text-white font-bold">{config.address_short || "Gandhinagar, India"}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm font-medium">
            {config.copyright_text || `© ${currentYear} QUANTIFYRE LLP. All Rights Reserved.`}
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-white/40 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/40 text-sm hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
