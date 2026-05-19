import React from 'react'
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { FiSun, FiMoon } from "react-icons/fi";

interface SidebarProps {
    darkMode: boolean;
    setDarkMode: (val: boolean) => void;
}

function Sidebar({ darkMode, setDarkMode }: SidebarProps) {
  return (
    <div className='w-full h-full flex flex-col items-center justify-between py-8 px-6'>
        
        {/* Top - Photo + name */}
        <div className='flex flex-col items-center gap-4 min-h-0 flex-1 justify-between mb-6'>
            {/* Logo + Name side by side */}
            <div className='items-center'>
                <Image
                    src="/Carine_logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className='object-contain'
                />
            </div>

            {/* Divider */}
            <div className='w-full h-px bg-gradient-to-r from-transparent via-[#b8a9ff]/40 to-transparent' />

            {/* Big portrait photo */}
            <div className='w-full aspect-[4/4] rounded-2xl bg-[#ff8da1]/30 overflow-hidden relative'>
                <Image
                    src="/Carine_croped.png"
                    alt="Carine Portrait"
                    fill
                    className='object-cover object-top'
                    priority
                />
                {/* Subtle gradient at bottom of photo */}
                <div className='absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/20 dark:from-black/10 to-transparent'/>
            </div>

            {/* Avatar with glow ring
            <div className='relative'>
                <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#ff8da1] to-[#b8a9ff] blur-md opacity-40 scale-110'/>
                <div className='relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#b8a9ff] dark:border-[#7c6ef5]'>
                    <Image
                        src="/Carine_croped.png"
                        alt="Carine"
                        fill
                        className='object-cover object-top'
                        priority
                    />
                </div>
            </div> */}


            {/* Name + Title */}
            <div className='text-center'>
                <h1 className='text-xl font-bold text-[#1a1a3e] dark:text-white tracking-wide'>
                    Carine R.
                </h1>
                <p className='text-sm text-[#7c6ef5] dark:text-[#b8a9ff] mt-1 font-medium'>
                    Full-Stack Developer
                </p>
                <p className='text-xs text-[#9990bb] dark:text-gray-500 mt-0.5'>
                    Telecommunication Engineer
                </p>
            </div>
                
            {/* Divider */}
            <div className='w-full h-px bg-gradient-to-r from-transparent via-[#b8a9ff]/40 to-transparent'/>

            {/* Info */}
            <div className='w-full flex flex-col gap-3'>
                <div className='flex items-center gap-3 text-sm text-[#6b6b8d] dark:text-gray-400'>
                    <CiLocationOn className="w-4 h-4 text-[#ff8da1] shrink-0"/>
                    <span>Antsirabe, Madagascar</span>
                </div>
                <div className='flex items-center gap-3 text-sm text-[#6b6b8d] dark:text-gray-400'>
                    <CiMail className='w-4 h-4 text-[#ff8da1] shrink-0'/>
                    <span className='truncate'>carineramandimby@gmail.com</span>
                </div>
            </div>

            {/* Divider */}
            <div className='w-full h-px bg-gradient-to-r from-transparent via-[#b8a9ff] to-transparent' />

            {/* Status badge */}
            <div className='w-full flex items-center gap-2 bg-[#f0edff] dark:bg-[#1e1e40] rounded-xl px-4 py-3'>
                <span className='w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)] shrink-0'/>
                <span className='text-xs text-[#6b6b8d] dark:text-gray-400'>
                    Available for opportunities
                </span>
            </div>

            {/* Social icons */}
            <div className='flex items-center gap-4 flex-wrap justify-center'>
                {[
                    { href: "https://github.com/CarineRam", icon: FaGithub },
                    { href: "https://www.linkedin.com/in/carine-r-7bbba419b/", icon: FaLinkedin },
                    { href: "mailto:carineramandimby@gmail.com", icon: CiMail },
                    { href: "https://wa.me/261328409122", icon: FaWhatsapp },
                    { href: "tel:+261328409122", icon: FaPhoneAlt },
                ].map(({ href, icon: Icon }, i) => (
                    <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='w-9 h-9 rounded-xl flex items-center justify-center
                        bg-[#f0edff] dark:text-[#b8a9ff]
                        hover:bg-[#7c6ef5] hover:text-white
                        dark:hover:bg-[#7c6ef5] dark:hover:text-white
                        transition-all duration-200'   
                    >
                        <Icon className='w-4 h-4'/>
                    </a>
                ))}
            </div>

            {/* Bottom - Dark mode toggle + cv */}
            <div className='flex flex-col items-center gap-4 w-full'>
                <a
                    href="/Carine_CV1.pdf"
                    download
                    className='w-full text-center py-3 rounded-xl text-sm font-semibold
                        bg-gradient-to-r from-[#ff8da1] to-[#b8a9ff]
                        hover:from-[#ffb5c0] hover:to-[#c8bfff]
                        text-white transition-all duration-300
                        shadow-[0_4px_20px_rgba(184,169,255,0.4)]
                        hover:shadow-[0_4px_30px_rgba(184,169,255,0.6)]
                        hover:scale-[1.02]'
                >
                    Download CV
                </a>
            </div>

        </div>        
    </div>
  )
}

export default Sidebar