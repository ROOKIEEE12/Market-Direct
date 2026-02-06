import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, MapPin, Tractor, ShoppingBag, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const Register = () => {
    const [role, setRole] = useState('consumer');
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', location: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                ...formData,
                role
            });

            // Store token and user data
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            // Redirect based on role
            if (res.data.user.role === 'farmer') {
                navigate('/farmer-dashboard');
            } else {
                navigate('/consumer-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Join MarketDirect</h2>
                    <p className="mt-2 text-sm text-gray-600">Create an account to start your journey.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => setRole('consumer')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${role === 'consumer' ? 'bg-farm-green-50 border-farm-green-500 text-farm-green-700 font-medium ring-1 ring-farm-green-500' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                        <ShoppingBag size={20} /> Consumer
                    </button>
                    <button
                        onClick={() => setRole('farmer')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${role === 'farmer' ? 'bg-rich-soil-50 border-rich-soil-500 text-rich-soil-800 font-medium ring-1 ring-rich-soil-500' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Tractor size={20} /> Farmer
                    </button>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="relative">
                            <User className="absolute top-3.5 left-3 text-gray-400" size={20} />
                            <input
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute top-3.5 left-3 text-gray-400" size={20} />
                            <input
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute top-3.5 left-3 text-gray-400" size={20} />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-3.5 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div className="relative">
                            <MapPin className="absolute top-3.5 left-3 text-gray-400" size={20} />
                            <input
                                name="location"
                                type="text"
                                required
                                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 focus:z-10 sm:text-sm"
                                placeholder="Location (City, State)"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-70 ${role === 'farmer' ? 'bg-rich-soil-600 hover:bg-rich-soil-700 focus:ring-rich-soil-500' : 'bg-farm-green-600 hover:bg-farm-green-700 focus:ring-farm-green-500'}`}
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                            {loading ? 'Creating Account...' : `Sign Up as ${role === 'farmer' ? 'Farmer' : 'Consumer'}`}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-farm-green-600 hover:text-farm-green-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
