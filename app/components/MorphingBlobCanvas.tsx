"use client"
import React, { useRef, useEffect } from 'react';

// Types
interface ControlPoint {
    angle: number; // base angle on the circle
    radius: number; // current radius (disturbed by physics)
    baseRadius: number; // resting radius
    vr: number; // radial velocity (srping back)
}

interface Blob {
    x: number; //center x
    y: number; // center y
    vx: number; // velocity x
    vy: number; // velocity y
    baseRadius: number; // average radius
    points: ControlPoint[];
    color: string; 
    glowColor: string; // inner glow color
    phase: number; // time offset for organic drift
    speed: number; // drift speed multiplier
    isCentral: boolean;
    depth: number;
}

// Helpers
const NUM_POINTS = 14; // control points par blob
const SPRING = 0.08;
const DAMPING = 0.75;
const ATTRACT_RADIUS = 180;
const ATTRACT_STRENGTH = 0.012;

// Helper to get random velocity with minimum speed
function randVel(speed: number): number {
    const min = 0.3;
    const v = (Math.random() - 0.5) * speed;
    return v >= 0 ? Math.max(min, v) : Math.min(-min, v);
}

function createPoints(baseRadius: number): ControlPoint[] {
    return Array.from({ length: NUM_POINTS }, (_, i) => ({
        angle: (i / NUM_POINTS) * Math.PI * 2,
        radius: baseRadius,
        baseRadius,
        vr: 0,
    }));
}

function createBlob(
    x: number, y: number,
    baseRadius: number,
    color: string,
    glowColor: string,
    vx: number, vy: number,
    phase: number,
    speed: number,
    isCentral: boolean,
    depth: number
): Blob {
    return { x, y, vx, vy, baseRadius, points: createPoints(baseRadius), color, glowColor, phase, speed, isCentral, depth, };
}

// Smooth blob outline using cubic bezier through control points
function drawBlobPath(ctx: CanvasRenderingContext2D, blob: Blob) {
    const pts = blob.points.map(p => ({
        x: blob.x + Math.cos(p.angle) * p.radius,
        y: blob.y + Math.sin(p.angle) * p.radius,
    }));

    const n =  pts.length;

    // Start at midpoint between last and first point
    const startX = (pts[n - 1].x + pts[0].x) / 2;
    const startY = (pts[n - 1].y + pts[0].y) / 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);

    for (let i = 0; i < n; i++) {
        const curr = pts[i];
        const next = pts[(i + 1) % n];
        const mx = (curr.x + next.x) / 2;
        const my = (curr.y + next.y) / 2;
        ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
    }
    ctx.closePath();
}

// Component
interface Props {
    darkMode: boolean;
}

