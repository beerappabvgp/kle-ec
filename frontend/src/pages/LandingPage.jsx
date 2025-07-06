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
    const { token, logout } = useAuth();
    const [dark, setDark] = useState(() => {
        // On first render, check localStorage
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
        }
        return false;
    });

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
            <section id="home" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Discover Amazing
                            <span className="text-blue-600 dark:text-blue-400"> Products</span>
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Shop the latest trends in electronics, fashion, home essentials, and more.
                            Get the best deals with fast delivery and excellent customer service.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn-primary text-lg px-8 py-3">Start Shopping</button>
                            <button className="btn-secondary text-lg px-8 py-3">Learn More</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="text-center card">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section id="categories" className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
                        <p className="max-w-2xl mx-auto">
                            Explore our wide range of products across different categories
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category, idx) => (
                            <div key={idx} className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="text-3xl mb-3">{category.icon}</div>
                                <h3 className="font-semibold mb-1">{category.name}</h3>
                                <p className="text-sm">{category.count}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
                        <p>Don't just take our word for it</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className="card">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400">⭐</span>
                                    ))}
                                </div>
                                <p className="mb-4">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm">{testimonial.role}</p>
                                </div>
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
                    <button className="btn-primary font-semibold py-3 px-8 rounded-lg transition-colors">
                        Get Started Now
                    </button>
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
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Products</a></li>
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Customer Service</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Returns</a></li>
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shipping</a></li>
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Size Guide</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Connect With Us</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Facebook</a></li>
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                        <p>&copy; 2024 ShopEase. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 