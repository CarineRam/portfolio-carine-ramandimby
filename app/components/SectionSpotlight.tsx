"use client";
import { useEffect, useRef } from "react";

export interface Beam {
  x: number;
  y: number;
  angle: number;
  spread: number;
  length: number;
  opacity: number;
  color: string;
  darkColor: string;
  pulseSpeed?: number;
}

interface Props {
  beams: Beam[];
  darkMode: boolean;
}

export default function SectionSpotlight({ beams, darkMode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);

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

    const startTime = performance.now();

    const drawBeam = (now: number, beam: Beam) => {
      const H = canvas.height;
      const W = canvas.width;
      const tipX = beam.x * W;
      const tipY = beam.y * H;
      const length = beam.length * H;
      const angleRad = (beam.angle * Math.PI) / 180;
      const halfSpread = (beam.spread / 2) * (Math.PI / 180);
      const color = darkMode ? beam.darkColor : beam.color;

      // Pulse
      let opacity = beam.opacity;
      if (beam.pulseSpeed && beam.pulseSpeed > 0) {
        const t = (now - startTime) / 1000;
        opacity = beam.opacity * (0.65 + 0.35 * Math.sin((t / beam.pulseSpeed) * Math.PI * 2));
      }

      // capY: how far down the beam axis the cap center sits
      // capR: radius of the rounded cap — sized to match beam width at capY
      const capY = 28;
      const capR = Math.tan(halfSpread) * capY * 3.2;

      ctx.save();
      ctx.translate(tipX, tipY);
      ctx.rotate(angleRad);

      // ── 1. Beam body slices ──────────────────────────────────────────
      // Natural cone: width at y = tan(halfSpread) * y
      // topFade makes the first 15% fade in so the apex is soft not sharp
      const slices = 60;
      for (let i = 0; i < slices; i++) {
        const t0 = i / slices;
        const t1 = (i + 1) / slices;

        const y0 = t0 * length;
        const y1 = t1 * length;
        const w1 = Math.tan(halfSpread) * y1;

        const axialFade = Math.pow(1 - t0, 0.6);
        const baseFade  = t0 > 0.7 ? 1 - ((t0 - 0.7) / 0.3) : 1;
        const topFade   = t0 < 0.15 ? t0 / 0.15 : 1;

        const finalOpacity = opacity * axialFade * baseFade * topFade;
        if (finalOpacity < 0.003) continue;

        const grad = ctx.createLinearGradient(-w1, 0, w1, 0);
        grad.addColorStop(0,    `rgba(${color}, 0)`);
        grad.addColorStop(0.08, `rgba(${color}, ${finalOpacity * 0.25})`);
        grad.addColorStop(0.28, `rgba(${color}, ${finalOpacity * 0.65})`);
        grad.addColorStop(0.5,  `rgba(${color}, ${finalOpacity})`);
        grad.addColorStop(0.72, `rgba(${color}, ${finalOpacity * 0.65})`);
        grad.addColorStop(0.92, `rgba(${color}, ${finalOpacity * 0.25})`);
        grad.addColorStop(1,    `rgba(${color}, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(-w1, y0, w1 * 2, y1 - y0 + 1);
      }

      // ── 2. Rounded cap ───────────────────────────────────────────────
      // Flattened ellipse sitting right at the apex of the cone.
      // scaleY < 1 flattens it into an arc shape matching the lamp in the ref image.
      {/*const capGrad = ctx.createRadialGradient(0, capY, 0, 0, capY, capR * 1.5);
      capGrad.addColorStop(0,   `rgba(${color}, ${opacity})`);
      capGrad.addColorStop(0.35,`rgba(${color}, ${opacity * 0.75})`);
      capGrad.addColorStop(0.7, `rgba(${color}, ${opacity * 0.25})`);
      capGrad.addColorStop(1,   `rgba(${color}, 0)`);

      ctx.save();
      ctx.scale(1, 0.5); // flatten to arc shape
      ctx.beginPath();
      ctx.arc(0, capY / 0.5, capR, 0, Math.PI * 2);
      ctx.fillStyle = capGrad;
      ctx.fill();
      ctx.restore(); */}

      // ── 3. Bright hotspot ────────────────────────────────────────────
      // Small intense glow right at the center of the cap
      {/*ctx.save();
      const hotGrad = ctx.createRadialGradient(0, capY * 0.5, 0, 0, capY * 0.5, capR * 0.7);
      hotGrad.addColorStop(0,   `rgba(${color}, ${opacity})`);
      hotGrad.addColorStop(0.4, `rgba(${color}, ${opacity * 0.1})`);
      hotGrad.addColorStop(1,   `rgba(${color}, 0)`);
      ctx.beginPath();
      ctx.arc(0, capY * 0.5, capR * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = hotGrad;
      ctx.fill();
      ctx.restore();*/}

      ctx.restore();

      // ── 4. Ray streaks ───────────────────────────────────────────────
      const numRays = 6;
      const rcx = tipX + Math.sin(angleRad) * capY;
      const rcy = tipY + Math.cos(angleRad) * capY;

      for (let r = 0; r < numRays; r++) {
        const rayAngle  = angleRad + (r / (numRays - 1) - 0.5) * halfSpread * 2.2;
        const rayLength = length * 0.55;

        ctx.save();
        ctx.translate(tipX, tipY);
        ctx.rotate(rayAngle);

        const rayGrad = ctx.createLinearGradient(0, 0, 0, rayLength);
        rayGrad.addColorStop(0,    `rgba(${color}, ${opacity * 0.28})`);
        rayGrad.addColorStop(0.25, `rgba(${color}, ${opacity * 0.1})`);
        rayGrad.addColorStop(1,    `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.moveTo(-1.5, 0);
        ctx.lineTo(1.5, 0);
        ctx.lineTo(0.3, rayLength);
        ctx.lineTo(-0.3, rayLength);
        ctx.closePath();
        ctx.fillStyle = rayGrad;
        ctx.fill();
        ctx.restore();
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      beams.forEach((beam) => drawBeam(now, beam));
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [beams, darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}