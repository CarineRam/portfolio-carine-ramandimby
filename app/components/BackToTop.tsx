"use client";
import React, { useState, useEffect } from 'react';
import { FaChevronUp } from "react-icons/fa";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top:0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to Top"
      className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-[#FF8DA1] text-black flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-[#ffb5c0] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <FaChevronUp size={14} />
    </button>
  );
}

export default BackToTop