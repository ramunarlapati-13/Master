"use client";
import React from "react";
import { motion } from "framer-motion";

export const ConnectIllustration = () => {
    return (
        <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center pointer-events-none select-none">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/20 to-[var(--accent-green)]/20 blur-[100px] rounded-full" />

            <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full relative z-10"
            >
                {/* Central Core */}
                <motion.circle
                    cx="100"
                    cy="100"
                    r="30"
                    stroke="url(#coreGradient)"
                    strokeWidth="2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />

                <motion.circle
                    cx="100"
                    cy="100"
                    r="25"
                    fill="url(#coreInnerGradient)"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Satellite Nodes */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const radius = 70;
                    const x = 100 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 100 + radius * Math.sin((angle * Math.PI) / 180);

                    return (
                        <React.Fragment key={i}>
                            {/* Connection Path */}
                            <motion.line
                                x1="100"
                                y1="100"
                                x2={x}
                                y2={y}
                                stroke="var(--accent-blue)"
                                strokeWidth="0.5"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.3 }}
                                transition={{ duration: 1.5, delay: i * 0.1 }}
                            />

                            {/* Node */}
                            <motion.circle
                                cx={x}
                                cy={y}
                                r="4"
                                fill={i % 2 === 0 ? "var(--accent-blue)" : "var(--accent-green)"}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 + i * 0.1 }}
                            />

                            {/* Outer Pulse */}
                            <motion.circle
                                cx={x}
                                cy={y}
                                r="8"
                                stroke={i % 2 === 0 ? "var(--accent-blue)" : "var(--accent-green)"}
                                strokeWidth="0.5"
                                animate={{
                                    scale: [1, 1.8],
                                    opacity: [0.5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                    ease: "easeOut"
                                }}
                            />
                        </React.Fragment>
                    );
                })}

                {/* Circuit Lines */}
                <motion.path
                    d="M 50,20 L 70,40 L 100,40"
                    stroke="var(--accent-blue)"
                    strokeWidth="1"
                    opacity="0.2"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.path
                    d="M 150,180 L 130,160 L 100,160"
                    stroke="var(--accent-green)"
                    strokeWidth="1"
                    opacity="0.2"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                />

                <defs>
                    <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent-blue)" />
                        <stop offset="100%" stopColor="var(--accent-green)" />
                    </linearGradient>
                    <radialGradient id="coreInnerGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>

            {/* Additional floating particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[var(--accent-blue)] opacity-50"
                    animate={{
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, (Math.random() - 0.5) * 200],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                    style={{
                        left: "50%",
                        top: "50%",
                    }}
                />
            ))}
        </div>
    );
};
