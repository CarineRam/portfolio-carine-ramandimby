"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaUser, FaCode, FaBriefcase, FaTools, FaGraduationCap, FaEnvelope } from "react-icons/fa";

const navLinks = [
  { href: "#about", label: "About", icon: FaUser },
  { href: "#projects", label: "Projects", icon: FaCode },
  { href: "#experience", label: "Experiences", icon: FaBriefcase },
  { href: "#skills", label: "Skills", icon: FaTools },
  { href: "#education", label: "Education", icon: FaGraduationCap },
];

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 z-30 
        w-full xl:w-[calc(100%-450px)] 
        px-6 md:px-10 py-4
        flex items-center justify-between
        overflow-hidden
        "
    >

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-1
        backdrop-blur-md bg-white/10 dark:bg-white/10
        border border-white/40 dark:border-white/10
        rounded-3xl px-2 py-1.5
        shadow-sm
      ">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = activeSection === href.replace("#", "");
          return (
            <a
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-100 ${
                isActive
                  ? "backdrop-blur-md bg-white/40 dark:bg-white/10 text-[#7c6ef5] dark:text-[#b8a9ff] shadow-sm dark:border-white/10"
                  : "text-[#6b6b8d] dark:text-gray-400 hover:text-[#7c6ef5] dark:hover:text-[#b8a9ff] hover:bg-white/20 dark:hover-bg-white/5"
              }`}
            >
              <Icon size={12} className="shrink-0"/>
              <span className="hidden lg:inline">{label}</span>
            </a>
          )
        })}
      </nav>

      {/* Right - dark mode + contact button */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-11 h-11 rounded-3xl flex items-center justify-center
            backdrop-blur-md bg-white/10 dark:bg-white/10
            border border-white/30 dark:border-white/10
            text-[#7c6ef5] dark:text-[#b8a9ff]
            hover:scale-105 transition-colors duration-200"
        >
          {darkMode ? <FiSun size={16}/> : <FiMoon size={16} />}
        </button>

        {/* Contact button */}
        <a
          href="#contact"
          className="flex items-center gap-2 px-5 py-3 rounded-3xl text-sm font-semibold
            bg-gradient-to-r from-[#ff8da1] to-[#b8a9ff]
            text-white
            shadow-[0_4px_15px_rgba(184,169,255,0.4)]
            hover:shadow-[0_4px_25px_rgba(184,169,255,0.6)]
            hover:scale-[1.03]
            transition-all duration-300
          "
        >
          Let's Talk
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#7c6ef5] dark:text-[#b8a9ff] p-2 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>



      {/* Mobile Menu */}
      <div className={`
          fixed inset-0 z-40 
          bg-white/90 dark:bg-[#0d0d1a]/90 backdrop-blur-xl
          flex flex-col items-center justify-center gap-6
          transition-transform duration-300 md-hidden
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium text-[#1a1a3e] dark:text-white hover:text-[#7c6ef5] transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
    </header>
  );
}