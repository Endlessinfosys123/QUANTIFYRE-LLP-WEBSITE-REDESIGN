"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Brain, Cpu, Rocket, ChevronDown, Activity, Zap } from "lucide-react";
import { STATS } from "@/lib/constants";
import { Magnetic } from "@/components/ui/Magnetic";

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (hasAnimated) return;
    
    let start = 0;
    const end = value;
    const duration = 2.5;
    const increment = end / (duration * 60);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        setHasAnimated(true);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, hasAnimated]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const headline = "Engineering the Intelligence of Tomorrow.";
  const subheadline = "QUANTIFYRE LLP is a premier AI-First engineering firm. We craft bespoke automation, high-performance software, and digital-first legacies that redefine industry standards.";

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[110vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-white"
    >
      {/* Animated Fluid Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] bg-primary/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-accent/10 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[20%] w-[40vw] h-[40vw] bg-primary/5 blur-[150px] rounded-full"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 neural-grid opacity-50" />

      <div className="container-custom relative z-10">
        <motion.div 
          style={{ y: y1, opacity }}
          className="max-w-6xl mx-auto text-center space-y-12"
        >
          {/* High-End Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-4 px-8 py-3 rounded-2xl bg-white border border-primary/10 shadow-2xl shadow-primary/5 backdrop-blur-xl"
          >
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-white border-2 border-white"><Zap size={10} fill="currentColor" /></div>
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] text-white border-2 border-white"><Activity size={10} /></div>
            </div>
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-primary italic">
              Level Up Your Business
            </span>
          </motion.div>

          {/* Headline with Mask Reveal */}
          <h1 className="text-7xl md:text-[10rem] font-black text-dark leading-[0.82] tracking-tighter perspective-1000">
            {headline.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-6 pb-4">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word === "Intelligence" ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                      {word}
                    </span>
                  ) : word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
            className="text-xl md:text-3xl text-text-secondary leading-tight max-w-4xl mx-auto font-medium tracking-tight"
          >
            {subheadline}
          </motion.p>

          {/* Premium CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-8"
          >
            <Magnetic>
              <Button href="/contact" size="lg" className="w-full sm:w-auto px-16 h-24 text-2xl font-black rounded-3xl shadow-[0_30px_60px_-15px_rgba(99,102,241,0.4)] hover:shadow-[0_40px_80px_-15px_rgba(99,102,241,0.6)] transition-all">
                Forge the Future <ArrowRight className="ml-4 w-8 h-8" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/portfolio" variant="outline" size="lg" className="w-full sm:w-auto h-24 px-16 text-2xl font-black rounded-3xl border-primary/20 text-primary hover:bg-primary/5 backdrop-blur-xl">
                Explore Legacy
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* 3D Tilt Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-40 max-w-7xl mx-auto">
          {STATS.map((stat, i) => (
            <TiltCard key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                className="group relative p-12 rounded-[3rem] bg-white border border-primary/5 shadow-2xl shadow-primary/5 backdrop-blur-3xl overflow-hidden text-center"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 space-y-4">
                  <div className="text-6xl md:text-7xl font-black text-dark tracking-tighter italic">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[12px] font-black text-primary uppercase tracking-[0.5em] opacity-60">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Unique Scroll Down */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-px h-24 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
        <span className="text-[10px] font-black uppercase tracking-[1em] text-primary/40 rotate-180 [writing-mode:vertical-lr]">Discover</span>
      </motion.div>
    </section>
  );
};
