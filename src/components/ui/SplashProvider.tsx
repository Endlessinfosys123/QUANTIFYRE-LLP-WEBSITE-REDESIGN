"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { SplashScreen } from "@/components/ui/SplashScreen";

export function SplashProvider({ 
  children,
  config 
}: { 
  children: React.ReactNode;
  config?: Record<string, any>;
}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if the splash screen has already been shown in this session
    const hasShown = sessionStorage.getItem("hasShownSplash");
    if (hasShown) {
      setShowSplash(false);
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleComplete = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem("hasShownSplash", "true");
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onComplete={handleComplete} />}
      </AnimatePresence>
      <div>
        {children}
      </div>
    </>
  );
}
