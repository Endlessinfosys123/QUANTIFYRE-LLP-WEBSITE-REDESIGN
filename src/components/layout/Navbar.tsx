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
}

export const Navbar = ({ items, config }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
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
          {navLinks.map((link) => (
            <Magnetic key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "px-3 xl:px-5 py-2 text-sm font-bold transition-all duration-300 relative group text-dark/70 hover:text-primary whitespace-nowrap",
                  pathname === link.href && "text-primary"
                )}
              >
                {link.label}
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
          ))}
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
              {navLinks.map((link, i) => (
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
                      "text-5xl font-black transition-colors tracking-tighter",
                      pathname === link.href ? "text-primary" : "text-dark"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
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
