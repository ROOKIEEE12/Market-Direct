import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import axios from 'axios';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
    const { addToast } = useToast();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCheckout = () => {
        if (!isAuthenticated) {
            addToast('Please login to checkout', 'error');
            navigate('/login');
            return;
        }
        navigate('/checkout');
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-sand-50 pt-32 pb-8 flex flex-col items-center justify-center px-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-sand-200">
                    <div className="w-20 h-20 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={40} className="text-sand-400" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-rich-soil-900 mb-4">Your bag is empty</h2>
                    <p className="text-rich-soil-600 mb-8">Looks like you haven't added any fresh produce to your bag yet.</p>
                    <Link to="/marketplace" className="inline-block bg-farm-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-farm-green-700 transition-all shadow-lg shadow-farm-green-100">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sand-50 pt-28 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/marketplace" className="p-2 bg-white rounded-full border border-sand-200 hover:bg-gray-50 transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <h1 className="text-3xl font-serif font-bold text-rich-soil-900">Your Shopping Bag</h1>
                    <span className="bg-farm-green-100 text-farm-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        {cartCount} items
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id || item._id} className="bg-white p-4 rounded-2xl shadow-sm border border-sand-100 flex flex-col sm:flex-row items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-rich-soil-900">{item.name}</h3>
                                    <p className="text-xs text-rich-soil-400 mb-3">{item.category}</p>
                                    <div className="flex items-center justify-center sm:justify-start gap-3">
                                        <div className="flex items-center bg-sand-50 rounded-lg border border-sand-200 p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id || item._id, item.quantity - 1)}
                                                className="p-1.5 hover:bg-white rounded-md transition-colors text-rich-soil-600"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-rich-soil-900 text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id || item._id, item.quantity + 1)}
                                                className="p-1.5 hover:bg-white rounded-md transition-colors text-rich-soil-600"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id || item._id)}
                                            className="text-red-400 hover:text-red-600 transition-colors p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-farm-green-700">₹{item.price * item.quantity}</p>
                                    <p className="text-xs text-rich-soil-400">₹{item.price} / {item.unit}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-3xl shadow-xl border border-sand-200 sticky top-24">
                            <h2 className="text-xl font-bold text-rich-soil-900 mb-6">Order Summary</h2>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-rich-soil-600 text-sm">
                                    <span>Subtotal</span>
                                    <span className="font-bold">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-rich-soil-600 text-sm">
                                    <span>Delivery Fee</span>
                                    <span className="font-bold text-farm-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between text-rich-soil-600 text-sm">
                                    <span>Tax (GST)</span>
                                    <span className="font-bold">₹0</span>
                                </div>
                                <div className="pt-4 border-t border-sand-100 flex justify-between items-center">
                                    <span className="text-lg font-bold text-rich-soil-900">Total</span>
                                    <span className="text-2xl font-bold text-farm-green-700">₹{cartTotal}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full bg-farm-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-farm-green-700 transition-all shadow-lg shadow-farm-green-100 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
                                {loading ? 'Processing...' : 'Checkout Now'}
                            </button>
                            <p className="text-center text-[10px] text-rich-soil-400 mt-4">
                                Secure payment powered by Razorpay. 100% satisfaction guaranteed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
