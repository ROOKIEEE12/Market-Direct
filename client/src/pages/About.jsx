import React, { useRef, useState, useEffect } from 'react';
import { Target, Heart, Users, CheckCircle, Sprout, Sun, Droplets, Leaf, Loader2 } from 'lucide-react';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const container = useRef();
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/farmers');
                setFarmers(res.data);
            } catch (err) {
                console.error("Error fetching farmers", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFarmers();
    }, []);

    useGSAP(() => {
        // Hero Parallax
        gsap.to(".about-hero-bg", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".about-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Text Reveal
        gsap.from(".hero-title span", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out"
        });

        // Timeline Animation - Optimized
        gsap.utils.toArray('.timeline-item-content').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out"
            });
        });

        // Floating decorative icons
        gsap.to(".floating-icon", {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            rotation: "random(-15, 15)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Progress Line - Smoother trace
        gsap.from(".timeline-progress-fill", {
            scaleY: 0,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-section",
                start: "top 60%",
                end: "bottom 80%",
                scrub: 0.5
            }
        });

    }, { scope: container });

    return (
        <div ref={container} className="bg-sand-50 min-h-screen overflow-x-hidden">
            {/* Cinematic Hero */}
            <div className="about-hero relative h-[80vh] overflow-hidden flex items-center justify-center">
                <div className="about-hero-bg absolute inset-0 bg-gradient-to-br from-farm-green-900 via-rich-soil-800 to-farm-green-950">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
                <div className="relative z-10 text-center px-4 max-w-5xl">
                    <h1 className="hero-title text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-none flex flex-wrap justify-center gap-x-4">
                        <span className="inline-block">Cultivating</span>
                        <span className="inline-block text-farm-green-400 italic">Change</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-farm-green-100 max-w-3xl mx-auto font-light leading-relaxed">
                        We are not just a marketplace. We are a movement back to the soil, back to community, and back to real food.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-farm-green-600 p-4 rounded-full shadow-xl">
                    <Sprout size={48} className="text-white" />
                </div>
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-sm font-bold tracking-widest text-farm-green-600 uppercase">Our Mission</h2>
                    <p className="text-3xl md:text-5xl font-serif font-bold text-rich-soil-900 leading-tight">
                        "To build a food system that honors the <span className="text-farm-green-700 underline decoration-farm-green-300/50">farmer</span> as much as the <span className="text-farm-green-700 underline decoration-farm-green-300/50">consumer</span>."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                        <StatItem number="0%" label="Middlemen" />
                        <StatItem number="100%" label="Transparent" />
                        <StatItem number="24h" label="Harvest to Home" />
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="timeline-section py-32 bg-rich-soil-900 text-white relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                <div className="absolute top-20 left-10 opacity-20 floating-icon hidden lg:block">
                    <Sprout size={120} className="text-farm-green-500" />
                </div>
                <div className="absolute bottom-20 right-10 opacity-20 floating-icon hidden lg:block">
                    <Sun size={100} className="text-farm-green-400" />
                </div>
                <div className="absolute top-1/2 left-20 opacity-10 floating-icon hidden lg:block">
                    <Droplets size={80} className="text-farm-green-300" />
                </div>

                <div className="max-w-5xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-sm font-bold tracking-[0.3em] text-farm-green-500 uppercase mb-4">Our History</h2>
                        <h3 className="text-5xl md:text-6xl font-serif font-bold text-white">Our Journey</h3>
                    </div>

                    <div className="relative">
                        {/* Center Line System */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2 rounded-full overflow-hidden">
                            <div className="timeline-progress-fill absolute top-0 left-0 w-full h-full bg-gradient-to-b from-farm-green-400 to-farm-green-600 origin-top"></div>
                        </div>

                        <div className="space-y-32">
                            <TimelineItem
                                year="2021"
                                icon={<Sprout className="text-farm-green-400" />}
                                title="The Seed is Planted"
                                content="During the lockdown, we witnessed farmers dumping produce while cities faced shortages. A small WhatsApp group was formed to connect them directly with citizens."
                                align="left"
                            />
                            <TimelineItem
                                year="2022"
                                icon={<Target className="text-farm-green-400" />}
                                title="First Harvest"
                                content="We launched with just 5 farmers and 50 families in Nashik. Every delivery was made personally by our founders to ensure quality and trust."
                                align="right"
                            />
                            <TimelineItem
                                year="2023"
                                icon={<Users className="text-farm-green-400" />}
                                title="Growing Roots"
                                content="Expanded to Pune and Mumbai. Built our first tech platform to handle logistics and payments seamlessly, empowering more rural communities."
                                align="left"
                            />
                            <TimelineItem
                                year="2024"
                                icon={<Leaf className="text-farm-green-400" />}
                                title="Full Bloom"
                                content="Now a community of 500+ farmers. We introduced 'Trace Your Food', setting a new national standard for transparency and food safety."
                                align="right"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Grid */}
            <div className="py-24 bg-sand-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-rich-soil-900">What Drives Us</h2>
                        <p className="text-rich-soil-600 mt-4">The core principles that guide every decision we make.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ValueCard
                            icon={<Target className="text-farm-green-600" />}
                            title="Direct Impact"
                            description="80-90% of what you pay goes directly to the farmer. No excuses."
                        />
                        <ValueCard
                            icon={<Heart className="text-red-500" />}
                            title="Health First"
                            description="Nutrient-dense food harvested at peak ripeness, never gassed or stored."
                        />
                        <ValueCard
                            icon={<Users className="text-blue-500" />}
                            title="Community"
                            description="Reconnecting urban families with their rural roots through food."
                        />
                        <ValueCard
                            icon={<Leaf className="text-green-500" />}
                            title="Earth Friendly"
                            description="Regenerative farming practices that heal the soil, not harm it."
                        />
                    </div>
                </div>
            </div>

            {/* Team/Growers Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-serif font-bold text-rich-soil-900 mb-4">The Hands That Feed You</h2>
                            <p className="text-lg text-rich-soil-600">
                                Meet the real heroes. These are the people waking up at 4 AM to ensure your plate is full of goodness.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 min-h-[400px]">
                        {loading ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-farm-green-600">
                                <Loader2 className="animate-spin mb-4" size={48} />
                                <p className="font-medium">Finding the best farmers for you...</p>
                            </div>
                        ) : farmers.length > 0 ? (
                            farmers.map((farmer) => (
                                <TeamCard
                                    key={farmer.id}
                                    image={farmer.image}
                                    name={farmer.user.name}
                                    role={farmer.specialty}
                                    desc={farmer.bio}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-sand-100 rounded-3xl">
                                <p className="text-rich-soil-500">No farmer profiles found. Run seed.js to populate data!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub Components ---

const StatItem = ({ number, label }) => (
    <div className="p-6 border-r last:border-0 border-gray-200">
        <div className="text-4xl font-bold text-farm-green-600 mb-2">{number}</div>
        <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">{label}</div>
    </div>
);

const TimelineItem = ({ year, title, content, align, icon }) => (
    <div className={`timeline-item relative flex flex-col md:flex-row gap-8 items-center ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
        {/* Content Side */}
        <div className={`w-full md:w-1/2 timeline-item-content group px-12 ${align === 'left' ? 'md:text-right' : 'md:text-left'}`}>
            <div className={`inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:bg-farm-green-500/20 transition-colors duration-500`}>
                {React.cloneElement(icon, { size: 28 })}
            </div>
            <div className="text-8xl font-black text-white/[0.7] mb-2 leading-none tracking-tighter select-none">
                {year}
            </div>
            <h3 className="text-3xl font-bold text-farm-green-400 mb-4 group-hover:translate-x-2 md:group-hover:-translate-x-2 transition-transform duration-500 h-8 flex items-center gap-4">
                {align === 'right' ? <span className="hidden md:block w-8 h-[2px] bg-farm-green-500/50"></span> : null}
                {title}
                {align === 'left' ? <span className="hidden md:block w-8 h-[2px] bg-farm-green-500/50"></span> : null}
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg max-w-md ml-auto mr-auto md:ml-0 md:mr-0">
                {content}
            </p>
        </div>

        {/* Center Indicator */}
        <div className="relative z-10 flex-shrink-0 group">
            <div className="w-16 h-16 rounded-full bg-rich-soil-900 border-2 border-farm-green-500/30 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-farm-green-400 group-hover:shadow-[0_0_25px_rgba(74,222,128,0.2)]">
                <div className="w-3 h-3 rounded-full bg-farm-green-500 group-hover:scale-150 transition-transform duration-500"></div>
            </div>
        </div>

        {/* Spacer for desktop */}
        <div className="hidden md:block md:w-1/2"></div>
    </div>
);

const ValueCard = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-2xl shadow-card hover:shadow-xl transition-all hover:-translate-y-1 group border border-transparent hover:border-farm-green-100">
        <div className="mb-6 p-4 bg-sand-50 rounded-full w-fit group-hover:bg-farm-green-50 transition-colors">
            {React.cloneElement(icon, { size: 32 })}
        </div>
        <h3 className="text-xl font-bold text-rich-soil-900 mb-3">{title}</h3>
        <p className="text-rich-soil-500 leading-relaxed">{description}</p>
    </div>
);

const TeamCard = ({ image, name, role, desc }) => (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
        <img src={image} alt={name} className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform">
            <div className="text-farm-green-400 font-bold tracking-wider text-sm mb-1">{role}</div>
            <h3 className="text-2xl font-bold text-white mb-4">{name}</h3>
            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    </div>
);

export default About;
