"use client"
import React, { useRef, useEffect } from 'react';

const education = [
    {
        degree: "Computer Science Studies",
        school: "Conservatoire National des Arts et Métiers (CNAM)",
        location: "Antananarivo, Madagascar",
        from: "2022",
        to: "2023",
        status: "Completed",
        description: "Focused on software development and information systems.",
        accent: "#b8a9ff",
    },
    {
        degree: "Master's Degree in Telecommunications",
        school: "Athénée Saint Joseph Antsirabe",
        location: "Antsirabe, Madagascar",
        from: "2019",
        to: "2021",
        status: "Graduated",
        description: "Studied telecommunications systems and network technologies.",
        accent: "#ff8da1",
    },
    {
        degree: "Front-End Development Training",
        school: "Sayna Academy",
        location: "Remote",
        from: "2023",
        to: "2023",
        status: "Completed",
        description: "Learned modern front-end development and web technologies.",
        accent: "#b8a9ff",
    },
    {
        degree: "Mobile Application Development Training",
        school: "YouthMobile",
        location: "Madagascar",
        from: "2021",
        to: "2021",
        status: "Completed",
        description: "Built mobile applications and explored app development concepts.",
        accent: "#ff8da1",
    },
];

interface EducationProps {
    darkMode: boolean;
}

function GlassCard({ edu, darkMode }: { edu: typeof education[0]; darkMode: boolean }){
    return (
        <div className='relative group w-full'>
            {/* Hover glow */}
            <div
                className='absolute -inset-3 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                style={{
                    background: `radial-gradient(ellipse at center, ${edu.accent}20 0%,
                    transparent 70%)`,
                    filter: "blur(10px)",
                }}
            />

            {/* Border */}
            <div
                className='absolute -inset-[1px] rounded-2xl pointer-events-none
                transition-opacity duration-500 opacity-40 group-hover:opacity-100'
                style={{
                    background: `linear-gradient(135deg, ${edu.accent}90, ${edu.accent}20, ${edu.accent}60)`,
                }}
            />

            {/* Glass surface */}
            <div
                className='relative rounded-2xl overflow-hidden px-6 py-5'
                style={{
                    background: darkMode ? "rgba(10, 4, 18, 0.65)" : "rgba(255, 255, 255, 0.45)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    boxShadow: darkMode
                        ? "0 8px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)"
                        : "0 8px 40px rgba(100,80,160,0.10), 0 2px 8px rgba(0,0,0,0.05)",
                }}
            >

                {/* Top edge highlight */}
                <div
                    className='absolute top-0 left-0 right-0 h-px pointer-events-none'
                    style={{
                        background: darkMode
                            ? "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.2) 60%, transparent 95%)"
                            : "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.9) 40%, white 60%, transparent 95%)",
                    }}
                />

                {/* Accent top bar */}
                <div
                    className='absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl'
                    style={{
                        background: `linear-gradient(90deg, transparent, ${edu.accent}, transparent)`,
                        opacity: 0.8,
                    }}
                />

                {/* Year + Status */}
                <div className='flex items-center justify-between mb-3'>
                    <span
                        className='text-xs font-mono tracking-widest px-3 py-1 rounded-full border'
                        style={{
                            color: edu.accent, borderColor: `${edu.accent}50`,
                            background: `${edu.accent}15`
                        }}
                    >
                        {edu.from == edu.to ? edu.from : `${edu.from} - ${edu.to}`}
                    </span>
                    <span 
                        className='px-3 py-1 rounded-full text-xs font-medium border'
                        style={
                            edu.status === "In Progress"
                                ? { background: edu.accent, color: "#000", borderColor: edu.accent }
                                : { background: "transparent", color: edu.accent, borderColor: `${edu.accent}60` }
                        }
                    >
                        {edu.status}
                    </span>
                </div>

                {/* Degree */}
                <h3 className={`text-sm font-bold tracking-wide mb-1 ${darkMode ?
                    "text-white" : "text-[#1a1a3e]"
                }`}
                >
                    {edu.degree}
                </h3>

                {/* School */}
                <p className='text-sm font-semibold mb-1'
                    style={{ color: edu.accent }}
                >
                    {edu.school}
                </p>

                {/* Location */}
                <p className={`text-xs mb-3 ${darkMode ? "text-white/35" : "text-black/40"}`}>
                    📍 {edu.location}
                </p>

                {/* Description */}
                <p className={`text-xs leading-relaxed ${darkMode ? "text-white/50" : "text-[#6b6b8d]"}`}>
                    {edu.description}
                </p>
            </div>
        </div>
    );
}

