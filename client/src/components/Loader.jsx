import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sprout, Circle, Sun } from 'lucide-react';

const Loader = ({ onComplete }) => {
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(container.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                    onComplete: onComplete
                });
            }
        });

        // Initial State
        gsap.set(".seed-icon", { y: -100, opacity: 0 });
        gsap.set(".sprout-container", { scale: 0, opacity: 0 });
        gsap.set(".sun-rays", { scale: 0, opacity: 0, rotation: 0 });
        gsap.set(".brand-text span", { y: 100, opacity: 0 });
        gsap.set(".tagline", { opacity: 0, y: 20 });
        gsap.set(".progress-bar", { scaleX: 0 });

        // Phase 1: FAST Seed Drop
        tl.to(".seed-icon", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "bounce.out"
        });

        // Phase 2: Instant Germination
        tl.to(".seed-icon", { scaleX: 1.5, scaleY: 0.6, duration: 0.1, ease: "power2.inOut" })
            .to(".seed-icon", { scaleX: 1, scaleY: 1, duration: 0.1, ease: "power2.inOut" })
            .to(".seed-icon", { scale: 0, duration: 0.1, ease: "power2.in" }, "+=0.05");

        // Phase 3: Quick Growth
        tl.to(".sprout-container", {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(2)"
        }, "<");

        // Phase 4: Fast Sun
        tl.to(".sun-rays", {
            scale: 1.5,
            opacity: 0.2,
            rotation: 180,
            duration: 1, // Slower but simultaneous
            ease: "power2.out"
        }, "<");

        // Phase 5: Snappy Typography Reveal
        tl.to(".brand-text span", {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.5,
            ease: "power4.out"
        }, "-=0.2");

        tl.to(".tagline", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.3");

        // Phase 6: Progress Bar Fill (Simulating load)
        tl.to(".progress-bar", {
            scaleX: 1,
            duration: 1.5, // The main wait time
            ease: "power2.inOut"
        }, "<");

    }, { scope: container });

    const text = "MarketDirect";
    const chars = text.split("");

    return (
        <div ref={container} className="fixed inset-0 z-[100] bg-farm-green-900 flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Background Ambient Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-farm-green-800 to-farm-green-950 opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Animation Container */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Sun Rays Effect */}
                    <div className="sun-rays absolute inset-0 text-yellow-100 flex items-center justify-center">
                        <Sun size={100} strokeWidth={1} />
                    </div>

                    {/* Seed Stage */}
                    <div className="seed-icon absolute text-farm-green-300">
                        <Circle size={16} fill="currentColor" />
                    </div>

                    {/* Sprout Stage */}
                    <div className="sprout-container absolute bg-white p-5 rounded-full shadow-2xl shadow-farm-green-900/50 z-20">
                        <Sprout size={40} className="sprout-icon text-farm-green-600" strokeWidth={2.5} />
                    </div>
                </div>

                {/* Typography */}
                <div className="text-center overflow-hidden">
                    <h1 className="brand-text text-3xl md:text-5xl font-serif font-bold tracking-tight flex justify-center overflow-hidden py-1">
                        {chars.map((char, index) => (
                            <span key={index} className="inline-block origin-bottom transform">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h1>
                    <p className="tagline text-farm-green-200 mt-1 text-sm font-light tracking-widest uppercase">
                        Nature to Nurture
                    </p>
                </div>

                {/* Restored Progress Bar */}
                <div className="w-64 h-1 bg-farm-green-800 rounded-full overflow-hidden mt-4">
                    <div className="progress-bar h-full bg-farm-green-400 origin-left"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
