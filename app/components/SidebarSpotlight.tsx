"use client";
import { useEffect, useRef } from "react";

interface Props {
  darkMode: boolean;
}

export default function SidebarSpotlight({ darkMode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const scrollProgress = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track scroll progress 0-1
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll);

    const color = darkMode ? "180,160,255" : "184,169,255";

    const drawBeam = (now: number, tipX: number, tipY: number, angle: number, opacity: number) => {
      const W = canvas.width;
      const H = canvas.height;
      const length = H * 0.75;
      const halfSpread = (35 / 2) * (Math.PI / 180);
      const angleRad = (angle * Math.PI) / 180;
      const baseHalfW = Math.tan(halfSpread) * length;

      ctx.save();
      ctx.translate(tipX, tipY);
      ctx.rotate(angleRad);

      const slices = 60;
      for (let i = 0; i < slices; i++) {
        const t0 = i / slices;
        const t1 = (i + 1) / slices;
        const y0 = t0 * length;
        const y1 = t1 * length;
        const w1 = t1 * baseHalfW;
        const axialFade = Math.pow(1 - t0, 0.6) * opacity;
        if (axialFade < 0.005) continue;

        const grad = ctx.createLinearGradient(-w1, 0, w1, 0);
        grad.addColorStop(0,    `rgba(${color}, 0)`);
        grad.addColorStop(0.15, `rgba(${color}, ${axialFade * 0.4})`);
        grad.addColorStop(0.35, `rgba(${color}, ${axialFade * 0.75})`);
        grad.addColorStop(0.5,  `rgba(${color}, ${axialFade})`);
        grad.addColorStop(0.65, `rgba(${color}, ${axialFade * 0.75})`);
        grad.addColorStop(0.85, `rgba(${color}, ${axialFade * 0.4})`);
        grad.addColorStop(1,    `rgba(${color}, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(-w1, y0, w1 * 2, y1 - y0 + 1);
      }
      ctx.restore();

      // Tip core
      const coreGrad = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 20);
      coreGrad.addColorStop(0,   `rgba(${color}, ${opacity})`);
      coreGrad.addColorStop(0.3, `rgba(${color}, ${opacity * 0.5})`);
      coreGrad.addColorStop(1,   `rgba(${color}, 0)`);
      ctx.beginPath();
      ctx.arc(tipX, tipY, 20, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Ray streaks
      const numRays = 4;
      for (let r = 0; r < numRays; r++) {
        const rayAngle = angleRad + (r / (numRays - 1) - 0.5) * halfSpread * 1.5;
        const rayLength = length * 0.6;
        ctx.save();
        ctx.translate(tipX, tipY);
        ctx.rotate(rayAngle);
        const localGrad = ctx.createLinearGradient(0, 0, 0, rayLength);
        localGrad.addColorStop(0,   `rgba(${color}, ${opacity * 0.4})`);
        localGrad.addColorStop(0.4, `rgba(${color}, ${opacity * 0.1})`);
        localGrad.addColorStop(1,   `rgba(${color}, 0)`);
        ctx.beginPath();
        ctx.moveTo(-3, 0);
        ctx.lineTo(3, 0);
        ctx.lineTo(0.5, rayLength);
        ctx.lineTo(-0.5, rayLength);
        ctx.closePath();
        ctx.fillStyle = localGrad;
        ctx.fill();
        ctx.restore();
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const W = canvas.width;
      const H = canvas.height;
      const t = (now - startTime.current) / 1000;

      // Scroll moves the beam tip vertically: top 10% to bottom 10%
      const tipY = (0.05 + scrollProgress.current * 0.9) * H;
      const tipX = W * 0.5;

      // Gentle pulse on opacity
      const pulse = 0.65 + 0.35 * Math.sin((t / 5) * Math.PI * 2);
      const opacity = 0.55 * pulse;

      // Slight angle sway as scroll moves (leans left at top, right at bottom)
      const sway = (scrollProgress.current - 0.5) * 12; // -6 to +6 degrees

      drawBeam(now, tipX, tipY, sway, opacity);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}