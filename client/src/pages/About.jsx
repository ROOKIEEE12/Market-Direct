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

        // Timeline Animation
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                },
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Progress Line
        gsap.from(".timeline-line", {
            scaleY: 0,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-section",
                start: "top 70%",
                end: "bottom 80%",
                scrub: 1
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
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                <div className="max-w-5xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-serif font-bold text-center mb-24 text-farm-green-400">Our Journey</h2>

                    <div className="relative">
                        {/* Center Line */}
                        <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-farm-green-500/30 md:-translate-x-1/2 rounded-full h-full">
                            <div className="absolute top-0 left-0 w-full h-full bg-farm-green-500 origin-top scale-y-100"></div>
                        </div>

                        <div className="space-y-24">
                            <TimelineItem
                                year="2021"
                                title="The Seed is Planted"
                                content="During the lockdown, we witnessed farmers dumping produce while cities faced shortages. A small WhatsApp group was formed to connect them."
                                align="left"
                            />
                            <TimelineItem
                                year="2022"
                                title="First Harvest"
                                content="We launched with just 5 farmers and 50 families in Nashik. Every delivery was made personally by our founders."
                                align="right"
                            />
                            <TimelineItem
                                year="2023"
                                title="Growing Roots"
                                content="Expanded to Pune and Mumbai. Built our first tech platform to handle logistics and payments seamlessly."
                                align="left"
                            />
                            <TimelineItem
                                year="2024"
                                title="Full Bloom"
                                content="Now a community of 500+ farmers. We introduced 'Trace Your Food', setting a new standard for transparency in India."
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
                                    key={farmer._id}
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

const TimelineItem = ({ year, title, content, align }) => (
    <div className={`timeline-item flex flex-col md:flex-row gap-8 items-center ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <div className="w-full md:w-1/2 text-center md:text-right p-4">
            {align === 'left' ? (
                <>
                    <div className="text-6xl font-bold text-farm-green-400/40 mb-2">{year}</div>
                    <h3 className="text-2xl font-bold text-farm-green-400 mb-4">{title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">{content}</p>
                </>
            ) : (
                <div className="hidden md:block"></div> /* Spacer for desktop */
            )}
            {/* Mobile Only Content for Right Align when collapsed */}
            <div className="md:hidden">
                <div className="text-6xl font-bold text-farm-green-400/40 mb-2">{year}</div>
                <h3 className="text-2xl font-bold text-farm-green-400 mb-4">{title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{content}</p>
            </div>
        </div>

        <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-farm-green-500 border-4 border-rich-soil-900 shadow-[0_0_0_8px_rgba(34,197,94,0.2)]"></div>

        <div className="w-full md:w-1/2 p-4 text-center md:text-left hidden md:block">
            {align === 'right' && (
                <>
                    <div className="text-6xl font-bold text-farm-green-400/40 mb-2">{year}</div>
                    <h3 className="text-2xl font-bold text-farm-green-400 mb-4">{title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">{content}</p>
                </>
            )}
        </div>
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
