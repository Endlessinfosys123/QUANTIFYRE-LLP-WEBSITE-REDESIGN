"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import React from "react";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  navItems: any[];
  footerLinks: any[];
  config: Record<string, string>;
  services: any[];
}

export const ConditionalLayout = ({ 
  children, 
  navItems, 
  footerLinks, 
  config,
  services
}: ConditionalLayoutProps) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Navbar items={navItems} config={config} services={services} />
      <main className="flex-grow">{children}</main>
      <Footer links={footerLinks} config={config} />
    </>
  );
};
