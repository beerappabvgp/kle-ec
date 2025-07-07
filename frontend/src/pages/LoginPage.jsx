import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const signupSuccess = location.state && location.state.signupSuccess;
    const { login } = useAuth();

    const handleLogin = async (formData) => {
        setLoading(true);
        setError('');
        try {
            const res = await loginApi({ email: formData.email, password: formData.password });
            const { token } = res.data;
            await login(token);
            setLoading(false);
            navigate('/products');
        } catch (err) {
            setError(err.message || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-6 px-2 sm:px-4 flex items-center justify-center">
            <div className="w-full max-w-md border border-gray-800 rounded-2xl p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white text-center">Login</h1>
                {signupSuccess && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center dark:bg-green-900 dark:text-green-200">
                        Signup successful! Please log in.
                    </div>
                )}
                <AuthForm mode="login" onSubmit={handleLogin} loading={loading} error={error} />
            </div>
        </div>
    );
} 