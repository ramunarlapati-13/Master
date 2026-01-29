"use client";

import React, { useRef, useState } from "react";

interface SpotlightTextProps {
    text: string;
    className?: string;
}

export const SpotlightText = ({ text, className = "" }: SpotlightTextProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative flex justify-center w-full cursor-default select-none ${className}`}
        >
            {/* Base Text - The initial sleek look with original gradient */}
            <h1 className="flex justify-between w-full text-2xl sm:text-5xl md:text-7xl font-bold tracking-widest">
                {text.split("").map((char, i) => (
                    <span
                        key={i}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-green)] to-[var(--accent-blue)]"
                    >
                        {char}
                    </span>
                ))}
            </h1>

            {/* Spotlight Overlay - Adds the border glow effect */}
            <div
                className="absolute inset-0 flex justify-center transition-opacity duration-200 pointer-events-none"
                style={{
                    opacity: opacity,
                    maskImage: `radial-gradient(150px circle at ${position.x}px ${position.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(150px circle at ${position.x}px ${position.y}px, black, transparent)`,
                }}
            >
                <h1 className="flex justify-between w-full text-2xl sm:text-5xl md:text-7xl font-bold tracking-widest">
                    {text.split("").map((char, i) => (
                        <span
                            key={i}
                            className="text-transparent"
                            style={{
                                WebkitTextStroke: "2px var(--accent-green)",
                                filter: "drop-shadow(0 0 10px var(--accent-blue))",
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </h1>
            </div>
        </div>
    );
};
