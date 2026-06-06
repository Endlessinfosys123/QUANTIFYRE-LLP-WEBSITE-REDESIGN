"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PREMIUM CUSTOM CURSOR
   - Outer ring follows with spring delay (elegant lag)
   - Inner dot snaps immediately
   - Expands + blends on hover over links/buttons
   - Click burst animation
   - Hidden on mobile (touch devices)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse position (instant)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring lags behind (spring)
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.5 });

  // Inner dot is more responsive
  const dotX = useSpring(mouseX, { stiffness: 300, damping: 28 });
  const dotY = useSpring(mouseY, { stiffness: 300, damping: 28 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    // Detect touch devices - don't show cursor on mobile
    const isTouchOnly = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouchOnly);
    if (isTouchOnly) return;

    // Add global cursor:none
    document.documentElement.style.cursor = "none";

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Track hover on interactive elements
    const SELECTORS = "a, button, [data-cursor-hover], input, textarea, select, [role='button'], label";
    
    const onElementEnter = () => setIsHovering(true);
    const onElementLeave = () => setIsHovering(false);

    const attachListeners = () => {
      document.querySelectorAll<HTMLElement>(SELECTORS).forEach(el => {
        el.addEventListener("mouseenter", onElementEnter);
        el.addEventListener("mouseleave", onElementLeave);
      });
    };

    attachListeners();

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* ── OUTER RING — lags behind, expands on hover ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: isHovering ? "rgba(34,197,94,0.8)" : "rgba(34,197,94,0.5)",
          mixBlendMode: "normal",
        }}
        animate={{
          width: isHovering ? 52 : isClicking ? 20 : 36,
          height: isHovering ? 52 : isClicking ? 20 : 36,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : 1,
          background: isHovering
            ? "rgba(34,197,94,0.08)"
            : "transparent",
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── INNER DOT — snaps fast ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: isHovering
            ? "rgba(34,197,94,1)"
            : "rgba(34,197,94,0.9)",
        }}
        animate={{
          width: isHovering ? 6 : isClicking ? 12 : 8,
          height: isHovering ? 6 : isClicking ? 12 : 8,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 1.4 : 1,
          boxShadow: isHovering
            ? "0 0 12px rgba(34,197,94,0.8), 0 0 24px rgba(34,197,94,0.4)"
            : isClicking
            ? "0 0 20px rgba(34,197,94,1), 0 0 40px rgba(34,197,94,0.5)"
            : "0 0 6px rgba(34,197,94,0.5)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
}
