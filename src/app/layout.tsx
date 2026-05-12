import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SplashProvider } from "@/components/ui/SplashProvider";
import { PageTransitionLoader } from "@/components/ui/PageTransitionLoader";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "QUANTIFYRE LLP — The Future, Faster",
  description:
    "AI-Powered Digital Transformation & Software Engineering Firm. We build AI-powered software for high-growth enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <div className="grain-overlay" />
        {/* Cartoon Page Transition Rocket Bar — shown on every route change */}
        <PageTransitionLoader />
        {/* Full-Screen Splash Screen — shown once on first visit */}
        <SplashProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SplashProvider>
      </body>
    </html>
  );
}
