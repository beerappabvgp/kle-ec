import React, { useState } from 'react';

export default function AuthForm({ mode, onSubmit, loading, error }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-7 rounded-2xl p-8 mx-auto">
            <div className="flex flex-col items-center mb-2">
                <h2 className="text-2xl font-bold text-center mb-1 text-black dark:text-white tracking-tight">
                    {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
                </h2>
                <p className="text-gray-400 text-center text-sm">
                    {mode === 'login' ? 'Login to continue to ShopEase' : 'Sign up to get started with ShopEase'}
                </p>
            </div>
            {error && <div className="text-red-500 text-center font-medium">{error}</div>}
            {mode === 'signup' && (
                <div className="relative">
                    <label className="block mb-1 font-medium text-black dark:text-white">Name</label>
                    <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-transparent focus-within:ring-2 focus-within:ring-blue-500">
                        <span className="mr-2 input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5H6.75A2.25 2.25 0 014.5 20.25v-.75z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="input-field flex-1 border-none focus:ring-0 text-base placeholder-gray-600 dark:placeholder-gray-400"
                            required
                            placeholder="Your Name"
                        />
                    </div>
                </div>
            )}
            <div className="relative">
                <label className="block mb-1 font-medium text-black dark:text-white">Email</label>
                <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-transparent focus-within:ring-2 focus-within:ring-blue-500">
                    <span className="mr-2 input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.091 7.091a2.25 2.25 0 01-3.182 0l-7.091-7.09A2.25 2.25 0 012.25 6.993V6.75" />
                        </svg>
                    </span>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="input-field flex-1 border-none focus:ring-0 text-base placeholder-gray-600 dark:placeholder-gray-400"
                        required
                        placeholder="you@email.com"
                    />
                </div>
            </div>
            <div className="relative">
                <label className="block mb-1 font-medium text-black dark:text-white">Password</label>
                <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-transparent focus-within:ring-2 focus-within:ring-blue-500">
                    <span className="mr-2 input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A4.5 4.5 0 008 6.75v3.75m8.25 0a2.25 2.25 0 012.25 2.25v5.25a2.25 2.25 0 01-2.25 2.25H7.5a2.25 2.25 0 01-2.25-2.25V12.75a2.25 2.25 0 012.25-2.25m8.25 0h-8.25" />
                        </svg>
                    </span>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="input-field flex-1 border-none focus:ring-0 text-base placeholder-gray-600 dark:placeholder-gray-400"
                        required
                        placeholder="Password"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full py-3 text-lg font-semibold rounded-lg mt-2 border text-black dark:text-white border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors disabled:opacity-60"
                disabled={loading}
            >
                {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
        </form>
    );
} 