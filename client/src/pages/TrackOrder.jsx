import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, Home, MapPin, CheckCircle2, Clock, Phone, MessageSquare, ArrowLeft, Navigation } from 'lucide-react';

const TrackOrder = () => {
    const { id } = useParams();
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Processing');
    const [truckPos, setTruckPos] = useState({ x: 10, y: 70 });

    // Simulate progress
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                const next = prev + 0.1;

                // Update status based on progress
                if (next > 75) setStatus('Out for Delivery');
                else if (next > 40) setStatus('Sorted & Dispatched');
                else if (next > 15) setStatus('Packed & Ready');

                // Update truck position for "map" effect
                // Path from (10, 70) to (90, 70) with some curves
                const x = 10 + (next * 0.8);
                const y = 70 + Math.sin(next * 0.2) * 10;
                setTruckPos({ x, y });

                return next;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    const steps = [
        { label: 'Order Confirmed', time: '10:30 AM', done: progress >= 0 },
        { label: 'Packed & Ready', time: '11:45 AM', done: progress >= 15 },
        { label: 'Sorted at Hub', time: '02:00 PM', done: progress >= 40 },
        { label: 'Out for Delivery', time: 'Live', done: progress >= 75 },
    ];

    return (
        <div className="min-h-screen bg-sand-50 pt-32 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/consumer-dashboard" className="p-2 bg-white rounded-full border border-sand-200 hover:bg-sand-50 transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-rich-soil-900">Live Track Order</h1>
                            <p className="text-rich-soil-400 font-medium">#{id || 'ORD-8273645'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-farm-green-100 px-4 py-2 rounded-full text-farm-green-700 font-bold text-sm">
                        <span className="w-2 h-2 bg-farm-green-600 rounded-full animate-pulse"></span>
                        {status}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Map Simulation */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] shadow-xl border border-sand-100 overflow-hidden relative">
                            {/* Map Header */}
                            <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-center pointer-events-none">
                                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-sand-200 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-farm-green-100 rounded-lg flex items-center justify-center text-farm-green-600">
                                        <Navigation size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-rich-soil-400 tracking-widest">ETA</p>
                                        <p className="text-sm font-bold text-rich-soil-900">15 - 20 Mins</p>
                                    </div>
                                </div>
                            </div>

                            {/* Simulated Map Grid */}
                            <div className="h-[400px] w-full bg-sand-50 relative overflow-hidden p-10">
                                {/* SVG Grid Lines */}
                                <svg className="absolute inset-0 w-full h-full opacity-10">
                                    <defs>
                                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>

                                {/* Route Path (Static) */}
                                <svg className="absolute inset-0 w-full h-full p-10">
                                    <path
                                        d="M 10 70 Q 30 90, 50 70 T 90 70"
                                        fill="none"
                                        stroke="#e2e8f0"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    <motion.path
                                        d="M 10 70 Q 30 90, 50 70 T 90 70"
                                        fill="none"
                                        stroke="#166534"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        vectorEffect="non-scaling-stroke"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: progress / 100 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </svg>

                                {/* Origin (Farm) */}
                                <div className="absolute left-[10%] bottom-[30%] -translate-x-1/2 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-farm-green-600 border border-sand-200 relative z-10">
                                        <Home size={24} />
                                        <div className="absolute -bottom-1 w-3 h-3 bg-white rotate-45 border-r border-b border-sand-200"></div>
                                    </div>
                                    <p className="mt-4 text-[10px] font-bold text-rich-soil-400 uppercase tracking-widest">Green Farm</p>
                                </div>

                                {/* Destination (User) */}
                                <div className="absolute right-[10%] bottom-[30%] translate-x-1/2 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-rich-soil-900 rounded-2xl shadow-xl flex items-center justify-center text-white relative z-10 border border-rich-soil-800">
                                        <MapPin size={24} />
                                        <div className="absolute -bottom-1 w-3 h-3 bg-rich-soil-900 rotate-45"></div>
                                    </div>
                                    <p className="mt-4 text-[10px] font-bold text-rich-soil-400 uppercase tracking-widest">Your Home</p>
                                </div>

                                {/* Moving Truck */}
                                <motion.div
                                    className="absolute z-20 pointer-events-none"
                                    style={{
                                        left: `${truckPos.x}%`,
                                        top: `${truckPos.y}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-farm-green-400/20 rounded-full animate-ping"></div>
                                        <div className="w-10 h-10 bg-farm-green-600 text-white rounded-xl flex items-center justify-center shadow-2xl shadow-farm-green-400 relative border-2 border-white">
                                            <Truck size={20} />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Delivery Info Footer */}
                            <div className="p-8 bg-rich-soil-900 text-white flex flex-wrap justify-between items-center gap-6">
                                <div className="flex items-center gap-5">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                        alt="Delivery Partner"
                                        className="w-14 h-14 rounded-2xl bg-white p-1 shadow-inner"
                                    />
                                    <div>
                                        <p className="text-rich-soil-300 text-xs font-bold uppercase tracking-widest mb-1">Delivery Partner</p>
                                        <h3 className="text-lg font-bold">Arjun Kumar</h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                                        <Phone size={20} />
                                    </button>
                                    <button className="px-6 h-12 rounded-2xl bg-farm-green-600 text-white font-bold flex items-center gap-2 hover:bg-farm-green-700 transition-colors">
                                        <MessageSquare size={18} />
                                        Chat
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Updates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-3xl shadow-lg border border-sand-100 flex items-center gap-4">
                                <div className="p-4 bg-sand-50 rounded-2xl text-farm-green-600">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="text-rich-soil-400 text-xs font-bold uppercase tracking-widest">Expected by</p>
                                    <p className="text-xl font-bold text-rich-soil-900">Today, 5:45 PM</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl shadow-lg border border-sand-100 flex items-center gap-4">
                                <div className="p-4 bg-sand-50 rounded-2xl text-farm-green-600">
                                    <Package size={24} />
                                </div>
                                <div>
                                    <p className="text-rich-soil-400 text-xs font-bold uppercase tracking-widest">Items</p>
                                    <p className="text-xl font-bold text-rich-soil-900">4 Items Shipped</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-sand-100 h-full">
                            <h2 className="text-2xl font-serif font-bold text-rich-soil-900 mb-8">Timeline</h2>
                            <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-sand-100">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-6 relative">
                                        <div className={`mt-1.5 w-6 h-6 rounded-full flex items-center justify-center z-10 ${step.done ? 'bg-farm-green-600 text-white' : 'bg-sand-200 text-rich-soil-400'}`}>
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <div>
                                            <p className={`text-base font-bold ${step.done ? 'text-rich-soil-900' : 'text-rich-soil-300'}`}>{step.label}</p>
                                            <p className="text-xs text-rich-soil-400 font-medium">{step.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-6 bg-sand-50 rounded-3xl border border-sand-100 text-center">
                                <p className="text-sm font-medium text-rich-soil-600 mb-4 italic">"I'm 5 mins away from your location. Please keep some change ready if COD."</p>
                                <div className="flex items-center justify-center gap-2 text-xs font-bold text-rich-soil-400">
                                    <Phone size={12} />
                                    <span>Last message from Arjun</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
