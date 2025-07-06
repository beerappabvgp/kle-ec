import React from 'react';

const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Beauty',
];

export default function Categories() {
    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-10 px-4 flex items-center justify-center">
            <div className="max-w-2xl mx-auto w-full">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Categories</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="card text-center py-6 cursor-pointer">
                            <span className="text-lg font-semibold">{cat}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 