"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

interface NavbarProps {
  items: any[];
  config: Record<string, string>;
  services: any[];
}

export const Navbar = ({ items, config, services }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoUrl = config.logo_header || "/logo.png";
  const ctaItem = items.find(item => item.is_cta);
  const navLinks = items.filter(item => !item.is_cta);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/70 backdrop-blur-2xl shadow-2xl shadow-primary/5 border-b border-primary/10 py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Magnetic>
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img 
                src={logoUrl} 
                alt={config.site_name || "QUANTIFYRE"} 
                className="h-10 w-auto object-contain" 
              />
            </motion.div>
          </Link>
        </Magnetic>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isServices = link.label.toLowerCase() === 'services';
            
            return (
              <div 
                key={link.label}
                onMouseEnter={() => isServices && setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
                className="relative"
              >
                <Magnetic>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 xl:px-5 py-2 text-sm font-bold transition-all duration-300 relative group text-dark/70 hover:text-primary whitespace-nowrap flex items-center gap-1",
                      pathname === link.href && "text-primary"
                    )}
                  >
                    {link.label}
                    {isServices && (
                      <motion.span
                        animate={{ rotate: activeDropdown === 'services' ? 180 : 0 }}
                        className="inline-block opacity-50"
                      >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </motion.span>
                    )}
                    {pathname === link.href && (
                      <motion.span 
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/5 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100" />
                  </Link>
                </Magnetic>

                {/* Dropdown Menu */}
                {isServices && (
                  <AnimatePresence>
                    {activeDropdown === 'services' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                      >
                        <div className="bg-white rounded-[2rem] border border-border shadow-2xl p-6 w-[320px] grid grid-cols-1 gap-2">
                          {services.map((service) => (
                            <Link 
                              key={service.slug} 
                              href={`/services/${service.slug}`}
                              className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface transition-colors group/item"
                            >
                              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                {service.icon?.length <= 2 ? service.icon : <ArrowRight size={18} />}
                              </div>
                              <div>
                                <p className="font-bold text-dark text-sm mb-0.5">{service.title}</p>
                                <p className="text-[10px] text-text-secondary line-clamp-1">{service.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-6">
          {ctaItem && (
            <Magnetic>
              <Button 
                href={ctaItem.href} 
                size="sm" 
                className="px-8 font-bold h-12 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40"
              >
                {ctaItem.label} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Magnetic>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl lg:hidden flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col gap-8 overflow-y-auto pb-20">
              {navLinks.map((link, i) => {
                const isServices = link.label.toLowerCase() === 'services';
                
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-5xl font-black transition-colors tracking-tighter flex items-center justify-between",
                        pathname === link.href ? "text-primary" : "text-dark"
                      )}
                    >
                      {link.label}
                      {isServices && <span className="text-sm opacity-50 font-medium tracking-normal mt-4">({services.length} items)</span>}
                    </Link>
                    {isServices && (
                      <div className="mt-6 grid grid-cols-1 gap-4 pl-4 border-l-2 border-border">
                        {services.map((s) => (
                          <Link 
                            key={s.slug} 
                            href={`/services/${s.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-xl font-bold text-text-secondary hover:text-primary transition-colors"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
              {ctaItem && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-10"
                >
                  <Button href={ctaItem.href} className="w-full justify-between py-8 text-2xl h-20 rounded-3xl" onClick={() => setIsMobileMenuOpen(false)}>
                    {ctaItem.label} <ArrowRight size={28} />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
