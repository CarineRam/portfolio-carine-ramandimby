"use client";
import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import SectionSpotlight from '../components/SectionSpotlight';

const experiences = [
    {
        company: "Confidential",
        title: "Full-Stack Developer & Trainer",
        period: "Aug 2024 – Feb 2026 · Paris, France",
        description: "Developed and maintained full-stack web applications. Trained learners in front-end, back-end, and data fundamentals. Worked with email systems, server administration, and deployment processes.",
        logo: "/confidential.png",
        accent: "#b8a9ff", //purple
    },
    {
        company: "Confidential",
        title: "Full-Stack Developer Intern",
        period: "Feb 2024 – Jul 2024 · Paris, France",
        description: "Built responsive user interfaces using React and Next.js. Contributed to back-end development and collaborated on real-world projects.",
        logo: "/confidential.png",
        accent: "#ff8da1", //pink
    },
    {
        company: "Data Processing Internship",
        title: "Data Processing Intern",
        period: "Oct 2022 – Mar 2023 · Antsirabe, Madagascar",
        description: "Cleaned, analyzed, and organized datasets. Assisted in data processing and reporting tasks.",
        logo: "/data_processing.png",
        accent: "#b8a9ff",
    },
    {
        company: "SOCOLAIT",
        title: "Telecommunications Intern",
        period: "2018 · Antsirabe, Madagascar",
        description: "Developed a captive portal to secure network access and restrict unauthorized connections. Applied networking and telecommunications concepts in a real environment.",
        logo: "/Socolait_logo.png",
        accent: "#ff8da1",
    },
];

interface ExperienceProps {
    darkMode: boolean;
}

function Experience({ darkMode }: ExperienceProps) {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                        observer.unobserve(entry.target); // animate only once
                    }
                });
            },
            {
                threshold: 0.15,
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);


    return (
    <section id='experience' className='relative w-full px-6 md:px-10 pt-7 pb-20 items-center text-white'>    

        <SectionSpotlight darkMode={darkMode} beams={[
        {
            x: 0.01, y: 0.01, angle: -45, spread: 90,
            length: 0.5, opacity: 0.5,
            color: "190,169,255",
            darkColor: "255,255,255",
            pulseSpeed: 7
            }
        ]}
        />

        {/* Title */}
        <div>
            <span className='text-4xl grid justify-center gradient-text'>Experiences</span>
            <span className='block w-full h-3 bg-[#FF8DA1] mt-4 mb-16'/>
        </div> 

        {/* Experience cards */}
        <div className='flex flex-col gap-6'>
            {experiences.map((exp, index) => (
                <div
                    key={index}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className='experience-card group relative rounded-xl'
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                    
                    {/* Glow border effect style={{
                            boxShadow: `
                                0 0 0 1.5px ${exp.accent},
                                0 0 10px ${exp.accent},
                                0 0 10px ${exp.accent}20,
                                0 0 10px ${exp.accent}20
                            `,
                        }}*/}
                    <div
                        className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
                        
                    />

                    {/* Card background */}
                    <div
                        className={`
                            relative flex flex-col md:flex-row rounded-xl border overflow-hidden
                            transition-all duration-500
                            ${darkMode
                                ? "bg-[#1a0010] border-[#3a0020] group-hover:border-transparent"
                                : "bg-white/70 border-[#e2d9ff] group-hover:border-transparent"
                            }  
                        `}
                    >
                        {/* Left, logo area */}
                        <div
                            className={`
                                relative w-full h-48 md:w-56 md:h-auto shrink-0
                                transition-colors duration-500
                                ${darkMode ? "bg-[#2a0018]" : "bg-[#f0edff]"}
                            `}
                        >
                            <Image
                                src={exp.logo}
                                alt={exp.company}
                                fill
                                className='object-contain p-6'
                            />

                            {/* Subtle accent line on left edge */}
                            <div
                                className='absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100
                                transition-opacity duration-500'
                                style={{ background: `linear-gradient(to bottom, transparent, ${exp.accent}, transparent)`}}
                            />
                        </div>

                        {/* Divider */}
                        <div
                            className={`hidden md:block w-px transition-colors duration-500
                                ${darkMode ? "bg-[#3a0020]" : "bg-[#e2d9ff]"}
                            `}
                        />

                        {/* Right content */}
                        <div
                            className={`
                                flex-1 flex flex-col justify-center gap-2 px-8 py-6
                                transition-colors duration-500
                                ${darkMode ? "bg-[#1a0010]" : "bg-white/70"}
                            `}
                        >
                            {/* Company name with accent dot 
                            <div className='flex items-center gap-2'></div>*/}
                            <h3
                                className={`text-lg font-bold tracking-widest uppercase transition-colors duration-300
                                    ${darkMode ? "text-white" : "text-[#1a1a3e]"}  
                                `}
                            >
                                {exp.company}
                            </h3>
                            

                            {/* Job title */}
                            <p
                                className='font-semibold transition-colors duration-300'
                                style={{ color: exp.accent }}
                            >
                                {exp.title}
                            </p>

                            {/* Period */}
                            <p
                                className={`text-sm tracking-wide transition-colors duration-300
                                    ${darkMode ? "text-gray-300" : "text-[#6b6b8d]"}
                                `}
                            >
                                {exp.period}
                            </p>

                            {/* Description */}
                            <p
                                className={`text-sm leading-relaxed mt-2 transition-colors duration-300
                                        ${darkMode ? "text-gray-300" : "text-[#6b6b8d]"}
                                    `}
                            >
                                {exp.description}
                            </p>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Experience