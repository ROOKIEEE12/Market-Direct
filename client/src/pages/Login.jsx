import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        setError('');

        try {
            const data = await login(formData.email, formData.password);

            // Redirect based on role
            if (data.user.role === 'farmer') {
                navigate('/farmer-dashboard');
            } else {
                navigate('/consumer-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid email or password');
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-sand-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2rem] shadow-xl border border-sand-100">
                <div className="text-center">
                    <h2 className="text-3xl font-serif font-bold text-rich-soil-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-rich-soil-600">Sign in to access your dashboard.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm animate-shake">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute top-3.5 left-3 text-gray-400" size={20} />
                            <input
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-sand-200 placeholder-gray-400 text-rich-soil-900 focus:outline-none focus:ring-2 focus:ring-farm-green-500 focus:border-transparent transition-all sm:text-sm bg-sand-50/50"
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
                                className="appearance-none rounded-xl relative block w-full px-12 py-3 border border-sand-200 placeholder-gray-400 text-rich-soil-900 focus:outline-none focus:ring-2 focus:ring-farm-green-500 focus:border-transparent transition-all sm:text-sm bg-sand-50/50 pr-10"
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
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-farm-green-600 focus:ring-farm-green-500 border-gray-300 rounded cursor-pointer" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-rich-soil-600 cursor-pointer">Remember me</label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-farm-green-600 hover:text-farm-green-700">Forgot password?</a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={btnLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-farm-green-600 hover:bg-farm-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500 transition-all shadow-lg shadow-farm-green-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {btnLoading ? (
                                <Loader2 className="animate-spin mr-2" size={20} />
                            ) : null}
                            {btnLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-rich-soil-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-farm-green-600 hover:text-farm-green-700">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
