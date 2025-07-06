import React, { useState } from 'react';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-10 px-4 flex items-center justify-center">
            <div className="max-w-xl mx-auto w-full">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Contact Us</h1>
                {submitted ? (
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded text-center">Thank you for reaching out! We'll get back to you soon.</div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required className="input-field" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Message</label>
                            <textarea name="message" value={form.message} onChange={handleChange} required className="input-field" />
                        </div>
                        <button type="submit" className="btn-primary w-full">Send Message</button>
                    </form>
                )}
                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    Or email us at <a href="mailto:support@shopease.com" className="text-blue-600 dark:text-blue-400 underline">support@shopease.com</a>
                </div>
            </div>
        </div>
    );
} 