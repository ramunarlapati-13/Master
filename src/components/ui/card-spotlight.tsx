"use client";

import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import React, { MouseEvent } from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
    children,
    radius = 350,
    color = "rgba(0, 217, 255, 0.15)", // Default to accent-blue with low opacity
    className,
    ...props
}: {
    radius?: number;
    color?: string;
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "group/spotlight relative overflow-hidden",
                className
            )}
            onMouseMove={handleMouseMove}
            {...props}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              ${color},
              transparent 80%
            )
          `,
                }}
            />
            {children}
        </div>
    );
};
