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
        <form onSubmit={handleSubmit} className="bg-white text-black dark:bg-black dark:text-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6 border border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-center mb-2 dark:text-white">
                {mode === 'login' ? 'Login to Your Account' : 'Create an Account'}
            </h2>
            {error && <div className="text-red-600 dark:text-red-400 text-center">{error}</div>}
            {mode === 'signup' && (
                <div>
                    <label className="block mb-1 font-medium dark:text-white">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>
            )}
            <div>
                <label className="block mb-1 font-medium dark:text-white">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-medium dark:text-white">Password</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
            </div>
            <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
            >
                {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
        </form>
    );
} 