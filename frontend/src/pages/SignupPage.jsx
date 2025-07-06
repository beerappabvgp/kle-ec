import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { signup } from '../api/auth';

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (formData) => {
        setLoading(true);
        setError('');
        try {
            await signup(formData.email, formData.password, formData.name);
            setLoading(false);
            navigate('/products');
        } catch (err) {
            setError(err.message || 'Signup failed');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-6 px-2 sm:px-4 flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white text-center">Sign Up</h1>
                <AuthForm mode="signup" onSubmit={handleSignup} loading={loading} error={error} />
            </div>
        </div>
    );
} 