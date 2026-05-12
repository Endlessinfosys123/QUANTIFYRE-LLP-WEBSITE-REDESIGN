import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin, X, ArrowRight } from "lucide-react";
import { COMPANY_DETAILS, NAV_LINKS, SERVICES } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-border pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <img src="/logo-footer.png" alt="QUANTIFYRE" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {COMPANY_DETAILS.tagline}. AI-Powered Digital Transformation & Software Engineering Firm helping high-growth enterprises scale faster.
            </p>
            <div className="flex items-center gap-4">
              <Link href={COMPANY_DETAILS.linkedin} className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                <Linkedin size={18} />
              </Link>
              <Link href={COMPANY_DETAILS.instagram} className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                <X size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-dark font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-text-secondary hover:text-primary text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#" className="text-text-secondary hover:text-primary text-sm transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-secondary hover:text-primary text-sm transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-dark font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href="/services" className="text-text-secondary hover:text-primary text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-dark font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-text-secondary hover:text-primary text-sm transition-colors break-all">
                  {COMPANY_DETAILS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary shrink-0 mt-0.5" />
                <a href={`tel:${COMPANY_DETAILS.phone}`} className="text-text-secondary hover:text-primary text-sm transition-colors">
                  {COMPANY_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">
                  {COMPANY_DETAILS.address}
                </span>
              </li>
              <li className="pt-2">
                <span className="text-xs font-bold text-dark uppercase tracking-widest block mb-2">International Presence</span>
                <p className="text-text-secondary text-[11px] leading-relaxed uppercase tracking-tighter">
                  🇦🇪 Dubai | 🇬🇧 London | 🇨🇦 Canada | 🇦🇺 Australia
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-text-secondary text-xs">
            © 2025 {COMPANY_DETAILS.name} (LLPIN: {COMPANY_DETAILS.llpin}). All Rights Reserved.
          </p>
          <p className="text-primary font-bold text-sm tracking-widest uppercase italic">
            "{COMPANY_DETAILS.tagline}"
          </p>
        </div>
      </div>
    </footer>
  );
};
