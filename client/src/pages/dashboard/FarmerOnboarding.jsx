import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Tractor, Image as ImageIcon, Loader2, Save, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';

const FarmerOnboarding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        location: '',
        bio: '',
        specialty: '',
        experience: '',
        image: 'https://images.unsplash.com/photo-1627920769847-31bbb38b9355?q=80&w=1000' // Default
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/farmers', formData);
            addToast('Profile created successfully!', 'success');
            navigate('/farmer-dashboard');
        } catch (err) {
            console.error(err);
            addToast(err.response?.data?.msg || 'Failed to save profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-sand-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-sand-200 overflow-hidden">
                    <div className="bg-farm-green-900 px-8 py-10 text-center">
                        <h1 className="text-3xl font-serif font-bold text-white mb-2">Complete Your Farm Profile</h1>
                        <p className="text-farm-green-100">Welcome, {user?.name}! Let's get your farm set up so customers can find you.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                        {/* Section 1: Basic Info */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-rich-soil-900 border-b border-sand-200 pb-2 mb-6">Farm Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-rich-soil-700 mb-2">Location (City, State)</label>
                                    <div className="relative">
                                        <MapPin className="absolute top-3.5 left-3 text-gray-400" size={20} />
                                        <input
                                            required
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="pl-10 w-full rounded-xl border-sand-200 focus:ring-farm-green-500 focus:border-farm-green-500 py-3"
                                            placeholder="e.g. Nashik, Maharashtra"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-rich-soil-700 mb-2">Years of Experience</label>
                                    <div className="relative">
                                        <Tractor className="absolute top-3.5 left-3 text-gray-400" size={20} />
                                        <input
                                            required
                                            name="experience"
                                            type="number"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="pl-10 w-full rounded-xl border-sand-200 focus:ring-farm-green-500 focus:border-farm-green-500 py-3"
                                            placeholder="e.g. 5"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-rich-soil-700 mb-2">Primary Crop Specialty</label>
                                <div className="relative">
                                    <FileText className="absolute top-3.5 left-3 text-gray-400" size={20} />
                                    <input
                                        required
                                        name="specialty"
                                        value={formData.specialty}
                                        onChange={handleChange}
                                        className="pl-10 w-full rounded-xl border-sand-200 focus:ring-farm-green-500 focus:border-farm-green-500 py-3"
                                        placeholder="e.g. Organic Root Vegetables"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-rich-soil-700 mb-2">Bio / Farm Story</label>
                                <textarea
                                    required
                                    name="bio"
                                    rows={4}
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-sand-200 focus:ring-farm-green-500 focus:border-farm-green-500 p-4"
                                    placeholder="Tell customers about your farming practices and history..."
                                />
                            </div>
                        </div>

                        {/* Section 2: Profile Image (URL for now) */}
                        <div className="space-y-6 pt-6">
                            <h3 className="text-xl font-bold text-rich-soil-900 border-b border-sand-200 pb-2 mb-6">Profile Image</h3>

                            <div>
                                <label className="block text-sm font-medium text-rich-soil-700 mb-2">Profile Image URL</label>
                                <div className="relative">
                                    <ImageIcon className="absolute top-3.5 left-3 text-gray-400" size={20} />
                                    <input
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="pl-10 w-full rounded-xl border-sand-200 focus:ring-farm-green-500 focus:border-farm-green-500 py-3"
                                        placeholder="https://..."
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Paste a URL for your profile picture. We've added a default one for you.</p>
                            </div>

                            {formData.image && (
                                <div className="mt-4">
                                    <p className="text-xs font-bold text-gray-500 mb-2">Preview:</p>
                                    <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100">
                                        <img src={formData.image} alt="Profile Preview" className="w-full h-full object-cover" />
                                    </div>

                                </div>
                            )}
                        </div>

                        <div className="pt-6 border-t border-sand-200">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-farm-green-600 hover:bg-farm-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500 disabled:opacity-50 transition-all"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Save size={24} />}
                                {loading ? 'Saving Profile...' : 'Save Profile & Go to Dashboard'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FarmerOnboarding;
