"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface Props {
  darkMode?: boolean;
}

export default function RotatingRing({ darkMode }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const animRef    = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0; // rotation angle, advances each frame

    const syncSize = () => {
      // Size canvas to the wrapper's smallest dimension (keeps it circular)
      const rect = wrapper.getBoundingClientRect();
      const size = Math.floor(Math.min(rect.width, rect.height));
      if (size > 0) {
        canvas.width  = size;
        canvas.height = size;
      }

    };

    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(wrapper);

    // Draw one arc segment with a dot at its START (leading tip)
    // startAngle → endAngle in radians
    // color fades from full opacity at start to transparent at end
    const drawArc = (
      cx: number,
      cy: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      colorStart: string, // "r,g,b" at the bright leading tip
      colorEnd: string,   // "r,g,b" at the fading tail
      lineWidth: number,
    ) => {
      const segments = 50;
      const totalAngle = endAngle - startAngle;

      for (let i = 0; i < segments; i++) {
        const t0 = i / segments;
        const t1 = (i + 1) / segments;

        const a0 = startAngle + t0 * totalAngle;
        const a1 = startAngle + t1 * totalAngle;

        // Opacity: 1 at start (tip), 0 at end (tail)
        // Using power curve so it fades slowly then quickly
        const opacity = Math.pow(1 - t0, 1.4);

        // Interpolate color from colorStart to colorEnd
        const cs = colorStart.split(",").map(Number);
        const ce = colorEnd.split(",").map(Number);
        const r  = Math.round(cs[0] + (ce[0] - cs[0]) * t0);
        const g  = Math.round(cs[1] + (ce[1] - cs[1]) * t0);
        const b  = Math.round(cs[2] + (ce[2] - cs[2]) * t0);

        // Glow pass
        ctx.beginPath();
        ctx.arc(cx, cy, radius, a0, a1);
        ctx.strokeStyle = `rgba(${r},${g},${b}, ${opacity * 0.35})`;
        ctx.lineWidth   = lineWidth * 3;
        ctx.lineCap     = "round";
        ctx.stroke();

        // Crisp pass
        ctx.beginPath();
        ctx.arc(cx, cy, radius, a0, a1);
        ctx.strokeStyle = `rgba(${r},${g},${b}, ${opacity})`;
        ctx.lineWidth   = lineWidth;
        ctx.lineCap     = "round";
        ctx.stroke();
      }

      // Bright dot at the START of the arc (leading tip)
      const dotX = cx + Math.cos(startAngle) * radius;
      const dotY = cy + Math.sin(startAngle) * radius;

      // Glow around dot
      const glow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, lineWidth * 5);
      glow.addColorStop(0,   `rgba(255,255,255, 0.95)`);
      glow.addColorStop(0.3, `rgba(${colorStart}, 0.7)`);
      glow.addColorStop(1,   `rgba(${colorStart}, 0)`);
      ctx.beginPath();
      ctx.arc(dotX, dotY, lineWidth * 5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Solid bright core dot
      ctx.beginPath();
      ctx.arc(dotX, dotY, lineWidth * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255, 1)";
      ctx.fill();
    };

    const draw = () => {
      const W  = canvas.width;
      const H  = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      ctx.clearRect(0, 0, W, H);

      const r = Math.min(W, H) / 2 - 6;

      if (r <= 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // ── Static subtle base ring ──────────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = darkMode
        ? "rgba(184,169,255, 0.15)"
        : "rgba(124,110,245, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── 3 rotating arc segments with gaps between them ───────────
      // Each arc spans ~100°, with ~20° gap between them
      // They all rotate together with `angle`

      const arcSpan = (100 * Math.PI) / 180; // 100° each
      const gap     = (20  * Math.PI) / 180;  // 20° gap
      const step    = arcSpan + gap;           // 120° between arc starts

      // Arc 1 — purple tip → pink tail
      drawArc(
        cx, cy, r,
        angle,
        angle + arcSpan,
        "184,169,255",
        "255,141,161",
        2
      );

      // Arc 2 — pink tip → purple tail (starts 120° ahead)
      drawArc(
        cx, cy, r,
        angle + step,
        angle + step + arcSpan,
        "255,141,161",
        "124,110,245",
        2
      );

      // Arc 3 — lavender tip → pink tail (starts 240° ahead)
      drawArc(
        cx, cy, r,
        angle + step * 2,
        angle + step * 2 + arcSpan,
        "210,200,255",
        "255,141,161",
        1.5
      );

      angle -= 0.006; // rotation speed — lower = slower

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [darkMode]);

  return (
    // No overflow:hidden on wrapper — that was causing the clipped corners
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ paddingBottom: "100%" }}
    >
      <div className="absolute inset-0">

        {/* Photo — perfectly round, slightly inset so ring shows around it */}
        {/* z-0 so canvas rings draw on top */}
        <div
          className="absolute"
          style={{
            inset: "8px",
            borderRadius: "50%",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <Image
            src="/Carine_croped.png"
            alt="Carine Portrait"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Canvas — larger than photo, no overflow:hidden, draws freely */}
        <canvas
          ref={canvasRef}
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            zIndex:     10,
            background: "transparent",
            display:    "block",
          }}
        />

      </div>
    </div>
  );
}