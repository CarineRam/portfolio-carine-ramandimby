"use client";
import React from 'react'
import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -1000, y: -1000 });
    const particles = useRef<Particle[]>([]);
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

        // Create particles
        const COUNT = 110;
        particles.current =  Array.from({ length: COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 4 + 1,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //Move and draw particles
            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];

                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                    
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2 );
                ctx.fillStyle = i % 3 === 0
                    ? "rgba(124, 110, 245, 0.5)" // purple
                    : "rgba(255, 141, 161, 0.6)"; // pink
                ctx.fill();

                // Connect to mouse
                const dx = mouse.current.x - p.x;
                const dy = mouse.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150){
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.current.x, mouse.current.y);
                    ctx.strokeStyle = `rgba(184, 169, 255, ${1 - dist / 150})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }

                }

            //});

            // Connect nearby particles to each other
            for (let i = 0; i < particles.current.length; i++) {
                for (let j = i + 1; j < particles.current.length; j++) {
                    const a = particles.current[i];
                    const b = particles.current[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(255, 141, 161, ${(1 - dist / 100) * 0.3})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animRef.current = requestAnimationFrame(draw);
        };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleMouseLeave = () => {
        mouse.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
    };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className='absolute inset-0 w-full h-full pointer-events-auto'
            />
    );
}

export default ParticleCanvas