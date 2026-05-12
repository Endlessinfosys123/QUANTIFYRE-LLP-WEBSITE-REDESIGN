"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

export const Navbar = () => {
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
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 transition-transform"
            >
              <span className="text-2xl font-black italic">Q</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-dark leading-none">QUANTIFYRE</span>
              <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase">Innovation</span>
            </div>
          </Link>
        </Magnetic>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Magnetic key={link.name}>
              <Link
                href={link.href}
                className={cn(
                  "px-3 xl:px-5 py-2 text-sm font-bold transition-all duration-300 relative group text-dark/70 hover:text-primary whitespace-nowrap",
                  pathname === link.href && "text-primary"
                )}
              >
                {link.name}
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
          <Magnetic>
            <Button 
              href="/contact" 
              size="sm" 
              className="px-8 font-bold h-12 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40"
            >
              Let's Talk <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Magnetic>
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
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
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
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-10 mt-auto pb-10"
              >
                <Button href="/contact" className="w-full justify-between py-8 text-2xl h-20 rounded-3xl" onClick={() => setIsMobileMenuOpen(false)}>
                  Start a Project <ArrowRight size={28} />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
