import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingBag, Star, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('newest');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const { addToCart } = useCart();
    const { addToast } = useToast();

    const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Grains', 'Poultry', 'Honey'];

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                search,
                category: category === 'All' ? undefined : category,
                minPrice: minPrice || undefined,
                maxPrice: maxPrice || undefined,
                sort
            };
            const res = await axios.get('http://localhost:5000/api/products', { params });
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products", err);
            // Don't use fallback data anymore to ensure we test the API real connection
            addToast('Failed to load products. Is server running?', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts();
        }, 500);
        return () => clearTimeout(timer);
    }, [search, category, sort]);
    // Trigger on category/sort change immediately, but search is debounced. 
    // Ideally we separate effects but this is simple enough for now.

    const handleApplyPriceFilter = () => {
        fetchProducts();
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault(); // Prevent navigation to details
        addToCart(product);
        addToast(`Added ${product.name} to bag!`, 'success');
    };

    return (
        <div className="min-h-screen bg-sand-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-sand-200 pb-8">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-rich-soil-900">Fresh Harvest</h1>
                        <p className="text-rich-soil-600 mt-2">Direct from our farmers to your table</p>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search carrots, honey..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-farm-green-500 shadow-sm transition-all"
                            />
                        </div>
                        <button
                            className="md:hidden p-3 bg-white border border-sand-200 rounded-xl shadow-sm"
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                        >
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex gap-8 items-start">

                    {/* Sidebar Filters (Desktop) */}
                    <aside className={`md:w-64 flex-shrink-0 space-y-8 ${showMobileFilters ? 'block absolute z-50 bg-white p-6 shadow-2xl rounded-2xl top-40 left-4 right-4' : 'hidden md:block'}`}>
                        {/* Mobile Close */}
                        <div className="flex justify-between md:hidden mb-4">
                            <h3 className="font-bold text-lg">Filters</h3>
                            <button onClick={() => setShowMobileFilters(false)}><X /></button>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="font-bold text-rich-soil-900 mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${category === cat ? 'border-farm-green-600 bg-farm-green-600' : 'border-gray-300 group-hover:border-farm-green-400'}`}>
                                            {category === cat && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                        <input
                                            type="radio"
                                            name="category"
                                            className="hidden"
                                            checked={category === cat}
                                            onChange={() => setCategory(cat)}
                                        />
                                        <span className={`text-sm ${category === cat ? 'font-semibold text-farm-green-700' : 'text-rich-soil-600'}`}>
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="font-bold text-rich-soil-900 mb-4">Price Range</h3>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-full px-3 py-2 border border-sand-200 rounded-lg text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full px-3 py-2 border border-sand-200 rounded-lg text-sm"
                                />
                            </div>
                            <button
                                onClick={handleApplyPriceFilter}
                                className="w-full py-2 bg-rich-soil-100 text-rich-soil-800 font-bold text-sm rounded-lg hover:bg-rich-soil-200 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        {/* Sort Bar */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-rich-soil-500 text-sm">Showing {products.length} results</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-rich-soil-500">Sort by:</span>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="bg-transparent font-semibold text-rich-soil-900 focus:outline-none cursor-pointer"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="name_asc">Name: A-Z</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="min-h-[400px] flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-farm-green-600"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <Link key={product.id} to={`/product/${product.id}`} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-sand-100 flex flex-col">
                                        <div className="relative aspect-[4/3] overflow-hidden bg-sand-50">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {product.stock <= 0 && (
                                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                                                    <span className="bg-gray-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">Out of Stock</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-rich-soil-900 group-hover:text-farm-green-700 transition-colors line-clamp-1">{product.name}</h3>
                                                <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-600 px-2 py-1 rounded-full">
                                                    <Star size={10} fill="currentColor" /> 4.8
                                                </div>
                                            </div>
                                            <p className="text-sm text-rich-soil-500 mb-4 line-clamp-2">{product.description}</p>

                                            <div className="mt-auto flex items-center justify-between">
                                                <div>
                                                    <span className="text-xl font-bold text-rich-soil-900">₹{product.price}</span>
                                                    <span className="text-xs text-rich-soil-400 ml-1">/ {product.category}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => handleAddToCart(e, product)}
                                                    disabled={product.stock <= 0}
                                                    className="p-3 bg-farm-green-100 text-farm-green-700 rounded-xl hover:bg-farm-green-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <ShoppingBag size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {!loading && products.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-sand-300">
                                <p className="text-xl text-rich-soil-400 font-serif">No products found matching your filters.</p>
                                <button
                                    onClick={() => { setSearch(''); setCategory('All'); setMinPrice(''); setMaxPrice(''); }}
                                    className="mt-4 text-farm-green-600 font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
