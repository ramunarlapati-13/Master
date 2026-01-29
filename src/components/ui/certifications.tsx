"use client";

import { motion } from "framer-motion";

const certifications = [
    {
        title: "Industrial Internet Of Things (IIoT)",
        issuer: "MyTeGen",
        date: "Jan 2026",
        link: "#",
        icon: "🏭"
    },
    {
        title: "SRC e-solutions",
        issuer: "SRC",
        date: "Sept 2025",
        link: "#",
        icon: "⚡"
    },
    {
        title: "Design Thinking for Innovation",
        issuer: "Skillsoft",
        date: "Apr 2025",
        link: "#",
        icon: "💡"
    },
    {
        title: "Aeroforge Labs Workshop",
        issuer: "Aeroforge Labs",
        date: "Mar 2025",
        link: "#",
        icon: "🚀"
    },
    {
        title: "Chefronics Workshop",
        issuer: "Chefronics",
        date: "Oct 2024",
        link: "#",
        icon: "🤖"
    },
    {
        title: "Infosys Springboard Certification",
        issuer: "Infosys",
        date: "2024",
        link: "#",
        icon: "🎓"
    },
    {
        title: "IOT (Internet of Things)",
        issuer: "NPTEL",
        date: "2024",
        link: "#",
        icon: "📡"
    },
    {
        title: "Generative AI for All",
        issuer: "NPTEL",
        date: "2024",
        link: "#",
        icon: "🧠"
    }
];

export const Certifications = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
                Certifications & Recognition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, idx) => (
                    <HoverCard key={idx} cert={cert} index={idx} />
                ))}
            </div>
        </div>
    );
};

const HoverCard = ({ cert, index }: { cert: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-full w-full p-0.5 rounded-2xl overflow-hidden"
        >
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent group-hover:via-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-flow" />

            <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-2xl overflow-hidden hover:bg-white/5 transition-colors duration-300">

                {/* Glow effect blob */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-all duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-2xl border border-white/5 group-hover:border-white/20 transition-colors">
                            {cert.icon}
                        </div>
                        <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded-full bg-white/5">
                            {cert.date}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {cert.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                        Issued by {cert.issuer}
                    </p>


                </div>
            </div>
        </motion.div>
    );
};
