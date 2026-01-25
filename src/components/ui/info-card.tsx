import React, { useState } from "react";
import { motion } from "framer-motion";

interface InfoCardProps {
    image: string;
    title: string;
    description: string;
    borderColor?: string;
    borderBgColor?: string;
    cardBgColor?: string;
    shadowColor?: string;
    textColor?: string;
    hoverTextColor?: string;
    fontFamily?: string;
    rtlFontFamily?: string;
    effectBgColor?: string;
    patternColor1?: string;
    patternColor2?: string;
    contentPadding?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
    image,
    title,
    description,
    borderColor = "rgba(255, 255, 255, 0.1)",
    borderBgColor = "rgba(255, 255, 255, 0.05)",
    cardBgColor = "rgba(10, 14, 39, 0.8)",
    shadowColor = "rgba(0, 0, 0, 0.5)",
    textColor = "#FFFFFF",
    hoverTextColor = "#FFFFFF",
    fontFamily = "inherit",
    effectBgColor = "rgba(0, 217, 255, 0.1)",
    patternColor1 = "rgba(255, 255, 255, 0.05)",
    patternColor2 = "transparent",
    contentPadding = "20px",
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="info-card-container"
            initial={false}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "1em",
                overflow: "hidden",
                position: "relative",
                background: isHovered ? effectBgColor : borderBgColor,
                border: `1px solid ${borderColor}`,
                boxShadow: isHovered ? `0 20px 40px ${shadowColor}` : `0 10px 20px ${shadowColor}`,
                transition: "all 0.4s ease",
                fontFamily: fontFamily,
            } as any}
        >
            {/* Background Pattern */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: `radial-gradient(circle at 2px 2px, ${patternColor1} 1px, ${patternColor2} 0)`,
                    backgroundSize: "24px 24px",
                    pointerEvents: "none",
                }}
            />

            {/* Hover Background Effect */}
            <motion.div
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1.2 : 1,
                }}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: effectBgColor,
                    filter: "blur(60px)",
                    zIndex: 0,
                }}
            />

            {/* Content Wrapper */}
            <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Image Section */}
                <div style={{ position: "relative", height: "50%", overflow: "hidden" }}>
                    <motion.img
                        src={image}
                        alt={title}
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.6 }}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))",
                        }}
                    />
                </div>

                {/* Info Section */}
                <div style={{ padding: contentPadding, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", background: cardBgColor }}>
                    <motion.h3
                        animate={{ color: isHovered ? hoverTextColor : textColor }}
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            marginBottom: "0.5rem",
                            transition: "color 0.3s ease",
                        }}
                    >
                        {title}
                    </motion.h3>
                    <p
                        style={{
                            fontSize: "0.9rem",
                            color: "rgba(255, 255, 255, 0.7)",
                            lineHeight: 1.6,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
