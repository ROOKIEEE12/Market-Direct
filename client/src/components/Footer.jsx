import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight, CreditCard } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-farm-green-900 text-white pt-20 pb-10 border-t border-farm-green-800 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-white">
                            <span>🌱</span> MarketDirect
                        </Link>
                        <p className="text-farm-green-200 leading-relaxed">
                            Empowering local farmers and bringing fresh, organic produce directly to your table. No middlemen, just fair trade and good food.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Facebook size={20} />} />
                            <SocialIcon icon={<Twitter size={20} />} />
                            <SocialIcon icon={<Instagram size={20} />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/" text="Home" />
                            <FooterLink to="/marketplace" text="Marketplace" />
                            <FooterLink to="/about" text="Our Story" />
                            <FooterLink to="/register" text="Join as Farmer" />
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-4 text-farm-green-200">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-farm-green-400 mt-1" size={20} />
                                <span>123 Green Valley Road,<br />Nashik, Maharashtra 422001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-farm-green-400" size={20} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-farm-green-400" size={20} />
                                <span>hello@marketdirect.in</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Stay Updated</h3>
                        <p className="text-farm-green-200 mb-4">Subscribe to our newsletter for seasonal updates and exclusive offers.</p>
                        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 rounded-lg bg-farm-green-800 border border-farm-green-700 text-white placeholder-farm-green-400 focus:outline-none focus:ring-2 focus:ring-farm-green-500 transition-all"
                                />
                                <button type="submit" className="absolute right-2 top-2 bg-farm-green-600 p-1.5 rounded-md hover:bg-farm-green-500 transition-colors">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="border-t border-farm-green-800 pt-8 flex flex-col md:flex-row justify-between items-center text-farm-green-400 text-sm">
                    <p>&copy; 2024 MarketDirect. Rooted in Trust.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <div className="flex gap-2 text-farm-green-500">
                            <CreditCard size={20} />
                            <span className="text-xs border border-farm-green-700 px-1 rounded">VISA</span>
                            <span className="text-xs border border-farm-green-700 px-1 rounded">UPI</span>
                        </div>
                        <div className="h-4 w-px bg-farm-green-700"></div>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="#" className="w-10 h-10 rounded-full bg-farm-green-800 flex items-center justify-center text-farm-green-300 hover:bg-farm-green-600 hover:text-white transition-all transform hover:-translate-y-1">
        {icon}
    </a>
);

const FooterLink = ({ to, text }) => (
    <li>
        <Link to={to} className="text-farm-green-200 hover:text-white transition-colors flex items-center gap-2 group">
            <span className="w-0 group-hover:w-2 h-0.5 bg-farm-green-400 transition-all duration-300 inline-block"></span>
            {text}
        </Link>
    </li>
);

export default Footer;
