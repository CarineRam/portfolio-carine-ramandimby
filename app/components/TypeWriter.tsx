'use client'
import { useEffect, useState } from "react";
import React from 'react'

const roles = [
    "Full-Stack Developer",
    "Telecommunication Engineer",
    "Computer Science Student",
    "AI Enthusiast",
];

function TypeWriter() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = roles[roleIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && displayed.length < current.length) {
            // Typing
            timeout = setTimeout(() => {
                setDisplayed(current.slice(0, displayed.length + 1));
            }, 15);
        } else if (!deleting && displayed.length === current.length) {
            // Pause then start deleting
            timeout = setTimeout(() => setDeleting(true), 2000);
        } else if (deleting && displayed.length > 0) {
            // Deleting
            timeout = setTimeout(() => {
                setDisplayed(current.slice(0, displayed.length - 1));
            }, 30);
        } else if (deleting && displayed.length === 0) {
            // Move to next role
            timeout = setTimeout(() => {            
                setDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            })
        }

        return () => clearTimeout(timeout);
    }, [displayed, deleting, roleIndex]);
 
  return (
    <span className="text-xl md:text-2xl font-light text-[#7C6EF5] dark:text-[#b8a9ff]">
        {displayed}
        <span className="animate-pulse ml-0.5 text-[#ff8da1]">|</span>
    </span>
  )
}

export default TypeWriter