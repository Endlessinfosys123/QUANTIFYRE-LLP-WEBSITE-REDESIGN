"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransitionLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPathname = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setIsLoading(true);
      setProgress(0);

      const steps = [20, 45, 65, 82, 95];
      steps.forEach((val, i) => {
        timerRef.current = setTimeout(() => setProgress(val), i * 100);
      });

      timerRef.current = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 250);
      }, steps.length * 100 + 80);
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
          className="fixed top-0 left-0 right-0 z-[9998]"
          style={{ height: 2 }}
        >
          {/* Glow trail */}
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{
              background: "rgba(34,197,94,0.4)",
              filter: "blur(6px)",
              height: 8,
              top: -3,
            }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
          {/* Sharp bar */}
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ background: "linear-gradient(90deg, #10b981, #22c55e, #6ee7b7)" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          {/* Leading glow dot */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 8, height: 8,
              background: "#22c55e",
              boxShadow: "0 0 6px #22c55e, 0 0 14px #22c55e, 0 0 28px rgba(34,197,94,0.4)",
              marginLeft: -4,
            }}
            animate={{ left: `${Math.min(progress, 98)}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
