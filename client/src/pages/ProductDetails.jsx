import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import {
    ChevronLeft, ShoppingBag, Leaf, ShieldCheck,
    Star, ArrowRight, Minus, Plus, Loader2,
    Calendar, MapPin, Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
                // Fallback for demo if product doesn't exist in DB
                setProduct({
                    id,
                    name: "Fresh Organic Spinach",
                    price: 45,
                    description: "Freshly harvested organic spinach leaves, rich in iron and nutrients. Grown without any chemical pesticides by farmer Ramesh Kumar.",
                    category: "Vegetables",
                    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2000&auto=format&fit=crop",
                    unit: "bundle",
                    stock: 50,
                    farmerName: "Ramesh Kumar",
                    harvestDate: "Feb 9, 2026",
                    location: "Haryana, India"
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToBag = () => {
        setIsAdding(true);
        setShowAnimation(true);

        // Add to cart state
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }

        // Animation timing
        setTimeout(() => {
            setIsAdding(false);
            addToast(`Added ${quantity} ${product.unit}(s) to bag`, 'success');
            setTimeout(() => setShowAnimation(false), 1000);
        }, 800);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sand-50">
                <Loader2 size={48} className="text-farm-green-600 animate-spin" />
            </div>
        );
    }

    if (!product) return <div>Product not found</div>;

    return (
        <div className="min-h-screen bg-sand-50 pt-24 pb-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link to="/marketplace" className="inline-flex items-center gap-2 text-rich-soil-600 hover:text-farm-green-600 transition-colors mb-8 group">
                    <div className="p-2 bg-white rounded-full border border-sand-200 group-hover:-translate-x-1 transition-transform">
                        <ChevronLeft size={20} />
                    </div>
                    <span className="font-bold">Back to Marketplace</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative group"
                    >
                        <div className="aspect-square rounded-[3rem] overflow-hidden bg-white shadow-2xl border border-sand-200 relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            {/* Organic Badge */}
                            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-farm-green-100 flex items-center gap-2 shadow-sm">
                                <Leaf size={18} className="text-farm-green-600" />
                                <span className="text-xs font-bold text-rich-soil-900 uppercase tracking-wider">Certified Organic</span>
                            </div>
                        </div>

                        {/* Floating Floating Elements for Wow Effect */}
                        <div className="absolute -bottom-6 -right-6 bg-farm-green-600 text-white p-6 rounded-3xl shadow-2xl rotate-3 flex flex-col items-center">
                            <span className="text-sm font-bold opacity-80 uppercase tracking-tighter">Harvested</span>
                            <span className="text-2xl font-serif font-bold">24h ago</span>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <span className="bg-sand-200 text-rich-soil-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{product.category}</span>
                            <div className="flex items-center gap-1 text-amber-500">
                                <Star size={16} fill="currentColor" />
                                <span className="text-rich-soil-900 font-bold">4.9</span>
                                <span className="text-rich-soil-400 font-medium">(120+ reviews)</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-rich-soil-900 mb-6 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-5xl font-bold text-farm-green-700">₹{product.price}</span>
                            <span className="text-xl text-rich-soil-400 font-medium">/ {product.unit}</span>
                        </div>

                        <p className="text-lg text-rich-soil-600 leading-relaxed mb-10 pb-8 border-b border-sand-200">
                            {product.description}
                        </p>

                        {/* Farmer Details */}
                        <div className="grid grid-cols-2 gap-6 mb-12">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-farm-green-600 group-hover:bg-farm-green-600 group-hover:text-white transition-colors duration-300">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-rich-soil-400 font-bold uppercase tracking-widest">Harvest Date</p>
                                    <p className="font-bold text-rich-soil-900">{product.harvestDate || 'Freshly picked'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-farm-green-600 group-hover:bg-farm-green-600 group-hover:text-white transition-colors duration-300">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-rich-soil-400 font-bold uppercase tracking-widest">Farmer Location</p>
                                    <p className="font-bold text-rich-soil-900">{product.location || 'Local Farm'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Purchase Actions */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
                            <div className="flex items-center bg-white rounded-3xl border-2 border-sand-200 p-2 h-16 w-full sm:w-auto">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-rich-soil-600 hover:bg-sand-50 transition-colors"
                                >
                                    <Minus size={20} />
                                </button>
                                <span className="w-16 text-center text-2xl font-bold text-rich-soil-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-rich-soil-600 hover:bg-sand-50 transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="relative w-full">
                                <motion.button
                                    onClick={handleAddToBag}
                                    disabled={isAdding}
                                    whileTap={{ scale: 0.95 }}
                                    animate={isAdding ? {
                                        x: [0, -4, 4, -4, 4, 0],
                                        transition: { duration: 0.4 }
                                    } : {}}
                                    className={`w-full relative overflow-hidden bg-farm-green-600 text-white h-16 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all duration-300 ${isAdding ? 'bg-farm-green-700' : 'hover:bg-farm-green-700 hover:-translate-y-1 shadow-farm-green-100'}`}
                                >
                                    {isAdding ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            <ShoppingBag size={24} />
                                            Add to Bag
                                        </>
                                    )}

                                    {/* Physical Animation Sparkles */}
                                    <AnimatePresence>
                                        {showAnimation && (
                                            <motion.div
                                                className="absolute inset-0 bg-white/20 pointer-events-none"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 2, opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.button>

                                {/* Flying Particle Animation Concept */}
                                <AnimatePresence>
                                    {isAdding && (
                                        <motion.div
                                            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                                            animate={{
                                                x: [0, 100, 200, 300],
                                                y: [0, -300, -600, -900],
                                                scale: [1, 0.8, 0.4, 0],
                                                opacity: [1, 1, 0.8, 0]
                                            }}
                                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                            className="fixed z-[100] w-12 h-12 rounded-2xl bg-farm-green-600 shadow-2xl pointer-events-none flex items-center justify-center"
                                            style={{
                                                top: 'auto',
                                                left: 'auto',
                                                bottom: '20%',
                                                right: '20%'
                                            }}
                                        >
                                            <ShoppingBag size={20} className="text-white" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 pt-8 border-t border-sand-200 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-rich-soil-400">
                                <Truck size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">Free Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 text-rich-soil-400">
                                <ShieldCheck size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">Direct Payment</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
