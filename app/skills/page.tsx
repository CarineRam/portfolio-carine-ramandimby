"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import SectionSpotlight from '../components/SectionSpotlight';

const skills = [
    { name: "React", logo: "/react1.png" },
    { name: "Next.js", logo: "/nextjs.png" },
    { name: "TypeScript", logo: "/typescript1.png" },
    { name: "JavaScript", logo: "/javascript.png" },
    { name: "HTML5", logo: "/html.png" },
    { name: "CSS3", logo: "/css3.png" },
    { name: "Tailwind CSS", logo: "/tailwind1.png" },
    { name: "Bootstrap", logo: "/bootstrap.png" },
    { name: "Node.js", logo: "/nodejs.png" },
    { name: "Python", logo: "/python.png" },
    { name: "Git", logo: "/git.png" },
    { name: "Docker", logo: "/docker1.png" },
    { name: "PostgreSQL", logo: "/postgresql.png" },
    { name: "MongoDB", logo: "/mongodb.png" },
    { name: "Figma", logo: "/figma.png" },
];

// Alternating accent colors matching the experience section
const accents = ["#b8a9ff", "#ff8da1"];

interface SkillsProps {
    darkMode: boolean;
}

function Skills({ darkMode }: SkillsProps) {
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

    return (
    <>
        <section id='skills' className='relative w-full px-6 md:px-10 pt-7 pb-20  items-center'>
            {/* Spotlight */}
            <SectionSpotlight darkMode={darkMode} 
                beams={[
                {
                    x: 0.95, y: 0.98, angle: 145, spread: 100,
                    length: 0.7, opacity: 0.4,
                    color: "255,160,161",
                    darkColor: "255,255,255",
                    pulseSpeed: 15
                    }
                ]}
             />

            {/* Title */}
            <div className=''>
              <span className='text-4xl grid justify-center gradient-text'>Skills</span>
              <span className='block w-full h-3 bg-[#FF8DA1] mt-4 mb-16'/>
            </div>

            {/* Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
                {skills.map((skill, index) => {
                    const accent = accents[index % 2];
                    return (
                        <div
                            key={skill.name}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className='skill-card group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 transition-all duration-300 hover:scale-105'
                            style= {{ transitionDelay: `${index * 60}ms` }}
                        >

                            {/* Glow layer */}
                            <div
                                className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none'
                                style={{
                                    boxShadow: `
                                        0 0 0 1.5px ${accent},
                                        0 0 8px ${accent},
                                        0 0 40px ${accent}80
                                    `,
                                }}
                            />

                            {/* Logo */}
                            <div className='relative w-16 h-16 z-10'>
                                <Image
                                    src={skill.logo}
                                    alt={skill.name}
                                    fill
                                    className='object-contain'
                                />
                            </div>

                            {/* Name */}
                            <span 
                                className={`text-sm font-medium z-10 transition-colors duration-300
                                    ${darkMode ? "text-gray-300" : "text-[#3a3a5c]"}
                                    `}
                            >
                                {skill.name}
                            </span>
                        </div>
                    )
                })}
            </div>
        </section>
    </>
  )
}

export default Skills