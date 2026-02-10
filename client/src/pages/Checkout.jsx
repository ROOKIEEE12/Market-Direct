import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import {
    ChevronLeft, Lock, MapPin, CreditCard,
    ShieldCheck, Truck, CheckCircle2, ArrowRight,
    Loader2, ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { addToast } = useToast();
    const navigate = useNavigate();

    // Prevent rendering issues by moving navigation to useEffect
    React.useEffect(() => {
        if (cart.length === 0) {
            navigate('/cart');
        }
    }, [cart.length, navigate]);

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = () => {
        if (step === 1 && (!formData.name || !formData.address || !formData.phone)) {
            addToast('Please fill in all required fields', 'error');
            return;
        }
        setStep(step + 1);
        window.scrollTo(0, 0);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            // If no token, go straight to demo mode
            if (!token) {
                console.log('No auth token - using demo mode');
                const demoOrderId = 'DEMO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
                console.log('Demo Order ID:', demoOrderId);
                addToast('Demo mode: Order simulated successfully!', 'success');
                // clearCart(); // Moved to Success page
                console.log('Navigating to success page...');
                navigate('/success', { state: { orderId: demoOrderId } });
                return;
            }

            const items = cart.map(item => ({
                id: item.id || item._id,
                quantity: item.quantity
            }));

            console.log('Placing order with items:', items);
            const res = await axios.post('http://localhost:5000/api/orders', {
                items,
                totalAmount: cartTotal,
                shippingAddress: formData
            });

            console.log('Order response:', res.data);
            addToast('Order placed successfully!', 'success');
            // clearCart(); // Moved to Success page
            console.log('Navigating to success page with order ID:', res.data.orderId);
            navigate('/success', { state: { orderId: res.data.orderId } });
        } catch (err) {
            console.error('Order error:', err);
            // Fallback for any server errors
            const fallbackOrderId = 'DEMO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            console.log('Error occurred, using fallback order ID:', fallbackOrderId);
            addToast('Demo mode: Order simulated successfully!', 'success');
            // clearCart(); // Moved to Success page
            console.log('Navigating to success page (fallback)...');
            navigate('/success', { state: { orderId: fallbackOrderId } });
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) return null;

    return (
        <div className="min-h-screen bg-sand-50 pt-32 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Steps */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-rich-soil-600 hover:text-farm-green-600 font-bold transition-colors">
                        <ChevronLeft size={20} />
                        Back to Bag
                    </button>

                    <div className="flex items-center gap-4">
                        {[1, 2, 3].map((s) => (
                            <React.Fragment key={s}>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-500 ${step >= s ? 'bg-farm-green-600 text-white shadow-lg shadow-farm-green-100' : 'bg-white text-sand-400 border border-sand-200'}`}>
                                    {step > s ? <CheckCircle2 size={20} /> : s}
                                </div>
                                {s < 3 && <div className={`w-12 h-0.5 transition-colors duration-500 ${step > s ? 'bg-farm-green-600' : 'bg-sand-200'}`}></div>}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-rich-soil-400">
                        <Lock size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Secure Checkout</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-sand-200"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-farm-green-100 text-farm-green-600 rounded-2xl">
                                            <MapPin size={24} />
                                        </div>
                                        <h2 className="text-2xl font-serif font-bold text-rich-soil-900">Shipping Address</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-rich-soil-400 mb-2 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-sand-50 border-none rounded-2xl h-14 px-6 focus:ring-2 focus:ring-farm-green-600 text-rich-soil-900 font-medium"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-rich-soil-400 mb-2 ml-1">Street Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full bg-sand-50 border-none rounded-2xl h-14 px-6 focus:ring-2 focus:ring-farm-green-600 text-rich-soil-900 font-medium"
                                                placeholder="Apartment, suite, etc."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-rich-soil-400 mb-2 ml-1">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full bg-sand-50 border-none rounded-2xl h-14 px-6 focus:ring-2 focus:ring-farm-green-600 text-rich-soil-900 font-medium"
                                                placeholder="City"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-rich-soil-400 mb-2 ml-1">ZIP / Postcode</label>
                                            <input
                                                type="text"
                                                name="zip"
                                                value={formData.zip}
                                                onChange={handleInputChange}
                                                className="w-full bg-sand-50 border-none rounded-2xl h-14 px-6 focus:ring-2 focus:ring-farm-green-600 text-rich-soil-900 font-medium"
                                                placeholder="000000"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-rich-soil-400 mb-2 ml-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-sand-50 border-none rounded-2xl h-14 px-6 focus:ring-2 focus:ring-farm-green-600 text-rich-soil-900 font-medium"
                                                placeholder="+91 00000-00000"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleNextStep}
                                        className="w-full mt-10 bg-farm-green-600 text-white h-16 rounded-2xl font-bold text-lg hover:bg-farm-green-700 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        Continue to Payment
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-sand-200"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-farm-green-100 text-farm-green-600 rounded-2xl">
                                            <CreditCard size={24} />
                                        </div>
                                        <h2 className="text-2xl font-serif font-bold text-rich-soil-900">Payment Option</h2>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="p-6 rounded-2xl border-2 border-farm-green-600 bg-farm-green-50 flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                                    <Truck size={24} className="text-farm-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-rich-soil-900">Cash on Delivery</p>
                                                    <p className="text-sm text-rich-soil-600">Pay when you receive the harvest</p>
                                                </div>
                                            </div>
                                            <CheckCircle2 className="text-farm-green-600" size={24} />
                                        </div>

                                        <div className="p-6 rounded-2xl border border-sand-200 flex items-center justify-between opacity-50 cursor-not-allowed grayscale">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                                    <CreditCard size={24} className="text-blue-500" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-rich-soil-900">Online Payment</p>
                                                    <p className="text-sm text-rich-soil-600">Credit/Debit Card, UPI</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] bg-sand-200 text-sand-500 font-bold px-2 py-1 rounded">COMING SOON</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 mt-12">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="w-full sm:w-1/3 bg-sand-100 text-rich-soil-600 h-16 rounded-2xl font-bold hover:bg-sand-200 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleNextStep}
                                            className="w-full sm:w-2/3 bg-farm-green-600 text-white h-16 rounded-2xl font-bold text-lg hover:bg-farm-green-700 transition-all flex items-center justify-center gap-2 group"
                                        >
                                            Review My Order
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-sand-200"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-farm-green-100 text-farm-green-600 rounded-2xl">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <h2 className="text-2xl font-serif font-bold text-rich-soil-900">Final Review</h2>
                                    </div>

                                    <div className="space-y-6 mb-12">
                                        <div className="flex items-start gap-4 p-6 bg-sand-50 rounded-2xl">
                                            <MapPin className="text-farm-green-600 shrink-0 mt-1" size={20} />
                                            <div>
                                                <p className="text-xs font-bold text-rich-soil-400 uppercase tracking-widest mb-1">Delivering To</p>
                                                <p className="font-bold text-rich-soil-900">{formData.name}</p>
                                                <p className="text-rich-soil-600">{formData.address}, {formData.city} {formData.zip}</p>
                                                <p className="text-rich-soil-600">{formData.phone}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-6 bg-sand-50 rounded-2xl">
                                            <CreditCard className="text-farm-green-600 shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs font-bold text-rich-soil-400 uppercase tracking-widest mb-1">Payment Method</p>
                                                <p className="font-bold text-rich-soil-900">Cash on Delivery</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            disabled={loading}
                                            onClick={() => setStep(2)}
                                            className="w-full sm:w-1/3 bg-sand-100 text-rich-soil-600 h-16 rounded-2xl font-bold hover:bg-sand-200 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            disabled={loading}
                                            onClick={handlePlaceOrder}
                                            className="w-full sm:w-2/3 bg-farm-green-600 text-white h-14 rounded-2xl font-bold text-lg hover:bg-farm-green-700 transition-all shadow-xl shadow-farm-green-100 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
                                        >
                                            {loading ? <Loader2 className="animate-spin" /> : <ShoppingBag size={24} />}
                                            {loading ? 'Confirming...' : 'Place Order Now'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Order Side Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-rich-soil-900 text-white p-6 rounded-3xl shadow-2xl sticky top-28 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-farm-green-600 rounded-full blur-[80px] opacity-20 translate-x-10 -translate-y-10"></div>

                            <h3 className="text-xl font-serif font-bold mb-6 relative z-10">Cart Snapshot</h3>

                            <div className="space-y-4 mb-10 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide no-scrollbar relative z-10">
                                {cart.map((item) => (
                                    <div key={item.id || item._id} className="flex items-center gap-4 bg-white/5 rounded-2xl p-3 border border-white/5">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-bold text-sm leading-tight line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-white/40">{item.quantity} x ₹{item.price}</p>
                                        </div>
                                        <span className="font-bold text-farm-green-400">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-white/10 relative z-10">
                                <div className="flex justify-between text-white/60">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-white">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-white/60">
                                    <span>Delivery</span>
                                    <span className="font-bold text-farm-green-400">FREE</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    <span className="text-lg font-bold">Payable Total</span>
                                    <span className="text-3xl font-bold text-farm-green-400">₹{cartTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
