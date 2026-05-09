"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Brain, Cpu, Rocket, ChevronDown } from "lucide-react";
import { STATS } from "@/lib/constants";

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

const FloatingNode = ({ icon: Icon, delay = 0, x = "0%", y = "0%", size = 40, mouseX, mouseY }: any) => {
  const parallaxX = useTransform(mouseX, [0, 2000], [-20, 20]);
  const parallaxY = useTransform(mouseY, [0, 1000], [-20, 20]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1], 
        scale: [1, 1.05, 1],
      }}
      style={{ left: x, top: y, x: parallaxX, y: parallaxY }}
      transition={{ 
        duration: 10 + delay * 2, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      className="absolute pointer-events-none z-0"
    >
      <div className="p-4 rounded-3xl bg-primary/5 border border-primary/10 backdrop-blur-3xl text-primary/30" style={{ width: size, height: size }}>
        <Icon size={size - 32} strokeWidth={1} />
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const headline = "Empowering Enterprises with AI-First Engineering.";
  const subheadline = "QUANTIFYRE LLP delivers bespoke AI automation, high-performance software, and digital-first strategies that accelerate your growth at scale.";

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-dark"
    >
      {/* Neural Mesh Background */}
      <div className="absolute inset-0 z-0 neural-grid opacity-30" />
      
      {/* Dynamic Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 -left-1/4 w-[80vw] h-[80vw] bg-primary/20 blur-[180px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] bg-accent/15 blur-[180px] rounded-full"
        />
      </div>

      {/* Floating Nodes with Mouse Parallax */}
      <FloatingNode icon={Brain} x="10%" y="15%" delay={0} size={80} mouseX={mouseX} mouseY={mouseY} />
      <FloatingNode icon={Cpu} x="85%" y="10%" delay={2} size={70} mouseX={mouseX} mouseY={mouseY} />
      <FloatingNode icon={Sparkles} x="5%" y="75%" delay={4} size={60} mouseX={mouseX} mouseY={mouseY} />
      <FloatingNode icon={Rocket} x="90%" y="70%" delay={1} size={90} mouseX={mouseX} mouseY={mouseY} />

      <div className="container-custom relative z-10">
        <motion.div 
          style={{ y: y1, opacity }}
          className="max-w-5xl mx-auto text-center space-y-12"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl"
          >
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/90">
              Future-Proof Engineering
            </span>
          </motion.div>

          {/* Headline with Staggered Entrance */}
          <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter">
            {headline.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-4 origin-bottom perspective-1000"
              >
                {word === "AI-First" ? <span className="text-primary">{word}</span> : word}
              </motion.span>
            ))}
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="text-xl md:text-3xl text-gray-400 leading-tight max-w-4xl mx-auto font-medium tracking-tight"
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8"
          >
            <Button href="/contact" size="lg" className="w-full sm:w-auto px-12 h-20 text-xl font-black rounded-3xl shadow-[0_20px_50px_rgba(108,63,239,0.4)] hover:shadow-[0_25px_60px_rgba(108,63,239,0.6)] transition-all">
              Build the Future <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-3 transition-transform" />
            </Button>
            <Button href="/portfolio" variant="outline" size="lg" className="w-full sm:w-auto h-20 px-12 text-xl font-black rounded-3xl border-white/10 text-white hover:bg-white/5 backdrop-blur-xl">
              Our Legacy
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-32 max-w-6xl mx-auto">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "circOut" }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 space-y-3">
                <div className="text-5xl md:text-6xl font-black text-white tracking-tighter italic">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] font-black text-primary uppercase tracking-[0.4em]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.5em] vertical-text">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