function TimelineNode({ accent, index }: { accent: string; index: number }) {
    return(
        <div className='relative flex items-center justify-center' style={{ width: 20, height: 20}}>
            <div
                className='absolute rounded-full'
                style={{
                    width: 20,
                    height: 20,
                    background: `${accent}30`,
                    animation: "node-pulse 2.5s ease-in-out infinite",
                    animationDelay: `${index * 0.5}s`,
                }}
            />

            <div
                className='rounded-full z-10'
                style={{
                    width: 10,
                    height: 10,
                    background: accent,
                    boxShadow: `0 0 8px ${accent}, 0 0 20px ${accent}80`,
                }}
            />
        </div>
    );
}

function Education({ darkMode }: EducationProps) {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });
        return () => observer.disconnect();
    }, []);

    const spineColor = darkMode
        ? "linear-gradient(to bottom, transparent, #b8a9ff70 15%, #ff8da160 50%, #b8a9ff70 85%, transparent)"
        : "linear-gradient(to bottom, transparent, #b8a9ffaa 15%, #ff8da190 50%, #b8a9ffaa 85%, transparent)";

    return (
        <section id="education" className='relative w-full px-6 md:px-10 pt-7 pb-20'>

            {/* Title */}
            <div>
                <span className='text-4xl grid justify-center gradient-text'>Education</span>
                <span className='block w-full h-3 bg-[#FF8DA1] mt-4 mb-16' />
            </div>   

            {/* Desktop timeline */}
            <div className='hidden md:block relative max-w-4xl mx-auto'>
                
                {/* Spine */}
                <div 
                    className='absolute top-0 bottom-0 w-px pointer-events-none'
                    style={{ left: "50%", transform: "translateX(-50%)", background: spineColor }}
                />

                <div className='flex flex-col gap-10'>
                    {education.map((edu, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                ref={(el) => { cardRefs.current[index] = el; }}
                                className='experience-card relative flex items-center'
                                style={{ transitionDelay: `${index * 120}ms` }}
                            >
                                {/* Left card slot */}
                                <div className="w-[calc(50%-9px)] pr-6 flex justify-end">
                                    {isLeft && <GlassCard edu={edu} darkMode={darkMode} />}
                                </div>

                                {/* Node: sists on the spine */}
                                <div className='shrink-0 z-10'>
                                    <TimelineNode accent={edu.accent} index={index} />
                                </div>

                                {/* Right card slot */}
                                <div className='w-[calc(50%-24px)] pl-6 flex justify-start'>
                                    {!isLeft && <GlassCard edu={edu} darkMode={darkMode} />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile single column with left spine */}
            <div className='md:hidden relative max-w-lg mx-auto'>
                {/* Left spine */}
                <div
                    className='absolute top-0 bottom-0 w-px pointer-events-none'
                    style={{ left: 8, background: spineColor }}
                />

                <div className='flex flex-col gap-8'>
                    {education.map((edu, index) => (
                        <div
                            key={index}
                            className='relative flex items-start gap-5'
                            style={{ transitionDelay: `${index * 120}ms` }}
                        >
                            {/* Node */}
                            <div className='shrink-0 mt-6 z-10'>
                                <TimelineNode accent={edu.accent} index={index} />
                            </div>

                            {/* Card */}
                            <div className='flex-1'>
                                <GlassCard edu={edu} darkMode={darkMode} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes node-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(2.4); opacity: 0; }
                }
            `}</style>
        </section>
    );
}

export default Education;