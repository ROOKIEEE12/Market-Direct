import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, Settings, LogOut, Plus, MapPin, Calendar, Loader2, Sprout, Tractor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';

const FarmerDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch Profile on Mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/farmers/me');
                setProfile(res.data);
            } catch (err) {
                if (err.response?.status === 404) {
                    addToast('Please complete your profile first', 'info');
                    navigate('/farmer-onboarding');
                } else {
                    console.error('Error fetching profile:', err);
                }
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user, navigate, addToast]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAddProduct = () => {
        addToast('Product management coming soon!', 'info');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-farm-green-600" size={48} />
            </div>
        );
    }

    // Mock stats for now, but profile is real
    const stats = [
        { label: 'Total Sales', value: '₹0', icon: <TrendingUp className="text-green-600" />, change: '0%' }, // To be connected to Orders API
        { label: 'Active Products', value: '0', icon: <Package className="text-blue-600" />, change: '0' },   // To be connected to Products API
        { label: 'Pending Orders', value: '0', icon: <ShoppingCart className="text-orange-600" />, change: '0' },
        { label: 'Customers', value: '0', icon: <Users className="text-purple-600" />, change: '0' },
    ];

    const recentOrders = []; // To be connected

    return (
        <div className="min-h-screen bg-sand-50 flex items-start">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-sand-200 hidden md:flex flex-col sticky top-20 h-[calc(100vh-80px)] z-40 transition-all duration-300 shadow-sm">
                <nav className="flex-grow p-4 space-y-2 mt-4 overflow-x-hidden">
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <SidebarItem icon={<Package size={20} />} label="My Products" />
                    <SidebarItem icon={<ShoppingCart size={20} />} label="Orders" />
                    <SidebarItem icon={<Users size={20} />} label="Customers" />
                    <SidebarItem icon={<Settings size={20} />} label="Settings" />
                </nav>
                <div className="p-4 border-t border-sand-100 mb-4">
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
            <main
                className={`flex-grow p-4 md:p-8 lg:p-12 mt-20 transition-all duration-300`}
            >
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 bg-white p-8 rounded-3xl border border-sand-100 shadow-sm">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-rich-soil-900 tracking-tight">Welcome back, {user?.name}!</h1>
                        <p className="text-rich-soil-500 mt-1">Here is your farm performance overview today.</p>
                    </div>
                    <button
                        onClick={handleAddProduct}
                        className="w-full md:w-auto bg-farm-green-600 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-farm-green-700 transition-all shadow-lg shadow-farm-green-200 hover:-translate-y-1 active:scale-95"
                    >
                        <Plus size={22} />
                        Add New Product
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-sand-100 shadow-sm hover:shadow-xl hover:border-farm-green-200 transition-all transform hover:-translate-y-2 group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-sand-50 rounded-2xl group-hover:bg-farm-green-50 transition-colors">
                                    {stat.icon}
                                </div>
                                <span className={`text-sm font-bold px-3 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-sand-50 text-gray-500'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-rich-soil-500 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
                            <p className="text-3xl font-bold text-rich-soil-900 mt-2">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-12">
                    {/* Recent Orders - Placeholder */}
                    <div className="xl:col-span-2 bg-white rounded-[2rem] border border-sand-200 shadow-sm overflow-hidden flex flex-col min-h-[450px]">
                        <div className="p-8 border-b border-sand-100 bg-sand-50/30">
                            <h2 className="text-xl font-serif font-bold text-rich-soil-900">Recent Orders</h2>
                        </div>
                        <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                            <div className="p-10 bg-sand-50 rounded-full mb-8 shadow-inner ring-1 ring-sand-100">
                                <ShoppingCart size={64} className="text-sand-300" />
                            </div>
                            <h4 className="text-rich-soil-800 font-bold text-xl mb-3">No orders placed yet</h4>
                            <p className="text-rich-soil-500 max-w-sm mx-auto leading-relaxed">Your products aren't currently reaching buyers. Try adding more inventory or updating your profile to attract more customers.</p>
                            <button className="mt-8 px-8 py-3 bg-farm-green-50 text-farm-green-700 font-bold rounded-xl hover:bg-farm-green-100 transition-colors border border-farm-green-200">
                                Market Your Farm
                            </button>
                        </div>
                    </div>

                    {/* Real Farm Profile Summary */}
                    <div className="bg-white rounded-[2rem] border border-sand-200 shadow-sm relative overflow-hidden flex flex-col">
                        {/* Background Effect */}
                        <div className="h-32 bg-gradient-to-br from-farm-green-900 to-farm-green-700 w-full relative">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
                        </div>

                        <div className="px-8 pb-8 -mt-16 flex-grow flex flex-col relative z-10">
                            <div className="w-32 h-32 rounded-3xl border-[6px] border-white shadow-xl overflow-hidden mx-auto mb-6 bg-sand-50 ring-1 ring-sand-200 group">
                                {profile?.image ? (
                                    <img src={profile?.image} alt="Farm" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-farm-green-400">
                                        <Tractor size={48} />
                                    </div>
                                )}
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-serif font-bold text-rich-soil-900 mb-1 leading-tight">{user?.name}'s Farm</h2>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-farm-green-50 text-farm-green-700 rounded-full font-bold text-xs uppercase tracking-widest border border-farm-green-100">
                                    <Sprout size={14} /> {profile?.specialty || 'General Farmer'}
                                </span>
                            </div>

                            <div className="space-y-5 flex-grow">
                                <div className="flex items-center gap-5 p-4 bg-sand-50/50 rounded-2xl border border-sand-100 hover:border-farm-green-200 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-sand-50">
                                        <MapPin className="text-farm-green-600" size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-rich-soil-400 uppercase font-black tracking-widest leading-none mb-1">Location</p>
                                        <p className="font-bold text-rich-soil-900">{profile?.location || 'Not Specified'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 p-4 bg-sand-50/50 rounded-2xl border border-sand-100 hover:border-farm-green-200 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-sand-50">
                                        <Calendar className="text-farm-green-600" size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-rich-soil-400 uppercase font-black tracking-widest leading-none mb-1">Experience</p>
                                        <p className="font-bold text-rich-soil-900">{profile?.experience || '0'} Years Active</p>
                                    </div>
                                </div>

                                <div className="pt-4 px-2">
                                    <p className="text-[10px] text-rich-soil-400 uppercase font-black tracking-widest mb-3 flex items-center gap-2">
                                        <span className="w-4 h-px bg-sand-200"></span> Farm Story
                                    </p>
                                    <p className="text-sm text-rich-soil-600 leading-relaxed italic line-clamp-4">
                                        "{profile?.bio || 'You haven\'t added a farm bio yet. Tell customers what makes your produce special!'}"
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/farmer-onboarding')}
                                className="w-full mt-10 py-4 bg-rich-soil-900 text-white rounded-2xl font-bold hover:bg-rich-soil-800 transition-all shadow-xl hover:shadow-rich-soil-200 active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Settings size={18} /> Edit Farm Profile
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active = false }) => (
    <button className={`flex items-center gap-3 w-full transition-all duration-300 rounded-xl px-4 py-3 ${active
        ? 'bg-farm-green-600 text-white shadow-lg shadow-farm-green-200'
        : 'text-rich-soil-500 hover:bg-sand-50 hover:text-rich-soil-900'
        }`}>
        <div className="shrink-0">{icon}</div>
        <span className="font-bold">{label}</span>
    </button>
);

export default FarmerDashboard;
