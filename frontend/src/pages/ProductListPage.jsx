import React, { useEffect, useState, useRef } from 'react';
import { getAllProducts, deleteProduct } from '../api/products';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { testAPIConnection, testProductsAPI } from '../utils/apiTest';
import { useToast } from '../components/Toast';
import { getErrorMessage } from '../utils/errorHandler';

export default function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useAuth();
    const { addToCart, loading: cartLoading } = useCart();
    const { showSuccess, showError, showWarning } = useToast();
    const [search, setSearch] = useState('');
    const [searching, setSearching] = useState(false);
    const searchTimeout = useRef();
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    async function fetchProducts(params = {}) {
        setLoading(true);
        try {
            console.log('Fetching products with params:', params);
            const res = await getAllProducts(params);
            console.log('Products response:', res);
            setProducts(res.data || res.products || []);
        } catch (err) {
            console.error('Error fetching products:', err);
            const errorInfo = getErrorMessage(err);
            setError(errorInfo.message);
            showError('Failed to Load Products', errorInfo.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Test API connection on component mount
        testAPIConnection();
        testProductsAPI();
        fetchProducts();
    }, []);

    function handleSearchChange(e) {
        const value = e.target.value;
        setSearch(value);
        setSearching(true);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            fetchProducts(value ? { search: value } : {});
            setSearching(false);
        }, 400);
    }

    function handleClearSearch() {
        setSearch('');
        fetchProducts();
    }

    function getFilterParams() {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        return params;
    }

    function handleCategoryChange(e) {
        setCategory(e.target.value);
        fetchProducts({ ...getFilterParams(), category: e.target.value });
    }
    function handleMinPriceChange(e) {
        setMinPrice(e.target.value);
    }
    function handleMaxPriceChange(e) {
        setMaxPrice(e.target.value);
    }
    function handlePriceBlur() {
        fetchProducts(getFilterParams());
    }
    function handleClearFilters() {
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        setSearch('');
        fetchProducts();
    }

    async function handleDelete(id) {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            setLoading(true);
            const res = await getAllProducts();
            setProducts(res.data || res.products || []);
            setLoading(false);
        } catch (err) {
            alert('Failed to delete product');
        }
    }

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-6 px-2 sm:px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 w-full">
                    {/* Left: All Products */}
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white whitespace-nowrap flex-1 text-left">All Products</h1>
                    {/* Center: Filters */}
                    <div className="flex flex-col sm:flex-row gap-2 items-center justify-center flex-1 w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search products..."
                            className="px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none w-full sm:w-56 placeholder-gray-400 dark:placeholder-gray-500 rounded-md shadow-sm bg-transparent border border-gray-300 dark:border-gray-700"
                        />
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            className="px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none min-w-[120px] rounded-md shadow-sm bg-transparent border border-gray-300 dark:border-gray-700"
                        >
                            <option value="">All Categories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                        </select>
                        <input
                            type="number"
                            min="0"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            onBlur={handlePriceBlur}
                            placeholder="Min Price"
                            className="px-3 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none w-24 sm:w-28 rounded-md shadow-sm bg-transparent border border-gray-300 dark:border-gray-700 appearance-none no-spinner"
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                        <input
                            type="number"
                            min="0"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            onBlur={handlePriceBlur}
                            placeholder="Max Price"
                            className="px-3 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none w-24 sm:w-28 rounded-md shadow-sm bg-transparent border border-gray-300 dark:border-gray-700 appearance-none no-spinner"
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                        {(category || minPrice || maxPrice || search) && (
                            <button
                                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md shadow-sm transition-all border border-gray-300 dark:border-gray-700"
                                onClick={handleClearFilters}
                                type="button"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    {/* Right: Add Product */}
                    <div className="flex-1 flex justify-end">
                        <Link to="/products/new" className="btn-primary flex items-center gap-2 text-base px-4 py-2 shadow-sm whitespace-nowrap h-[44px] sm:h-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg> Add Product</Link>
                    </div>
                </div>
                {loading ? (
                    <div className="text-center py-10 text-lg">Loading products...</div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-6">
                        {products.map(product => (
                            <div
                                key={product._id}
                                className="bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-3 sm:p-4 flex flex-col justify-between group transition-all duration-200 cursor-pointer hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500"
                                onClick={() => navigate(`/products/${product._id}`)}
                            >
                                <div>
                                    {product.images && product.images.length > 0 ? (
                                        <img src={product.images[0]} alt={product.name} className="w-full h-36 sm:h-40 object-cover rounded-lg mb-3 shadow-sm bg-white dark:bg-black" />
                                    ) : (
                                        <div className="w-full h-36 sm:h-40 flex items-center justify-center rounded-lg mb-3 bg-white dark:bg-black text-black dark:text-white opacity-40">No Image</div>
                                    )}
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-base sm:text-lg font-semibold dark:text-white truncate max-w-[70%]">{product.name}</h2>
                                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 ml-2">${product.price}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <svg
                                                key={star}
                                                className={`w-4 h-4 ${product.averageRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                                            </svg>
                                        ))}
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 ml-1">
                                            {product.ratingsCount > 0 ? product.averageRating?.toFixed(1) : '—'}
                                        </span>
                                        <span className="text-xs text-gray-400 ml-1">
                                            {product.ratingsCount > 0 ? `(${product.ratingsCount})` : 'No ratings yet'}
                                        </span>
                                    </div>
                                    <p className="mb-4 text-gray-700 dark:text-gray-200 text-xs sm:text-sm line-clamp-2 min-h-[2.2em]">{product.description}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4 gap-2" onClick={e => e.stopPropagation()}>
                                    <Link to={`/products/${product._id}`} className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium hover:underline flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12h.01M12 15h.01M9 12h.01M12 9h.01M12 12h.01" /></svg>View Details</Link>
                                    {token && (
                                        <button
                                            className="rounded-full bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors shadow-sm"
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                await addToCart(product._id, 1);
                                            }}
                                            disabled={cartLoading}
                                            title="Add to Cart"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017M6.75 6h14.25l-1.5 9H7.5m0 0L6.75 6m.75 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm10.5 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" /></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 