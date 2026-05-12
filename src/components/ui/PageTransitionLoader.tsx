"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Cartoon Rocket that zooms across the top progress bar
function MiniRocket({ progress }: { progress: number }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
      animate={{ left: `${Math.min(progress, 97)}%` }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
    >
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 -rotate-90">
        <path d="M14 2C14 2 8 8 8 16H20C20 8 14 2 14 2Z" fill="#6366f1" stroke="#3730a3" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="10" y="16" width="8" height="7" rx="2" fill="#818cf8" stroke="#3730a3" strokeWidth="1.5"/>
        <path d="M8 19L4 22L8 24V19Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M20 19L24 22L20 24V19Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1" strokeLinejoin="round"/>
        <circle cx="14" cy="10" r="3" fill="white" stroke="#3730a3" strokeWidth="1.5"/>
        <circle cx="14" cy="10" r="1.5" fill="#bae6fd"/>
        {/* Flame */}
        <path d="M11 23 Q14 29 17 23" stroke="#f97316" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    </motion.div>
  );
}

export function PageTransitionLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPathname = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      // Start loading
      setIsLoading(true);
      setProgress(0);

      // Rapid progress sequence
      const steps = [20, 40, 60, 80, 95];
      steps.forEach((val, i) => {
        timerRef.current = setTimeout(() => setProgress(val), i * 120);
      });

      // Complete
      timerRef.current = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 300);
      }, steps.length * 120 + 100);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[9998] h-1.5"
        >
          {/* Track */}
          <div className="absolute inset-0 bg-border" />
          {/* Progress Fill */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]"
            animate={{ width: `${progress}%`, backgroundPosition: ["0% 0%", "100% 0%"] }}
            transition={{ width: { type: "spring", stiffness: 60, damping: 12 }, backgroundPosition: { duration: 1, repeat: Infinity } }}
          />
          {/* Rocket Icon */}
          <div className="absolute inset-0 overflow-visible">
            <MiniRocket progress={progress} />
          </div>
          {/* Glow Effect */}
          <div
            className="absolute inset-y-0 bg-primary/30 blur-md transition-all duration-200"
            style={{ left: 0, width: `${progress}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
