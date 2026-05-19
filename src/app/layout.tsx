import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { SplashProvider } from "@/components/ui/SplashProvider";
import { PageTransitionLoader } from "@/components/ui/PageTransitionLoader";
import { ScrollProgressBar } from "@/components/ui/ScrollAnimations";
import { getSiteConfig, getNavItems, getFooterLinks, getServices } from "@/lib/supabase/data";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: config.meta_title || "QUANTIFYRE LLP — The Future, Faster",
    description: config.meta_description || "AI-Powered Digital Transformation & Software Engineering Firm.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [config, navItems, footerLinks, services] = await Promise.all([
    getSiteConfig(),
    getNavItems(),
    getFooterLinks(),
    getServices()
  ]);

  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <div className="grain-overlay" />
        <PageTransitionLoader />
        <ScrollProgressBar />
        <SplashProvider config={config}>
          <ConditionalLayout 
            navItems={navItems} 
            footerLinks={footerLinks} 
            config={config}
            services={services}
          >
            {children}
          </ConditionalLayout>
        </SplashProvider>
      </body>
    </html>
  );
}
