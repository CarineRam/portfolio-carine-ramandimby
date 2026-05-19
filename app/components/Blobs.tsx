import React from 'react'

function Blobs() {
  return (
    <>
    {/* Blobs behind Sidebar - top left */}
    <div className='fixed top-[-100px] left-[-80px] w-[400px] pointer-events-none z-0'
        style={{
            background: "radial-gradient(ellipse at 80% 50%, rgba(124,110,245,0.35) 0%, rgba(124,110,245,0.05) 60%, transparent 80%)", 
        }}
    />

    {/* Blobs behind Sidebar - bottom left */}
    <div className='fixed bottom-[-80px] left-[-60px] w-[350px] pointer-events-none z-0'
        style={{
            background: "radial-gradient(ellipse at 70% 40%, rgba(255,141,161,0.3) 0%, rgba(255,141,161,0.05) 60%, transparent 80%) ",
        }}
    />

    {/* Blobs top right - large ambient */}
    <div className='fixed top-[-150px] right-[-100px] w-[600px] h-[600px] pointer-events-none z-0'
        style={{
            background: "radial-gradient(ellipse at 20% 60%, rgba(184,169,255,0.3) 0%, rgba(184,169,255,0.05) 55%, transparent 75%)",
        }}
    />
    </>
  );
}

export default Blobs