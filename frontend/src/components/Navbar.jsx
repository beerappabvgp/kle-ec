import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import defaultAvatar from '../assets/default-avatar.svg';

export default function Navbar() {
    const { token, logout, user } = useAuth();
    const { cart } = useCart();
    const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
        }
        return false;
    });
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    useEffect(() => {
        setMenuOpen(false); // Close menu on route change
    }, [location.pathname]);

    function toggleDarkMode() {
        setDark((prev) => !prev);
    }

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/categories', label: 'Categories' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="w-full bg-white/90 dark:bg-black/90 shadow-sm sticky top-0 z-50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">ShopEase</span>
                    </Link>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`text-base font-medium transition-colors px-2 py-1 rounded-lg ${location.pathname === link.to ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-black dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {token && (
                            <Link to="/products/new" className="btn-primary text-base py-1.5 px-4">Add Product</Link>
                        )}
                    </div>
                    {/* Auth + Cart + Dark Mode Buttons (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {token && (
                            <Link to="/cart" className="relative flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-black dark:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017M6.75 6h14.25l-1.5 9H7.5m0 0L6.75 6m.75 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm10.5 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow border border-white dark:border-black">{cartCount}</span>
                                )}
                            </Link>
                        )}
                        {token && (
                            <Link to="/profile" className="flex items-center gap-2 group">
                                <img
                                    src={user && user.profilePhoto ? user.profilePhoto : defaultAvatar}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-900 shadow group-hover:ring-2 group-hover:ring-blue-400 transition-all"
                                    onError={e => { e.target.onerror = null; e.target.src = defaultAvatar; }}
                                />
                                <span className="hidden lg:inline font-medium text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Profile</span>
                            </Link>
                        )}
                        <button onClick={toggleDarkMode} className="p-2 rounded-full text-black dark:text-white border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                            {dark ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.375-9.126a.75.75 0 01.976.937A7.501 7.501 0 0019.5 12c0 1.885-.654 3.624-1.748 5.002z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m8.485-8.485l-1.06 1.06M4.515 4.515l1.06 1.06M21 12h-1.5M4.5 12H3m16.485 4.485l-1.06-1.06M4.515 19.485l1.06-1.06M16.24 7.76a6 6 0 11-8.48 8.48 6 6 0 018.48-8.48z" />
                                </svg>
                            )}
                        </button>
                        {token ? (
                            <button onClick={() => logout()} className="btn-secondary px-4 py-1.5">Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Login</Link>
                                <Link to="/signup" className="btn-primary px-4 py-1.5">Sign Up</Link>
                            </>
                        )}
                    </div>
                    {/* Hamburger Menu Button (Mobile) */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-label="Toggle menu"
                        >
                            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="md:hidden mt-2 bg-white dark:bg-black rounded-xl shadow-lg py-4 px-4 space-y-4 animate-fade-in-down">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`block text-base font-medium px-2 py-2 rounded-lg ${location.pathname === link.to ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-black dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400'}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {token && (
                            <Link to="/products/new" className="block btn-primary w-full text-center mt-2" onClick={() => setMenuOpen(false)}>Add Product</Link>
                        )}
                        {token && (
                            <Link to="/cart" className="relative flex items-center justify-center mt-2" onClick={() => setMenuOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-black dark:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017M6.75 6h14.25l-1.5 9H7.5m0 0L6.75 6m.75 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm10.5 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow border border-white dark:border-black">{cartCount}</span>
                                )}
                            </Link>
                        )}
                        {token && (
                            <Link to="/profile" className="flex items-center gap-2 mt-2" onClick={() => setMenuOpen(false)}>
                                <img
                                    src={user && user.profilePhoto ? user.profilePhoto : defaultAvatar}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-900 shadow"
                                    onError={e => { e.target.onerror = null; e.target.src = defaultAvatar; }}
                                />
                                <span className="font-medium text-black dark:text-white">Profile</span>
                            </Link>
                        )}
                        <button onClick={toggleDarkMode} className="w-full px-2 py-2 rounded-full text-black dark:text-white border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors mt-2 flex items-center justify-center gap-2">
                            {dark ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.375-9.126a.75.75 0 01.976.937A7.501 7.501 0 0019.5 12c0 1.885-.654 3.624-1.748 5.002z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m8.485-8.485l-1.06 1.06M4.515 4.515l1.06 1.06M21 12h-1.5M4.5 12H3m16.485 4.485l-1.06-1.06M4.515 19.485l1.06-1.06M16.24 7.76a6 6 0 11-8.48 8.48 6 6 0 018.48-8.48z" />
                                </svg>
                            )}
                            <span>{dark ? 'Dark' : 'Light'}</span>
                        </button>
                        {token ? (
                            <button onClick={() => { logout(); setMenuOpen(false); }} className="btn-secondary w-full mt-2">Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="block text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Login</Link>
                                <Link to="/signup" className="block btn-primary w-full text-center mt-2">Sign Up</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
} 