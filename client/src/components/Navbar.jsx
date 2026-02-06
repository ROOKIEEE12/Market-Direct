import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, Search, Heart, Sprout, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const dashboardPath = user?.role === 'farmer' ? '/farmer-dashboard' : '/consumer-dashboard';

    // Check if we are on the home page
    const isHome = location.pathname === '/';

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || !isHome
                    ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
                    : 'bg-transparent py-4'
                }`}
        >
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500`}>
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className={`p-2 rounded-full transition-colors ${scrolled || !isHome ? 'bg-farm-green-100' : 'bg-white/20 backdrop-blur-sm'}`}>
                                <Sprout className={`h-6 w-6 ${scrolled || !isHome ? 'text-farm-green-600' : 'text-white'}`} />
                            </div>
                            <span className={`text-2xl font-serif font-bold tracking-tight ${scrolled || !isHome ? 'text-farm-green-900' : 'text-white'}`}>
                                MarketDirect
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {['Home', 'Marketplace', 'About', 'Farmers'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`font-medium transition-colors hover:text-farm-green-400 ${scrolled || !isHome ? 'text-rich-soil-700' : 'text-white/90'
                                    }`}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className={`hidden lg:flex flex-1 max-w-xs mx-8 relative transition-all duration-500 ${scrolled ? 'opacity-100' : isHome ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <input
                            type="text"
                            placeholder="Search fresh products..."
                            className="w-full bg-sand-100 border-none rounded-full py-2 pl-4 pr-10 focus:ring-2 focus:ring-farm-green-500 focus:bg-white transition-all shadow-inner"
                        />
                        <button className="absolute right-3 top-2.5 text-rich-soil-400 hover:text-farm-green-600">
                            <Search size={18} />
                        </button>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        <button className={`lg:hidden hover:text-farm-green-400 ${scrolled || !isHome ? 'text-rich-soil-700' : 'text-white'}`} onClick={() => setIsSearchOpen(!isSearchOpen)}>
                            <Search size={24} />
                        </button>

                        <Link to="/cart" className={`relative hover:text-farm-green-400 transition-colors ${scrolled || !isHome ? 'text-rich-soil-700' : 'text-white'}`}>
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white animate-bounce-subtle">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="hidden md:flex items-center gap-4">
                                <Link to={dashboardPath} className={`flex items-center gap-2 font-bold transition-all ${scrolled || !isHome ? 'text-farm-green-700 hover:text-farm-green-800' : 'text-white hover:text-farm-green-200'}`}>
                                    <LayoutDashboard size={20} />
                                    <span>Dashboard</span>
                                </Link>
                                <button onClick={handleLogout} className={`transition-all ${scrolled || !isHome ? 'text-rich-soil-600 hover:text-red-600' : 'text-white/80 hover:text-red-300'}`}>
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full transition-all shadow-md hover:shadow-lg ${scrolled || !isHome
                                    ? 'bg-farm-green-600 text-white hover:bg-farm-green-700'
                                    : 'bg-white text-farm-green-800 hover:bg-farm-green-50'
                                }`}>
                                <User size={18} />
                                <span className="font-medium">Login</span>
                            </Link>
                        )}

                        <button className={`md:hidden ${scrolled || !isHome ? 'text-rich-soil-700' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-sand-200 absolute w-full shadow-lg animate-slide-in">
                    <div className="px-4 py-6 space-y-4">
                        {['Home', 'Marketplace', 'About', 'Farmers'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="block text-lg font-medium text-rich-soil-800"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-sand-200 flex flex-col gap-4">
                            {user ? (
                                <>
                                    <Link to={dashboardPath} className="flex items-center gap-3 text-farm-green-700 font-bold" onClick={() => setIsMenuOpen(false)}>
                                        <LayoutDashboard size={20} /> Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 font-bold">
                                        <LogOut size={20} /> Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="flex items-center gap-3 text-rich-soil-700 w-full justify-center bg-farm-green-100 py-3 rounded-xl font-bold" onClick={() => setIsMenuOpen(false)}>
                                    <User size={20} /> Login / Register
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
