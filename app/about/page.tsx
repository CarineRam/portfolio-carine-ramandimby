import React from 'react'
import Image from 'next/image'
import { FaDownload } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import ParticleCanvas from '../components/ParticleCanvas';
import SpotlightCanvas from '../components/SpotlightCanvas';
import SectionSpotlight from '../components/SectionSpotlight';
import TypeWriter from '../components/TypeWriter';
import MorphingBlobCanvas from '../components/MorphingBlobCanvas';
import RotatingRing from '../components/RotatingRing';

const socialLinks = [
  { href: "https://github.com/CarineRam", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/carine-r-7bbba419b/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "mailto:carineramandimby@gmail.com", icon: CiMail, label: "Email" },
  { href: "tel:+261328409122", icon: FaPhoneAlt, label: "Phone" },
];

interface AboutProps {
  darkMode: boolean;
}

function About({ darkMode }: AboutProps) {
  return (
    <>
      <section id='about' className='relative z-10 flex items-center w-full min-h-[100dvh]'>
        <SectionSpotlight darkMode={darkMode} beams={[
          {
            x: 0, y: 0.8, angle: -140, spread: 70,
            length: 0.3, opacity: 0.3,
            color: "184,169,255",
            darkColor: "255,255,255",
            pulseSpeed: 9
          },
          {
            x: 0.9, y: 0.06, angle: 50, spread: 90,
            length: 0.4, opacity: 0.4,
            color: "255,141,161",
            darkColor: "255,255,255",
            pulseSpeed: 15
          }
        ]}
        />

        {/* Particles as animations on about page 
        <ParticleCanvas/>*/}
        {/* Blobs as animations on about page*/}
       <MorphingBlobCanvas darkMode={darkMode} />
        
        <div className='relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-[2.5fr_1.5fr] items-center gap-10'>
          
          {/* Image: order-first on mobile, order-last on desktop */}
          <div className='xl:hidden relative z-10 animate-from-right w-auto w-[260px] md:w-[320px] order-first md:order-last group clip-bottom bg-transparent'>
            <RotatingRing darkMode={darkMode}/>
          </div>
          
          {/* Text: order-last on mobile, order-first on desktop */}
          <div className='animate-from-left order-last md:order-first xl:col-span-2 xl:w-[45vw] xl:text-start xl:mr-[50vh]'>

            <div id='#welcomeAbout' className='flex justify-center hidden md:justify-start xl:justify-start'>
              <span className='text-3xl md:text-5xl text-black dark:text-white '><strong>Welcome</strong> </span>
              <span className='pulse-glow block w-3 h-3 md:w-6 md:h-6 bg-[#FF8DA1] mt-4 ml-4 md:mt-4 md:ml-5'/>
            </div> 

            {/* I Am Carine */}
            <div className='flex justify-center md:justify-start items-center gap-3 mb-4'>
              <span className='text-2xl md:text-3xl mt-1 md:mt-8 font-bold text-[#1a1a3e] dark:text-white leading-tight'>
                I Am <span className='shimmer-name text-2xl md:text-3xl'>Carine</span>
              </span>
            </div>

            <div className="flex justify-center md:justify-start mb-4 md:mb-6 h-8"> {/* fixed height prevents layout shift */}
              <TypeWriter />
            </div>

            <div className='flex flex-wrap gap-3 mb-4 md:mb-8 ' style={{ animationDelay: "0.9s"}}>
              {[
                { number: "2+", label: "Years Experience", cls: "float-1" },
                { number: "5+", label: "Projects Built", cls: "float-2" },
                { number: "2", label: "Countries Worked", cls: "float-3" },
              ].map(({ number, label, cls }) => (
                <div key={label} 
                  className={`${cls} px-4 py-2 rounded-2xl
                    bg-white/60 dark:bg-white/5
                    border border-[#b8a9ff]/30 dark:border-white/10 
                    backdrop-blur-sm flex justify-center md:justify-start`
              }>
                  <span className='text-sm md:text-xl font-bold text-[#7c6ef5] dark:text-[#b8a9ff]'>{number}</span>
                  <span className='text-sm p-1 md:text-md text-[#9990bb] dark:text-gray-400 ml-1'>{label}</span>
                </div>
              ))}
            </div>

            <div className='relative mt-8 mb-8 '>
              {/* Decorative left bar */}
              <div className='animated-border absolute left-0 top-0 w-1 h-full rounded-full bg-gradient-to-b from-[#ff8da1] to-[#7c6ef5]' />
              <p className='pl-4 text-sm xl:text-xl text-[#6B6B8D] dark:text-gray-300 leading-relaxed '>
                Telecommunication Engineer, Full-Stack Developer, and Computer Science student
                with hands-on experience in web development, data processing, and artificial intelligence.
              </p>
            </div>
            <div className='xl:hidden flex justify-center md:justify-start'>
              <a
                href="/Carine_CV1.pdf"
                download
                className="flex items-center gap-2 bg-[#FF8DA1] hover:bg-[#ffb5c0] text-black text-sm font-medium mt-5 mr-5 px-5 py-5 rounded-xl transition-colors duration-200"
              >
                <FaDownload className="w-4 h-4" />
                Download CV
              </a>
              <ul className="flex items-center gap-4 pt-5">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <li key={label}>
                  <a 
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-white hover:text-[#FF8DA1] transition-colors duration-200"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About