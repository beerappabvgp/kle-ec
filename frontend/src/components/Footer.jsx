import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
    const { token, user } = useAuth();

    return (
        <footer className="w-full bg-white dark:bg-black text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand & Services */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">ShopEase</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                                Your premier destination for quality products, exceptional service, and seamless shopping experience.
                                Discover amazing deals on electronics, fashion, home essentials, and more.
                            </p>
                        </div>

                        {/* Services Highlight */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-blue-600 dark:text-blue-400">🚚</span>
                                    <h4 className="font-semibold text-sm">Free Shipping</h4>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">On orders over $50</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-blue-600 dark:text-blue-400">↩️</span>
                                    <h4 className="font-semibold text-sm">Easy Returns</h4>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">30-day return policy</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-blue-600 dark:text-blue-400">🔒</span>
                                    <h4 className="font-semibold text-sm">Secure Payment</h4>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">100% secure checkout</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-blue-600 dark:text-blue-400">💬</span>
                                    <h4 className="font-semibold text-sm">24/7 Support</h4>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Always here to help</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Shop & Explore</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">🛍️</span>
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">📂</span>
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">🛒</span>
                                    Shopping Cart
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">📦</span>
                                    My Orders
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">ℹ️</span>
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service & Account */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Support & Account</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">❓</span>
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">📞</span>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">🚚</span>
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">↩️</span>
                                    Returns Policy
                                </Link>
                            </li>
                            {token ? (
                                <>
                                    <li>
                                        <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                            <span className="text-blue-600 dark:text-blue-400">👤</span>
                                            {user?.name || 'My Profile'}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/cart" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                            <span className="text-blue-600 dark:text-blue-400">🛒</span>
                                            My Cart
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                            <span className="text-blue-600 dark:text-blue-400">🔑</span>
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                            <span className="text-blue-600 dark:text-blue-400">✨</span>
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
                            </p>
                        </div>

                        {/* Social Media & Legal */}
                        <div className="flex items-center gap-6">
                            {/* Social Media */}
                            <div className="flex items-center gap-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    aria-label="Facebook">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    aria-label="Twitter">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    aria-label="Instagram">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    aria-label="LinkedIn">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>

                            {/* Legal Links */}
                            <div className="flex items-center gap-4 text-sm">
                                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 