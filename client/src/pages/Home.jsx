import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight, Leaf, ShieldCheck, Truck, Star, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const container = useRef();
    const heroRef = useRef();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Hero Animations
            const tl = gsap.timeline();

            tl.from(".hero-text > *", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out"
            })
                .from(".hero-image", {
                    scale: 1.1,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power3.out"
                }, "-=1")
                .from(".hero-search", {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, "-=0.5");

            // Scroll Parallax for Hero
            gsap.to(".hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Feature Cards Reveal
            gsap.from(".feature-card", {
                scrollTrigger: {
                    trigger: ".features-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Category Circles
            gsap.from(".category-item", {
                scrollTrigger: {
                    trigger: ".categories-section",
                    start: "top 80%",
                },
                scale: 0.5,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)"
            });

        }, container);

        return () => ctx.revert();
    }, []);

    const handleQuickSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/marketplace?search=${e.target.value}`);
        }
    };

    return (
        <div ref={container} className="flex flex-col min-h-screen w-full overflow-x-hidden bg-sand-50">

            {/* HER0 SECTION */}
            <section ref={heroRef} className="hero-section relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="hero-bg absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670&auto=format&fit=crop"
                        alt="Fresh Vegetables Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-sand-50"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center text-white pt-20">
                    <div className="hero-text space-y-6 max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-semibold tracking-wider uppercase animate-pulse-slow">
                            <Leaf size={16} className="text-farm-green-400" />
                            <span>100% Organic & Locally Sourced</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight drop-shadow-xl">
                            Taste the <span className="text-farm-green-400 italic">Real</span> difference.
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                            Direct from the soil to your soul. Connect with local farmers and enjoy the freshest harvest delivered to your door.
                        </p>
                    </div>

                    {/* Quick Search Bar */}
                    <div className="hero-search mt-10 max-w-2xl mx-auto relative group">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-500"></div>
                        <div className="relative flex items-center bg-white rounded-full shadow-2xl p-2 transform group-hover:scale-105 transition-transform duration-300">
                            <div className="pl-6 text-gray-400">
                                <Search size={24} />
                            </div>
                            <input
                                type="text"
                                placeholder="What are you craving? (e.g. strawberries, spinach...)"
                                className="flex-grow bg-transparent border-none focus:ring-0 text-gray-800 text-lg placeholder-gray-400 h-14"
                                onKeyDown={handleQuickSearch}
                            />
                            <button onClick={() => navigate('/marketplace')} className="bg-farm-green-600 text-white h-12 px-8 rounded-full font-bold hover:bg-farm-green-700 transition-colors flex items-center gap-2">
                                Shop <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="features-section py-20 bg-sand-50 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Leaf, title: "100% Organic", desc: "Certified chemical-free produce directly from verified farmers." },
                            { icon: Truck, title: "Next Day Delivery", desc: "Harvested in the morning, delivered to your doorstep by evening." },
                            { icon: ShieldCheck, title: "Fair Trade", desc: "Farmers set their own prices. We take 0% commission from them." },
                        ].map((feature, idx) => (
                            <div key={idx} className="feature-card bg-white p-8 rounded-[2rem] shadow-xl shadow-sand-200/50 border border-sand-100 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-16 h-16 bg-farm-green-100 rounded-2xl flex items-center justify-center text-farm-green-600 mb-6">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-rich-soil-900 mb-3">{feature.title}</h3>
                                <p className="text-rich-soil-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CATEGORIES SECTION */}
            <section className="categories-section py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-farm-green-600 font-bold tracking-wider uppercase">Shop by Category</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-rich-soil-900 mt-2">What's in Season?</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {[
                            { name: "Vegetables", img: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=300" },
                            { name: "Fruits", img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=300" },
                            { name: "Dairy", img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=300" },
                            { name: "Honey", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=300" },
                            { name: "Grains", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=300" },
                        ].map((cat) => (
                            <Link to={`/marketplace?category=${cat.name}`} key={cat.name} className="category-item group flex flex-col items-center gap-4">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 relative">
                                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                </div>
                                <span className="font-serif font-bold text-xl text-rich-soil-800 group-hover:text-farm-green-700 transition-colors">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-[3rem] overflow-hidden bg-farm-green-900 text-white">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
                            <div className="p-12 md:p-20 flex flex-col justify-center">
                                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Become a Partner Farmer</h2>
                                <p className="text-lg text-farm-green-100 mb-8 leading-relaxed">
                                    Join thousands of farmers who are getting a fair price for their hard work. No middlemen, no commission, just direct connection with consumers.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/register?role=farmer" className="bg-white text-farm-green-900 px-8 py-4 rounded-full font-bold hover:bg-farm-green-50 transition-colors shadow-lg">
                                        Join as Farmer
                                    </Link>
                                    <Link to="/about" className="px-8 py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <div className="relative h-64 lg:h-auto overflow-hidden">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1661429307492-6d0331c1696a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Happy Farmer"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
