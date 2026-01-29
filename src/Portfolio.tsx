import { useEffect, useRef, useState } from 'react';
import { InfoCard } from './components/ui/info-card';
import { SocialIcons } from './components/ui/social-icons';
import InteractiveBentoGallery from './components/ui/interactive-bento-gallery';
import { Certifications } from './components/ui/certifications';
import { SpotlightText } from './components/ui/spotlight-text';
import { HeroGeometric } from './components/ui/shape-landing-hero';
import { CardSpotlight } from './components/ui/card-spotlight';

const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: 24,
    padding: 24,
    width: "100%",
    maxWidth: "1250px",
    margin: "0 auto",
};

const fileContainerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 388,
    height: 378,
    borderRadius: "1em",
    position: "relative",
    overflow: "hidden",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
};

export default function Portfolio() {
    const [loading, setLoading] = useState(true);
    const [bootText, setBootText] = useState<string[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    // Refs for cursor
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    // Boot loader effect
    useEffect(() => {
        const bootMessages = [
            "Initializing system core...",
            "Loading kernel modules...",
            "Verifying file integrity...",
            "Mounting volumes...",
            "Establishing secure connection...",
            "Accessing neural network...",
            "Loading portfolio assets...",
            "System ready.",
            "Welcome, User."
        ];

        const timeouts: number[] = [];

        bootMessages.forEach((msg, index) => {
            const msgDelay = (index + 1) * 60; // Spread messages over ~540ms
            const timeout = setTimeout(() => {
                setBootText(prev => [...prev, `> ${msg}`]);
            }, msgDelay);
            timeouts.push(timeout);
        });

        const finishTimeout = setTimeout(() => {
            setLoading(false);
        }, 800); // System ready and transitioned by 0.8s
        timeouts.push(finishTimeout);

        return () => timeouts.forEach(clearTimeout);
    }, []);

    // Custom Cursor Effect
    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let mouseX = 0, mouseY = 0;
        let posX = 0, posY = 0;
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        };

        const animateCursor = () => {
            posX += (mouseX - posX) * 0.15;
            posY += (mouseY - posY) * 0.15;
            follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
            animationFrameId = requestAnimationFrame(animateCursor);
        };

        document.addEventListener('mousemove', handleMouseMove);
        animateCursor();

        // Hover effects
        const handleMouseEnter = () => follower.classList.add('active');
        const handleMouseLeave = () => follower.classList.remove('active');

        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .glass-card, .timeline-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [loading]); // Re-run after loading to attach listeners to new elements

    // Scroll Effects
    useEffect(() => {
        if (loading) return;

        const header = document.getElementById('header');
        const handleScroll = () => {
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 50);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Intersection Observer for Nav Links
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        sections.forEach(section => observer.observe(section));

        // Fade In Observer
        const fadeSections = document.querySelectorAll('.fade-in-section');
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeSections.forEach(section => fadeObserver.observe(section));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
            fadeObserver.disconnect();
        };
    }, [loading]);

    if (loading) {
        return (
            <div id="boot-loader">
                <div className="boot-text">
                    {bootText.map((msg, i) => <p key={i}>{msg}</p>)}
                </div>
                <div className="cursor-blink"></div>
            </div>
        );
    }

    return (
        <>
            <div className="circuit-background">
                <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
                    <path className="circuit-path" d="M0,100 L200,100 L250,150 L500,150 L550,100 L800,100" />
                    <path className="circuit-path" d="M1920,300 L1700,300 L1650,350 L1400,350 L1350,300 L1100,300" />
                    <path className="circuit-path" d="M100,1080 L100,900 L150,850 L150,600" />
                    <path className="circuit-path" d="M1800,0 L1800,200 L1750,250 L1750,500" />
                    <path className="power-line" d="M0,540 L1920,540" />
                    <path className="power-line" d="M960,0 L960,1080" />
                    <path className="sine-wave" d="M0,800 Q100,700 200,800 T400,800 T600,800 T800,800 T1000,800 T1200,800 T1400,800 T1600,800 T1800,800 T2000,800" />
                    <path className="sine-wave" d="M0,200 Q100,300 200,200 T400,200 T600,200 T800,200 T1000,200 T1200,200 T1400,200 T1600,200 T1800,200 T2000,200" style={{ animationDelay: '1.5s', stroke: 'var(--accent-blue)' }} />
                    <circle className="node-point" cx="200" cy="100" r="3" />
                    <circle className="node-point" cx="500" cy="150" r="3" />
                    <circle className="node-point" cx="1700" cy="300" r="3" />
                    <circle className="node-point" cx="1400" cy="350" r="3" />
                    <circle className="node-point" cx="960" cy="540" r="5" style={{ fill: 'var(--accent-orange)' }} />
                </svg>
            </div>

            <div className="cursor" ref={cursorRef}></div>
            <div className="cursor-follower" ref={followerRef}></div>

            <div className="background-blobs">
                <div className="blob blob1"></div>
                <div className="blob blob2"></div>
                <div className="blob blob3"></div>
            </div>

            <div className="floating-elements-container">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`floating-element element-${i + 1}`}></div>
                ))}
            </div>

            <header id="header">
                <h1>Narlapati <span>Ramu</span></h1>
                <nav id="nav-links" className={menuOpen ? 'active' : ''}>
                    <a href="#home" className="active" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
                    <a href="https://ramublogs.vercel.app/" onClick={() => setMenuOpen(false)}>Blogs</a>
                    <a href="#timeline" onClick={() => setMenuOpen(false)}>Timeline</a>
                    <a href="#arsenal" onClick={() => setMenuOpen(false)}>Arsenal</a>
                    <a href="#extra-curricular" onClick={() => setMenuOpen(false)}>Activities</a>
                    <a href="#connect" onClick={() => setMenuOpen(false)}>Connect</a>
                </nav>

                <div className="header-actions">
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label="Toggle light/dark theme"
                    >
                        {theme === 'dark' ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                                <circle cx="12" cy="12" r="5" />
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>

                    <button
                        className={`hamburger ${menuOpen ? 'toggle' : ''}`}
                        id="hamburger"
                        aria-label="Open navigation menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </button>
                </div>
            </header>

            <main>
                <section id="home" className="relative">
                    <HeroGeometric badge="Portfolio 2026">
                        <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
                            <div className="mb-6 w-full max-w-4xl">
                                <SpotlightText text="RAMUNARLAPATI" />
                            </div>
                            <h2 className="text-xl md:text-3xl text-[var(--text-secondary)] font-medium tracking-widest uppercase">
                                Electrical and Electronics Engineer
                            </h2>
                        </div>
                    </HeroGeometric>
                    <div className="scroll-indicator">
                        <span>Scroll</span>
                    </div>
                </section>

                <section id="about" className="container fade-in-section" style={{ position: 'relative' }}>
                    <svg className="circuit-decoration top-right" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="8" fill="var(--accent-blue)" opacity="0.5" />
                        <line x1="50" y1="50" x2="90" y2="50" stroke="var(--accent-blue)" strokeWidth="2" />
                        <line x1="50" y1="50" x2="50" y2="10" stroke="var(--accent-blue)" strokeWidth="2" />
                        <circle cx="90" cy="50" r="5" fill="var(--accent-green)" opacity="0.5" />
                        <circle cx="50" cy="10" r="5" fill="var(--accent-green)" opacity="0.5" />
                        <rect x="85" y="45" width="10" height="10" fill="var(--accent-blue)" opacity="0.3" />
                    </svg>
                    <h2 className="section-title">About Me</h2>
                    <div className="about-content">
                        <div className="about-photo">
                            <img src="landing-profile.png" alt="Profile photo of Narlapati Ramu" />
                        </div>
                        <div className="about-text">
                            <h3>Bridging Technology & Innovation</h3>
                            <p>I'm <strong>Narlapati Ramu</strong>, an Electrical and Electronics Engineer passionate about building solutions at the intersection of <strong>AI, Embedded Systems, and Web Technologies</strong>. Currently learning AI for Embedded Systems and developing an <strong>Autonomous Grid Simulation</strong> prototype, I explore optimization of distributed energy loads with adaptive control.</p>
                            <h3>What Drives Me</h3>
                            <p>🧠 Learning AI for Embedded Systems<br />
                                ⚡ Building Autonomous Grid Simulation prototype<br />
                                🤝 Open to collaborations in Smart Energy & Green Tech<br />
                                🛰 Exploring distributed energy optimization with adaptive control<br />
                                💻 Enthusiastic about trending AI and Web development</p>
                            <div className="tech-stats">
                                <div className="stat-box">
                                    <div className="number">5+</div>
                                    <div className="label">Projects</div>
                                </div>
                                <div className="stat-box">
                                    <div className="number">10+</div>
                                    <div className="label">Skills</div>
                                </div>
                                <div className="stat-box">
                                    <div className="number">4+</div>
                                    <div className="label">Certifications</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects" className="container fade-in-section" style={{ position: 'relative' }}>
                    <svg className="circuit-decoration top-left" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="6" fill="var(--accent-blue)" opacity="0.5" />
                        <line x1="20" y1="20" x2="80" y2="20" stroke="var(--accent-green)" strokeWidth="2" />
                        <line x1="20" y1="20" x2="20" y2="80" stroke="var(--accent-green)" strokeWidth="2" />
                        <circle cx="80" cy="20" r="4" fill="var(--accent-orange)" opacity="0.5" />
                        <circle cx="20" cy="80" r="4" fill="var(--accent-orange)" opacity="0.5" />
                        <rect x="75" y="15" width="10" height="10" fill="var(--accent-green)" opacity="0.3"
                            transform="rotate(45 80 20)" />
                    </svg>
                    <h2 className="section-title">Projects Showcase</h2>
                    <div style={containerStyle}>

                        <div
                            className="file-container group"
                            style={{
                                ...fileContainerStyle,
                                ["--hover-text-color" as any]: "var(--accent-blue)",
                            }}
                            onClick={() => window.open('https://aioqr.vercel.app/', '_blank')}
                        >
                            <InfoCard
                                image="/images/aioqr-dashboard.png"
                                title="AIO REXPO QR"
                                description="A professional QR Generator and Bio-Link platform with Firebase integration, featuring high-performance React optimization and persistent cloud profiles."
                                borderColor="var(--accent-blue)"
                                borderBgColor="rgba(0, 217, 255, 0.05)"
                                cardBgColor="var(--glass-bg)"
                                shadowColor="var(--shadow-color)"
                                textColor="var(--text-primary)"
                                hoverTextColor="var(--accent-blue)"
                                effectBgColor="var(--glow-blue)"
                                patternColor1="var(--accent-blue)"
                                patternColor2="transparent"
                                contentPadding="20px"
                            />
                        </div>

                        <div
                            className="file-container group"
                            style={{
                                ...fileContainerStyle,
                                ["--hover-text-color" as any]: "var(--accent-green)",
                            }}
                            onClick={() => window.open('https://neon-fire.vercel.app/', '_blank')}
                        >
                            <InfoCard
                                image="https://placehold.co/600x400/0A0E27/00FF88?text=Neon+Duel&font=montserrat"
                                title="Neon Duel"
                                description="A high-energy multiplayer arena game featuring intense neon aesthetics and real-time combat gameplay."
                                borderColor="var(--accent-green)"
                                borderBgColor="rgba(0, 255, 136, 0.05)"
                                cardBgColor="var(--glass-bg)"
                                shadowColor="var(--shadow-color)"
                                textColor="var(--text-primary)"
                                hoverTextColor="var(--accent-green)"
                                effectBgColor="var(--glow-green)"
                                patternColor1="var(--accent-green)"
                                patternColor2="transparent"
                                contentPadding="20px"
                            />
                        </div>

                        <div
                            className="file-container group"
                            style={{
                                ...fileContainerStyle,
                                ["--hover-text-color" as any]: "var(--accent-orange)",
                            }}
                            onClick={() => window.open('https://perpectual-archiver.vercel.app/', '_blank')}
                        >
                            <InfoCard
                                image="/perpetual-achiever-screenshot.png"
                                title="The Perpetual Achiever"
                                description="A comprehensive digital manuscript and personal development platform exploring goal setting, systems thinking, and sustainable success strategies."
                                borderColor="var(--accent-orange)"
                                borderBgColor="rgba(255, 107, 53, 0.05)"
                                cardBgColor="var(--glass-bg)"
                                shadowColor="var(--shadow-color)"
                                textColor="var(--text-primary)"
                                hoverTextColor="var(--accent-orange)"
                                effectBgColor="rgba(255, 107, 53, 0.1)"
                                patternColor1="var(--accent-orange)"
                                patternColor2="transparent"
                                contentPadding="20px"
                            />
                        </div>

                        <div
                            className="file-container group"
                            style={{
                                ...fileContainerStyle,
                                ["--hover-text-color" as any]: "var(--accent-blue)",
                            }}
                            onClick={() => window.open('https://thingspeak-viewer.vercel.app/', '_blank')}
                        >
                            <InfoCard
                                image="/thingspeak-viewer-screenshot.png"
                                title="ThingSpeak Viewer"
                                description="A real-time IoT dashboard for monitoring sensor data from ThingSpeak channels with dynamic visualization capabilities."
                                borderColor="var(--accent-blue)"
                                borderBgColor="rgba(0, 217, 255, 0.05)"
                                cardBgColor="var(--glass-bg)"
                                shadowColor="var(--shadow-color)"
                                textColor="var(--text-primary)"
                                hoverTextColor="var(--accent-blue)"
                                effectBgColor="var(--glow-blue)"
                                patternColor1="var(--accent-blue)"
                                patternColor2="transparent"
                                contentPadding="20px"
                            />
                        </div>
                    </div>
                </section>

                <section id="timeline" className="container fade-in-section">
                    <h2 className="section-title">My Journey</h2>
                    <div className="timeline">
                        <div className="timeline-item left">
                            <div className="timeline-content glass-card">
                                <h3>Bachelor of Technology, EEE</h3>
                                <p><strong>JNTUK, Kakinada</strong> | 2024 - 2026</p>
                                <p>Pursuing my undergraduate degree, focusing on core electrical and electronics engineering
                                    principles.</p>
                            </div>
                        </div>
                        <div className="timeline-item right">
                            <div className="timeline-content glass-card">
                                <h3>Diploma in EEE</h3>
                                <p><strong>SBTET, Andhra Pradesh</strong> | 2021 - 2023</p>
                                <p>Completed my diploma, building a strong foundational knowledge in the field.</p>
                            </div>
                        </div>
                        <div className="timeline-item left">
                            <div className="timeline-content glass-card">
                                <h3>SSC (Secondary School Certificate)</h3>
                                <p><strong>ZPHS Marlapalem</strong> | 2021</p>
                                <p>Completed my secondary education, laying the foundation for my engineering journey.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="arsenal" className="container fade-in-section" style={{ position: 'relative' }}>
                    <svg className="circuit-decoration bottom-left" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="30" cy="70" r="7" fill="var(--accent-blue)" opacity="0.5" />
                        <line x1="30" y1="70" x2="70" y2="30" stroke="var(--accent-blue)" strokeWidth="2" />
                        <line x1="30" y1="70" x2="70" y2="70" stroke="var(--accent-green)" strokeWidth="2" />
                        <circle cx="70" cy="30" r="5" fill="var(--accent-green)" opacity="0.5" />
                        <circle cx="70" cy="70" r="5" fill="var(--accent-orange)" opacity="0.5" />
                        <path d="M 65 25 L 75 25 L 75 35 L 65 35 Z" fill="var(--accent-blue)" opacity="0.3" />
                    </svg>
                    <h2 className="section-title">Technical Arsenal</h2>
                    <div className="arsenal-grid">
                        <CardSpotlight className="arsenal-card glass-card">
                            <h3>Core Skills</h3>
                            <ul>
                                <li>Generative AI</li>
                                <li>Automation & Control</li>
                                <li>Internet of Things (IoT)</li>
                                <li>Embedded Systems</li>
                                <li>Problem Solving</li>
                            </ul>
                        </CardSpotlight>
                        <CardSpotlight className="arsenal-card glass-card" color="rgba(0, 255, 136, 0.15)">
                            <h3>Technology Stack</h3>
                            <ul>
                                <li>HTML, CSS, JavaScript</li>
                                <li>TypeScript</li>
                                <li>Next.js, Vite</li>
                                <li>Python, C / C++</li>
                                <li>Firebase, Firestore</li>
                                <li>Arduino Development</li>
                            </ul>
                        </CardSpotlight>
                        <CardSpotlight className="arsenal-card glass-card" color="rgba(255, 107, 53, 0.15)">
                            <h3>Certifications</h3>
                            <ul>
                                <li>IOT</li>
                                <li>Generative AI for All</li>
                            </ul>
                        </CardSpotlight>
                    </div>
                </section>

                <section id="extra-curricular" className="container fade-in-section">
                    <h2 className="section-title">Extra Curricular</h2>
                    <div className="project-grid">

                        <div className="project-card glass-card">
                            <div className="project-info">
                                <h3>Technical Content Creation</h3>
                                <p>Authored "The Perpetual Achiever", a comprehensive guide on personal development and systems thinking, demonstrating strong communication and analytical skills.</p>
                            </div>
                        </div>
                        <div className="project-card glass-card">
                            <div className="project-info">
                                <h3>Community Engagement</h3>
                                <p>Active participant in technical communities, engaging in knowledge sharing and collaborative learning environments to foster mutual growth.</p>
                            </div>
                        </div>
                        <div className="project-card glass-card">
                            <div className="project-info">
                                <h3>Continuous Learning</h3>
                                <p>Dedicated to self-improvement through extensive reading (e.g., "Deep Work") and exploring emerging technologies like Generative AI.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container fade-in-section mt-16 mb-16">
                    <InteractiveBentoGallery
                        mediaItems={[
                            {
                                id: 12,
                                type: "image",
                                title: "AIO REXPO QR: Secure Access 🔐",
                                desc: "Implemented Firebase Authentication for secure user logins, supporting both Google Sign-In and email/password options.",
                                url: "/images/aioqr-dashboard.png",
                                span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-1",
                            },
                            {
                                id: 1,
                                type: "image",
                                title: "Industrial Visit to Jocil Limited 🏭",
                                desc: "Recently, I had the opportunity to visit Jocil Limited near Dokiparru as part of our industrial visit. It was an insightful experience where I got to explore the power generation plants and soap manufacturing units within the industry. This visit gave me a practical understanding of industrial processes, energy utilization, and automation systems, which play a vital role in modern manufacturing. Observing how theoretical concepts are implemented in real-time operations has deepened my interest in the field of Electrical and Electronics Engineering. Grateful to my institution and the company for providing this valuable learning experience and exposure to real-world industrial environments.",
                                url: "/images/industrial-visit.jpg",
                                span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
                            },
                            {
                                id: 2,
                                type: "image",
                                title: "Extension Program in Home Appliances",
                                desc: "Led a hands-on workshop on 'Identification and Rectifications of Faults in Electrical Home Appliances' at Andhra Loyola Institute of Engineering and Technology. This extension program empowered students with practical troubleshooting skills for common household devices.",
                                url: "/images/extension-program-2.jpg",
                                span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
                            },
                            {
                                id: 3,
                                type: "image",
                                title: "Fault Identification & Rectification in Electrical Home Appliance",
                                desc: "Demonstrating practical fault detection techniques during the Home Appliances extension program. Guided participants through circuit analysis and safe repair practices using real-world equipment.",
                                url: "/images/extension-program-1.png",
                                span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2 ",
                            },
                            {
                                id: 4,
                                type: "image",
                                title: "Industrial IoT: Concept to Cloud ☁️",
                                desc: "Moved beyond theory into real-world hardware integration. Mastered Arduino, ESP8266, and created a custom ThingSpeak user dashboard for instant data monitoring.",
                                url: "https://media.licdn.com/dms/image/v2/D5622AQEhX3C7HEMffA/feedshare-shrink_800/B56ZuZMPA8KgAg-/0/1767801680856?e=2147483647&v=beta&t=bNt68FbuqoUMoTjTzIaikVR_cZuZT8guBumA6kRz-W4",
                                span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-1",
                            },
                            {
                                id: 5,
                                type: "image",
                                title: "Connected: IoT Tech Update 🌐",
                                desc: "Bridged the gap between physical hardware and the cloud. Built a login-free dashboard for public data viewing and mastered end-to-end IoT workflows.",
                                url: "https://media.licdn.com/dms/image/v2/D5622AQGipt1z3Hgp4g/feedshare-shrink_800/B56Zue85SSIMAg-/0/1767898323582?e=2147483647&v=beta&t=nMc72UkZsCOs7STny9em7VBGiw41tlpVl9uUfE8u0lo",
                                span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-1",
                            },
                            {
                                id: 6,
                                type: "image",
                                title: "Workshop Session",
                                desc: "Leading an interactive session on industrial automation principles and safety standards.",
                                url: "/images/iot-workshop-1.jpg",
                                span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-1",
                            },
                            {
                                id: 7,
                                type: "image",
                                title: "Circuit Analysis",
                                desc: "Demonstrating practical circuit analysis techniques and component identification.",
                                url: "/images/iot-workshop-2.jpg",
                                span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1",
                            },
                            {
                                id: 8,
                                type: "image",
                                title: "Hands-on Training",
                                desc: "Students engaging in practical exercises to apply theoretical concepts in real-time.",
                                url: "/images/iot-workshop-3.jpg",
                                span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1",
                            },
                            {
                                id: 9,
                                type: "image",
                                title: "IoT Fundamentals",
                                desc: "Explaining the core architecture of Industrial IoT and its applications in modern manufacturing.",
                                url: "/images/iot-workshop-4.jpg",
                                span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-1",
                            },
                            {
                                id: 10,
                                type: "image",
                                title: "Mentorship & Debugging",
                                desc: "Guiding students through code troubleshooting and hardware debugging processes.",
                                url: "/images/iot-workshop-5.jpg",
                                span: "md:col-span-2 md:row-span-1 col-span-1 sm:col-span-2 sm:row-span-1",
                            },
                        ]}
                        title="Gallery Shots Collection"
                        description="Drag and explore our curated collection of shots"
                    />
                </section>

                <section id="certifications" className="container fade-in-section mb-16">
                    <Certifications />
                </section>

                <section id="connect" className="fade-in-section">
                    <div className="container">
                        <h2 className="section-title">Connect With Me</h2>
                        <div className="connect-content">
                            <div className="w-full flex justify-center mb-8">
                                <img
                                    src="https://blush.design/api/download?shareUri=HmkSfyYk-dvRMu5E&c=Clothing_0%7Effc81a-0.2%7Eff4b33-0.3.0.0.2.0%7Eff8333&w=800&h=800&fm=png"
                                    alt="Connect illustration"
                                    className="w-full max-w-[400px] h-auto object-contain hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="connect-info">
                                <h3>Let's Build Something Amazing Together</h3>
                                <p>I'm currently available for freelance work and open to discussing new projects. Whether you
                                    have a question or just want to say hi, my inbox is always open. I'll get back to you!</p>
                                <div className="flex justify-center w-full mt-4">
                                    <SocialIcons />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2026 Narlapati Ramu. All Rights Reserved.</p>
            </footer>
        </>
    );
}
