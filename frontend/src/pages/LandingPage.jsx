import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const categories = [
    { name: "Electronics", icon: "📱", count: "500+ Products" },
    { name: "Fashion", icon: "👕", count: "1000+ Products" },
    { name: "Home & Garden", icon: "🏠", count: "300+ Products" },
    { name: "Sports", icon: "⚽", count: "200+ Products" },
    { name: "Books", icon: "📚", count: "1500+ Products" },
    { name: "Beauty", icon: "💄", count: "400+ Products" }
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Regular Customer",
        content: "Amazing selection and fast delivery. I love shopping here!",
        rating: 5
    },
    {
        name: "Mike Chen",
        role: "Verified Buyer",
        content: "Best prices I've found online. Highly recommended!",
        rating: 5
    },
    {
        name: "Emily Davis",
        role: "Loyal Customer",
        content: "Customer service is outstanding. Will definitely shop again!",
        rating: 5
    }
];

const features = [
    {
        title: "Free Shipping",
        description: "Free delivery on orders over $50",
        icon: "🚚"
    },
    {
        title: "30-Day Returns",
        description: "Easy returns and exchanges",
        icon: "↩️"
    },
    {
        title: "24/7 Support",
        description: "Round the clock customer service",
        icon: "💬"
    },
    {
        title: "Secure Payments",
        description: "100% secure payment processing",
        icon: "🔒"
    }
];

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { token, logout, user } = useAuth();
    const [dark, setDark] = useState(() => {
        // On first render, check localStorage
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
        }
        return false;
    });

    const navigationLinks = [
        { name: 'Home', href: '/', current: true },
        { name: 'Products', href: '/products', current: false },
        { name: 'Categories', href: '/categories', current: false },
        { name: 'About', href: '/about', current: false },
        { name: 'Contact', href: '/contact', current: false },
    ];

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    function toggleDarkMode() {
        setDark((prev) => !prev);
    }

    return (
        <div className="min-h-screen w-full">
            {/* Hero Section */}
            <section id="home" className="py-14 sm:py-20">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
                            Discover Amazing
                            <span className="text-blue-600 dark:text-blue-400"> Products</span>
                        </h1>
                        <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto">
                            Shop the latest trends in electronics, fashion, home essentials, and more.
                            Get the best deals with fast delivery and excellent customer service.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <Link to="/products" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 text-center">
                                Start Shopping
                            </Link>
                            <Link to="/about" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 text-center">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Navigation Section */}
            <section className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Quick Navigation</h2>
                        <p className="text-gray-600 dark:text-gray-400">Find what you're looking for quickly</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-center"
                            >
                                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                                    {link.name === 'Home' && '🏠'}
                                    {link.name === 'Products' && '🛍️'}
                                    {link.name === 'Categories' && '📂'}
                                    {link.name === 'About' && 'ℹ️'}
                                    {link.name === 'Contact' && '📞'}
                                </div>
                                <h3 className="font-semibold text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {link.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-10 sm:py-16">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="text-center card">
                                <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">{feature.icon}</div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                                <p className="text-sm sm:text-base">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section id="categories" className="py-10 sm:py-16">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Shop by Category</h2>
                        <p className="max-w-2xl mx-auto text-sm sm:text-base">
                            Explore our wide range of products across different categories
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                        {categories.map((category, idx) => (
                            <Link key={idx} to="/categories" className="card text-center hover:shadow-lg transition-shadow cursor-pointer block">
                                <div className="text-2xl sm:text-3xl mb-1 sm:mb-3">{category.icon}</div>
                                <h3 className="font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base">{category.name}</h3>
                                <p className="text-xs sm:text-sm">{category.count}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-10 sm:py-16">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">What Our Customers Say</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="card text-center">
                                <div className="flex justify-center mb-2">
                                    <span className="text-2xl">{Array(t.rating).fill('⭐').join('')}</span>
                                </div>
                                <p className="text-sm sm:text-base mb-2">"{t.content}"</p>
                                <div className="font-semibold text-sm sm:text-base">- {t.name}</div>
                                <div className="text-xs text-gray-400">{t.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
                    <p className="mb-8 text-lg">
                        Join thousands of satisfied customers and discover amazing products today
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/products" className="btn-primary font-semibold py-3 px-8 rounded-lg transition-colors inline-block">
                            Browse Products
                        </Link>
                        <Link to="/categories" className="btn-secondary font-semibold py-3 px-8 rounded-lg transition-colors inline-block">
                            Explore Categories
                        </Link>
                    </div>
                </div>
            </section>

            {/* Additional Navigation Section */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Everything You Need</h2>
                        <p className="text-gray-600 dark:text-gray-400">Quick access to all our services and information</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                            <div className="text-3xl mb-4">🛒</div>
                            <h3 className="font-semibold mb-2">Shopping</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Products</Link></li>
                                <li><Link to="/categories" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Categories</Link></li>
                                <li><Link to="/cart" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shopping Cart</Link></li>
                                <li><Link to="/checkout" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Checkout</Link></li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                            <div className="text-3xl mb-4">👤</div>
                            <h3 className="font-semibold mb-2">Account</h3>
                            <ul className="space-y-2 text-sm">
                                {token ? (
                                    <>
                                        <li><Link to="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{user?.name || 'My Profile'}</Link></li>
                                        <li><Link to="/orders" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Orders</Link></li>
                                        <li><Link to="/cart" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Cart</Link></li>
                                        <li><button onClick={logout} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Logout</button></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link></li>
                                        <li><Link to="/signup" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sign Up</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                            <div className="text-3xl mb-4">ℹ️</div>
                            <h3 className="font-semibold mb-2">Information</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
                                <li><Link to="/help" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</Link></li>
                                <li><Link to="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link></li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                            <div className="text-3xl mb-4">🔧</div>
                            <h3 className="font-semibold mb-2">Support</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/shipping" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shipping Info</Link></li>
                                <li><Link to="/returns" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Returns</Link></li>
                                <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">ShopEase</h3>
                            <p>
                                Your one-stop destination for all your shopping needs.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link></li>
                                <li><Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Products</Link></li>
                                <li><Link to="/categories" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Categories</Link></li>
                                <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link></li>
                                <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Customer Service</h4>
                            <ul className="space-y-2">
                                <li><Link to="/help" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</Link></li>
                                <li><Link to="/returns" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Returns & Exchanges</Link></li>
                                <li><Link to="/shipping" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shipping Info</Link></li>
                                <li><Link to="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link></li>
                                <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Support</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Account & More</h4>
                            <ul className="space-y-2">
                                {token ? (
                                    <>
                                        <li><Link to="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{user?.name || 'My Profile'}</Link></li>
                                        <li><Link to="/orders" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Orders</Link></li>
                                        <li><Link to="/cart" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shopping Cart</Link></li>
                                        <li><button onClick={logout} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Logout</button></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link></li>
                                        <li><Link to="/signup" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sign Up</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-center md:text-left">
                                <p>&copy; 2024 ShopEase. All rights reserved.</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z" />
                                        </svg>
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
                                    <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 