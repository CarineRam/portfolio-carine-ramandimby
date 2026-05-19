"use client";
import React, { useEffect, useRef, useState } from 'react';


function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const ringPos = useRef({ x: 0, y: 0});
    const mousePos = useRef({ x: 0, y: 0});
    const animRef = useRef<number | undefined>(undefined);
    const [isTouch, setIsTouch] = useState(() => 
        typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
    );

    useEffect(() => {
        // Detect touch device and disable cursor entirely
        if (isTouch) return;
    }, [isTouch]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px` ;
            }
        };

        // Ring follows with a laf for smooth trailing effect
        const animate = () => {
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;
            if (ringRef.current) {
                ringRef.current.style.left = `${ringPos.current.x}px` ;
                ringRef.current.style.top = `${ringPos.current.y}px` ;
            }
            animRef.current = requestAnimationFrame(animate);
        };

        animate();
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, []);

    if (isTouch) return null;

  return (
    <>
        {/* Small solid dot */}
        <div
            ref={dotRef}
            className='fixed z-[999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF8DA1]'
        />
            
        {/* Larger trailing ring */}
        <div
            ref={ringRef}
            className='fixed z-[999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#FF8DA1]/50'
        />
    </>
  )
}

export default CustomCursor