import React from 'react';
import { LayoutDashboard, ShoppingBag, Heart, MapPin, Clock, Star, Settings, LogOut, Search, Filter } from 'lucide-react';

import { useNavigate, Link } from 'react-router-dom';

const ConsumerDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Customer' };
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const stats = [
        { label: 'Total Orders', value: '8', icon: <ShoppingBag className="text-blue-600" /> },
        { label: 'Favorite Farmers', value: '3', icon: <Heart className="text-red-600" /> },
        { label: 'Rewards Points', value: '450', icon: <Star className="text-yellow-600" /> },
    ];

    const recentPurchases = [
        { id: '#PUR-102', farmer: 'Ramesh Patil', items: 'Organic Carrots, Spinach', date: 'Oct 12, 2023', amount: '₹550', status: 'Delivered' },
        { id: '#PUR-101', farmer: 'Suresh Kumar', items: 'Fresh Tomatoes', date: 'Oct 05, 2023', amount: '₹200', status: 'Delivered' },
    ];

    return (
        <div className="min-h-screen bg-sand-50 flex items-start">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-sand-200 hidden md:flex flex-col sticky top-20 h-[calc(100vh-80px)] z-40 shadow-sm">
                <nav className="flex-grow p-4 space-y-2 mt-4">
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <SidebarItem icon={<ShoppingBag size={20} />} label="My Orders" />
                    <SidebarItem icon={<Heart size={20} />} label="Favorites" />
                    <SidebarItem icon={<MapPin size={20} />} label="Addresses" />
                    <SidebarItem icon={<Settings size={20} />} label="Profile Settings" />
                </nav>
                <div className="p-4 border-t border-sand-100 flex flex-col gap-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-rich-soil-600 hover:text-red-600 transition-all w-full px-4 py-3 rounded-xl hover:bg-red-50"
                    >
                        <LogOut size={20} />
                        <span className="font-bold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 md:p-8 lg:p-12 mt-20 transition-all duration-300">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-rich-soil-900">Hello, {user.name}!</h1>
                        <p className="text-gray-500 mt-1">Fresh from the farm, straight to your home.</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-farm-green-500 w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                            <Filter size={20} className="text-gray-600" />
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl">{stat.icon}</div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                                <p className="text-2xl font-bold text-rich-soil-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Purchases */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-rich-soil-900">Recent Purchases</h2>
                            <button className="text-farm-green-600 font-semibold text-sm hover:underline">View All</button>
                        </div>
                        <div className="p-6 space-y-6">
                            {recentPurchases.map((purchase, i) => (
                                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-gray-50 transition-colors gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                            <ShoppingBag className="text-farm-green-600" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-rich-soil-900">{purchase.farmer}</h4>
                                            <p className="text-sm text-gray-500">{purchase.items}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-8">
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{purchase.amount}</p>
                                            <p className="text-xs text-gray-500">{purchase.date}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                            {purchase.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommended Farmers */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-xl font-bold text-rich-soil-900 mb-6">Recommended Farmers</h2>
                        <div className="space-y-6">
                            <RecommendedFarmer
                                name="Savitri Devi"
                                specialty="Organic Fruits"
                                rating="4.9"
                                image="https://picsum.photos/seed/farmer2/100/100"
                            />
                            <RecommendedFarmer
                                name="Gopal Singh"
                                specialty="Dairy Products"
                                rating="4.8"
                                image="https://picsum.photos/seed/farmer3/100/100"
                            />
                            <Link to="/marketplace" className="block w-full text-center py-3 bg-farm-green-600 text-white rounded-xl font-bold hover:bg-farm-green-700 transition-all mt-4 shadow-lg shadow-farm-green-100">
                                Explore Marketplace
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active = false }) => (
    <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-farm-green-600 text-white shadow-lg shadow-farm-green-200' : 'text-gray-500 hover:bg-gray-50 hover:text-rich-soil-900'
        }`}>
        {icon}
        <span className="font-bold">{label}</span>
    </button>
);

const RecommendedFarmer = ({ name, specialty, rating, image }) => (
    <div className="flex items-center gap-4 group cursor-pointer">
        <img src={image} alt={name} className="w-12 h-12 rounded-xl object-cover group-hover:scale-110 transition-transform" />
        <div className="flex-grow">
            <h4 className="font-bold text-rich-soil-900 text-sm">{name}</h4>
            <p className="text-xs text-gray-500">{specialty}</p>
        </div>
        <div className="flex items-center gap-1 text-yellow-600">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">{rating}</span>
        </div>
    </div>
);

export default ConsumerDashboard;
