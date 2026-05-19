"use client";
import Image from "next/image";
import About from "./about/page";
import Projects from "./projects/page";
import Experience from "./experience/page";
import Skills from "./skills/page";
import Education from "./education/page";
import Contact from "./contact/page";
import BackToTop from "./components/BackToTop";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import SidebarSpotlight from "./components/SidebarSpotlight";


export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen w-full bg-[#f4f0ff] dark:bg-[#0D0D1A] transition-colors duration-500 flex">
      {/*<Blobs/>*/}

      {/* LEFT - Fixed sidebar, never scrolls */}
      <aside className="hidden xl:flex fixed top-0 left-0 h-screen w-[450px] z-40 p-10 pl-20">
        <div className="h-full w-full rounded-2xl overflow-hidden
          bg-white/80 dark:bg-[#13132b]/80
          backdrop-blur-xl
          border border-[#e2d9ff] dark:border-white/5
          shadow-[4px_0_30px_rgba(124,110,245,0.08)]
          relative
        ">
          {/*<SidebarSpotlight className="z-20" darkMode={darkMode} />*/}
          <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </aside>

      {/* RIGHT - Scrollable content  */}
      <main className="w-full xl:ml-[450px] xl:w-[calc(100%-450px)] flex flex-col ">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <About darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Experience darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Education darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>
    </div>      
  );
}
