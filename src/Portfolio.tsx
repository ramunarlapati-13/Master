import { useEffect, useRef, useState } from 'react';
import { SocialIcons } from './components/ui/social-icons';
import InteractiveBentoGallery from './components/ui/interactive-bento-gallery';
import { Certifications } from './components/ui/certifications';
import { RandomColorHoverText } from './components/ui/random-color-text';


const LottiePlayer = 'lottie-player' as any;



export default function Portfolio() {
    const [loading, setLoading] = useState(true);
    const [bootText, setBootText] = useState<string[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);

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

        let delay = 0;
        const timeouts: number[] = [];

        const isMobile = window.innerWidth < 768;

        bootMessages.forEach((msg) => {
            const baseDelay = isMobile ? 30 : 100;
            const randomFactor = isMobile ? 20 : 50;
            const msgDelay = Math.random() * baseDelay + randomFactor;
            delay += msgDelay;

            const timeout = setTimeout(() => {
                setBootText(prev => [...prev, `> ${msg}`]);
            }, delay);
            timeouts.push(timeout);
        });

        const finishTimeout = setTimeout(() => {
            setLoading(false);
        }, delay + (isMobile ? 300 : 800));
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
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
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

            <div className="floating-element" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
            <div className="floating-element" style={{ top: '40%', right: '15%', animationDelay: '2s' }}></div>
            <div className="floating-element" style={{ top: '60%', left: '20%', animationDelay: '4s' }}></div>
            <div className="floating-element" style={{ bottom: '30%', right: '25%', animationDelay: '6s' }}></div>
            <div className="floating-element" style={{ top: '80%', left: '30%', animationDelay: '1s' }}></div>
            <div className="floating-element" style={{ top: '50%', right: '35%', animationDelay: '3s' }}></div>

            <header id="header">
                <h1>Narlapati <span>Ramu</span></h1>
                <nav id="nav-links" className={menuOpen ? 'active' : ''}>
                    <a href="#home" className="active" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
                    <a href="https://ramu-blog.vercel.app/" onClick={() => setMenuOpen(false)}>Blogs</a>
                    <a href="#timeline" onClick={() => setMenuOpen(false)}>Timeline</a>
                    <a href="#arsenal" onClick={() => setMenuOpen(false)}>Arsenal</a>
                    <a href="#extra-curricular" onClick={() => setMenuOpen(false)}>Activities</a>
                    <a href="#connect" onClick={() => setMenuOpen(false)}>Connect</a>
                </nav>
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
            </header>

            <main>
                <section id="home">
                    <div className="w-full h-screen flex flex-col items-center justify-center text-center px-4">
                        <div className="mb-6 w-full max-w-4xl">
                            <RandomColorHoverText text="RAMUNARLAPATI" />
                        </div>
                        <h2 className="text-xl md:text-3xl text-[var(--text-secondary)] font-medium tracking-widest uppercase">
                            Electrical and Electronics Engineer
                        </h2>
                    </div>
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
                            <h3>Dedicated to Innovation & Problem-Solving</h3>
                            <p>I am a passionate Electrical and Electronics Engineer focused on leveraging technology to create
                                practical solutions for real-world challenges. My journey is driven by a curiosity for
                                automation, smart technologies, and the Internet of Things (IoT).</p>
                            <h3>Interests</h3>
                            <p>Outside of engineering, I enjoy exploring the world of AI, staying updated with the latest tech
                                trends, and occasionally diving into a good book like "Deep Work" to improve focus and
                                productivity.</p>
                            <div className="tech-stats">
                                <div className="stat-box">
                                    <div className="number">4+</div>
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
                    <div className="project-grid">



                        <div className="project-card glass-card" style={{ transitionDelay: '300ms' }}>
                            <div className="card-image-wrapper">
                                <img src="https://placehold.co/600x400/0A0E27/00FF88?text=Neon+Duel&font=montserrat"
                                    alt="Neon Duel Project" />
                                <div className="scanline"></div>
                            </div>
                            <div className="project-info">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ marginBottom: 0 }}>Neon Duel</h3>
                                    <a href="https://neon-fire.vercel.app/" target="_blank" className="view-btn" style={{ textDecoration: 'none' }}>View Project</a>
                                </div>
                                <p>A high-energy multiplayer arena game featuring intense neon aesthetics and real-time combat gameplay.</p>
                            </div>
                        </div>

                        <div className="project-card glass-card" style={{ transitionDelay: '450ms' }}>
                            <div className="card-image-wrapper">
                                <img src="https://placehold.co/600x400/1A1F3A/00D9FF?text=Perpetual+Achiever&font=montserrat"
                                    alt="The Perpetual Achiever Project" />
                                <div className="scanline"></div>
                            </div>
                            <div className="project-info">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ marginBottom: 0 }}>The Perpetual Achiever</h3>
                                    <a href="https://perpectual-archiver.vercel.app/" target="_blank" className="view-btn" style={{ textDecoration: 'none' }}>View Project</a>
                                </div>
                                <p>A comprehensive digital manuscript and personal development platform exploring goal setting, systems thinking, and sustainable success strategies.</p>
                            </div>
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
                        <div className="arsenal-card glass-card">
                            <h3>Core Skills</h3>
                            <ul>
                                <li>Generative AI</li>
                                <li>Automation & Control</li>
                                <li>Internet of Things (IoT)</li>
                                <li>Embedded Systems</li>
                                <li>Problem Solving</li>
                            </ul>
                        </div>
                        <div className="arsenal-card glass-card">
                            <h3>Technology Stack</h3>
                            <ul>
                                <li>Arduino Development</li>
                                <li>C / C++</li>
                                <li>Python</li>
                                <li>HTML, CSS, JavaScript</li>
                                <li>Next.js</li>
                            </ul>
                        </div>
                        <div className="arsenal-card glass-card">
                            <h3>Certifications</h3>
                            <ul>
                                <li>IOT</li>
                                <li>Generative AI for All</li>
                            </ul>
                        </div>
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
                            <div className="connect-info">
                                <h3>Let's Build Something Amazing Together</h3>
                                <p>I'm currently available for freelance work and open to discussing new projects. Whether you
                                    have a question or just want to say hi, my inbox is always open. I'll get back to you!</p>
                                <div className="flex justify-center w-full mt-4">
                                    <SocialIcons />
                                </div>
                            </div>
                            <div className="connect-lottie">
                                <LottiePlayer src="https://assets1.lottiefiles.com/packages/lf20_dhcsd5b5.json"
                                    background="transparent" speed="1" style={{ width: '100%', maxWidth: '400px' }} loop
                                    autoplay></LottiePlayer>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2025 Narlapati Ramu. All Rights Reserved.</p>
            </footer>
        </>
    );
}
