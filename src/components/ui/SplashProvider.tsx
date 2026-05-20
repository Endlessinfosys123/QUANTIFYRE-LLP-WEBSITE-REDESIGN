"use client";

import { AnimatePresence, motion } from "framer-motion";
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
  const [contentVisible, setContentVisible] = useState(false);

  const handleComplete = useCallback(() => {
    setShowSplash(false);
    // Small delay before fading in the main content
    setTimeout(() => setContentVisible(true), 100);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    if (showSplash) document.body.style.overflow = "hidden";
  }, [showSplash]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onComplete={handleComplete} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
