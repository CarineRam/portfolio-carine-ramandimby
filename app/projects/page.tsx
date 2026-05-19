"use client";
import React, { useState, useRef, useCallback } from 'react'
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionSpotlight from '../components/SectionSpotlight';

const projects = [
  {
    title: "Portfolio - Version 2",
    description: "A modern and responsive personal portfolio built to showcase my projects, technical skills, and professional experience. The interface was first designed as a UI prototype in Figma before being developed into a fully functional website.",
    image: "/portfolio_version_2_1.jpg",
    link: "",
    tech: ["Next.js", "Tailwind CSS", "Javascript", "Figma"],
  },
  {
    title: "Superman Themed Website",
    description: "A themed website developed as a learning project while exploring front-end development with modern JavaScript frameworks. The project focuses on creating interactive components, structured layouts, and responsive design.",
    image: "/superman.jpg",
    link: "https://github.com/CarineRam/SAYNA-REACT-SUPERMAN-112022",
    tech: ["React (Javascript)", "Bootstrap CSS", "HTML", "Figma"],
  },
  {
    title: "Mail Server Infrastructure Setup",
    description: "Designed and configured an email infrastructure capable of sending transactional emails and campaigns, with security features such as spam filtering, virus protection, and reliable mail delivery.",
    image: "/simple_mail_server_diagram.jpg",
    link: "",
    tech: ["Linux", "SMTP/IMAP", "Mail server", "Spam filtering"],
  },
  {
    title: "Batman Themed Website",
    description: "Developed a themed website inspired by the Batman universe as a learning project. Built responsive user interfaces and practiced component-based development.",
    image: "/batman.jpg",
    link: "https://github.com/CarineRam/SAYNA-REACTJS-BATMANREACT/tree/master/",
    tech: ["React (JavaScript)", "Bootstrap CSS", "HTML", "Figma"],
  },
  {
    title: "Portfolio - Version 1",
    description: "An initial version of my personal portfolio built to present my projects and technical skills. This project helped me practice front-end development fundamentals and responsive design.",
    image: "/portfolio_version_1.jpg",
    link: "https://github.com/CarineRam/portfolio-v1/",
    tech: ["React", "Bootstrap", "Figma"],
  },
];

const VISIBLE = 4;

