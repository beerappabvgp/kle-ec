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
        { to: '/', label: 'Home', icon: '🏠' },
        { to: '/products', label: 'Shop Products', icon: '🛍️' },
        { to: '/categories', label: 'Categories', icon: '📂' },
        { to: '/orders', label: 'My Orders', icon: '📦' },
        { to: '/about', label: 'About Us', icon: 'ℹ️' },
        { to: '/contact', label: 'Contact', icon: '📞' },
    ];

    return (
        <nav className="w-full bg-white/90 dark:bg-black/90 shadow-sm sticky top-0 z-50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 min-w-[120px]">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">ShopEase</span>
                    </Link>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`text-base font-medium transition-colors px-3 py-2 rounded-lg flex items-center gap-2 ${location.pathname === link.to ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-black dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400'}`}
                            >
                                <span className="text-sm">{link.icon}</span>
                                {link.label}
                            </Link>
                        ))}
                        {token && (
                            <Link to="/products/new" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-base flex items-center gap-2">
                                <span>➕</span>
                                Add Product
                            </Link>
                        )}
                    </div>
                    {/* Auth + Cart + Dark Mode Buttons (Desktop) */}
                    <div className="flex items-center space-x-2 lg:space-x-4">
                        {!token && (
                            <>
                                <Link to="/login" className="btn-primary px-4 py-1.5">Login</Link>
                                <Link to="/signup" className="btn-secondary px-4 py-1.5">Sign Up</Link>
                            </>
                        )}
                        {token && (
                            <>
                                <Link to="/cart" className="relative flex items-center gap-2 group p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all" title="Cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017M6.75 6h14.25l-1.5 9H7.5m0 0L6.75 6m.75 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm10.5 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                    </svg>
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold min-w-[18px] text-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/profile" className="flex items-center gap-2 group">
                                    <img
                                        src={user && user.profilePhoto ? user.profilePhoto : defaultAvatar}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover border-2 border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-900 shadow group-hover:ring-2 group-hover:ring-blue-400 transition-all"
                                        onError={e => { e.target.onerror = null; e.target.src = defaultAvatar; }}
                                    />
                                    <span className="hidden lg:inline font-medium text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {user?.name || 'Profile'}
                                    </span>
                                </Link>
                                <button onClick={logout} className="btn-secondary px-4 py-1.5">Logout</button>
                            </>
                        )}
                        <button
                            className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                        >
                            {dark ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.442-9.049a.75.75 0 01.908.911A7.501 7.501 0 0019.5 12c0 1.61-.508 3.104-1.385 4.335a.75.75 0 01.911.908z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700 dark:text-gray-200">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m8.485-8.485l-1.06 1.06M4.515 4.515l1.06 1.06M21 12h-1.5M3 12H1.5m16.97 6.485l-1.06-1.06M6.485 19.485l1.06-1.06" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {/* Hamburger for Mobile */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-label="Toggle menu"
                        >
                            <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                className={`block text-lg font-medium px-3 py-3 rounded-lg flex items-center gap-3 ${location.pathname === link.to ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-black dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400'}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                <span className="text-lg">{link.icon}</span>
                                {link.label}
                            </Link>
                        ))}
                        {token && (
                            <Link to="/products/new" className="block bg-green-600 hover:bg-green-700 text-white font-semibold w-full text-center mt-2 py-3 rounded-lg transition-colors flex items-center justify-center gap-2" onClick={() => setMenuOpen(false)}>
                                <span>➕</span>
                                Add Product
                            </Link>
                        )}
                        {token && (
                            <Link to="/cart" className="block w-full text-center mt-2" onClick={() => setMenuOpen(false)}>
                                <span className="inline-flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017M6.75 6h14.25l-1.5 9H7.5m0 0L6.75 6m.75 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm10.5 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                    </svg>
                                    Cart {cartCount > 0 && <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{cartCount}</span>}
                                </span>
                            </Link>
                        )}
                        {token && (
                            <Link to="/profile" className="block w-full text-center mt-2" onClick={() => setMenuOpen(false)}>
                                <span className="inline-flex items-center gap-2">
                                    <img
                                        src={user && user.profilePhoto ? user.profilePhoto : defaultAvatar}
                                        alt="Profile"
                                        className="w-7 h-7 rounded-full object-cover border-2 border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-900 shadow"
                                        onError={e => { e.target.onerror = null; e.target.src = defaultAvatar; }}
                                    />
                                    {user?.name || 'Profile'}
                                </span>
                            </Link>
                        )}
                        {token && (
                            <button onClick={() => { logout(); setMenuOpen(false); }} className="btn-secondary w-full text-center mt-2">Logout</button>
                        )}
                        {!token && (
                            <>
                                <Link to="/login" className="block btn-primary w-full text-center mt-2" onClick={() => setMenuOpen(false)}>Login</Link>
                                <Link to="/signup" className="block btn-secondary w-full text-center mt-2" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                            </>
                        )}
                        <button
                            className="w-full mt-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                            onClick={toggleDarkMode}
                        >
                            {dark ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
} 