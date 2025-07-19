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
            console.log('Attempting signup with:', { name: formData.name, email: formData.email, password: '***' });
            const result = await signup({ name: formData.name, email: formData.email, password: formData.password });
            console.log('Signup successful:', result);
            setLoading(false);
            navigate('/products');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.message || err.message || 'Signup failed');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-6 px-2 sm:px-4 flex items-center justify-center">
            <div className="w-full max-w-lg border border-gray-800 rounded-2xl p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white text-center">Sign Up</h1>
                <AuthForm mode="signup" onSubmit={handleSignup} loading={loading} error={error} />
            </div>
        </div>
    );
} 