import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Truck, ShieldCheck, ArrowLeft, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { addToast } = useToast();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({ ...product, quantity });
        addToast(`Added ${quantity} ${product.name} to bag!`, 'success');
    };

    if (loading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;
    if (!product) return <div className="min-h-screen pt-32 text-center">Product not found.</div>;

    return (
        <div className="min-h-screen bg-sand-50 pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/marketplace" className="inline-flex items-center text-rich-soil-600 hover:text-farm-green-600 mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Marketplace
                </Link>

                <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl border border-sand-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Image Section */}
                        <div className="relative group">
                            <div className="aspect-square rounded-3xl overflow-hidden bg-sand-100 relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-farm-green-700 flex items-center gap-2 shadow-lg">
                                <ShieldCheck size={16} /> Certified Organic
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col">
                            <div className="border-b border-sand-100 pb-8 mb-8">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-farm-green-600 font-bold tracking-wider text-sm uppercase">{product.category}</span>
                                    <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
                                        <Star size={16} fill="currentColor" />
                                        <span className="font-bold text-rich-soil-900">4.8</span>
                                        <span className="text-rich-soil-400 text-sm">(124 reviews)</span>
                                    </div>
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-rich-soil-900 mb-6">{product.name}</h1>
                                <p className="text-rich-soil-600 text-lg leading-relaxed">{product.description}</p>
                            </div>

                            <div className="mb-8 space-y-4">
                                <div className="flex items-end gap-2 text-rich-soil-900">
                                    <span className="text-4xl font-bold">₹{product.price}</span>
                                    <span className="text-xl text-rich-soil-500 mb-1">/ {product.unit}</span>
                                </div>
                                <p className="text-farm-green-600 text-sm font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-farm-green-600 animate-pulse"></span>
                                    {product.stock > 0 ? "In Stock & Ready to Ship" : "Out of Stock"}
                                </p>
                            </div>

                            {/* Farmer Info - Mini Card */}
                            {product.farmer && (
                                <div className="bg-sand-50 p-4 rounded-xl flex items-center gap-4 mb-8 border border-sand-200">
                                    <div className="w-12 h-12 rounded-full bg-rich-soil-200 overflow-hidden">
                                        {/* Placeholder or actual farmer image if available */}
                                        <div className="w-full h-full bg-farm-green-200"></div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-rich-soil-500 font-bold uppercase">Grown by</p>
                                        <p className="font-serif font-bold text-rich-soil-900">{product.farmer.user?.name || "Local Farmer"}</p>
                                    </div>
                                    <Link to={`/farmer/${product.farmer.id}`} className="ml-auto text-sm text-farm-green-700 font-bold hover:underline">
                                        View Profile
                                    </Link>
                                </div>
                            )}

                            <div className="mt-auto flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center bg-sand-50 rounded-2xl border border-sand-200 p-2 w-fit">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-white rounded-xl transition-colors text-rich-soil-600"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className="w-12 text-center font-bold text-xl text-rich-soil-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-white rounded-xl transition-colors text-rich-soil-600"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-farm-green-700 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-farm-green-800 transition-all shadow-lg shadow-farm-green-200 flex items-center justify-center gap-3 active:scale-95"
                                >
                                    <ShoppingBag size={24} /> Add to Bag
                                </button>
                            </div>

                            <div className="mt-8 flex items-center justify-between text-sm text-rich-soil-500 border-t border-sand-100 pt-6">
                                <span className="flex items-center gap-2"><Truck size={18} /> Next Day Delivery</span>
                                <span className="flex items-center gap-2"><ShieldCheck size={18} /> Freshness Guaranteed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
