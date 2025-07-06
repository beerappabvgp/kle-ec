import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-r from-blue-950 via-black to-blue-900 dark:from-black dark:via-gray-900 dark:to-blue-950 text-white py-8 mt-12 border-t border-blue-900 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-2xl font-bold tracking-wide text-blue-400 mb-2">ShopEase</span>
                    <span className="text-sm text-gray-300">&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
                    <a href="/products" className="hover:text-blue-400 transition-colors">Products</a>
                    <a href="/cart" className="hover:text-blue-400 transition-colors">Cart</a>
                    <a href="/orders" className="hover:text-blue-400 transition-colors">Orders</a>
                    <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
                </div>
                <div className="flex items-center gap-4">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.646.59-2.542.698a4.48 4.48 0 001.963-2.475 8.94 8.94 0 01-2.828 1.082A4.48 4.48 0 0016.11 4c-2.48 0-4.49 2.01-4.49 4.49 0 .352.04.695.116 1.022C7.728 9.36 4.1 7.6 1.67 4.98c-.387.664-.61 1.437-.61 2.26 0 1.56.795 2.94 2.005 3.75a4.48 4.48 0 01-2.034-.563v.057c0 2.18 1.55 4 3.6 4.42-.377.104-.775.16-1.185.16-.29 0-.57-.028-.845-.08.57 1.78 2.23 3.08 4.2 3.12A8.98 8.98 0 012 19.54a12.7 12.7 0 006.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.1 9.1 0 0024 4.59a8.98 8.98 0 01-2.54.697z" /></svg>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-blue-400 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.34-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.03-2.687-.104-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.748-1.025 2.748-1.025.547 1.378.204 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.338 4.695-4.566 4.944.36.31.68.92.68 1.855 0 1.338-.012 2.42-.012 2.75 0 .267.18.577.688.48C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z" /></svg>
                    </a>
                </div>
            </div>
        </footer>
    );
} 