// ─── Mobile Carousel ───────────────────────────────────────────────
function MobileCarousel() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(projects.length - 1, i + 1));

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove  = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd   = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null; touchEndX.current = null;
  };

  const project = projects[index];

  return (
    <div className='flex flex-col gap-6'>
      <div className='relative flex items-center gap-3'>
        <button onClick={prev} disabled={index === 0}
          className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-200
            ${index === 0 ? "border-white/10 text-white/20 cursor-not-allowed" : "border-[#ff8da1]/50 text-[#ff8da1] hover:bg-[#ff8da1]/10"}`}>
          <FaChevronLeft size={12} />
        </button>
        <div className='flex-1' onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          <div className='rounded-xl overflow-hidden flex flex-col'
            style={{ background: "rgba(26,0,16,0.85)", border: "1px solid rgba(255,141,161,0.15)" }}>
            <div className='relative w-full h-44'>
              <Image src={project.image} alt={project.title} fill className='object-cover' />
              <div className='absolute inset-0' style={{ background: "linear-gradient(to top, rgba(26,0,16,0.9) 0%, transparent 60%)" }} />
            </div>
            <div className='p-5 flex flex-col gap-3'>
              <h3 className='font-bold text-base text-white'>{project.title}</h3>
              <p className='text-gray-400 text-sm leading-relaxed line-clamp-3'>{project.description}</p>
              <div className='flex flex-wrap gap-1.5'>
                {project.tech.map(t => (
                  <span key={t} className='px-2.5 py-1 text-xs rounded-full border border-[#ff8da1]/40 text-[#ff8da1] bg-[#ff8da1]/10'>{t}</span>
                ))}
              </div>
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="mt-1 w-full text-center bg-[#ff8da1] hover:bg-[#ffb5c0] text-black text-sm font-semibold py-3 rounded-lg transition-colors duration-200">
                  Discover
                </a>
              ) : (
                <button disabled className='mt-1 w-full bg-white/10 text-white/30 text-sm py-3 rounded-lg cursor-not-allowed'>Discover</button>
              )}
            </div>
          </div>
        </div>
        <button onClick={next} disabled={index === projects.length - 1}
          className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-200
            ${index === projects.length - 1 ? "border-white/10 text-white/20 cursor-not-allowed" : "border-[#ff8da1]/50 text-[#ff8da1] hover:bg-[#ff8da1]/10"}`}>
          <FaChevronRight size={12} />
        </button>
      </div>
      <div className='flex justify-center gap-2'>
        {projects.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-[#ff8da1] w-6" : "bg-white/25 w-1.5"}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Expanding Cards ───────────────────────────────────────
function DesktopExpandingCards({ darkMode }: { darkMode: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [windowStart, setWindowStart] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canGoPrev = windowStart > 0;
  const canGoNext = windowStart + VISIBLE < projects.length;

  const prev = () => { setHoveredIndex(null); setWindowStart(w => Math.max(0, w - 1)); };
  const next = () => { setHoveredIndex(null); setWindowStart(w => Math.min(projects.length - VISIBLE, w + 1)); };

  // Debounce hover — waits 30ms before applying, prevents spam on fast mouse moves
  const handleMouseEnter = useCallback((globalIndex: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setHoveredIndex(globalIndex), 30);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setHoveredIndex(null), 30);
  }, []);

  const visible = projects.slice(windowStart, windowStart + VISIBLE);

  return (
    <div className='flex flex-col gap-5'>

      {/* Nav row */}
      <div className='flex items-center justify-between'>
        <span className='text-sm dark:text-white/20 text-gray-400 font-mono tracking-widest'>
          {windowStart + 1} – {Math.min(windowStart + VISIBLE, projects.length)}
          <span className='dark:text-white/40 text-gray-500'> / {projects.length}</span>
        </span>
        <div className='flex gap-2'>
          <button onClick={prev} disabled={!canGoPrev}
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors duration-200
              ${canGoPrev ? "border-[#b8a9ff]/50 text-[#b8a9ff] hover:bg-[#b8a9ff]/10" : "border-white/10 text-white/15 cursor-not-allowed"}`}>
            <FaChevronLeft size={12} />
          </button>
          <button onClick={next} disabled={!canGoNext}
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors duration-200
              ${canGoNext ? "border-[#ff8da1]/50 text-[#ff8da1] hover:bg-[#ff8da1]/10" : "border-white/10 text-white/15 cursor-not-allowed"}`}>
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      {/*
        PERFORMANCE APPROACH:
        - `contain: layout style` on the wrapper: reflow caused by width change
          is contained inside this box and never propagates to the rest of the page.
          This is the key fix — the rest of the page doesn't repaint.
        - `will-change: width` on each card: browser pre-promotes cards to GPU layers.
        - Image scale via `transform` on a wrapper div (GPU, no reflow).
        - All fades via `opacity` only (GPU composited).
        - Hover debounced 30ms to avoid style thrashing on fast mouse sweeps.
      */}
      <div
        className='flex gap-3'
        style={{
          height: 500,
          // Contain reflow inside this box — nothing outside repaints
          contain: "layout style",
        }}
      >
        {visible.map((project, i) => {
          const globalIndex = windowStart + i;
          const isHovered = hoveredIndex === globalIndex;
          const isCollapsed = hoveredIndex !== null && !isHovered;

          return (
            <div
              key={project.title}
              onMouseEnter={() => handleMouseEnter(globalIndex)}
              onMouseLeave={handleMouseLeave}
              className='relative rounded-2xl overflow-hidden cursor-pointer'
              style={{
                // width animation stays — but now contained so no page reflow
                width: isHovered ? "55%" : isCollapsed ? `calc((45% - 36px) / ${VISIBLE - 1})` : "25%",
                //flexShrink: 0,
                transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                // Pre-promote to GPU layer before animation starts
                willChange: "width",
              }}
            >
              {/* Image — scale on GPU via transform wrapper */}
              <div
                className='absolute inset-0'
                style={{
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.5s ease",
                  willChange: "transform",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className='object-cover'
                  // Only load the image at the size it's actually displayed
                  sizes="(max-width: 768px) 100vw, 25vw"
                  // Preload visible images
                  priority={i < 2}
                />
              </div>

              {/* Overlay — opacity only, GPU composited */}
              <div
                className='absolute inset-0'
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.15) 100%)",
                  opacity: isHovered ? 1 : 0.72,
                  transition: "opacity 0.5s ease",
                  willChange: "opacity",
                }}
              />

              {/* Collapsed: vertical rotated title */}
              <div
                className='absolute inset-0 flex items-center justify-center pointer-events-none'
                style={{
                  opacity: isCollapsed ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <p
                  className='text-white text-[10px] font-semibold tracking-widest uppercase'
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                    maxHeight: "80%",
                    overflow: "hidden",
                  }}
                >
                  {project.title}
                </p>
              </div>

              {/* Default (nothing hovered): title at bottom */}
              <div
                className='absolute bottom-0 left-0 right-0 p-4 pointer-events-none'
                style={{
                  opacity: hoveredIndex === null ? 1 : 0,
                  transition: "opacity 0.25s ease",
                }}
              >
                <h3 className='text-white font-semibold text-sm text-center leading-tight line-clamp-2'>
                  {project.title}
                </h3>
              </div>

              {/* Hovered: full content — opacity + translateY */}
              <div
                className='absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3'
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s",
                  pointerEvents: isHovered ? "auto" : "none",
                  willChange: "opacity, transform",
                }}
              >
                <h3 className='text-white font-bold text-base leading-tight'>{project.title}</h3>
                <p className='text-gray-300 text-xs leading-relaxed line-clamp-3'>{project.description}</p>
                <div className='flex flex-wrap gap-1.5'>
                  {project.tech.map(t => (
                    <span key={t} className='px-2 py-0.5 text-xs rounded-full border border-[#ff8da1]/50 text-[#ff8da1] bg-[#ff8da1]/10'>
                      {t}
                    </span>
                  ))}
                </div>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer"
                    className='mt-1 w-full text-center bg-[#ff8da1] hover:bg-[#ffb5c0] text-black text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200'>
                    Discover
                  </a>
                ) : (
                  <button disabled className='mt-1 w-full text-center bg-white/10 text-white/30 text-sm py-2.5 rounded-xl cursor-not-allowed'>
                    Discover
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className='flex justify-center gap-2 mt-1'>
        {projects.map((_, i) => {
          const inWindow = i >= windowStart && i < windowStart + VISIBLE;
          return (
            <button key={i}
              onClick={() => { setHoveredIndex(null); setWindowStart(Math.min(Math.max(0, i - Math.floor(VISIBLE / 2)), Math.max(0, projects.length - VISIBLE))); }}
              className={`h-1.5 rounded-full transition-all duration-300
                ${i === windowStart ? "w-6 bg-[#ff8da1]" : inWindow ? "w-3 bg-white/50" : "w-1.5 bg-white/20"}`}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────
function Projects({ darkMode }: { darkMode: boolean }) {
  return (
    <section id="projects" className='relative w-full px-6 md:px-10 pt-7 pb-20 text-white'>
      <SectionSpotlight darkMode={darkMode}
        beams={[{
          x: 0.5, y: 0.01, angle: 0, spread: 130,
          length: 0.4, opacity: 0.4,
          color: "255,141,161",
          darkColor: "255,255,255",
          pulseSpeed: 15,
        }]}
      />
      <div>
        <span className='text-4xl grid justify-center gradient-text'>Projects</span>
        <span className='block w-full h-3 bg-[#ff8da1] mt-4 mb-16' />
      </div>
      <div className='hidden md:block'>
        <DesktopExpandingCards />
      </div>
      <div className='md:hidden'>
        <MobileCarousel />
      </div>
    </section>
  );
}

export default Projects;