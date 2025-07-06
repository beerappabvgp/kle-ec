import React from 'react';

export default function About() {
    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-10 px-4 flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">About ShopEase</h1>
                <p className="text-lg mb-4">ShopEase is your one-stop destination for all your shopping needs. We offer a wide range of products across categories like electronics, fashion, home essentials, and more. Our mission is to provide the best deals, fast delivery, and excellent customer service.</p>
                <p className="text-base text-gray-600 dark:text-gray-300">Enjoy a seamless shopping experience with secure payments, easy returns, and 24/7 support. Thank you for choosing ShopEase!</p>
            </div>
        </div>
    );
} 