function MorphingBlobCanvas({ darkMode }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number | undefined>(undefined);
    const mouse = useRef({ x: -9999, y: -9999 });
    const blobs = useRef<Blob[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initBlobs();
        };

        const initBlobs = () => {
            const W = canvas.width;
            const H = canvas.height;
            const s = Math.min(W, H);

            blobs.current = [
                // Central large Blob
                createBlob(
                    W * 0.5, H * 0.48, s * 0.22,
                    "124,110,245",
                    "184,169,255",
                    (Math.random() - 0.5) * 0.6,
                    (Math.random() - 0.5) * 0.6,
                    0, 0.4, true, 1.0
                ),

                // Medium floating blobs
                createBlob(
                    W * 0.15, H * 0.2,
                    Math.min(W, H) * 0.08,
                    "255,141,161",
                    "255,184,200",
                    randVel(1.2), randVel(1.2),
                    1.2, 1, false, 0.85
                ),
                createBlob(
                    W * 0.82, H * 0.25, s * 0.07,
                    "184,169,255",
                    "210,200,255",
                    randVel(1.1), randVel(1.1),
                    2.4, 1.1, false, 0.75
                ),
                createBlob(
                    W * 0.75, H * 0.72, s * 0.09,
                    "255,141,161",
                    "255,184,200",
                    randVel(1.0), randVel(1.0),
                    0.8, 0.9, false, 0.9
                ),
                createBlob(
                    W * 0.2, H * 0.75, s * 0.065,
                    "124,110,245",
                    "184,169,255",
                    randVel(1.2), randVel(1.2),
                    3.1, 1.05, false, 0.8
                ),
                createBlob(
                    W * 0.55, H * 0.12, s * 0.1,
                    "184,169,255",
                    "210,200,255",
                    randVel(1.3), randVel(1.3),
                    1.8, 1.2, false, 0.7
                ),

                // Small farther blobs
                createBlob(
                    W * 0.88, H * 0.55, s * 0.045,
                    "255,141,161",
                    "255,184,200",
                    randVel(1.4), randVel(1.4),
                    0.5, 1.3, false, 0.45
                ),
                createBlob(
                    W * 0.08, H * 0.04, s * 0.004,
                    "124,110,245",
                    "184,169,255",
                    randVel(1.5), randVel(1.5),
                    2.0, 1., false, 0.35
                ),
                createBlob(
                    W * 0.40, H * 0.88, s * 0.005,
                    "184,169,255",
                    "210,200,255",
                    randVel(1.2), randVel(1.2),
                    4.0, 1.1, false, 0.5
                ),
                //createBlob(
                //    W * 0.65, H * 0.05, s * 0.038,
                //     "255,141,161",
                //     "255,184,200",
                //     randVel(1.4), randVel(1.4),
                //     1.0, 1.25, false, 0.3
                // ),
                // createBlob(
                //     W * 0.30, H * 0.40, s * 0.042,
                //     "124,110,245",
                //     "184,169,255",
                //     randVel(1.3), randVel(1.3),
                //     3.5, 1.25, false, 0.4
                // ),
                // createBlob(
                //     W * 0.90, H * 0.80, s * 0.048,
                //     "184,169,255",
                //     "210,200,255",
                //     randVel(1.1), randVel(1.1),
                //     2.8, 1.0, false, 0.55
                // ),
                // createBlob(
                //     W * 0.10, H * 0.90, s * 0.035,
                //     "255,141,161",
                //     "255,184,200",
                //     randVel(1.7), randVel(1.7),
                //     0.3, 1.6, false, 0.3
                // ),
            ];
        };

        resize();
        window.addEventListener("resize", resize);

        // Mouse tracking: use clientX directly, offset by canvas rect
        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        let lastScrollY = window.scrollY;
        const onScroll = () => {
            const delta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;
            blobs.current.forEach(blob => {
                blob.vy += delta * 0.08;
                blob.vx += (Math.random() - 0.5) * Math.abs(delta) * 0.03;
            });
        };
        window.addEventListener("scroll", onScroll);

        // Draw a jeffyfish-style blob
        const drawBlob = (blob: Blob) => {
            const r = blob.baseRadius;
            const d = blob.depth;

            // Drop shadow - blurred blob offset below-right
            ctx.save();
            const shadowBlob = { ...blob, x: blob.x + r*0.18, y: blob.y + r*0.25 };
            drawBlobPath(ctx, shadowBlob);
            //ctx.fillStyle = `rgba(80,60,160, ${0.09 * d})`;
            //ctx.filter = `blur(${Math.round(r * 0.3)}px)`;
            //ctx.fill();
            //ctx.filter = "none";
            ctx.fillStyle = `rgba(80,60,160, ${0.06 * d})`;
            ctx.restore();

            // Outer glow (large soft halo)
            const haloA = darkMode ? 0.18 * d : 0.22 * d;
            const halo = ctx.createRadialGradient(blob.x, blob.y, r * 0.3, blob.x, blob.y, r * 2.2);
            halo.addColorStop(0, `rgba(${blob.glowColor}, ${haloA})`);
            halo.addColorStop(0.5, `rgba(${blob.glowColor}, ${haloA * 0.4})`);
            halo.addColorStop(1, `rgba(${blob.glowColor}, 0)`);
            ctx.beginPath();
            ctx.arc(blob.x, blob.y, r * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = halo;
            ctx.fill();

            // Main blob shape
            drawBlobPath(ctx, blob);
            const a = darkMode
                ? { a: 0.55*d, b: 0.35*d, c: 0.18*d, e: 0.06*d }
                : { a: 0.65*d, b: 0.45*d, c: 0.22*d, e: 0.06*d };

            // Fill: radial gradient from bright center to transparent adge (jellyfish)
            const fill = ctx.createRadialGradient(
                blob.x - r * 0.2, blob.y - r * 0.2, 0,
                blob.x, blob.y, r * 1.1
            );
            fill.addColorStop(0, `rgba(${blob.glowColor}, ${a.a})`);
            fill.addColorStop(0.35, `rgba(${blob.color}, ${a.b})`);
            fill.addColorStop(0.7, `rgba(${blob.color}, ${a.c})`);
            fill.addColorStop(1, `rgba(${blob.color}, ${a.e})`);
            ctx.fillStyle = fill;
            ctx.fill();

            // Rim: thin bright stroke following the blob outline
            drawBlobPath(ctx, blob);
            ctx.strokeStyle = `rgba(${blob.glowColor}, ${0.4 * d})`;
            ctx.lineWidth = blob.isCentral ? 1.5 : 0.8;
            ctx.stroke();

            // Primary specular (top-left bright spot - like light refracting in jellyfish)
            const hlR = r * 0.38;
            const hlX = blob.x - r * 0.28;
            const hlY = blob.y - r * 0.28;
            const hl = ctx.createRadialGradient(
                hlX, hlY, 0, hlX, hlY, hlR
            );
            hl.addColorStop(0, `rgba(255,255,255, ${0.55 * d})`);
            hl.addColorStop(0.3, `rgba(255,255,255, ${0.22 * d})`);
            hl.addColorStop(0.7, `rgba(255,255,255, ${0.05 * d})`);
            hl.addColorStop(1, `rgba(255,255,255, 0)`);
            ctx.beginPath();
            ctx.arc(hlX, hlY, hlR, 0, Math.PI * 2);
            ctx.fillStyle = hl;
            ctx.fill();

            // Secondary  specular - bottom-right subtle bounce light
            const hl2R = r * 0.18;
            const hl2X = blob.x + r * 0.45;
            const hl2Y = blob.y + r * 0.40;
            const hl2 = ctx.createRadialGradient(hl2X, hl2Y, 0, hl2X, hl2Y, hl2R);
            hl2.addColorStop(0, `rgba(255,255,255, ${0.18 * d})`);
            hl2.addColorStop(0.5, `rgba(255,255,255, ${0.05 * d})`);
            hl2.addColorStop(1, `rgba(255,255,255, 0)`);
            ctx.beginPath();
            ctx.arc(hl2X, hl2Y, hl2R, 0, Math.PI * 2);
            ctx.fillStyle = hl2;
            ctx.fill();

            ctx.restore();
        };

        // Update blob physics
        const updateBlob = (blob: Blob, now: number) => {
            const W = canvas.width;
            const H = canvas.height;
            const t = now / 1000;
            const mx = mouse.current.x;
            const my = mouse.current.y;

            // Central blob: gentle drift, stays near center
            if (blob.isCentral) {
                const cx = W * 0.5;
                const cy = H * 0.48;
                blob.vx += (cx - blob.x) * 0.0008;
                blob.vy += (cy - blob.y) * 0.0008;
            }

            // Move
            blob.x += blob.vx;
            blob.y += blob.vy;

            // Soft bounce off edges
            const margin = blob.baseRadius * 1.1;
            if (blob.x < margin) { blob.x = margin; blob.vx = Math.abs(blob.vx) * 0.65; }
            if (blob.x > W - margin) { blob.x = W - margin; blob.vx = -Math.abs(blob.vx) * 0.65; }
            if (blob.y < margin) { blob.y = margin; blob.vy = Math.abs(blob.vy) * 0.65; }
            if (blob.y > H - margin) { blob.y = H - margin; blob.vy = -Math.abs(blob.vy) * 0.65; }

            // Friction
            blob.vx *= 0.98;
            blob.vy *= 0.98;

            // Update each control point
            blob.points.forEach((p, i) => {
                // Organic morphing: perlin-like via layered sines
                const wave =
                    Math.sin(t * blob.speed + blob.phase + i * 0.7) * 0.08 +
                    Math.sin(t * blob.speed * 1.3 + blob.phase + i * 1.3) * 0.05;
                const organicR = blob.baseRadius * (1 + wave);

                // Point world position
                const px = blob.x + Math.cos(p.angle) * p.radius;
                const py = blob.y + Math.sin(p.angle) * p.radius;

                // Cursor attraction
                const dx = mx - px;
                const dy = my - py;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let targetR = organicR;
                if ( mx > -1000 && dist < ATTRACT_RADIUS) {
                    // Pull the point radially toward the cursor
                    const pull = (1 - dist / ATTRACT_RADIUS) * ATTRACT_STRENGTH;
                    // Project pull onto radial direction of this point
                    const radX = Math.cos(p.angle);
                    const radY = Math.sin(p.angle);
                    const proj = dx * radX + dy * radY; // how much cursor is in this point's direction
                    targetR += proj * pull * blob.baseRadius * 1.8; 
                }

                // Sprint back toward target
                const delta =  targetR - p.radius;
                p.vr += delta * SPRING;
                p.vr *= DAMPING;
                p.radius += p.vr;

                // Clamp so blob doesn't explode
                p.radius = Math.max(blob.baseRadius * 0.4, Math.min(blob.baseRadius * 2.2, p.radius));
            });
        };

        // Animation loop
        const draw = (now: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw back-to-front: large blob last so it sits on top
            const sorted = [...blobs.current].sort((a, b) =>
                a.depth - b.depth
            );

            sorted.forEach(blob => {
                updateBlob(blob, now);
                drawBlob(blob);
            });

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("scroll", onScroll);
        };
    }, [darkMode]);
    
    return (
        <canvas
            ref={canvasRef}
            className='absolute inset-0 w-full h-full pointer-events-none z-0'
        />
    )
}

export default MorphingBlobCanvas