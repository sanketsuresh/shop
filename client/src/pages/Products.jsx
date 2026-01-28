import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import api from '../api/axios';
import { useLocation } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

const Products = () => {
    const [products, setProducts] = useState(PRODUCTS); // Use static as initial to avoid blank screen
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    // Initialize from navigation state if present, otherwise 'All'
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'All');
    const [loading, setLoading] = useState(true);

    // Update category if location state changes (e.g. clicking same link again)
    useEffect(() => {
        if (location.state?.category) {
            setSelectedCategory(location.state.category);
        }
    }, [location.state]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // Fetch from API to get live Stock status
            const res = await api.get('/api/products');
            setProducts(res.data);
        } catch (error) {
            console.error("Using static products (Offline Mode)");
            // Keep using the initial PRODUCTS state
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, products]);

    if (loading) return <div className="p-20 text-center text-gray-500">Loading products...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800">Our Products</h1>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${selectedCategory === cat
                            ? 'bg-primary text-white shadow-md shadow-green-500/20'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            } `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-gray-500 flex flex-col items-center">
                        <Search className="w-12 h-12 mb-4 text-gray-300" />
                        <p className="text-lg">No products found for "{searchTerm}"</p>
                        <p className="text-sm">Try checking your spelling or use a different keyword.</p>
                        <Button
                            variant="ghost"
                            className="mt-4 text-primary"
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
