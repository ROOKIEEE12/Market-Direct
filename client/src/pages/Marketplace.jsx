import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Search, Filter, ShoppingBag, Star, Leaf, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [addingItem, setAddingItem] = useState(null);

    const { addToCart } = useCart();
    const { addToast } = useToast();

    const categories = ["All", "Vegetables", "Fruits", "Dairy", "Honey", "Grains"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (err) {
                console.error(err);
                // Demo fallback data
                setProducts([
                    { _id: "1", name: "Premium Kashmiri Saffron", price: 350, category: "Honey", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800", unit: "gram", description: "Highest grade Kashmiri Kesar, hand-picked from the fields of Pampore. Pure and aromatic." },
                    { _id: "2", name: "Alphonso Mangoes", price: 1200, category: "Fruits", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800", unit: "dozen", description: "The king of mangoes from Ratnagiri. Naturally ripened and incredibly sweet." },
                    { _id: "3", name: "Organic Broccoli", price: 85, category: "Vegetables", image: "https://images.unsplash.com/photo-1458819714733-e5ab3d536722?q=80&w=800", unit: "pc", description: "Freshly harvested organic broccoli. Rich in Vitamin C and fiber." },
                    { _id: "4", name: "Wild Forest Honey", price: 450, category: "Honey", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800", unit: "500g", description: "Raw, unprocessed honey collected from deep forest beehives. Zero added sugar." },
                    { _id: "5", name: "High-Protein Quinoa", price: 299, category: "Grains", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800", unit: "kg", description: "Nutrient-dense organic quinoa. Perfect for healthy salads and meals." },
                    { _id: "6", name: "Hass Avocados", price: 180, category: "Fruits", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=800", unit: "pc", description: "Creamy and buttery Hass avocados. Excellent for guacamole or morning toast." },
                    { _id: "7", name: "Red Cherry Tomatoes", price: 60, category: "Vegetables", image: "https://images.unsplash.com/photo-1518977676601-b53f02bc6834?q=80&w=800", unit: "box", description: "Sweet and tangy cherry tomatoes. Perfect for salads and pasta." },
                    { _id: "8", name: "Fresh Desi Ghee", price: 850, category: "Dairy", image: "https://images.unsplash.com/photo-1550583724-125581cc2532?q=80&w=800", unit: "kg", description: "Pure A2 cow milk ghee made using the traditional Bilona method." },
                    { _id: "9", name: "Organic Spinach", price: 40, category: "Vegetables", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800", unit: "bundle", description: "Iron-rich fresh green spinach. Grown without any chemical pesticides." },
                    { _id: "10", name: "Basmati Rice (Long Grain)", price: 150, category: "Grains", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800", unit: "kg", description: "Aged long-grain basmati rice with an exquisite aroma and fluffy texture." },
                    { _id: "11", name: "A2 Full Cream Milk", price: 90, category: "Dairy", image: "https://images.unsplash.com/photo-1550583724-125581cc2532?q=80&w=800", unit: "liter", description: "Fresh farm milk delivered within hours of milking. No preservatives." },
                    { _id: "12", name: "Fresh Harvest Lemons", price: 30, category: "Fruits", image: "https://images.unsplash.com/photo-1585059895318-5be4f2ea0061?q=80&w=800", unit: "250g", description: "Zesty and juicy lemons. Powerhouse of Vitamin C." }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        setAddingItem(product._id || product.id);
        addToCart(product);

        setTimeout(() => {
            setAddingItem(null);
            addToast(`${product.name} added to bag`, 'success');
        }, 600);
    };

    return (
        <div className="min-h-screen bg-sand-50 pt-28 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 text-center lg:text-left">
                    <h1 className="text-3xl font-serif font-bold text-rich-soil-900 mb-2">Farmer's Marketplace</h1>
                    <p className="text-rich-soil-600 text-base">Fresh from the farm, delivered to your doorstep.</p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="flex-grow relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-farm-green-600 transition-colors">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search fresh harvest..."
                            className="w-full bg-white h-12 pl-12 pr-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-farm-green-600 transition-all text-base"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-2xl font-bold whitespace-nowrap transition-all text-sm ${selectedCategory === cat ? 'bg-farm-green-600 text-white shadow-lg shadow-farm-green-100' : 'bg-white text-rich-soil-600 hover:bg-sand-100 border border-sand-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 size={48} className="text-farm-green-600 animate-spin" />
                        <p className="text-rich-soil-400 font-bold animate-pulse">Loading the harvest...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={product._id || product.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-sand-100 flex flex-col"
                                >
                                    <Link to={`/product/${product._id || product.id}`} className="block relative aspect-square overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                                            <span className="text-white font-bold flex items-center gap-2">
                                                View Details <ArrowRight size={18} />
                                            </span>
                                        </div>
                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-sand-200">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-rich-soil-900">{product.category}</span>
                                        </div>
                                    </Link>

                                    <div className="p-4 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-serif font-bold text-rich-soil-900 leading-tight line-clamp-1">{product.name}</h3>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star size={14} fill="currentColor" />
                                                <span className="text-xs font-bold text-rich-soil-900">4.9</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-farm-green-600 mb-4">
                                            <Leaf size={12} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Organic</span>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div>
                                                <span className="text-xl font-bold text-farm-green-700">₹{product.price}</span>
                                                <span className="text-xs text-rich-soil-400 font-medium italic"> / {product.unit}</span>
                                            </div>
                                            <button
                                                onClick={(e) => handleAddToCart(e, product)}
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90 shadow-lg group/btn ${(addingItem === product._id || addingItem === product.id) && addingItem !== null ? 'bg-farm-green-600 text-white' : 'bg-rich-soil-900 text-white hover:bg-farm-green-600 shadow-rich-soil-100'}`}
                                            >
                                                {(addingItem === product._id || addingItem === product.id) && addingItem !== null ? (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                        <CheckCircle2 size={18} />
                                                    </motion.div>
                                                ) : (
                                                    <ShoppingBag size={18} className="group-hover/btn:rotate-12 transition-transform" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-sand-300">
                        <div className="bg-sand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-sand-400">
                            <Search size={24} />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-rich-soil-900">No harvest found</h3>
                        <p className="text-rich-soil-600 mt-2 text-sm">Try adjusting your filters or search query.</p>
                        <button onClick={() => { setSearchQuery(""); setSelectedCategory("All") }} className="mt-6 text-farm-green-600 font-bold underline text-sm">Clear all filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Marketplace;
