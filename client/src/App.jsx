import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import About from './pages/About';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/dashboard/FarmerDashboard';
import ConsumerDashboard from './pages/dashboard/ConsumerDashboard';
import FarmerOnboarding from './pages/dashboard/FarmerOnboarding';
import Success from './pages/Success';
import TrackOrder from './pages/TrackOrder';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Router>
            {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
            <div className={`min-h-screen bg-sand-50 font-sans text-rich-soil-900 flex flex-col transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Dashboard Routes */}
                        <Route
                            path="/farmer-dashboard"
                            element={
                                <ProtectedRoute role="farmer">
                                    <FarmerDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/farmer-onboarding"
                            element={
                                <ProtectedRoute role="farmer">
                                    <FarmerOnboarding />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/consumer-dashboard"
                            element={
                                <ProtectedRoute role="consumer">
                                    <ConsumerDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/success" element={<Success />} />
                        <Route path="/track-order/:id" element={<TrackOrder />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
