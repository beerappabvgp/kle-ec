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


        </div>
    );
} 