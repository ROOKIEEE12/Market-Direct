import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, LogOut, Search, Sprout } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [bagAnimate, setBagAnimate] = useState(false);
    const { cartCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (cartCount === 0) return;
        setBagAnimate(true);
        const timer = setTimeout(() => setBagAnimate(false), 400);
        return () => clearTimeout(timer);
    }, [cartCount]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        addToast('Logged out successfully', 'success');
        navigate('/');
    };

    const isHomePage = location.pathname === '/';
    const navStyle = (isScrolled || !isHomePage)
        ? 'py-4 bg-white/80 backdrop-blur-xl shadow-lg'
        : 'py-6 bg-transparent';
    const textColor = (isScrolled || !isHomePage) ? 'text-rich-soil-900' : 'text-white';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navStyle}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-farm-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-farm-green-200 group-hover:rotate-12 transition-transform">
                            <Sprout size={24} />
                        </div>
                        <span className={`text-2xl font-serif font-bold tracking-tight ${textColor}`}>
                            Market<span className="text-farm-green-600">Direct</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className={`hidden md:flex items-center rounded-full px-2 py-1 border ${isHomePage && !isScrolled ? 'bg-white/10 backdrop-blur-md border-white/20' : 'bg-sand-100/50 border-sand-200'}`}>
                        <Link to="/" className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${location.pathname === '/' ? 'bg-farm-green-600 text-white' : (isScrolled || !isHomePage ? 'text-rich-soil-600 hover:text-farm-green-600' : 'text-white/80 hover:text-white')}`}>Home</Link>
                        <Link to="/marketplace" className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${location.pathname === '/marketplace' ? 'bg-farm-green-600 text-white' : (isScrolled || !isHomePage ? 'text-rich-soil-600 hover:text-farm-green-600' : 'text-white/80 hover:text-white')}`}>Marketplace</Link>
                        <Link to="/about" className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${location.pathname === '/about' ? 'bg-farm-green-600 text-white' : (isScrolled || !isHomePage ? 'text-rich-soil-600 hover:text-farm-green-600' : 'text-white/80 hover:text-white')}`}>Our Story</Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link to="/cart" className={`relative p-2 rounded-full hover:bg-black/5 transition-all duration-300 group ${bagAnimate ? 'animate-cart-pop' : ''}`}>
                            <ShoppingBag className={textColor} size={24} />
                            {cartCount > 0 && (
                                <span className={`absolute -top-1 -right-1 bg-farm-green-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white ${bagAnimate ? 'scale-125' : 'scale-100'} transition-transform duration-300`}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <Link to={user.role === 'farmer' ? '/farmer-dashboard' : '/consumer-dashboard'} className="flex items-center gap-2 pl-2 pr-4 py-2 bg-white rounded-full border border-sand-200 hover:shadow-md transition-all">
                                    <div className="w-8 h-8 rounded-full bg-sand-100 flex items-center justify-center">
                                        <User size={18} className="text-farm-green-600" />
                                    </div>
                                    <span className="text-sm font-bold text-rich-soil-900 hidden lg:block">{user.name.split(' ')[0]}</span>
                                </Link>
                                <button onClick={handleLogout} className="p-2 text-rich-soil-400 hover:text-red-500 transition-colors">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${isScrolled ? 'bg-farm-green-600 text-white hover:bg-farm-green-700 shadow-lg shadow-farm-green-100' : 'bg-white text-farm-green-900 hover:bg-farm-green-50'}`}>
                                Sign In
                            </Link>
                        )}

                        {/* Mobile Toggle */}
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
                            {isMobileMenuOpen ? <X className={textColor} /> : <Menu className={textColor} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white pt-24 px-4 slide-in-bottom">
                    <div className="space-y-4">
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="block text-2xl font-serif font-bold text-rich-soil-900 border-b border-sand-100 pb-4">Home</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/marketplace" className="block text-2xl font-serif font-bold text-rich-soil-900 border-b border-sand-100 pb-4">Marketplace</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className="block text-2xl font-serif font-bold text-rich-soil-900 border-b border-sand-100 pb-4">Our Story</Link>
                        {!isAuthenticated && (
                            <Link onClick={() => setIsMobileMenuOpen(false)} to="/login" className="block w-full text-center bg-farm-green-600 text-white py-4 rounded-2xl font-bold text-xl">Sign In</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
