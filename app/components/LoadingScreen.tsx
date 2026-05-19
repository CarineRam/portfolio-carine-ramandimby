"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function LoadingScreen() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start fade out after 2 seconds
        const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
        // Fully remove after fade completes
        const removeTimer = setTimeout(() => setVisible(false), 2600);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        }
    }, []);

    if (!visible) return null;

  return (
    <div
        className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-600 ${
            fadeOut ? "opacity-0" : "opacity-100"
        }`}
    >
        {/* Logo */}
        <div className='animate-from-left'>
             <Image
                src="/carine_Logo.png"
                alt="Carine Logo"
                width={180}
                height={60}
                className='object-contain'
                priority
             />
        </div>

        {/* Loading Bar */}
        <div className='mt-8 w-48 h-px bg-white/10 rounded-full overflow-hidden'>
            <div className='h-full bg-[#FF8DA1] loading-bar' />
        </div>
    </div>
  )
}

export default LoadingScreen