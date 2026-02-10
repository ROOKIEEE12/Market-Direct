import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, Package, ArrowRight, Home, ShoppingBag, Truck, ShieldCheck, Lock, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Success = () => {
    const location = useLocation();
    const { clearCart } = useCart();
    const orderId = location.state?.orderId || "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    useEffect(() => {
        window.scrollTo(0, 0);
        clearCart();
    }, []);

    return (
        <div className="min-h-screen bg-sand-50 pt-32 pb-8 flex flex-col items-center justify-center px-4 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity">
                <div className="absolute top-20 left-10 w-64 h-64 bg-farm-green-100/50 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-sand-200/50 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-sand-200 text-center max-w-2xl w-full border border-white relative z-10"
            >
                {/* Success Icon Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-farm-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-farm-green-100"
                >
                    <CheckCircle size={32} className="text-white" />
                </motion.div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold text-rich-soil-900 mb-4 leading-tight">
                    Order Placed <br /> <span className="text-farm-green-600">Successfully!</span>
                </h1>

                <p className="text-lg text-rich-soil-400 font-medium mb-8 max-w-md mx-auto">
                    Thank you for supporting local farmers. Your fresh harvest is being prepared for delivery.
                </p>

                {/* Order Summary Box */}
                <div className="bg-sand-50 rounded-2xl p-6 mb-8 border border-sand-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-farm-green-600">
                            <Package size={20} />
                        </div>
                        <div>
                            <p className="text-rich-soil-400 text-xs font-bold uppercase tracking-widest">Order ID</p>
                            <p className="text-rich-soil-900 font-bold font-mono text-base">{orderId}</p>
                        </div>
                    </div>
                    <div className="w-px h-10 bg-sand-200 hidden sm:block"></div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-farm-green-600">
                            <Truck size={20} />
                        </div>
                        <div>
                            <p className="text-rich-soil-400 text-xs font-bold uppercase tracking-widest">Expected Delivery</p>
                            <p className="text-rich-soil-900 font-bold text-base">Tomorrow, 6 PM</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to={`/track-order/${orderId}`}
                        className="w-full sm:w-auto bg-farm-green-600 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-farm-green-700 transition-all shadow-xl shadow-farm-green-100 flex items-center justify-center gap-2 group"
                    >
                        Track My Order
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-rich-soil-900 border-2 border-sand-200 hover:bg-sand-50 transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                </div>
            </motion.div>

            {/* Premium Badges */}
            <div className="mt-12 flex gap-10 items-center">
                <div className="flex flex-col items-center gap-2 group cursor-default">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-sand-100 group-hover:bg-farm-green-600 group-hover:text-white transition-all duration-300">
                        <ShieldCheck size={20} className="text-farm-green-600 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-extrabold text-rich-soil-400 uppercase tracking-[0.2em]">Verified</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-default">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-sand-100 group-hover:bg-farm-green-600 group-hover:text-white transition-all duration-300">
                        <Lock size={20} className="text-farm-green-600 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-extrabold text-rich-soil-400 uppercase tracking-[0.2em]">Secure</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-default">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-sand-100 group-hover:bg-farm-green-600 group-hover:text-white transition-all duration-300">
                        <Leaf size={20} className="text-farm-green-600 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-extrabold text-rich-soil-400 uppercase tracking-[0.2em]">Fresh</span>
                </div>
            </div>
        </div>
    );
};

export default Success;
