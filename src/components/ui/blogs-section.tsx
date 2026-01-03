// Defines the structure of a blog post
interface BlogPost {
    id: number;
    title: string;
    description: string;
    date: string;
    readTime: string;
    image: string; // URL for the thumbnail
    link: string; // URL to the full blog post
    tags: string[]; // List of categories/tags
}

// Dummy data for the blogs
const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "The Future of IoT in Industrial Automation",
        description: "Exploring how Internet of Things (IoT) devices are revolutionizing manufacturing processes, predictive maintenance, and operational efficiency in Industry 4.0.",
        date: "October 15, 2024",
        readTime: "5 min read",
        image: "https://placehold.co/600x400/0A0E27/00FF88?text=IoT+Automation&font=montserrat",
        link: "#",
        tags: ["IoT", "Automation", "Industry 4.0"]
    },
    {
        id: 2,
        title: "Understanding Generative AI: Beyond the Hype",
        description: "A deep dive into the mechanics of Generative AI models, their practical applications in engineering, and the ethical considerations shaping their future.",
        date: "November 2, 2024",
        readTime: "7 min read",
        image: "https://placehold.co/600x400/1A1F3A/00D9FF?text=Generative+AI&font=montserrat",
        link: "#",
        tags: ["AI", "Technology", "Future"]
    },
    {
        id: 3,
        title: "Systems Thinking for Personal Growth",
        description: "Applying engineering systems thinking principles to personal development through goal setting, feedback loops, and sustainable habit formation.",
        date: "December 10, 2024",
        readTime: "6 min read",
        image: "https://placehold.co/600x400/000000/FF6B35?text=Systems+Thinking&font=montserrat",
        link: "#",
        tags: ["Productivity", "Self-Improvement", "Mindset"]
    }
];

export const BlogsSection = () => {
    return (
        <section id="blogs" className="container fade-in-section relative">
            {/* Circuit Decoration (reused style for consistency) */}
            <svg
                className="circuit-decoration absolute -top-10 -right-5 transform scale-[0.8] pointer-events-none z-0"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="50" cy="50" r="8" fill="var(--accent-orange)" opacity="0.5" />
                <line x1="50" y1="50" x2="90" y2="50" stroke="var(--accent-orange)" strokeWidth="2" />
                <line x1="50" y1="50" x2="50" y2="10" stroke="var(--accent-orange)" strokeWidth="2" />
                <circle cx="90" cy="50" r="5" fill="var(--accent-blue)" opacity="0.5" />
                <circle cx="50" cy="10" r="5" fill="var(--accent-blue)" opacity="0.5" />
            </svg>

            <h2 className="section-title">Latest Articles</h2>

            <div className="project-grid">
                {blogPosts.map((post) => (
                    <div key={post.id} className="project-card glass-card flex flex-col h-full">
                        <div className="card-image-wrapper relative overflow-hidden h-48 rounded-tr-3xl">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            <div className="scanline"></div>
                        </div>

                        <div className="project-info flex flex-col flex-1 p-6 relative">
                            <div className="flex gap-2 flex-wrap mb-4">
                                {post.tags.map((tag, idx) => (
                                    <span key={idx} className="text-xs text-[var(--accent-blue)] border border-[rgba(0,217,255,0.3)] px-2 py-0.5 rounded-xl bg-[rgba(0,217,255,0.05)]">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h3 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">{post.title}</h3>

                            <div className="flex justify-between text-sm text-[var(--text-muted)] mb-4">
                                <span>{post.date}</span>
                                <span>{post.readTime}</span>
                            </div>

                            <p className="flex-1 mb-6 text-[var(--text-secondary)] leading-relaxed">{post.description}</p>

                            <a href={post.link} className="view-btn self-start no-underline inline-flex items-center gap-2">
                                Read Article
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
