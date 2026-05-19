"use client";
import { useEffect, useRef } from "react";

export default function SpotlightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── SPOTLIGHT 1 — top right, beam pointing down-left ──
      const spot1 = {
        x: canvas.width * 0.85,  // source point top right
        y: 0,
        angle: (225 * Math.PI) / 180, // pointing down-left
        spread: 55 * (Math.PI / 180), // beam width in radians
        length: canvas.height * 1.2,
        colorInner: "rgba(184, 169, 255, 0.35)",  // lavender
        colorOuter: "rgba(124, 110, 245, 0)",
      };

      // ── SPOTLIGHT 2 — bottom left, beam pointing up-right ──
      const spot2 = {
        x: canvas.width * 0.05,
        y: canvas.height,
        angle: (45 * Math.PI) / 180, // pointing up-right
        spread: 50 * (Math.PI / 180),
        length: canvas.height * 1.2,
        colorInner: "rgba(255, 141, 161, 0.3)",  // pink
        colorOuter: "rgba(255, 141, 161, 0)",
      };

      [spot1, spot2].forEach((spot) => {
        // Left edge of beam
        const leftAngle = spot.angle - spot.spread / 2;
        // Right edge of beam
        const rightAngle = spot.angle + spot.spread / 2;

        // Tip of cone (source)
        const tipX = spot.x;
        const tipY = spot.y;

        // Far left point of beam
        const leftX = tipX + Math.cos(leftAngle) * spot.length;
        const leftY = tipY + Math.sin(leftAngle) * spot.length;

        // Far right point of beam
        const rightX = tipX + Math.cos(rightAngle) * spot.length;
        const rightY = tipY + Math.sin(rightAngle) * spot.length;

        // Center far point (for gradient direction)
        const centerFarX = tipX + Math.cos(spot.angle) * spot.length;
        const centerFarY = tipY + Math.sin(spot.angle) * spot.length;

        // Gradient from tip (bright) to far end (transparent)
        const gradient = ctx.createLinearGradient(tipX, tipY, centerFarX, centerFarY);
        gradient.addColorStop(0, spot.colorInner);
        gradient.addColorStop(0.4, spot.colorInner.replace("0.35", "0.15").replace("0.3", "0.12"));
        gradient.addColorStop(1, spot.colorOuter);

        // Draw the cone
        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(leftX, leftY);
        ctx.lineTo(rightX, rightY);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add a bright glow at the source tip
        const glowRadius = 80;
        const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, glowRadius);
        glow.addColorStop(0, spot.colorInner.replace("0.35", "0.6").replace("0.3", "0.5"));
        glow.addColorStop(0.4, spot.colorInner.replace("0.35", "0.2").replace("0.3", "0.15"));
        glow.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.arc(tipX, tipY, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}