import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { CiMail, CiLocationOn } from "react-icons/ci";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
];

const socialLinks = [
  { href: "https://github.com/CarineRam", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/carine-r-7bbba419b/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "mailto:carineramandimby@gmail.com", icon: CiMail, label: "carineramandimby@gmail.com" },
  { href: "tel:+261337540615", icon: FaPhoneAlt, label: "+261 33 75 406 15" },
  { href: "https://wa.me/261328409122", icon: FaWhatsapp, label: "+261 32 84 091 22" },
];

const contactItems = [
  { href: "mailto:carineramandimby@gmail.com", icon: CiMail, text: "carineramandimby@gmail.com" },
  { href: null, icon: CiLocationOn, text: "1116 K 391 Mahazoarivo Sud, Antsirabe" },
  { href: "https://wa.me/261328409122", icon: FaWhatsapp, text: "+261 32 84 091 22" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">

      {/* Main footer content */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-12">
        {/*<div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-8">*/}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          {/* Left — Logo + Socials */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              src="/Carine_Logo.png"
              alt="Carine Logo"
              width={600}
              height={200}
              className="object-contain w-auto"
            />
            <p className="text-gray-500 text-sm text-center md:text-left">
              Crafting clean, purposeful digital experiences.
            </p>
          </div>
          {/*</div>*/}

          {/* Center — Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-s font-semibold tracking-widest text-gray-400 uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col items-center md:items-start gap-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                    <a  
                        href={href}
                        className="text-gray-400 hover:text-[#FF8DA1] transition-colors duration-200 text-s"
                    >
                    {label}
                    {/*<span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#ffb5c0] transition-all duration-300 group-hover:w-full" />*/}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Socials */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-s font-semibold tracking-widest text-gray-400 uppercase">
              Find Me On
            </h3>
            <ul className="flex flex-col items-center md:items-start gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex text-gray-400 hover:text-[#FF8DA1] transition-colors duration-200 text-s"
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      <span className="">{label}</span>
                    </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col items-center text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Carine. All rights reserved.</span>
        </div>
      </div>

    </footer>
  );
}