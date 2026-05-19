"use client";
import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
import SectionSpotlight from '../components/SectionSpotlight';

interface ContactProps {
    darkMode: boolean;
}

function Contact({ darkMode } : ContactProps) {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [transmitting, setTransmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setTransmitting(true);
        try{
            await emailjs.send(
                "service_9vplkil",
                "template_mwloeae",
                { name: form.name, email: form.email, subject: form.subject, message: form.message },
                "4eS7tGbGbPwvFbAeD"
            );
            setStatus("success");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch {
            setStatus("error");
        } finally {
            setTimeout(() => setTransmitting(false), 1200);
        }
    };

    // Signal pulse border overlay, travels around the input border on focus
    const SignalBorder = ({ field }: { field: string }) => (
        <div
            className='absolute inset-0 rounded-xl pointer-events-none'
            style={{
                background: focusedField === field
                    ? "linear-gradient(90deg, #b8a9ff, #ff8da1, #b8a9ff)"
                    : "transparent",
                backgroundSize: "200% 100%",
                animation: focusedField === field ? "signal-pulse 1.5s linear infinite" : "none",
                padding: "1.5px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
            }}
        />
    );

    const inputClass = `w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200
        ${darkMode
            ? "bg-white/5 border border-white/10 text-white placeholder-white/25 focus:border-transparent"
            : "bg-black/5 border border-black/10 text-[#1a1a3e] placeholder-black/25 focus:border-transparent"
        }`;

    const labelClass = `text-sm font-medium ${darkMode ? "text-white/40" : "text-black/40"}`;

    return (
        <section id="contact" className='relative w-full px-6 md:px-10 pt-7 pb-20 items-center'>

            {/* Spotlight */}
            <SectionSpotlight darkMode={darkMode} 
                beams={[
                {
                    x: 0.8, y: 0.98, angle: 130, spread: 60,
                    length: 0.7, opacity: 0.4,
                    color: "255,141,161",
                    darkColor: "255,255,255",
                    pulseSpeed: 15
                },
                {
                    x: 0.2, y: 0.98, angle: -130, spread: 60,
                    length: 0.7, opacity: 0.4,
                    color: "184,169,255",
                    darkColor: "255,255,255",
                    pulseSpeed: 15
                }
                ]}
             />

            {/* Title */}
            <div>
                <span className='text-4xl grid justify-center gradient-text'>Contact</span>
                <span className='block w-full h-3 bg-[#FF8DA1] mt-4 mb-16' />
            </div>

            <div className='relative mx-auto max-w-2xl'>

                {/* Blurred color blobs behind the card */}
                <div className='absolute -inset-10 pointer-events-none -z-10'>
                    <div 
                        className='absolute top-0 left-0 w-72 h-72 rounded-full'
                        style={{
                            background: '#b8a9ff',
                            opacity: darkMode ? 0.18 : 0.12,
                            filter: "blur(70px)",
                        }}
                    />
                    <div 
                        className='absolute bottom-0 right-0 w-72 h-72 rounded-full'
                        style={{
                            background: '#ff8da1',
                            opacity: darkMode ? 0.15 : 0.10,
                            filter: "blur(70px)",
                        }}
                    />
                </div>

                {/* Card border gradient */}
                <div 
                    className='absolute -inset-[1.5px] rounded-2xl pointer-events-none'
                    style={{
                        background: darkMode
                            ? "linear-gradient(145deg, rgba(184,169,255,0.4) 0%, rgba(255,141,161,0.2) 50%, rgba(184,169,255,0.1) 100%)"
                            : "linear-gradient(145deg, rgba(184,169,255,0.7) 0%, rgba(255,141,161,0.4) 50%, rgba(184,169,255,0.2) 100%)",
                    }}
                />

                {/* Transmission pulse on submit */}
                {transmitting && (
                    <div className='absolute inset-0 rounded-2xl pointer-events-none z-20 overflow-hidden'>
                        <div
                            className='absolute inset-0 rounded-2xl'
                            style={{ animation: "transmit-pulse 1.2s ease-out forwards"}}
                        />
                    </div>
                )}

                {/* Glass card surface */}
                <div
                    className='relative rounded-2xl overflow-hidden'
                    style={{
                        background: darkMode ? "rgba(10, 4, 18, 0.72)" : "rgba(255, 255, 255, 0.45)",
                        backdropFilter: "blur(32px)",
                        WebkitBackdropFilter: "blur(32px)",
                        boxShadow: darkMode
                            ? "0 8px 48px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)"
                            : "0 8px 48px rgba(100,80,160,0.12), 0 2px 10px rgba(0,0,0,0.06)",
                    }}
                >
                    {/* Top edge highlight */}
                    <div
                        className='absolute top-0 left-0 right-0 h-px pointer-events-none'
                        style={{
                            background: darkMode
                                ? "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.18) 70%, transparent 95%)"
                                : "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.9) 70%, transparent 95%)",
                        }}
                    />

                    {/* Left edge highlight */}
                    <div
                        className='absolute top-0 left-0 bottom-0 w-px pointer-events-none'
                        style={{
                            background: darkMode
                                ? "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%)"
                                : "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 60%)",
                        }}
                    />

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='relative z-10 flex flex-col gap-5 p-8'>

                        {/* Name + Email */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {(["name", "email"] as const).map((field) => (
                                <div key={field} className='flex flex-col gap-2'>
                                    <label className={labelClass}>
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <div className='relative'>
                                        <SignalBorder field={field} />
                                        <input 
                                            type={field === "email" ? "email" : "text"}
                                            name={field}
                                            value={form[field]}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField(field)}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            placeholder={field === "email" ? "your@email.com" : "Your name"}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>    
                            ))}
                        </div>

                        {/* Subject */}
                        <div className='flex flex-col gap-2'>
                            <label className={labelClass}>Subject</label>
                            <div className='relative'>
                                <SignalBorder field="subject" />
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("subject")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    placeholder="What is this about?"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className='flex flex-col gap-2'>
                            <label className={labelClass}>Message</label>
                            <div className='relative'>
                                <SignalBorder field='message'/>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    rows={6}
                                    placeholder="Your message ..."
                                    className={`${inputClass} resize-none`}
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className='relative'>
                            {transmitting && (
                                <div
                                    className='absolute inset-0 rounded-xl pointer-events-none'
                                    style={{ animation: "ripple-out 1.2s ease-out forwards" }}
                                />
                            )}
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className={`relative w-full py-4 rounded-xl text-sm font-semibold tracking-widest uppercase overflow-hidden
                                transition-all duration-300
                                    ${status === "loading"
                                        ? "opacity-40 cursor-not-allowed bg-gradient-to-r from-[#b8a9ff] to-[#ff8da1] text-white"
                                        : "bg-gradient-to-r from-[#b8a9ff] to-[#ff8da1] hover:from-[#ff8da1] hover:to-[#b8a9ff] text-white hover:shadow-[0_0_28px_#b8a9ff70]"
                                    }
                                `}
                            >
                        
                                {/* Shimmer sweep */}
                                <span
                                    className='absolute inset-0 pointer-events-none'
                                    style={{
                                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                                        backgroundSize: "200% 100%",
                                        animation: status !== "loading" ? "shimmer 2.5s infinite" : "none",
                                    }}
                                />
                                <span className='relative z-10'>
                                    {status === "loading" ? "Transmitting..." : "Send Message"}
                                </span>         
                            </button>

                            {/* Feedback */}
                            {status === "success" && (
                                <p className='text-center text-green-400 text-sm'>
                                    ✦ Message transmitted. I&apos;ll get back to you soon.
                                </p>
                            )}
                            {status === "error" && (
                                <p className='text-center text-red-400 text-sm'>
                                    Transmission failed. Please try again or email me directly.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            
            <style>{`
                @keyframes signal-pulse {
                    0%  { background-position: 0% 0; }
                    100%    { background-position: 200% 0; }
                }
                @keyframes shimmer {
                    0%  { background-position: -200% 0; }
                    100%    { background-position: 200% 0; }
                }
                @keyframes transmit-pulse {
                    0%  { background: radial-gradient(ellipse at center, #b8a9ff25, transparent 70%); opacity: 1; }
                    100%    { background: transparent; opacity: 0; }    
                }
                @keyframes ripple-out {
                    0%  { box-shadow: 0 0 0 0 #b8a9ff50; opacity: 1; }
                    100%   { box-shadow: 0 0 0 24px #b8a9ff00; opacity: 0; }
                }
            `}</style>
        </section>
    );
}

export default Contact;