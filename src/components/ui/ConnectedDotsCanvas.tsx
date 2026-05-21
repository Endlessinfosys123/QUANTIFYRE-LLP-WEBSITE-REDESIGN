"use client";

import { useEffect, useRef } from "react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONNECTED DOTS CANVAS
   A canvas-based neural-network animation with slowly drifting dots
   connected by gradient lines. Lightweight, GPU-accelerated, and
   tuned to match the emerald brand palette on white backgrounds.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;   // phase offset for pulsing
  label?: string;  // optional service label near this dot
}

// Service labels to float near certain nodes
const SERVICE_LABELS = [
  "AI", "Web", "Mobile", "Cloud", "SEO", "UI/UX", "API", "ERP",
];

const DOT_COLOR   = "rgba(34,197,94,";   // emerald-500 with variable alpha
const LINE_COLOR  = "rgba(16,185,129,";  // emerald-600 with variable alpha
const LABEL_COLOR = "rgba(34,197,94,0.55)";
const MAX_DIST    = 160;  // px — max distance to draw a connection line
const DOT_COUNT   = 55;

function createDots(w: number, h: number): Dot[] {
  return Array.from({ length: DOT_COUNT }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    radius: 2 + Math.random() * 2,
    pulse: Math.random() * Math.PI * 2,
    label: i < SERVICE_LABELS.length ? SERVICE_LABELS[i] : undefined,
  }));
}

export function ConnectedDotsCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let dots: Dot[] = [];
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      dots = createDots(canvas.width, canvas.height);
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      t += 0.012;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ─── Move dots & bounce off walls ───
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      });

      // ─── Draw connection lines ───
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_DIST) continue;

          const alpha = (1 - dist / MAX_DIST) * 0.22;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `${LINE_COLOR}${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // ─── Draw dots (with subtle pulsing size) ───
      dots.forEach((d) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + d.pulse);
        const r = d.radius + pulse * 1.2;
        const alpha = 0.45 + 0.35 * pulse;

        // Glow
        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r * 3);
        grd.addColorStop(0, `${DOT_COLOR}${alpha})`);
        grd.addColorStop(1, `${DOT_COLOR}0)`);
        ctx.beginPath();
        ctx.arc(d.x, d.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${DOT_COLOR}${alpha})`;
        ctx.fill();

        // Service label (only if dot is near top half and visible)
        if (d.label && d.y < canvas.height * 0.85) {
          ctx.font = "bold 9px 'Plus Jakarta Sans', sans-serif";
          ctx.fillStyle = LABEL_COLOR;
          ctx.fillText(d.label, d.x + r + 5, d.y + 4);
        }
      });

      animFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
