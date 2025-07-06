import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct, deleteProduct, rateProduct } from '../api/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import defaultProductImage from '../assets/default-product.svg';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [mainImage, setMainImage] = useState(0);
    const navigate = useNavigate();
    const { token } = useAuth();
    const { addToCart, loading: cartLoading } = useCart();
    const [submittingRating, setSubmittingRating] = useState(false);
    const [userRating, setUserRating] = useState(null);
    const [hoverRating, setHoverRating] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            try {
                const res = await getProduct(id);
                const prod = res.data || res.product;
                setProduct(prod);
                // Find user's rating if logged in
                if (token && prod.ratings) {
                    const myRating = prod.ratings.find(r => r.user === window.userId || r.user === (window.user && window.user._id));
                    setUserRating(myRating ? myRating.rating : null);
                } else {
                    setUserRating(null);
                }
            } catch (err) {
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id, token]);

    async function handleDelete() {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            navigate('/products');
        } catch (err) {
            alert('Failed to delete product');
        }
    }

    async function handleRate(rating) {
        if (!token || submittingRating) return;
        setSubmittingRating(true);
        try {
            await rateProduct(product._id, rating);
            setUserRating(rating);
            // Refetch product to update average/count
            const res = await getProduct(id);
            setProduct(res.data || res.product);
        } catch (err) {
            alert('Failed to submit rating');
        } finally {
            setSubmittingRating(false);
        }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-red-500">{error}</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">Product not found.</div>;

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
            {/* Top controls: Back link and admin buttons */}
            <div className="max-w-5xl w-full mx-auto pt-8 px-4 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <Link to="/products" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-base font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to Products
                    </Link>
                    {token && (
                        <div className="flex gap-2">
                            <Link
                                to={`/products/${id}/edit`}
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full py-8 px-2 sm:px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Image Gallery */}
                        <div className="flex flex-col items-center gap-4">
                            {product.images && product.images.length > 0 ? (
                                <>
                                    <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 max-w-md max-h-96 w-full flex items-center justify-center">
                                        <img
                                            src={product.images && product.images[mainImage] ? product.images[mainImage] : defaultProductImage}
                                            alt={product.name}
                                            className="object-contain w-full h-full max-h-96 max-w-md"
                                            onError={e => { e.target.onerror = null; e.target.src = defaultProductImage; }}
                                        />
                                    </div>
                                    {product.images.length > 1 && (
                                        <div className="flex gap-3 justify-center mt-2">
                                            {product.images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setMainImage(idx)}
                                                    className={`aspect-square w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none ${mainImage === idx ? 'border-blue-500 dark:border-blue-400 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                                                >
                                                    <img
                                                        src={img || defaultProductImage}
                                                        alt={`${product.name} thumbnail ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                        onError={e => { e.target.onerror = null; e.target.src = defaultProductImage; }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-200 dark:border-gray-700 w-full max-w-md h-80">
                                    <div className="text-center text-gray-500 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                        <p className="text-lg font-medium">No Images Available</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Product Information */}
                        <div className="space-y-8 px-2">
                            {/* Category Badge */}
                            {product.category && (
                                <div>
                                    <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold uppercase tracking-wide">
                                        {product.category}
                                    </span>
                                </div>
                            )}

                            {/* Average Rating */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <svg
                                            key={star}
                                            onClick={() => token && handleRate(star)}
                                            onMouseEnter={() => token && setHoverRating(star)}
                                            onMouseLeave={() => token && setHoverRating(null)}
                                            className={`w-6 h-6 cursor-pointer ${((hoverRating || userRating || product.averageRating) >= star) ? 'text-yellow-400' : 'text-gray-300'} ${token ? 'hover:scale-110 transition-transform' : ''}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-lg font-semibold text-gray-700 dark:text-gray-200 ml-2">
                                    {product.averageRating ? product.averageRating.toFixed(1) : '0.0'}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                                    ({product.ratingsCount || 0})
                                </span>
                                {token && userRating && (
                                    <span className="ml-2 text-xs text-green-600 dark:text-green-400">Your rating: {userRating}</span>
                                )}
                                {token && submittingRating && (
                                    <span className="ml-2 text-xs text-blue-600 dark:text-blue-400 animate-pulse">Saving...</span>
                                )}
                            </div>

                            {/* Product Title */}
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                                    {product.name}
                                </h1>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400">
                                    ${product.price}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>

                            {/* Add to Cart Button */}
                            {token && (
                                <div className="pt-6">
                                    <button
                                        onClick={() => addToCart(product._id, 1)}
                                        disabled={cartLoading}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {cartLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Adding to Cart...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017M6.75 6h14.25l-1.5 9H7.5m0 0L6.75 6m.75 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm10.5 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                                </svg>
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Product Features */}
                            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Quality Assured</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Premium quality products</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600 dark:text-green-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m-2.25 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h2.25m-2.25 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h2.25m-2.25 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h2.25" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Fast Shipping</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Quick delivery worldwide</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 